import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'abbreviation-dialog',
  standalone: true,
  templateUrl: 'abbreviationDialog.component.html',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AbbreviationDialog {
  @Input() currentItem: any = [];
  @Input() dialogTitle: string;

  @Output() childCancel = new EventEmitter<any>();
  @Output() childSave = new EventEmitter<any>();

  constructor(
      
  ) {}  
  
  close() {
    this.childCancel.emit(1);
  }

  save() {
    this.childSave.emit(1);
  }
}
