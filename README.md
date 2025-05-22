# 🗳️ Polling App

A full-stack polling application that allows users to register, log in, create polls, vote, view results with bar charts, and search through polls. The application is built with a .NET Core Web API backend and an Angular frontend, with secure JWT-based authentication.

---

## 🔧 Setup Instructions

### Prerequisites
- [.NET 8 core , EF ]
- [Angular CLI]
- [SQL Server ] 
---

### Backend (.NET Core Web API)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/polling-app.git
   cd polling-app/backend
Update appsettings.json

2. Configure the connection string and JWT settings.

"ConnectionStrings": {
  "DefaultConnection": "Your_DB_Connection_String"
},
"Jwt": {
  "Key": "YourSecretKey",
  "Issuer": "PollingAppAPI",
  "Audience": "PollingAppClient",
  "DurationInMinutes": 60
}

3. Apply migrations and run

dotnet ef database update
dotnet run


4. Navigate to the frontend

cd ../frontend

5. Install dependencies

npm install

6. Run the development server

ng serve
Open http://localhost:4200 in your browser.




 Key Design Choices & Assumptions:-
Authentication: ASP.NET Core Identity with JWT token-based authentication for secure API access.

Modular Architecture: Backend follows a layered structure (Controllers, Services, Repositories) for maintainability.

Authorization: Roles (User, Admin) used to control access (e.g., only admins can create polls).

Pagination & Search: Poll listing supports server-side pagination and search by question.

Bar Chart Results: Angular uses Chart.js for displaying real-time vote counts visually.

Token Refresh: Implemented Refresh Token flow for seamless user sessions.




⚠️ Challenges & Resolutions:-
JWT Token Expiry: Initially users were logged out abruptly. Solved by implementing refresh token logic and intercepting expired token responses.

Vote Duplication: Users could vote multiple times. Fixed by enforcing unique user-poll constraint in the database and validating in the service layer.

Chart Updates: Bar charts weren’t updating after voting. Used Angular’s ChangeDetectorRef and manually refreshed chart data after a vote.

CORS Issues: Cross-origin errors occurred when running frontend and backend separately. Resolved by enabling CORS policy in Program.cs.



