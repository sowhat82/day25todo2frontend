import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private cloud: Cloud, private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.listID = this.cloud.listID
    this.listName = this.cloud.listName

    this.tasks = await this.http.get<any>('/tasks/'+this.listID).toPromise() 
  }

  async deleteTask(taskID: string){
    const httpHeaders = new HttpHeaders()

    const params = new HttpParams()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('taskID', taskID)
    .set('listID', this.listID)

    // await this.http.post<any>('/deleteTask', "taskID="+taskID.toString(), {headers: httpHeaders}).toPromise()
    await this.http.post<any>('/deleteTask', params, {headers: httpHeaders}).toPromise()
    
    this.tasks = await this.http.get<any>('/tasks/'+this.listID).toPromise() 

  }

  editListName(){
    this.router.navigate(['/editListName'], {
      state: {
        listID: this.listID,
        listName: this.listName,
      }
    }) 
  }

}
