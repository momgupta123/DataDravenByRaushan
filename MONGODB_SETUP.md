# MongoDB Atlas Setup Guide

## Overview
Your Sales Analytics Dashboard backend is now configured to connect to MongoDB Atlas. You need to add your actual database password to complete the setup.

## Current Connection Status
✅ **Server Code**: Fixed and ready to run
✅ **Dependencies**: All installed (bcryptjs for password hashing)
✅ **Environment Variable**: Set up with MongoDB Atlas URI (needs password)
❌ **Authentication**: Requires actual password in connection string

## Step-by-Step Setup

### 1. Get Your MongoDB Atlas Password

If you don't have a password yet:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in to your cluster (InsightFlowCluster)
3. Navigate to **Database Access** → **Users**
4. Either use an existing user or create a new one:
   - Username: `Raushan7070` (or your preferred username)
   - Generate a secure password
5. Copy the password

### 2. Update the .env File

Open `/Data d1/share/Data d1-project/server/.env` and replace `<db_password>` with your actual MongoDB password:

```env
# BEFORE:
MONGODB_URI=mongodb+srv://Raushan7070:<db_password>@insightflowcluster.fd9fbf6.mongodb.net/?appName=InsightFlowCluster

# AFTER:
MONGODB_URI=mongodb+srv://Raushan7070:YOUR_ACTUAL_PASSWORD_HERE@insightflowcluster.fd9fbf6.mongodb.net/?appName=InsightFlowCluster
```

**Important**: 
- Replace `YOUR_ACTUAL_PASSWORD_HERE` with your actual password
- Do NOT commit this file to version control (it's in .gitignore)
- If your password contains special characters, they need to be URL-encoded:
  - `@` → `%40`
  - `:` → `%3A`
  - `#` → `%23`
  - etc.

### 3. Verify IP Whitelist

Make sure your IP address is whitelisted in MongoDB Atlas:
1. Go to **Network Access** in MongoDB Atlas
2. Add your current IP (or `0.0.0.0/0` for development only)

### 4. Start the Server

```bash
cd /Data d1/share/Data d1-project/server
pnpm dev
```

You should see:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

## Error Messages & Solutions

### "bad auth : authentication failed"
- Check that your password is correct in the .env file
- Verify the username matches the one in MongoDB Atlas
- Make sure your IP is whitelisted

### "connect ENOTFOUND insightflowcluster.fd9fbf6.mongodb.net"
- Check your internet connection
- Verify the cluster domain name is correct
- Ensure your IP is whitelisted

### "MongoServerError: authentication failed"
- Your password contains special characters - URL-encode them
- The MongoDB user doesn't exist - create it in Database Access

## What's Fixed

✅ **TypeScript Compilation**: Fixed router type annotations
✅ **Bcrypt Issue**: Replaced with bcryptjs (pure JavaScript, no native compilation needed)
✅ **Type Definitions**: Added @types/cors and @types/bcryptjs
✅ **Connection String**: Updated to your MongoDB Atlas cluster
✅ **Build Process**: Server now compiles cleanly

## Testing the Connection

Once you update the password, test with:

```bash
cd server
pnpm dev
```

The server should:
1. Connect to MongoDB Atlas
2. Seed the sales data
3. Listen on port 5000

Then test the API:
```bash
curl http://localhost:5000/api/health
# Should return: {"message":"Server is running"}
```

## Next Steps

1. Update `/Data d1/share/Data d1-project/server/.env` with your password
2. Start the server: `pnpm dev`
3. In another terminal, start the client: `cd ../client && pnpm dev`
4. Open http://localhost:3000 in your browser
5. Create an account and explore the dashboard!

## Security Notes

- Never commit `.env` files to version control
- In production, use environment variables or secrets management
- Rotate passwords periodically
- Use strong, unique passwords for MongoDB
- For production, consider using IP whitelist instead of 0.0.0.0/0

## Support

If you encounter issues:
1. Check the error message carefully
2. Verify your MongoDB Atlas settings
3. Make sure your IP is whitelisted
4. Check that the password is correctly URL-encoded if it contains special characters
