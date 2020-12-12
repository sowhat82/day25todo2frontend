import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.css']
})
export class AddNewListComponent implements OnInit {

  newListForm: FormGroup

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.newListForm = this.fb.group({
      newList: this.fb.control('', [Validators.required]),
    })

  }

  async addNewList(){
    const params = new HttpParams()
    .set('listName', this.newListForm.get('newList').value)

    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
//    .set('Access-Control-Allow-Origin', 'http://localhost:4200');

// const result = await this.http.post('/order', newList.toString(), {headers: httpHeaders}).toPromise()  
    await this.http.post('/addList', params, {headers: httpHeaders}).toPromise().then(
      function() {
        // success callback
//          window.alert('Order Added!')
      },
      function(response) {
        // failure callback,handle error here
        // response.data.message will be "This is an error!"

        console.log(response)
        window.alert(response.error.message)
      }
    )
    this.router.navigate(['/'])

  }

}
