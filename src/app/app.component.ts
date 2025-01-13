import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { ServiceService } from './service.service';
import * as Cosmos from "@azure/cosmos";
//import * as abbrData from "../assets/abbreviations.json";
//import * as smoData from "../assets/SCMPriorityReleaseReport.json";
//import * as cmomasters from "../assets/cmomasters.json";
//import * as contacts_kontakte from "../assets/qa_ra_liste_contacts_kontakte.json"
//mport * as contacts_vendors from "../assets/qa_ra_liste_contacts_vendors.json"
//import * as contacts_skus from "../assets/qa_ra_liste_contacts_skus.json"
//import * as batch_jan_mar_2024 from "../assets/batch_jan_mar_2024.json"
//import * as sap_fg_material from '../assets/sap_fg_material.json'
//import * as api_manufacturers from '../assets/api_manufacturers.json'
//import * as manufacturers from '../assets/manufacturers.json'
import * as categories from '../assets/categories.json'

import { ScmPriority, ContactsKontakte, ContactsVendor, ContactsSkus, SAPMaterial} from "./model/modelClasses"
import { Observable } from 'rxjs';
import { DataTableComponent } from './data-table/data-table.component';
import { AbbreviationDialog } from './dialogs/abbreviationDialog/abbreviationDialog.component'
import { CmomasterDialog } from './dialogs/cmomasterDialog/cmomasterDialog.component'
import { ScmDialog } from './dialogs/scmDialog/scmDialog.component'
import { ContactsKontakteDialog } from './dialogs/contactsKontakteDialog/contactsKontakteDialog.component'
import { ContactsVendorsDialog } from './dialogs/contactsVendorsDialog/contactsVendorsDialog.component'
import { ContactsSkusDialog } from './dialogs/contactsSkusDialog/contactsSkusDialog.component'
import { SAPMaterialDialog } from './dialogs/SAPMaterialDialog/SAPMaterialDialog.component'
import { WarehouseDialog } from './dialogs/warehouseDialog/warehouseDialog.component'
import { BrrprocessDialog } from './dialogs/brrprocessDialog/brrprocessDialog.component'
import { BrrstatusDialog } from './dialogs/brrstatusDialog/brrstatusDialog.component'
import { QcprocessDialog } from './dialogs/qcprocessDialog/qcprocessDialog.component'
import { MessageboxDialog } from './dialogs/messageboxDialog/messageboxDialog.component'
import { FormDialog } from './dialogs/formDialog/formDialog.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    MatTabsModule, 
    CommonModule,
    FormsModule,
    DataTableComponent,
    AbbreviationDialog,
    CmomasterDialog,
    ScmDialog,
    ContactsKontakteDialog,
    ContactsVendorsDialog,
    ContactsSkusDialog,
    SAPMaterialDialog,
    WarehouseDialog,
    BrrprocessDialog,
    BrrstatusDialog,
    QcprocessDialog,
    MessageboxDialog,
    FormDialog
  ]
})

export class AppComponent {
  @ViewChild('abbreviationDialog', { static: true }) abbreviationDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('cmomasterDialog', { static: true }) cmomasterDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('scmDialog', { static: true }) scmDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('contactsKontakteDialog', { static: true }) contactsKontakteDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('contactsVendorsDialog', { static: true }) contactsVendorsDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('contactsSkusDialog', { static: true }) contactsSkusDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('SAPMaterialDialog', { static: true }) SAPMaterialDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('warehouseDialog', { static: true }) warehouseDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('brrprocessDialog', { static: true }) brrprocessDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('brrstatusDialog', { static: true }) brrstatusDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('qcprocessDialog', { static: true }) qcprocessDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('messageboxDialog', { static: true }) messageboxDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('formDialog', { static: true }) formDialog!: ElementRef<HTMLDialogElement>;

