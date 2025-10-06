import { faker } from '@faker-js/faker';

// Generate healthcare patient data
function generatePatient() {
  const age = faker.number.int({ min: 1, max: 100 });
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return {
    id: faker.string.uuid(),
    patientId: faker.string.alphanumeric(10).toUpperCase(),
    personalInfo: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.birthdate({ min: age, max: age, mode: 'age' }),
      age: age,
      gender: faker.person.sex(),
      ssn: faker.string.numeric(9),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      emergencyContact: {
        name: faker.person.fullName(),
        relationship: faker.helpers.arrayElement(['spouse', 'parent', 'child', 'sibling', 'friend']),
        phone: faker.phone.number()
      }
    },
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    },
    medicalInfo: {
      bloodType: faker.helpers.arrayElement(bloodTypes),
      allergies: faker.helpers.arrayElements([
        'penicillin', 'sulfa', 'aspirin', 'nuts', 'shellfish', 'eggs', 'milk', 'wheat'
      ], { min: 0, max: 3 }),
      chronicConditions: faker.helpers.arrayElements([
        'diabetes', 'hypertension', 'asthma', 'arthritis', 'depression', 'anxiety', 'heart_disease'
      ], { min: 0, max: 2 }),
      medications: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
        name: faker.science.chemicalElement().name + ' ' + faker.string.alpha(3),
        dosage: faker.number.int({ min: 1, max: 100 }) + 'mg',
        frequency: faker.helpers.arrayElement(['daily', 'twice daily', 'three times daily', 'as needed']),
        prescribedBy: faker.person.fullName(),
        prescribedDate: faker.date.past()
      })),
      insurance: {
        provider: faker.company.name() + ' Health Insurance',
        policyNumber: faker.string.alphanumeric(12),
        groupNumber: faker.string.alphanumeric(8),
        coverage: faker.helpers.arrayElement(['full', 'partial', 'minimum'])
      }
    },
    vitalSigns: {
      height: faker.number.float({ min: 120, max: 200, fractionDigits: 1 }), // cm
      weight: faker.number.float({ min: 40, max: 150, fractionDigits: 1 }), // kg
      bmi: faker.number.float({ min: 15, max: 40, fractionDigits: 1 }),
      bloodPressure: {
        systolic: faker.number.int({ min: 90, max: 180 }),
        diastolic: faker.number.int({ min: 60, max: 120 }),
        lastMeasured: faker.date.recent()
      },
      heartRate: faker.number.int({ min: 50, max: 120 }),
      temperature: faker.number.float({ min: 35.5, max: 40.5, fractionDigits: 1 }),
      oxygenSaturation: faker.number.int({ min: 85, max: 100 })
    },
    medicalHistory: {
      lastVisit: faker.date.recent(),
      primaryPhysician: faker.person.fullName(),
      hospitalVisits: faker.number.int({ min: 0, max: 20 }),
      surgeries: faker.helpers.arrayElements([
        'appendectomy', 'tonsillectomy', 'knee surgery', 'heart surgery', 'gallbladder removal'
      ], { min: 0, max: 2 }),
      immunizations: faker.helpers.arrayElements([
        'MMR', 'DTaP', 'Polio', 'Hepatitis B', 'Varicella', 'COVID-19', 'Flu'
      ], { min: 3, max: 8 })
    },
    status: faker.helpers.arrayElement(['active', 'inactive', 'deceased', 'transferred']),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate appointment data
