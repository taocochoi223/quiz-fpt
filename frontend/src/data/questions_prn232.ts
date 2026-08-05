import { Question } from "@/lib/types";

/**
 * Ngân hàng 50 câu hỏi PRN232.
 */
export const questions: Question[] = [
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
    "explanation": "Header 'Accept' được client gửi đi để nói cho server biết client có thể hiểu và xử lý được loại dữ liệu (media type) nào (ví dụ: application/json, text/html)."
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
    "explanation": "RESTful web service là một dịch vụ web được thiết kế tuân thủ chặt chẽ các nguyên tắc và ràng buộc của kiến trúc REST (như stateless, uniform interface, client-server)."
  },
  {
    "id": 3,
    "question": "The following C# code in a .NET creates an endpoint. What does it do?\n\n```csharp\napp.MapGet(\"/products/{id}\", (int id) => {\n  // Logic to find a product by id\n  return Results.Ok($\"Product {id}\");\n});\n```",
    "options": [
      { "key": "A", "text": "It defines an endpoint that creates a new product." },
      { "key": "B", "text": "It defines an endpoint that retrieves a product by its ID using a POST request." },
      { "key": "C", "text": "It defines an endpoint that retrieves a product by its ID using a GET request." },
      { "key": "D", "text": "It defines an endpoint that deletes a product by its ID." },
    ],
    "correctAnswer": "C",
    "explanation": "Phương thức `app.MapGet` trong ASP.NET Core Minimal API được sử dụng để định nghĩa một endpoint xử lý các request HTTP GET."
  },
  {
    "id": 4,
    "question": "A controller action needs to return a \"Not Found\" response when a resource does not exist. Which of the following is the best way to achieve this?\n\n```csharp\n[HttpGet(\"{id}\")]\npublic ActionResult<Product> GetProduct(int id)\n{\n  var product = _productService.GetById(id);\n  if (product == null)\n  {\n    return ???; // What should be here?\n  }\n  return product;\n}\n```",
    "options": [
      { "key": "A", "text": "Ok()" },
      { "key": "B", "text": "NotFound()" },
      { "key": "C", "text": "BadRequest()" },
      { "key": "D", "text": "NoContent()" },
    ],
    "correctAnswer": "B",
    "explanation": "Phương thức `NotFound()` trả về mã trạng thái HTTP 404 (Not Found), là cách chuẩn xác nhất để báo cho client biết tài nguyên yêu cầu không tồn tại."
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
    "explanation": "Swagger (OpenAPI) là công cụ giúp tự động tạo tài liệu API tương tác, cho phép các lập trình viên (cả frontend và backend) dễ dàng xem và thử nghiệm các endpoint."
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
    "explanation": "Data Annotations (ví dụ: [Required], [MaxLength]) được dùng để định nghĩa các quy tắc xác thực (validation) dữ liệu ngay trên thuộc tính của model."
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
    "explanation": "Repository Pattern tạo ra một lớp trừu tượng (abstraction) giữa tầng logic nghiệp vụ và tầng truy cập dữ liệu, giúp code dễ bảo trì, module hóa và dễ viết Unit Test hơn."
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
    "explanation": "DTOs (Data Transfer Objects) giúp định hình chính xác dữ liệu gửi/nhận, ngăn chặn lỗi over-posting (gửi thừa dữ liệu nhạy cảm) và tách biệt API khỏi cấu trúc database."
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
    "explanation": "AutoMapper là thư viện giúp tự động ánh xạ (map) dữ liệu từ object này sang object khác (thường là từ Entity sang DTO và ngược lại), giúp giảm thiểu code lặp lại."
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
    "explanation": "XML hợp lệ (well-formed) yêu cầu các thẻ phải được đóng đúng thứ tự và lồng nhau chính xác. Chỉ có phương án A tuân thủ đúng quy tắc mở/đóng thẻ."
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
    "explanation": "Trong chuẩn JSON, cả key (tên thuộc tính) và value (nếu là chuỗi) đều bắt buộc phải được đặt trong dấu ngoặc kép (double quotes). Không được có dấu phẩy ở cuối."
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
    "explanation": "Media type formatter chịu trách nhiệm chuyển đổi (serialize) object C# thành định dạng JSON/XML để gửi đi, và ngược lại (deserialize) từ JSON/XML sang object C# khi nhận request."
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
    "explanation": "Serialization (Tuần tự hóa) là quá trình chuyển đổi một đối tượng (object) trong bộ nhớ thành một định dạng (như JSON, XML, binary) để có thể lưu trữ hoặc truyền qua mạng."
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
    "explanation": "Trình duyệt web thường gửi header 'Accept' rất rộng (chấp nhận nhiều loại dữ liệu) vì chúng được thiết kế để xử lý HTML, hình ảnh, CSS, JS... Trong khi API client thường chỉ định rõ 'application/json'."
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
    "explanation": "Attribute routing cho phép bạn đặt định nghĩa route (ví dụ: [HttpGet('api/items')]) ngay trên method xử lý, giúp code dễ đọc, dễ tìm kiếm và quản lý hơn so với cấu hình route tập trung."
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
    "explanation": "Trong route 'users/{userId}/orders/{orderId}', {userId} và {orderId} là các route parameters (tham số đường dẫn), được trích xuất trực tiếp từ URL."
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
    "explanation": "Model Binder tự động trích xuất dữ liệu từ HTTP request (từ URL, query string, header, body) và chuyển đổi thành các tham số đối tượng C# cho action method."
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
    "explanation": "Attribute [ApiController] kích hoạt tính năng tự động suy luận nguồn binding. Nó tự biết tham số nào lấy từ body, tham số nào lấy từ route hoặc query string mà không cần bạn phải khai báo rõ."
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
    "explanation": "Attribute [FromHeader] được sử dụng để chỉ định rằng giá trị của tham số action method sẽ được lấy từ một HTTP request header tương ứng."
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
    "explanation": "Với [ApiController], nếu dữ liệu gửi lên không hợp lệ (ModelState.IsValid = false), ASP.NET Core sẽ tự động chặn request và trả về lỗi 400 Bad Request kèm chi tiết lỗi mà không cần chạy vào code của bạn."
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
    "explanation": "OData (Open Data Protocol) là một giao thức chuẩn RESTful giúp tạo và tiêu thụ các API có khả năng truy vấn dữ liệu mạnh mẽ (lọc, sắp xếp, phân trang) một cách chuẩn hóa."
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
    "explanation": "Trong OData, query option `$filter` được sử dụng để lọc danh sách các tài nguyên dựa trên một hoặc nhiều điều kiện."
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
    "explanation": "Theo chuẩn URL của OData, để truy cập hoặc thao tác trên một entity cụ thể bằng khóa chính (key), ta đặt khóa trong dấu ngoặc đơn. Việc xóa dùng method DELETE trên endpoint đó."
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
    "explanation": "Query option `$expand` trong OData yêu cầu server trả về không chỉ entity hiện tại mà còn đính kèm (include) cả các entity có quan hệ (related entities) trong cùng một request."
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
    "explanation": "Trong mô hình OData, Entity Set là một bộ sưu tập (collection) chứa các entity cùng loại. Ví dụ: 'Products' là một Entity Set chứa nhiều entity 'Product'."
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
    "explanation": "HTTPS mã hóa toàn bộ dữ liệu truyền tải giữa client và server (bao gồm URL, headers, body). Điều này cực kỳ quan trọng để bảo vệ thông tin nhạy cảm (như token, mật khẩu) khỏi bị đánh cắp (eavesdropping)."
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
    "explanation": "Authentication (Xác thực) là quá trình kiểm tra danh tính của người dùng để trả lời câu hỏi 'Bạn là ai?'. Phân biệt với Authorization (Phân quyền) là 'Bạn được phép làm gì?'."
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
    "explanation": "Trong .NET Core (từ bản 6 trở lên), các dịch vụ (services) bao gồm cả Authentication được đăng ký vào Dependency Injection container thông qua `builder.Services` trong file Program.cs."
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
    "explanation": "Để phân quyền theo Role, ta sử dụng attribute `[Authorize]` với tham số `Roles`. Ví dụ: `[Authorize(Roles = \"Administrator\")]`."
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
    "explanation": "ASP.NET Core Identity là một framework toàn diện (membership system) cung cấp sẵn các chức năng quản lý user, role, băm mật khẩu, xác thực 2 bước, v.v."
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
    "explanation": "Cấu trúc của một JSON Web Token (JWT) luôn bao gồm 3 phần được phân tách bằng dấu chấm (.), theo thứ tự: Header (thông tin thuật toán), Payload (dữ liệu/claims), và Signature (chữ ký bảo mật)."
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
    "explanation": "Cú pháp cơ bản nhất của jQuery luôn bắt đầu bằng ký hiệu đô la `$`, tiếp theo là bộ chọn (selector) trong ngoặc đơn, và cuối cùng là phương thức (action): `$(selector).action()`."
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
    "explanation": "Phương thức `.on()` trong jQuery cho phép 'event delegation' - nghĩa là bạn có thể gắn sự kiện cho một phần tử cha để lắng nghe sự kiện từ các phần tử con, kể cả những phần tử con được tạo ra sau này (động)."
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
    "explanation": "Chữ 'Asynchronous' (Bất đồng bộ) trong AJAX có nghĩa là trình duyệt sẽ gửi request ngầm và vẫn tiếp tục hoạt động bình thường, không bị 'đơ' hay phải tải lại toàn bộ trang trong lúc chờ server trả lời."
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
    "explanation": "WCF (Windows Communication Foundation) được Microsoft tạo ra để hợp nhất nhiều công nghệ giao tiếp cũ (như Web Services ASMX, .NET Remoting, MSMQ) vào chung một mô hình lập trình duy nhất."
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
    "explanation": "Trong WCF, một interface được đánh dấu là hợp đồng dịch vụ (service contract) bằng cách sử dụng attribute `[ServiceContract]`."
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
    "explanation": "CoreWCF là bản port của WCF sang .NET Core/.NET 5+. Khác với WCF cũ thường chạy trên IIS, CoreWCF được tích hợp và chạy như một middleware bên trong ứng dụng ASP.NET Core."
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
    "explanation": "Trong CoreWCF, phương thức `builder.Services.AddServiceModelServices()` được gọi trong Program.cs để đăng ký các dịch vụ cốt lõi của WCF vào DI container."
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
    "explanation": "Mọi endpoint trong WCF đều phải định nghĩa bộ 3 ABC: Address (địa chỉ ở đâu), Binding (giao tiếp bằng giao thức gì), và Contract (cung cấp các phương thức gì)."
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
    "explanation": "Protocol Buffers (Protobuf) là định dạng tuần tự hóa dạng nhị phân (binary). So với JSON (dạng text), Protobuf nhỏ gọn hơn rất nhiều và phân tích cú pháp cực kỳ nhanh."
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
    "explanation": "Theo tài liệu chính thức, gRPC là chữ viết tắt đệ quy (recursive acronym) của 'gRPC Remote Procedure Calls' (chữ 'g' thay đổi ý nghĩa theo từng phiên bản)."
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
    "explanation": "gRPC bắt buộc phải chạy trên nền tảng giao thức HTTP/2, điều này giúp nó tận dụng được các tính năng như multiplexing, nén header, và luồng dữ liệu 2 chiều (bidirectional streaming)."
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
    "explanation": "Trong Bidirectional Streaming của gRPC, hai luồng đọc/ghi hoạt động hoàn toàn độc lập. Client và Server có thể đọc và ghi tin nhắn theo bất kỳ thứ tự nào mà không cần chờ đợi nhau."
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
    "explanation": "gRPC sử dụng hợp đồng API cực kỳ chặt chẽ (định nghĩa trong file .proto), mã nguồn tự động được sinh ra từ hợp đồng này. REST API thì linh hoạt hơn nhưng lại dễ xảy ra sai sót nếu tài liệu không khớp với code."
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
    "explanation": "Trình duyệt web hiện tại không hỗ trợ trực tiếp gRPC trên HTTP/2. Do đó, để gọi gRPC từ browser, bạn phải dùng gRPC-Web (cần proxy). REST/JSON vẫn là lựa chọn tự nhiên và tối ưu nhất cho web client trực tiếp."
  },
  {
    "id": 46,
    "question": "How do you create a gRPC client in a .NET 8 console application?\n\n```csharp\nvar client = new Greeter.GreeterClient(channel);\n```",
    "options": [
      { "key": "A", "text": "var client = new HttpClient();" },
      { "key": "B", "text": "var channel = GrpcChannel.ForAddress(\"https://localhost:5001\");" },
      { "key": "C", "text": "var client = new Greeter.GreeterStub(\"https://localhost:5001\");" },
      { "key": "D", "text": "var client = GrpcClient.Create(\"https://localhost:5001\");" },
    ],
    "correctAnswer": "B",
    "explanation": "Để tạo một client gRPC, trước tiên bạn cần tạo một kênh kết nối bằng `GrpcChannel.ForAddress()`, sau đó truyền kênh này vào hàm khởi tạo của Client class (đã được sinh ra tự động từ file .proto)."
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
    "explanation": "Một đặc điểm cốt lõi của Microservices là mỗi service phải có khả năng được triển khai (deploy) và mở rộng (scale) hoàn toàn độc lập với các service khác."
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
    "explanation": "Giao tiếp đồng bộ (như gọi trực tiếp HTTP/REST giữa các service) tạo ra sự phụ thuộc chặt chẽ về thời gian chạy (runtime coupling). Nếu service B bị chậm hoặc chết, service A gọi nó cũng sẽ bị treo theo."
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
    "explanation": "API Gateway đóng vai trò như một cửa ngõ duy nhất (single entry point). Mọi request từ client sẽ đi qua Gateway, tại đây Gateway sẽ định tuyến đến đúng microservice, đồng thời xử lý các việc chung như xác thực, giới hạn tốc độ (rate limiting)."
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
    "explanation": "Docker là công nghệ phổ biến nhất hiện nay để đóng gói (containerize) ứng dụng (như microservice) cùng với toàn bộ môi trường chạy của nó, đảm bảo ứng dụng có thể chạy nhất quán trên mọi hệ thống."
  },
];


