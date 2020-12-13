import { Injectable } from "@angular/core";

@Injectable()

export class Cloud {

    listID = ""
    listName = ""

    ngOnInit(): void {

    }

    //store cloud data
    store(listID: string, listName: string){
        this.listID = listID;
        this.listName = listName;
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