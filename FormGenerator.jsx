import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function FormGenerator() {
  const [prefix, setPrefix] = useState('NSO');
  const [office, setOffice] = useState('06');
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [counter, setCounter] = useState(1);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [service, setService] = useState(
    'Scholarship- Education for Development Scholarship Program (EDSP)'
  );

  const serviceOptions = [
    { value: 'Scholarship- Education for Development Scholarship Program (EDSP)', label: 'Scholarship - Education for Development Scholarship Program (EDSP)', shortcut: '1' },
    { value: 'Repatriation- Transportation Assistance/Financial Assistance', label: 'Repatriation - Transportation Assistance / Financial Assistance', shortcut: '2' },
    { value: 'Scholarship- OFW Dependants Scholarship Program (ODSP)', label: 'Scholarship - OFW Dependants Scholarship Program (ODSP)', shortcut: '3' },
    { value: 'Livelihood Assistance- Balik Pinas, Balik Hanapbuhay (BPBH)', label: 'Livelihood Assistance - Balik Pinas, Balik Hanapbuhay (BPBH)', shortcut: '4' },
    { value: 'Membership Promotion/Processing/Collection', label: 'Membership Promotion / Processing / Collection', shortcut: '5' },
    { value: 'Welfare Assistance Program (WAP)', label: 'Welfare Assistance Program (WAP)', shortcut: '6' },
    { value: 'Skills for Employment Scholarship (SESP)', label: 'Skills for Employment Scholarship (SESP)', shortcut: 'S' },
    { value: 'Education and Livelihood Assistance Program (ELAP)', label: 'Education and Livelihood Assistance Program (ELAP)', shortcut: 'E' },
    { value: 'Pre-Departure Orientation Seminar (PDOS)', label: 'Pre-Departure Orientation Seminar (PDOS)', shortcut: 'P' },
    { value: 'Legal Assistance- Single Entry Approach Process (SENA)', label: 'Legal Assistance - Single Entry Approach Process (SENA)', shortcut: 'L' },
    { value: 'REBATE Program', label: 'REBATE Program', shortcut: 'R' },
    { value: 'Seafarers Upgraded Program (SUP)', label: 'Seafarers Upgraded Program (SUP)', shortcut: 'U' },
    { value: 'Cash Releasing/Check Releasing', label: 'Cash Releasing / Check Releasing', shortcut: 'C' },
    { value: 'Freedom of Information (FOI) Inquiries', label: 'Freedom of Information (FOI) Inquiries', shortcut: 'I' },
    { value: 'Others', label: 'Others', shortcut: '0' },
  ];

  // Sync office with date change
  useEffect(() => {
    if (formDate) {
      const month = formDate.split('-')[1];
      if (month) {
        setOffice(month);
      }
    }
  }, [formDate]);

  // Load counter from localStorage whenever office code changes
  useEffect(() => {
    const key = `NSO_COUNTER_${office}`;
    const savedCounter = localStorage.getItem(key);
    if (savedCounter !== null) {
      setCounter(parseInt(savedCounter, 10));
    } else {
      setCounter(1);
      localStorage.setItem(key, '1');
    }
  }, [office]);

  // Keyboard Shortcuts (M/F for Gender, 1-0 for Services)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement;
      if (
        active.tagName === 'INPUT' &&
        active.type !== 'radio' &&
        active.type !== 'checkbox'
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === 'm') setGender('Male');
      if (key === 'f') setGender('Female');

      const serviceShortcutMap = {
        1: serviceOptions[0].value,
        2: serviceOptions[1].value,
        3: serviceOptions[2].value,
        4: serviceOptions[3].value,
        5: serviceOptions[4].value,
        6: serviceOptions[5].value,
        s: serviceOptions[6].value,
        e: serviceOptions[7].value,
        p: serviceOptions[8].value,
        l: serviceOptions[9].value,
        r: serviceOptions[10].value,
        u: serviceOptions[11].value,
        c: serviceOptions[12].value,
        i: serviceOptions[13].value,
        0: serviceOptions[14].value,
      };

      if (key in serviceShortcutMap) {
        setService(serviceShortcutMap[key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formattedCounter = String(counter).padStart(3, '0');
  const controlNo = `${prefix.trim().toUpperCase()}-${office}-${formattedCounter}`;

  const getAgeGroup = (numAge) => {
    const parsedAge = parseInt(numAge, 10);
    if (isNaN(parsedAge)) return 'Not Stated';
    if (parsedAge <= 18) return '18 and below';
    if (parsedAge <= 24) return '19-24 years old';
    if (parsedAge <= 39) return '25-39 years  old';
    if (parsedAge <= 59) return '40-59 years old';
    return '60 and above';
  };

  const handleOpenForm = () => {
    const params = new URLSearchParams({
      emailAddress: 'region5@owwa.gov.ph',
      'entry.619699373': formDate,
      'entry.2079729964': controlNo,
      'entry.1184789874': 'Region V',
      'entry.1084651285': gender,
      'entry.945067335': 'A. General Public',
      'entry.1736360217': 'External',
      'entry.835958767': 'RWO 5',
      'entry.1326419066': "1. I know what a CC is and I saw this office's CC.",
      'entry.382407889': '1. Easy to see',
      'entry.1937742799': '2. Somewhat helped',
      'entry.1696159737': 'Strongly Agree',
      'entry.30063493': 'Strongly Agree',
      'entry.1524266540': 'Strongly Agree',
      'entry.1156352542': 'N/A',
      'entry.210029298': 'Strongly Agree',
      'entry.1924958525': 'N/A',
      'entry.79953104': 'Strongly Agree',
      'entry.337104900': 'Strongly Agree',
      'entry.1700349672': 'Strongly Agree',
      'entry.1523726901': service,
      'entry.1598077704': getAgeGroup(age),
    });

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSfScaJTLw1TPXM_PMbGoD4s14fy7mGEDN46ZFT8YVnXlcCAaQ/viewform?${params.toString()}`;
    
    // Set frame source and show modal using Bootstrap's JS API
    const frame = document.getElementById('googleFrame');
    if (frame) frame.src = url;

    const modalElement = document.getElementById('googleFormModal');
    if (modalElement && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalElement);
      
      // Auto-increment counter when modal is closed
      modalElement.addEventListener('hidden.bs.modal', () => {
        setCounter((prev) => {
          const nextVal = prev + 1;
          localStorage.setItem(`NSO_COUNTER_${office}`, nextVal);
          return nextVal;
        });
      }, { once: true });

      modal.show();
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '16px' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#!">CCSS System</a>
        </div>
      </nav>

      <div className="container mt-5">
        <h3 className="fw-bold mb-4" style={{ color: '#2c3e50' }}>Google Form Generator</h3>

        <div className="row">
          {/* Prefix */}
          <div className="col-md-2 mb-3">
            <label className="form-label fw-bold">Prefix</label>
            <input
              type="text"
              className="form-control"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>

          {/* Office Code */}
          <div className="col-md-2 mb-3">
            <label className="form-label fw-bold">Office Code</label>
            <select
              className="form-select"
              value={office}
              onChange={(e) => setOffice(e.target.value)}
            >
              {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="col-md-3 mb-3">
            <label className="form-label fw-bold">Date</label>
            <input
              type="date"
              className="form-control"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
            />
          </div>

          {/* Counter */}
          <div className="col-md-2 mb-3">
            <label className="form-label fw-bold">Current Number</label>
            <input
              type="number"
              className="form-control"
              value={counter}
              onChange={(e) => setCounter(parseInt(e.target.value, 10) || 0)}
            />
          </div>
        </div>

        {/* Control Number Preview */}
        <div className="alert alert-primary fs-5">
          <strong>Control Number: </strong>
          <span>{controlNo}</span>
        </div>

        {/* Age Inputs */}
        <div className="mt-3">
          <label className="form-label fw-bold">Age</label>
          <div className="row">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                min="0"
                max="120"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col-md-8">
              <input
                type="range"
                className="form-range"
                min="0"
                max="120"
                value={age || 0}
                onChange={(e) => setAge(e.target.value)}
              />
              <small className="text-muted">Slide to select age (0-120)</small>
            </div>
          </div>
        </div>

        {/* Gender & Service Selection */}
        <div className="row mt-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Gender <span className="fst-italic text-muted fw-normal fs-6">(Press M or F)</span>
            </label>
            {['Male', 'Female'].map((item) => (
              <div className="form-check" key={item}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id={item.toLowerCase()}
                  value={item}
                  checked={gender === item}
                  onChange={() => setGender(item)}
                />
                <label className="form-check-label" htmlFor={item.toLowerCase()}>
                  <span className="bg-warning-subtle text-decoration-underline fw-bold px-1 rounded">
                    {item[0]}
                  </span>
                  {item.slice(1)}
                </label>
              </div>
            ))}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              Service Availed <span className="fst-italic text-muted fw-normal fs-6">(Press 1-0 or S, E, P, L, R, U, C, I)</span>
            </label>
            {serviceOptions.map((option) => (
              <div className="form-check" key={option.value}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="service"
                  id={`service-${option.shortcut}`}
                  value={option.value}
                  checked={service === option.value}
                  onChange={() => setService(option.value)}
                />
                <label className="form-check-label" htmlFor={`service-${option.shortcut}`}>
                  <span className="bg-warning-subtle text-decoration-underline fw-bold px-1 rounded">
                    {option.shortcut}
                  </span>
                  . {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 mb-5">
          <button className="btn btn-success btn-lg w-100 fw-semibold" onClick={handleOpenForm}>
            Open Google Form
          </button>
        </div>
      </div>

      {/* Google Form Modal */}
      <div className="modal fade" id="googleFormModal" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Customer Satisfaction Form</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-0">
              <iframe id="googleFrame" width="100%" height="700" style={{ border: 0 }} title="Google Form"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}