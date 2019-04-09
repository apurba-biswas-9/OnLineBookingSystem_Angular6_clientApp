import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, OrderDetails, UpdateOrderStatus } from '@app/_models';
import { OrderService, AuthenticationService, AlertService} from '@app/_services';





@Component(
    {
        templateUrl: 'order.component.html',
        styleUrls: ['./order.component.css']
    }

)
export class OrderComponent implements OnInit, OnDestroy {
    private sub: any;
    currentUser: User;
    currentUserSubscription: Subscription;
    orderDetails: OrderDetails[];

    constructor(

        private authenticationService: AuthenticationService,
        private orderService: OrderService,
        private alertService: AlertService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {  
     this.loadOrders();
    }

    ngOnDestroy() {

        this.sub.unsubscribe();
    }

    loadOrders() {

      this.sub =   this.orderService.getOrders(this.currentUser.userId).pipe().subscribe(orders => {
            this.orderDetails = orders;
        });
    }   
   
    orderCancel() 
    {
        console.log('cancel order');
        this.alertService.clearAlert();      
        if (this.orderDetails.length > 0) 
        {
            var list = this.orderDetails.filter(p => p.isCancled == true);
            if (list.length <= 0) {
                this.alertService.error("Please select items");
            }
            else
             {
                let ids =  list.map(p=> { return p.id  });               

                let data = new UpdateOrderStatus();
                data.orderIds = ids;
                data.orderStatus =1;
                this.orderService.UpdateOrderStatus(data)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.alertService.success("Selected order has been cancled", false);
                            this.loadOrders();
                        },
                        error => {
                            this.alertService.error(error);

                        });
            } 
        }      
    }
}

