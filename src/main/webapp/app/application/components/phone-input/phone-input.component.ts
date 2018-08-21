import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self, SimpleChanges
} from '@angular/core';
import {MatFormFieldControl} from '@angular/material';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {noop, Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: PhoneInputComponent},
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneInputComponent), multi: true}
    // {provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneInputComponent), multi: true}
  ],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
// ,
export class PhoneInputComponent implements MatFormFieldControl<MyTel>, OnDestroy, OnInit, ControlValueAccessor {

  // ControlValueAccessor

  // @Input() errorStateInput = {};


  static nextId = 0;

  telValText = '';

  parts: FormGroup;

  stateChanges = new Subject<void>();
  // focusStateChanges = new Subject<boolean>();

  focused = false;

  ngControl: NgControl = null;

  errorState = false;

  // updateControlFn: any;

  controlType = 'my-tel-input';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // onBlur() {
  //   console.log('On blur');
  //   this.onTouchedCallback();
  // }

  @Output()
  changePhoneNumber: EventEmitter<string>;

  @Output()
  blurPhoneNumber: EventEmitter<string>;

  get empty() {
    const n = this.parts.value;
    return !n.area && !n.exchange && !n.subscriber;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  id = `app-phone-input-${PhoneInputComponent.nextId++}`;

  describedBy = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get value(): MyTel | null {
    const n = this.parts.value;
    if (n.area.length === 2 && n.exchange.length === 4 && n.subscriber.length === 4) {
      return new MyTel(n.area, n.exchange, n.subscriber);
      // return n.area + '-' + n.exchange + '-' + n.subscriber;
    }
    return null;
  }

  set value(tel: MyTel | null) {
    tel = tel || new MyTel('', '', '');
    this.parts.setValue({area: tel.area, exchange: tel.exchange, subscriber: tel.subscriber});
    this.stateChanges.next();
  }

  get valueText() {
    const n = this.parts.value;
    // if (n.area.length === 2 && n.exchange.length === 4 && n.subscriber.length === 4) {
    return n.area + '-' + n.exchange + '-' + n.subscriber;
    // return n.area + '-' + n.exchange + '-' + n.subscriber;
    // }
    // return '';
  }

// , @Optional() @Self() public ngControl: NgControl)
  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef) {
    this.parts = fb.group({
      'area': '',
      'exchange': '',
      'subscriber': '',
    });

    fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
      console.log('On mornitor: ', origin);
      // this.errorState = this.errorStateInput && this.focused;
      // console.log('this.errorStateInput && this.focused;', this.errorStateInput, this.focused);
      if (!this.focused) {
        //   this.focusStateChanges.next(!this.focused);
        // this.blurPhoneNumber.emit('');
      }
    });

    this.changePhoneNumber = new EventEmitter<string>();
    this.blurPhoneNumber = new EventEmitter<string>();

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    // this.focusStateChanges.subscribe((origin) => {
    //   console.log('On state change: ', origin);
    //   this.errorState = this.errorStateInput;
    //   console.log('Change error state to: ', this.errorState);
    // });

  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }


  // ----------------------------------------------------------


  propagateChange: any = () => {
  };

  validateFn: any = () => {
  };

  registerOnChange(fn: any): void {
    console.log('Propagating change');
    this.propagateChange = fn;
  }


  registerOnTouched(fn: any): void {
    // console.log('Propagating Touched');
    // this.errorState = this.errorStateInput && this.focused;
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      // this.counterValue = value;
    }
    console.log('Write value from the FORM:', obj);
  }


  onChangePhoneValue() {
    const n = this.parts.value;
    const phoneValue = n.area + '-' + n.exchange + '-' + n.subscriber;
    // this.focused = true;
    this.propagateChange(phoneValue);
    this.telValText = phoneValue;
    // this.changePhoneNumber.emit(phoneValue);
    const resultValidate = this.validate(phoneValue);
    console.log('VALUE VALIDATE: ', resultValidate);
  }

  onFocusTel() {
    // this.focused = true;
    // this.errorState = true;

  }

  validate(value) {
    let validateResult = false;
    const regex = /^[0-9]{2}-[0-9]{4}-[0-9]{4}$/g;
    validateResult = regex.test(value);
    if (validateResult) {
      return validateResult;
    } else if (value === '') {

    }
    return validateResult;
  }

  onBlurTel() {
    this.onTouchedCallback();
    this.changePhoneNumber.emit('');
  }

  ngOnInit(): void {
    // this.validateFn = createTelNumberPatternValidator('demo pattern');
    // this.validateFn = PhoneInputComponent.validate('demo pattern');
  }


  updateErrorState(newErrorState) {
    this.focused = true;
    this.errorState = newErrorState;
    console.log('this.errorStateInput && this.focused;', newErrorState, this.focused);
  }
}

export class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {
  }
}
