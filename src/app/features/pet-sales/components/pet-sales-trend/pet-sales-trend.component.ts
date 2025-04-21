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


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-pet-sales-trend',
  imports: [

    NgApexchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './pet-sales-trend.component.html',
  styleUrl: './pet-sales-trend.component.scss'
})
export class PetSalesTrendComponent {
  @ViewChild("chart") chart!: ChartComponent;
  petSalesService = inject(PetSalesService)
  destroyRef = inject(DestroyRef);
  chartOptions: ChartOptions = {
    series: [{ name: 'Sales', data: [10, 20, 30] }],
    chart: { type: 'line', height: 350 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar'] },
    dataLabels: { enabled: false },
    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } },
    stroke: { curve: 'smooth' },
    title: { text: 'Pet Sales' }
  };


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "cats",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        },
        {
          name: "dogs",
          data: [7, 31, 25, 41, 59, 42, 39, 31, 18]
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Weekly Pet Sales Trend",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [

        ]
      }
    };
  }

  ngOnInit() {
    // on start call the end point 7days from now to get last week data
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const formattedSevenDaysAgo = formatDate(sevenDaysAgo, 'yyyy-MM-dd', 'en-US');
    this.callGetWeeklySales(formattedSevenDaysAgo)
    this.handleNewDateSelection()

  }

  handleNewDateSelection() {

    this.petSalesService.selectedDate$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: string) => {
          if(response){
            this.callGetWeeklySales(response)
          }
        },
      }
      )
  }

  callGetWeeklySales(date: string) {
    this.petSalesService
      .getWeeklySales(date)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: WeeklySalesResponse) => this.updateChart(response),
        error: (error) => console.error('Failed to fetch weekly sales:', error),
      });
  }



  updateChart(data: { categories: string[]; series: { name: string; data: number[] }[] }): void {
    this.chartOptions.series = data.series;
    this.chartOptions.xaxis = { categories: data.categories };
  }

}
