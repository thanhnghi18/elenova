import {Component, OnInit, ViewChild} from '@angular/core';
import {StepperModel} from '../stepper/stepper.model';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationModel} from '../application.model';
import {FileUploadComponent} from '../components/file-upload/file-upload.component';
import {PhoneInputComponent} from '../components/phone-input/phone-input.component';
import {PostcodeInputComponent} from '../components/postcode-input/postcode-input.component';
import {ApplicationService} from '../application.service';
import {SelectOptionModel} from '../select-option.model';
@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  applicationModel: ApplicationModel;
  form: FormGroup;
  stepperData: StepperModel[] = [];
  isPhoneInvalid = false;

  @ViewChild(FileUploadComponent) fileUploads: FileUploadComponent;
  @ViewChild(PhoneInputComponent) phoneInput: PhoneInputComponent;
  @ViewChild(PostcodeInputComponent) postcodeInput: PostcodeInputComponent;

  // email = new FormControl('', [Validators.required, Validators.email]);
  id: string;
  private sub: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private applicationService: ApplicationService) {
    this.createForm();
  }

  checkPhoneIsValid(form) {
    form.controls['phone'].markAsTouched();
    // this.isPhoneInvalid = null;
    // const newVal = {
    //   result: true
    // };
    // newVal.result = this.isFieldValid('phone');
    // this.isPhoneInvalid = this.isFieldValid('phone');;
    this.phoneInput.updateErrorState(this.isFieldValid('phone'));
  }

  showError() {
    // this.phoneInput.updateErrorState();
  }

  createForm() {

    if (this.applicationService.getApplicationDataNonPromise()) {
      this.applicationModel = this.applicationService.getApplicationDataNonPromise();
    } else {
      this.applicationModel = new ApplicationModel();
    }


    this.form = this.formBuilder.group({
      // applicationType: new FormControl(this.applicationModel.applicationType ? this.applicationModel.applicationType : '', [Validators.required]),
      // ftCustomerNumber: new FormControl(this.applicationModel.ftCustomerNumber ? this.applicationModel.ftCustomerNumber : '', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(8)]),
      subscriberName: new FormControl(this.applicationModel.subscriberName ? this.applicationModel.subscriberName : '', [Validators.required, Validators.maxLength(35)]),
      subscriberNameKana: new FormControl(this.applicationModel.subscriberNameKana ? this.applicationModel.subscriberNameKana : '', [Validators.required, Validators.maxLength(32)]),
      prefectures: new FormControl(this.applicationModel.prefectures ? this.applicationModel.prefectures : '', [Validators.required]),
      district: new FormControl(this.applicationModel.district ? this.applicationModel.district : '', [Validators.required, Validators.maxLength(10)]),
      street: new FormControl(this.applicationModel.street ? this.applicationModel.street : '', [Validators.required, Validators.maxLength(20)]),
      building: new FormControl(this.applicationModel.building ? this.applicationModel.building : '', [Validators.required, Validators.maxLength(26)]),
      phone: new FormControl(this.applicationModel.phone ? this.applicationModel.phone : '', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{4}-[0-9]{4}$')]),
      postcode: new FormControl(this.applicationModel.postalCode ? this.applicationModel.postalCode : '', [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{4}$')]),
      email: new FormControl(this.applicationModel.mail ? this.applicationModel.mail : '', [Validators.required, Validators.email, Validators.maxLength(218)]),
      detail: new FormControl(this.applicationModel.detail ? this.applicationModel.detail : '', [Validators.maxLength(1000)]),
      powerArea: new FormControl(this.applicationModel.powerArea ? this.applicationModel.powerArea : '', [Validators.required]),
      supplyIdentificationNumber: new FormControl(this.applicationModel.supplyIdentificationNumber ? this.applicationModel.supplyIdentificationNumber : '', [Validators.required, Validators.maxLength(10)]),
      currentElectricCompany: new FormControl(this.applicationModel.currentElectricCompany ? this.applicationModel.currentElectricCompany : '', [Validators.required]),
      currentContractNumber: new FormControl(this.applicationModel.currentContractNumber ? this.applicationModel.currentContractNumber : '', [Validators.required, Validators.maxLength(10)]),
      price: new FormControl(this.applicationModel.price ? this.applicationModel.price : '', [Validators.required]),
      contractName: new FormControl(this.applicationModel.contractName ? this.applicationModel.contractName : '', [Validators.required, Validators.maxLength(35)]),
      contractNameKana: new FormControl(this.applicationModel.contractNameKana ? this.applicationModel.contractNameKana : '', [Validators.required, Validators.maxLength(32)]),
        //   new FormControl('', [Validators.required, Validators.email]
      //   //   Validators.compose([
      //   //   Validators.required,
      //   //   // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      //   //   Validators.email
      //   // ])
      // )
    });
    this.onChangeData();
  }


  onChangeData() {
    this.form.valueChanges
      .subscribe((formData) => {
        this.applicationModel.applicationType = formData.applicationType;
        this.applicationModel.ftCustomerNumber = formData.ftCustomerNumber;
        this.applicationModel.subscriberName = formData.subscriberName;
        this.applicationModel.subscriberNameKana = formData.subscriberNameKana;
        this.applicationModel.postalCode = formData.postcode;
        this.applicationModel.prefectures = formData.prefectures;
        this.applicationModel.district = formData.district;
        this.applicationModel.street = formData.street;
        this.applicationModel.building = formData.building;
        this.applicationModel.phone = formData.phone;
        this.applicationModel.mail = formData.email;
        this.applicationModel.fileAttachments = this.fileUploads.files;
        this.applicationModel.detail = formData.detail;
        this.applicationModel.powerArea = formData.powerArea;
        this.applicationModel.supplyIdentificationNumber = formData.supplyIdentificationNumber;
        this.applicationModel.currentElectricCompany = formData.currentElectricCompany;
        this.applicationModel.currentContractNumber = formData.currentContractNumber;
        this.applicationModel.price = formData.price;

        // console.log('Model Driven Form valid value: vm = ',
        //   this.applicationModel);
      });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('form submitted');
      this.applicationService.setApplicationData(this.applicationModel);
      this.router.navigateByUrl('/'+this.tennat+'/confirmation');
    } else {
      this.validateAllFormFields(this.form);
      // alert('Please correct all fields');
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         // {1}
    Object.keys(formGroup.controls).forEach(field => {  // {2}
      const control = formGroup.get(field);             // {3}
      if (control instanceof FormControl) {             // {4}
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {        // {5}
        this.validateAllFormFields(control);            // {6}
      }
    });
  }

  isFieldValid(field: string) {
    // console.log('check field is invalid', this.form.get(field), 'this.form.get(field).touched', this.form.get(field).touched);
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

    private url;
    private tennat;
  ngOnInit() {
    this.stepperData.push(new StepperModel(1, '契約申込受付'));
    this.stepperData.push(new StepperModel(2, '確認'));
    this.stepperData.push(new StepperModel(3, '完了'));
    this.prepareData();
      this.url = window.location.href.split('/');
      this.tennat = this.url[this.url.length - 2]);
      var element = document.getElementById("page-wrapper");
      if( this.tennat == 'tepco'){
          element.classList.add('color-bg-page-tepco');
          element.classList.remove('color-bg-page-chuden');
          element.classList.remove('color-bg-page-kepco');
      }
      if( this.tennat == 'chuden'){
          element.classList.remove('color-bg-page-tepco');
          element.classList.add('color-bg-page-chuden');
          element.classList.remove('color-bg-page-kepco');
      }
      if( this.tennat == 'kepco'){
          element.classList.remove('color-bg-page-tepco');
          element.classList.remove('color-bg-page-chuden');
          element.classList.add('color-bg-page-kepco');
      }
  }

  getErrorMessage(fieldName) {
    if (!this.form.controls[fieldName]) {
      return '';
    }
    return this.getErrorMessageOfField(fieldName, this.form.controls[fieldName]);
    // switch (fieldName) {
    //   case 'email' :
    //     return this.getErrorMessageOfField(fieldName, this.form.controls.email);
    //   case 'customer':
    //     return this.getErrorMessageOfField(fieldName, this.form.controls.customer);
    //   case 'subscriberName':
    //     return this.getErrorMessageOfField(fieldName, this.form.controls.subscriberName);
    //   case 'subscriberNameKana':
    //     return this.getErrorMessageOfField(fieldName, this.form.controls.subscriberNameKana);
    // }
  }

  getErrorMessageOfField(fieldName: string, formControl: AbstractControl) {
    if (!formControl || !fieldName) {
      return '';
    }
    const validationRules = this.getValidationRuleOfField(fieldName);
    return this.getErrorMessageFromRules(formControl, validationRules);
  }

  getValidationRuleOfField(fieldName: string) {
    for (const key in applicationValidationMessages) {
      if (key === fieldName) {
        const validationRules = applicationValidationMessages[key];
        if (validationRules) {
          return validationRules;
        } else {
          return [];
        }
      }
    }
  }

  getErrorMessageFromRules(formControl: AbstractControl, validationRules) {
    for (const rule of validationRules) {
      if (formControl.hasError(rule.type)) {
        return rule.message;
      }
    }
    return '';
  }

  search(event: any) {
    event.preventDefault();
  }

  confirm() {
    this.onSubmit();
    // this.router.navigateByUrl('/application/confirmation');
  }

  save() {
    // this.router.navigateByUrl('/application/confirmation');
    this.onSubmit();
  }

  applicationTypeData: SelectOptionModel[];
  prefecturesData: SelectOptionModel[];
  powerAreaData: SelectOptionModel[];
  currentCompanyData: SelectOptionModel[];
  priceData: SelectOptionModel[];
  show: boolean;

  prepareData() {
    this.applicationTypeData = this.applicationService.getApplicationTypeData();
    this.prefecturesData = this.applicationService.getPrefecturesData();
    this.powerAreaData = this.applicationService.getPowerAreaData();
    this.currentCompanyData = this.applicationService.getCurrentCompanyData();
    this.priceData = this.applicationService.getPriceData();
  }


}


const applicationValidationMessages = {
  'demo': [
    {type: 'required', message: 'Username is required'},
    {type: 'minlength', message: 'Username must be at least 5 characters long'},
    {type: 'maxlength', message: 'Username cannot be more than 25 characters long'},
    {type: 'pattern', message: 'Your username must contain only numbers and letters'},
    {type: 'validUsername', message: 'Your username has already been taken'}
  ],
  'email': [
    {type: 'required', message: 'あなたは電子メールを入力する必要があります'},
    {type: 'email', message: '有効なメールではありません'},
    {type: 'maxlength', message: 'メールの長さは128文字以上'}
  ],
  'ftCustomerNumber': [
    {type: 'required', message: 'FT顧客番号は必須です'},
    {type: 'maxlength', message: 'FT顧客番号は8文字以上です'},
    {type: 'pattern', message: 'FT顧客番号は数字のみです'}
  ],
  'subscriberName': [
    {type: 'required', message: '契約者名は必須です'},
    {type: 'maxlength', message: '契約者名は35文字以上です'}
  ],
  'subscriberNameKana': [
    {type: 'required', message: '契約者名カナは必須です'},
    {type: 'maxlength', message: '契約者名カナは32文字以上です'}
  ],
  'district': [
    {type: 'required', message: '市町区は必須です'},
    {type: 'maxlength', message: '市町区は10文字以上です'}
  ],
  'street': [
    {type: 'required', message: '町村丁番地は必須です'},
    {type: 'maxlength', message: '町村丁番地は20文字以上です'}
  ],
  'building': [
    {type: 'required', message: '建物名は必須です'},
    {type: 'maxlength', message: '建物名は26文字以上です'}
  ],
  'phone': [
    {type: 'required', message: '電話番号は必須です'},
    {type: 'pattern', message: '電話番号の形式は99-9999-9999です。'},
  ],
  'postcode': [
    {type: 'required', message: '電話番号は必須です'},
    {type: 'pattern', message: '電話番号の形式は999-9999です。'},
  ],
  'applicationType': [
    {type: 'required', message: '申込種別は必須です'}
  ],
  'prefectures': [
    {type: 'required', message: '都道府県は必須です'}
  ],
  'detail': [
    {type: 'maxlength', message: '詳細は100文字以上です'}
  ],
  'powerArea': [
    {type: 'required', message: '電力エリアは電子メールを入力する必要があります'},
  ],
  'supplyIdentificationNumber': [
    {type: 'required', message: '供給地点特定番号は電子メールを入力する必要があります'},
    {type: 'maxlength', message: '供給地点特定番号は10文字以上です'}
  ],
  'currentElectricCompany': [
    {type: 'required', message: '現在ご契約中の電力会社は電子メールを入力する必要があります'},
  ],
  'currentContractNumber': [
    {type: 'required', message: '現在ご契約中の電力会社契約番号は電子メールを入力する必要があります'},
    {type: 'maxlength', message: '現在ご契約中の電力会社契約番号は10文字以上'}
  ],
  'price': [
    {type: 'required', message: '希望料金メニューは電子メールを入力する必要があります'},
  ],
    'contractName': [
        {type: 'required', message: '契約者名は必須です'},
        {type: 'maxlength', message: '契約者名は35文字以上です'}
    ],
    'contractNameKana': [
        {type: 'required', message: '契約者名カナは必須です'},
        {type: 'maxlength', message: '契約者名カナは32文字以上です'}
    ],
};
