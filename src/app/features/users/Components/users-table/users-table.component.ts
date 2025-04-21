import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { DynamicTableComponent, filterParameters, TableConfig } from '@shared/table/dynamic-table.component';
import { UserService } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatedResponse } from '@shared/services/baseApi/models/pagination-response';
import { User } from '../../models/user';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ToasterTypes } from '@shared/toaster/enums/toasterTypes';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import {
  MatDialog,

} from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog);
  userData = signal<User[]>([]);
  totalCount = signal<number>(10);

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

    console.log('Editing user:', user);
    this.openDialog(user)
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      data: { user: user, dialogType: "edit", id: user.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }


  deleteUser(user: User) {
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
