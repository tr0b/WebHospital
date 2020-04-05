export interface Patient {
  name: String;
  last_name: String;
  birthDate: Date;
  idCard: Number;
  bloodType: String;
  gender?: String;
  isActive?: Boolean;
  maritalStatus?: String;
  phone?: Array<Number>;
  email?: Array<String>;
}
