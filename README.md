## Description

This application is a replica of the well-known Ukrainian online marketplace, Rozetka. The front-end, developed using Angular, is seamlessly integrated with a custom Express backend. Data is stored in a MongoDB database, encompassing six categories and a catalog of 142 products. The application boasts a self-developed carousel component and various types of modal dialogs to facilitate user interactions and improve overall usability. The design of components is based on Angular Material Design, providing a modern and user-friendly interface. The application has both mobile and desktop versions that adhere to the design of the Rozetka website.

## Key Features

1. **Authentication System:**
   - The application employs a robust JWT token-based authentication system. Users have the option to register through their Google accounts.
2. **Form Validation:**
   - Form fields for both registration and authorization undergo validation, ensuring a secure and reliable user experience. This validation closely mirrors that of the Rozetka marketplace website.
3. **User Cabinet:**
   - Authorized users have access to a personalized cabinet, which includes:
      - Information about products marked as desired.
      - A history of viewed products.
      - A list of ordered products.
4. **Shopping Cart:**
   - The application features a fully functional shopping cart for a seamless shopping experience.
5. **User Interaction:**
   - Authorized users can actively engage with the platform by:
      - Creating product comments.
      - Liking and disliking other users' comments.

## Technologies Used

-   Angular v.16
-   angular-router
-   server side rendering (Angular Universal)
-   angular-material
-   angular-forms

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. Run `ng serve:ssr` for server side rendering.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