function generateAppointment() {
  const appointmentDate = faker.date.future();
  const duration = faker.number.int({ min: 15, max: 120 }); // minutes

  return {
    id: faker.string.uuid(),
    appointmentId: faker.string.alphanumeric(8).toUpperCase(),
    patientId: faker.string.uuid(),
    patient: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      dateOfBirth: faker.date.birthdate(),
      phone: faker.phone.number()
    },
    provider: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      specialty: faker.helpers.arrayElement([
        'General Practice', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics',
        'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Urology'
      ]),
      department: faker.helpers.arrayElement([
        'Internal Medicine', 'Surgery', 'Emergency', 'Outpatient', 'Inpatient'
      ])
    },
    type: faker.helpers.arrayElement(['consultation', 'follow_up', 'procedure', 'checkup', 'emergency']),
    status: faker.helpers.arrayElement(['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show']),
    scheduledDate: appointmentDate,
    duration: duration,
    endTime: new Date(appointmentDate.getTime() + duration * 60000),
    location: {
      facility: faker.company.name() + ' Medical Center',
      room: faker.string.alphanumeric(3).toUpperCase(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number()
    },
    reason: faker.lorem.sentence(),
    notes: faker.lorem.paragraph(),
    insurance: {
      verified: faker.datatype.boolean(),
      copay: faker.number.int({ min: 0, max: 100 }),
      coverage: faker.helpers.arrayElement(['covered', 'partial', 'not_covered'])
    },
    followUp: faker.datatype.boolean() ? {
      required: true,
      date: faker.date.future(),
      reason: faker.lorem.sentence()
    } : { required: false },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate medication data
function generateMedication() {
  return {
    id: faker.string.uuid(),
    medicationId: faker.string.alphanumeric(12).toUpperCase(),
    name: faker.science.chemicalElement().name + ' ' + faker.string.alpha(4),
    genericName: faker.science.chemicalElement().name.toLowerCase(),
    brandName: faker.company.name(),
    category: faker.helpers.arrayElement([
      'analgesic', 'antibiotic', 'antidepressant', 'antihypertensive', 'antidiabetic',
      'anticoagulant', 'antihistamine', 'corticosteroid', 'diuretic', 'statin'
    ]),
    strength: faker.number.int({ min: 1, max: 1000 }) + faker.helpers.arrayElement(['mg', 'mcg', 'g', 'mL', 'IU']),
    form: faker.helpers.arrayElement(['tablet', 'capsule', 'liquid', 'injection', 'cream', 'inhaler', 'patch']),
    dosage: {
      amount: faker.number.int({ min: 1, max: 4 }),
      frequency: faker.helpers.arrayElement(['once daily', 'twice daily', 'three times daily', 'four times daily', 'as needed']),
      route: faker.helpers.arrayElement(['oral', 'intravenous', 'intramuscular', 'subcutaneous', 'topical', 'inhalation'])
    },
    indications: faker.helpers.arrayElements([
      'pain relief', 'infection', 'hypertension', 'diabetes', 'depression', 'inflammation', 'asthma'
    ], { min: 1, max: 3 }),
    contraindications: faker.helpers.arrayElements([
      'pregnancy', 'lactation', 'renal impairment', 'hepatic disease', 'allergy'
    ], { min: 0, max: 2 }),
    sideEffects: faker.helpers.arrayElements([
      'nausea', 'dizziness', 'headache', 'fatigue', 'rash', 'constipation', 'diarrhea'
    ], { min: 0, max: 4 }),
    interactions: faker.helpers.arrayElements([
      'warfarin', 'aspirin', 'ibuprofen', 'acetaminophen', 'lisinopril'
    ], { min: 0, max: 3 }),
    prescription: {
      required: faker.datatype.boolean(),
      controlled: faker.datatype.boolean({ probability: 0.2 }),
      schedule: faker.datatype.boolean() ? faker.helpers.arrayElement(['II', 'III', 'IV', 'V']) : null
    },
    manufacturer: faker.company.name(),
    ndc: faker.string.numeric(11),
    price: {
      retail: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
      insurance: faker.number.float({ min: 0, max: 50, fractionDigits: 2 })
    },
    availability: faker.helpers.arrayElement(['in_stock', 'limited', 'out_of_stock', 'discontinued']),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate vital signs data
function generateVitalSigns() {
  return {
    id: faker.string.uuid(),
    patientId: faker.string.uuid(),
    recordedAt: faker.date.recent(),
    recordedBy: faker.person.fullName(),
    location: faker.helpers.arrayElement(['clinic', 'hospital', 'home', 'telemedicine']),
    measurements: {
      bloodPressure: {
        systolic: faker.number.int({ min: 90, max: 180 }),
        diastolic: faker.number.int({ min: 60, max: 120 }),
        position: faker.helpers.arrayElement(['sitting', 'standing', 'lying']),
        arm: faker.helpers.arrayElement(['left', 'right'])
      },
      heartRate: faker.number.int({ min: 50, max: 120 }),
      temperature: faker.number.float({ min: 35.5, max: 40.5, fractionDigits: 1 }),
      respiratoryRate: faker.number.int({ min: 12, max: 30 }),
      oxygenSaturation: faker.number.int({ min: 85, max: 100 }),
      weight: faker.number.float({ min: 40, max: 150, fractionDigits: 1 }),
      height: faker.number.float({ min: 120, max: 200, fractionDigits: 1 }),
      bmi: faker.number.float({ min: 15, max: 40, fractionDigits: 1 }),
      painScale: faker.number.int({ min: 0, max: 10 })
    },
    notes: faker.lorem.sentence(),
    abnormal: faker.datatype.boolean({ probability: 0.2 }),
    flagged: faker.datatype.boolean({ probability: 0.1 }),
    createdAt: faker.date.recent()
  };
}

// Generate medical record data
function generateMedicalRecord() {
  return {
    id: faker.string.uuid(),
    recordId: faker.string.alphanumeric(12).toUpperCase(),
    patientId: faker.string.uuid(),
    type: faker.helpers.arrayElement(['visit', 'procedure', 'test', 'prescription', 'admission', 'discharge']),
    date: faker.date.recent(),
    provider: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      specialty: faker.helpers.arrayElement([
        'General Practice', 'Cardiology', 'Radiology', 'Laboratory', 'Surgery'
      ]),
      npi: faker.string.numeric(10)
    },
    facility: {
      name: faker.company.name() + ' Medical Center',
      address: faker.location.streetAddress(),
      phone: faker.phone.number()
    },
    diagnosis: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      code: faker.string.alphanumeric(6).toUpperCase(),
      description: faker.lorem.sentence(),
      icd10: faker.string.alphanumeric(6).toUpperCase()
    })),
    procedures: faker.helpers.arrayElements([
      'physical examination', 'blood test', 'x-ray', 'MRI', 'CT scan', 'ultrasound',
      'endoscopy', 'biopsy', 'surgery', 'vaccination'
    ], { min: 0, max: 3 }),
    medications: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      name: faker.science.chemicalElement().name + ' ' + faker.string.alpha(3),
      dosage: faker.number.int({ min: 1, max: 100 }) + 'mg',
      instructions: faker.lorem.sentence()
    })),
    labResults: faker.datatype.boolean() ? Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      test: faker.helpers.arrayElement(['CBC', 'CMP', 'Lipid Panel', 'TSH', 'HbA1c']),
      value: faker.number.float({ min: 1, max: 200, fractionDigits: 1 }),
      unit: faker.helpers.arrayElement(['mg/dL', 'g/dL', 'IU/mL', '%', 'mmol/L']),
      referenceRange: faker.string.alphanumeric(8),
      abnormal: faker.datatype.boolean({ probability: 0.3 })
    })) : [],
    notes: faker.lorem.paragraph(),
    attachments: faker.helpers.multiple(() => ({
      id: faker.string.uuid(),
      filename: faker.system.fileName(),
      type: faker.helpers.arrayElement(['pdf', 'jpg', 'png', 'doc']),
      url: faker.internet.url()
    }), { count: { min: 0, max: 3 } }),
    billing: {
      cpt: faker.string.alphanumeric(5),
      icd: faker.string.alphanumeric(6),
      cost: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
      insurancePaid: faker.number.float({ min: 0, max: 4000, fractionDigits: 2 }),
      patientPaid: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })
    },
    followUp: faker.datatype.boolean() ? {
      required: true,
      date: faker.date.future(),
      instructions: faker.lorem.sentence()
    } : { required: false },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

