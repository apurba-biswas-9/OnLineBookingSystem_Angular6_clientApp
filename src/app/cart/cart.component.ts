import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Book, User, Cart } from '@app/_models';
import {  BookService, AuthenticationService, CartService,AlertService, ShoppingService } from '@app/_services';

import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';



@Component(
    { 
        
        templateUrl: 'cart.component.html',
        styleUrls: ['./cart.component.css']
    
    }
    
    )
export class CartComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    books: Book[] = [];
    private sub: any;
    loading = false;
    isEmptyCart : boolean = false;
   


    constructor(
         private authenticationService: AuthenticationService,
        //  private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private bookService : BookService,
        private cartService : CartService,
        private alertService : AlertService,
       private shoppingService: ShoppingService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
             console.log('+params')  
             console.log(+params['id'])             
           // this.id = +params['id']; // (+) converts string 'id' to a number
           this.loadCartDetails(+params['id']);
            // In a real app: dispatch action to load the details here.
         });


    
       // this.loadAllUsers(0);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        // unsubscribe to ensure no memory leaks
         this.currentUserSubscription.unsubscribe();
    }

  

     loadCartDetails(id: number) {
        this.cartService.getCarts(id).pipe().subscribe(book  =>  {
            this.books = book;
            if (this.books.length > 0) {
             //   this.alertService.clearAlert();
               this.isEmptyCart = true;
            }
            else {
               this.isEmptyCart = false;   
               // this.alertService.error("No record found");
            }     
           
        }
        ,
        error => {

            console.log('error');
            console.log(error);
            this.alertService.error(error);
            this.books =[];
            //this.loading = false;
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

    deleteCart(id: number)
    {
        console.log("deleteCart");
          this.cartService.delete(id).subscribe(data => 
            {
              console.log("success");
                if (this.books.length==1)
                {
                    this.books = [];
                    this.isEmptyCart = false;
                   // this.alertService.error("No records found")
                }
                else
                {
                    this.loadCartDetails(this.currentUser.userId) 
                  //  this.alertService.clearAlert();
                    //this.isEmptyCart = true;
                }              
             
            });
    }
}
