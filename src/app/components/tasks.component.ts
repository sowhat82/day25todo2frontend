import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cloud } from '../cloud.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  listID =""
  listName = ""
  tasks = []
  constructor(private cloud: Cloud, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {

    this.listID = this.cloud.listID
    this.listName = this.cloud.listName

    this.tasks = await this.http.get<any>('/tasks/'+this.listID).toPromise() 
  }

  editListName(){
    
  }

}
