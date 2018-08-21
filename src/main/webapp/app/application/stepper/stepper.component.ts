import {Component, Input, OnInit} from '@angular/core';
import {StepperModel} from './stepper.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {


  @Input() stepperData: StepperModel[];

  @Input() currentStep: number;

  constructor() {
  }
    private url;
    private tennat;
  ngOnInit() {
      this.url = window.location.href.split('/');
      this.tennat = this.url[this.url.length - 2]);
      var element = document.getElementById("wizard");
      if( this.tennat == 'tepco'){
          element.classList.add('wizard-tepco');
          element.classList.remove('wizard-chuden');
          element.classList.remove('wizard-kepco');
      }
      if( this.tennat == 'chuden'){
          element.classList.remove('wizard-tepco');
          element.classList.add('wizard-chuden');
          element.classList.remove('wizard-kepco');
      }
      if( this.tennat == 'kepco'){
          element.classList.remove('wizard-tepco');
          element.classList.remove('wizard-chuden');
          element.classList.add('wizard-kepco');
      }
  }

}
