import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Book, User, Cart, Order, BooksCart } from '@app/_models';
import {  BookService, AuthenticationService, CartService,AlertService, ShoppingService, OrderService } from '@app/_services';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
@Component(
    { 
        
        templateUrl: 'shopping.component.html',
        styleUrls: ['./shopping.component.css']
    
    }
    
    )
export class ShoppingComponent implements OnInit, OnDestroy {   
    currentUserSubscription: Subscription;
    currentUser: User;
    booksubscription: Subscription;
    books: BooksCart[] = [];
    private sub: any;
    loading = false;
    isEmptyCart : boolean = false;  
    isOrderPlaced : boolean = true; 


    constructor(
         private authenticationService: AuthenticationService,      
        private  orderService : OrderService,    
        private cartService : CartService,
        private alertService : AlertService,
        private shoppingService : ShoppingService
    ) {

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

        this.booksubscription = this.shoppingService.booksObserver.subscribe(data => {
            this.books =  JSON.parse(data.toString());            
            console.log(data);                    
        });
    }

    ngOnInit() {

        if (this.books.length > 0) 
        {
            this.isOrderPlaced = true;
        }
        else 
        {
            this.isOrderPlaced = false;
        }
    }

    ngOnDestroy() {
        //this.sub.unsubscribe();
        // unsubscribe to ensure no memory leaks
         //this.booksubscription.unsubscribe();
    }

  

     loadCartDetails(id: number) {
        this.cartService.getCarts(id).pipe().subscribe(book  =>  {        
            this.books = book;
            if (this.books.length > 0)
            this.isEmptyCart = true;
            else 
            this.isEmptyCart = false;
        });
    }

    addToCart(bookid : number)
    {
        console.log('addToCart')
        this.loading = false;   
        let cart = new Cart();
        cart.BookId = bookid;
        cart.CustomerId = this.currentUser.userId;
        this.cartService.postCart(cart)
        .pipe(first())
        .subscribe(
            data => {

                this.alertService.success("book has been added in cart", false);
                this.loading = false;
                
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

    }


    orderPlace()
    {
        this.alertService.clearAlert();
        console.log('continueShopping');
        if (this.books.length)
        {
            var list =   this.books.filter(p=> p.isSelected==true);
            if (list.length <= 0)
            {
                this.alertService.error("Please select items");
            }
            else
            {               
               let orders =  list.map(p =>  {                    
                    let obj = new Order ();
                    obj.BookId = p.id;
                   obj.CustomerId = this.currentUser.userId;
                    obj.OrderStatus = 1;
                    obj.Quantity = p.units;
                    obj.CartId = p.cartId;
                    return obj;
                });

                this.orderService.post(orders).subscribe
                ( p=>
                    {
                       this.alertService.success("your Order has been placed", false);
                       this.books = [];
                      this.isOrderPlaced = false;
                    this.shoppingService.clear();
                
                    },
                     error => {
                         this.isOrderPlaced = true;
                        this.alertService.error(error);                           
                    });
            }
        }
      
    }
}