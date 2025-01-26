import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'filter-dialog',
    templateUrl: 'filterDialog.component.html',
    styleUrl: '../../../app/app.component.css',
    imports: [
        CommonModule,
        FormsModule
    ]
})

export class FilterDialog {
  @Output() childCancel = new EventEmitter<any>();
  @Output() childFilterStatus = new EventEmitter<any>();

  status = ["F","S","U","(empty)"];
  filterVal: string = "";
  fromDate: string = "";
  toDate: string = "";
  option: number = 0;

  constructor(
      
  ) {}
  
 
  close() {
    this.filterVal = "";
    this.fromDate = "";
    this.toDate = "";
    this.childCancel.emit(13);
  }

  filter() {
    let filterParameters ={
      field: 'Status', 
      value: this.filterVal, 
      fromDate: this.fromDate,
      toDate: this.toDate,
      option: this.option
    };
    this.filterVal = "";
    this.fromDate = "";
    this.toDate = "";
    this.childFilterStatus.emit(filterParameters);
  }

  clickOption(index: number) {
    this.option = index;
  }


}
