import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { KENDO_POPUP } from '@progress/kendo-angular-popup';
import { FormsModule } from '@angular/forms';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';

@Component({
    selector: 'app-data-table',
    templateUrl: 'data-table.component.html',
    styleUrl: 'data-table.component.css',
    imports: [
        CommonModule,
        FormsModule,
        KENDO_POPUP,
        KENDO_BUTTONS
    ]
})
export class DataTableComponent {
    colorIndex = 0; 
    selectedId: string = ""; 
    showEU: boolean = false;
    showCoA: boolean = false;
    showStatus: boolean = false;
    showMAName: boolean = false;
    showBulkBatch: boolean = false;
    showFPBatch: boolean = false;
    showSAPMat: boolean = false;

    status = ["F","S","U","(empty)"];
    filterStatus: string = "";
    euVal : string = "EU";
    batchVal : string = "";
    fromCoA: string = "";
    toCoA: string = "";
    fromSrd: string = "";
    toSrd: string = "";
    option: number = 0;
    batchoption: number = 0;
    tableindex: number = 0;
    @Input() tableData: any = [];
    @Input() cols: any = [];
    @Input() headers: any = [];
    @Input() index: any = 0;
    @Output() childEdit = new EventEmitter<any>();
    @Output() childDelete = new EventEmitter<any>();
    @Output() childFilter = new EventEmitter<any>();
    @Output() childFilterEU = new EventEmitter<any>();
    @Output() childFilterCoA = new EventEmitter<any>();
    @Output() childFilterStatus = new EventEmitter<any>();
    @Output() childFilterBatch = new EventEmitter<any>();

    eus = ["EU","Non-EU","Non-TPL","Non-EU-TPL"];
    
    constructor(
        
    ) {
    }  
    editItem(item,index) {
        this.selectedId = item.id;
        item.brindex = index;
        this.childEdit.emit(item);
    }

    selectItem(item) {
        this.selectedId = item.id;
    }

    public deleteItem(item) {
        this.selectItem(item);
        this.childDelete.emit(item);
    }

    public filterData(item) {
        this.childFilter.emit(item);
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

    public onHideEU(): void {
        setTimeout(() => { this.showEU = false; }, 5);
    }

    onFilterEU() {
        this.childFilterEU.emit(this.euVal);
        setTimeout(() => { this.showEU = false; }, 5);
    }

    public onHideCoA(): void {
        setTimeout(() => { this.showCoA = false; }, 5);
    }

    onFilterCoA() {
        let filterParameters ={
            fromCoA: this.fromCoA, 
            toCoA: this.toCoA,
            batchoption: this.batchoption
          };
        this.childFilterCoA.emit(filterParameters);
        setTimeout(() => { this.showCoA = false; }, 5);
    }

    public onHideStatus(): void {
        setTimeout(() => { this.showStatus = false; }, 5);
    }

    clickOption(index: number) {
    this.option = index;
    }

    clickBatchOption(index: number) {
        this.batchoption = index;
    }

    onFilterStatus() {
        let filterParameters ={
          value: this.filterStatus, 
          fromDate: this.fromSrd,
          toDate: this.toSrd,
          option: this.option,
          batchoption: this.batchoption
        };
        this.filterStatus = "";
        this.fromSrd = "";
        this.toSrd = "";
        this.onHideStatus();
        this.childFilterStatus.emit(filterParameters);
    }

    onFilterBatch(index) {
        let filterParameters ={
            value: this.batchVal, 
            field: "field" + index.toString(),
            batchoption: this.batchoption
          };
          this.batchVal = "";
          this.batchoption = 0;
          this.onHideBatch(index);
        this.childFilterBatch.emit(filterParameters);
    }

    onHideBatch(index) {
        if (index === 1) setTimeout(() => { this.showSAPMat = false; }, 5);
        if (index === 2) setTimeout(() => { this.showFPBatch = false; }, 5);
        if (index === 3) setTimeout(() => { this.showBulkBatch = false; }, 5);
        if (index === 4) setTimeout(() => { this.showMAName = false; }, 5);
    }
    
}
