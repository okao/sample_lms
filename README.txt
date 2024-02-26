Assumptions:
- Existing PostgreSQL database setup with all correct tables.
- .ENV file setup properly with correct database url. 

Requirements for running
1. Node.js (v16.15.1)
2. Node Package Manager (NPM) or Yarn 

Instructions for running

1. Install Dependencies for running & downloading code 
	1. Install Node.js(https://nodejs.org) or Install Yarn(https://yarnpkg.com/) 
	2. Install Git

2. Clone Code
	1. Open Terminal
	2. [Install Git](https://github.com/git-guides/install-git)
	3. Go to directory 
	4. `git clone https://github.com/sai-k02/library-management-system.git`
		Note: This will make a folder called "library-management-system"

3. Run Server
	1. Go to Server Directory
	2. Include .env
		- DATABASE_URL=""
	3. Install Dependencies
		-  `yarn` 
	4. Setup prisma
		1.  `npx prisma db pull`
		2. `npx prisma generate client` 
	5. Run Server
		1. `yarn start`

4. Run Client
	1. Create a new Terminal
	2. Go to Client Directory
	3. Install Dependencies
		1. `yarn` 
	4. Run Client
		1. `yarn start`

Configuration & Troubleshooting: 
	1. Server: 
		1. Include .env
		2. npx prisma db pull
		3. npx prisma generate client
	2. Client:
		1. If not loading:
			- Inspect -> Application -> Local Storage -> Clear (localhost:3000)
