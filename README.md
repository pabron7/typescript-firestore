# Game Backend Developer Assignment

This project includes a Firebase backend and a React-based Admin UI. All services are run inside a Docker container using the Firebase Emulator Suite.

### Requirements

    Node.js >= 18 (22 Recommended)

    Docker Desktop installed and running

    macOS or Linux recommended (tested on macOS)

**Warning**

This project was developed using an **incremental and linear commit strategy**, Commits were pushed incrementally to show the **thinking and implementation flow** transparently.
Pulling or checking out commits **individually** is **not recommended**, as they may contain incomplete logic or transient errors that were resolved in later commits.

* For full context, refer to the latest commit on `main`.

## Installation

### Local Development (with hot reload)
This mode is ideal for debugging or extending functionality.

#### Ensure correct Node version
    nvm use 22

#### Install dependencies
    cd functions && npm install
    cd ../admin && npm install
    cd ..

#### Start frontend dev server (hot reload)
    cd admin
    npm run dev
* **runs on http://localhost:5173**

#### Start Firebase emulators (functions, firestore)
    cd ../functions
    npm run serve
* **Admin UI on http://localhost:5006**
* **API on http://localhost:5004/demo-project/europe-west3/api/v1/games**
* **Firestore UI on http://localhost:5007**

### Docker Deployment (emulated full environment)

This mode is used to replicate a final delivery environment.

#### Build Docker Image
    cd functions
    npm run buildImage

#### Serve Docker
    npm run start

Once running, access services at:
* Admin UI	http://localhost:5006
* Functions API	http://localhost:5004
* Game API	http://localhost:5004/demo-project/europe-west3/api/v1/games
* Firestore UI	http://localhost:5007/firestore
* Emulator UI	http://localhost:5007

### Seed Firestore with Sample Data

Run the following in a separate terminal to populate Firestore with games.json data:

    cd functions
    npm run seed

If successful, you'll see:
    
    Seeded 27 games into Firestore.

## Project Structure

    game-backend-developer-assignment-master/
    ├── admin/                     # React frontend for admin UI
    │   ├── src/
    │   │   ├── components/        # Reusable UI components
    │   │   ├── hooks/             # Custom React hooks
    │   │   ├── types/             # TypeScript types
    │   │   ├── api/               # API functions
    │   │   └── pages/             # Page-level components
    │   │   └── utils/             # Utility functions
    │   └── package.json
    │
    ├── functions/                 # Firebase Functions backend
    │   ├── src/
    │   │   ├── apis/              # Firestore and Firebase admin API wrappers
    │   │   ├── classes/           # Custom error classes
    │   │   ├── helpers/           # Expansion update utilities
    │   │   ├── routes/            # Express routers
    │   │   ├── scripts/           # FIRESTORE SEEDING SCRIPT
    │   │   ├── utils/             # Memoization, router helpers, etc.
    │   │   ├── tests/             # Unit, Integration and Route Tests.
    │   │   └── app.ts             # Express app entry point
    │   ├── jest.config.js         # Test config
    │   ├── tsconfig.json
    │   └── package.json           # REQUESTED SCRIPTS
    │
    ├── games.json                 # Static seed data
    ├── Dockerfile                 # Container setup for emulator
    ├── .dockerignore              # Ignore files for Docker
    ├── firebase.json              # Emulator and deploy config
    └── README.md

## Testing

This project includes unit and integration tests powered by jest, ts-jest, and firebase-functions-test.

**Run All Test**
    
    cd functions
    npm run test

Tested units include:

* memoize utility function (unit)
* Firestore logic (integration)
* REST API endpoints (/v1/games) including:
    * Create
    * Read
    * Update
    * Delete

### Test Environment Setup

To ensure Firestore emulator behaves correctly in tests:

- Make sure the environment variable `FIRESTORE_EMULATOR_HOST` is set (`jest.setup.js` handles this).
- Tests use real Firestore emulator reads/writes (not mocks).

## Covered Edge Cases

* Preventing duplicate expansions in BaseGame.expansions[]
* Appending expansion ID to BaseGame on creation
* Removing expansion ID from BaseGame on deletion
* Required fields enforced via form and backend validation
* Handling missing documents
* Non-editable critical fields (type, baseGame) during update to ensure integrity

## Known Issues

* Orphaned Expansions
    * Deleting a BaseGame does not automatically delete or update its related Expansion entries. This can lead to expansions pointing to non-existent base games.

* Manual Game ID Generation
    * While IDs are auto-generated in the form, there's no backend enforcement to ensure uniqueness. Accidental reuse may overwrite data if two entries share the same ID.

* No Duplicate Name Check
    * There is no prevention of duplicate Game names, which can make managing and identifying entries difficult in a larger dataset.

* Incomplete Field Reset
    * On type switch (for example, changing from Expansion to BaseGame mid-form), some conditional fields like baseGame or standalone may remain in the form data and be incorrectly submitted unless explicitly reset.

* Live Reload Not Available via Docker:
    * Docker is optimized for testing the final deployment image. For rapid iteration (with hot reload), local development is preferred.

## License
This project is unlicenced. 

Note: This project was developed as part of a Trial Task. Mentioned repository was provided by the evaluation provider for evaluation purposes.

*** 

## Developer

This project was developed by [Alp Kurt](https://www.linkedin.com/in/alp-kurt/). 

* krtalp@gmail.com
* [alpkurt.com](https://alpkurt.com)