export const questions_paper2: Question[] = [
  {
    id: 51,
    question: "What is the fundamental syntax for selecting an HTML element and applying an action in jQuery?",
    options: [
      {
        key: "A",
        text: "element.action()"
      },
      {
        key: "B",
        text: "$(selector).action()"
      },
      {
        key: "C",
        text: "jQuery(action).selector()"
      },
      {
        key: "D",
        text: "select(element).do(action)"
      }
    ],
    correctAnswer: "B",
    explanation: "Trong jQuery, cú pháp cơ bản để chọn phần tử là $(selector), sau đó gọi hàm hành động action()."
  },
  {
    id: 52,
    question: "How would you access a query string parameter named sort in a controller action?",
    options: [
      {
        key: "A",
        text: "[HttpGet] public IActionResult Get([FromRoute] string sort) { /.../ }"
      },
      {
        key: "B",
        text: "[HttpGet] public IActionResult Get([FromBody] string sort) { /.../ }"
      },
      {
        key: "C",
        text: "[HttpGet] public IActionResult Get([FromHeader] string sort) { /.../ }"
      },
      {
        key: "D",
        text: "[HttpGet] public IActionResult Get([FromQuery] string sort) { /.../ }"
      }
    ],
    correctAnswer: "D",
    explanation: "Để lấy giá trị tham số từ query string trong ASP.NET Core Web API, sử dụng attribute [FromQuery]."
  },
  {
    id: 53,
    question: "gRPC's support for long-lived streaming is made possible primarily by which HTTP/2 feature?",
    options: [
      {
        key: "A",
        text: "Server Push"
      },
      {
        key: "B",
        text: "Header Compression"
      },
      {
        key: "C",
        text: "Binary Framing"
      },
      {
        key: "D",
        text: "Bi-directional streams"
      }
    ],
    correctAnswer: "D",
    explanation: "gRPC sử dụng HTTP/2, hỗ trợ Bi-directional streams (luồng hai chiều), cho phép kết nối streaming lâu dài."
  },
  {
    id: 54,
    question: "How do you create a gRPC client in a .NET 8 console application?",
    options: [
      {
        key: "A",
        text: "var client = new HttpClient();"
      },
      {
        key: "B",
        text: "var channel = GrpcChannel.ForAddress(\"https://localhost:5001\");\nvar client = new Greeter.GreeterClient(channel);"
      },
      {
        key: "C",
        text: "var client = new Greeter.GreeterStub(\"https://localhost:5001\");"
      },
      {
        key: "D",
        text: "var client = GrpcClient.Create<GreeterClient>(\"https://localhost:5001\");"
      }
    ],
    correctAnswer: "B",
    explanation: "Trong .NET, tạo gRPC client bằng cách dùng GrpcChannel.ForAddress để tạo kênh, sau đó khởi tạo Client từ kênh đó."
  },
  {
    id: 55,
    question: "Which of the following questions does \"Authentication\" answer?",
    options: [
      {
        key: "A",
        text: "\"What can you do?\""
      },
      {
        key: "B",
        text: "\"Who are you?\""
      },
      {
        key: "C",
        text: "\"How long can you stay?\""
      },
      {
        key: "D",
        text: "\"Where are you from?\""
      }
    ],
    correctAnswer: "B",
    explanation: "Authentication (Xác thực) nhằm trả lời câu hỏi 'Who are you?' (Bạn là ai?), phân biệt với Authorization (Bạn được làm gì)."
  },
  {
    id: 56,
    question: "Consider this simple CoreWCF service contract for a .NET 9 application:\n```csharp\n[ServiceContract]\npublic interface IGreeterService\n{\n[OperationContract]\nstring Greet(string name);\n}\n```\nWhich part defines what the service does?",
    options: [
      {
        key: "A",
        text: "[ServiceContract]"
      },
      {
        key: "B",
        text: "public interface IGreeterService"
      },
      {
        key: "C",
        text: "[OperationContract]"
      },
      {
        key: "D",
        text: "string Greet(string name);"
      }
    ],
    correctAnswer: "C",
    explanation: "Attribute [OperationContract] được dùng để định nghĩa một phương thức (hành động) cụ thể mà dịch vụ sẽ cung cấp."
  },
  {
    id: 57,
    question: "What is the fundamental concept of \"Code-First\" development in Entity Framework Core?",
    options: [
      {
        key: "A",
        text: "You design the database schema first, and then EF Core generates the C# model classes."
      },
      {
        key: "B",
        text: "You write the API endpoints first, which then dictates the model and database structure."
      },
      {
        key: "C",
        text: "You define your data models as C# classes, and EF Core creates or updates the database schema to match them."
      },
      {
        key: "D",
        text: "You write raw SQL scripts first for all data operations."
      }
    ],
    correctAnswer: "C",
    explanation: "Code-First trong EF Core là phương pháp viết các class C# trước, sau đó EF Core sẽ tự sinh ra schema trong database tương ứng."
  },
  {
    id: 58,
    question: "Which system query option is used to filter a collection of resources in an OData request?",
    options: [
      {
        key: "A",
        text: "$select"
      },
      {
        key: "B",
        text: "$orderby"
      },
      {
        key: "C",
        text: "$filter"
      },
      {
        key: "D",
        text: "$top"
      }
    ],
    correctAnswer: "C",
    explanation: "Query option $filter trong OData được dùng để lọc danh sách các tài nguyên theo một điều kiện cụ thể."
  },
  {
    id: 59,
    question: "What is the purpose of the $expand query option?",
    options: [
      {
        key: "A",
        text: "To retrieve the next page of results in a paged collection."
      },
      {
        key: "B",
        text: "To include related entities in the same response."
      },
      {
        key: "C",
        text: "To get a count of all entities in a collection."
      },
      {
        key: "D",
        text: "To expand all properties of an entity instead of a subset."
      }
    ],
    correctAnswer: "B",
    explanation: "Query option $expand trong OData được dùng để lấy kèm luôn các entity có quan hệ (related entities) trong cùng một response."
  },
  {
    id: 60,
    question: "What does the \"asynchronous\" in AJAX mean?",
    options: [
      {
        key: "A",
        text: "The code is guaranteed to execute in a specific, synchronous order."
      },
      {
        key: "B",
        text: "The web browser can continue to be responsive to the user while waiting for the server to send back a response."
      },
      {
        key: "C",
        text: "The server must respond to the request immediately."
      },
      {
        key: "D",
        text: "The data must be in XML format."
      }
    ],
    correctAnswer: "B",
    explanation: "Bất đồng bộ (asynchronous) trong AJAX có nghĩa là trình duyệt không bị treo, người dùng vẫn có thể thao tác trong khi chờ server phản hồi."
  },
  {
    id: 61,
    question: "What is \"binding source parameter inference' in controllers marked with [ApiController]?",
    options: [
      {
        key: "A",
        text: "The process of guessing the data types of action parameters."
      },
      {
        key: "B",
        text: "A feature where ASP.NET Core automatically applies binding source attributes ([FromRoute], [FromBody], etc.) based on conventions, reducing boilerplate code."
      },
      {
        key: "C",
        text: "The ability to infer validation rules from property names."
      },
      {
        key: "D",
        text: "A mechanism for the client to tell the server where to find data."
      }
    ],
    correctAnswer: "B",
    explanation: "Trong controller dùng [ApiController], ASP.NET Core sẽ tự động suy luận nguồn dữ liệu (từ Route, Body, Query) dựa trên quy ước (conventions)."
  },
  {
    id: 62,
    question: "If a client sends an Accept header with application/json; q=0.9, application/xml; q=1.0, what is it indicating?",
    options: [
      {
        key: "A",
        text: "It can only accept JSON."
      },
      {
        key: "B",
        text: "It prefers XML (q=1.0) over JSON (q=0.9)."
      },
      {
        key: "C",
        text: "It can only accept XML."
      },
      {
        key: "D",
        text: "It wants the response to be split between JSON and XML."
      }
    ],
    correctAnswer: "B",
    explanation: "Header Accept với q=1.0 cho XML và q=0.9 cho JSON báo hiệu client ưu tiên nhận XML hơn JSON."
  },
  {
    id: 63,
    question: "What is Content Negotiation in ASP.NET Core Web API?",
    options: [
      {
        key: "A",
        text: "The process where the client and server agree on which controller action to invoke."
      },
      {
        key: "B",
        text: "The process where the server selects the best representation (e.g., JSON or XML) for a response based on the client's Accept header."
      },
      {
        key: "C",
        text: "The process of negotiating security credentials."
      },
      {
        key: "D",
        text: "The process where the client specifies which data it wants to post using the Content-Type header."
      }
    ],
    correctAnswer: "B",
    explanation: "Content Negotiation là quá trình server chọn ra định dạng dữ liệu trả về tốt nhất (như JSON hay XML) dựa trên header Accept của client."
  },
  {
    id: 64,
    question: "Which communication protocol is often chosen for high-performance, internal, service-to-service communication due to its use of HTTP/2 and binary serialization?",
    options: [
      {
        key: "A",
        text: "SOAP"
      },
      {
        key: "B",
        text: "REST over HTTP/1.1 with JSON"
      },
      {
        key: "C",
        text: "gRPC"
      },
      {
        key: "D",
        text: "FTP"
      }
    ],
    correctAnswer: "C",
    explanation: "gRPC là giao thức tối ưu cao cho việc giao tiếp giữa các service nội bộ nhờ dùng HTTP/2 và định dạng nhị phân (Protobuf)."
  },
  {
    id: 65,
    question: "To allow access to users who are in either the \"Manager\" role or the \"Supervisor\" role, what is the correct syntax?",
    options: [
      {
        key: "A",
        text: "[Authorize(Roles = \"Manager\", \"Supervisor\")]"
      },
      {
        key: "B",
        text: "[Authorize(Roles = \"Manager\")] [Authorize(Roles = \"Supervisor\")]"
      },
      {
        key: "C",
        text: "[Authorize(Roles = \"Manager or Supervisor\")]"
      },
      {
        key: "D",
        text: "[Authorize(Roles = \"Manager,Supervisor\")]"
      }
    ],
    correctAnswer: "D",
    explanation: "Để cho phép user có role Manager HOẶC Supervisor, cú pháp đúng là [Authorize(Roles = \"Manager,Supervisor\")]."
  },
  {
    id: 66,
    question: "What is the primary purpose of the HTTP protocol?",
    options: [
      {
        key: "A",
        text: "To securely encrypt data transmissions."
      },
      {
        key: "B",
        text: "To transfer hypertext documents across the internet."
      },
      {
        key: "C",
        text: "To manage and query databases."
      },
      {
        key: "D",
        text: "To define the structure of a web page."
      }
    ],
    correctAnswer: "B",
    explanation: "Mục đích cốt lõi của HTTP (HyperText Transfer Protocol) là truyền tải các tài liệu siêu văn bản (như HTML) qua Internet."
  },
  {
    id: 67,
    question: "Why is it critical to always use HTTPS for RESTful APIs?",
    options: [
      {
        key: "A",
        text: "It makes the API faster by compressing the data."
      },
      {
        key: "B",
        text: "It ensures that the data (including credentials and sensitive information) transferred between the client and server\nis encrypted and protected from eavesdropping."
      },
      {
        key: "C",
        text: "It is the only protocol that supports the GET and POST verbs."
      },
      {
        key: "D",
        text: "It automatically handles user authorization."
      }
    ],
    correctAnswer: "B",
    explanation: "Luôn cần HTTPS cho REST API vì nó mã hóa dữ liệu truyền tải, bảo vệ thông tin nhạy cảm và credentials khỏi bị nghe lén."
  },
  {
    id: 68,
    question: "Which data types are supported in JSON?",
    options: [
      {
        key: "A",
        text: "String, Number, Boolean, Array, Object, null"
      },
      {
        key: "B",
        text: "String, Integer, Float, Date, Array, Hashtable"
      },
      {
        key: "C",
        text: "Text, Decimal, Bit, List, Dictionary, null"
      },
      {
        key: "D",
        text: "Varchar, Number, Boolean, Collection, Object, undefined"
      }
    ],
    correctAnswer: "A",
    explanation: "Các kiểu dữ liệu chuẩn của JSON bao gồm: String, Number, Boolean, Array, Object và null."
  },
  {
    id: 69,
    question: "Which of the following is a simple representation of a Model class in C# for an ASP.NET Core application?",
    options: [
      {
        key: "A",
        text: "A static class with methods for rendering HTML."
      },
      {
        key: "B",
        text: "An interface defining controller actions."
      },
      {
        key: "C",
        text: "A class with properties representing data, often called a POCO (Plain Old CLR Object)."
      },
      {
        key: "D",
        text: "An attribute used for routing."
      }
    ],
    correctAnswer: "C",
    explanation: "Trong ASP.NET Core, Model class thường được biểu diễn đơn giản qua một class chứa các property, thường gọi là POCO."
  },
  {
    id: 70,
    question: "Which selector targets the first paragraph element (<p>) on the page?",
    options: [
      {
        key: "A",
        text: "$(\"p:first-child\")"
      },
      {
        key: "B",
        text: "$(\"p:first\")"
      },
      {
        key: "C",
        text: "$(\"p:first-of-type\")"
      },
      {
        key: "D",
        text: "All of the above could potentially work depending on the HTML structure."
      }
    ],
    correctAnswer: "B",
    explanation: "Trong jQuery, selector $('p:first') sẽ nhắm đến thẻ <p> đầu tiên xuất hiện trên trang."
  },
  {
    id: 71,
    question: "The following C# code in a .NET creates an endpoint. What does it do?\n```csharp\napp.MapGet(\"/products/{id)\", (int id=>{\n// Logic to find a product by id\nreturn Results.Ok($\"Product {id}\");\n});\n```",
    options: [
      {
        key: "A",
        text: "It defines an endpoint that creates a new product."
      },
      {
        key: "B",
        text: "It defines an endpoint that retrieves a product by its ID using a POST request."
      },
      {
        key: "C",
        text: "It defines an endpoint that retrieves a product by its ID using a GET request."
      },
      {
        key: "D",
        text: "It defines an endpoint that deletes a product by its ID."
      }
    ],
    correctAnswer: "C",
    explanation: "app.MapGet định nghĩa một endpoint xử lý HTTP GET request để lấy sản phẩm dựa trên tham số ID."
  },
  {
    id: 72,
    question: "What is the opposite of a microservices architecture?",
    options: [
      {
        key: "A",
        text: "A serverless architecture"
      },
      {
        key: "B",
        text: "A monolithic architecture"
      },
      {
        key: "C",
        text: "A service-oriented architecture (SOA)"
      },
      {
        key: "D",
        text: "A distributed architecture"
      }
    ],
    correctAnswer: "B",
    explanation: "Monolithic architecture (Kiến trúc nguyên khối) là kiến trúc trái ngược với Microservices (chia nhỏ thành nhiều dịch vụ)."
  },
  {
    id: 73,
    question: "The following .NET 8 code is in Program.cs. What is its purpose?\n```csharp\nvar app = builder.Build();\n\napp.UseAuthentication();\napp.UseAuthorization();\n\napp.Run();\n```",
    options: [
      {
        key: "A",
        text: "It registers the authentication services."
      },
      {
        key: "B",
        text: "It adds the authentication and authorization middleware components to the request pipeline."
      },
      {
        key: "C",
        text: "It configures the default authentication scheme."
      },
      {
        key: "D",
        text: "It is redundant and has no effect."
      }
    ],
    correctAnswer: "B",
    explanation: "UseAuthentication() và UseAuthorization() dùng để thêm các middleware xác thực và phân quyền vào HTTP request pipeline."
  },
  {
    id: 74,
    question: "What is a \"channel\" in gRPC?",
    options: [
      {
        key: "A",
        text: "The service implementation on the server."
      },
      {
        key: "B",
        text: "The generated client-side code."
      },
      {
        key: "C",
        text: "A long-lived connection to a gRPC service, which can be reused for multiple calls."
      },
      {
        key: "D",
        text: "A specific type of streaming method."
      }
    ],
    correctAnswer: "C",
    explanation: "Channel trong gRPC là một kết nối lâu dài đến gRPC service, có thể được dùng lại cho nhiều lời gọi hàm (calls) khác nhau."
  },
  {
    id: 75,
    question: "In a .NET 8 Web API, what is the recommended way to handle model validation errors automatically and return a 400 Bad\nRequest response?",
    options: [
      {
        key: "A",
        text: "Manually checking ModelState.IsValid in every action."
      },
      {
        key: "B",
        text: "The [ApiController] attribute automatically handles it."
      },
      {
        key: "C",
        text: "Using a custom middleware to inspect every request."
      },
      {
        key: "D",
        text: "Relying on the database to throw an exception."
      }
    ],
    correctAnswer: "B",
    explanation: "Attribute [ApiController] tự động xử lý lỗi validation của model và trả về mã 400 Bad Request nếu ModelState không hợp lệ."
  },
  {
    id: 76,
    question: "In an OData service with Categories and Products, how would you request all products belonging to the category with an\nID of 5?",
    options: [
      {
        key: "A",
        text: "GET /Products?$filter=Categoryld eq 5"
      },
      {
        key: "B",
        text: "GET /Categories(5)/Products"
      },
      {
        key: "C",
        text: "GET /Products/Category(5)"
      },
      {
        key: "D",
        text: "Both A and B are typically valid ways to query."
      }
    ],
    correctAnswer: "D",
    explanation: "Cách thông dụng nhất trong OData để lấy tất cả products của category ID=5 là GET /Categories(5)/Products hoặc dùng filter GET /Products?$filter=Categoryld eq 5."
  },
  {
    id: 77,
    question: "To retrieve a single Category entity and all of its related Product entities in one request, which query would you use?",
    options: [
      {
        key: "A",
        text: "GET /Categories(1)?$select=Products"
      },
      {
        key: "B",
        text: "GET /Categories(1)?$expand=Products"
      },
      {
        key: "C",
        text: "GET /Categories(1)/Products"
      },
      {
        key: "D",
        text: "GET /Categories(1)/Products?$fetch=all"
      }
    ],
    correctAnswer: "B",
    explanation: "Để lấy một Category và toàn bộ Products của nó trong cùng 1 request, ta dùng $expand=Products."
  },
  {
    id: 78,
    question: "What is ASP.NET Core Identity?",
    options: [
      {
        key: "A",
        text: "A simple interface for generating unique IDs."
      },
      {
        key: "B",
        text: "A membership system that provides services for user authentication and authorization, including user management,\npassword hashing, and role management."
      },
      {
        key: "C",
        text: "A client-side library for managing user profiles."
      },
      {
        key: "D",
        text: "The default authentication scheme for Windows Authentication."
      }
    ],
    correctAnswer: "B",
    explanation: "ASP.NET Core Identity là hệ thống cung cấp các chức năng quản lý user, mật khẩu, xác thực, role, v.v."
  },
  {
    id: 79,
    question: "Which of the following is NOT a core principle of REST?",
    options: [
      {
        key: "A",
        text: "Statelessness"
      },
      {
        key: "B",
        text: "Client-Server architecture"
      },
      {
        key: "C",
        text: "Stateful connections"
      },
      {
        key: "D",
        text: "Uniform Interface"
      }
    ],
    correctAnswer: "C",
    explanation: "Kết nối có trạng thái (Stateful connections) KHÔNG phải là nguyên lý của REST; REST yêu cầu Statelessness (Không trạng thái)."
  },
  {
    id: 80,
    question: "What is the primary advantage of using attribute routing over conventional routing?",
    options: [
      {
        key: "A",
        text: "It is the only way to define routes in minimal APIs."
      },
      {
        key: "B",
        text: "It keeps the route definition next to the action method that it maps to, improving locality and discoverability."
      },
      {
        key: "C",
        text: "It offers significantly better performance than conventional routing."
      },
      {
        key: "D",
        text: "It is required for enabling Swagger/OpenAPI documentation."
      }
    ],
    correctAnswer: "B",
    explanation: "Attribute routing cho phép đặt định nghĩa URL route ngay cạnh action method, giúp code dễ quản lý và dễ tìm kiếm (discoverability)."
  },
  {
    id: 81,
    question: "The metadata of an OData service, which describes its data model, is typically exposed via which endpoint?",
    options: [
      {
        key: "A",
        text: "/Smetadata"
      },
      {
        key: "B",
        text: "/Shelp"
      },
      {
        key: "C",
        text: "/Sschema"
      },
      {
        key: "D",
        text: "/Sinfo"
      }
    ],
    correctAnswer: "A",
    explanation: "Siêu dữ liệu (metadata) của một dịch vụ OData mô tả cấu trúc data model thường được phơi bày qua endpoint /$metadata."
  },
  {
    id: 82,
    question: "Which formatter is configured by default in a new ASP.NET Core 8 Web API project?",
    options: [
      {
        key: "A",
        text: "An XML-based formatter (XmlSerializerInputFormatter/XmlSerializerOutputFormatter)."
      },
      {
        key: "B",
        text: "A JSON-based formatter using System.Text.Json."
      },
      {
        key: "C",
        text: "A plain text formatter (TextinputFormatter/TextOutputFormatter)."
      },
      {
        key: "D",
        text: "A custom binary formatter."
      }
    ],
    correctAnswer: "B",
    explanation: "Mặc định Web API của .NET 8 được cấu hình dùng JSON formatter với thư viện System.Text.Json."
  },
  {
    id: 83,
    question: "What is a \"load balancer\" in the context of scaling a web service?",
    options: [
      {
        key: "A",
        text: "A tool that validates the data load of a JSON request."
      },
      {
        key: "B",
        text: "A server or service that distributes incoming network traffic across multiple backend servers."
      },
      {
        key: "C",
        text: "A database feature that balances data across multiple tables."
      },
      {
        key: "D",
        text: "A client-side library for managing application load times."
      }
    ],
    correctAnswer: "B",
    explanation: "Load balancer là một máy chủ/dịch vụ giúp phân bổ đều lưu lượng mạng (traffic) từ người dùng đến nhiều server backend khác nhau."
  },
  {
    id: 84,
    question: "In an ASP.NET Core Web API, which attribute is used to decorate an action method that should respond to HTTP POST requests?",
    options: [
      {
        key: "A",
        text: "[HttpGet]"
      },
      {
        key: "B",
        text: "[HttpPost]"
      },
      {
        key: "C",
        text: "[HttpPut]"
      },
      {
        key: "D",
        text: "[HttpDelete]"
      }
    ],
    correctAnswer: "B",
    explanation: "Attribute [HttpPost] được dùng để trang trí (decorate) một action xử lý các request mang phương thức HTTP POST."
  },
  {
    id: 85,
    question: "Which query correctly finds all products where the Name property ends with the string 'Edition'?",
    options: [
      {
        key: "A",
        text: "GET /Products?$filter=endswith(Name, 'Edition')"
      },
      {
        key: "B",
        text: "GET /Products?$filter=Name.endsWith('Edition')"
      },
      {
        key: "C",
        text: "GET /Products?$filter=last(Name) eq 'Edition'"
      },
      {
        key: "D",
        text: "GET /Products?$filter=Name like '%Edition'"
      }
    ],
    correctAnswer: "A",
    explanation: "Trong OData, hàm built-in endswith() dùng để lọc chữ kết thúc, cú pháp chuẩn là: $filter=endswith(Name, 'Edition')."
  },
  {
    id: 86,
    question: "Which of the following is a correctly formatted Media Type for JSON?",
    options: [
      {
        key: "A",
        text: "text/json"
      },
      {
        key: "B",
        text: "application/json"
      },
      {
        key: "C",
        text: "data/json"
      },
      {
        key: "D",
        text: "json/application"
      }
    ],
    correctAnswer: "B",
    explanation: "Media Type đúng chuẩn dành cho dữ liệu JSON là application/json."
  },
  {
    id: 87,
    question: "How do you enable OData query options on a specific controller action?",
    options: [
      {
        key: "A",
        text: "By adding the [EnableQuery] attribute to the action method."
      },
      {
        key: "B",
        text: "By naming the action method GetWithOData."
      },
      {
        key: "C",
        text: "By inheriting from ODataController."
      },
      {
        key: "D",
        text: "It is enabled automatically on all actions once OData is configured."
      }
    ],
    correctAnswer: "A",
    explanation: "Để cho phép sử dụng OData query options (như $filter, $select) trên một action, cần thêm attribute [EnableQuery]."
  },
  {
    id: 88,
    question: "The following code uses ODataModelBuilder to construct an EDM. What does it do?\n```csharp\nvar builder = new ODataConventionModelBuilder();\nbuilder.EntitySet<Product>(\"Products\");\nbuilder.EntitySet<Category>(\"Categories\");\nreturn builder.GetEdmModel();\n```",
    options: [
      {
        key: "A",
        text: "It creates two entity sets, Products and Categories, and infers their properties and relationships by convention from the C# classes."
      },
      {
        key: "B",
        text: "It defines two complex types that cannot be queried directly."
      },
      {
        key: "C",
        text: "It creates an empty model and waits for the database to provide the schema."
      },
      {
        key: "D",
        text: "It registers two controllers named Products and Categories."
      }
    ],
    correctAnswer: "A",
    explanation: "Đoạn code cấu hình EDM thông qua ODataConventionModelBuilder sẽ tạo ra 2 entity sets (Products và Categories) và tự suy luận property từ class C#."
  },
  {
    id: 89,
    question: "What is an \"Entity Set\"?",
    options: [
      {
        key: "A",
        text: "The set of properties that make up an entity's key."
      },
      {
        key: "B",
        text: "A named collection of entities of a specific Entity Type, like Products being a collection of Product entities."
      },
      {
        key: "C",
        text: "The schema version of the data model."
      },
      {
        key: "D",
        text: "A set of validation rules for an entity."
      }
    ],
    correctAnswer: "B",
    explanation: "Entity Set là một bộ sưu tập (collection) được đặt tên chứa các thực thể (entities) có cùng một Entity Type."
  },
  {
    id: 90,
    question: "In a bidirectional streaming call, when does the server wait for the client to send all its messages before sending its own?",
    options: [
      {
        key: "A",
        text: "Always."
      },
      {
        key: "B",
        text: "Never; the client and server can read and write in any order, their streams operate independently."
      },
      {
        key: "C",
        text: "Only if the client explicitly signals it has finished writing."
      },
      {
        key: "D",
        text: "This is configured by the wait_for_client option in the .proto file."
      }
    ],
    correctAnswer: "B",
    explanation: "Trong stream hai chiều (bidirectional) của gRPC, client và server có thể gửi nhận dữ liệu song song độc lập, không ai phải đợi ai."
  },
  {
    id: 91,
    question: "A JWT consists of three parts separated by dots (.). What are they in the correct order?",
    options: [
      {
        key: "A",
        text: "Header, Payload, Signature"
      },
      {
        key: "B",
        text: "Payload, Header, Signature"
      },
      {
        key: "C",
        text: "Signature, Header, Payload"
      },
      {
        key: "D",
        text: "Header, Signature, Body"
      }
    ],
    correctAnswer: "A",
    explanation: "JWT luôn bao gồm 3 phần theo thứ tự: Header (thông tin thuật toán), Payload (chứa claims), và Signature (chữ ký bảo mật)."
  },
  {
    id: 92,
    question: "What is a \"claim\" in the context of a JWT?",
    options: [
      {
        key: "A",
        text: "A statement about a subject, such as a user's name, ID, or role."
      },
      {
        key: "B",
        text: "A request from the client to access a protected resource."
      },
      {
        key: "C",
        text: "An error message indicating invalid credentials."
      },
      {
        key: "D",
        text: "The algorithm used to sign the token."
      }
    ],
    correctAnswer: "A",
    explanation: "Claim trong JWT là một mẩu thông tin mô tả về đối tượng (chẳng hạn như tên, quyền hạn, ID của user)."
  },
  {
    id: 93,
    question: "What is CoreWCF?",
    options: [
      {
        key: "A",
        text: "A complete rewrite of WCF with a different architecture and programming model."
      },
      {
        key: "B",
        text: "A port of WCF to .NET (Core) and .NET 5+ that allows existing WCF services to be migrated to modern, cross-platform environments."
      },
      {
        key: "C",
        text: "A client-only library for consuming legacy WCF services."
      },
      {
        key: "D",
        text: "A graphical tool for managing WCF services."
      }
    ],
    correctAnswer: "B",
    explanation: "CoreWCF là dự án port WCF từ .NET Framework cũ sang nền tảng .NET (Core) / .NET 5+ hiện đại, đa nền tảng."
  },
  {
    id: 94,
    question: "To add support for XML serialization in a .NET 8 Web API, what service configuration is typically used in Program.cs?",
    options: [
      {
        key: "A",
        text: "builder.Services.AddControllers().AddXml0;"
      },
      {
        key: "B",
        text: "builder.Services.AddMvc().AddXmlSerializerFormatters();"
      },
      {
        key: "C",
        text: "builder.Services.AddControllers().AddXmlSerializerFormatters();"
      },
      {
        key: "D",
        text: "builder.Services.AddXmlFormatting0;"
      }
    ],
    correctAnswer: "C",
    explanation: "Để Web API hỗ trợ trả về XML, bạn cần gọi AddXmlSerializerFormatters() khi đăng ký dịch vụ controller."
  },
  {
    id: 95,
    question: "Which attribute forces a primitive type parameter to be bound exclusively from the query string?",
    options: [
      {
        key: "A",
        text: "[FromRoute]"
      },
      {
        key: "B",
        text: "[FromQuery]"
      },
      {
        key: "C",
        text: "[FromBody]"
      },
      {
        key: "D",
        text: "[FromHeader]"
      }
    ],
    correctAnswer: "B",
    explanation: "Attribute [FromQuery] bắt buộc một tham số chỉ được phép lấy dữ liệu từ phần query string của URL."
  },
  {
    id: 96,
    question: "If a request is made to `/products?id=abc` for an action defined as `public IActionResult GetProduct(int id)`, what will be the state of ModelState?",
    options: [
      {
        key: "A",
        text: "ModelState.IsValid will be true, and id will be 0."
      },
      {
        key: "B",
        text: "An InvalidCastException will be thrown."
      },
      {
        key: "C",
        text: "ModelState.IsValid will be false because \"abc\" cannot be converted to an integer."
      },
      {
        key: "D",
        text: "id will be null."
      }
    ],
    correctAnswer: "C",
    explanation: "Do tham số kiểu int mà URL truyền vào chuỗi 'abc', ModelState.IsValid sẽ trả về false do lỗi ép kiểu."
  },
  {
    id: 97,
    question: "What is the primary reason for using Data Transfer Objects (DTOs) in an API?",
    options: [
      {
        key: "A",
        text: "To replace the need for a database."
      },
      {
        key: "B",
        text: "To shape data specifically for the client, preventing over-posting and under-posting, and decoupling the API from the database schema."
      },
      {
        key: "C",
        text: "To increase the performance of database queries."
      },
      {
        key: "D",
        text: "To enforce business logic and validation."
      }
    ],
    correctAnswer: "B",
    explanation: "DTOs (Data Transfer Objects) giúp định dạng cấu trúc data gửi về client, ngăn chặn over-posting và tách biệt API với DB schema."
  },
  {
    id: 98,
    question: "To create a new entity in an OData service, which HTTP method should be used?",
    options: [
      {
        key: "A",
        text: "GET"
      },
      {
        key: "B",
        text: "PUT"
      },
      {
        key: "C",
        text: "POST"
      },
      {
        key: "D",
        text: "MERGE"
      }
    ],
    correctAnswer: "C",
    explanation: "Trong OData (cũng như REST API nói chung), để tạo mới một thực thể, HTTP method tiêu chuẩn là POST."
  },
  {
    id: 99,
    question: "Which of the following bindings is designed for high performance, .NET-to -. NET communication on the same machine or\nacross an intranet?",
    options: [
      {
        key: "A",
        text: "BasicHttpBinding"
      },
      {
        key: "B",
        text: "WSHttpBinding"
      },
      {
        key: "C",
        text: "NetTcpBinding"
      },
      {
        key: "D",
        text: "WebHttpBinding"
      }
    ],
    correctAnswer: "C",
    explanation: "NetTcpBinding là binding được thiết kế tối ưu hóa tốc độ, phục vụ cho giao tiếp giữa các ứng dụng .NET trong cùng mạng (intranet)."
  },
  {
    id: 100,
    question: "In a controller decorated with [ApiController], what happens automatically if ModelState.IsValid is false?",
    options: [
      {
        key: "A",
        text: "The action method still executes as normal."
      },
      {
        key: "B",
        text: "An HTTP 500 Internal Server Error is returned."
      },
      {
        key: "C",
        text: "The request is automatically rejected with an HTTP 400 Bad Request response containing details of the validation errors"
      },
      {
        key: "D",
        text: "The application logs the error and returns an HTTP 200 OK."
      }
    ],
    correctAnswer: "C",
    explanation: "Do có [ApiController], khi model bị lỗi (false), API tự chặn request và trả ngay mã 400 Bad Request cùng chi tiết lỗi."
  }
];


