import { Component } from '@angular/core';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.scss']
})
export class FooterComponent {

    private url;
    private tennat;
    ngOnInit() {
        this.url = window.location.href.split('/');
        this.tennat = this.url[this.url.length - 2]);
        var element = document.getElementById("logo-container");
        if( this.tennat == 'tepco'){
            element.classList.add('logo-container-tepco');
            element.classList.remove('logo-container-chuden');
            element.classList.remove('logo-container-kepco');
        }
        if( this.tennat == 'chuden'){
            element.classList.remove('logo-container-tepco');
            element.classList.add('logo-container-chuden');
            element.classList.remove('logo-container-kepco');
        }
        if( this.tennat == 'kepco'){
            element.classList.remove('logo-container-tepco');
            element.classList.remove('logo-container-chuden');
            element.classList.add('logo-container-kepco');
        }
    }
}
