export interface Shelters {
  candidates: Candidate[];
  status: string;
}

export interface Candidate {
  formatted_address: string;
  name: string;
  opening_hours: OpeningHours;
  rating: number;
}

export interface OpeningHours {
  open_now: boolean;
}
