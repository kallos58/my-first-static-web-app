import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cmomaster-dialog',
  standalone: true,
  templateUrl: 'cmomasterDialog.component.html',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CmomasterDialog {
  @Input() currentItem: any = [];
  @Input() dialogTitle: string;

  @Output() childCancel = new EventEmitter<any>();
  @Output() childSave = new EventEmitter<any>();

  constructor(
      
  ) {}  
  
  close() {
    this.childCancel.emit(2);
  }

  save() {
    this.childSave.emit(2);
  }
}
