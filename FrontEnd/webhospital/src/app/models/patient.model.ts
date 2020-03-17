export class Patient {
  name: String;
  last_name: String;
  birthDate: Date;
  idCard: Number;
  bloodType: String;
  gender: String;
  isActive: Boolean;
  maritalStatus: String;
  phone: Array<Number>;
  email: Array<String>;
  constructor(
    _name: String,
    _last_name: String,
    _birthDate: String,
    _idCard: Number,
    _bloodType: String,
    _gender: String,
    _isActive: Boolean,
    _maritalStatus: String,
    _phone: Array<Number>,
    _email: Array<String>
  ) {
    this.name = _name;
    this.last_name = _last_name;
    this.birthDate = _birthDate;
    this.idCard = _idCard;
    this.bloodType = _bloodType;
    this.gender = _gender;
    this.isActive = _isActive;
    this.maritalStatus = _maritalStatus;
    this.phone = _phone;
    this.email = _email;
  }
}
