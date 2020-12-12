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

  lists=[]
  displayImages = []
  blob: any

  constructor(private http: HttpClient, private router: Router, private cloud: Cloud, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {

    // iterate all the lists from SQL
    this.lists = await this.http.get<any>('/lists').toPromise()   

    console.info(this.lists.length)
    var count = 0;
    for (let i of this.lists) {
      this.blob = await this.http.get<any>('/blob/'+i.listID, {responseType: "blob" as "json"}).toPromise()
      let objectURL = URL.createObjectURL(this.blob);       
      this.displayImages[count] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      count++
    }

    console.info(this.displayImages)

    add display images into the list array to be displayed

    // this.blobs = await this.http.get<any>('/blobs', {responseType: "blob" as "json"}).toPromise()
    // console.info(this.blobs)
    // let objectURL = URL.createObjectURL(this.blobs);       
    // this.displayImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);

  }

  routeToTasks(listID: string, listName: string){
    this.cloud.store(listID, listName)
    this.router.navigate(['/tasks'])
  }

  async deleteList(listID: string){
    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')

    await this.http.post<any>('/deleteList', "listID="+listID.toString(), {headers: httpHeaders}).toPromise()
    
    this.lists = await this.http.get<any>('/lists').toPromise()   


  }

}
