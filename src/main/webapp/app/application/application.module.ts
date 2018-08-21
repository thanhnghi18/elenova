import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepperComponent} from './stepper/stepper.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ReceptionComponent} from './reception/reception.component';
import {FinishComponent} from './finish/finish.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {RouterModule} from '@angular/router';
import {applicationState} from './application.route';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {PhoneInputComponent} from './components/phone-input/phone-input.component';
import {PostcodeInputComponent} from './components/postcode-input/postcode-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ItemConfirmationComponent} from './confirmation/item-confirmation/item-confirmation.component';
import {UploadConfirmationComponent} from './confirmation/upload-confirmation/upload-confirmation.component';
import {ApplicationService} from './application.service';
import {UploadService} from "./upload.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(applicationState),
        FlexLayoutModule,
        MDBBootstrapModule,
        AngularFontAwesomeModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatButtonModule,
        MatProgressBarModule,
        MatListModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressBarModule
    ],
    declarations: [
        StepperComponent,
        WelcomeComponent,
        ReceptionComponent,
        ConfirmationComponent,
        FinishComponent,
        FileUploadComponent,
        PhoneInputComponent,
        PostcodeInputComponent,
        ItemConfirmationComponent,
        UploadConfirmationComponent
    ],
    providers: [
        ApplicationService,
        UploadService
    ]
})
export class ApplicationModule {
}
