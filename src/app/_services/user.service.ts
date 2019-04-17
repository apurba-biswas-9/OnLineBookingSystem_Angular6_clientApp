import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiGateway}/Book/Categories`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiGateway}/users/${id}`);
    }

 
    // update(user: User) {
    //     return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    // }

    delete(id: number) {
        return this.http.delete(`${environment.apiGateway}/users/${id}`);
    }
}