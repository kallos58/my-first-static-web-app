import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common'

import { RouterOutlet } from '@angular/router';
import * as Cosmos from "@azure/cosmos";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MatTabsModule, CommonModule, RouterOutlet]
})




export class AppComponent implements OnInit{
  dataSource = [];  
  displayedColumns: string[] = ['categoryName', 'description', 'name', 'price'];
  ngOnInit(): void {
    this.connect();
  }

  public async connect() {   
    try {
        const endpoint = "https://schruefer.documents.azure.com:443/";
        const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
        const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
        const database = "SampleDB";
        const collection = "Items";
        const db = client.database(database);
        const container = db.container("SampleContainer");
        await container.items
        .query({
            query: "SELECT * from c  where c.categoryName='abbreviation'"
        })
        .fetchAll()
        .then((response: any) => {
          console.log(response);
          this.dataSource = this.createData(response); 
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
}
