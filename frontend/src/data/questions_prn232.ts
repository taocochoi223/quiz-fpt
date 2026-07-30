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
        text: "The process where the client specifies which data it wants to post using the Content-Type header.\n\n64Which communication protocol is often chosen for high-performance, internal, service-to-service communication due to its\nuse of HTTP/2 and binary serialization?"
      },
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