  dataSource = [];  
  originalSource = [];  
  currentItem: any = [];  
  diParam: any = [];  
  scmpriorities: any = []; 
  apimanufacturers: any = []; 
  manufacturers: any = []; 
  categories: any = []; 
  cmomasters = []; 
  data: Observable<any>;
  index = 0;
  colorIndex = 0;
  dialogTitle = "Eintrag bearbeiten";
  name = "";
  description = "";
  categoryId = "";
  sku = "";
  currentId = "";
  content = [];
  entriesStr = "";
  filterStr = "";
  filterString = "";
  smo: any = [];
  tableData: any = [];
  service: ServiceService;
  endpoint; 
  key;
  client;
  database; 
  collection;
  db;
  container;
  cols: any;
  headers: any;
  constructor() {
    this.service = new ServiceService();
    this.endpoint = "https://schruefer.documents.azure.com:443/";
    this.key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
    this.client = new Cosmos.CosmosClient({endpoint: this.endpoint, key: this.key});
    this.database = "Heumann";
    this.collection = "Items";
    this.db = this.client.database(this.database);
    this.container = this.db.container("S");
    this.getAPIManufacturers();
    this.getManufacturers();
    this.getCategories();
    //this.service.createCategories(categories);
    //this.service.createBatch(batch_jan_mar_2024);
    //this.service.createManufacturers(manufacturers);
  }
 
