export interface Doctor {
  name: String;
  last_name: String;
  idCard: Number;
  isActive: Boolean;
  birthDate: Date;
  gender: String;
  specialty: String;
  address: String;
  phone?: Array<Number>;
  email?: Array<String>;
}
