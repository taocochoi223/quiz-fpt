/**
 * Ngân hàng 50 câu hỏi PRN232.
 */
const questions = [
  {
    "id": 1,
    "question": "In an HTTP request, what is the purpose of the Accept header?",
    "options": [
      { "key": "A", "text": "To specify the media type of the resource in the request body." },
      { "key": "B", "text": "To indicate which character sets are acceptable for the response." },
      { "key": "C", "text": "To inform the server about the media types that the client can understand." },
      { "key": "D", "text": "To provide authentication credentials." },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 2,
    "question": "Which of the following best describes a RESTful web service?",
    "options": [
      { "key": "A", "text": "A web service that uses SOAP for communication." },
      { "key": "B", "text": "A web service that adheres to the architectural principles of REST." },
      { "key": "C", "text": "A web service that only returns XML data." },
      { "key": "D", "text": "A web service that requires a specific client-side framework." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 3,
    "question": "The following C# code in a .NET creates an endpoint. What does it do?\n\napp.MapGet(\"/products/{id}\", (int id) => {\n  // Logic to find a product by id\n  return Results.Ok($\"Product {id}\");\n});",
    "options": [
      { "key": "A", "text": "It defines an endpoint that creates a new product." },
      { "key": "B", "text": "It defines an endpoint that retrieves a product by its ID using a POST request." },
      { "key": "C", "text": "It defines an endpoint that retrieves a product by its ID using a GET request." },
      { "key": "D", "text": "It defines an endpoint that deletes a product by its ID." },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 4,
    "question": "A controller action needs to return a \"Not Found\" response when a resource does not exist. Which of the following is the best way to achieve this?\n\n[HttpGet(\"{id}\")]\npublic ActionResult<Product> GetProduct(int id)\n{\n  var product = _productService.GetById(id);\n  if (product == null)\n  {\n    return ???; // What should be here?\n  }\n  return product;\n}",
    "options": [
      { "key": "A", "text": "Ok()" },
      { "key": "B", "text": "NotFound()" },
      { "key": "C", "text": "BadRequest()" },
      { "key": "D", "text": "NoContent()" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 5,
    "question": "What is the primary purpose of Swagger (OpenAPI) in an ASP.NET Core Web API?",
    "options": [
      { "key": "A", "text": "To provide a database management interface." },
      { "key": "B", "text": "To describe the capabilities of your API and provide interactive documentation." },
      { "key": "C", "text": "To automatically handle user authentication and authorization." },
      { "key": "D", "text": "To monitor the performance of the API in real-time." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 6,
    "question": "What is the purpose of Data Annotations (e.g., [Required], [StringLength]) on model properties in ASP.NET Core?",
    "options": [
      { "key": "A", "text": "To define the database connection string." },
      { "key": "B", "text": "To enforce validation rules for the model's data." },
      { "key": "C", "text": "To specify the controller that uses the model." },
      { "key": "D", "text": "To add comments to the code for documentation." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 7,
    "question": "What is the \"Repository Pattern\" commonly used for in ASP.NET Core data access?",
    "options": [
      { "key": "A", "text": "To automatically generate API documentation." },
      { "key": "B", "text": "To abstract the data access logic, making the application more modular and testable." },
      { "key": "C", "text": "To handle user authentication and authorization." },
      { "key": "D", "text": "To define the routing rules for API endpoints." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 8,
    "question": "What is the primary reason for using Data Transfer Objects (DTOs) in an API?",
    "options": [
      { "key": "A", "text": "To replace the need for a database." },
      { "key": "B", "text": "To shape data specifically for the client, preventing over-posting and under-posting, and decoupling the API from the database schema." },
      { "key": "C", "text": "To increase the performance of database queries." },
      { "key": "D", "text": "To enforce business logic and validation." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 9,
    "question": "What is the main benefit of using a library like AutoMapper?",
    "options": [
      { "key": "A", "text": "It automatically creates database tables from DTOs." },
      { "key": "B", "text": "It replaces the need for Dependency Injection." },
      { "key": "C", "text": "It automates the process of converting one object type to another (e.g., an Entity to a DTO), reducing boilerplate code." },
      { "key": "D", "text": "It provides an alternative to JSON for data serialization." },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 10,
    "question": "Which of the following is a well-formed XML document?",
    "options": [
      { "key": "A", "text": "<note>\n  <to>Tove</to>\n  <from>Jani</from>\n</note>" },
      { "key": "B", "text": "<note>\n  <to>Tove\n  <from>Jani</from>\n  </to>\n</note>" },
      { "key": "C", "text": "<note>\n  <to>Tove</to>\n  <from>Jani\n</note>" },
      { "key": "D", "text": "<note>\n  <to>Tove</from><from>Jani</to>\n</note>" },
    ],
    "correctAnswer": "A",
    "explanation": ""
  },
  {
    "id": 11,
    "question": "Which of the following is a valid JSON object?",
    "options": [
      { "key": "A", "text": "{ 'name': 'John Doe', \"age\": 30 }" },
      { "key": "B", "text": "{ name: \"John Doe\", age: 30 }" },
      { "key": "C", "text": "{ \"name\": \"John Doe\", \"age\": 30, }" },
      { "key": "D", "text": "{ \"name\": \"John Doe\", \"age\": 30 }" },
    ],
    "correctAnswer": "D",
    "explanation": ""
  },
  {
    "id": 12,
    "question": "In the ASP.NET Core Web API pipeline, what is the role of a media type formatter?",
    "options": [
      { "key": "A", "text": "To handle user authentication and authorization." },
      { "key": "B", "text": "To route incoming HTTP requests to the correct controller action." },
      { "key": "C", "text": "To serialize response data into a specific format (e.g., JSON, XML) and deserialize request data from a specific format." },
      { "key": "D", "text": "To log exceptions that occur during request processing." },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 13,
    "question": "What is serialization in the context of a Web API?",
    "options": [
      { "key": "A", "text": "The process of converting a .NET object into a format (like JSON or XML) that can be transmitted over the network." },
      { "key": "B", "text": "The process of converting a format (like JSON or XML) from a request into a .NET object." },
      { "key": "C", "text": "The process of handling requests in a specific, sequential order." },
      { "key": "D", "text": "The process of securing data before transmission." },
    ],
    "correctAnswer": "A",
    "explanation": ""
  },
  {
    "id": 14,
    "question": "What is a key difference in how web browsers and non-browser HTTP clients (like a C# HttpClient or Postman) typically set the Accept header?",
    "options": [
      { "key": "A", "text": "Non-browser clients never send an Accept header." },
      { "key": "B", "text": "Browsers often send a very broad Accept header (e.g., text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, /;q=0.8) because they can handle many types." },
      { "key": "C", "text": "Browsers only accept text/html." },
      { "key": "D", "text": "Non-browser clients are required to accept application/json only." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 15,
    "question": "What is the primary advantage of using attribute routing over conventional routing?",
    "options": [
      { "key": "A", "text": "It is the only way to define routes in minimal APIs." },
      { "key": "B", "text": "It keeps the route definition next to the action method that it maps to, improving locality and discoverability." },
      { "key": "C", "text": "It offers significantly better performance than conventional routing." },
      { "key": "D", "text": "It is required for enabling Swagger/OpenAPI documentation." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 16,
    "question": "For the route [HttpGet(\"users/{userId}/orders/{orderId}\")], what are userId and orderId?",
    "options": [
      { "key": "A", "text": "Query string parameters" },
      { "key": "B", "text": "Route parameters" },
      { "key": "C", "text": "Request headers" },
      { "key": "D", "text": "Form data fields" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 17,
    "question": "What is the fundamental role of a Model Binder in ASP.NET Core?",
    "options": [
      { "key": "A", "text": "To convert C# model objects into JSON or XML for the response." },
      { "key": "B", "text": "To create instances of C# objects by extracting data from an incoming HTTP request (e.g., from the route, query string, or body)." },
      { "key": "C", "text": "To bind a database model to a DbContext." },
      { "key": "D", "text": "To validate the properties of a model." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 18,
    "question": "What is \"binding source parameter inference\" in controllers marked with [ApiController]?",
    "options": [
      { "key": "A", "text": "The process of guessing the data types of action parameters." },
      { "key": "B", "text": "A feature where ASP.NET Core automatically applies binding source attributes ([FromRoute], [FromBody], etc.) based on conventions, reducing boilerplate code." },
      { "key": "C", "text": "The ability to infer validation rules from property names." },
      { "key": "D", "text": "A mechanism for the client to tell the server where to find data." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 19,
    "question": "To bind a parameter to a request header, which attribute is used?",
    "options": [
      { "key": "A", "text": "[FromHeader]" },
      { "key": "B", "text": "[FromHead]" },
      { "key": "C", "text": "[BindHeader]" },
      { "key": "D", "text": "[InHeader]" },
    ],
    "correctAnswer": "A",
    "explanation": ""
  },
  {
    "id": 20,
    "question": "In a controller decorated with [ApiController], what happens automatically if ModelState.IsValid is false?",
    "options": [
      { "key": "A", "text": "The action method still executes as normal." },
      { "key": "B", "text": "An HTTP 500 Internal Server Error is returned." },
      { "key": "C", "text": "The request is automatically rejected with an HTTP 400 Bad Request response containing details of the validation errors." },
      { "key": "D", "text": "The application logs the error and returns an HTTP 200 OK." },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 21,
    "question": "What is the primary purpose of the OData protocol?",
    "options": [
      { "key": "A", "text": "To define the visual layout of web pages." },
      { "key": "B", "text": "To provide a standardized, REST-based protocol for creating and consuming queryable and interoperable APIs." },
      { "key": "C", "text": "To replace the TCP/IP networking stack." },
      { "key": "D", "text": "To serve as a client-side JavaScript framework for building single-page applications." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 22,
    "question": "Which system query option is used to filter a collection of resources in an OData request?",
    "options": [
      { "key": "A", "text": "$select" },
      { "key": "B", "text": "$orderby" },
      { "key": "C", "text": "$filter" },
      { "key": "D", "text": "$top" },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 23,
    "question": "To delete a product with an ID of 123, which OData request is correct?",
    "options": [
      { "key": "A", "text": "POST /Products?$filter=Id eq 123" },
      { "key": "B", "text": "DELETE /Products(123)" },
      { "key": "C", "text": "GET /Products(123)?action=delete" },
      { "key": "D", "text": "REMOVE /Products/123" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 24,
    "question": "In OData, to retrieve a single Category entity and all of its related Product entities in one request, which query would you use?",
    "options": [
      { "key": "A", "text": "GET /Categories(1)?$select=Products" },
      { "key": "B", "text": "GET /Categories(1)?$expand=Products" },
      { "key": "C", "text": "GET /Categories(1)/Products" },
      { "key": "D", "text": "GET /Categories(1)/Products?$fetch=all" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 25,
    "question": "What is an \"Entity Set\"?",
    "options": [
      { "key": "A", "text": "The set of properties that make up an entity's key." },
      { "key": "B", "text": "A named collection of entities of a specific Entity Type, like Products being a collection of Product entities." },
      { "key": "C", "text": "The schema version of the data model." },
      { "key": "D", "text": "A set of validation rules for an entity." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 26,
    "question": "Why is it critical to always use HTTPS for RESTful APIs?",
    "options": [
      { "key": "A", "text": "It makes the API faster by compressing the data." },
      { "key": "B", "text": "It ensures that the data (including credentials and sensitive information) transferred between the client and server is encrypted and protected from eavesdropping." },
      { "key": "C", "text": "It is the only protocol that supports the GET and POST verbs." },
      { "key": "D", "text": "It automatically handles user authorization." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 27,
    "question": "Which of the following questions does \"Authentication\" answer?",
    "options": [
      { "key": "A", "text": "\"What can you do?\"" },
      { "key": "B", "text": "\"Who are you?\"" },
      { "key": "C", "text": "\"How long can you stay?\"" },
      { "key": "D", "text": "\"Where are you from?\"" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 28,
    "question": "In ASP.NET Core, where are authentication services typically registered?",
    "options": [
      { "key": "A", "text": "In the appsettings.json file." },
      { "key": "B", "text": "In the launchSettings.json file." },
      { "key": "C", "text": "In the Program.cs file, using builder.Services." },
      { "key": "D", "text": "Within a controller's constructor." },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 29,
    "question": "How do you restrict access to a controller action to only users in the \"Administrator\" role?",
    "options": [
      { "key": "A", "text": "[RequiresRole(\"Administrator\")]" },
      { "key": "B", "text": "[Authorize(Role = \"Administrator\")]" },
      { "key": "C", "text": "[Authorize(Roles = \"Administrator\")]" },
      { "key": "D", "text": "[Authorize(UserRole = \"Administrator\")]" },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 30,
    "question": "What is ASP.NET Core Identity?",
    "options": [
      { "key": "A", "text": "A simple interface for generating unique IDs." },
      { "key": "B", "text": "A membership system that provides services for user authentication and authorization, including user management, password hashing, and role management." },
      { "key": "C", "text": "A client-side library for managing user profiles." },
      { "key": "D", "text": "The default authentication scheme for Windows Authentication." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 31,
    "question": "A JWT consists of three parts separated by dots (.). What are they in the correct order?",
    "options": [
      { "key": "A", "text": "Header, Payload, Signature" },
      { "key": "B", "text": "Payload, Header, Signature" },
      { "key": "C", "text": "Signature, Header, Payload" },
      { "key": "D", "text": "Header, Signature, Body" },
    ],
    "correctAnswer": "A",
    "explanation": ""
  },
  {
    "id": 32,
    "question": "What is the fundamental syntax for selecting an HTML element and applying an action in jQuery?",
    "options": [
      { "key": "A", "text": "element.action()" },
      { "key": "B", "text": "$(selector).action()" },
      { "key": "C", "text": "jQuery(action).selector()" },
      { "key": "D", "text": "select(element).do(action)" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 33,
    "question": "In jQuery, what is the primary advantage of using the .on() method for event handling?",
    "options": [
      { "key": "A", "text": "It is shorter to type than .click()." },
      { "key": "B", "text": "It can attach event handlers to elements that do not yet exist in the DOM (event delegation)." },
      { "key": "C", "text": "It only works for mouse-related events." },
      { "key": "D", "text": "It prevents the default action of the event automatically." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 34,
    "question": "What does the \"asynchronous\" in AJAX mean?",
    "options": [
      { "key": "A", "text": "The code is guaranteed to execute in a specific, synchronous order." },
      { "key": "B", "text": "The web browser can continue to be responsive to the user while waiting for the server to send back a response." },
      { "key": "C", "text": "The server must respond to the request immediately." },
      { "key": "D", "text": "The data must be in XML format." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 35,
    "question": "Which of the following is a key feature of WCF?",
    "options": [
      { "key": "A", "text": "It only supports communication over HTTP." },
      { "key": "B", "text": "It unifies several older Microsoft communication technologies (like ASMX, .NET Remoting, MSMQ) into a single programming model." },
      { "key": "C", "text": "It is designed exclusively for building RESTful services." },
      { "key": "D", "text": "It can only be consumed by .NET clients." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 36,
    "question": "In WCF, which attribute is used to mark an interface as a service contract?",
    "options": [
      { "key": "A", "text": "[Service]" },
      { "key": "B", "text": "[WebContract]" },
      { "key": "C", "text": "[WcfContract]" },
      { "key": "D", "text": "[ServiceContract]" },
    ],
    "correctAnswer": "D",
    "explanation": ""
  },
  {
    "id": 37,
    "question": "Unlike traditional WCF hosted in IIS, a CoreWCF service is typically hosted:",
    "options": [
      { "key": "A", "text": "In a Windows Service only." },
      { "key": "B", "text": "Within an ASP.NET Core application as middleware." },
      { "key": "C", "text": "In a separate process managed by SvcUtil.exe." },
      { "key": "D", "text": "As a standalone executable that cannot be hosted in a web server." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 38,
    "question": "Which method call is used to add the necessary CoreWCF services to the dependency injection container in Program.cs?",
    "options": [
      { "key": "A", "text": "builder.Services.AddWcfServices();" },
      { "key": "B", "text": "builder.Services.AddServiceModelServices();" },
      { "key": "C", "text": "builder.Services.AddCoreWCF();" },
      { "key": "D", "text": "builder.Services.AddNetTcp();" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 39,
    "question": "What does the \"ABC\" of a WCF endpoint stand for?",
    "options": [
      { "key": "A", "text": "Action, Behavior, Contract" },
      { "key": "B", "text": "Address, Binding, Contract" },
      { "key": "C", "text": "Asynchronous, Buffered, Connection" },
      { "key": "D", "text": "Authentication, Authorization, Communication" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 40,
    "question": "What is a primary advantage of using Protocol Buffers (Protobuf) over JSON?",
    "options": [
      { "key": "A", "text": "Protobuf is a human-readable text format, making it easier to debug." },
      { "key": "B", "text": "Protobuf uses a binary serialization format, which is typically smaller and faster to parse than text-based JSON." },
      { "key": "C", "text": "Protobuf is natively supported by all web browsers without any libraries." },
      { "key": "D", "text": "Protobuf has a more flexible schema that can be changed by the client at will." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 41,
    "question": "What does gRPC stand for?",
    "options": [
      { "key": "A", "text": "Google RESTful Procedure Calls" },
      { "key": "B", "text": "gRPC Remote Procedure Calls (a recursive acronym)" },
      { "key": "C", "text": "General Routing and Procedure-Calling" },
      { "key": "D", "text": "Graph-based Procedure Calls" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 42,
    "question": "gRPC is built on top of which underlying transport protocol?",
    "options": [
      { "key": "A", "text": "TCP/IP directly" },
      { "key": "B", "text": "HTTP/1.1" },
      { "key": "C", "text": "UDP" },
      { "key": "D", "text": "HTTP/2" },
    ],
    "correctAnswer": "D",
    "explanation": ""
  },
  {
    "id": 43,
    "question": "In a bidirectional streaming call, when does the server wait for the client to send all its messages before sending its own?",
    "options": [
      { "key": "A", "text": "Always." },
      { "key": "B", "text": "Never; the client and server can read and write in any order, their streams operate independently." },
      { "key": "C", "text": "Only if the client explicitly signals it has finished writing." },
      { "key": "D", "text": "This is configured by the wait_for_client option in the .proto file." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 44,
    "question": "A key difference between gRPC and a typical RESTful HTTP API is:",
    "options": [
      { "key": "A", "text": "REST APIs are strictly-typed, while gRPC is loosely-typed." },
      { "key": "B", "text": "gRPC APIs are defined by a formal contract (.proto file), while REST APIs often rely on documentation (like OpenAPI) that is separate from the implementation." },
      { "key": "C", "text": "gRPC can only be used for internal, server-to-server communication." },
      { "key": "D", "text": "REST APIs support streaming, while gRPC does not." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 45,
    "question": "In which scenario is a traditional RESTful HTTP/JSON API a better fit than gRPC?",
    "options": [
      { "key": "A", "text": "When building a browser-based client application that needs to directly call the API without a proxy layer." },
      { "key": "B", "text": "For high-throughput, low-latency communication between microservices." },
      { "key": "C", "text": "When a strict, language-agnostic contract is required." },
      { "key": "D", "text": "When bi-directional streaming is a core requirement." },
    ],
    "correctAnswer": "A",
    "explanation": ""
  },
  {
    "id": 46,
    "question": "How do you create a gRPC client in a .NET 8 console application?\n\nvar client = new Greeter.GreeterClient(channel);",
    "options": [
      { "key": "A", "text": "var client = new HttpClient();" },
      { "key": "B", "text": "var channel = GrpcChannel.ForAddress(\"https://localhost:5001\");" },
      { "key": "C", "text": "var client = new Greeter.GreeterStub(\"https://localhost:5001\");" },
      { "key": "D", "text": "var client = GrpcClient.Create(\"https://localhost:5001\");" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 47,
    "question": "Which of the following is a key attribute of a microservice?",
    "options": [
      { "key": "A", "text": "It must be written in C#." },
      { "key": "B", "text": "It is independently deployable and scalable." },
      { "key": "C", "text": "It shares its database with many other services to ensure data consistency." },
      { "key": "D", "text": "It contains the logic for the entire application." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 48,
    "question": "What is a major drawback of using purely synchronous communication in a microservice architecture?",
    "options": [
      { "key": "A", "text": "It increases the loose coupling between services." },
      { "key": "B", "text": "It improves the overall fault tolerance of the system." },
      { "key": "C", "text": "It creates runtime coupling, meaning if a downstream service is slow or unavailable, the calling service may be blocked or fail." },
      { "key": "D", "text": "It is not supported by modern frameworks like ASP.NET Core." },
    ],
    "correctAnswer": "C",
    "explanation": ""
  },
  {
    "id": 49,
    "question": "In a typical microservice architecture, what is the role of an \"API Gateway\"?",
    "options": [
      { "key": "A", "text": "It is the database used by all microservices." },
      { "key": "B", "text": "It is a single entry point for all client requests, routing them to the appropriate downstream microservice and potentially handling cross-cutting concerns like authentication and SSL termination." },
      { "key": "C", "text": "It is a tool for developers to test their services locally." },
      { "key": "D", "text": "It is a message broker for asynchronous communication." },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": 50,
    "question": "To containerize an ASP.NET Core microservice for deployment, what technology is most commonly used?",
    "options": [
      { "key": "A", "text": "Virtual Machines (VMs)" },
      { "key": "B", "text": "Docker" },
      { "key": "C", "text": "WebDeploy" },
      { "key": "D", "text": "FTP" },
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
];
