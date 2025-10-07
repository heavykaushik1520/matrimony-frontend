export interface Profile {
  id: string;
  photo?: string;
  fullName: string;
  caste: string;
  subBranch: string;
  mobile: string;
  address: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  height: string;
  gotra: string;
  ras: string;
  nakshatra: string;
  charan: string;
  gana: string;
  nadis: string;
  bloodType: string;
  mars: string;
  varna: string;
  bandha: string;
  glasses: boolean;
  physicalAilment: string;
  education: string;
  job: string;
  position: string;
  salary: string;
  passport: string;
  hobbies: string;
  father: string;
  mother: string;
  brother: string;
  otherFamily: string;
  maritalStatus: 'Single' | 'Widow' | 'Widower' | 'Divorcee';
  expectedMaritalStatus: string;
  expectedHeight: string;
  expectedAge: string;
  expectedEducation: string;
  expectations: string;
  gender: 'Male' | 'Female';
}

export interface FilterCriteria {
  gender?: 'Male' | 'Female';
  ageRange?: [number, number];
  heightRange?: [number, number];
  education?: string;
  maritalStatus?: string;
  caste?: string;
  location?: string;
}