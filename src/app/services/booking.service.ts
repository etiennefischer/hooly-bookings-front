import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { Customer } from '../models/customer.model';
import { Spot } from '../models/spot.model';
const baseUrl = 'http://127.0.0.1:8000/api/bookings';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(baseUrl);
  }
  get(id: any): Observable<Booking> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://127.0.0.1:8000/api/customers');
  }
  getAllSpots(): Observable<Spot[]> {
    return this.http.get<Spot[]>('http://127.0.0.1:8000/api/spots');
  }
  getByCustomer(customer: any): Observable<Booking[]> {
    return this.http.get<Booking[]>(`http://127.0.0.1:8000/api/customers/${customer}/bookings`);
  }
}
