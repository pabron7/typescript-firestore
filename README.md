# Game Backend Developer Assignment

This project includes a Firebase backend and a React-based Admin UI. All services are run inside a Docker container using the Firebase Emulator Suite.

### Requirements

    Node.js >= 18 (22 Recommended)

    Docker Desktop installed and running

    macOS or Linux recommended (tested on macOS)

## Installation

Clone the repository and install dependencies:

### Clone repo

    git clone https://gitlab.com/softgames-public/game-backend-developer-assignment.git

    cd game-backend-developer-assignment

**Install dependencies for both apps**

    cd functions && npm install

    cd ../admin && npm install

    cd ..

**Build the Admin UI**

Before Docker can serve the Admin UI, build it:

    cd admin

    npm run build

    cd ..

### Run in Docker

Build and run the project using Docker:

**Build Docker image**
    
    cd functions
    npm run buildImage


**Start the emulator container (binds ports 5000–5007 and 9150)**
    
    npm run start

**This will start the following services:**

Service	URL

* Admin UI	http://localhost:5006
* Functions API	http://localhost:5004
* Frontend API  http://localhost:5004/demo-project/europe-west3/api/v1/games
* Firestore UI	http://localhost:5007/firestore
* Emulator UI	http://localhost:5007

### Seed Firestore (in Emulator)

To populate the Firestore emulator with demo game data from games.json, start a new terminal and:

    cd functions
    npm run seed

If successsful, you’ll see the log:
    
    "Seeded 27 games into Firestore."

### License
This project is unlicenced. 

Note: This project was developed as part of a Trial Task. Mentioned repository was provided by the evaluation provider for evaluation purposes.

### Developer

This project was developed by Alp Kurt. 

* krtalp@gmail.com
* [alpkurt.com](https://alpkurt.com)