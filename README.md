# survey
survey for owwa

## Importing survey responses

After signing in, upload a CSV export with the `control_no`, `survey_date`, `gender`, `age`, `program`, `cc1`-`cc3`, `sqd0`-`sqd8`, and `comments` columns. Review and edit the imported rows; rows with unsupported values or invalid dates show validation errors and cannot be opened until corrected. Use **Open form** on a row or **Open next valid row** to prefill the Google Form from that row. Each form still needs to be reviewed and submitted manually.

The `program` field accepts these report codes: `bpbh`, `membership_oec`, `wap_bereavement`, `elap_scholarship`, `cash_release`, `rebate`, `medplus`, `sup`, `migrants_brew`, and `others`. Age is converted to the matching form age group, and rating values `1`-`5` map to the corresponding choices; `N/A` is accepted where the form offers it.
