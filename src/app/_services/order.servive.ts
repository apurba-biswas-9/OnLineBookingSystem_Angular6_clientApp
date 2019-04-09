import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Order } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.orderApi}/api/Order`);
    }  

    post(order: Order[]) {
        return this.http.post(`${environment.orderApi}/api/Order`, order);
    }   

    UpdateOrderStatus( order: any) {
        return this.http.post(`${environment.orderApi}/api/Order/UpdateOrderStatus`, order);
    }   

    delete(id: number) {
        return this.http.delete(`${environment.cartApi}/api/Order/${id}`);
    }

    getOrders(customerId: number) {
        return this.http.get<any>(`${environment.orderGatewayApi}/api/Order/OrderDetails/${customerId}`);
    }

}