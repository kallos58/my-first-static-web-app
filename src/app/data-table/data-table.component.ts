import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: 'data-table.component.html',
  styleUrl: 'data-table.component.css',
  imports: [
    CommonModule
  ]
})
export class DataTableComponent {
    colorIndex = 0; 
    @Input() tableData: any = [];
    @Input() cols: any = [];
    @Input() headers: any = [];
    @Output() childEdit = new EventEmitter<any>();
    @Output() childDelete = new EventEmitter<any>();

    constructor(
        
    ) {
    }  
    editItem(item) {
        this.childEdit.emit(item);
    }
    

    public deleteItem(item) {
        this.childDelete.emit(item);
    }

    public sortTableData(col: number) {
        this.colorIndex = col;
        if (col === 1) this.tableData.sort((a: { field1: string; }, b: { field1: string; }) => a.field1.localeCompare(b.field1));
        if (col === 2) this.tableData.sort((a: { field1: string; }, b: { field1: string; }) => b.field1.localeCompare(a.field1));
        if (col === 3) this.tableData.sort((a: { field2: string; }, b: { field2: string; }) => a.field2.localeCompare(b.field2));
        if (col === 4) this.tableData.sort((a: { field2: string; }, b: { field2: string; }) => b.field2.localeCompare(a.field2));
        if (col === 5) this.tableData.sort((a: { field3: string; }, b: { field3: string; }) => a.field3.localeCompare(b.field3));
        if (col === 6) this.tableData.sort((a: { field3: string; }, b: { field3: string; }) => b.field3.localeCompare(a.field3));
        if (col === 7) this.tableData.sort((a: { field4: string; }, b: { field4: string; }) => a.field4.localeCompare(b.field4));
        if (col === 8) this.tableData.sort((a: { field4: string; }, b: { field4: string; }) => b.field4.localeCompare(a.field4));
    }

    public setColor(col: number) {
        return "color:" + (this.colorIndex === col ? "lightgray;" : "black;");
    } 

    public getColHeader(i: number) {
        return this.headers ? this.headers[i] : "";
    }
    
    public getCol(i: number) {
        return this.cols ? this.cols[i] : false;
    }
}
