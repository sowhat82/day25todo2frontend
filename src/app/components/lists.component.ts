import { HttpClient } from '@angular/common/http';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cloud } from '../cloud.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists=[]

  constructor(private http: HttpClient, private router: Router, private cloud: Cloud) { }

  async ngOnInit(): Promise<void> {

    this.lists = await this.http.get<any>('/lists').toPromise()   


  }

  routeToTasks(listID: string, listName: string){
    this.cloud.store(listID, listName)
    this.router.navigate(['/tasks'])
  }

}
