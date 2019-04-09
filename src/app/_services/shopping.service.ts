import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {  Book } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
    private currentBookSubject: BehaviorSubject<Book[]>;   
    public booksObserver: Observable<Book[]>;


    constructor(private http: HttpClient) {
        this.currentBookSubject = new BehaviorSubject<Book[]>(JSON.parse(localStorage.getItem('books')));
        this.booksObserver =this.currentBookSubject.asObservable();       
    }
    
    public get value(): Book[] {

        console.log('this.currentUserSubject.value')
        console.log(this.currentBookSubject.value)
        return this.currentBookSubject.value;
    }

    Save(books : any)
    {        
        localStorage.setItem('books', JSON.stringify(books));
        this.currentBookSubject.next(books);
        
    }

    clear() {
        // remove user from local storage to log user out
        localStorage.removeItem('books');
        this.currentBookSubject.next(null);
    }
}