import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';


import { environment } from '../environments/environment';
import { APP_ACTIONS } from './app.actions';
import { AppComponent } from './components/app/app.component';
import { APP_COMPONENTS } from './app.components';
import { APP_MOCK_INTERCEPTORS } from './app.mock.interceptors';
import { APP_ROUTES } from './app.routes';
import { APP_STORES } from './app.stores';

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(APP_STORES)
  ],
  providers: [
    ...APP_ACTIONS,
    ...(environment.useMocking ? APP_MOCK_INTERCEPTORS : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
