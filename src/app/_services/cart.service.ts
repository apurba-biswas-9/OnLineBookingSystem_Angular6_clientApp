import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Cart } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CartService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiGateway}/Book/Categories`);
    }
 
   
    getCount(id: number) {
        return this.http.get<any>(`${environment.apiGateway}/Cart/Count/${id}`);
    }

    getCarts(id: number) {
        return this.http.get<any>(`${environment.apiGateway}/Basket/BookInfo/${id}`);
    }


    postCart(cart: Cart) {
        return this.http.post(`${environment.apiGateway}/Cart`, cart);
    }

    // update(user: User) {
    //     return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    // }

    delete(id: number) {
        return this.http.delete(`${environment.apiGateway}/Cart/${id}`);
    }
}