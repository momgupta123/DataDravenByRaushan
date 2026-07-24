# Sales Analytics Dashboard - Quick Start Guide

## ✅ MongoDB Connection Status: VERIFIED

Your MongoDB Atlas connection is now active and seeding data successfully!

```
✓ Connected to: insightflowcluster.fd9fbf6.mongodb.net
✓ Database: sales-dashboard
✓ Sample data: 1000+ sales records auto-generated
```

---

## 🚀 Running the Application

### Prerequisites
- Node.js 16+ installed
- pnpm package manager
- MongoDB Atlas credentials (already configured)

### Terminal 1: Start the Backend


**Expected Output:**
```
MongoDB connected successfully
Seeding sales data...
Sales data seeded successfully
Server running on http://localhost:5000
```

### Terminal 2: Start the Frontend

``
**Expected Output:**
```
VITE v5.x.x  ready in 1234 ms

➜  Local:   http://localhost:5173
➜  press h to show help
```

---

## 📱 Accessing the Dashboard

1. **Open your browser** to `http://localhost:3000` or `http://localhost:5173` (depending on Vite port)

2. **Create Account:**
   - Click "Sign Up" on the login page
   - Enter any email and password
   - Account data is stored in MongoDB

3. **Login:**
   - Use the credentials you just created
   - You'll be redirected to the dashboard

4. **Explore Features:**
   - View 4 KPI cards with real-time data
   - Interact with 3 data visualization charts
   - Filter data by: date range, region, category, status
   - Sort columns by clicking headers
   - View detailed records in modal
   - Paginate through results

---

## 🔑 Test Credentials (Optional)

You can create your own account, or if pre-seeded test data exists:
- Email: `demo@example.com`
- Password: `password123`

---

## 📊 Features Available

### Dashboard Metrics
- **Revenue**: Total sales amount with trend
- **Orders**: Total number of orders with trend
- **AOV**: Average Order Value with trend
- **Refund Rate**: Percentage of refunded orders

### Data Visualizations
1. **Line Chart**: Revenue trend over time
2. **Bar Chart**: Sales by region
3. **Pie Chart**: Sales by product category

### Data Management
- **Search**: Filter by order ID, customer name, product
- **Date Range**: Select custom date periods
- **Multi-select Filters**: Region, category, status
- **Sorting**: Click column headers to sort
- **Pagination**: 5/10/25/50 items per page
- **Detail View**: Click rows to see full record info

### Advanced Features
- **URL State Sync**: All filters sync to URL for shareable links
- **Responsive Design**: Mobile, tablet, desktop optimized
- **Dark Mode**: Professional dark theme with emerald accents
- **Accessibility**: Full keyboard navigation and screen reader support
- **Loading States**: Smooth skeletons for better UX
- **Error Handling**: Retry buttons for failed requests

---

## 🛠️ API Endpoints (Backend)

All endpoints are at `http://localhost:5000/api`

### Authentication
```bash
# Sign Up
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": "507f1f77bcf86cd799439011"
}
```

### Sales Data
```bash
# Get Sales (requires JWT token)
GET /api/sales
Authorization: Bearer <token>

# Query Parameters:
# ?page=1
# ?limit=10
# ?sort=date (or: revenue, region, category, status)
# ?order=asc (or: desc)
# ?search=customer-name
# ?dateFrom=2024-01-01
# ?dateTo=2024-12-31
# ?region=North,South
# ?category=Electronics
# ?status=completed
```

---

## 🔐 Environment Variables

Located in `/server/.env`:

```env
# MongoDB Connection (already configured)
MONGODB_URI=mongodb+srv://Raushan7070:Raushan9973@insightflowcluster.fd9fbf6.mongodb.net/?appName=InsightFlowCluster

# JWT Secret (change for production)
JWT_SECRET=dev-secret-key-change-in-production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

> ⚠️ **Note**: Never commit `.env` file with real credentials to version control

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Clear node_modules and reinstall
cd server
pnpm install

# Check MongoDB connection
# Verify your IP is whitelisted in MongoDB Atlas Network Access
```

### Frontend can't connect to backend
```bash
# Make sure server is running on port 5000
# Check browser console for CORS errors
# Backend is CORS-enabled for localhost
```

### Data not showing
```bash
# Refresh page (Ctrl+Shift+R)
# Check browser DevTools Network tab
# Verify MongoDB is connected (check server logs)
# Try logging out and back in
```

### Port already in use
```bash
# Server port 5000
lsof -i :5000
kill -9 <PID>

# Client port 3000/5173
lsof -i :3000
lsof -i :5173
```

---

## 📦 Technology Stack

### Backend
- Express.js 4.18
- Node.js with TypeScript
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- @faker-js for mock data

### Frontend
- React 18 with TypeScript
- Vite bundler
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

---

## 📚 Additional Documentation

- **README.md** - Complete feature documentation and architecture
- **SETUP.md** - Detailed setup instructions
- **PROJECT_SUMMARY.md** - Project overview and statistics
- **ERROR_FIXES.md** - Technical error resolutions
- **MONGODB_SETUP.md** - MongoDB Atlas configuration details

---

## 🎯 Next Steps

1. ✅ **Backend**: Running on port 5000 with MongoDB connected
2. ⏳ **Frontend**: Installing dependencies
3. 🚀 **Start the app**: Run `pnpm dev` in both directories
4. 🌐 **Access dashboard**: Open http://localhost:5173
5. 📊 **Explore data**: Create account and view analytics

---

## 💡 Tips

- **Performance**: The app handles 1000+ records with smooth pagination
- **Filtering**: All filters work client-side after data is fetched for speed
- **Sharing**: Copy URL with filters applied to share specific views
- **Mobile**: Test responsive design by resizing browser or opening on phone
- **Dark Mode**: Built-in dark theme is easy on the eyes

---

## 🆘 Need Help?

1. Check **ERROR_FIXES.md** for known issues
2. Review **MONGODB_SETUP.md** for connection problems
3. Check terminal output for error messages
4. Verify MongoDB Atlas credentials in `.env`
5. Ensure both servers are running in separate terminals

---

**Happy coding! 🎉** Your full-stack sales analytics dashboard is ready to explore.
