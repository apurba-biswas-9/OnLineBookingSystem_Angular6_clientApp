﻿import { NgModule,  }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import {CardModule} from 'primeng/card';
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HeaderComponent } from  './header';
import { HomeComponent } from './home';
import { BookComponent } from './books.details';
import { CartComponent } from './cart'
import { ShoppingComponent} from  './shopping';
import { OrderComponent } from './order'


import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        CardModule,
        FormsModule,
        NgxSpinnerModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        BookComponent,
        CartComponent,
        ShoppingComponent,
        OrderComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }