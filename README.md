## Description

This application is a replica of the well-known Ukrainian online marketplace, Rozetka. The front-end, developed using Angular, is seamlessly integrated with a custom Express backend. Data is stored in a MongoDB database, encompassing six categories and a catalog of 142 products.

## Key Features

- Authentication System: The application employs a robust JWT token-based authentication system.
- Form Validation: Form fields for both registration and authorization undergo validation, ensuring a secure and reliable user experience. This validation closely mirrors that of the Rozetka marketplace website.
- User Cabinet: Authorized users have access to a personalized cabinet, which includes: 
1. Information about products marked as desired.
2. A history of viewed products.
3. A list of ordered products.
- Shopping Cart: The application features a fully functional shopping cart for a seamless shopping experience.
- User Interaction: Authorized users can actively engage with the platform by:
1. Creating product comments.
2. Liking and disliking other users' comments.
- Route Structure: The application's routes are meticulously structured to mirror the navigation of the Rozetka website, providing users with a familiar browsing experience.

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
