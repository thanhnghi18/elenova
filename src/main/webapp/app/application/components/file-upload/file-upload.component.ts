import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UploadService} from "../../upload.service";
import {forkJoin} from "rxjs/index";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    @ViewChild('file') file;
    public files: Set<File> = new Set<File>();


    @Input()
    public oldFiles: Set<File> = new Set<File>();

    progress;
    canBeClosed = true;
    primaryButtonText = 'Upload';
    showCancelButton = true;
    uploading = false;
    uploadSuccessful = false;

    constructor(public uploadService: UploadService) {
    }
    private url;
    private tennat;
    ngOnInit() {
        // this.files.push('file1');
        // this.files.push('file2');
        // this.files.push('file3');
        if (this.oldFiles && this.oldFiles.size > 0) {
            this.files = this.oldFiles;
        }
        this.url = window.location.href.split('/');
        this.tennat = this.url[this.url.length - 2]);
        var element = document.getElementById("file-upload-wrapper");
        if( this.tennat == 'tepco'){
            element.classList.add('file-upload-wrapper-tepco');
            element.classList.remove('file-upload-wrapper-chuden');
            element.classList.remove('file-upload-wrapper-kepco');
        }
        if( this.tennat == 'chuden'){
            element.classList.remove('file-upload-wrapper-tepco');
            element.classList.add('file-upload-wrapper-chuden');
            element.classList.remove('file-upload-wrapper-kepco');
        }
        if( this.tennat == 'kepco'){
            element.classList.remove('file-upload-wrapper-tepco');
            element.classList.remove('file-upload-wrapper-chuden');
            element.classList.add('file-upload-wrapper-kepco');
        }
    }
    addFiles() {
        this.file.nativeElement.click();
    }

    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        // const filesToUpload: Set<File> = new Set<File>();
        for (let key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.add(files[key]);
                // filesToUpload.add(files[key]);
            }
        }

        console.log(files);
        console.log(JSON.stringify(this.files));
        setTimeout(this.uploadFiles(), 1000);
    }


    formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    getFiles(): Set<File> {
        return this.files;
    }

    uploadFile(files: Set<File>) {
// set the component state to "uploading"
        this.uploading = true;
        // start the upload and save the progress map
        this.progress = this.uploadService.upload(files);
        let allProgressObservables = [];
        for (let key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }

        // Adjust the state variables

        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';

        // The dialog should not be closed while uploading
        this.canBeClosed = false;
        // this.dialogRef.disableClose = true;

        // Hide the cancel-button
        this.showCancelButton = false;

        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(end => {
            // ... the dialog can be closed again...
            this.canBeClosed = true;
            // this.dialogRef.disableClose = false;

            // ... the upload was successful...
            this.uploadSuccessful = true;

            // ... and the component is no longer uploading
            this.uploading = false;
        });
    }

    uploadFiles() {
        // if everything was uploaded already, just close the dialog
        // if (this.uploadSuccessful) {
        //     return this.dialogRef.close();
        // }

        // set the component state to "uploading"
        this.uploading = true;

        // start the upload and save the progress map
        this.progress = this.uploadService.upload(this.files);

        // convert the progress map into an array
        let allProgressObservables = [];
        for (let key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }

        // Adjust the state variables

        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';

        // The dialog should not be closed while uploading
        this.canBeClosed = false;
        // this.dialogRef.disableClose = true;

        // Hide the cancel-button
        this.showCancelButton = false;

        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(end => {
            // ... the dialog can be closed again...
            this.canBeClosed = true;
            // this.dialogRef.disableClose = false;

            // ... the upload was successful...
            this.uploadSuccessful = true;

            // ... and the component is no longer uploading
            this.uploading = false;
        });
    }

}
