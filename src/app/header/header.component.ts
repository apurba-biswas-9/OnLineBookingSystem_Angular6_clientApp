import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '@app/_models';
import { UserService, AuthenticationService, CartService } from '@app/_services';


@Component(
     { selector: 'app-header', templateUrl: 'header.component.html', styleUrls: ['./header.component.css'] },

    )
export class HeaderComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: any[] = [];
    totalCount: number = 0;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private cartService : CartService,
        private router: Router,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

        if (this.currentUser)
        this.myFunction();
    }

    ngOnInit() {
        

        this.cartService.getCount(this.currentUser.userId).pipe().subscribe(count  => {
            this.totalCount = count;
        });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    myFunction() {

        if(this.currentUser){
        setInterval(()=>{
            this.cartService.getCount(this.currentUser.userId).pipe().subscribe(count  => {

                console.log(' BookComponent book');
                console.log(count);
                this.totalCount = count;
            });
     },3000)
    }
    }


    
}