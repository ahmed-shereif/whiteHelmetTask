import { Component } from '@angular/core';
import { DynamicTableComponent, TableConfig } from '@shared/table/dynamic-table.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
  created: Date;
}
@Component({
  selector: 'app-users-table',
  imports: [
    DynamicTableComponent
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  userData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, created: new Date('2023-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: false, created: new Date('2023-02-20') },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: true, created: new Date('2023-03-10') },
    // Add more sample data as needed
  ];
  
  // Table configuration
  tableConfig: TableConfig = {
    columns: [
      { name: 'id', header: 'ID', sortable: true },
      { name: 'name', header: 'Name', sortable: true },
      { name: 'email', header: 'Email', sortable: true },
      { name: 'role', header: 'Role', sortable: true },
      { 
        name: 'status', 
        header: 'Status', 
        sortable: true,
        cell: (element) => element.status ? 'Active' : 'Inactive'
      },
      { 
        name: 'created', 
        header: 'Created Date', 
        sortable: true,
        cell: (element) => new Date(element.created).toLocaleDateString()
      }
    ],
    displayedColumns: ['id', 'name', 'email', 'role', 'status', 'created'],
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
      {
        label: 'Activate',
        icon: 'check_circle',
        color: 'accent',
        action: 'activate',
        // Only show activate button for inactive users
        showCondition: (element) => !element.status
      },
      {
        label: 'Deactivate',
        icon: 'block',
        color: 'warn',
        action: 'deactivate',
        // Only show deactivate button for active users
        showCondition: (element) => element.status
      }
    ]
  };
  
  handleRowClick(row: User) {
    console.log('Row clicked:', row);
    // Implement your row click logic here
  }
  
  handleActionClick(event: {action: string, row: User}) {
    console.log(`Action ${event.action} clicked for:`, event.row);
    
    switch(event.action) {
      case 'edit':
        // Handle edit action
        this.editUser(event.row);
        break;
      case 'delete':
        // Handle delete action
        this.deleteUser(event.row);
        break;
      case 'activate':
        // Handle activate action
        this.toggleUserStatus(event.row, true);
        break;
      case 'deactivate':
        // Handle deactivate action
        this.toggleUserStatus(event.row, false);
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
    // This would typically show a confirmation dialog and then delete the user
  }
  
  toggleUserStatus(user: User, active: boolean) {
    // Implement status toggle functionality
    console.log(`${active ? 'Activating' : 'Deactivating'} user:`, user);
    
    // Update user status in your data
    const userIndex = this.userData.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      this.userData[userIndex].status = active;
      
      // Create a new array reference to trigger change detection
      this.userData = [...this.userData];
    }
  }
}
