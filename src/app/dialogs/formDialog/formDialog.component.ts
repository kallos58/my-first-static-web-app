import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'form-dialog',
  standalone: true,
  templateUrl: 'formDialog.component.html',
  styleUrl: 'formDialog.component.css',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FormDialog {
    @Input() dialogTitle: string;
    @Output() childCancel = new EventEmitter<any>();
  constructor(
      
  ) {}
  
  close() {
    this.childCancel.emit(12);;
  }

}
