import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Cart } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CartService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiBooks}/api/Book/Categories`);
    }
 
   
    getCount(customerId: number) {
        return this.http.get<any>(`${environment.cartApi}/api/Cart/Count/${customerId}`);
    }

    getCarts(customerId: number) {
        return this.http.get<any>(`${environment.BooksInfo}/api/Basket/BookInfo/${customerId}`);
    }


    postCart(cart: Cart) {
        return this.http.post(`${environment.cartApi}/api/Cart`, cart);
    }

    // update(user: User) {
    //     return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    // }

    delete(id: number) {
        return this.http.delete(`${environment.cartApi}/api/Cart/${id}`);
    }
}