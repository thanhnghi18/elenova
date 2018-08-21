import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-confirmation',
  templateUrl: './item-confirmation.component.html',
  styleUrls: ['./item-confirmation.component.scss']
})
export class ItemConfirmationComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;
  @Input() iconName: string;

  constructor() {
  }

  ngOnInit() {
  }

}
