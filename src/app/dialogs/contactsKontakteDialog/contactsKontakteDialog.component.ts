import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'contactsKontakte-dialog',
  standalone: true,
  templateUrl: 'contactsKontakteDialog.component.html',
  styleUrl: '../../../app/app.component.css',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ContactsKontakteDialog {
  @Input() currentItem: any = [];
  @Input() dialogTitle: string;

  @Output() childCancel = new EventEmitter<any>();
  @Output() childSave = new EventEmitter<any>();

  constructor(
      
  ) {}  
  
  close() {
    this.childCancel.emit(4);
  }

  save() {
    this.childSave.emit(4);
  }
}
