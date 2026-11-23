export interface Patient {
  clinicId: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dateRegistered: string;
}

export interface ClinicSession {
  sessionId: string;
  clinicId: string;
  cpc: string;
  signInTime: string;
  signOutTime?: string;
  active: boolean;
}
