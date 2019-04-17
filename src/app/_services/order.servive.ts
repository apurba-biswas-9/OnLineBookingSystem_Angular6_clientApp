import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Order } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiGateway}/Order`);
    }  

    post(order: Order[]) {
        return this.http.post(`${environment.apiGateway}/Order`, order);
    }   

    UpdateOrderStatus( order: any) {
        return this.http.post(`${environment.apiGateway}/Order/UpdateOrderStatus`, order);
    }   

    delete(id: number) {
        return this.http.delete(`${environment.apiGateway}/Order/${id}`);
    }

    getOrders(id: number) {
        return this.http.get<any>(`${environment.apiGateway}/Order/OrderDetails/${id}`);
    }

}