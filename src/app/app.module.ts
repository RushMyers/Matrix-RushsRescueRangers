import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { APP_ROUTES } from './app.routes';
import { APP_COMPONENTS } from './app.components';

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( APP_ROUTES )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
