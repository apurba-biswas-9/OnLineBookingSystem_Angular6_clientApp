import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import {  Book } from '@app/_models';


@Injectable({ providedIn: 'root' })
export class BookService {
    constructor(private http: HttpClient) { }

  
    getById(id: number) {
        return this.http.get<Book[]>(`${environment.apiGateway}/Book/${id}`);
    }

    getBookCategories(id : number) {
        return this.http.get(`${environment.apiGateway}/Book/Categories/${id}`);
    }
}