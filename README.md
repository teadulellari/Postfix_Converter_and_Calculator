# Postfix Converter and Calculator

This program convert an infix expression into a postfix expression using Sunting Yard Algorithm. It also has the feature to calculate the value of the expression. The infix can be a basic arithmetic expression or a complex one including decimal numbers, variables etc.

## Installation

### Prerequisites

Before you begin, ensure you install the  necessary dependencies in the project :

- [Node.js](https://nodejs.org/): This program is built using Node.js. You'll need to have Node.js installed on your system to run it.
- [Nodemon](https://www.npmjs.com/package/nodemon): nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [Express.js](https://expressjs.com/): Express.js is a web application framework for Node.js and is a core dependency of this program.
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc): This library is used to generate Swagger/OpenAPI documentation from your Express.js routes and comments.
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): This library provides a user-friendly interface for viewing and interacting with Swagger/OpenAPI documentation.
- [jest](https://jestjs.io/docs/getting-started): is a popular JavaScript testing framework commonly used for unit and integration testing. It's an integral part of our project's testing process, ensuring the reliability and correctness of the codebase.

### Installation

To obtain the source code, you can clone the GitHub repository using the following command:
```bash
git clone https://github.com/teadulellari/shunting_yard_algorithm
```
1. Navigate to the project directory:

```bash
cd server
```
2. Install the required Node.js packages and dependencies using npm:
```bash
npm install <the dependencies mentioned above>
```
3. Before running the program, you may need to configure it. Review the configuration files, such as config.js, and make any necessary adjustments.

4. To start the program, use the following command:
```bash
nodemon server
```
Like this, the program is up and running.

## API Documentation

### Swagger/OpenAPI Documentation

Our API is documented using Swagger/OpenAPI, which provides a clear and interactive interface for exploring the available endpoints and making API requests. Follow these steps to access and use the documentation:

1. **Start the Program**: Make sure you have followed the installation instructions to set up and run the program. The Swagger documentation is usually available when the program is running.

2. **Access the Documentation**: Open a web browser and navigate to the following URL:
```bash
http://localhost:3001/api-docs/#/
```
3. **Explore the API**: The Swagger documentation provides a user-friendly interface where you can explore available endpoints, view request and response examples, and even test API requests directly from the documentation.

4. **Make API Requests**: To test an API endpoint, click on the endpoint in the Swagger documentation. You can then use the "Try it out" feature to make requests and see the responses. The documentation will provide you with input fields and response details for each endpoint.

## Testing

### Running Tests

To ensure that the program functions correctly and that new changes do not introduce regressions, we have included a suite of tests. You can run these tests locally by following these steps:

1. **Navigate to the Project Directory**:

 ```bash
   cd server
```
2. **Run the tests**:

 ```bash
   npm test
 ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author
Tea Tosun

