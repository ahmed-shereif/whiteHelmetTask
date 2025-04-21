import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeeklySalesResponse } from '../models/WeeklySalesResponse';
import { DailySale } from '../models/DailySale';


@Injectable({
  providedIn: 'root'
})
export class PetSalesService {
  private apiUrl = 'https://www.melivecode.com/api/pets';  

  public selectedDate$ = new BehaviorSubject<string >("");

  constructor(private http: HttpClient) { }



  getWeeklySales(date: string): Observable<WeeklySalesResponse> {
    return this.http.get<WeeklySalesResponse>(`${this.apiUrl}/7days/${date}`);
  }

  getDailySales(date: string): Observable<DailySale[]> {
    return this.http.get<DailySale[]>(`${this.apiUrl}/${date}`);
  }
}