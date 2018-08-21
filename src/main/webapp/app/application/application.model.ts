export class ApplicationModel {

  public applicationType: string;
  public ftCustomerNumber: string;
  public subscriberName: string;
  public subscriberNameKana: string;
  public postalCode: string;
  public prefectures: string;
  public district: string;
  public street: string;
  public building: string;
  public phone: string;
  public mail: string;
  public fileAttachments: Set<File>;
  public detail: string;
  public powerArea: string;
  public supplyIdentificationNumber: string;
  public currentElectricCompany: string;
  public currentContractNumber: string;
  public price: string;
  public contractName: string;
  public contractNameKana: string;


  constructor() {
    this.applicationType = '';
    this.ftCustomerNumber = '';
    this.subscriberName = '';
    this.subscriberNameKana = '';
    this.postalCode = '';
    this.prefectures = '';
    this.district = '';
    this.street = '';
    this.building = '';
    this.phone = '';
    this.mail = '';
    this.fileAttachments = new Set<File>();
    this.detail = '';
    this.powerArea = '';
    this.supplyIdentificationNumber = '';
    this.currentElectricCompany = '';
    this.currentContractNumber = '';
    this.price = '';
    this.contractName = '';
    this.contractNameKana = '';
  }
}
