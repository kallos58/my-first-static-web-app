import * as Cosmos from "@azure/cosmos";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Observable } from "rxjs";

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export class ServiceService {
  constructor() {
    this.endpoint = this.getEndpoint();
    this.key = this.getKey();
    this.client = new Cosmos.CosmosClient({endpoint: this.endpoint, key: this.key});
    this.database = "Heumann";
    this.collection = "Items";
    this.db = this.client.database(this.database);
    
  }
 
  endpoint; 
  key;
  client;
  database; 
  collection;
  db;
  container;
  public async getAbbreviations(): Promise<any> {
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
              query: "SELECT * from c"
          })
          .fetchAll()
          .then((response: any) => {
            return response;
        }) 
      } catch(error) {
          console.log(error);
  
      }    
    }    
    
    public async createSAPMaterial(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
      const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
      const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
      const database = "Heumann";
      const collection = "Items";
      const db = client.database(database);
      const container = db.container("SAP_FG_Material");
      for (let i = 0; i < data.root.row.length; i++) {
        let entry = { 
          id: this.createId(),
          Company: data.root.row[i].Company,
          Mat_No_: data.root.row[i].Mat_No_,
          MA_no: data.root.row[i].MA_no,
          PZN: data.root.row[i].PZN,
          NTIN: data.root.row[i].NTIN,
          Material_description: data.root.row[i].Material_description,
          Molecule: data.root.row[i].Molecule,
          Primary_pack: data.root.row[i].Primary_pack,
          Size: data.root.row[i].Size,
          N_size: data.root.row[i].N_size,
          Temp_conditions_trucking: data.root.row[i].Temp_conditions_trucking
        };
        await container.items.create(entry);
      }
    }

    public async createCategories(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
      const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
      const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
      const database = "Heumann";
      const collection = "Items";
      const db = client.database(database);
      const container = db.container("Categories");
      //data.default.Workbook.Worksheet.Table.Row[0].Cell.Data.__text
      alert(data.default.Workbook.Worksheet.Table.Row.length);
      for (let i = 1; i < data.default.Workbook.Worksheet.Table.Row.length; i++) {
        let entry = { 
          id: this.createId(),
          category: data.default.Workbook.Worksheet.Table.Row[i].Cell.Data.__text
        }
        await container.items.create(entry);
      }
    }

    public async createBatch(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
      const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
      const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
      const database = "Heumann";
      const collection = "Items";
      const db = client.database(database);
      const container = db.container("Batch_Release");
      
      alert(data.default.data.records.record.length);
      debugger;
      for (let i = 0; i < data.default.data.records.record.length; i++) {
        let entry = { 
          id: this.createId(),
          API_Manufacturer: data.default.data.records.record[i].API_Manufacturer,
          BRRor_QAPM: data.default.data.records.record[i].BRRor_QAPM,
          BRRor_calculation: data.default.data.records.record[i].BRRor_calculation,
          BRRor_resp_: data.default.data.records.record[i].BRRor_resp_,
          Bulk_Batch_no_: data.default.data.records.record[i].Bulk_Batch_no_,
          CoA_add_received: data.default.data.records.record[i].CoA_add_received,
          CoA_chem_expected: data.default.data.records.record[i].CoA_chem_expected,
          CoA_chem_received: data.default.data.records.record[i].CoA_chem_received,
          CoC_received: data.default.data.records.record[i].CoC_received,
          Company: data.default.data.records.record[i].Company,
          Docu_comment: data.default.data.records.record[i].Docu_comment,
          EU__Non_EU: data.default.data.records.record[i].EU__Non_EU,
          Expiry_date: data.default.data.records.record[i].Expiry_date,
          FP_Batch_no__: data.default.data.records.record[i].FP_Batch_no__,
          Fortlaufende_Nummer: data.default.data.records.record[i].Fortlaufende_Nummer,
          Lab_add: data.default.data.records.record[i].Lab_add,
          Lab_chem: data.default.data.records.record[i].Lab_chem,
          MA_No_: data.default.data.records.record[i].MA_No_,
          MA_name_: data.default.data.records.record[i].MA_name_,
          Manufacturer: data.default.data.records.record[i].Manufacturer,
          Manufacturing_date: data.default.data.records.record[i].Manufacturing_date,
          NTIN: data.default.data.records.record[i].NTIN,
          OGS_checked: data.default.data.records.record[i].OGS_checked,
          Pack_size: data.default.data.records.record[i].Pack_size,
          Prio: data.default.data.records.record[i].Prio,
          Prio_meeting_release_date: data.default.data.records.record[i].Prio_meeting_release_date,
          QAPM_calculation: data.default.data.records.record[i].QAPM_calculation,
          QAPM_resp_: data.default.data.records.record[i].QAPM_resp_,
          QA_comment_: data.default.data.records.record[i].QA_comment_,
          QP_resp_: data.default.data.records.record[i].QP_resp_,
          Reanalysis_comment: data.default.data.records.record[i].Reanalysis_comment,
          Release__Block_for_Marketing_date: data.default.data.records.record[i].Release__Block_for_Marketing_date,
          Release__Block_for_Sale_date: data.default.data.records.record[i].Release__Block_for_Sale_date,
          Release__Blocking_Site: data.default.data.records.record[i].Release__Blocking_Site,
          SAP_Material_Number: data.default.data.records.record[i].SAP_Material_Number,
          Sample_Receipt_date: data.default.data.records.record[i].Sample_Receipt_date,
          Status: data.default.data.records.record[i].Status,
          Status_Batch_docs: data.default.data.records.record[i].Status_Batch_docs,
          Temperaturauswertung_abgeschlossen: data.default.data.records.record[i].Temperaturauswertung_abgeschlossen,
          category: data.default.data.records.record[i].category,
          date_batch_docs: data.default.data.records.record[i].date_batch_docs,
          release_site: data.default.data.records.record[i].release_site
        }
        await container.items.create(entry);
      }
    }

    public async createContactsSkus(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
      const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
      const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
      const database = "Heumann";
      const collection = "Items";
      const db = client.database(database);
      const container = db.container("Contacts_Skus");
      console.log(data.default.data.records.record);
      for (let i = 0; i < data.default.data.records.record.length; i++) {
        let entry = { 
          id: this.createId(),
          API: data.default.data.records.record[i].API,
          PZN: data.default.data.records.record[i].PZN,
          SAP_Mat_Description: data.default.data.records.record[i].SAP_Mat_Description,
          SAP_Mat_Nr: data.default.data.records.record[i].SAP_Mat_Nr,
          Vendor: data.default.data.records.record[i].Vendor
        }
        await container.items.create(entry);
      }
    }

    public async createAPIManufacturers(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
      const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
      const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
      const database = "Heumann";
      const collection = "Items";
      const db = client.database(database);
      const container = db.container("API_Manufacturers");
      alert(data.default.data.records.record.length);
      for (let i = 0; i < data.default.data.records.record.length; i++) {
        let entry = { 
          id: this.createId(),
          API_Manufacturer: data.default.data.records.record[i].API_Manufacturer,
        }
        await container.items.create(entry);
      }
    }

    public async createManufacturers(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
      const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
      const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
      const database = "Heumann";
      const collection = "Items";
      const db = client.database(database);
      const container = db.container("Manufacturers");
      
      for (let i = 0; i < data.default.data.records.record.length; i++) {
        let entry = { 
          id: this.createId(),
          Manufacturer: data.default.data.records.record[i].Manufacturer,
        }
        await container.items.create(entry);
      }
    }

    public async createContactsVendors(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
        const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
        const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
        const database = "Heumann";
        const collection = "Items";
        const db = client.database(database);
        const container = db.container("Contacts_Vendors");
      console.log(data.default.data.records.record);
      for (let i = 0; i < data.default.data.records.record.length; i++) {
        let entry = { 
          id: this.createId(),
          Vendor: data.default.data.records.record[i].Vendor
        }
        await container.items.create(entry);
      }
    }

    public async createContactsKontakte(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
        const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
        const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
        const database = "Heumann";
        const collection = "Items";
        const db = client.database(database);
        const container = db.container("Contacts_Kontakte");
      console.log(data.default.data.records.record);
    debugger;
      for (let i = 0; i < data.default.data.records.record.length; i++) {
        let entry = { 
          id: this.createId(),
          Lieferant: data.default.data.records.record[i].Lieferant,
          Position_1: data.default.data.records.record[i].Position_1,
          Position_2: data.default.data.records.record[i].Position_2,
          QA_Kontakt_Mail: data.default.data.records.record[i].QA_Kontakt_Mail,
          SCM_Kontakt: data.default.data.records.record[i].SCM_Kontakt,
          weitere_QA_Kontakte: data.default.data.records.record[i].weitere_QA_Kontakte
        }
        await container.items.create(entry);
      }
    }


    public async createCmoMaster(data: any) {  
      const endpoint = "https://schruefer.documents.azure.com:443/";
        const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
        const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
        const database = "Heumann";
        const collection = "Items";
        const db = client.database(database);
        const container = db.container("Cmomasters");
      console.log(data.default.data.records.record);
      debugger;
      for (let i = 0; i < data.default.data.records.record.length; i++) {
        let entry = { 
          id: this.createId(),
          API_Manufacturer: data.default.data.records.record[i].API_Manufacturer,
          Category: data.default.data.records.record[i].Category,
          Manufacturer: data.default.data.records.record[i].Manufacturer,
          Release_site: data.default.data.records.record[i].Release_site
        }
        await container.items.create(entry);
      }
    }

      public async createDataSCM(data: any) {  
        const endpoint = "https://schruefer.documents.azure.com:443/";
        const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
        const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
        const database = "Heumann";
        const collection = "Items";
        const db = client.database(database);
        const container = db.container("Scmpriorities");
        debugger;
        for (let i = 1; i < data.default.data.records.record.length; i++) {
          let entry = { 
            id: this.createId(), 
            ABC_category: data.default.data.records.record[i].ABC_category,
            Heumann_material_code_1: data.default.data.records.record[i].Heumann_material_code_1,
            MA_no: data.default.data.records.record[i].MA_no,
            Material_Description: data.default.data.records.record[i].Material_Description,
            Molecule: data.default.data.records.record[i].Molecule,
            OTC: data.default.data.records.record[i].OTC,
            QA: data.default.data.records.record[i].QA,
            QP: data.default.data.records.record[i].QP,
            RA: data.default.data.records.record[i].RA,
            SCM: data.default.data.records.record[i].SCM,
            TPM_TPL: data.default.data.records.record[i].TPM_TPL,
            comment_release_prio_meeting: data.default.data.records.record[i].comment_release_prio_meeting,
            expected_release_date: data.default.data.records.record[i].expected_release_date,
            lab: data.default.data.records.record[i].lab,
            molecule_strength: data.default.data.records.record[i].molecule_strength,
            priority: data.default.data.records.record[i].priority,
            region: data.default.data.records.record[i].region,
            source: data.default.data.records.record[i].source,
            vendor: data.default.data.records.record[i].vendor,
          }
         await container.items.create(entry);
        }
      }

      public async createData() {
        const exampleObservable = new Observable((observer) => {
          let entry = this.getAbbreviations();
          observer.next(entry);
        });
        return exampleObservable;
      }

      public getEndpoint() : string {
        return "https://schruefer.documents.azure.com:443/";
      }

      public getKey(): string {
        return "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
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
    
      public exportAsExcelFile(data): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        // id	name	username	email
        const workbook: XLSX.WorkBook = {
          Sheets: { data: worksheet },
          SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, "data_");
      }
    
      private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE,
        });
        saveAs(
          data,
          fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    }
  
  