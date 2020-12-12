import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cloud } from '../cloud.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent implements OnInit {

  listID = ""
  newTaskForm : FormGroup
  
  constructor(private cloud: Cloud, private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listID = this.cloud.listID

    this.newTaskForm = this.fb.group({
      newTask: this.fb.control('', [Validators.required]),
    })
  }

  async addNewTask(){

    const params = new HttpParams()
    .set('taskName', this.newTaskForm.get('newTask').value)
    .set('listID', this.listID)

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
//    .set('Access-Control-Allow-Origin', 'http://localhost:4200');

// const result = await this.http.post('/order', newTask.toString(), {headers: httpHeaders}).toPromise()  
    await this.http.post('/addTask', params.toString(), {headers: httpHeaders}).toPromise().then(
      function() {
        // success callback
//          window.alert('Order Added!')
      },
      function(response) {
        // failure callback,handle error here
        // response.data.message will be "This is an error!"

        console.log(response)
        window.alert(response.error.message)
      })
    this.router.navigate(['/tasks'])
  }

}


