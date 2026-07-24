# Quick Setup Guide

This guide walks you through setting up and running the Sales Analytics Dashboard locally.

## Prerequisites

- **Node.js**: 16.x or higher
- **pnpm**: 7.x or higher (or use npm/yarn as alternatives)
- **MongoDB**: Local installation or Atlas cloud instance

## Step 1: Clone/Extract the Project

If you haven't already, navigate to the project directory:
```bash
cd sales-analytics-dashboard
```

## Step 2: Backend Setup

### 2.1 Navigate to server directory
```bash
cd server
```

### 2.2 Install dependencies
```bash
pnpm install
```

### 2.3 Configure environment variables
Create a `.env` file in the `server/` directory with the following content:

```
MONGODB_URI=mongodb://localhost:27017/sales-dashboard
JWT_SECRET=dev-secret-key-change-in-production
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas Cloud:**
If using MongoDB Atlas instead of local MongoDB, update `MONGODB_URI`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sales-dashboard?retryWrites=true&w=majority
```

### 2.4 Start the backend server
```bash
pnpm dev
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
Sales data seeded successfully
```

Keep this terminal open and proceed to the next step in a new terminal.

## Step 3: Frontend Setup

### 3.1 In a new terminal, navigate to client directory
```bash
cd client
```

### 3.2 Install dependencies
```bash
pnpm install
```

### 3.3 Configure environment variables (optional)
Create a `.env` file in the `client/` directory:

```
VITE_API_BASE_URL=http://localhost:5000
```

This is optional since `http://localhost:5000` is the default fallback.

### 3.4 Start the frontend dev server
```bash
pnpm dev
```

The application will automatically open in your browser at `http://localhost:3000`. If it doesn't, manually navigate to that URL.

## Step 4: Create Your First Account

1. On the Signup page, create a new account:
   - **Name**: Your name
   - **Email**: Any email format (e.g., `demo@example.com`)
   - **Password**: At least 6 characters

2. After signing up, you'll be automatically logged in and redirected to the dashboard

## Step 5: Explore the Dashboard

### Navigation
- **KPI Cards**: View at-a-glance metrics at the top of the dashboard
- **Charts**: 
  - Line chart shows revenue trends over time
  - Bar chart shows revenue by region
  - Pie chart shows revenue by category
- **Filters Panel** (left sidebar):
  - Search by product or customer name
  - Filter by date range
  - Multi-select regions
  - Filter by category and status
- **Data Table**: Sorted, paginated sales records
- **Detail Modal**: Click any table row to see full details

### Testing Features

1. **Search**: Type "laptop" or any product name in the search box
2. **Date Filtering**: Select a date range to see sales in that period
3. **Multi-Select**: Choose multiple regions to compare
4. **Sorting**: Click column headers to sort by that column
5. **Pagination**: Change rows per page or navigate through pages
6. **URL Sharing**: Copy the URL to share a specific filtered view

## Troubleshooting

### MongoDB Connection Error
**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
- If using local MongoDB, ensure MongoDB is running:
  ```bash
  # macOS with Homebrew
  brew services start mongodb-community
  
  # Linux (Ubuntu)
  sudo systemctl start mongod
  
  # Windows - MongoDB should auto-start if installed as a service
  ```

- Or use MongoDB Atlas cloud (see Step 2.3)

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
Kill the process using port 5000:
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows (in PowerShell as admin)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

Or change the port in `server/.env`:
```
PORT=5001
```

Then update `client/.env`:
```
VITE_API_BASE_URL=http://localhost:5001
```

### Blank Page in Browser
**Problem**: Dashboard shows blank or only sidebar visible

**Solution**:
1. Check browser console for errors (F12)
2. Ensure backend is running: `http://localhost:5000/api/health`
3. Clear browser cache and reload (Ctrl+Shift+Delete)
4. Try in incognito mode to rule out cache issues

### CORS Error
**Problem**: Error in browser console about CORS

**Solution**:
- CORS is configured in `server/src/server.ts`
- Ensure frontend and backend are on correct URLs
- For different domains, CORS configuration may need adjustment

### Auth Error or Can't Login
**Problem**: Login fails or session expires quickly

**Solution**:
1. Check `JWT_SECRET` in `server/.env` is set (any random string works for dev)
2. Ensure token is being saved (check DevTools > Application > LocalStorage)
3. Try signing up again with a new email

## Building for Production

### Build Backend
```bash
cd server
pnpm build
pnpm start
```

### Build Frontend
```bash
cd client
pnpm build
pnpm preview  # Preview production build locally
```

## Development Tips

### Hot Module Replacement (HMR)
Both frontend and backend support hot reloading during development. Changes are automatically reflected without full restart.

### Redux DevTools
If you have Redux DevTools browser extension installed, you can inspect state changes in the dashboard.

### API Testing
Test the backend API directly:
```bash
# Health check
curl http://localhost:5000/api/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456","confirmPassword":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Get Sales (with token)
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/sales
```

## Next Steps

- Read the full [README.md](./README.md) for detailed feature documentation
- Explore the codebase structure in `/client` and `/server` directories
- Customize styling by editing `client/tailwind.config.js`
- Add more mock data by modifying `server/src/controllers/salesController.ts`

## Common Development Commands

```bash
# Run everything
npm run dev:client    # Terminal 1
npm run dev:server    # Terminal 2

# Stop servers
Ctrl+C in each terminal

# Clean dependencies and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Build for production
npm run build

# Format code (if ESLint is configured)
npm run lint
```

## Support

For issues or questions:
1. Check the [README.md](./README.md) troubleshooting section
2. Review error messages in the browser console and server logs
3. Ensure all prerequisites are installed correctly

Happy coding! 🚀
