# survey
survey for owwa

## Importing survey responses

After signing in, upload a CSV export with the `control_no`, `survey_date`, `gender`, `age`, `program`, `cc1`-`cc3`, `sqd0`-`sqd8`, and `comments` columns. Review and edit the imported rows; rows with unsupported values or invalid dates show validation errors and cannot be opened until corrected. Use **Open form** on a row or **Open next valid row** to prefill the Google Form from that row. Each form still needs to be reviewed and submitted manually.

The `program` field accepts these codes:

| Code | Program |
| --- | --- |
| `repatriation_transportation_financial_assistance` | Repatriation - Transportation Assistance/Financial Assistance |
| `edsp` | Scholarship - Education for Development Scholarship Program (EDSP) |
| `odsp` | Scholarship - OFW Dependants Scholarship Program (ODSP) |
| `bpbh` | Livelihood Assistance - Balik Pinas, Balik Hanapbuhay (BPBH) |
| `tulong_puso` | Livelihood Assistance - Tulong Puso Program |
| `sena` | Legal Assistance - Single Entry Approach Process (SENA) |
| `social_benefits_disability_dismemberment` | Social Benefits - Disability and Dismemberment |
| `social_benefits_death_human_remains` | Social Benefits - Death Benefits/Human Remains |
| `sesp` | Skills for Employment Scholarship (SESP) |
| `it_program` | Information Technology (IT) Program |
| `elap_scholarship` | Education and Livelihood Assistance Program (ELAP) |
| `cmwsp` | Congressional Migrant Workers (CMWSP) |
| `tap` | Tuloy Aral Program (TAP) |
| `pdos` | Pre-Departure Orientation Seminar (PDOS) |
| `language_culture_familiarization` | Language & Culture & Familiarization |
| `psychosocial_counselling` | Psycho-Social Counselling |
| `edlp` | Enterprise Development and Loan Program (EDLP) |
| `elap_livelihood` | Livelihood Support for Families for Deceased OFWs (ELAP-Livelihood Component) |
| `membership_oec` | Membership Promotion/Processing/Collection |
| `wap_bereavement` | Welfare Assistance Program (WAP) |
| `wap-medical` | Welfare Assistance Program (WAP) |
| `wap_medical` | Welfare Assistance Program (WAP) |
| `medplus` | Supplemental Medical Assistance for OFWs (MedPlus) |
| `ease` | Educational Assistance Through Scholarship in Emergencies (EASE) |
| `pap` | Project-Alalay sa Pag-aaral para sa mga Anak-OFWs sa Panahon ng Pandemya (PAP) |
| `agapay` | Agapay sa Naulila ng OFW (Agapay Project) |
| `frap` | Financial Relief Assistance Package (FRAP) |
| `parokya_owwa` | Parokya ng OWWA |
| `occ` | OFW Children Circle (OCC) |
| `hasc` | Humanitarian Assistance for OFWs with pending claims (HASC) |
| `tabang` | TABANG |
| `rebate` | REBATE Program |
| `cpdep` | Comprehensive Pre-Departure Education Program (CPDEP) |
| `opcenter_concern` | OPCenter Concern |
| `seafarers_hub` | Seafarers Hub |
| `sup` | Seafarers Upgraded Program (SUP) |
| `ofw_lounge_terminal_1` | OFW Lounge (Terminal 1) |
| `ofw_lounge_terminal_3` | OFW Lounge (Terminal 3) |
| `migrants_brew` | Migrants Brew |
| `cash_release` | Cash Releasing/Check Releasing |
| `courier_subcontractors_messengers` | Courier Services (Mail and Parcel Delivery) thru Sub-Contractors and Messengers |
| `courier_services` | Courier Services (Mail and Parcel Delivery) |
| `records_management_handling` | Records Management and Handling |
| `fund_transfer_payment_procedures` | Fund Transfer/Payment Procedures |
| `preventive_maintenance_technical_support` | Preventive Maintenance and Technical Support Services |
| `payroll_processing` | Payroll Processing |
| `request_transport_service` | Request for Transport Service |
| `online_application_development` | Development of Online Application for OWWA's Programs and Services |
| `pdos_provider_recognition` | Recognition for the Pre-Departure Orientation Seminar Providers |
| `foi_inquiries` | Freedom of Information (FOI) Inquiries |
| `alagang_owwa_medical_checkup` | Alagang OWWA Serbisyong May Puso Medical Check Up |
| `others` | Others |

The new codes are stable CSV import aliases based on the program names, not verified official OWWA codes. Existing report codes such as `bpbh`, `membership_oec`, and `wap_bereavement` remain supported. Age is converted to the matching form age group, and rating values `1`-`5` map to the corresponding choices; `N/A` is accepted where the form offers it.
