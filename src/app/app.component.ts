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
  
  dataSource = [];  
  abbreviations = [];  
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
  currentId = "";

  constructor() {
    this.endpoint = "https://schruefer.documents.azure.com:443/";
    this.key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
    this.client = new Cosmos.CosmosClient({endpoint: this.endpoint, key: this.key});
    this.database = "SampleDB";
    this.collection = "Items";
    this.db = this.client.database(this.database);
    this.container = this.db.container("SampleContainer");
  }
 
  public async getAbbreviations() {   
    try {
        await this.container.items
        .query({
            query: "SELECT * from c  where c.categoryName='abbreviation'"
        })
        .fetchAll()
        .then((response: any) => {
          console.log(response);
          this.dataSource = this.createData(response); 
          this.abbreviations = this.createData(response); 
          console.log(this.dataSource);    
      }) 
    } catch(error) {
        console.log(error);

    }    
  } 

  public createData(response) {
    let items = [];
    response.resources.forEach(element => {
      const entry: any = [];
      entry.categoryName = element.categoryName;
      entry.description = element.description;
      entry.name = element.name;
      entry.price = element.price;
      items.push(entry);
    });
    return items;
  }

  public changeTab(e: Event) {
    this.getAbbreviations();
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

  public editAbbreviation(item: any) {
    this.dialogTitle = "Eintrag bearbeiten";
    this.currentId = item.id;
    this.name = item.name;
    this.description = item.description;
    this.abbreviationDialog.nativeElement.showModal(); 
  }

  public saveAbbreviation() {

  }
}
