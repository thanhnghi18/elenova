import {Component, OnInit} from '@angular/core';
import {StepperModel} from '../stepper/stepper.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ApplicationService} from '../application.service';
import {ApplicationModel} from '../application.model';
import {SelectOptionModel} from '../select-option.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  stepperData: StepperModel[] = [];
  application: ApplicationModel;

  constructor(private router: Router, private applicationService: ApplicationService,
              private route: ActivatedRoute) {
    this.stepperData.push(new StepperModel(1, '契約申込受付'));
    this.stepperData.push(new StepperModel(2, '確認'));
    this.stepperData.push(new StepperModel(3, '完了'));
  }
    private url;
    private tennat;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.applicationService.getApplicationData()
      .then(application => this.application = application));
      this.url = window.location.href.split('/');
      this.tennat = this.url[this.url.length - 2]);
      var element = document.getElementById("page-wrapper-confirm");
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

  confirm() {
    this.router.navigateByUrl('/'+this.tennat+'/finish');
  }

  back() {
    this.router.navigateByUrl('/reception/'+this.tennat+'/shopA');
  }

  getApplicationTypeData() {
    if (!this.application) {
      return '';
    }
    return this.getDataSelected(this.applicationService.getApplicationTypeData(), this.application.applicationType);
  }

  getPrefecturesData() {
    if (!this.application) {
      return '';
    }
    return this.getDataSelected(this.applicationService.getPrefecturesData(), this.application.prefectures);
  }

  getPowerAreaData() {
    if (!this.application) {
      return '';
    }
    return this.getDataSelected(this.applicationService.getPowerAreaData(), this.application.powerArea);
  }

  getCurrentCompanyData() {
    if (!this.application) {
      return '';
    }
    return this.getDataSelected(this.applicationService.getCurrentCompanyData(), this.application.currentElectricCompany);
  }

  getPriceData() {
    if (!this.application) {
      return '';
    }
    return this.getDataSelected(this.applicationService.getPriceData(), this.application.price);
  }


  getDataSelected(arrayData: Array<SelectOptionModel>, valueSelect: string) {
    if (!arrayData || !valueSelect) {
      return '';
    }
    for (let option of arrayData) {
      if (option.value === valueSelect) {
        return option.title;
      }
    }
    return '';
  }


}
