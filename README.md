# 🚀 MyLOOT.gg Team Dashboard

A fullstack application for tracking team coin earnings and member contributions.

## Architecture
```
myloot-test/
├── api/              # Backend Express.js API
├── client/           # React TypeScript frontend
├── database.sql      # Database schema
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18+ LTS recommended)
- MySQL/MariaDB (or XAMPP)
- Git

### 1. Database Setup

**Option A: Using XAMPP phpMyAdmin**
1. Open http://localhost/phpmyadmin
2. Click "SQL" tab
3. Copy and paste database.sql content
4. Click "Go"

**Option B: Direct MySQL**
```bash
mysql -u root -p < database.sql
```

### 2. Backend Setup
```bash
cd api
npm install

# Create a .env file, then copy and paste the credentials below to the file.
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=myloot_test
PORT=3001
REACT_APP_API_URL=http://localhost:3001

# Start the server
npm run dev          # Starts on http://localhost:3001
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start           # Starts on http://localhost:3000
```

## Database Structure
**Users → Teams (Many-to-One)**
- Users belong to one team, teams can have multiple users
- `team_id` as foreign key in users table

**Users → Coin Earnings (One-to-Many)**
- Each earning belongs to one user
- Users can have multiple earnings over time
- Tracks individual contributions with timestamps

### Performance Optimizations
**Indexes:**
- `idx_users_team` - Fast team member lookups
- `idx_earnings_user` - Quick user earning queries  
- `idx_earnings_date` - Efficient date range filtering
- `idx_earnings_user_date` - Composite index for user + date queries

**Design Decisions:**
- `earned_at` timestamp for precise tracking
- `amount` with CHECK constraint (positive values only)
- CASCADE delete on earnings when user is deleted
- SET NULL on users when team is deleted (preserve user data)