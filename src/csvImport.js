const REQUIRED_COLUMNS = [
  'control_no',
  'survey_date',
  'gender',
  'age',
  'program',
  'cc1',
  'cc2',
  'cc3',
  'sqd0',
  'sqd1',
  'sqd2',
  'sqd3',
  'sqd4',
  'sqd5',
  'sqd6',
  'sqd7',
  'sqd8',
  'comments',
];

const SERVICE_OPTIONS = {
  bpbh: 'Livelihood Assistance- Balik Pinas, Balik Hanapbuhay (BPBH)',
  membership_oec: 'Membership Promotion/Processing/Collection',
  wap_bereavement: 'Welfare Assistance Program (WAP)',
  elap_scholarship: 'Education and Livelihood Assistance Program (ELAP)',
  cash_release: 'Cash Releasing/Check Releasing',
  rebate: 'REBATE Program',
  medplus: "Supplemental Medical Assistance for OFW's (MedPlus)",
  sup: 'Seafarers Upgraded Program (SUP)',
  migrants_brew: 'Migrants Brew',
  others: 'Others',
};

const CC1_OPTIONS = {
  1: "1. I know what a CC is and I saw this office's CC.",
  2: "2. I know what a CC is but I did NOT see this office's CC.",
  3: '3. I learned of the CC only when I sew this office’s CC.',
  4: '4. I do not know what a CC is and I did not see one in this office. (Answer ‘N/A’ on CC2 and CC3)',
  5: '5. Not Stated',
};

const CC2_OPTIONS = {
  1: '1. Easy to see',
  2: '2. Somewhat easy to see',
  3: '3. Difficult to see',
  4: '4. Not visible at all',
  5: '5. N/A',
  'N/A': '5. N/A',
};

const CC3_OPTIONS = {
  1: '1. Helped very much',
  2: '2. Somewhat helped',
  3: '3. Did not help',
  4: '4. N/A',
  'N/A': '4. N/A',
};

const SQD_OPTIONS = {
  1: 'Strongly Agree',
  2: 'Agree',
  3: 'Neither Agree nor Disagree',
  4: 'Disagree',
  5: 'Strongly Disagree',
  'N/A': 'N/A',
};

const SQD_ENTRY_IDS = {
  sqd0: '1696159737',
  sqd1: '30063493',
  sqd2: '1524266540',
  sqd3: '1156352542',
  sqd4: '210029298',
  sqd5: '1924958525',
  sqd6: '79953104',
  sqd7: '337104900',
  sqd8: '1700349672',
};

