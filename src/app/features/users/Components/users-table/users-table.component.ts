import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { DynamicTableComponent, filterParameters, TableConfig } from '@shared/table/dynamic-table.component';
import { UserService } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatedResponse } from '@shared/services/baseApi/models/pagination-response';
import { User } from '../../models/user';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';


@Component({
  selector: 'app-users-table',
  imports: [
    DynamicTableComponent
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {
  private toasterService = inject(ToasterService);
  userService: UserService = inject(UserService);
  destroyRef: DestroyRef = inject(DestroyRef);

  userData = signal<User[]>([]);
  totalCount = signal<number>(10);

  // Table configuration
  tableConfig: TableConfig = {
    columns: [
      { name: 'id', header: 'ID', sortable: true, type: "string" },
      { name: 'avatar', header: 'avatar', sortable: false, type: "img" },
      { name: 'fname', header: 'Firs Name', sortable: true, type: "string" },
      { name: 'lname', header: 'Last Name', sortable: true, type: "string" },
      { name: 'username', header: 'username', sortable: true, type: "string" },

    ],
    displayedColumns: ['avatar', 'fname', 'lname', 'username'],
    enablePagination: true,
    enableSearch: true,
    enableSort: true,
    pageSizeOptions: [5, 10, 25],
    defaultPageSize: 5,
    noDataMessage: 'No data available',
    // Define actions for each row
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
    this.loadData(
      {
        pageIndex: 1,
        perPage: this.tableConfig.defaultPageSize,
        sortColumn: 'id',
        sortOrder: 'asc'
      }

    )
  }
  loadData(request: filterParameters) {
    this.userService.getAll(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: PaginatedResponse<User>) => {
          this.userData.set(res.data)
          this.totalCount.set(res.total)
        },
        error: () => { }
      })
  }

  handleServerRequest(request: filterParameters) {
    this.loadData(request);
  }

  handleRowClick(row: User) {
    console.log('Row clicked:', row);
  }

  handleActionClick(event: { action: string, row: User }) {
    console.log(`Action ${event.action} clicked for:`, event.row);

    switch (event.action) {
      case 'edit':
        // Handle edit action
        this.editUser(event.row);
        break;
      case 'delete':
        this.deleteUser(event.row);
        break;

    }
  }

  editUser(user: User) {
    // Implement edit functionality
    console.log('Editing user:', user);

    // This would typically open a dialog or navigate to an edit page
  }

  deleteUser(user: User) {
    // Implement delete functionality
    console.log('Deleting user:', user);
    this.userService.delete(user.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: { message: string, status: "error" | 'ok' }) => {
          if (res.status == 'ok') {
            this.userData.update((users) => users.filter((u) => u.id !== user.id));
          }

          this.toasterService.openToaster(res.status == 'error' ? ToasterTypes.error : ToasterTypes.info, {
            data: {
              title: res.status,
              message: res.message,
            },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });


        },
        error: () => {
          console.error(`Failed to delete user with ID ${user.id}.`);
        }
      })
  }


}
