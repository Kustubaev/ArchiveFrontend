// interfaces/applicant.interface.ts
export interface Applicant {
  Id: number;
  Id_Archive: string;
  FIO: string;
  Telephone: string;
  Approval: boolean;
}

export interface Pagination<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}