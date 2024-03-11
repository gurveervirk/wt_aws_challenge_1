# Challenge 1

## Setup
### frontend
```
cd frontend
npm i
```
To start: ```npm start```
### backend
```
cd backend
npm i
```
## Start frontend and backend at the same port
```
cd frontend
npm run build
```
After this, copy the build subfolder in frontend folder to the backend folder. Now, run (after defining the .env file appropriately in the backend folder):
```
cd ../backend
node ./index.js
```
Access the website at **localhost:PORT** where PORT is defined in .env file.
