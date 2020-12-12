import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListsComponent } from './components/lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Cloud } from './cloud.service';
import { TasksComponent } from './components/tasks.component';
import { AddNewTaskComponent } from './components/add-new-task.component';
import { AddNewListComponent } from './components/add-new-list.component';

const appRoutes: Routes = [
  { path: '', component: ListsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'addNewTask', component: AddNewTaskComponent },
  { path: 'newList', component: AddNewListComponent },
  // { path: 'editListName', component: EditListNameComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    TasksComponent,
    AddNewTaskComponent,
    AddNewListComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule, HttpClientModule 
  ],
  providers: [Cloud],
  bootstrap: [AppComponent]
})
export class AppModule { }
