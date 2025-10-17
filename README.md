# Agent-allocation-engine
Agent Allocation Engine is a modern MERN stack application designed to streamline task management and distribution across multiple agents using predefined algorithm..


## Key Features

- **Admin Login & JWT Authentication** – secure access control.  
- **Agent Management** – add, view, and manage agents easily.  
- **Task Upload & Distribution** – upload CSV/XLSX files, validate data, and distribute tasks evenly among agents.  
- **Dashboard & Task Tracking** – view all agents and their assigned tasks in a clean, intuitive interface.  
- **Scalable Architecture** – built with MongoDB, Express, React, Node (MERN), following best practices.


## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas (cloud)  
- **Authentication:** JSON Web Tokens (JWT)  
- **File Upload & Parsing:** Multer + CSV/JSON handling  



## Setup & Installation

# 1. Clone the repository
git clone https://github.com/yourusername/agent-allocation-engine.git
cd agent-allocation-engine

# 2. Backend setup
cd backend   # change if your backend folder is named differently
npm install

# Create a .env file in the backend root with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

# Start backend
npx nodemon server.js 
or 
node server.js

# 3. Frontend setup (in a new terminal tab/window)
cd frontend   # change if your frontend folder is named differently
npm install
npm start

# 4. Open your browser and go to:
http://localhost:3000

# 5. Seed Admin Credentials:
email: admin@example.com
password: admin123


### Security Notice
The dependencies `csvtojson` and `xlsx` currently report known prototype pollution vulnerabilities without available patches.  
These are non-exploitable in this project context (no user-supplied code execution, only admin uploads controlled CSV/XLSX files).  
Monitoring advisories via `npm audit` and SheetJS issue tracker.
