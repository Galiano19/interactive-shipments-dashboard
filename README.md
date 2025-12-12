# Interactive Shipments Dashboard

A React + TypeScript dashboard for managing and tracking shipments with updates and data interaction. (Currently mock data)

**Live Demo**: [Click here](https://interactive-shipments-dashboard.vercel.app/)

## Features

- **Interactive Table**: Sortable table by status and arrival date, status filtering
- **Data Update**: Edit shipment details and displays mutated data in the table
- **Responsive Design**: Mobile-first approach
- **Status Management**: Visual loading and error indicators

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: TanStack Query
- **Styling**: CSS
- **Deployment**: Vercel

## API Management

The application uses **TanStack Query** for efficient data management:

- Fetches shipment data from a mock JSON file
- Implements mutations for updating shipment information
- Updates are immediately visible in the table through TanStack Query's automatic cache invalidation and refetching after successful mutations

## Repository

Full source code and development history: [This one](https://github.com/Galiano19/interactive-shipments-dashboard)

## Current Limitations & Known Issues

- **Component Architecture**: Common UI components (buttons, inputs) need extraction into reusable components
- **Testing**: Mutation tests are incomplete due to challenges with `Math.random()` and timeout handling
- **Dialog Component**: Custom implementation used instead of a proper UI library with full accessibility support, in a real-life scenario a proper UI library would be used

## Future Improvements

### UI/UX Enhancements

- **Status Visualization**: Colored rows for status indicators (red for cancelled, green for completed, etc...)
- **Auto-status Update**: Update automatically the status of the shipments based on current date (real world) vs estimated arrival
- **Edit Indicator**: Hover effects triggers a pen and paper icon for editable table rows
- **Success Notification**: Floating confirmation messages when shipments are updated
- **Search Functionality**: Global search across data
- **Brand Identity**: Develop consistent design system (currently reusing colors from previous personal project of mine)

### Technical Improvements

- **Component Library**: Extract shared UI components (buttons, selectors, inputs) into reusable library, and use an external UI library for prmitive components
- **Testing & CI/CD**: Implement comprehensive test suite with automated testing pipeline with GitHub Actions

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
