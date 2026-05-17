export type UserRole = 
  | 'citizen' 
  | 'shelter_worker' 
  | 'field_officer' 
  | 'veterinarian' 
  | 'adoption_officer' 
  | 'municipality_admin' 
  | 'ministry_official' 
  | 'sysadmin';

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  auth_level: number;
  municipality_id?: number;
  facility_id?: number;
  is_superadmin: boolean;
}

export interface Animal {
  animal_id: number;
  microchip_id: string;
  name?: string;
  species: 'Dog' | 'Cat' | 'Other';
  breed?: string;
  age_estimate?: number;
  sex: 'M' | 'F';
  sterilization_status: boolean;
  color_markings?: string;
  status: 'Active' | 'InShelter' | 'Adopted' | 'Deceased' | 'Released';
  entry_date: string;
  municipality_id: number;
  current_facility_id?: number;
}

export interface Municipality {
  mun_id: number;
  name: string;
  city: string;
  district?: string;
  total_capacity: number;
}

export interface Facility {
  facility_id: number;
  municipality_id: number;
  name: string;
  type: 'Shelter' | 'Rehab' | 'VetClinic';
  capacity: number;
  current_occupancy: number;
  alert_threshold: number;
}

export interface Complaint {
  complaint_id: number;
  incident_type: 'AggressiveBehavior' | 'AnimalBite' | 'SickInjured' | 'Nuisance' | 'Other';
  location_lat: number;
  location_lng: number;
  description?: string;
  animal_id?: number;
  citizen_id?: string;
  responsible_mun?: number;
  status: 'Open' | 'InProgress' | 'Resolved' | 'Closed';
  assigned_to?: string;
  submitted_at: string;
}
