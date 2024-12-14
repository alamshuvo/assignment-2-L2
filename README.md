# Car Store Management system

This project is an Express application with TypeScript,integrating MongoDB with mongoose to manage a Car Store.Ensure  data integrity using mongoose schema validation and also use zod validation.
## Live Link 
- https://cars-backend-pearl.vercel.app/
## vedio details
- https://drive.google.com/file/d/1EPWmspiygShaZhG2NHW-l5tBAwoVKUNK/view?usp=sharing
# Car Management 
- Add new car with details like name,brand ,type,price and stock details
- Retrieve all Car 
- View details of specific car by its ID 
- Update Car information such as price ,stock status,quantity,etc
- Delete a Car from the inventory its normal delete 

# Order Management 
- place order for Car with email,product ,quantity,and total price .
- Validate stock availability before creation 
- Automatically reduce inventory when an order is placed its dynamic 

# Inventory Management 
- When a car out of stock its reaches a zero and its stock status is false 
- update Car inventory Dynamicaly 
- through proper error message 

# Revenue Collection 
- Calculated total revenue generated from all orders 
- Use MongoDB aggregation pipelines for eficient revenue computation 

# Error handaling 
- Detaild, user-friendly error resoponse 
- Missing or invalid data 
- its global error through by express.js next function i access global error 

# Techonology used 
      1. Backend : Node.js,Express.js,TypeScript, Zod
      2. DataBase: MongoDB and Mongoose 
      3. Tools: EsLint,Prettieer
      4. FrontEnd : Not yet now (can be intefrated later)

## How to run project 

# Prerequisites 
- Node.js 
- Git 
- MongoDB- local or cloud 

# installation 
# 1. Clone the Repository 
    1.https://github.com/alamshuvo/assignment-2-L2.git

# 2. Install Dependencies 
    1.npm install 

# 3. Set up Environment variables create a .env file in the root directory and include the following 
    1.port=5000;
    2.MONGO_URI=mongodb://localhost:27017

# 4. Run the application start the server in development mode 
    1.npm run dev 



# Check API end point 
   # 1. Car 
       - EndPoint: POST - /api/cars
       - Request Body 
       - { "brand": "Toyota",  "model": "Camry",  "year": 2024,  "price": 25000,  "category": "Sedan",  description": "A reliable family sedan with modern features.",  "quantity": 50,  "inStock": true}

- Response : Sucess message when its sucessfully created and created bicycel details 
 # 2. Get All Car 
 - EndPoint : GET /api/cars
 - A list of cars data 
 - EndPoint : GET api/cars?searchTerm= " "
 - you can find specific model ,brand , name you find same data 

 # 3. Get Specific car 
   - EndPoint : GET /api/cars/:carsId
   - Response  : Details the specific car 

# 4. Update Car 
  - EndPoint : PUT /api/cars/:carsId
  - Requset Body : if you want update feild 
  - Response : Sucess message with update Cars data 

# 5. Delete Car
 - Endpoint : DELETE /api/cars/:carsID
 - Response : Sucess message for deltetion 

# Orders 
  1. place an order -EndPoint : POST /api/orders 
  2. Request Body - {
"email": "customer@example.com",
"product": "648a45e5f0123c45678d9012",
"quantity": 2,
"totalPrice": 600
}
3. Response : Sucess Message with order details 

2. Calculate Revenue 
  1- Endpoint : /api/orders/revenue
  2-response : Total revenue from all orders 


  # If you want Contact me
  - iftakharalamshuvo11@gmail.com