import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cloud } from '../cloud.service';

@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.css']
})
export class AddNewListComponent implements OnInit {

  newListForm: FormGroup
  file = ""

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private cloud: Cloud) { }

  ngOnInit(): void {
    this.newListForm = this.fb.group({
      newList: this.fb.control('', [Validators.required]),
      imageFile: ['']
    })

  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.newListForm.get('imageFile').setValue(this.file);
    }
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

    // add image as blob to SQL    
    if(this.file != ""){
      const formData = new FormData();

      formData.set('image-file', this.file);
  
      await this.http.post<any>('/uploadImage', formData).toPromise()  
    }

    this.router.navigate(['/'])

  }

}
