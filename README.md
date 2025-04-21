

# WhiteHelmetTask

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

---

## 🚀 Development Server

first clone the app 
```bash
https://github.com/ahmed-shereif/whiteHelmetTask.git
```

install dependencies
```bash
npm i
```

To start a local development server, run:

```bash
ng serve
```

login using this credentials
Demo credentials:
Username: karn.yong@melivecode.com
Password: melivecode

you will fin in this task 
Main Structure:
- Core Module (core/): Contains core services and utilities that are used across the application, such as authentication, API services, and guards.
- Features Module (features/): Contains feature-specific modules, such as users and attraction. Each feature module is self-contained and includes its own components, services, and routing.
- Layout Module (layout/): Includes layout-related components like the sidebar, header, and footer, which are shared across the application.
- Shared Module (shared/): Contains reusable components, directives, and utilities that can be used across multiple modules. For example, the table/ directory includes a dynamic table component that supports sorting, filtering, and pagination.
- Root Component (app.component.ts): The entry point of the application.
- Routing (app.routes.ts): Defines the application's routes and supports lazy loading for feature modules.
- 
Shared Module:
The shared/ directory is designed to house reusable components and utilities. For example:
- Dynamic Table Component (table/): A reusable table component that supports dynamic data binding, sorting, filtering, and pagination. This component can be used in multiple feature modules without duplication.
  
Main Features:
- Users Module (features/users/): Manages user-related functionality, such as displaying user data in a table, adding/editing users, and more.
- Attraction Module (features/attraction/): Handles attraction-related functionality, such as managing and displaying attraction data.
- This modular approach ensures that each feature is isolated, making the application easier to maintain and extend. Shared components and utilities reduce redundancy and promote code reuse.














