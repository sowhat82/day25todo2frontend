import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cloud } from '../cloud.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  editListForm: FormGroup

  constructor(private fb: FormBuilder, private cloud: Cloud, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.editListForm = this.fb.group({
      newList: this.fb.control('', [Validators.required]),
    })
  }

  async editListName(){
    // add to SQL
    const params = new HttpParams()
    .set('listName', this.editListForm.get('newList').value)
    .set('listID', this.cloud.listID)

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')

    const result = await this.http.post('/editListName', params, {headers: httpHeaders}).toPromise().then(
      function() {
        // success callback
      },
      function(response) {
        // failure callback,handle error here
        console.log(response)
        window.alert(response.error.message)
      }
    )
    this.cloud.listName = this.editListForm.get('newList').value
    this.router.navigate(['/tasks'])
}


}
