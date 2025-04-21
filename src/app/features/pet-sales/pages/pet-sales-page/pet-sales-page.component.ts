import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,

} from "ng-apexcharts";
import { PetSalesService } from '../../services/pet-sales.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { formatDate } from '@angular/common';
import { WeeklySalesResponse } from '../../models/WeeklySalesResponse';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PetSalesTrendComponent } from '../../components/pet-sales-trend/pet-sales-trend.component';
import { PetSalesTableComponent } from '../../components/pet-sales-table/pet-sales-table.component';



@Component({
  selector: 'app-pet-sales-page',
  imports: [

    NgApexchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    PetSalesTrendComponent,
    PetSalesTableComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './pet-sales-page.component.html',
  styleUrl: './pet-sales-page.component.scss'
})
export class PetSalesPageComponent {
  selectedDate = new FormControl(new Date());
  destroyRef = inject(DestroyRef);
  petSalesService = inject(PetSalesService)


  constructor() {

  }

  ngOnInit() {
    this.subscribeToDatePickerValueChange()
  }



  subscribeToDatePickerValueChange() {
    this.selectedDate.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((date) => {
        if (date) {
          const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
          console.log('Selected Date:', formattedDate);
          // Perform actions with the selected date, e.g., fetch data
          this.petSalesService.selectedDate$.next(formattedDate)
          // this.callGetWeeklySales(formattedDate);
        }
      });
  }


}
