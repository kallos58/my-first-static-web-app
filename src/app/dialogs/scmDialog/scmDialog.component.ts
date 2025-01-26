import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'scm-dialog',
    templateUrl: 'scmDialog.component.html',
    styleUrl: '../../../app/app.component.css',
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ScmDialog {
  @Input() currentItem: any = [];
  @Input() dialogTitle: string;

  @Output() childCancel = new EventEmitter<any>();
  @Output() childSave = new EventEmitter<any>();

  constructor(
      
  ) {}  
  
  close() {
    this.childCancel.emit(3);
  }

  save() {
    this.childSave.emit(3);
  }
}
