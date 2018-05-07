import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';


import { APP_ACTIONS } from './app.actions';
import { AppComponent } from './components/app/app.component';
import { APP_COMPONENTS } from './app.components';
import { APP_MOCK_INTERCEPTORS } from './app.mock.interceptors';
import { APP_ROUTES } from './app.routes';
import { APP_STORES } from './app.stores';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(APP_STORES),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    ...APP_ACTIONS,
    ...(environment.useMocking ? APP_MOCK_INTERCEPTORS : []),
    // ...APP_MOCK_INTERCEPTORS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
