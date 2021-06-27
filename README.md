# Movie

Web application for storing information about movies!

### Installation and Usage

To use a web application, you must have the following programs on your computer:


- <b>[Node.JS](https://nodejs.org/)</b>

- <b>[MongoDB](https://www.mongodb.com/)</b>

Movie supports stable versions of Node.js 8.15.0 and later.
<hr>

Steps to download and run the web application:

- Clone the repository to your computer.

  - Open the cmd or terminal and write text below:

        git clone https://github.com/Zak-Roz/Movie.git
    
  - Open the project in the IDE and in the terminal (the path should be to the project) execute the command:

        npm install express path mustache-express method-override body-parser express-fileupload cloudinary mongodb mongoose node-fetch dotenv

  - Everything is ready, now it remains to run the web application.
  
    Run the command below in the terminal:

        node app.js

If no errors are found, go to the web application:

<a href="http://localhost:3000/" target="_blank">Visit Movies</a>

<hr>

## 1. Analysis of the subject area

1.1. Analysis of software functionality requirements

In the process of analyzing the requirements for the system, the following functional requirements were identified:

1. Available web user interface. Graphic elements are used according to their main purpose.

   a. There are several windows;
   
   b. Adheres to a single style for all windows.
2. Available forms for data creation.

   a. You can delete the data (with confirmation of this action).
3. Use graphical lists and tables to display data collections.

   a. The data in the table is not just a display of one database table, but contains glued or modified data;
   
   b. The data in the lists and tables are paginated, search and filtering of their records is available.
4. All input data from the user and from files are checked, errors are processed, error information is displayed to the user.
5. The main window (or other windows) have a menu with the main actions of the program.
6. The program has the ability to import data in one .TXT data format.
7. The program interacts with a non-relational database. NoSQL queries to the database are not contacted, and their execution is made in a special separate module (type of storage).

   a. The database contains 2 tables. Tables in the database are reduced to the 1st and 2nd normal forms;
   
   b. Between the database tables are one-to-many.
   
8. Use of client-server program architecture.

## 2. Analysis of programming languages and development technologies

2.1. JavaScript programming language

+ JavaScript is a dynamic, object-oriented prototype programming language. The main features of JavaScript and ES6 were used in the project development. In general, all work is developed in this programming language.

2.2. MongoDB

+ MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

2.3. Express library

+ Express is a back end web application framework for Node.js, released as free and open-source software under the MIT License.
It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

2.4. Mustache-express library

+ Mustache Express lets you use Mustache and Express (at least version 3) together, including auto-loading partials.
The mustacheExpress method can take three parameters: the directory of the partials, the extension of the partials, and an optional array of tags. When a partial is requested by a template, the file will be loaded from path.resolve (directory, partialName + extension). By default, these values are determined by Express.

2.5. Mustache-express library

+ Node.js body parsing body-parser.
Parse incoming request bodies in a middleware before your handlers, available
under the `req.body` property.

2.6. Cloudinary library

+ Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline. Easily upload images to the cloud. Cloudinary offers comprehensive APIs and administration capabilities and is easy to integrate with any web application, existing or new. Cloudinary provides URL and HTTP based APIs that can be easily integrated with any Web development framework. For Node.js, Cloudinary provides an extension for simplifying the integration even further.

2.7. Mongoose library

+ Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
The official documentation [website](http://mongoosejs.com/).

2.8. Node-fetch library

+ The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

2.9. Library dotenv

+ Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.


## 3. Description of the developed software

3.1. Database structure
![Image alt](https://res.cloudinary.com/dxzdbtucv/image/upload/v1624744334/Untitled_Workspace_efpmpt.png)
The database used in the developed application consists of 2 tables:

1. The Movies table is responsible for storing information about movies, namely ID, title, format, year of release and stars.
2. The Stars table is used to store information (identifier, full actor name) about the stars.

3.2. Data storage module

The interface of the repository module can be divided into categories, according to the purpose of the functions:

1. To work with the Movies entity:


1.1. async addMovies(movie_items) - this function allows you to add a new movie to the database and returns its object with parameters.
    
1.2. async deleteMovies(movie_id) - this function allows you to delete a movie by its ID.

1.3. async getMovies() - this function returns all available movies.

1.4. async getMoviesById(movie_id) - this function allows you to get a movie by its ID, if such a movie exists.



2. To work with the Stars entity:


2.1. async addStars(star_items) - this function allows you to add a new star to the database and returns its object with parameters.
    
2.2. async getStarsByName(name) - this function allows you to get a star by its name, if such a star exists.



3. To work with the Movies entity:


3.1. async addMedia(buffer) - this function returns the recording results to the cloud or error.


Dependence diagram of all modules:

![Image alt](https://res.cloudinary.com/dxzdbtucv/image/upload/v1624772247/diag_euri2t.png)
