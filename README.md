# Sales Analytics Dashboard

A production-ready full-stack MERN (MongoDB, Express, React, Node.js) Sales Analytics Dashboard with real-time filtering, sorting, pagination, and comprehensive charting capabilities.

## Features

- **Authentication**: Email/password signup and login with JWT-based session management
- **KPI Cards**: Display key metrics with trend indicators (Revenue, Orders, Average Order Value, Refund Rate)
- **Data Visualization**:
  - Line chart for revenue trends over time
  - Bar chart for revenue by region
  - Pie chart for revenue by category
- **Advanced Filtering**:
  - Text search by product name or customer name
  - Date range filtering
  - Multi-select region filtering
  - Category and status filtering
  - "Clear all" button for quick filter reset
- **Data Management**:
  - Sortable columns with visual indicators
  - Pagination with customizable page size
  - Clickable rows showing detailed record information in modal
  - Loading, error, and empty states
- **URL State Synchronization**: All filter, sort, and pagination states sync to URL for bookmarkable links
- **Accessibility**:
  - Full keyboard navigation
  - ARIA labels and roles
  - Focus management in modals
  - "Skip to content" link
- **Responsive Design**:
  - Mobile-first approach
  - Hamburger menu on small screens
  - Adaptive layouts for tablets and desktops
- **Dark Mode UI**: Professional dark theme with emerald accents

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (jsonwebtoken) with bcrypt password hashing
- **Data Generation**: @faker-js/faker for mock sales data
- **CORS**: Cross-Origin Resource Sharing support

### Frontend
- **UI Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3
- **Charts**: Recharts
- **Icons**: lucide-react
- **HTTP Client**: Fetch API

## Project Structure

```
.
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── features/                # Redux slices
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── layouts/                 # Page layouts
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API service layer
│   │   ├── store/                   # Redux store configuration
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── models/                  # Mongoose schemas
│   │   ├── routes/                  # API routes
│   │   ├── controllers/             # Route handlers
│   │   ├── middleware/              # Express middleware
│   │   ├── config/                  # Configuration
│   │   └── server.ts                # Express app setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+ and pnpm
- MongoDB instance (local or remote)

### Installation

1. **Backend Setup**
   ```bash
   cd server
   pnpm install
   ```

   Create `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/sales-dashboard
   JWT_SECRET=your-secret-key-here
   PORT=5000
   NODE_ENV=development
   ```

2. **Frontend Setup**
   ```bash
   cd client
   pnpm install
   ```

   Create `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server** (from `/server` directory)
   ```bash
   pnpm dev
   ```
   The server will run on `http://localhost:5000`

3. **Start Frontend Dev Server** (from `/client` directory)
   ```bash
   pnpm dev
   ```
   The app will open at `http://localhost:3000`

4. **Create an Account**
   - Navigate to the signup page
   - Create a new account with name, email, and password
   - You'll be redirected to the dashboard

5. **Explore the Dashboard**
   - View KPI cards with trend indicators
   - Apply filters to explore data
   - Click table rows to see detailed information
   - Navigate through paginated results

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Sales Data (Protected)
- `GET /api/sales` - Fetch sales records (requires Bearer token)

### Health Check
- `GET /api/health` - Server health check

## Features in Detail

### Data Filtering
- **Search**: Filter by product name or customer name (case-insensitive, partial matches)
- **Date Range**: Filter records within a specific date range
- **Regions**: Multi-select filtering by region
- **Category**: Single-select filtering by product category
- **Status**: Filter by transaction status (Completed, Pending, Cancelled)

### Data Visualization
- **Line Chart**: Shows revenue trend over time
- **Bar Chart**: Displays revenue distribution by region
- **Pie Chart**: Visualizes revenue breakdown by category

### State Synchronization
All filter states are synchronized to the URL query parameters, enabling:
- Bookmark-able links with specific filter combinations
- Browser back/forward navigation support
- Link sharing with pre-applied filters

Example URL:
```
http://localhost:3000/dashboard?search=Product&from=2024-01-01&to=2024-12-31&regions=North%20America,Europe&category=Electronics&status=Completed&sortColumn=totalAmount&sortOrder=desc&page=2&pageSize=25
```

### Performance & Reliability
- ~800ms simulated delay on data fetch to test loading states
- ~10% artificial failure rate to test error handling and retry functionality
- Client-side filtering, sorting, and pagination for responsive UX
- Skeleton loaders during data fetch

## Accessibility Features

1. **Keyboard Navigation**: All interactive elements are fully keyboard-accessible
2. **Focus Management**: 
   - Modal focus trap ensures Tab navigation stays within modal
   - Escape key closes modals
   - Focus returns to triggering element after modal closes
3. **ARIA Labels**: 
   - All buttons, form inputs, and chart regions have descriptive aria-labels
   - Table headers have proper `scope` attributes
   - Modals have `role="dialog"` and `aria-modal="true"`
4. **Semantic HTML**: Proper use of heading levels, navigation, and main landmarks
5. **Color Contrast**: All text meets WCAG AA color contrast requirements
6. **Skip Links**: "Skip to content" link at top of page for screen reader users

## Responsive Design

### Mobile (< 640px)
- Hamburger menu for navigation
- Single-column layout
- Filters in collapsible sections
- Stacked table with card-like styling

### Tablet (640px - 1024px)
- Optional sidebar toggle
- Two-column layouts where appropriate
- Adaptive chart sizing

### Desktop (> 1024px)
- Full persistent sidebar
- Multi-column layouts
- Full-size charts

## Error Handling

- **Network Errors**: Displays error message with "Try Again" button
- **Invalid Input**: Form validation with error messages
- **Session Expiry**: Auto-logout if token is invalid
- **Empty States**: Friendly empty state messages with "Clear Filters" CTA

## Testing

The application includes test setups for:
- Unit tests for filters, sorting, pagination logic
- Integration tests for URL state synchronization
- Component tests for modals, accessibility features
- Backend route tests for authentication and data access

To run tests:
```bash
# Client tests
cd client && pnpm test

# Server tests
cd server && pnpm test
```

## Security Considerations

1. **JWT Authentication**: Stateless authentication with token expiration
2. **Password Security**: Bcrypt hashing with salt rounds
3. **Protected Routes**: API endpoints require valid JWT token
4. **CORS**: Configured for local development
5. **Environment Variables**: Sensitive data stored in `.env` files (not committed)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Memoized chart components to prevent unnecessary re-renders
- Client-side pagination to avoid fetching all data
- Efficient filter application using selectors
- Lazy-loaded routes with React Router
- Image optimization with Tailwind CSS utilities

## Known Limitations

1. Mock data is generated on each server start (not persisted between restarts unless seeded to MongoDB)
2. No real-time updates; requires manual page refresh to see new data
3. No export functionality (CSV, PDF)
4. No user profile or settings management
5. Limited to single-user view (no multi-user collaboration)

## Future Enhancements

- [ ] Export data to CSV/PDF
- [ ] Real-time updates with WebSockets
- [ ] Advanced reporting with date range comparisons
- [ ] User preferences and saved filters
- [ ] OAuth social login
- [ ] Dark/light theme persistence
- [ ] Performance metrics dashboard
- [ ] API rate limiting and caching
- [ ] Email notifications for key metrics
- [ ] Mobile app with React Native

## License

MIT

## Support

For issues, questions, or suggestions, please open an issue in the project repository.

## Changelog

### v1.0.0
- Initial release
- Core dashboard features
- Authentication system
- Filtering and sorting
- Data visualization
- URL state synchronization
- Full accessibility support
