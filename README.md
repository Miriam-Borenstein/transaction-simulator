# Transaction Approval Simulator

A full-stack web application that simulates credit transaction approvals based on banking hours across different regions.

## Tech Stack

- **Frontend:** React + TypeScript (Vite)
- **Backend:** .NET 8 Web API — Clean Architecture (API / Application / Infrastructure)
- **Database:** MSSQL with Entity Framework Core (code-first migrations)
- **Containerization:** Docker + Docker Compose

## How It Works

The user selects a region (Israel, France, USA, Japan) and a time, then submits a transaction.  
The backend converts the submitted UTC time to the region's local time and applies the rule:

> ✅ **Approved** if local time is between **08:00–18:00** (standard banking hours)  
> ❌ **Rejected** otherwise

All transactions are persisted to the database. Only approved transactions are displayed in the UI.

## Running with Docker (Recommended)

> Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
git clone <repo-url>
cd Shva
docker-compose up --build
```

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:3000        |
| Backend  | http://localhost:5000        |
| Swagger  | http://localhost:5000/swagger|

The database is created automatically on first run via EF Core migrations.

## Running Locally (Without Docker)

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- MSSQL Server (local or remote)

### Backend

1. Update the connection string in `Backend/TransactionSimulator.API/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=TransactionsDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

2. Run the API:
```bash
cd Backend
dotnet run --project TransactionSimulator.API
```

Migrations are applied automatically on startup.

### Frontend

```bash
cd Frontend/transaction-client
npm install
npm run dev
```

App runs at http://localhost:5173

## API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| POST   | `/api/transactions/create`  | Submit a transaction for approval  |
| GET    | `/api/transactions/approved`| Fetch all approved transactions    |

## Architecture Highlights

- **Clean Architecture** — strict separation between API, Application (business logic), and Infrastructure (DB, services)
- **Timezone logic** — uses `TimeZoneInfo` for accurate local time conversion per region
- **FluentValidation** — request validation decoupled from controllers
- **Mapster** — lightweight object mapping
- **Global error handling** — centralized via `ExceptionHandlerMiddleware`
