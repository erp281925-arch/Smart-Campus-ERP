# FocusPath Monitor - Campus Wellness Dashboard

## Overview

FocusPath Monitor is a comprehensive campus student wellness monitoring system built as a modern web application. The platform provides different interfaces for students, staff, administrators, and counsellors to track and manage student well-being through the Burnout Risk Index (BRI) and various academic metrics. The system focuses on proactive mental health support and academic performance monitoring while maintaining strong privacy controls that give students complete control over their data sharing preferences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application is built using **React 18** with **TypeScript** for type safety and maintainability. The architecture follows a component-based design pattern with:

- **Vite** as the build tool and development server for fast hot-reloading
- **React Router** for client-side routing and navigation between different user dashboards
- **Tailwind CSS** for utility-first styling with a custom design system
- **shadcn/ui** component library providing accessible and customizable UI components
- **Recharts** for data visualization and dashboard analytics

### State Management
- **React Query (@tanstack/react-query)** for server state management, caching, and API data fetching
- Local React state (useState, useContext) for component-level state management
- No global state management library (Redux/Zustand) is currently implemented

### Design System
The application implements a professional dashboard design system with:
- Custom color palette supporting light/dark themes via CSS variables
- Responsive design patterns optimized for desktop and mobile devices
- Consistent spacing, typography, and component styling
- Status-specific color coding (success, warning, danger, info variants)

### User Role Architecture
The system supports four distinct user types with role-based interfaces:
- **Students**: Personal wellness dashboard, attendance tracking, assignment management
- **Staff**: Class analytics, student monitoring, performance reports
- **Admin**: System-wide analytics, user management, configuration settings
- **Counsellor**: Student referrals, wellness reports, counselling session management

### Privacy and Data Control
A key architectural decision is the implementation of granular privacy controls:
- Students have complete control over data sharing with academic advisors
- Privacy consent system allows students to opt-in/out of data sharing
- Staff and counsellors see privacy-protected views when students opt-out
- Data access is clearly indicated throughout the interface

### Navigation and Routing
- Single-page application (SPA) architecture with client-side routing
- Role-based navigation menus that adapt to user permissions
- Centralized navigation component shared across all user types
- Protected routes that redirect based on user authentication status

### Mock Data Strategy
The application currently uses comprehensive mock data for development and demonstration:
- Realistic student performance metrics and wellness indicators
- Sample class analytics and counselling referral data
- Proper data structures that mirror expected API responses
- Easy transition path to real backend integration

## External Dependencies

### Core Framework Dependencies
- **React 18.3.1** - Core frontend framework
- **TypeScript** - Type safety and development tooling
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### UI Component Libraries
- **@radix-ui/* components** - Accessible, unstyled UI primitives for complex components
- **shadcn/ui** - Pre-styled component library built on Radix UI
- **lucide-react** - Modern icon library with consistent design
- **class-variance-authority** - Utility for creating variant-based component APIs

### Data Visualization
- **recharts** - React charting library for dashboard analytics and metrics visualization
- **embla-carousel-react** - Carousel component for featured content

### Form Management
- **react-hook-form** - Performant form library with minimal re-renders
- **@hookform/resolvers** - Validation resolvers for form schemas

### State Management
- **@tanstack/react-query 5.83.0** - Server state management and caching
- **next-themes** - Theme switching and dark mode support

### Date and Time
- **date-fns** - Modern date utility library for formatting and manipulation

### Development Dependencies
- **ESLint** with TypeScript support for code linting
- **PostCSS** with Autoprefixer for CSS processing
- **@vitejs/plugin-react-swc** - Fast React refresh during development

### Deployment Configuration
- **Render.com** deployment configuration with proper host and port settings
- Environment-specific build configurations for development and production
- Static file serving configuration for SPA routing support