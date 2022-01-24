import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  public page:number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