  public async getCategories() {  
    this.container = this.db.container("Categories");
    try {
      await this.container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        this.categories = response.resources;
      }) 
    } catch(error) {
      console.log(error);
    }    
  } 

  public async getAPIManufacturers() {  
    this.container = this.db.container("API_Manufacturers");
    try {
      await this.container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        this.apimanufacturers = response.resources;
      }) 
    } catch(error) {
      console.log(error);
    }    
  } 

  public async getManufacturers() {  
    this.container = this.db.container("Manufacturers");
    try {
      await this.container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        this.manufacturers = response.resources;
      }) 
    } catch(error) {
      console.log(error);
    }    
  } 

  public async getSCMPriorities() {  
    this.container = this.db.container("Scmpriorities");
    try {
      await this.container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        debugger;
        this.createTableData(response.resources, 3);
        
        this.originalSource = this.tableData;
        this.entriesStr = this.tableData.length.toString() + " Einträge"; 
        this.filterStr = "Filter:   ";    
      }) 
    } catch(error) {
      console.log(error);
    }    
  } 
  

  public async getAbbreviations() {  
    this.container = this.db.container("Abbreviations");
    try {
      await this.container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        this.createTableData(response.resources, 1);
        this.originalSource = this.tableData;
        this.entriesStr = this.tableData.length.toString() + " Einträge"; 
        this.filterStr = "Filter:   ";    
      }) 
    } catch(error) {
      console.log(error);
    }    
  } 

  public async getData(container: string, index: number) {  
    this.container = this.db.container(container);
    try {
      await this.container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        this.createTableData(response.resources, index);
        this.originalSource = this.tableData;
        this.entriesStr = this.tableData.length.toString() + " Einträge"; 
        this.filterStr = "Filter:   ";    
      }) 
    } catch(error) {
      console.log(error);
    }    
  } 

  public async getCmomasters() {  
    this.container = this.db.container("Cmomasters");
    try {
      await this.container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        this.createTableData(response.resources, 2);
        this.originalSource = this.tableData;
        this.entriesStr = this.tableData.length.toString() + " Einträge"; 
        this.filterStr = "Filter:   ";    
      }) 
    } catch(error) {
      console.log(error);
    }    
  } 

  createTableData(data: any, index: number) {
    let items = [];
    data.forEach(element => {
      let entry: any = [];
      if (index === 1) entry = this.getAbbreviationEntry(element);
      if (index === 2) entry = this.getCmomasterEntry(element);
      if (index === 3) entry = this.getScmEntry(element);
      if (index === 4) entry = this.getContactsKontakteEntry(element);
      if (index === 5) entry = this.getContactsVendorsEntry(element);
      if (index === 6) entry = this.getContactsSkusEntry(element);
      if (index === 7) entry = this.getSAPMaterialEntry(element);
      if (index === 8) entry = this.getBatchReleaseEntry(element);
      items.push(entry);
    });
    this.tableData = items; 
    debugger;
  }

  public getAbbreviationEntry(e: any) {
    let abbreviationEntry = {
      id: e.id,
      field1: e.abbreviation,
      field2: e.content,
      field3: "",
      field4: "",
      isInList: true
    };
    return abbreviationEntry;
  }

  public getCmomasterEntry(e: any) {
    let cmomasterEntry = {
      id: e.id,
      field1: e.API_Manufacturer,
      field2: e.Manufacturer,
      field3: e.Category,
      field4: e.Release_site,
      isInList: true
    };
    return cmomasterEntry;
  }

  public getScmEntry(e: any) {
    let scmEntry = {
      id: e.id,
      field1: e.Molecule,
      field2: e.Heumann_material_code_1,
      field3: e.Material_Description,
      field4: e.molecule_strength,
      isInList: true
    };
    return scmEntry;
  }

  public getContactsKontakteEntry(e: any) {
    let contactsKontakteEntry = {
      id: e.id,
      field1: e.Lieferant,
      field2: e.Position_1,
      field3: e.Position_2,
      field4: e.SCM_Kontakt,
      isInList: true
    };
    return contactsKontakteEntry;
  }

  public getContactsVendorsEntry(e: any) {
    let contactsVendorsEntry = {
      id: e.id,
      field1: e.Vendor,
      field2: "",
      field3: "",
      field4: "",
      isInList: true
    };
    return contactsVendorsEntry;
  }

  public getContactsSkusEntry(e: any) {
    let contactsSkusEntry = {
      id: e.id,
      field1: e.SAP_Mat_Description,
      field2: e.API,
      field3: e.PZN,
      field4: e.Vendor,
      isInList: true
    };
    return contactsSkusEntry;
  }

  public getSAPMaterialEntry(e: any) {
    let SAPMaterialEntry = {
      id: e.id,
      field1: e.Company,
      field2: e.Mat_No_,
      field3: e.Material_description,
      field4: e.Molecule,
      isInList: true
    };
    return SAPMaterialEntry;
  }

  public getBatchReleaseEntry(e: any) {
    let BatchReleaseEntry = {
      id: e.id,
      field1: e.SAP_Material_Number,
      field2: e.FP_Batch_no__,
      field3: e.Bulk_Batch_no_,
      field4: e.MA_name_,
      isInList: true
    };
    return BatchReleaseEntry;
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

  public async changeTab(e: any) {
    this.index = e.index;
    if (e.index === 0) {
      this.entriesStr = "";
      this.filterStr = "";
    }
    if (e.index === 1) { 
      this.headers = ["Abbreviation", "Content", "", ""];
      this.cols = [true, true, false, false];
      this.getAbbreviations();  
    }
    if (e.index === 2) { 
      this.headers = ["API Manufacturer", "Manufacturer", "Category", "Release site"];
      this.cols = [true, true, true, true];
      this.getCmomasters();  
    }
    if (e.index === 3) { 
      this.headers = ["Molecule","Mat. Code","Material description","Molecule strength"];
      this.cols = [true, true, true, true];
      this.getSCMPriorities();  
    }
    if (e.index === 4) { 
      this.headers = ["Lieferant","Position 1","Position 2","SCM Kontakt"];
      this.cols = [true, true, true, true];
      this.getData("Contacts_Kontakte",4);  
    }
    if (e.index === 5) { 
      this.headers = ["Vendor","","",""];
      this.cols = [true, false, false, false];
      this.getData("Contacts_Vendors",5);  
    }
    if (e.index === 6) { 
      this.headers = ["SAP Mat Description","API","PZN","Vendor"];
      this.cols = [true, true, true, true];
      this.getData("Contacts_Skus",6);  
    }
    if (e.index === 7) { 
      this.headers = ["Company","Mat. No","Description","Molecule"];
      this.cols = [true, true, true, true];
      this.getData("SAP_FG_Material",7);  
    }
    if (e.index === 8) { 
      this.headers = ["SAP Mat. No.","FP Batch No.","Bulk Batch No.","MA Name"];
      this.cols = [true, true, true, true];
      this.getData("Batch_Release",8);  
    }
  }

  
 

  public setColor(col: number) {
    return "color:" + (this.colorIndex === col ? "lightgray;" : "black;");
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

  public async editAbbreviation(item: any) {
    this.dialogTitle = "Abbreviation bearbeiten";
    this.container = this.db.container("Abbreviations");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    this.formDialog.nativeElement.showModal();
    //this.abbreviationDialog.nativeElement.showModal(); 
  }

  emitEdit(item) {
    
    if (this.index === 1) this.editAbbreviation(item);
    if (this.index === 2) this.editCmomaster(item);
    if (this.index === 3) this.editScm(item);
    if (this.index === 4) this.editContactsKontakte(item);
    if (this.index === 5) this.editContactsVendors(item);
    if (this.index === 6) this.editContactsSkus(item);
    if (this.index === 7) this.editSAPMaterial(item);
    if (this.index === 8) {
      if (item.brindex === 1) this.editWarehouse(item);
      if (item.brindex === 2) this.editBrrprocess(item);
      if (item.brindex === 3) this.editBrrstatus(item);
      if (item.brindex === 4) this.editQcprocess(item);
    }
  }

  public async editContactsKontakte(item: any) {
    this.dialogTitle = "Eintrag bearbeiten";
    this.container = this.db.container("Contacts_Kontakte");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    this.contactsKontakteDialog.nativeElement.showModal(); 
  }

  public async editContactsVendors(item: any) {
    this.dialogTitle = "Contacts - Vendor bearbeiten";
    this.container = this.db.container("Contacts_Vendors");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    this.contactsVendorsDialog.nativeElement.showModal(); 
  }

  public async editContactsSkus(item: any) {
    this.dialogTitle = "Contacts - Skus bearbeiten";
    this.container = this.db.container("Contacts_Skus");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    this.contactsSkusDialog.nativeElement.showModal(); 
  }

  public async editSAPMaterial(item: any) {
    this.dialogTitle = "SAP Material bearbeiten";
    this.container = this.db.container("SAP_FG_Material");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    this.SAPMaterialDialog.nativeElement.showModal(); 
  }

  public async editWarehouse(item: any) {
    this.dialogTitle = "Warehouse";
    this.container = this.db.container("Batch_Release");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    let manudate: string = cItem["Manufacturing_date"];
    let expirydate: string = cItem["Expiry_date"];
    let srdate: string = cItem["Sample_Receipt_date"];
    srdate = srdate.substr(6,4) + "-" + srdate.substr(3,2) + "-" + srdate.substr(0,2);
    let mdate: string = cItem["Release__Block_for_Marketing_date"];
    mdate = mdate.substr(6,4) + "-" + mdate.substr(3,2) + "-" + mdate.substr(0,2);
    let sdate: string = cItem["Release__Block_for_Sale_date"];
    sdate = sdate.substr(6,4) + "-" + sdate.substr(3,2) + "-" + sdate.substr(0,2);
    this.diParam = [
      manudate.substr(0,2), 
      manudate.substr(3,4),
      expirydate.substr(0,2), 
      expirydate.substr(3,4),
      cItem["Company"],
      cItem["EU_Non_EU"],
      srdate,
      mdate,
      sdate,
      cItem["API_Manufacturer"],
      cItem["Manufacturer"]
    ];
    this.warehouseDialog.nativeElement.showModal(); 
  }

  public async editBrrprocess(item: any) {
    this.dialogTitle = "BRR Process";
    this.container = this.db.container("Batch_Release");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    let priodate: string = cItem["Prio_meeting_release_date"];
    priodate = priodate.substr(6,4) + "-" + priodate.substr(3,2) + "-" + priodate.substr(0,2);
    let OGS_checked = cItem["OGS_checked"] == "x" ? true : false;
    let qapmdate: string = cItem["BRRor_QAPM"];
    qapmdate = qapmdate.substr(6,4) + "-" + qapmdate.substr(3,2) + "-" + qapmdate.substr(0,2);
    let bcalcdate: string = cItem["BRRor_calculation"];
    bcalcdate = bcalcdate.substr(6,4) + "-" + bcalcdate.substr(3,2) + "-" + bcalcdate.substr(0,2);
    let qcalcdate: string = cItem["QAPM_calculation"];
    qcalcdate = qcalcdate.substr(6,4) + "-" + qcalcdate.substr(3,2) + "-" + qcalcdate.substr(0,2);
    this.diParam = [
      priodate,
      OGS_checked,
      qapmdate,
      bcalcdate,
      qcalcdate,
      cItem["category"]
    ];
    this.brrprocessDialog.nativeElement.showModal(); 
  }

  public async editBrrstatus(item: any) {
    this.dialogTitle = "BRR Status";
    this.container = this.db.container("Batch_Release");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    let bddate: string = cItem["date_batch_docs"];
    bddate = bddate.substr(6,4) + "-" + bddate.substr(3,2) + "-" + bddate.substr(0,2);
    let temp_checked = cItem["Temperaturauswertung_abgeschlossen"] == "x" ? true : false;
    let batchdoc = cItem["Status_Batch_docs"];
    this.diParam = [
      bddate, temp_checked, batchdoc
    ];
    this.brrstatusDialog.nativeElement.showModal(); 
  }

  public async editQcprocess(item: any) {
    this.dialogTitle = "QC Process";
    this.container = this.db.container("Batch_Release");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    let coarec: string = cItem["CoA_chem_received"];
    coarec = coarec.substr(6,4) + "-" + coarec.substr(3,2) + "-" + coarec.substr(0,2);
    let coaadd: string = cItem["CoA_add_received"];
    coaadd = coaadd.substr(6,4) + "-" + coaadd.substr(3,2) + "-" + coaadd.substr(0,2);
    debugger;
    let cocrec: string = cItem["CoC_received"];
    cocrec = cocrec.substr(6,4) + "-" + cocrec.substr(3,2) + "-" + cocrec.substr(0,2);
    this.diParam = [
      coarec, coaadd, cocrec
    ];
    this.qcprocessDialog.nativeElement.showModal(); 
  }

  public async editCmomaster(item: any) {
    this.dialogTitle = "Eintrag bearbeiten";
    this.container = this.db.container("Cmomasters");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    this.cmomasterDialog.nativeElement.showModal(); 
  }

  public async editScm(item: any) {
    this.dialogTitle = "Eintrag bearbeiten";
    this.container = this.db.container("Scmpriorities");
    this.currentId = item.id;
    let { resource: cItem } = await this.container.item(this.currentId, this.currentId).read();
    this.currentItem = cItem;
    this.scmDialog.nativeElement.showModal(); 
  }

  public emitCancel(index) {
    debugger;
    if (index === 1) this.abbreviationDialog.nativeElement.close();
    if (index === 2) this.cmomasterDialog.nativeElement.close();
    if (index === 3) this.scmDialog.nativeElement.close();
    if (index === 4) this.contactsKontakteDialog.nativeElement.close();
    if (index === 5) this.contactsVendorsDialog.nativeElement.close();
    if (index === 6) this.contactsSkusDialog.nativeElement.close();
    if (index === 7) this.SAPMaterialDialog.nativeElement.close();
    if (index === 8) this.warehouseDialog.nativeElement.close();
    if (index === 9) this.brrprocessDialog.nativeElement.close();
    if (index === 10) this.brrstatusDialog.nativeElement.close();
    if (index === 11) this.qcprocessDialog.nativeElement.close();
    if (index === 12) this.formDialog.nativeElement.close();
  }

  public emitSave(index) {
    debugger;
    if (index === 1) this.saveAbbreviation();
    if (index === 2) this.saveCmomaster();
    if (index === 3) this.saveScm();
    if (index === 4) this.saveContactsKontakte();
    if (index === 5) this.saveContactsVendor();
    if (index === 6) this.saveContactsSkus();
    if (index === 7) this.saveSAPMaterial();
    if (index === 8) this.saveWarehouse();
    if (index === 9) this.saveBrrprocess();
    if (index === 10) this.saveBrrstatus();
    if (index === 11) this.saveQcprocess();
  }

  public emitDelete(item) {
    this.deleteItem(item);
  }
    
  public async deleteItem(item: any) {
    if (!confirm("'" + item.field1 + " / " + item.field2 + "' endgültig löschen?")) {
      return;
    }
    if (this.index === 1) this.container = this.db.container("Abbreviations");
    if (this.index === 2) this.container = this.db.container("Cmomasters");
    let index = this.tableData.findIndex((e: { id: any; }) => e.id === item.id); 
    this.tableData.splice(index, 1);
    index = this.originalSource.findIndex((e: { id: any; }) => e.id === e.id); 
    this.originalSource.splice(index, 1);
    await this.container.item(item.id, item.id).delete();
    this.entriesStr = String(this.tableData.length) + " Einträge";
  }

  public async saveAbbreviation() {
    this.container = this.db.container("Abbreviations");
    if (this.currentId !== undefined) {
      this.replaceTableData(this.currentItem.abbreviation, this.currentItem.content, "", "");
      this.updateData("Abbreviations");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.abbreviation, this.currentItem.content, "", "");
      let entry = {
        id: id,
        abbreviation: this.currentItem.abbreviation,
        content: this.currentItem.content
      }  
      await this.container.items.create(entry);
    }
    this.abbreviationDialog.nativeElement.close();
  }

  public async saveScm() {
    if (this.currentId !== undefined) {
    this.replaceTableData(
      this.currentItem.Molecule, this.currentItem.Heumann_material_code_1,
      this.currentItem.Material_Description, this.currentItem.molecule_strength);
      this.updateData("Scmpriorities");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Molecule, this.currentItem.Heumann_material_code_1, 
        this.currentItem.Material_Description, this.currentItem.molecule_strength);
      this.currentItem.id = id;
      this.container = this.db.container("Scmpriorities");
      await this.container.items.create(this.currentItem);
    }
    this.scmDialog.nativeElement.close(); 
  }

   public async saveContactsKontakte() {
    if (this.currentId !== undefined) {
    this.replaceTableData(
      this.currentItem.Lieferant, this.currentItem.Position_1,
      this.currentItem.Position_2, this.currentItem.SCM_Kontakt);
      this.updateData("Contacts_Kontakte");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Lieferant, this.currentItem.Position_1, 
        this.currentItem.Position_2, this.currentItem.SCM_Kontakt);
      this.currentItem.id = id;
      this.container = this.db.container("Contacts_Kontakte");
      await this.container.items.create(this.currentItem);
    }
    this.contactsKontakteDialog.nativeElement.close(); 
  }

  public async saveContactsVendor() {
    debugger;
    if (this.currentId !== undefined) {
    this.replaceTableData(
      this.currentItem.Vendor, "","","");
      this.updateData("Contacts_Vendors");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Vendor, "","","");
      this.currentItem.id = id;
      this.container = this.db.container("Contacts_Vendors");
      await this.container.items.create(this.currentItem);
    }
    this.contactsVendorsDialog.nativeElement.close(); 
  }

  public async saveContactsSkus() {
    if (this.currentId !== undefined) {
    this.replaceTableData(
      this.currentItem.SAP_Mat_Description, this.currentItem.API,
        this.currentItem.PZN,this.currentItem.Vendor);
      this.updateData("Contacts_Skus");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.SAP_Mat_Description, this.currentItem.API,
        this.currentItem.PZN,this.currentItem.Vendor);
      this.currentItem.id = id;
      this.container = this.db.container("Contacts_Skus");
      await this.container.items.create(this.currentItem);
    }
    this.contactsSkusDialog.nativeElement.close(); 
  }

  public async saveSAPMaterial() {
    if (this.currentId !== undefined) {
    this.replaceTableData(
      this.currentItem.Company, this.currentItem.Mat_No_,
        this.currentItem.Material_description,this.currentItem.Molecule);
      this.updateData("SAP_FG_Material");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Company, this.currentItem.Mat_No_,
        this.currentItem.Material_description,this.currentItem.Molecule);
      this.currentItem.id = id;
      this.container = this.db.container("SAP_FG_Material");
      await this.container.items.create(this.currentItem);
    }
    this.SAPMaterialDialog.nativeElement.close(); 
  }

  public async saveWarehouse() {
    if (this.currentId !== undefined) {
      this.currentItem.Manufacturing_date = this.diParam[0] + "/" + this.diParam[1];
      this.currentItem.Expiry_date = this.diParam[2] + "/" + this.diParam[3];
      this.currentItem.API_Manufacturer = this.diParam[9];
      this.currentItem.Manufacturer = this.diParam[10];
      let srdate = this.diParam[6].substr(8,2) + "/" + this.diParam[6].substr(5,2) + "/" + this.diParam[6].substr(0,4);
      this.currentItem.Sample_Receipt_date = srdate;
      let rbmdate = this.diParam[7].substr(8,2) + "/" + this.diParam[7].substr(5,2) + "/" + this.diParam[7].substr(0,4);
      this.currentItem.Release__Block_for_Marketing_date = rbmdate;
      let rbsdate = this.diParam[8].substr(8,2) + "/" + this.diParam[8].substr(5,2) + "/" + this.diParam[8].substr(0,4);
      this.currentItem.Release__Block_for_Sale_date = rbsdate;
      this.replaceTableData(
        this.currentItem.SAP_Material_Number, this.currentItem.FP_Batch_no__,
        this.currentItem.Bulk_Batch_no_,this.currentItem.MA_name_);
      this.updateData("Batch_Release");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Company, this.currentItem.Mat_No_,
        this.currentItem.Material_description,this.currentItem.Molecule);
      this.currentItem.id = id;
      this.container = this.db.container("SAP_FG_Material");
      await this.container.items.create(this.currentItem);
    }
    this.warehouseDialog.nativeElement.close(); 
  }

  public async saveBrrprocess() {
    if (this.currentId !== undefined) {
      this.currentItem.Prio_meeting_release_date = this.formatDate(this.diParam[0]);
      this.currentItem.category = this.diParam[5];
      this.currentItem.OGS_checked = this.diParam[1] ? "x" : "";
      this.currentItem.BRRor_QAPM = this.formatDate(this.diParam[2]);
      debugger;
      this.currentItem.BRRor_calculation = this.formatDate(this.diParam[3]);
      this.currentItem.QAPM_calculation = this.formatDate(this.diParam[4]);;
      this.updateData("Batch_Release");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Company, this.currentItem.Mat_No_,
        this.currentItem.Material_description,this.currentItem.Molecule);
      this.currentItem.id = id;
      this.container = this.db.container("SAP_FG_Material");
      await this.container.items.create(this.currentItem);
    }
    this.brrprocessDialog.nativeElement.close(); 
  }

  public async saveBrrstatus() {
    if (this.currentId !== undefined) {
      this.currentItem.Status_Batch_docs = this.diParam[2];
      this.currentItem.date_batch_docs = this.formatDate(this.diParam[0]);
      this.currentItem.Temperaturauswertung_abgeschlossen = this.diParam[1] ? "x" : "";
      this.updateData("Batch_Release");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Company, this.currentItem.Mat_No_,
        this.currentItem.Material_description,this.currentItem.Molecule);
      this.currentItem.id = id;
      this.container = this.db.container("SAP_FG_Material");
      await this.container.items.create(this.currentItem);
    }
    this.brrstatusDialog.nativeElement.close(); 
  }

  public async saveQcprocess() {
    if (this.currentId !== undefined) {
      this.currentItem.CoA_chem_received = this.formatDate(this.diParam[0]);
      this.currentItem.CoA_add_received = this.formatDate(this.diParam[1]);
      this.currentItem.CoC_received = this.formatDate(this.diParam[2]);
      this.updateData("Batch_Release");
    } else {
      let id = this.createId();
      this.addTableData(id, this.currentItem.Company, this.currentItem.Mat_No_,
        this.currentItem.Material_description,this.currentItem.Molecule);
      this.currentItem.id = id;
      this.container = this.db.container("SAP_FG_Material");
      await this.container.items.create(this.currentItem);
    }
    this.qcprocessDialog.nativeElement.close(); 
  }

  formatDate(date: string) {
    return date.substr(8,2) + "/" + date.substr(5,2) + "/" + date.substr(0,4);
  }

  public async saveCmomaster() {
    if (this.currentId !== undefined) {
      this.replaceTableData(
        this.currentItem.API_Manufacturer, this.currentItem.Manufacturer,
        this.currentItem.Category, this.currentItem.Release_site);
        this.updateData("Cmomasters");
    } else {
      let id = this.createId();
      let newItem: any = [];
      newItem.id = id;
      newItem.field1 = this.currentItem.API_Manufacturer;
      newItem.field2 = this.currentItem.Manufacturer;
      newItem.field3 = this.currentItem.Category;
      newItem.field4 = this.currentItem.Release_site;
      this.tableData.push(newItem);
      let entry = {
        id: id,
        API_Manufacturer: this.currentItem.API_Manufacturer,
        Manufacturer: this.currentItem.Manufacturer,
        Category: this.currentItem.Category,
        Release_site: this.currentItem.Release_site
      };
      this.container = this.db.container("Cmomasters");
      await this.container.items.create(entry);
    }
    this.cmomasterDialog.nativeElement.close(); 
  }


  public newEntry() {
    if (this.index === 1) this.newEntryAbbreviation(); 
    if (this.index === 2) this.newEntryCMOMaster(); 
    if (this.index === 3) this.newEntryScmPriorities();
    if (this.index === 4) this.newEntryContactsKontakte();
    if (this.index === 5) this.newEntryContactsVendor();
    if (this.index === 6) this.newEntryContactsSkus();
    if (this.index === 7) this.newEntrySAPMaterial();
  }

  public newEntryAbbreviation() {
    this.dialogTitle = "New entry 'Abbreviations'";
    this.currentId = undefined;
    this.currentItem = [];
    this.currentItem.abbreviation = "";
    this.currentItem.content = "";
    this.abbreviationDialog.nativeElement.showModal(); 
  }

  public newEntryCMOMaster() {
    this.dialogTitle = "New entry 'CMO Master'";
    this.currentId = undefined;
    this.currentItem = [];
    this.currentItem.API_Manufacturer = "";
    this.currentItem.Manufacturer = "";
    this.currentItem.Category = "";
    this.currentItem.Release_site = "";
    this.cmomasterDialog.nativeElement.showModal(); 
  }

  public newEntryScmPriorities() {
    this.dialogTitle = "New entry 'SCM Priorities'";
    this.currentId = undefined;
    this.currentItem = new ScmPriority();
    this.scmDialog.nativeElement.showModal();
  }

  public newEntryContactsKontakte() {
    this.dialogTitle = "New entry 'Contacts - Kontakte'";
    this.currentId = undefined;
    this.currentItem = new ContactsKontakte();
    this.contactsKontakteDialog.nativeElement.showModal();
  }

  public newEntryContactsVendor() {
    this.dialogTitle = "New entry 'Contacts - Vendor'";
    this.currentId = undefined;
    this.currentItem = new ContactsVendor();
    this.contactsVendorsDialog.nativeElement.showModal();
  }

  public newEntryContactsSkus() {
    this.dialogTitle = "New entry 'Contacts - Skus'";
    this.currentId = undefined;
    this.currentItem = new ContactsSkus();
    this.contactsSkusDialog.nativeElement.showModal();
  }

  public newEntrySAPMaterial() {
    this.dialogTitle = "New entry 'SAP FG Material'";
    this.currentId = undefined;
    this.currentItem = new SAPMaterial();
    this.SAPMaterialDialog.nativeElement.showModal();
  }

  clearFilter() {
    if (this.index === 1) this.getAbbreviations();
    if (this.index === 2) this.getCmomasters();
    if (this.index === 3) this.getSCMPriorities();
    if (this.index === 4) this.getData("Contacts_Kontakte", 4);
    if (this.index === 5) this.getData("Contacts_Vendors", 5);
    if (this.index === 6) this.getData("Contacts_Skus", 6);
    if (this.index === 7) this.getData("SAP_FG_Material", 7);
    if (this.index === 8) this.getData("Batch_Release", 8);
    this.entriesStr = this.tableData.length.toString() + " Einträge"; 
  }

  filterData() {
      if (this.filterString === "") return;
      const arrFilter = this.filterString.split(" ");
      debugger;
      this.tableData = this.originalSource;
      debugger;
      Object.keys(this.tableData).forEach((key) => {
        let inFilter = true;
        const sString = this.tableData[key].field1 + this.tableData[key].field2 + this.tableData[key].field3 + this.tableData[key].field4;
        for ( let i = 0; i < arrFilter.length; i++ ) {
          if (!sString.toUpperCase().includes(arrFilter[i].toUpperCase())) inFilter = false;
        }
        this.tableData[key].isInList = inFilter;
      })
      this.tableData = this.tableData.filter((e: { isInList: boolean; }) => e.isInList === true);
      this.entriesStr = String(this.tableData.length) + " Einträge";
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

  public createId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    let result: string = "";
    while (counter < 35) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  public replaceTableData(f1, f2, f3, f4) {
    let item = this.tableData.find((element: any) => element.id === this.currentId);
    item.field1 = f1;
    item.field2 = f2;
    item.field3 = f3;
    item.field4 = f4;
    item = this.originalSource.find((element: any) => element.id === this.currentId);
    item.field1 = f1;
    item.field2 = f2;
    item.field3 = f3;
    item.field4 = f4;
  }

  public async updateData(container: string) {
    this.showMessage();
    this.container = this.db.container(container);
    await this.container
      .item(this.currentId, this.currentId)
      .replace(this.currentItem);
  }

  public addTableData(id, f1, f2, f3, f4) {
    let newItem: any = [];
      newItem.id = id;
      newItem.field1 = f1;
      newItem.field2 = f2;
      newItem.field3 = f3;
      newItem.field4 = f4;
      this.tableData.push(newItem)
  }

  public showMessage() {
    this.messageboxDialog.nativeElement.showModal(); 
    setTimeout(() => {
      this.messageboxDialog.nativeElement.close(); ;
    }, 2000);
  }
}
