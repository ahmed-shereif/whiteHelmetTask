import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PetSalesService } from '../../services/pet-sales.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { formatDate } from '@angular/common';
import { WeeklySalesResponse } from '../../models/WeeklySalesResponse';
import { DynamicTableComponent, TableConfig } from '@shared/table/dynamic-table.component';
import { DailySale } from '../../models/DailySale';

@Component({
  selector: 'app-pet-sales-table',
  imports: [
    DynamicTableComponent
  ],
  templateUrl: './pet-sales-table.component.html',
  styleUrl: './pet-sales-table.component.scss'
})
export class PetSalesTableComponent {
  petSalesService = inject(PetSalesService)
  destroyRef = inject(DestroyRef);
  petData = signal<any[]>([]);
  totalCount = signal<number>(10);

  tableConfig: TableConfig = {
    columns: [
      { name: 'date', header: 'Date', sortable: true, type: 'string' },
      { name: 'animal', header: 'Animal', sortable: true, type: 'string' },
      { name: 'price', header: 'Price', sortable: true, type: 'string' },
    ],
    displayedColumns: ['date', 'animal', 'price'],
    enablePagination: false,
    enableSearch: false,
    enableSort: true,
    pageSizeOptions: [5, 10, 25],
    defaultPageSize: 5,
    noDataMessage: 'No data available',
  };
  ngOnInit() {
    // on start call the end point 7days from now to get last week data
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const formattedSevenDaysAgo = formatDate(sevenDaysAgo, 'yyyy-MM-dd', 'en-US');
    this.callGetDailySales(formattedSevenDaysAgo)
    this.handleNewDateSelection()

  }

  handleNewDateSelection() {

    this.petSalesService.selectedDate$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: string) => {
          if(response){
            this.callGetDailySales(response)
          }
        },
      }
      )
  }

  
  callGetDailySales(date: string) {
    this.petSalesService
      .getDailySales(date)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: DailySale[]) =>{
          this.petData.set(response)
        }  ,
        error: (error) => console.error('Failed to fetch Daily sales data', error),
      });
  }

}
