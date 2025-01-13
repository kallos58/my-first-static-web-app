import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'warehouse-dialog',
  standalone: true,
  templateUrl: 'warehouseDialog.component.html',
  styleUrl: '../../../app/app.component.css',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class WarehouseDialog {
  @Input() currentItem: any = [];
  @Input() diParam: any = [];
  @Input() apimanufacturers: any = [];
  @Input() manufacturers: any = [];
  @Input() dialogTitle: string;

  @Output() childCancel = new EventEmitter<any>();
  @Output() childSave = new EventEmitter<any>();
  
  months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'];

  constructor(
      
  ) {}
  
  close() {
    this.childCancel.emit(21);
  }

  save() {
    this.childSave.emit(22);
  }

}
