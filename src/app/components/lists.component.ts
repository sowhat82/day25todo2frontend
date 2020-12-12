import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloud } from '../cloud.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists=[]

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.lists = await this.http.get<any>('/lists').toPromise()   

  }

  routeToTasks(){
    
  }

}
