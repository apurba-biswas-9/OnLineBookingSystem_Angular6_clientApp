import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { BookComponent } from './books.details';
import { CartComponent } from './cart';
import { ShoppingComponent } from './shopping';
import{OrderComponent} from './order'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'book/:id', component: BookComponent , canActivate: [AuthGuard] },
    { path: 'cart/:id', component: CartComponent,  canActivate: [AuthGuard]  },
    { path: 'shopping', component: ShoppingComponent ,  canActivate: [AuthGuard]   },
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);