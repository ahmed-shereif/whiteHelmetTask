# WhiteHelmetTask

## Project Overview
WhiteHelmetTask is an Angular 19 application designed as a management dashboard. The application features user management, attraction management, and pet sales analytics with a focus on clean architecture, code reusability, and modern Angular practices.

## Key Features
- **Authentication & Authorization**: Secure login system with route guards
- **User Management**: CRUD operations for user profiles with form validation
- **Attractions Management**: Location-based attraction management system
- **Pet Sales Analytics**: Sales tracking with visual charts and trend analysis
- **Responsive Layout**: Adaptive design with sidebar navigation and header controls
- **Dynamic Tables**: Reusable table component with sorting, filtering, and pagination
- **Toast Notifications**: User-friendly feedback system
- **Loading Indicators**: Request state visualization with spinner interceptor

## Technical Stack
- **Framework**: Angular 19.1.0
- **UI Components**: Angular Material 19.2.10
- **Styling**: SCSS with 
- **Charts**: ApexCharts via ng-apexcharts
- **State Management**: Angular Signals
- **HTTP Management**: Interceptors for authentication and loading states
- **Routing**: Lazy-loaded feature modules

## Project Structure
```
src/app/
├── core/                 # Core functionality
│   ├── auth/             # Authentication guards and interceptors
│   ├── http/             # HTTP interceptors and spinner
│   └── services/         # Core application services
├── features/             # Feature modules
│   ├── attraction/       # Attraction management
│   ├── login/            # Authentication
│   ├── pet-sales/        # Pet sales analytics
│   └── users/            # User management
├── layout/               # Application layout components
│   ├── header/           # Top navigation bar
│   ├── footer/           # Application footer
│   └── sidebar/          # Navigation sidebar
├── shared/               # Shared components and services
│   ├── form-control-error/ # Form validation error display
│   ├── not-found/        # 404 page
│   ├── services/         # Shared services including form builder
│   ├── table/            # Reusable dynamic table
│   └── toaster/          # Notification system
└── app.routes.ts         # Main routing configuration
```

## Architecture Patterns
- **Feature-based Modularity**: Each business domain is encapsulated in its own feature module
- **Lazy Loading**: All feature modules are lazy-loaded for performance optimization
- **Separation of Concerns**: Clear separation between components, services, and models
- **DRY Principle**: Shared services and components to minimize code duplication
- **Reactive Programming**: Extensive use of RxJS for asynchronous operations
- **Signal-based State**: Modern state management using Angular Signals

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- Angular CLI (v19+)

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd WhiteHelmetTask

# Install dependencies
npm install

# Start development server
ng serve
```

Visit `http://localhost:4200` in your browser. The default route redirects to the users management page.



