import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'sapmaterial-dialog',
    templateUrl: 'SAPMaterialDialog.component.html',
    styleUrl: '../../../app/app.component.css',
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SAPMaterialDialog {
  @Input() currentItem: any = [];
  @Input() dialogTitle: string;

  @Output() childCancel = new EventEmitter<any>();
  @Output() childSave = new EventEmitter<any>();

  constructor(
      
  ) {}  
  
  close() {
    this.childCancel.emit(7);
  }

  save() {
    this.childSave.emit(7);
  }
}
