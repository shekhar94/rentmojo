import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NodeComponentComponent } from './node-component/node-component.component';
import { NodeDataFormComponent } from './node-data-form/node-data-form.component';
import { LoginComponent } from './login/login.component';
import { CommentComponent } from './comment/comment.component';

const appRoutes: Routes = [
  { path: 'comment', component: CommentComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/comment',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NodeComponentComponent,
    NodeDataFormComponent,
    LoginComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
