import type { ClinicSession, Patient } from "../types/patient";

const PATIENTS_KEY = "cbu_clinic_patients";
const SESSIONS_KEY = "cbu_clinic_sessions";

// Retrieve registered patients
export function getPatients(): Patient[] {
  return JSON.parse(localStorage.getItem(PATIENTS_KEY) || "[]");
}

// Save registered patients
export function savePatients(patients: Patient[]): void {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
}

// Add a new patient
export function addPatient(patient: Patient): void {
  const patients = getPatients();
  patients.push(patient);
  savePatients(patients);
}

// Retrieve clinic sessions
export function getSessions(): ClinicSession[] {
  return JSON.parse(localStorage.getItem(SESSIONS_KEY) || "[]");
}

// Save clinic sessions
export function saveSessions(sessions: ClinicSession[]): void {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function generateClinicId(): string {
  const patients = getPatients();
  const year = new Date().getFullYear();

  const nextNumber = patients.length + 1;
  const formattedNumber = String(nextNumber).padStart(4, "0");

  return `CBU-${year}-${formattedNumber}`;
}
