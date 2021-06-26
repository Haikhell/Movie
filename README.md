# Movie

Web application for storing information about movies!

### Installation and Usage

To use a web application, you must have the following programs on your computer:<br />

- <b>[Node.JS](https://nodejs.org/):</b><br />
- <b>[MongoDB](https://www.mongodb.com/):</b>

Movie supports stable versions of Node.js 8.15.0 and later.
You can install:

    npm install express path mustache-express method-override body-parser express-fileupload cloudinary mongodb mongoose node-fetch dotenv

## 1. Analysis of the subject area

1.1. Analysis of software functionality requirements
In the process of analyzing the requirements for the system, the following functional requirements were identified:

1. Available web user interface. Graphic elements are used according to their main purpose.<br />
   a. There are several windows;<br />
   b. Adheres to a single style for all windows.
2. Available forms for data creation.<br />
   a. You can delete the data (with confirmation of this action).
3. Use graphical lists and tables to display data collections.<br />
   a. The data in the table is not just a display of one database table, but contains glued or modified data;<br />
   b. The data in the lists and tables are paginated, search and filtering of their records is available.
4. All input data from the user and from files are checked, errors are processed, error information is displayed to the user.
5. The main window (or other windows) have a menu with the main actions of the program.
6. The program has the ability to import data in one TCT data format.
7. The program interacts with a non-relational database. NoSQL queries to the database are not contacted, and their execution is made in a special separate module (type of storage).<br />
   a. The database contains 2 tables. Tables in the database are reduced to the 1st and 2nd normal forms;<br />
   b. Between the database tables are one-to-many.
8. Use of client-server program architecture.

## 2. Analysis of programming languages and development technologies

2.1. JavaScript programming language<br />
JavaScript is a dynamic, object-oriented prototype programming language. The main features of JavaScript and ES6 were used in the project development. In general, all work is developed in this programming language.<br />
2.2. MongoDB<br />
MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.<br />
2.3. Express library<br />
Express is a back end web application framework for Node.js, released as free and open-source software under the MIT License.
It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.<br />
2.4. Mustache-express library<br />
Mustache Express lets you use Mustache and Express (at least version 3) together, including auto-loading partials.
The mustacheExpress method can take three parameters: the directory of the partials, the extension of the partials, and an optional array of tags. When a partial is requested by a template, the file will be loaded from path.resolve (directory, partialName + extension). By default, these values are determined by Express.<br />
2.5. Mustache-express library<br />
Node.js body parsing body-parser.
Parse incoming request bodies in a middleware before your handlers, available
under the `req.body` property.<br />
2.6. Cloudinary library<br />
Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline. Easily upload images to the cloud. Cloudinary offers comprehensive APIs and administration capabilities and is easy to integrate with any web application, existing or new. Cloudinary provides URL and HTTP based APIs that can be easily integrated with any Web development framework. For Node.js, Cloudinary provides an extension for simplifying the integration even further.<br />
2.7. Mongoose library<br />
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
The official documentation [website](http://mongoosejs.com/).<br />
2.8. Node-fetch library<br />
The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.<br />
2.9. Library dotenv<br />
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.<br />

## 3. Description of the developed software

3.1. Database structure
![Image alt](https://res.cloudinary.com/dxzdbtucv/image/upload/v1624744334/Untitled_Workspace_efpmpt.png)
The database used in the developed application consists of 2 tables:

1. The Movies table is responsible for storing information about movies, namely ID, title, format, year of release and stars.
2. The Stars table is used to store information (identifier, full actor name) about the stars.

3.2. Data warehouse module
The interface of the repository module can be divided into categories, according to the purpose of the functions:
To work with the Movies entity (user):<br />

1. async getMovies (req, res, next) - this function renders the following parameters:

- head_title - page name;
- movies_page - a certain number of movies per page;
- movies_current - to lock the tab so as not to go from itself;
- paginator_pages - number of pages (pagination);
- title_query - save in the search bar and search for a movie by title.

2. async getMovieById (req, res, next) - this function renders the following parameters:

- head_title - page name;
- movies_current - to unlock the tab to go to the list of all movies;
- movie - an object that contains all the information about a particular movie.

3. async createMovie (req, res, next) - function allows you to add a new movie to the database. Checks all stars to see if they are in the database, if not, creates them in the Stars tables, returns their unique identifiers, writes to the database and renders to the created movie.<br />

4. async importMovie (req, res, next) - functions the imported file receives, saves it on a cloud, reads on URL, parses and writes in a database new films. Renders in all movies.<br />

5. async deleteMovieById (req, res, next) - the function deletes a specific movie from the database and renders it to all movies.

Dependence diagram of all modules:<br />
![Image alt](https://res.cloudinary.com/dxzdbtucv/image/upload/v1624747155/diag_rqmw5b.png)
