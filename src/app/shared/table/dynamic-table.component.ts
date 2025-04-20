// dynamic-table.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface TableConfig {
  columns: ColumnConfig[];
  displayedColumns?: string[];
  pageSizeOptions: number[]; // Remove optional to fix type error
  defaultPageSize: number;   // Remove optional to fix type error
  enablePagination: boolean;
  enableSearch: boolean;
  enableSort: boolean;
  noDataMessage: string;
  actions?: ActionConfig[];
}

export interface ColumnConfig {
  name: string;         // Property name in data object
  header: string;       // Display name for column header
  sortable: boolean;    // Remove optional to fix type error
  cell?: (element: any) => string; // Custom cell renderer function
}

export interface ActionConfig {
  label: string;        // Button label
  icon?: string;        // Material icon name (optional)
  color?: string;       // Button color (primary, accent, warn)
  action: string;       // Action identifier
  showCondition?: (element: any) => boolean; // Optional condition to show/hide button
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
    MatTooltipModule
  ]
})
export class DynamicTableComponent implements OnInit, OnChanges {
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
  @Output() actionClick = new EventEmitter<{action: string, row: any}>();
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  dataSource = new MatTableDataSource<any>([]);
  displayColumns: string[] = [];
  
  ngOnInit() {
    this.initializeTable();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['config']) {
      this.initializeTable();
    }
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
    // Set up the sort and paginator after view init
    setTimeout(() => {
      if (this.sort && this.config.enableSort) {
        this.dataSource.sort = this.sort;
      }
      
      if (this.paginator && this.config.enablePagination) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('🧞‍♂️',  this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  onRowClick(row: any) {
    this.rowClick.emit(row);
  }
  
  onActionClick(action: string, row: any, event: Event) {
    event.stopPropagation(); // Prevent row click event from firing
    this.actionClick.emit({ action, row });
  }
  
  // Helper method to get cell value using custom renderer or property
  getCellValue(element: any, column: ColumnConfig): any {
    if (column.cell) {
      return column.cell(element);
    }
    
    // Handle nested properties (e.g., 'user.name')
    if (column.name.includes('.')) {
      const props = column.name.split('.');
      let value = element;
      
      for (const prop of props) {
        if (value == null) return '';
        value = value[prop];
      }
      
      return value;
    }
    
    return element[column.name];
  }
  
  // Helper method to check if action should be shown
  shouldShowAction(action: ActionConfig, element: any): boolean {
    return !action.showCondition || action.showCondition(element);
  }
  
  // Helper method to get sort header value (returns empty string instead of null)
  getSortHeaderId(column: ColumnConfig): string {
    return column.sortable ? column.name : '';
  }
}