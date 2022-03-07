import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  customers?: Customer[];
  currentCustomerBookings?: Booking[];
  currentIndex = -1;
  name = '';

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
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

  getCustomerBookings(id: string): void {
    this.bookingService.getByCustomer(id)
      .subscribe({
        next: (data: any) => {
          this.currentCustomerBookings = data["hydra:member"];
          console.log(data["hydra:member"]);
        },
        error: (e) => console.error(e)
      });
  }

}
