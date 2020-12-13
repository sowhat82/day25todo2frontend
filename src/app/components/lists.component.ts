import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cloud } from '../cloud.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists:any
  displayImages = []

  constructor(private http: HttpClient, private router: Router, private cloud: Cloud, private sanitizer: DomSanitizer) {
   }

  ngOnInit() {
    this.getImages()
  }

  async getImages(){
  
    this.lists = await this.http.get<any>('/lists').toPromise()
  
    var count = 0;
    for (var i = 0; i < this.lists.length; i++) {
      const blob = await this.http.get<any>('/blob/'+this.lists[i]['listID'], {responseType: "blob" as "json"}).toPromise()
      if (blob.size != 0){
        let objectURL = URL.createObjectURL(blob);       
        this.displayImages[count] = this.sanitizer.bypassSecurityTrustUrl(objectURL);  
      }
      else{
        this.displayImages[count] = 'undefined'
      }
      count++
    }

    for (var i = 0; i < this.lists.length; i++){
      this.lists[i]['image'] = this.displayImages[i]
    }
  }

  routeToTasks(listID: string, listName: string){
    this.cloud.store(listID, listName)
    this.router.navigate(['/tasks'])
  }

  async deleteList(listID: string){
    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')

    await this.http.post<any>('/deleteList', "listID="+listID.toString(), {headers: httpHeaders}).toPromise()
    
//    this.lists = await this.http.get<any>('/lists').toPromise()   

    this.ngOnInit()

  }

}
