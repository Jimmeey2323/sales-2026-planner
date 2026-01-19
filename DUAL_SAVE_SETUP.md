# Sales 2026 Planner - Dual Save Setup

## Overview
The app now saves changes to **both** the Neon database AND the local `constants.ts` file.

## How to Run

### Option 1: Run both services together (recommended)
```bash
npm run dev:all
```

This runs:
- Vite dev server (frontend) on port 8080+
- Node server (file updates) on port 3001

### Option 2: Run separately
Terminal 1:
```bash
npm run dev
```

Terminal 2:
```bash
npm run server
```

## How It Works

1. **User makes changes** → Changes stored in React state
2. **User clicks Save** → Triggers `saveAllChanges()` function
3. **Dual save executes**:
   - Saves to Neon PostgreSQL database
   - Sends data to Node server API endpoint
   - Node server updates `constants.ts` file
   - Creates backup as `constants.ts.backup`

## Files Modified

- `server.js` - Express server with `/api/update-constants` endpoint
- `lib/updateConstants.ts` - Client-side function to call server API
- `context/SalesContext.tsx` - Updated `saveAllChanges()` to save to both destinations
- `package.json` - Added server scripts and dependencies

## API Endpoint

**POST** `http://localhost:3001/api/update-constants`

Body:
```json
{
  "monthsData": [/* array of month data */]
}
```

Response:
```json
{
  "success": true,
  "message": "constants.ts updated successfully",
  "backupCreated": true
}
```

## Safety Features

- Creates backup before every write
- Database save is primary (file update is secondary)
- Save succeeds even if file update fails
- File update errors are logged but don't block save

## Install Dependencies

```bash
npm install
```

This will install:
- `express` - HTTP server
- `cors` - Cross-origin resource sharing
- `concurrently` - Run multiple npm scripts
- `@types/express` - TypeScript types
- `@types/cors` - TypeScript types
