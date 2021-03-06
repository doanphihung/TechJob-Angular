export interface Job {
  id?: number,
  title?: string,
  language?: string,
  from_salary?: number,
  to_salary?: number,
  experience?: string,
  expire? : string,
  description?: string,
  type_of_job?: string,
  position?: string,
  view?: any,
  upto?: number,
  city_id?: number,
  category_id?: number,
  status?: string,
  company_id?: number,
  company?:any,
  city?: any,
  category?: any,
  created_at?: string,
  update_at?: string
}
