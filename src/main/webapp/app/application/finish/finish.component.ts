import {Component, OnInit} from '@angular/core';
import {StepperModel} from '../stepper/stepper.model';
import {Router} from '@angular/router';
import {ApplicationService} from '../application.service';
import {ApplicationModel} from '../application.model';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  stepperData: StepperModel[] = [];

  constructor(private router: Router, private applicationService: ApplicationService) {
    this.stepperData.push(new StepperModel(1, '契約申込受付'));
    this.stepperData.push(new StepperModel(2, '確認'));
    this.stepperData.push(new StepperModel(3, '完了'));
  }
    private url;
    private tennat;
  ngOnInit() {
    this.applicationService.setApplicationData(new ApplicationModel());
    this.url = window.location.href.split('/');
    this.tennat = this.url[this.url.length - 2]);
    var element = document.getElementById("page-wrapper-finish");
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
    this.router.navigateByUrl('/application/finish');
  }

  back() {
    this.router.navigateByUrl('/application/reception');
  }

}
