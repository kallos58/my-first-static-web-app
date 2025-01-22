import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'messagebox-dialog',
  standalone: true,
  templateUrl: 'messageboxDialog.component.html',
  styleUrl: '../../../app/app.component.css',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MessageboxDialog {
  @Input() message: string;
  @Output() childCancel = new EventEmitter<any>();

  constructor(
      
  ) {}
  
  close() {
    this.childCancel.emit(14);
  }



}
