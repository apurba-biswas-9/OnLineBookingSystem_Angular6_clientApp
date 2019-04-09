import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    // currentUser: User;
    // currentUserSubscription: Subscription;
    books: any[] = [];

    constructor(
        // private authenticationService: AuthenticationService,
         private userService: UserService,
         private router: Router,
         
    ) {
        // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        //     this.currentUser = user;
        // });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        // this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe().subscribe(books => {

            console.log(books);
            this.books = books;
        });
    }


    private navigate(key : any)
    {
        console.log('key');
        console.log(key);    

        this.router.navigate(['/book', key]);
    }
}