1. Install development tools
2. Create Angular App
    1. Create project's folder
    2. Install @angular/cli
    3. Create App as folder
3. Add Header
    1. Generate Component
    2. Add HTML
    3. Add CSS
4. List Items
    1. Create Item model
    2. Create data.ts
        1. Add sample items
    3. Add images to assets
    4. Create Item service
    5. Create Home component
        1. Add ts
        2. Add html
        3. Add css
5. Search
    1. Add method to Item service
    2. Add search route
    3. Show search results in Home Component
    4. Generate search component
        1. Add to home component
        2. Add ts
        3. Add html
        4. Add css
6. Tgas Bar
    1. Create Tag model
    2. Add sample tags to data.ts
    3. Food service
        1. Add get all tags method
        2. Add get all foods by tag method
    4. Add tags route
    5. Show tag results in Home component
    6. Generate Tags component
        1. Add to home component
        2. Add ts
        3. Add hmtl
        4. Add css
7. Item Details Page
    1. Add method to item service
    2. Generate Item Detail Page component
        1. Add Route
        2. Add ts
        3. Add html
        4. Add css
8. Cart Page
    1. Create CartItem Model
    2. Create Cart Model
    3. Generate Cart service
    4. Add to Cart Button in Food Page
    5. Generate Cart page component
        1. Add Route
        2. Add ts
        3. Add html
        4. Add css
9. Not Found Page
    1. Generate Component
      1. Add ts
      2. Add html
      3. Add css
    2. Add to Pages
      1. Home Page
      2. Item Page
      3. Cart Page
10. Connect to Backend
    1. Create backend folder
    2. npm init
    3. npm install typescript
    4. Create tsconfig.json file
    5. Create .gitignore
    6. Copy data.ts to backend/src
    7. npm install express cors
    8. Create server.ts
      1. install @types
      2. Add Apis
    9. npm install nodemon ts-node --save-dev
    10. Add urs.ts to frontend
    11. Add HttpClient module
    12. Update food service
11. Login Page
    1. Generate Component
        1. Add to routes
        2. Add ts
        3. Add html
            1. Import Reactive Forms Module
        4. Add Css
    2. Add Login Api
        1. Use json
        2. Add jsonwebtoken
        3. Test Using Postman
    3. Part 2 ...
13. Make Components for Login Page
    1. Input Container
    2. Input Validation
    3. Text Input
    4. Default Button
14. Connect Login Api to MangoDB Atlas
    1. Moving Apis into router
    2. Create MangoDB Atlas
    3. Create .env file
    4. Install
      1. mongoose
      2. dotenv
      3. bcryptjs  //to keep our users/passwords secure
      4. express-async-handler
    5. Connect to MongoDB Atlas
    6. Use MongoDB instead of data.ts in apis
15. Register User
    1. Add Register api
    2. Add Register service method
    3. Add Register link
    4. Add Register Component
16. Loading!
    1. Add Image
    2. Add Component
    3. Add Service
    4. Add Interceptor
17. Checkout Page
    1. Create Order Model
    2. Create checkout page component
        1. Add to Router
    3. Add User to User service
    4. Add cart to cart service
    5. Create order items list component
    6. Adding Map To The Checkout Page
        1. Add Leaflet npm package
            1. Add @types/leaflet
            2. Add Css to angular.json
        2. Add AddressLatLng to Order Model
        3. Create Map component
            1. Add to checkout page
            2. Add TS
                1. Change app-map selector to map
            3. Add Html
            4. Add CSS
        4. Add Auth Guard
    7. Save Order
        1. Add Order Model
        2. Add Order Status Enum
        3. Add Auth Middleware
        4. Add Order Router
            1. Add create API
        5. Add Order Urls to urls.ts
        6. Add Order Service
            1. Add create Method
        7. Add Auth Interceptor
18. Payment Page
    1. Generate Component
    2. Add 'getOrderForCurrentUser' api
    3. Add Order service method
    4. Connect Component to service
    5. Make the map component readonly 


    