export const questions_paper3: Question[] = [
  {
    "id": 101,
    "question": "Which of the message exchange patterns is not supported in WCF?",
    "options": [
      {
        "key": "A",
        "text": "Duplex"
      },
      {
        "key": "B",
        "text": "Multi-way"
      },
      {
        "key": "C",
        "text": "One-way"
      },
      {
        "key": "D",
        "text": "Request-reply"
      }
    ],
    "correctAnswer": "B",
    "explanation": "WCF (Windows Communication Foundation) hỗ trợ các mô hình trao đổi thông báo (message exchange patterns) như: Request-Reply, One-Way và Duplex. Multi-way không phải là một mô hình hợp lệ trong WCF."
  },
  {
    "id": 102,
    "question": "Choose the correct information about scaling RESTful web services.",
    "options": [
      {
        "key": "A",
        "text": "None of the others."
      },
      {
        "key": "B",
        "text": "RESTful web services depend on the IP address and port number of the system to get a responsE)"
      },
      {
        "key": "C",
        "text": "RESTful web services support both Vertical and Horizontal scaling."
      },
      {
        "key": "D",
        "text": "RESTful web services support only support vertical scaling in communication."
      }
    ],
    "correctAnswer": "C",
    "explanation": "RESTful web services có khả năng mở rộng rất tốt. Do tính chất stateless (không lưu trạng thái client trên server), RESTful hỗ trợ cả mở rộng theo chiều dọc (Vertical scaling) và chiều ngang (Horizontal scaling)."
  },
  {
    "id": 103,
    "question": "Which one is not a benefit of gRPC?",
    "options": [
      {
        "key": "A",
        "text": "Tooling available for many languages to generate strongly-typed servers and clients."
      },
      {
        "key": "B",
        "text": "Modern, high-performance, lightweight RPC framework."
      },
      {
        "key": "C",
        "text": "Supports client, server, but does not allow bi-directional streaming calls."
      },
      {
        "key": "D",
        "text": "Contract-first API development, using Protocol Buffers by default, allowing for language agnostic implementations."
      }
    ],
    "correctAnswer": "C",
    "explanation": "gRPC thực chất có hỗ trợ luồng dữ liệu hai chiều (bi-directional streaming calls) thông qua HTTP/2. Do đó, phát biểu 'does not allow bi-directional streaming calls' là không chính xác."
  },
  {
    "id": 104,
    "question": "What is Open Web Interface for .NET (OWIN)?",
    "options": [
      {
        "key": "A",
        "text": "All of the others."
      },
      {
        "key": "B",
        "text": "OWIN defines a standard way for middleware to be used in a pipeline to handle requests and associated responses."
      },
      {
        "key": "C",
        "text": "ASP.NET Core applications and middleware can interoperate with OWIN-based applications, servers, and middlewarE) OWIN allows web apps to be decoupled from web servers."
      },
      {
        "key": "D",
        "text": "None of the others."
      }
    ],
    "correctAnswer": "A",
    "explanation": "OWIN (Open Web Interface for .NET) định nghĩa một tiêu chuẩn giao tiếp giữa web server và web application trong .NET, giúp tách rời (decouple) ứng dụng web khỏi server (như IIS)."
  },
  {
    "id": 105,
    "question": "Which contract in WCF maps data contracts to SOAP envelopes?",
    "options": [
      {
        "key": "A",
        "text": "Service Contract"
      },
      {
        "key": "B",
        "text": "Operation Contract"
      },
      {
        "key": "C",
        "text": "Data Contract"
      },
      {
        "key": "D",
        "text": "Message Contract"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Message Contract trong WCF cho phép bạn kiểm soát hoàn toàn cấu trúc của thông báo SOAP (SOAP envelope, header và body), rất hữu ích khi cần tùy chỉnh các thông báo ở mức độ thấp."
  },
  {
    "id": 106,
    "question": "The Observer pattern defines a one-to-many dependency between objects, where changes to one object automatically notify its dependents. Which of the following is a participant in the Observer pattern?",
    "options": [
      {
        "key": "A",
        "text": "All of the above."
      },
      {
        "key": "B",
        "text": "Subject"
      },
      {
        "key": "C",
        "text": "Observer"
      },
      {
        "key": "D",
        "text": "ConcreteSubject"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Mẫu thiết kế Observer bao gồm các thành phần chính: Subject, Observer, ConcreteSubject và ConcreteObserver. Do đó, cả 3 thành phần trên đều thuộc mẫu Observer."
  },
  {
    "id": 107,
    "question": "What is content negotiation?",
    "options": [
      {
        "key": "A",
        "text": "Content negotiation is an application that can be used to serve different representations of the same resource at a given URI, providing ability to their clients to decide the best suited representations."
      },
      {
        "key": "B",
        "text": "None of the others"
      },
      {
        "key": "C",
        "text": "Content negotiation is a mechanism that can be used to serve different representations of the same resource at a given URI, providing ability to their clients to decide the best suited representations."
      },
      {
        "key": "D",
        "text": "Content negotiation is a collection of API that can be used to serve different representations of the same resource at a given URI, providing ability to their clients to decide the best suited representations."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Content negotiation (Đàm phán nội dung) là cơ chế của HTTP cho phép client và server thỏa thuận về định dạng dữ liệu (ví dụ: JSON hoặc XML) tốt nhất để trao đổi dựa trên header Accept."
  },
  {
    "id": 108,
    "question": "Which one is not a microservice attribute?",
    "options": [
      {
        "key": "A",
        "text": "Technology adoption"
      },
      {
        "key": "B",
        "text": "Independent deployment"
      },
      {
        "key": "C",
        "text": "Combined functionality"
      },
      {
        "key": "D",
        "text": "Consistency and resiliency"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Microservices được thiết kế để phân chia thành các dịch vụ nhỏ, mỗi dịch vụ đảm nhận một chức năng duy nhất (single responsibility). Việc 'kết hợp chức năng' (Combined functionality) đi ngược lại với triết lý của kiến trúc Microservices."
  },
  {
    "id": 109,
    "question": "What is a Model in ASP.NET Core Web API?",
    "options": [
      {
        "key": "A",
        "text": "Models are used only to set the datA)"
      },
      {
        "key": "B",
        "text": "None of the others."
      },
      {
        "key": "C",
        "text": "A model is a class with .cs (for C#) as an extension having both properties and methods."
      },
      {
        "key": "D",
        "text": "All of the others."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Trong ASP.NET Core, Model thường là các lớp C# (.cs file) định nghĩa cấu trúc dữ liệu, chứa các thuộc tính (properties) và có thể kèm theo các phương thức (methods) xử lý."
  },
  {
    "id": 110,
    "question": "The Abstract Factory pattern provides an interface for creating families of related objects without specifying their concrete classes. Which of the following is a participant in the Abstract Factory pattern?",
    "options": [
      {
        "key": "A",
        "text": "ConcreteFactory"
      },
      {
        "key": "B",
        "text": "AbstractProduct"
      },
      {
        "key": "C",
        "text": "All of the above."
      },
      {
        "key": "D",
        "text": "AbstractFactory"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Mẫu Abstract Factory có các thành phần tham gia (participants) bao gồm: AbstractFactory, ConcreteFactory, AbstractProduct, ConcreteProduct và Client. Do đó tất cả đều đúng."
  },
  {
    "id": 111,
    "question": "The Prototype pattern allows the creation of new objects by cloning an existing object. Which of the following is a key benefit of the Prototype pattern?",
    "options": [
      {
        "key": "A",
        "text": "All of the above."
      },
      {
        "key": "B",
        "text": "It provides a way to create objects without specifying their concrete classes."
      },
      {
        "key": "C",
        "text": "It reduces the cost of creating new objects."
      },
      {
        "key": "D",
        "text": "It allows for the creation of objects without exposing the instantiation logic to the client."
      }
    ],
    "correctAnswer": "C",
    "explanation": "Lợi ích chính của mẫu Prototype là khả năng tạo ra các đối tượng mới bằng cách sao chép (clone) đối tượng hiện có. Điều này giúp giảm đáng kể chi phí khởi tạo (cost of creating new objects)."
  },
  {
    "id": 112,
    "question": "Which of the following is a disadvantage of the Builder pattern?",
    "options": [
      {
        "key": "A",
        "text": "It can lead to complex object creation logic."
      },
      {
        "key": "B",
        "text": "Both B and C."
      },
      {
        "key": "C",
        "text": "The number of lines of code increases compared to a traditional constructor."
      },
      {
        "key": "D",
        "text": "It requires creating a separate ConcreteBuilder for each different type of Product."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Một trong những nhược điểm của mẫu Builder là bạn phải tạo ra một lớp ConcreteBuilder riêng biệt cho từng loại Product khác nhau, điều này làm tăng số lượng lớp (classes) và độ phức tạp."
  },
  {
    "id": 113,
    "question": "Which one is not communication in microservices?",
    "options": [
      {
        "key": "A",
        "text": "Concurrency"
      },
      {
        "key": "B",
        "text": "None of the others"
      },
      {
        "key": "C",
        "text": "Asynchronous"
      },
      {
        "key": "D",
        "text": "Synchronous"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Trong kiến trúc microservices, giao tiếp giữa các dịch vụ thường là Đồng bộ (Synchronous) hoặc Bất đồng bộ (Asynchronous). Concurrency (Đồng thời) là khái niệm về xử lý đa luồng, không phải là một mô hình giao tiếp."
  },
  {
    "id": 114,
    "question": "Which utility can be used to create WSDL from WCF services?",
    "options": [
      {
        "key": "A",
        "text": "Wcf.exe"
      },
      {
        "key": "B",
        "text": "SvcUtil.exe"
      },
      {
        "key": "C",
        "text": "Svc.exe"
      },
      {
        "key": "D",
        "text": "ILDASM.exe"
      }
    ],
    "correctAnswer": "B",
    "explanation": "SvcUtil.exe (ServiceModel Metadata Utility Tool) là công cụ dòng lệnh của .NET dùng để tạo ra mã client (proxy) và file cấu hình từ WSDL của dịch vụ WCF."
  },
  {
    "id": 115,
    "question": "What is gRPC (Remote Procedure Calls)?",
    "options": [
      {
        "key": "A",
        "text": "gRPC is a new and modern framework for building scalable, modern and fast API"
      },
      {
        "key": "B",
        "text": "enables programmers to write micro-services in any language they want while keeping the ability to easily create communications between these services"
      },
      {
        "key": "C",
        "text": "All of the others"
      },
      {
        "key": "D",
        "text": "It relies on Protocol Buffers for the transport mechanism and Service Definition language"
      }
    ],
    "correctAnswer": "C",
    "explanation": "gRPC là một framework RPC hiện đại, mã nguồn mở, hoạt động hiệu suất cao. Nó cho phép kết nối các dịch vụ phân tán bằng nhiều ngôn ngữ khác nhau và dựa trên Protocol Buffers."
  },
  {
    "id": 116,
    "question": "The Factory Method pattern allows subclasses to decide which class to instantiate. Which of the following is a key benefit of the Factory Method pattern?",
    "options": [
      {
        "key": "A",
        "text": "It simplifies the construction of complex objects."
      },
      {
        "key": "B",
        "text": "All of the above."
      },
      {
        "key": "C",
        "text": "It reduces the coupling between the client and the concrete classes."
      },
      {
        "key": "D",
        "text": "It allows for the creation of objects without exposing the instantiation logic to the client."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Lợi ích chính của mẫu Factory Method là nó cho phép tạo ra các đối tượng mà không cần để lộ logic khởi tạo (instantiation logic) cho client, giúp giảm sự phụ thuộc (coupling)."
  },
  {
    "id": 117,
    "question": "What are static files in ASP.NET Core API Project?",
    "options": [
      {
        "key": "A",
        "text": "Images"
      },
      {
        "key": "B",
        "text": "JavaScript files"
      },
      {
        "key": "C",
        "text": "CSS files"
      },
      {
        "key": "D",
        "text": "None of the others"
      },
      {
        "key": "E",
        "text": "HTML files"
      },
      {
        "key": "F",
        "text": "All of the others"
      }
    ],
    "correctAnswer": "F",
    "explanation": "Trong dự án ASP.NET Core, các static files (tài nguyên tĩnh) bao gồm: file HTML, CSS, JavaScript, hình ảnh, v.v. Tất cả các phương án đều đúng."
  },
  {
    "id": 118,
    "question": "What is Model State?",
    "options": [
      {
        "key": "A",
        "text": "All of the others"
      },
      {
        "key": "B",
        "text": "None of the others"
      },
      {
        "key": "C",
        "text": "Errors that originate from model binding are generally data conversion errors."
      },
      {
        "key": "D",
        "text": "Model state represents errors that come from two subsystems: model binding and model validation."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Model State trong ASP.NET Core chứa các lỗi phát sinh từ hai hệ thống: Model Binding (chuyển đổi dữ liệu thất bại) và Model Validation (dữ liệu không hợp lệ theo quy tắc)."
  },
  {
    "id": 119,
    "question": "Which OData query option that determine all attributes or properties to include in the fetched result:",
    "options": [
      {
        "key": "A",
        "text": "$selectall"
      },
      {
        "key": "B",
        "text": "$select"
      },
      {
        "key": "C",
        "text": "$inlinecount"
      },
      {
        "key": "D",
        "text": "$top"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Trong OData, toán tử truy vấn `$select` được sử dụng để chỉ định các thuộc tính (properties) cụ thể nào của một thực thể sẽ được trả về, giúp giảm kích thước payload."
  },
  {
    "id": 120,
    "question": "Choose the INCORRECT information about ControllerBase class in ASP.NET Core Web API.",
    "options": [
      {
        "key": "A",
        "text": "All othe the others."
      },
      {
        "key": "B",
        "text": "None of the others."
      },
      {
        "key": "C",
        "text": "A base class for an MVC controller without model support."
      },
      {
        "key": "D",
        "text": "The context associated with the current request for a controller."
      },
      {
        "key": "E",
        "text": "The context associated with the current session for a controller."
      }
    ],
    "correctAnswer": "A",
    "explanation": "ControllerBase là lớp cơ sở cho các API controller không cần View. Do đó 'All of the others' là lựa chọn không chính xác vì ControllerBase không hỗ trợ các tính năng của MVC như Views hay Session theo mặc định."
  },
  {
    "id": 121,
    "question": "What are media type formatters in ASP.NET Core Web API?",
    "options": [
      {
        "key": "A",
        "text": "All of the others."
      },
      {
        "key": "B",
        "text": "XmlMediaTypeFormatter class handles HTML form URL-encoded datA)"
      },
      {
        "key": "C",
        "text": "Media type formatters are classes that are responsible for serialization datA)"
      },
      {
        "key": "D",
        "text": "The Web API cannot understand request data format in serializing request/response data and send data in a format that the client expects."
      },
      {
        "key": "E",
        "text": "JsonMediaTypeFormatter class handles both XML format and JSON format"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Media Type Formatters trong ASP.NET Core là các lớp chịu trách nhiệm tuần tự hóa (serialization) và giải tuần tự hóa dữ liệu request/response thành các định dạng (như JSON, XML) mà client mong đợi."
  },
  {
    "id": 122,
    "question": "The Singleton pattern is used to ensure that a class has only one instance and provides a global point of access to it. Which of the following statements is true about the Singleton pattern?",
    "options": [
      {
        "key": "A",
        "text": "The Singleton class must have a private constructor."
      },
      {
        "key": "B",
        "text": "All of the above."
      },
      {
        "key": "C",
        "text": "The Singleton class is responsible for creating and maintaining its own unique instance."
      },
      {
        "key": "D",
        "text": "The Singleton class must have a public static method to access the single instance."
      }
    ],
    "correctAnswer": "B",
    "explanation": "Mẫu Singleton đảm bảo chỉ có duy nhất một instance của lớp. Để làm được điều này, lớp Singleton thường phải có constructor là private để ngăn tạo instance mới từ bên ngoài."
  },
  {
    "id": 123,
    "question": "What is the primary purpose of using design patterns in software development?",
    "options": [
      {
        "key": "A",
        "text": "To create complex objects"
      },
      {
        "key": "B",
        "text": "To provide reusable solutions for common problems"
      },
      {
        "key": "C",
        "text": "To enforce a specific class structure"
      },
      {
        "key": "D",
        "text": "To improve code readability"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Mục đích chính của việc sử dụng Design Patterns là cung cấp các giải pháp có thể tái sử dụng (reusable solutions) cho các vấn đề thiết kế phần mềm thường gặp."
  },
  {
    "id": 124,
    "question": "Choose the correct information about Async programming with ASP.NET Web API.",
    "options": [
      {
        "key": "A",
        "text": "Async programming is a parallel programming technique that allows the working process to run separately from the main application threaD)"
      },
      {
        "key": "B",
        "text": "Using async programming, we can enhance the responsiveness of our application."
      },
      {
        "key": "C",
        "text": "Using async programming, we can avoid performance bottlenecks."
      },
      {
        "key": "D",
        "text": "All of the others."
      },
      {
        "key": "E",
        "text": "None of the others."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Lập trình bất đồng bộ (Async) trong ASP.NET Web API giúp giải phóng thread chính, tránh nút thắt cổ chai (bottlenecks) và tăng khả năng phản hồi (responsiveness) của ứng dụng."
  },
  {
    "id": 125,
    "question": "Which query function that the Web API is not support standard OData string?",
    "options": [
      {
        "key": "A",
        "text": "startswith: $filter=startswith(name,'a')"
      },
      {
        "key": "B",
        "text": "endswith: $filter=endswith(name,'InC)')"
      },
      {
        "key": "C",
        "text": "containsIgnoreCase: $filter=containsignorecase(name,'(Sample)')"
      },
      {
        "key": "D",
        "text": "contains: $filter=contains(name,'(sample)')"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Trong chuẩn OData, hàm `contains`, `startswith`, và `endswith` được hỗ trợ mặc định. Tuy nhiên, `containsignorecase` không phải là một hàm chuẩn trong đặc tả OData."
  },
  {
    "id": 126,
    "question": "Which of the following is executed on each request in RESTful with ASP.NET Core Web API?",
    "options": [
      {
        "key": "A",
        "text": "Main method"
      },
      {
        "key": "B",
        "text": "Startup"
      },
      {
        "key": "C",
        "text": "All"
      },
      {
        "key": "D",
        "text": "Middlewares"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Middlewares là các thành phần được lắp ráp vào pipeline của ứng dụng ASP.NET Core để xử lý các request và response. Mỗi request HTTP gửi tới API đều sẽ đi qua Middlewares."
  },
  {
    "id": 127,
    "question": "Which file is the application configuration file in ASP.NET Core Web Application or Web API used to store the configuration settings (database connections strings, any application scope global variables)?",
    "options": [
      {
        "key": "A",
        "text": "appsettings.Development.json"
      },
      {
        "key": "B",
        "text": "Startup.cs"
      },
      {
        "key": "C",
        "text": "appsettings.json"
      },
      {
        "key": "D",
        "text": "Program.cs"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Trong ASP.NET Core, file `appsettings.json` được sử dụng để lưu trữ các cấu hình của ứng dụng (như chuỗi kết nối database, các biến môi trường)."
  },
  {
    "id": 128,
    "question": "Choose the INCORRECT information about Validation Built-in attributes. The attributes can get from the System.ComponentModel.DataAnnotations namespacE)",
    "options": [
      {
        "key": "A",
        "text": "[EmailAddress]: Validates that the property has an email format."
      },
      {
        "key": "B",
        "text": "[Required]: Validates that the field is not null."
      },
      {
        "key": "C",
        "text": "[Compare]: Validates that two properties in a model match."
      },
      {
        "key": "D",
        "text": "[RegularExpression]: Validates that the property value matches a specified rangE)"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Attribute `[RegularExpression]` được dùng để xác thực chuỗi nhập vào có khớp với một biểu thức chính quy (Regex) hay không, chứ không phải để kiểm tra một khoảng giá trị như `[Range]`."
  },
  {
    "id": 129,
    "question": "In the case the request is simple, input parameter are of type int, string, boolean, GUID, decimal, etC) and is available in the URL, then such kind of request is mapped to what model binding?",
    "options": [
      {
        "key": "A",
        "text": "complex model binder"
      },
      {
        "key": "B",
        "text": "primitive model binding"
      },
      {
        "key": "C",
        "text": "combination model binding"
      },
      {
        "key": "D",
        "text": "extraction model binder"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Khi các tham số đầu vào là kiểu nguyên thủy (primitive types) như int, string, boolean... và xuất hiện trên URL, ASP.NET Core sẽ tự động sử dụng Primitive Model Binding."
  },
  {
    "id": 130,
    "question": "JavaScript is a powerful programming language for calling ASP.NET Core Web API. Which object is used to call the Web API from JavaScript object?",
    "options": [
      {
        "key": "A",
        "text": "XMLHttpResponseObject (XHR) object"
      },
      {
        "key": "B",
        "text": "XMLHttpRequestObject (XHR)"
      },
      {
        "key": "C",
        "text": "XMLHttpResponse (XHR) object"
      },
      {
        "key": "D",
        "text": "XMLHttpRequest (XHR) object"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Đối tượng XMLHttpRequest (XHR) là một API tích hợp trên trình duyệt web dùng để thực hiện các yêu cầu HTTP (gọi API) từ JavaScript tới server một cách bất đồng bộ."
  },
  {
    "id": 131,
    "question": "gRPC services couldn't be hosted by which ASP.NET Core server?",
    "options": [
      {
        "key": "A",
        "text": "TestServer"
      },
      {
        "key": "B",
        "text": "Kestrel"
      },
      {
        "key": "C",
        "text": "HTTP .sys"
      },
      {
        "key": "D",
        "text": "None of the others"
      },
      {
        "key": "E",
        "text": "IIS"
      }
    ],
    "correctAnswer": "C",
    "explanation": "HTTP.sys là một web server dành riêng cho Windows. Tài liệu chính thức lưu ý rằng gRPC hiện tại không được hỗ trợ khi host trực tiếp trên HTTP.sys do các hạn chế về HTTP/2 trailing headers."
  },
  {
    "id": 132,
    "question": "What is JSON?",
    "options": [
      {
        "key": "A",
        "text": "JSON (JavaScript Object Notation): It is used for representing structured information such as documents, data, configuration, etC)"
      },
      {
        "key": "B",
        "text": "JSON (JavaScript Object Notation): It is especially designed to store and transport datA)"
      },
      {
        "key": "C",
        "text": "None of the others."
      },
      {
        "key": "D",
        "text": "JSON (JavaScript Object Notation): It is a lightweight format designed to store and transport datA)"
      },
      {
        "key": "E",
        "text": "All of the others."
      },
      {
        "key": "F",
        "text": "JSON (JavaScript Object Notation): It is similar to HTML but is more flexible than HTML because it allows users to create their own custom tags."
      }
    ],
    "correctAnswer": "D",
    "explanation": "JSON (JavaScript Object Notation) là một định dạng dữ liệu nhẹ, dễ đọc đối với con người và dễ phân tích đối với máy tính, được thiết kế đặc biệt để lưu trữ và truyền tải dữ liệu."
  },
  {
    "id": 133,
    "question": "Message Contract can be applied to ...?",
    "options": [
      {
        "key": "A",
        "text": "Service"
      },
      {
        "key": "B",
        "text": "Class"
      },
      {
        "key": "C",
        "text": "Interface"
      },
      {
        "key": "D",
        "text": "Method"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Trong WCF, thuộc tính `[MessageContract]` được áp dụng ở mức Lớp (Class) hoặc Struct để xác định cấu trúc chính xác của thông báo SOAP (bao gồm header và body)."
  },
  {
    "id": 134,
    "question": "What is Docker?",
    "options": [
      {
        "key": "A",
        "text": "Docker is an open-source project for automating the deployment of applications as portable, selfsufficient containers that can run on the cloud or on-premises."
      },
      {
        "key": "B",
        "text": "Docker is an Oracle open source project..."
      },
      {
        "key": "C",
        "text": "Docker is an IBM open-source project..."
      },
      {
        "key": "D",
        "text": "Docker is an Microsoft project..."
      }
    ],
    "correctAnswer": "A",
    "explanation": "Docker là một dự án mã nguồn mở (open-source) giúp tự động hóa việc triển khai các ứng dụng bên trong các container (vùng chứa) phần mềm độc lập và di động."
  },
  {
    "id": 135,
    "question": "Which of the following is not a category of the Gang of Four (GoF) design patterns?",
    "options": [
      {
        "key": "A",
        "text": "Structural"
      },
      {
        "key": "B",
        "text": "Behavioral"
      },
      {
        "key": "C",
        "text": "Creational"
      },
      {
        "key": "D",
        "text": "Functional"
      }
    ],
    "correctAnswer": "D",
    "explanation": "Theo Gang of Four (GoF), Design Patterns được chia thành 3 nhóm chính: Creational, Structural và Behavioral. Functional không phải là một nhóm trong GoF."
  },
  {
    "id": 136,
    "question": "Which of the following is a key benefit of using design patterns in software development?",
    "options": [
      {
        "key": "A",
        "text": "They improve code readability and maintainability."
      },
      {
        "key": "B",
        "text": "They provide general solutions to common problems."
      },
      {
        "key": "C",
        "text": "They speed up the development process."
      },
      {
        "key": "D",
        "text": "All of the above."
      }
    ],
    "correctAnswer": "D",
    "explanation": "Lợi ích của việc sử dụng Design Patterns bao gồm: cải thiện khả năng đọc và bảo trì mã nguồn, cung cấp giải pháp chung cho các vấn đề thường gặp và tăng tốc quá trình phát triển."
  },
];

export const questions_paper4: Question[] = [
  {
    "id": 137,
    "question": "gRPC is built on top of which underlying transport protocol?",
    "options": [
      { "key": "A", "text": "TCP/IP directly" },
      { "key": "B", "text": "HTTP/1.1" },
      { "key": "C", "text": "UDP" },
      { "key": "D", "text": "HTTP/2" },
    ],
    "correctAnswer": "D",
    "explanation": "gRPC được xây dựng dựa trên giao thức HTTP/2, cho phép truyền dữ liệu nhị phân tốc độ cao, ghép kênh (multiplexing) và Server Push."
  },
  {
    "id": 138,
    "question": "What is a primary advantage of using Protocol Buffers (Protobuf) over JSON?",
    "options": [
      { "key": "A", "text": "Protobuf is a human-readable text format, making it easier to debug." },
      { "key": "B", "text": "Protobuf uses a binary serialization format, which is typically smaller and faster to parse than text-based JSON." },
      { "key": "C", "text": "Protobuf is natively supported by all web browsers without any libraries." },
      { "key": "D", "text": "Protobuf has a more flexible schema that can be changed by the client at will." },
    ],
    "correctAnswer": "B",
    "explanation": "Protocol Buffers (Protobuf) là định dạng nhị phân, nhỏ gọn và phân tích cú pháp nhanh hơn đáng kể so với định dạng văn bản (text-based) như JSON."
  },
  {
    "id": 139,
    "question": "To create a new gRPC service project in .NET 8, which project template should you use?",
    "options": [
      { "key": "A", "text": "ASP.NET Core Web API" },
      { "key": "B", "text": "Worker Service" },
      { "key": "C", "text": "gRPC Service" },
      { "key": "D", "text": "Class Library" },
    ],
    "correctAnswer": "C",
    "explanation": "Để tạo một project dịch vụ gRPC mới trong .NET 8, bạn nên sử dụng template 'gRPC Service' (gRPC ASP.NET Core)."
  },
  {
    "id": 140,
    "question": "How do you create a gRPC client in a .NET 8 console application?",
    "options": [
      { "key": "A", "text": "var client = new HttpClient();" },
      { "key": "B", "text": "var channel = GrpcChannel.ForAddress(\"https://localhost:5001\");\nvar client = new Greeter.GreeterClient(channel);" },
      { "key": "C", "text": "var client = new Greeter.GreeterStub(\"https://localhost:5001\");" },
      { "key": "D", "text": "var client = GrpcClient.Create<GreeterClient>(\"https://localhost:5001\");" },
    ],
    "correctAnswer": "B",
    "explanation": "Trong .NET 8, để tạo một gRPC client, bạn cần tạo một kênh kết nối bằng GrpcChannel.ForAddress() và sau đó truyền kênh đó vào class Client (ví dụ GreeterClient) được sinh ra tự động."
  },
  {
    "id": 141,
    "question": "What is \"Server Push\" in HTTP/2?",
    "options": [
      { "key": "A", "text": "The ability for the client to push data to the server's cache." },
      { "key": "B", "text": "A security feature that pushes updates to the client." },
      { "key": "C", "text": "The ability for the server to send resources to the client that it anticipates the client will need, without the client explicitly requesting them." },
      { "key": "D", "text": "A mechanism for streaming video content." },
    ],
    "correctAnswer": "C",
    "explanation": "Trong HTTP/2, Server Push là tính năng cho phép máy chủ chủ động gửi các tài nguyên (JS, CSS) mà nó dự đoán client sẽ cần trong tương lai, mà không cần client gửi request trực tiếp yêu cầu tài nguyên đó."
  },
  {
    "id": 142,
    "question": "In an ASP.NET Core Web API, which attribute is used to decorate an action method that should respond to HTTP POST requests?",
    "options": [
      { "key": "A", "text": "[HttpGet]" },
      { "key": "B", "text": "[HttpPost]" },
      { "key": "C", "text": "[HttpPut]" },
      { "key": "D", "text": "[HttpDelete]" },
    ],
    "correctAnswer": "B",
    "explanation": "Thuộc tính [HttpPost] được sử dụng trong ASP.NET Core Web API để đánh dấu một Action xử lý các request HTTP POST (thường dùng để thêm mới dữ liệu)."
  },
  {
    "id": 143,
    "question": "What is the primary purpose of the HTTP protocol?",
    "options": [
      { "key": "A", "text": "To securely encrypt data transmissions." },
      { "key": "B", "text": "To transfer hypertext documents across the internet." },
      { "key": "C", "text": "To manage and query databases." },
      { "key": "D", "text": "To define the structure of a web page." },
    ],
    "correctAnswer": "B",
    "explanation": "Mục đích chính của giao thức HTTP (HyperText Transfer Protocol) là truyền tải các tài liệu siêu văn bản (hypertext) và các tài nguyên khác qua mạng internet."
  },
  {
    "id": 144,
    "question": "What does \"Statelessness\" in REST mean?",
    "options": [
      { "key": "A", "text": "The server does not store any information about the client's state between requests." },
      { "key": "B", "text": "The client does not need to maintain any state about the server." },
      { "key": "C", "text": "The communication protocol does not support sessions." },
      { "key": "D", "text": "The server encrypts all state information." },
    ],
    "correctAnswer": "A",
    "explanation": "Trong kiến trúc REST, 'Statelessness' (Phi trạng thái) có nghĩa là máy chủ không lưu trữ bất kỳ trạng thái phiên làm việc (session) nào của client giữa các request. Mỗi request từ client phải chứa tất cả thông tin cần thiết để xử lý."
  },
  {
    "id": 145,
    "question": "The following controller action is intended to update an existing product. Which HTTP verb is most appropriate for this action?\n\n```csharp\n[HttpPut(\"{id}\")]\npublic IActionResult UpdateProduct(int id, [FromBody] Product product)\n{\n    // Logic to update the product\n    return NoContent();\n}\n```",
    "options": [
      { "key": "A", "text": "GET" },
      { "key": "B", "text": "POST" },
      { "key": "C", "text": "PUT" },
      { "key": "D", "text": "DELETE" },
    ],
    "correctAnswer": "C",
    "explanation": "Giao thức HTTP PUT thường được sử dụng để cập nhật toàn bộ một tài nguyên đã tồn tại dựa trên ID của nó, phù hợp với hành động UpdateProduct."
  },
  {
    "id": 146,
    "question": "A controller action needs to return a \"Not Found\" response when a resource does not exist. Which of the following is the best way to achieve this?\n\n```csharp\n[HttpGet(\"{id}\")]\npublic ActionResult<Product> GetProduct(int id)\n{\n    var product = _productService.GetById(id);\n    if (product == null)\n    {\n        return ???; // What should be here?\n    }\n    return product;\n}\n```",
    "options": [
      { "key": "A", "text": "Ok()" },
      { "key": "B", "text": "NotFound()" },
      { "key": "C", "text": "BadRequest()" },
      { "key": "D", "text": "NoContent()" },
    ],
    "correctAnswer": "B",
    "explanation": "Phương thức NotFound() sẽ trả về mã lỗi HTTP 404 (Not Found), báo cho client biết rằng tài nguyên được yêu cầu không tồn tại."
  },
  {
    "id": 147,
    "question": "What is the fundamental syntax for selecting an HTML element and applying an action in jQuery?",
    "options": [
      { "key": "A", "text": "element.action()" },
      { "key": "B", "text": "$(selector).action()" },
      { "key": "C", "text": "jQuery(action).selector()" },
      { "key": "D", "text": "select(element).do(action)" },
    ],
    "correctAnswer": "B",
    "explanation": "Cú pháp cơ bản của jQuery là $(selector).action(), trong đó $ đại diện cho jQuery, selector dùng để tìm các phần tử HTML và action là hành động cần thực hiện trên phần tử đó."
  },
  {
    "id": 148,
    "question": "Which HTTP method is commonly used in JavaScript to retrieve data from a Web API?",
    "options": [
      { "key": "A", "text": "POST" },
      { "key": "B", "text": "PUT" },
      { "key": "C", "text": "GET" },
      { "key": "D", "text": "DELETE" },
    ],
    "correctAnswer": "C",
    "explanation": "Phương thức HTTP GET được sử dụng phổ biến nhất để yêu cầu và lấy dữ liệu từ một Web API mà không làm thay đổi dữ liệu trên server."
  },
  {
    "id": 149,
    "question": "Given a .NET 8 Web API endpoint at https://api.example.com/products/12, what does the following jQuery code do?\n\n```javascript\n$.ajax({\n  url: \"https://api.example.com/products/12\",\n  type: \"GET\",\n  success: function(data) {\n    console.log(data);\n  },\n  error: function(xhr) {\n    console.error(\"Error fetching data: \" + xhr.statusText);\n  }\n});\n```",
    "options": [
      { "key": "A", "text": "It updates product 12 with new data." },
      { "key": "B", "text": "It deletes product 12." },
      { "key": "C", "text": "It attempts to retrieve the data for product 12 and logs it to the console on success." },
      { "key": "D", "text": "It creates a new product with an ID of 12." },
    ],
    "correctAnswer": "C",
    "explanation": "Đoạn mã jQuery $.ajax với type: 'GET' sẽ gửi yêu cầu để lấy dữ liệu (retrieve) của sản phẩm có ID 12 và in kết quả ra console nếu thành công."
  },
  {
    "id": 150,
    "question": "Which JavaScript object is commonly used to send AJAX requests to a Web API?",
    "options": [
      { "key": "A", "text": "XMLHttpRequest" },
      { "key": "B", "text": "JSON" },
      { "key": "C", "text": "WebSocket" },
      { "key": "D", "text": "FormData" },
    ],
    "correctAnswer": "A",
    "explanation": "Đối tượng XMLHttpRequest (hoặc Fetch API đời mới hơn) là đối tượng gốc của JavaScript được sử dụng đằng sau các thư viện như jQuery để thực hiện các yêu cầu AJAX gửi lên Web API."
  },
  {
    "id": 151,
    "question": "How would you select all <p> elements that are descendants of a <div> element?",
    "options": [
      { "key": "A", "text": "$(\"div > p\")" },
      { "key": "B", "text": "$(\"div p\")" },
      { "key": "C", "text": "$(\"div + p\")" },
      { "key": "D", "text": "$(\"div ~ p\")" },
    ],
    "correctAnswer": "B",
    "explanation": "Bộ chọn $('div p') (có khoảng trắng) trong jQuery sẽ chọn tất cả các thẻ <p> nằm bên trong (descendants) một thẻ <div>, bất kể chúng nằm ở cấp độ sâu bao nhiêu."
  },
  {
    "id": 152,
    "question": "What is the opposite of a microservices architecture?",
    "options": [
      { "key": "A", "text": "A serverless architecture" },
      { "key": "B", "text": "A monolithic architecture" },
      { "key": "C", "text": "A service-oriented architecture (SOA)" },
      { "key": "D", "text": "A distributed architecture" },
    ],
    "correctAnswer": "B",
    "explanation": "Trái ngược với kiến trúc Microservices (chia nhỏ ứng dụng thành nhiều dịch vụ độc lập) là kiến trúc Monolithic (nguyên khối), trong đó tất cả các thành phần của ứng dụng được xây dựng thành một khối duy nhất."
  },
  {
    "id": 153,
    "question": "What is the main principle of Microservices Architecture?",
    "options": [
      { "key": "A", "text": "Building one large monolithic application" },
      { "key": "B", "text": "Breaking an application into small, independent services" },
      { "key": "C", "text": "Using a single database for all features" },
      { "key": "D", "text": "Avoiding cloud deployment" },
    ],
    "correctAnswer": "B",
    "explanation": "Nguyên tắc cốt lõi của Microservices Architecture là phân chia một ứng dụng lớn thành các dịch vụ nhỏ, độc lập, có thể triển khai và bảo trì riêng biệt."
  },
  {
    "id": 154,
    "question": "In Microservices, each service usually has its own:",
    "options": [
      { "key": "A", "text": "Database" },
      { "key": "B", "text": "Shared configuration file" },
      { "key": "C", "text": "Monolithic deployment" },
      { "key": "D", "text": "UI layer" },
    ],
    "correctAnswer": "A",
    "explanation": "Trong kiến trúc Microservices, mỗi dịch vụ (service) thường có một cơ sở dữ liệu riêng biệt để đảm bảo sự độc lập và không phụ thuộc vào các dịch vụ khác (Database per service)."
  },
  {
    "id": 155,
    "question": "To containerize an ASP.NET Core microservice for deployment, what technology is most commonly used?",
    "options": [
      { "key": "A", "text": "Virtual Machines (VMs)" },
      { "key": "B", "text": "Docker" },
      { "key": "C", "text": "WebDeploy" },
      { "key": "D", "text": "FTP" },
    ],
    "correctAnswer": "B",
    "explanation": "Docker là công nghệ phổ biến nhất được sử dụng để đóng gói (containerize) một microservice ASP.NET Core cùng với tất cả các phụ thuộc của nó vào một container để triển khai."
  },
  {
    "id": 156,
    "question": "Which communication protocol is often chosen for high-performance, internal, service-to-service communication due to its use of HTTP/2 and binary serialization?",
    "options": [
      { "key": "A", "text": "SOAP" },
      { "key": "B", "text": "REST over HTTP/1.1 with JSON" },
      { "key": "C", "text": "gRPC" },
      { "key": "D", "text": "FTP" },
    ],
    "correctAnswer": "C",
    "explanation": "gRPC thường được chọn để giao tiếp giữa các dịch vụ nội bộ (service-to-service) vì nó sử dụng HTTP/2 và định dạng nhị phân Protobuf, mang lại hiệu suất rất cao."
  },
  {
    "id": 157,
    "question": "In a controller decorated with [ApiController], what happens automatically if ModelState.IsValid is false?",
    "options": [
      { "key": "A", "text": "The action method still executes as normal." },
      { "key": "B", "text": "An HTTP 500 Internal Server Error is returned." },
      { "key": "C", "text": "The request is automatically rejected with an HTTP 400 Bad Request response containing details of the validation errors." },
      { "key": "D", "text": "The application logs the error and returns an HTTP 200 OK." },
    ],
    "correctAnswer": "C",
    "explanation": "Khi controller sử dụng attribute [ApiController], ASP.NET Core sẽ tự động kiểm tra ModelState.IsValid. Nếu dữ liệu không hợp lệ, nó sẽ tự động trả về lỗi 400 Bad Request kèm theo chi tiết lỗi mà không cần viết mã thủ công."
  },
  {
    "id": 158,
    "question": "To bind a parameter to a request header, which attribute is used?",
    "options": [
      { "key": "A", "text": "[FromHeader]" },
      { "key": "B", "text": "[FromHead]" },
      { "key": "C", "text": "[BindHeader]" },
      { "key": "D", "text": "[InHeader]" },
    ],
    "correctAnswer": "A",
    "explanation": "Thuộc tính [FromHeader] được sử dụng để liên kết (bind) một tham số của action với một giá trị được truyền qua Header của request HTTP."
  },
  {
    "id": 159,
    "question": "How would you access a query string parameter named sort in a controller action?",
    "options": [
      { "key": "A", "text": "[HttpGet] public IActionResult Get([FromRoute] string sort) { /*...*/ }" },
      { "key": "B", "text": "[HttpGet] public IActionResult Get([FromBody] string sort) { /*...*/ }" },
      { "key": "C", "text": "[HttpGet] public IActionResult Get([FromHeader] string sort) { /*...*/ }" },
      { "key": "D", "text": "[HttpGet] public IActionResult Get([FromQuery] string sort) { /*...*/ }" },
    ],
    "correctAnswer": "D",
    "explanation": "Thuộc tính [FromQuery] chỉ định rằng giá trị của tham số (ở đây là sort) sẽ được lấy từ query string trên URL."
  },
  {
    "id": 160,
    "question": "By default, where does the model binder attempt to get the data for a complex type parameter (like a class or record) in an [ApiController] action?",
    "options": [
      { "key": "A", "text": "From the query string." },
      { "key": "B", "text": "From the request body." },
      { "key": "C", "text": "From the route data." },
      { "key": "D", "text": "From the request headers." },
    ],
    "correctAnswer": "B",
    "explanation": "Trong một controller có [ApiController], model binder của ASP.NET Core theo mặc định sẽ cố gắng lấy dữ liệu cho các kiểu phức tạp (complex type) từ phần thân của request (Request body) dưới dạng JSON."
  },
  {
    "id": 161,
    "question": "What happens when model validation fails in an ASP.NET Core Web API action?",
    "options": [
      { "key": "A", "text": "The API automatically returns 200 OK" },
      { "key": "B", "text": "The API automatically returns 400 Bad Request" },
      { "key": "C", "text": "The API automatically returns 404 Not Found" },
      { "key": "D", "text": "The API automatically retries the request" },
    ],
    "correctAnswer": "B",
    "explanation": "ASP.NET Core Web API sẽ tự động trả về phản hồi 400 Bad Request nếu quá trình xác thực dữ liệu mô hình (model validation) thất bại."
  },
  {
    "id": 162,
    "question": "Which trio summarizes WCF endpoint definition (ABC)?",
    "options": [
      { "key": "A", "text": "Address, Binding, Contract" },
      { "key": "B", "text": "Authentication, Binding, Channel" },
      { "key": "C", "text": "Address, Behavior, Channel" },
      { "key": "D", "text": "Adapter, Broker, Contract" },
    ],
    "correctAnswer": "A",
    "explanation": "Ba yếu tố cốt lõi của WCF (Windows Communication Foundation) endpoint là ABC: Address (ở đâu), Binding (như thế nào) và Contract (cái gì)."
  },
  {
    "id": 163,
    "question": "Which attribute in WCF specifies that a method can be invoked via HTTP GET or POST in REST style?",
    "options": [
      { "key": "A", "text": "[WebGet]/[WebInvoke]" },
      { "key": "B", "text": "[HttpPost]" },
      { "key": "C", "text": "[Authorize]" },
      { "key": "D", "text": "[Route]" },
    ],
    "correctAnswer": "A",
    "explanation": "Thuộc tính [WebGet] được dùng cho HTTP GET và [WebInvoke] được dùng cho HTTP POST, PUT, DELETE trong WCF RESTful services."
  },
  {
    "id": 164,
    "question": "In WCF, which attribute is used to mark an interface as a service contract?",
    "options": [
      { "key": "A", "text": "[Service]" },
      { "key": "B", "text": "[WebContract]" },
      { "key": "C", "text": "[WcfContract]" },
      { "key": "D", "text": "[ServiceContract]" },
    ],
    "correctAnswer": "D",
    "explanation": "Trong WCF, thuộc tính [ServiceContract] được đặt trên một interface hoặc class để xác định rằng nó định nghĩa một dịch vụ hợp đồng."
  },
  {
    "id": 165,
    "question": "If you want a property within a [DataContract] class to be included in the data exchange, which attribute must you apply to it?",
    "options": [
      { "key": "A", "text": "[Include]" },
      { "key": "B", "text": "[DataMember]" },
      { "key": "C", "text": "[ExposeProperty]" },
      { "key": "D", "text": "[ContractProperty]" },
    ],
    "correctAnswer": "B",
    "explanation": "Khi một class được đánh dấu bằng [DataContract], chỉ những thuộc tính được đánh dấu rành mạch bằng [DataMember] mới được phép tham gia vào quá trình truyền nhận dữ liệu."
  },
  {
    "id": 166,
    "question": "What does WCF stand for in the context of .NET?",
    "options": [
      { "key": "A", "text": "Windows Communication Framework" },
      { "key": "B", "text": "Windows Communication Foundation" },
      { "key": "C", "text": "Web Communication Framework" },
      { "key": "D", "text": "Web Control Foundation" },
    ],
    "correctAnswer": "B",
    "explanation": "WCF là viết tắt của Windows Communication Foundation, một framework của Microsoft dùng để xây dựng các ứng dụng hướng dịch vụ (service-oriented)."
  },
  {
    "id": 167,
    "question": "Which OData query option narrows the set of fields returned?",
    "options": [
      { "key": "A", "text": "$expand" },
      { "key": "B", "text": "$select" },
      { "key": "C", "text": "$filter" },
      { "key": "D", "text": "$orderby" },
    ],
    "correctAnswer": "B",
    "explanation": "Toán tử truy vấn $select trong OData được sử dụng để thu hẹp lại kết quả, chỉ định rõ những trường (fields) cụ thể nào của thực thể sẽ được trả về, giúp giảm kích thước payload."
  },
  {
    "id": 168,
    "question": "To retrieve a single Category entity and all of its related Product entities in one request, which query would you use?",
    "options": [
      { "key": "A", "text": "GET /Categories(1)?$select=Products" },
      { "key": "B", "text": "GET /Categories(1)?$expand=Products" },
      { "key": "C", "text": "GET /Categories(1),/Products" },
      { "key": "D", "text": "GET /Categories(1)/Products?$fetch=all" },
    ],
    "correctAnswer": "B",
    "explanation": "Toán tử $expand trong OData được sử dụng để tải các thực thể liên quan (related entities). Yêu cầu này sẽ trả về Category có ID 1 và toàn bộ danh sách Products của nó."
  },
  {
    "id": 169,
    "question": "The metadata of an OData service, which describes its data model, is typically exposed via which endpoint?",
    "options": [
      { "key": "A", "text": "/$metadata" },
      { "key": "B", "text": "/$help" },
      { "key": "C", "text": "/$schema" },
      { "key": "D", "text": "/$info" },
    ],
    "correctAnswer": "A",
    "explanation": "Endpoint /$metadata thường được các dịch vụ OData cung cấp để hiển thị siêu dữ liệu (metadata) dưới định dạng XML (EDMX), mô tả cấu trúc dữ liệu của API đó."
  },
  {
    "id": 170,
    "question": "To delete a product with an ID of 123, which OData request is correct?",
    "options": [
      { "key": "A", "text": "POST /Products?$filter=Id eq 123" },
      { "key": "B", "text": "DELETE /Products(123)" },
      { "key": "C", "text": "GET /Products(123)?action=delete" },
      { "key": "D", "text": "REMOVE /Products/123" },
    ],
    "correctAnswer": "B",
    "explanation": "Trong REST/OData, để xóa một tài nguyên cụ thể, ta dùng phương thức HTTP DELETE kết hợp với đường dẫn chứa ID của tài nguyên đó: DELETE /Products(123)."
  },
  {
    "id": 171,
    "question": "What is the main purpose of OData in ASP.NET Core Web API?",
    "options": [
      { "key": "A", "text": "To provide authentication and authorization features" },
      { "key": "B", "text": "To enable querying and manipulation of data over HTTP using standard conventions" },
      { "key": "C", "text": "To configure middleware components for logging" },
      { "key": "D", "text": "To handle static file serving" },
    ],
    "correctAnswer": "B",
    "explanation": "Mục đích chính của OData (Open Data Protocol) là tạo ra một quy chuẩn chung cho việc truy vấn và thao tác dữ liệu qua HTTP (như lọc, phân trang, sắp xếp) bằng các cú pháp URL đồng nhất."
  },
  {
    "id": 172,
    "question": "In ASP.NET Core Web API, model validation errors are stored in which property of the Controller?",
    "options": [
      { "key": "A", "text": "ModelState" },
      { "key": "B", "text": "HttpContext" },
      { "key": "C", "text": "TempData" },
      { "key": "D", "text": "ActionResult" },
    ],
    "correctAnswer": "A",
    "explanation": "Các lỗi xảy ra trong quá trình xác thực mô hình (Model Validation) được ASP.NET Core lưu trữ trong thuộc tính ModelState của Controller."
  },
  {
    "id": 173,
    "question": "After defining your DbContext and model classes in a Code-First approach, what is the next step to create the database schema?",
    "options": [
      { "key": "A", "text": "Manually write CREATE TABLE scripts in SQL." },
      { "key": "B", "text": "Run the application, and the database will be created automatically on the first run." },
      { "key": "C", "text": "Use EF Core migration commands like dotnet ef migrations add and dotnet ef database update." },
      { "key": "D", "text": "The database is created when the project is compiled." },
    ],
    "correctAnswer": "C",
    "explanation": "Trong phương pháp Code-First của EF Core, sau khi định nghĩa DbContext và Models, bạn cần sử dụng các lệnh Migration (dotnet ef migrations add và dotnet ef database update) để sinh ra các bảng trong database."
  },
  {
    "id": 174,
    "question": "What is the \"Repository Pattern\" commonly used for in ASP.NET Core data access?",
    "options": [
      { "key": "A", "text": "To automatically generate API documentation." },
      { "key": "B", "text": "To abstract the data access logic, making the application more modular and testable." },
      { "key": "C", "text": "To handle user authentication and authorization." },
      { "key": "D", "text": "To define the routing rules for API endpoints." },
    ],
    "correctAnswer": "B",
    "explanation": "Mẫu thiết kế Repository Pattern được sử dụng để trừu tượng hóa các logic truy cập dữ liệu (data access logic), giúp ứng dụng dễ dàng bảo trì, thay đổi nguồn dữ liệu và thực hiện Unit Test."
  },
  {
    "id": 175,
    "question": "In a .NET 9 application using EF Core, you've defined the following DbContext. How does EF Core know which classes to include in the database model?\n\n```csharp\npublic class ApplicationDbContext : DbContext\n{\n    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }\n    public DbSet<Product> Products { get; set; }\n    public DbSet<Category> Categories { get; set; }\n}\n```",
    "options": [
      { "key": "A", "text": "It scans the entire assembly for public classes." },
      { "key": "B", "text": "Through the DbSet<T> properties defined in the DbContext." },
      { "key": "C", "text": "It relies on XML configuration files." },
      { "key": "D", "text": "You must manually register each class using builder.Services.AddTransient<Product>()." },
    ],
    "correctAnswer": "B",
    "explanation": "Entity Framework Core tự động nhận diện các class cần đưa vào mô hình database thông qua các thuộc tính kiểu DbSet<T> được khai báo công khai (public) bên trong class kế thừa DbContext."
  },
  {
    "id": 176,
    "question": "Which data types are supported in JSON?",
    "options": [
      { "key": "A", "text": "String, Number, Boolean, Array, Object, null" },
      { "key": "B", "text": "String, Integer, Float, Date, Array, Hashtable" },
      { "key": "C", "text": "Text, Decimal, Bit, List, Dictionary, null" },
      { "key": "D", "text": "Varchar, Number, Boolean, Collection, Object, undefined" },
    ],
    "correctAnswer": "A",
    "explanation": "Các kiểu dữ liệu cơ bản được hỗ trợ chuẩn xác trong JSON bao gồm: String, Number, Boolean, Array, Object và null. (Lưu ý: JSON không có kiểu Date gốc, ngày tháng thường lưu ở dạng String ISO 8601)."
  },
  {
    "id": 177,
    "question": "By default, ASP.NET Core Web API uses which formatter for output?",
    "options": [
      { "key": "A", "text": "XML Formatter" },
      { "key": "B", "text": "JSON Formatter" },
      { "key": "C", "text": "Binary Formatter" },
      { "key": "D", "text": "CSV Formatter" },
    ],
    "correctAnswer": "B",
    "explanation": "ASP.NET Core Web API mặc định cấu hình sử dụng JSON Formatter để định dạng và trả về dữ liệu (output) cho các HTTP request."
  },
  {
    "id": 178,
    "question": "What is a key difference in how web browsers and non-browser HTTP clients (like a C# HttpClient or Postman) typically set the Accept header?",
    "options": [
      { "key": "A", "text": "Non-browser clients never send an Accept header." },
      { "key": "B", "text": "Browsers often send a very broad Accept header (e.g., text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8) because they can handle many types." },
      { "key": "C", "text": "Browsers only accept text/html." },
      { "key": "D", "text": "Non-browser clients are required to accept application/json only." },
    ],
    "correctAnswer": "B",
    "explanation": "Các trình duyệt (Browsers) thường gửi Header Accept rất rộng và phức tạp để báo hiệu chúng hỗ trợ nhiều loại tài liệu (HTML, XML, Ảnh), trong khi các HTTP Client phi trình duyệt (như Postman, HttpClient) thường gửi Accept rất cụ thể như application/json."
  },
  {
    "id": 179,
    "question": "You want to create a custom input formatter for the text/csv media type. Which base class should you inherit from?",
    "options": [
      { "key": "A", "text": "CsvFormatter" },
      { "key": "B", "text": "TextOutputFormatter" },
      { "key": "C", "text": "TextInputFormatter" },
      { "key": "D", "text": "OutputFormatter" },
    ],
    "correctAnswer": "C",
    "explanation": "Để tạo một custom input formatter có nhiệm vụ đọc dữ liệu đầu vào (input) từ request theo chuẩn text/csv, bạn cần kế thừa từ lớp cơ sở TextInputFormatter."
  },
  {
    "id": 180,
    "question": "Which of the following is a valid JSON object?",
    "options": [
      { "key": "A", "text": "{ 'name': 'John Doe', \"age\": 30 }" },
      { "key": "B", "text": "{ name: \"John Doe\", age: 30 }" },
      { "key": "C", "text": "{ \"name\": \"John Doe\", \"age\": 30, }" },
      { "key": "D", "text": "{ \"name\": \"John Doe\", \"age\": 30 }" },
    ],
    "correctAnswer": "D",
    "explanation": "Cú pháp hợp lệ duy nhất của JSON là tên thuộc tính và chuỗi (String) bắt buộc phải được đặt trong dấu ngoặc kép đôi, và không được có dấu phẩy thừa ở cuối (trailing comma)."
  },
  {
    "id": 181,
    "question": "What does applying [Authorize] without any parameters to a controller or action do?",
    "options": [
      { "key": "A", "text": "It allows anonymous access." },
      { "key": "B", "text": "It denies all access, regardless of who the user is." },
      { "key": "C", "text": "It requires that the user be authenticated, but does not check for any specific roles or policies." },
      { "key": "D", "text": "It defaults to requiring the \"Admin\" role." },
    ],
    "correctAnswer": "C",
    "explanation": "Khi áp dụng [Authorize] lên controller mà không truyền thêm tham số, ASP.NET Core sẽ chỉ yêu cầu người dùng đó phải đăng nhập thành công (authenticated), không đòi hỏi thêm Role hay Policy cụ thể nào."
  },
  {
    "id": 182,
    "question": "What is a \"load balancer\" in the context of scaling a web service?",
    "options": [
      { "key": "A", "text": "A tool that validates the data load of a JSON request." },
      { "key": "B", "text": "A server or service that distributes incoming network traffic across multiple backend servers." },
      { "key": "C", "text": "A database feature that balances data across multiple tables." },
      { "key": "D", "text": "A client-side library for managing application load times." },
    ],
    "correctAnswer": "B",
    "explanation": "'Load Balancer' (Cân bằng tải) là một máy chủ/dịch vụ đứng trước các ứng dụng để phân phối thông lượng mạng (network traffic) đầu vào đều đặn cho nhiều backend server, giúp hệ thống không bị quá tải."
  },
  {
    "id": 183,
    "question": "Which of the following HTTP status codes indicates \"Unauthorized\" access?",
    "options": [
      { "key": "A", "text": "200" },
      { "key": "B", "text": "400" },
      { "key": "C", "text": "401" },
      { "key": "D", "text": "403" },
    ],
    "correctAnswer": "C",
    "explanation": "Mã HTTP 401 Unauthorized được trả về khi người dùng yêu cầu truy cập tài nguyên bảo mật nhưng chưa được xác thực (chưa đăng nhập) hoặc xác thực không hợp lệ."
  },
  {
    "id": 184,
    "question": "What architectural characteristic of RESTful services is most crucial for enabling horizontal scaling?",
    "options": [
      { "key": "A", "text": "Stateful" },
      { "key": "B", "text": "Statelessness" },
      { "key": "C", "text": "Tight coupling between client and server" },
      { "key": "D", "text": "Use of XML as the only data format" },
    ],
    "correctAnswer": "B",
    "explanation": "Đặc tính 'Statelessness' (Phi trạng thái) là chìa khóa để hỗ trợ Horizontal Scaling (mở rộng theo chiều ngang). Do không cần nhớ trạng thái trên máy chủ cụ thể nào, bất kỳ máy chủ nào cũng có thể xử lý các request kế tiếp của client."
  },
  {
    "id": 185,
    "question": "A controller action needs to return a \"Not Found\" response when a resource does not exist. Which of the following is the best way to achieve this?\n\n```csharp\n[HttpGet(\"{id}\")]\npublic ActionResult<Product> GetProduct(int id)\n{\n    var product = _productService.GetById(id);\n    if (product == null)\n    {\n        return ???; // What should be here?\n    }\n    return product;\n}\n```",
    "options": [
      { "key": "A", "text": "Ok()" },
      { "key": "B", "text": "NotFound()" },
      { "key": "C", "text": "BadRequest()" },
      { "key": "D", "text": "NoContent()" }
    ],
    "correctAnswer": "B",
    "explanation": "Giống câu 146, để trả về lỗi không tìm thấy tài nguyên trong Controller, cách tốt nhất là sử dụng phương thức NotFound(), tương ứng với HTTP Status 404."
  },
  {
    "id": 186,
    "question": "The following controller action is intended to update an existing product. Which HTTP verb is most appropriate for this action?\n\n```csharp\n[HttpPut(\"{id}\")]\npublic IActionResult UpdateProduct(int id, [FromBody] Product product)\n{\n    // Logic to update the product\n    return NoContent();\n}\n```",
    "options": [
      { "key": "A", "text": "GET" },
      { "key": "B", "text": "POST" },
      { "key": "C", "text": "PUT" },
      { "key": "D", "text": "DELETE" }
    ],
    "correctAnswer": "C",
    "explanation": "Giống câu 145, hành động cập nhật một thực thể sẵn có hoàn toàn (UpdateProduct) chuẩn xác nhất với giao thức HTTP là PUT."
  }
];
