import * as Cosmos from "@azure/cosmos";

export class AbbreviationsService {
    public async getAbbreviations() {
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
    }
  
  