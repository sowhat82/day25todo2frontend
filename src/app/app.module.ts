import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListsComponent } from './components/lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { cloud } from './cloud.service';

const appRoutes: Routes = [
  { path: '', component: ListsComponent },
  // { path: 'listItems', component: ListItemsComponent },
  // { path: 'newList', component: NewListComponent },
  // { path: 'newTask', component: NewTaskComponent },
  // { path: 'editListName', component: EditListNameComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule, HttpClientModule 
  ],
  providers: [cloud],
  bootstrap: [AppComponent]
})
export class AppModule { }
