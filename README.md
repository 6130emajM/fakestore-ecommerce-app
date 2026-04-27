FakeStore E-Commerce App

Overview
This is a React-based e-commerce application that interacts with the FakeStoreAPI.
Users can browse products, view details, and perform create, update, and delete operations.

Note: FakeStoreAPI is a mock API. Changes such as POST, PUT, and DELETE appear successful but are not permanently saved.

Features
Home page with navigation
Product listing page using API data
Product details page
Add new product using POST request
Edit product using PUT request
Delete product with confirmation modal
Loading states and error handling
Responsive design using React Bootstrap

Tech Stack
React (Vite)
React Router DOM
Axios or Fetch API
React Bootstrap
JavaScript (ES6+)

Project Structure
src/
components/
NavigationBar.jsx
ProductCard.jsx
DeleteModal.jsx
pages/
Home.jsx
Products.jsx
ProductDetails.jsx
AddProduct.jsx
EditProduct.jsx
App.jsx
main.jsx

How to Run
npm install
npm run dev

Then open in browser:
http://localhost:5173

API Used
https://fakestoreapi.com/products

Demo Video
Submitted via Disco platform

Status
Fully functional frontend app
All CRUD operations implemented
Routing and navigation working
Error handling and loading states implemented
Meets project requirements

Notes
FakeStoreAPI is a mock API so data does not persist after refresh
POST, PUT, and DELETE requests are simulated responses
