/* ==========================================================================
   Central clinic configuration — every fact shown on the website lives here.
   Do not add unverified information (experience, awards, reviews, stats).
   ========================================================================== */

export const clinic = {
  name: "Dr. Zia's OPD Clinic",
  tagline: 'YOUR HEALTH, OUR PRIORITY',
  doctor: {
    name: 'Dr. Zia Ul Islam',
    designation: 'Physician',
    qualifications: ['MBBS', 'DNB General Medicine'],
    qualificationsLine: 'MBBS · DNB General Medicine',
    qualificationsPipe: 'MBBS | DNB General Medicine',
  },
  address: {
    street: 'Iqbal Market',
    city: 'Kupwara',
    region: 'Jammu & Kashmir',
    country: 'India',
    lines: ['Iqbal Market,', 'Kupwara,', 'Jammu & Kashmir, India.'],
    full: 'Iqbal Market, Kupwara, Jammu & Kashmir, India.',
    singleLine: 'Iqbal Market, Kupwara, Jammu & Kashmir, India',
  },
  phone: {
    display: '+91 7889892181',
    displayShort: '7889892181',
    tel: 'tel:+917889892181',
    waBase: 'https://wa.me/917889892181',
  },
  hero: {
    heading: 'Trusted Medical Care, Close to Home.',
    supporting:
      "Consult Dr. Zia Ul Islam at Dr. Zia's OPD Clinic, conveniently located at Iqbal Market, Kupwara.",
    locationLabel: 'Iqbal Market, Kupwara',
  },
  notice: 'Please confirm consultation availability by contacting the clinic before visiting.',
  disclaimer:
    'Information on this website is for general guidance. Please contact the clinic to confirm consultation availability.',
  whatsappIntro:
    "Hello, I would like to enquire about consultation at Dr. Zia's OPD Clinic. Could you please confirm the available OPD timings?",
} as const;

/** Build a WhatsApp chat link with a prefilled message. */
export function waLink(message: string): string {
  return `${clinic.phone.waBase}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppLink = waLink(clinic.whatsappIntro);

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Doctor', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'OPD Timings', href: '#timings' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
] as const;

/* --------------------------------------------------------------------------
   Consultation services
   -------------------------------------------------------------------------- */

export type ServiceIconKey =
  | 'gauge'
  | 'heart'
  | 'wind'
  | 'stethoscope'
  | 'utensils'
  | 'brain';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconKey;
}

export const services: Service[] = [
  {
    id: 'diabetes-hypertension',
    title: 'Diabetes & Hypertension',
    description:
      'Ongoing guidance for managing blood sugar and blood pressure, with follow-up review of your reports.',
    icon: 'gauge',
  },
  {
    id: 'heart-diseases',
    title: 'Heart Diseases',
    description:
      'Assessment and consultation for common heart-related concerns, including chest discomfort and high cardiac risk.',
    icon: 'heart',
  },
  {
    id: 'respiratory-issues',
    title: 'Respiratory Issues',
    description:
      'Care for breathing difficulties, persistent cough, asthma and other everyday respiratory complaints.',
    icon: 'wind',
  },
  {
    id: 'thyroid-disorders',
    title: 'Thyroid Disorders',
    description:
      'Evaluation and management of thyroid imbalance and the symptoms that often come with it.',
    icon: 'stethoscope',
  },
  {
    id: 'gastrointestinal-disorders',
    title: 'Gastrointestinal Disorders',
    description:
      'Consultation for digestive problems such as acidity, gastritis, abdominal pain and bowel irregularity.',
    icon: 'utensils',
  },
  {
    id: 'neurological-disorders',
    title: 'Neurological Disorders',
    description:
      'Assessment of headaches, dizziness, numbness, weakness and other nervous system symptoms.',
    icon: 'brain',
  },
];

/* --------------------------------------------------------------------------
   Weekly OPD schedule (all seven days) — standing schedule, the same every week.
   Source: doctor-confirmed timetable (Nov 2026). These timings do NOT rotate or
   change from week to week; Thursday and Friday are OFF. No special/one-off
   appointment dates.
   -------------------------------------------------------------------------- */

export type SessionPeriod = 'morning' | 'evening' | 'day';

export interface DaySession {
  period: SessionPeriod;
  time: string;
}

export interface DaySchedule {
  /** 0 = Sunday … 6 = Saturday (matches Date.getDay()) */
  index: number;
  day: string;
  shortDay: string;
  sessions: DaySession[];
  /** True when the clinic holds no OPD on this day. */
  off?: true;
}

const MORNING: DaySession = { period: 'morning', time: '08:00 AM – 09:45 AM' };
const EVENING: DaySession = { period: 'evening', time: '04:30 PM – 06:30 PM' };

export const weeklySchedule: DaySchedule[] = [
  { index: 1, day: 'Monday', shortDay: 'Mon', sessions: [MORNING] },
  { index: 2, day: 'Tuesday', shortDay: 'Tue', sessions: [EVENING] },
  { index: 3, day: 'Wednesday', shortDay: 'Wed', sessions: [MORNING] },
  { index: 4, day: 'Thursday', shortDay: 'Thu', sessions: [], off: true },
  { index: 5, day: 'Friday', shortDay: 'Fri', sessions: [], off: true },
  {
    index: 6,
    day: 'Saturday',
    shortDay: 'Sat',
    sessions: [EVENING],
  },
  {
    index: 0,
    day: 'Sunday',
    shortDay: 'Sun',
    sessions: [{ period: 'day', time: '08:00 AM – 03:00 PM' }],
  },
];

/* --------------------------------------------------------------------------
   FAQ
   -------------------------------------------------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Where is Dr. Zia’s OPD Clinic located?',
    answer:
      'The clinic is located at Iqbal Market, Kupwara, Jammu & Kashmir, India. You can use the directions button in the Location section to open the address in Google Maps.',
  },
  {
    question: 'What are the regular OPD timings?',
    answer:
      'Monday and Wednesday morning: 08:00 AM – 09:45 AM. Tuesday and Saturday evening: 04:30 PM – 06:30 PM. Sunday: 08:00 AM – 03:00 PM. Thursday and Friday are off. Please call the clinic before visiting to confirm availability.',
  },
  {
    question: 'How can I contact the clinic?',
    answer:
      'Call the clinic on +91 7889892181, or send a WhatsApp enquiry to the same number. Both options are available in the Contact section of this page.',
  },
  {
    question: 'Does the clinic offer morning and evening consultations?',
    answer:
      'Yes. Morning consultations are held on Monday and Wednesday from 08:00 AM to 09:45 AM. Evening consultations are held on Tuesday and Saturday from 04:30 PM to 06:30 PM. Sunday consultations run from 08:00 AM to 03:00 PM.',
  },
  {
    question: 'Should I call before visiting?',
    answer:
      'Yes. Please call the clinic before visiting to confirm consultation availability for that day.',
  },
  {
    question: 'How can I enquire about an appointment?',
    answer:
      'Use the “Plan Your Visit” enquiry form to send your preferred day and session directly to the clinic on WhatsApp, or simply call +91 7889892181. Sending an enquiry does not book an appointment — the clinic must confirm it with you.',
  },
  {
    question: 'Which medical conditions are covered in consultation?',
    answer:
      'Consultation covers diabetes and hypertension, heart diseases, respiratory issues, thyroid disorders, gastrointestinal disorders and neurological disorders. For anything unclear, please call the clinic directly.',
  },
];
