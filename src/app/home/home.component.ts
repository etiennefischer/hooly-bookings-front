import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Spot } from '../models/spot.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customers?: Customer[];
  spots?: Spot[];
  booking: Booking = {
    bookedAt: '',
    customer: '',
    spot: ''
  };
  submitted = false;
  errorMsg = '';

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.retrieveSpots();
    this.retrieveCustomers();
  }

  retrieveCustomers(): void {
    this.bookingService.getAllCustomers()
      .subscribe({
        next: (data: any) => {
          this.customers = data["hydra:member"];
          console.log(data["hydra:member"]);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveSpots(): void {
    this.bookingService.getAllSpots()
      .subscribe({
        next: (data: any) => {
          this.spots = data["hydra:member"];
          console.log(data["hydra:member"]);
        },
        error: (e) => console.error(e)
      });
  }
  
  saveBooking(): void {
    const data = {
      bookedAt: this.booking.bookedAt,
      customer: `/api/customers/${this.booking.customer}`,
      spot: `/api/spots/${this.booking.spot}`
    };
    this.bookingService.create(data)
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Spot unavailable`;
          } else {
              this.errorMsg = `Spot unavailable`;
          }
          return of([]);
      })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  newBooking(): void {
    this.submitted = false;
    this.booking = {
      bookedAt: '',
      customer: '',
      spot: ''
    };
  }

}
