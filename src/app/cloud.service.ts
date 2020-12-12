import { Injectable } from "@angular/core";

@Injectable()

export class Cloud {

    listID = ""
    listName = ""

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.info(this.listID)
    }

    //store cloud data
    store(listID: string, listName: string){
        this.listID = listID;
        this.listName = listName;
        console.info('init main page', this.listName)
    }

    getData(){
        return {
            listID: this.listID,
            listName: this.listName,
        }
        // return {
        //     listID: this.listID,
        //     listName: this.listName
        // }
    }

}