export function parseCsv(text) {
  const input = text.replace(/^\uFEFF/, '');
  const records = [];
  let record = [];
  let field = '';
  let inQuotes = false;
  let quoteClosed = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];

    if (inQuotes) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        inQuotes = false;
        quoteClosed = true;
      } else {
        field += character;
      }
    } else if (character === ',') {
      record.push(field);
      field = '';
      quoteClosed = false;
    } else if (character === '\n' || character === '\r') {
      if (character === '\r' && input[index + 1] === '\n') index += 1;
      record.push(field);
      if (record.some((value) => value.trim() !== '')) records.push(record);
      record = [];
      field = '';
      quoteClosed = false;
    } else if (character === '"' && field === '' && !quoteClosed) {
      inQuotes = true;
    } else if (quoteClosed) {
      throw new Error('Unexpected text after a quoted CSV field.');
    } else if (character === '"') {
      throw new Error('Unexpected quote in an unquoted CSV field.');
    } else {
      field += character;
    }
  }

  if (inQuotes) throw new Error('The CSV has an unterminated quoted field.');
  if (field !== '' || record.length > 0) {
    record.push(field);
    if (record.some((value) => value.trim() !== '')) records.push(record);
  }
  if (records.length < 2) throw new Error('The CSV must contain a header and at least one data row.');

  const headers = records[0].map((header) => header.trim().toLowerCase());
  const missingColumns = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}.`);
  }
  if (new Set(headers).size !== headers.length) {
    throw new Error('The CSV contains duplicate column headers.');
  }

  const rows = records.slice(1).map((values, index) => {
    if (values.length !== headers.length) {
      throw new Error(`Row ${index + 2} has ${values.length} values; expected ${headers.length}.`);
    }
    return Object.fromEntries(headers.map((header, column) => [header, values[column]]));
  });

  return { headers, rows };
}

function getDateValue(value) {
  const text = value.trim();
  let year;
  let month;
  let day;

  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(text);
  const usMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text);
  if (isoMatch) {
    [, year, month, day] = isoMatch;
  } else if (usMatch) {
    [, month, day, year] = usMatch;
  } else {
    return null;
  }

  const parsedYear = Number(year);
  const parsedMonth = Number(month);
  const parsedDay = Number(day);
  const date = new Date(Date.UTC(parsedYear, parsedMonth - 1, parsedDay));
  if (
    date.getUTCFullYear() !== parsedYear ||
    date.getUTCMonth() !== parsedMonth - 1 ||
    date.getUTCDate() !== parsedDay
  ) {
    return null;
  }
  return `${String(parsedYear).padStart(4, '0')}-${String(parsedMonth).padStart(2, '0')}-${String(parsedDay).padStart(2, '0')}`;
}

function getAgeGroup(value) {
  if (!value.trim() || ['n/a', 'not stated'].includes(value.trim().toLowerCase())) {
    return 'Not Stated';
  }
  if (!/^\d+$/.test(value.trim())) return null;
  const age = Number(value);
  if (age < 0 || age > 120) return null;
  if (age <= 18) return '18 and below';
  if (age <= 24) return '19-24 years old';
  if (age <= 39) return '25-39 years  old';
  if (age <= 59) return '40-59 years old';
  return '60 and above';
}

export function getCsvPrefill(row) {
  const errors = [];
  const required = ['control_no', 'survey_date', 'gender', 'program', 'cc1', 'cc2', 'cc3', ...Object.keys(SQD_ENTRY_IDS)];
  for (const column of required) {
    if (!row[column]?.trim()) errors.push(`${column} is required.`);
  }

  const formDate = getDateValue(row.survey_date || '');
  if (row.survey_date?.trim() && !formDate) {
    errors.push('survey_date must be a valid date in M/D/YYYY or YYYY-MM-DD format.');
  }

  const gender = row.gender?.trim();
  if (gender && !['Male', 'Female', 'Not Stated'].includes(gender)) {
    errors.push('gender must be Male, Female, or Not Stated.');
  }

  const ageGroup = getAgeGroup(row.age || '');
  if (ageGroup === null) errors.push('age must be a whole number from 0 to 120, or blank.');

  const service = SERVICE_OPTIONS[row.program?.trim().toLowerCase()];
  if (row.program?.trim() && !service) errors.push(`Unsupported program code: ${row.program}.`);

  const choice = (column, options) => {
    const value = row[column]?.trim();
    const answer = options[value];
    if (value && !answer) errors.push(`${column} has unsupported answer "${value}".`);
    return answer;
  };

  const cc1 = choice('cc1', CC1_OPTIONS);
  const cc2 = choice('cc2', CC2_OPTIONS);
  const cc3 = choice('cc3', CC3_OPTIONS);
  const sqdAnswers = Object.fromEntries(
    Object.entries(SQD_ENTRY_IDS).map(([column]) => {
      const options = column === 'sqd4' ? { ...SQD_OPTIONS, 5: 'Strong Disagree' } : SQD_OPTIONS;
      return [column, choice(column, options)];
    })
  );

  if (errors.length > 0) return { errors, params: null };

  const params = new URLSearchParams({
    emailAddress: 'region5@owwa.gov.ph',
    'entry.619699373': formDate,
    'entry.2079729964': row.control_no.trim(),
    'entry.1184789874': 'Region V',
    'entry.1084651285': gender,
    'entry.945067335': 'A. General Public',
    'entry.1736360217': 'External',
    'entry.835958767': 'RWO 5',
    'entry.1326419066': cc1,
    'entry.382407889': cc2,
    'entry.1937742799': cc3,
    'entry.1523726901': service,
    'entry.1598077704': ageGroup,
  });
  for (const [column, entryId] of Object.entries(SQD_ENTRY_IDS)) {
    params.set(`entry.${entryId}`, sqdAnswers[column]);
  }
  if (row.comments?.trim()) params.set('entry.374942565', row.comments.trim());

  return { errors, params };
}
