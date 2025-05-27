# CarTrawler to-do application

This a very simple to-do application split into two parts. A backend and a frontend.

## Running the backend

The backend is a node.js application. To run it:

- `cd backend`
- `npm install`
- `npm start`

Once done, you can query the API on [http://localhost:3000/api/items](http://localhost:3000/api/items)

To make it easier, there is a postman collection to get you started under the [postman](/backend/postman/carTrawler.postman_collection.json) folder.

For an overview of the API endpoints, visit [http://localhost:3000/docs](http://localhost:3000/docs).

You can also run the tests using:

`npm test`

## Running the frontend

The frontend is a react.js application written in Typescript and bundled by vite. To run it:

- `cd frontend`
- `npm install`
- `npm run dev` or `npm run build` for watch mode of bundling respectively.

Once done, you can visit the UI on [http://localhost:5173](http://localhost:5173)

## Future work

- Handle errors from the API
