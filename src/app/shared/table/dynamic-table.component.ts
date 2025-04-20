// dynamic-table.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface TableConfig {
  columns: ColumnConfig[];
  displayedColumns?: string[];
  pageSizeOptions: number[];
  defaultPageSize: number;
  enablePagination: boolean;
  enableSearch: boolean;
  enableSort: boolean;
  noDataMessage: string;
  actions?: ActionConfig[];
}

export interface ColumnConfig {
  name: string;         // Property name in data object
  header: string;       // Display name for column header
  sortable: boolean;
  type: "string" | 'img'
}

export interface ActionConfig {
  label: string;        // Button label
  icon?: string;        // Material icon name (optional)
  color?: string;       // Button color (primary, accent, warn)
  action: string;       // Action identifier
  showCondition?: (element: any) => boolean; // Optional condition to show/hide button
}

export interface filterParameters {
  search?: string,
  pageIndex: number,
  perPage: number,
  sortColumn?: string,
  sortOrder?: 'asc' | 'desc'
}
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule
  ]
})
export class DynamicTableComponent implements OnInit, OnChanges {
  searchForm: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  displayColumns: string[] = [];
  private searchText = signal<string>("")
  protected filterRequest = signal<filterParameters>({
    pageIndex: 1,
    perPage: 10,
    search: '',
  });
  @Input() totalItems = 0;
  @Input() data: any[] = [];
  @Input() config: TableConfig = {
    columns: [],
    displayedColumns: [],
    pageSizeOptions: [5, 10, 25, 50],
    defaultPageSize: 10,
    enablePagination: true,
    enableSearch: true,
    enableSort: true,
    noDataMessage: 'No data found',
    actions: []
  };

  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ action: string, row: any }>();
  @Output() serverRequest = new EventEmitter<filterParameters>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
  ngOnInit() {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initializeTable();
  }

  initializeTable() {
    // Set up displayed columns
    this.displayColumns = this.config.displayedColumns ||
      this.config.columns.map(column => column.name);

    // Add actions column if actions are defined
    if (this.config.actions && this.config.actions.length > 0 &&
      !this.displayColumns.includes('actions')) {
      this.displayColumns.push('actions');
    }
    // Initialize the data source
    this.dataSource = new MatTableDataSource(this.data);

  }


  // Modified to use the search subject
  applyFilter(): void {
    this.searchText.set(this.searchForm.get('search')?.value.trim().toLowerCase());
    this.dataSource.filter = this.searchText();


    this.loadServerData();

  }

  // Add handlers for server-side events
  protected onSortChange(sort: Sort) {
    this.loadServerData();
  }

  protected onPageChange(event: PageEvent) {
    this.loadServerData();
  }

  private loadServerData() {
    if (!this.paginator || !this.sort) return;

    // Update the signal instead of using a local variable
    this.filterRequest.update((request) => ({
      ...request,
      pageIndex: this.paginator.pageIndex + 1,
      perPage: this.paginator.pageSize,
      search: this.searchText(),
      sortColumn: this.sort.active || undefined,
      sortOrder: this.sort.direction as 'asc' | 'desc' || undefined,
    }));

    // Emit the updated filterRequest signal value
    this.serverRequest.emit(this.filterRequest());

  }

  protected onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  protected onActionClick(action: string, row: any, event: Event) {
    event.stopPropagation(); // Prevent row click event from firing
    this.actionClick.emit({ action, row });
  }


  // Helper method to check if action should be shown
  protected shouldShowAction(action: ActionConfig, element: any): boolean {
    return !action.showCondition || action.showCondition(element);
  }

  // Helper method to get sort header value (returns empty string instead of null)
  protected getSortHeaderId(column: ColumnConfig): string {
    return column.sortable ? column.name : '';
  }
}