export default function handler(req, res) {
  const { method, query } = req;
  const { endpoint } = query;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const count = parseInt(query.count) || 20;
    const page = parseInt(query.page) || 1;

    switch (endpoint) {
      case 'patients':
        if (method === 'GET') {
          const patients = Array.from({ length: count }, () => generatePatient());
          res.status(200).json({
            data: patients,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_age: patients.reduce((sum, p) => sum + p.personalInfo.age, 0) / patients.length,
              active_count: patients.filter(p => p.status === 'active').length,
              by_blood_type: patients.reduce((acc, p) => {
                acc[p.medicalInfo.bloodType] = (acc[p.medicalInfo.bloodType] || 0) + 1;
                return acc;
              }, {})
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'appointments':
        if (method === 'GET') {
          const appointments = Array.from({ length: count }, () => generateAppointment());
          res.status(200).json({
            data: appointments,
            meta: {
              total: count,
              page: page,
              per_page: count,
              scheduled_count: appointments.filter(a => a.status === 'scheduled').length,
              completed_count: appointments.filter(a => a.status === 'completed').length,
              avg_duration: appointments.reduce((sum, a) => sum + a.duration, 0) / appointments.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'medications':
        if (method === 'GET') {
          const medications = Array.from({ length: count }, () => generateMedication());
          res.status(200).json({
            data: medications,
            meta: {
              total: count,
              page: page,
              per_page: count,
              controlled_count: medications.filter(m => m.prescription.controlled).length,
              by_category: medications.reduce((acc, m) => {
                acc[m.category] = (acc[m.category] || 0) + 1;
                return acc;
              }, {})
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'vitals':
        if (method === 'GET') {
          const vitals = Array.from({ length: count }, () => generateVitalSigns());
          res.status(200).json({
            data: vitals,
            meta: {
              total: count,
              page: page,
              per_page: count,
              abnormal_count: vitals.filter(v => v.abnormal).length,
              avg_heart_rate: vitals.reduce((sum, v) => sum + v.measurements.heartRate, 0) / vitals.length,
              avg_temperature: vitals.reduce((sum, v) => sum + v.measurements.temperature, 0) / vitals.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'records':
        if (method === 'GET') {
          const records = Array.from({ length: count }, () => generateMedicalRecord());
          res.status(200).json({
            data: records,
            meta: {
              total: count,
              page: page,
              per_page: count,
              by_type: records.reduce((acc, r) => {
                acc[r.type] = (acc[r.type] || 0) + 1;
                return acc;
              }, {}),
              total_cost: records.reduce((sum, r) => sum + r.billing.cost, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'doctors':
        if (method === 'GET') {
          const doctors = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            specialty: faker.helpers.arrayElement([
              'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology',
              'Psychiatry', 'Radiology', 'Surgery', 'Internal Medicine', 'Emergency Medicine'
            ]),
            license: faker.string.alphanumeric(10).toUpperCase(),
            experience: faker.number.int({ min: 1, max: 40 }),
            rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
            reviews: faker.number.int({ min: 0, max: 500 }),
            availability: {
              monday: faker.helpers.arrayElement(['9:00-17:00', '10:00-18:00', '8:00-16:00']),
              tuesday: faker.helpers.arrayElement(['9:00-17:00', '10:00-18:00', '8:00-16:00']),
              wednesday: faker.helpers.arrayElement(['9:00-17:00', '10:00-18:00', '8:00-16:00']),
              thursday: faker.helpers.arrayElement(['9:00-17:00', '10:00-18:00', '8:00-16:00']),
              friday: faker.helpers.arrayElement(['9:00-17:00', '10:00-18:00', '8:00-16:00']),
              saturday: faker.datatype.boolean() ? faker.helpers.arrayElement(['9:00-13:00', '10:00-14:00']) : null,
              sunday: faker.datatype.boolean() ? faker.helpers.arrayElement(['9:00-13:00', '10:00-14:00']) : null
            },
            contact: {
              phone: faker.phone.number(),
              email: faker.internet.email(),
              address: faker.location.streetAddress()
            },
            education: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
              degree: faker.helpers.arrayElement(['MD', 'DO', 'PhD', 'MS']),
              institution: faker.company.name() + ' Medical School',
              year: faker.number.int({ min: 1980, max: 2020 })
            })),
            certifications: faker.helpers.arrayElements([
              'Board Certified', 'Fellowship Trained', 'Advanced Life Support', 'Pediatric Advanced Life Support'
            ], { min: 1, max: 4 }),
            languages: faker.helpers.arrayElements([
              'English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'
            ], { min: 1, max: 3 }),
            acceptingPatients: faker.datatype.boolean()
          }));
          res.status(200).json({
            data: doctors,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_rating: doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length,
              accepting_count: doctors.filter(d => d.acceptingPatients).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'departments':
        if (method === 'GET') {
          const departments = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.helpers.arrayElement([
              'Emergency', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
              'Surgery', 'Radiology', 'Laboratory', 'Pharmacy', 'Intensive Care'
            ]),
            description: faker.lorem.sentences(2),
            floor: faker.number.int({ min: 1, max: 10 }),
            roomCount: faker.number.int({ min: 5, max: 50 }),
            bedCount: faker.number.int({ min: 10, max: 200 }),
            staff: {
              doctors: faker.number.int({ min: 2, max: 20 }),
              nurses: faker.number.int({ min: 5, max: 50 }),
              technicians: faker.number.int({ min: 2, max: 15 }),
              administrators: faker.number.int({ min: 1, max: 5 })
            },
            equipment: faker.helpers.arrayElements([
              'MRI Scanner', 'CT Scanner', 'X-ray Machine', 'Ultrasound', 'Ventilators',
              'Defibrillators', 'Patient Monitors', 'Surgical Tools'
            ], { min: 3, max: 8 }),
            services: faker.helpers.arrayElements([
              'Emergency Care', 'Surgery', 'Diagnostics', 'Treatment', 'Rehabilitation',
              'Consultation', 'Monitoring', 'Pharmacy'
            ], { min: 2, max: 6 }),
            head: {
              name: faker.person.fullName(),
              title: 'Department Head',
              experience: faker.number.int({ min: 5, max: 30 })
            },
            contact: {
              phone: faker.phone.number(),
              email: faker.internet.email()
            },
            operatingHours: '24/7',
            occupancy: faker.number.float({ min: 0.3, max: 0.95, fractionDigits: 2 })
          }));
          res.status(200).json({
            data: departments,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_beds: departments.reduce((sum, d) => sum + d.bedCount, 0),
              avg_occupancy: departments.reduce((sum, d) => sum + d.occupancy, 0) / departments.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'insurance':
        if (method === 'GET') {
          const insurance = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            provider: faker.company.name() + ' Health Insurance',
            planName: faker.helpers.arrayElement([
              'Basic Coverage', 'Standard Plan', 'Premium Plan', 'Family Plan', 'Senior Plan',
              'Student Plan', 'Individual Plan', 'Group Plan'
            ]),
            type: faker.helpers.arrayElement(['HMO', 'PPO', 'POS', 'EPO', 'HDHP']),
            coverage: {
              inpatient: faker.number.float({ min: 0.7, max: 1.0, fractionDigits: 2 }),
              outpatient: faker.number.float({ min: 0.7, max: 1.0, fractionDigits: 2 }),
              prescription: faker.number.float({ min: 0.7, max: 1.0, fractionDigits: 2 }),
              dental: faker.datatype.boolean(),
              vision: faker.datatype.boolean(),
              mentalHealth: faker.datatype.boolean()
            },
            deductibles: {
              individual: faker.number.int({ min: 500, max: 5000 }),
              family: faker.number.int({ min: 1000, max: 10000 })
            },
            premiums: {
              monthly: faker.number.int({ min: 100, max: 1000 }),
              annual: faker.number.int({ min: 1200, max: 12000 })
            },
            network: faker.helpers.arrayElement(['Narrow', 'Broad', 'Open Access']),
            enrollment: {
              open: faker.datatype.boolean(),
              deadline: faker.date.future(),
              requirements: faker.helpers.arrayElements([
                'Proof of income', 'Medical examination', 'Application form', 'Payment of first premium'
              ], { min: 1, max: 3 })
            },
            benefits: faker.helpers.arrayElements([
              'Preventive care', 'Emergency services', 'Hospitalization', 'Ambulance',
              'Maternity care', 'Wellness programs', 'Telemedicine'
            ], { min: 3, max: 7 }),
            exclusions: faker.helpers.arrayElements([
              'Cosmetic procedures', 'Experimental treatments', 'Pre-existing conditions',
              'Alternative medicine', 'Weight loss programs'
            ], { min: 1, max: 4 })
          }));
          res.status(200).json({
            data: insurance,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_monthly_premium: insurance.reduce((sum, i) => sum + i.premiums.monthly, 0) / insurance.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'billing':
        if (method === 'GET') {
          const billing = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            patientId: faker.string.uuid(),
            invoiceNumber: faker.string.alphanumeric(10).toUpperCase(),
            date: faker.date.recent(),
            dueDate: faker.date.future(),
            status: faker.helpers.arrayElement(['pending', 'paid', 'overdue', 'cancelled', 'refunded']),
            items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
              description: faker.helpers.arrayElement([
                'Consultation', 'Surgery', 'Medication', 'Lab Test', 'X-ray', 'MRI',
                'Physical Therapy', 'Emergency Visit', 'Hospital Stay', 'Vaccination'
              ]),
              code: faker.string.alphanumeric(6).toUpperCase(),
              quantity: faker.number.int({ min: 1, max: 5 }),
              unitPrice: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
              total: faker.number.float({ min: 50, max: 25000, fractionDigits: 2 })
            })),
            subtotal: faker.number.float({ min: 100, max: 50000, fractionDigits: 2 }),
            tax: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
            insurance: {
              provider: faker.company.name(),
              coverage: faker.number.float({ min: 0, max: 0.9, fractionDigits: 2 }),
              amount: faker.number.float({ min: 0, max: 45000, fractionDigits: 2 })
            },
            total: faker.number.float({ min: 50, max: 10000, fractionDigits: 2 }),
            paid: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
            balance: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
            paymentMethod: faker.helpers.arrayElement(['credit_card', 'insurance', 'cash', 'check', 'bank_transfer']),
            notes: faker.lorem.sentences(2)
          }));
          res.status(200).json({
            data: billing,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_amount: billing.reduce((sum, b) => sum + b.total, 0),
              paid_count: billing.filter(b => b.status === 'paid').length,
              avg_balance: billing.reduce((sum, b) => sum + b.balance, 0) / billing.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'emergencies':
        if (method === 'GET') {
          const emergencies = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            patientId: faker.string.uuid(),
            incidentId: faker.string.alphanumeric(8).toUpperCase(),
            timestamp: faker.date.recent(),
            location: faker.location.streetAddress(),
            type: faker.helpers.arrayElement([
              'Heart Attack', 'Stroke', 'Trauma', 'Respiratory Distress', 'Seizure',
              'Overdose', 'Allergic Reaction', 'Burns', 'Fracture', 'Internal Bleeding'
            ]),
            severity: faker.helpers.arrayElement(['critical', 'urgent', 'stable']),
            triage: {
              level: faker.number.int({ min: 1, max: 5 }),
              color: faker.helpers.arrayElement(['red', 'orange', 'yellow', 'green', 'blue']),
              priority: faker.helpers.arrayElement(['immediate', 'urgent', 'delayed', 'minimal'])
            },
            vitalSigns: {
              bloodPressure: faker.helpers.arrayElement(['120/80', '140/90', '160/100', '90/60']),
              heartRate: faker.number.int({ min: 50, max: 180 }),
              temperature: faker.number.float({ min: 95, max: 105, fractionDigits: 1 }),
              oxygenSaturation: faker.number.int({ min: 85, max: 100 }),
              respiratoryRate: faker.number.int({ min: 10, max: 40 })
            },
            symptoms: faker.helpers.arrayElements([
              'Chest pain', 'Shortness of breath', 'Severe headache', 'Unconsciousness',
              'Bleeding', 'Burns', 'Broken bones', 'Difficulty breathing', 'Seizures'
            ], { min: 1, max: 4 }),
            response: {
              ambulance: faker.datatype.boolean(),
              responseTime: faker.number.int({ min: 5, max: 30 }),
              hospital: faker.company.name() + ' Hospital',
              department: 'Emergency Room'
            },
            treatment: faker.helpers.arrayElements([
              'CPR', 'Defibrillation', 'IV Fluids', 'Oxygen Therapy', 'Pain Medication',
              'Wound Care', 'Splinting', 'Stabilization'
            ], { min: 1, max: 5 }),
            outcome: faker.helpers.arrayElement(['admitted', 'discharged', 'transferred', 'deceased']),
            followUp: faker.datatype.boolean() ? {
              appointment: faker.date.future(),
              instructions: faker.lorem.sentences(3)
            } : null
          }));
          res.status(200).json({
            data: emergencies,
            meta: {
              total: count,
              page: page,
              per_page: count,
              critical_count: emergencies.filter(e => e.severity === 'critical').length,
              avg_response_time: emergencies.reduce((sum, e) => sum + e.response.responseTime, 0) / emergencies.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      default:
        res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}