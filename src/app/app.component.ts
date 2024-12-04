import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common'
import {HomeComponent} from './home/home.component'
import {AbbreviationsComponent} from './abbreviations/abbreviations.component'
import { FormsModule } from '@angular/forms';
import * as Cosmos from "@azure/cosmos";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    MatTabsModule, 
    CommonModule,
    HomeComponent,
    AbbreviationsComponent,
    FormsModule
  ]
})


export class AppComponent {
  @ViewChild('abbreviationDialog', { static: true }) abbreviationDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('cmoMasterDialog', { static: true }) cmoMasterDialog!: ElementRef<HTMLDialogElement>;
  dataSource = [];  
  originalSource = [];  
  abbreviations = [];  
  cmomasters = []; 
  index = 0;
  endpoint; 
  key;
  client;
  database; 
  collection;
  db;
  container;
  colorIndex = 0;
  dialogTitle = "Eintrag bearbeiten";
  name = "";
  description = "";
  categoryId = "";
  sku = "";
  currentId = "";
  entriesStr = "";
  filterStr = "";
  filterString = "";

  constructor() {
    
  }
 
  public async getAbbreviations() {  
    let entry = { 
      id: "123", 
      name: "hurz",
      description: "noss",
 };
  //await this.container.items.create(entry);
  
 // ;
//await this.container.item("123", "123").delete();

let { resource: docToUpdate } = await this.container.item("123", "123").read();
docToUpdate.name = "das verflixt hurzige hurz";
await this.container
      .item("123", "123")
      .replace(docToUpdate);

debugger;
return;
 debugger;
//const i = this.container.item("xxxxx","id");
//const result = await item.read();
debugger;
//const deleteResponse =  this.container.item(i).delete();
//await i.delete();


    try {
      debugger;
        await this.container.items
        .query({
            //query: "SELECT * from c  where c.categoryName='abbreviation'"
            query: "SELECT * from c where c.id='xxxxx'"
        })
        .fetchAll()
        .then((response: any) => {
          //this.dataSource = this.createData(response); 
          debugger;
          let i = response.resources[0];
          let readDoc: any = [];
          readDoc.name = "bar";
          this.container.item[i].replace(readDoc);
          debugger;
          return;
          this.abbreviations = this.createData(response); 
          this.originalSource = this.abbreviations;
          this.entriesStr = this.abbreviations.length.toString() + " Einträge"; 
          this.filterStr = "Filter:   ";    
      }) 
    } catch(error) {
        console.log(error);

    }    
  } 

  public async getCMOMaster() {   
    try {
        await this.container.items
        .query({
            query: "SELECT * from c  where c.categoryName='cmomaster'"
        })
        .fetchAll()
        .then((response: any) => {
          //this.dataSource = this.createData(response); 
          this.cmomasters = this.createData(response); 
          this.originalSource = this.cmomasters;
          this.entriesStr = this.cmomasters.length.toString() + " Einträge"; 
          this.filterStr = "Filter:   ";    
      }) 
    } catch(error) {
        console.log(error);

    }    
  } 

  public createData(response) {
    let items = [];
    response.resources.forEach(element => {
      const entry: any = [];
      entry.id = element.id;
      entry.categoryName = element.categoryName;
      entry.categoryId = element.categoryId;
      entry.description = element.description;
      entry.name = element.name;
      entry.price = element.price;
      entry.sku = element.sku;
      items.push(entry);
    });
    return items;
  }

  public changeTab(e: any) {
    this.index = e.index;
    if (e.index === 0) {
      this.entriesStr = "";
      this.filterStr = "";
    }
    if (e.index === 1) this.getAbbreviations();
    if (e.index === 2) this.getCMOMaster();
  }

  public setColor(col: number) {
    return "color:" + (this.colorIndex === col ? "lightgray;" : "black;");
  } 

  public sortAbbreviations(col: number) {
    this.colorIndex = col;
    if (col === 1) this.abbreviations.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
    if (col === 2) this.abbreviations.sort((a: { name: string; }, b: { name: string; }) => b.name.localeCompare(a.name));
    if (col === 3) this.abbreviations.sort((a: { description: string; }, b: { description: string; }) => a.description.localeCompare(b.description));
    if (col === 4) this.abbreviations.sort((a: { description: string; }, b: { description: string; }) => b.description.localeCompare(a.description));
  }

