import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, Observable  } from 'rxjs';
import { switchMap,first, map } from 'rxjs/operators';

import { Book, User, Cart } from '@app/_models';
import {  BookService, AuthenticationService, CartService,AlertService, ShoppingService } from '@app/_services';
import { NgxSpinnerService } from 'ngx-spinner';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component(
    { 
        
        templateUrl: 'books.details.component.html',
        styleUrls: ['./books.details.component.css']
    
    }
    
    )
export class BookComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    books: Book[] = [];
    bookCategoryName : any;
    private sub: any;
    loading : boolean = false;
    bookid : number;
   


    constructor(
         private authenticationService: AuthenticationService,
        //  private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private bookService : BookService,
        private cartService : CartService,
        private alertService : AlertService,
        private shoppingService :  ShoppingService,
        private spinner: NgxSpinnerService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {

         
      //  this.spinner.show();
        this.sub = this.route.params.subscribe(params => {

            this.requestDataFromMultipleSources(+params['id']).subscribe(res => {
                this.bookCategoryName = res[0];
                this.books = res[1];
                this.spinner.hide();
                this.loading = true; 
            });
            // // let res1 =  this.GetBookCategories(+params['id']);
            // // let res2 =  this.loadAllUsersk(+params['id']);  
                     
         },
            error => {
                this.spinner.hide();
                this.loading = false;
            });
       // this.loadAllUsers(0);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();       
    }


     loadAllUsersk(id: number) {
        this.bookService.getById(id).pipe().subscribe(book  => {

            console.log(' BookComponent book');
            console.log(book);
            this.books = book;
        });     
    }

    GetBookCategories(id: number) 
    {
        this.bookService.getBookCategories(id).subscribe( res =>
{
           
            console.log('GetBookCategories');
            console.log(res)
            this.bookCategoryName = res;
            
        }); 
    }

    addToCart(bookid : number)
    {
        console.log('addToCart')
        let cart = new Cart();
        cart.BookId = bookid;
        cart.CustomerId = this.currentUser.userId;
        this.cartService.postCart(cart)
        .pipe(first())
        .subscribe(
            data =>
             {
                this.alertService.success("book has been added in cart", false);
            },
            error => {
                this.alertService.error(error);           
            });
    }

    continueShopping()
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
                  this.shoppingService.Save(JSON.stringify(list));
                  this.router.navigate(['/shopping']);
            }
        }
      
    }

    requestDataFromMultipleSources(id: number): Observable<any[]>
    {
        let res1 = this.bookService.getBookCategories(id);
        let res2 = this.bookService.getById(id); 
        return forkJoin([res1,res2]); 
    }

    
}