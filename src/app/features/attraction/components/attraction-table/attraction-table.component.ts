import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { DynamicTableComponent, filterParameters, TableConfig } from '@shared/table/dynamic-table.component';
import { AttractionService } from '../../services/attraction.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatedResponse } from '@shared/services/baseApi/models/pagination-response';
import { Attraction } from '../../models/attractions';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';
import { AddEditAttractionComponent } from '../add-edit-attraction/add-edit-attraction.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attraction-table',
  imports: [
    DynamicTableComponent
  ],
  templateUrl: './attraction-table.component.html',
  styleUrl: './attraction-table.component.scss'
})
export class AttractionTableComponent implements OnInit {
  private toasterService = inject(ToasterService);
  attractionService: AttractionService = inject(AttractionService);
  destroyRef: DestroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);
  attractionData = signal<Attraction[]>([]);
  totalCount = signal<number>(10);

  // Table configuration
  tableConfig: TableConfig = {
    columns: [
      { name: 'coverimage', header: 'Cover Image', sortable: false, type: "img" },
      { name: 'id', header: 'ID', sortable: true, type: "string" },
      { name: 'name', header: 'Name', sortable: false, type: "string" },
      { name: 'detail', header: 'Details', sortable: true, type: "string" },
      { name: 'longitude', header: 'Longitude', sortable: true, type: "string" },
      { name: 'latitude', header: 'Latitude', sortable: true, type: "string" },
    ],
    displayedColumns: ['coverimage', 'name', 'detail', 'longitude','latitude'],
    enablePagination: true,
    enableSearch: true,
    enableSort: true,
    pageSizeOptions: [5, 10, 25],
    defaultPageSize: 5,
    noDataMessage: 'No data available',
    actions: [
      {
        label: 'Edit',
        icon: 'edit',
        color: 'primary',
        action: 'edit'
      },
      {
        label: 'Delete',
        icon: 'delete',
        color: 'warn',
        action: 'delete'
      },
    ]
  };

  ngOnInit(): void {
    this.loadData({
      pageIndex: 1,
      perPage: this.tableConfig.defaultPageSize,
      sortColumn: 'id',
      sortOrder: 'asc'
    });
  }

  loadData(request: filterParameters) {
    this.attractionService.getAll(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: PaginatedResponse<Attraction>) => {
          this.attractionData.set(res.data);
          this.totalCount.set(res.total);
        },
        error: () => { }
      });
  }

  handleServerRequest(request: filterParameters) {
    this.loadData(request);
  }

  handleRowClick(row: Attraction) {
    console.log('Row clicked:', row);
  }

  handleActionClick(event: { action: string, row: Attraction }) {
    console.log(`Action ${event.action} clicked for:`, event.row);

    switch (event.action) {
      case 'edit':
        this.editAttraction(event.row);
        break;
      case 'delete':
        this.deleteAttraction(event.row);
        break;
    }
  }

  editAttraction(attraction: Attraction) {
    console.log('Editing attraction:', attraction);
    this.openDialog(attraction);
  }

  openDialog(attraction: Attraction): void {
    const dialogRef = this.dialog.open(AddEditAttractionComponent, {
      data: { attraction: attraction, dialogType: "edit", id: attraction.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        // Handle dialog result if needed
      }
    });
  }

  deleteAttraction(attraction: Attraction) {
    console.log('Deleting attraction:', attraction);
    this.attractionService.delete(attraction.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: { message: string, status: "error" | 'ok' }) => {
          if (res.status === 'ok') {
            this.attractionData.update((attractions) => attractions.filter((a) => a.id !== attraction.id));
          }

          this.toasterService.openToaster(res.status === 'error' ? ToasterTypes.error : ToasterTypes.info, {
            data: {
              title: res.status,
              message: res.message,
            },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        error: () => {
          console.error(`Failed to delete attraction with ID ${attraction.id}.`);
        }
      });
  }
}