  public sortCMOMaster(col: number) {
    this.colorIndex = col;
    if (col === 1) this.cmomasters.sort((a: { categoryId: string; }, b: { categoryId: string; }) => a.categoryId.localeCompare(b.categoryId));
    if (col === 2) this.cmomasters.sort((a: { categoryId: string; }, b: { categoryId: string; }) => b.categoryId.localeCompare(a.categoryId));
    if (col === 3) this.cmomasters.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
    if (col === 4) this.cmomasters.sort((a: { name: string; }, b: { name: string; }) => b.name.localeCompare(a.name));
    if (col === 5) this.cmomasters.sort((a: { description: string; }, b: { description: string; }) => a.description.localeCompare(b.description));
    if (col === 6) this.cmomasters.sort((a: { description: string; }, b: { description: string; }) => b.description.localeCompare(a.description));
    if (col === 7) this.cmomasters.sort((a: { sku: string; }, b: { sku: string; }) => a.sku.localeCompare(b.sku));
    if (col === 8) this.cmomasters.sort((a: { sku: string; }, b: { sku: string; }) => b.sku.localeCompare(a.sku));
  }

  public editAbbreviation(item: any) {
    this.dialogTitle = "Eintrag bearbeiten";
    debugger;
    this.currentId = item.id;
    this.name = item.name;
    this.description = item.description;
    this.abbreviationDialog.nativeElement.showModal(); 
  }

  public deleteAbbreviation(item: any) {
    if (!confirm("'" + item.name + " / " + item.description + "' endgültig löschen?")) {
      return;
    }
    let index = this.abbreviations.findIndex((e: { id: any; }) => e.id === item.id); 
    this.abbreviations.splice(index, 1);
    index = this.originalSource.findIndex((e: { id: any; }) => e.id === e.id); 
    this.originalSource.splice(index, 1);
    this.entriesStr = String(this.abbreviations.length) + " Einträge";
  }

  public saveAbbreviation() {
    if (this.currentId !== undefined) {
      let item = this.abbreviations.find((element: any) => element.id === this.currentId);
      item.name = this.name;
      item.description = this.description;
      item = this.originalSource.find((element: any) => element.id === this.currentId);
      item.name = this.name;
      item.description = this.description;
    } else {
      let min = 1;
      let max = 100000;
      let id = Math.floor(Math.random() * (max - min)) + min;
      let newItem: any = [];
      newItem.id = id;
      newItem.name = this.name;
      newItem.description = this.description;
      newItem.isInList = true;
      this.abbreviations.push(newItem);
    }
    this.abbreviationDialog.nativeElement.close();
  }

  public newEntry() {
    if (this.index === 1) this.newEntryAbbreviation(); 
    if (this.index === 2) this.newEntryCMOMaster(); 
  }

  public newEntryAbbreviation() {
    this.dialogTitle = "New entry 'Abbreviations'";
    this.currentId = undefined;
    this.name = "";
    this.description = "";
    this.abbreviationDialog.nativeElement.showModal(); 
  }

  public newEntryCMOMaster() {
    this.dialogTitle = "New entry 'CMO Master'";
    this.currentId = undefined;
    this.categoryId = "";
    this.name = "";
    this.description = "";
    this.sku = "";
    this.cmoMasterDialog.nativeElement.showModal(); 
  }

  clearFilter() {
    if (this.index === 1) this.abbreviations = this.originalSource;
    if (this.index === 2) this.cmomasters = this.originalSource;
    this.entriesStr = this.originalSource.length.toString() + " Einträge"; 
  }

  filterData() {
    if (this.index === 1) this.filterAbbreviations();
    if (this.index === 2) this.filterCMOMasters();
  }

  filterAbbreviations() {
      if (this.filterString === "") return;
      const arrFilter = this.filterString.split(" ");
      this.abbreviations = this.originalSource;
      Object.keys(this.abbreviations).forEach((key) => {
        let inFilter = true;
        const sString = this.abbreviations[key].name + this.abbreviations[key].description;
        for ( let i = 0; i < arrFilter.length; i++ ) {
          if (!sString.toUpperCase().includes(arrFilter[i].toUpperCase())) inFilter = false;
        }
        this.abbreviations[key].isInList = inFilter;
      })
      this.abbreviations = this.abbreviations.filter((e: { isInList: boolean; }) => e.isInList === true);
      this.entriesStr = String(this.abbreviations.length) + " Einträge";
  }

  filterCMOMasters() {
    if (this.filterString === "") return;
    const arrFilter = this.filterString.split(" ");
    this.cmomasters = this.originalSource;
    Object.keys(this.cmomasters).forEach((key) => {
      let inFilter = true;
      const sString = this.cmomasters[key].categoryId + this.cmomasters[key].name + this.cmomasters[key].description + this.cmomasters[key].sku;
      for ( let i = 0; i < arrFilter.length; i++ ) {
        if (!sString.toUpperCase().includes(arrFilter[i].toUpperCase())) inFilter = false;
      }
      this.cmomasters[key].isInList = inFilter;
    })
    this.cmomasters = this.cmomasters.filter((e: { isInList: boolean; }) => e.isInList === true);
    this.entriesStr = String(this.cmomasters.length) + " Einträge";
}


}
