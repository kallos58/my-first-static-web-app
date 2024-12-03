import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbbreviationsService } from './abbreviations.service'
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-abbreviations',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './abbreviations.component.html',
  styleUrl: './abbreviations.component.css'
})
export class AbbreviationsComponent implements OnInit{
  abbreviationsService;
  abbreviations = [{"id": "1"},{"id": "2"}];  
  constructor() {
    this.abbreviationsService = new AbbreviationsService();
  }
 
  async ngOnInit(): Promise<void> {
    
  }

  
  public createAbbreviations(response: any) {
    let items: any = [];
    let i = 1;
    response.resources.forEach((e: { categoryName: any; description: any; name: any; price: any; 
      categoryId: any; sku: any; id: any}) => {
      const entry: any = [];
      entry.id = e.id;
      entry.categoryName = e.categoryName;
      entry.categoryId = e.categoryId;
      entry.sku = e.sku;
      entry.description = e.description;
      entry.name = e.name;
      entry.price = e.price;
      entry.isInList = true;
      items.push(entry);
      ++i;
    });
    return items;
  }
}
