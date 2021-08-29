require('dotenv').config();
 
const env = process.env.NODE_ENV; // 'dev' or 'test'
// TODO use  new Object.freeze({})
const dev = {
 app: {
   port: process.env.PORT
 },
 cloudinary: { 
   cloud_name: process.env.DEV_CLOUDINARY_CLOUD_NAME, 
   api_key: String(process.env.DEV_CLOUDINARY_API_KEY), 
   api_secret: process.env.DEV_CLOUDINARY_API_SECRET 
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   port: process.env.DEV_DB_PORT || 27017,
   name: process.env.DEV_DB_NAME || 'db'
 }
};
// TODO use  new Object.freeze({})
const test = {
 app: {
   port: parseInt(process.env.TEST_APP_PORT) || 3000
 },
 db: {
   host: process.env.TEST_DB_HOST || 'localhost',
   port: parseInt(process.env.TEST_DB_PORT) || 27017,
   name: process.env.TEST_DB_NAME || 'test'
 }
};
 
const config = {
 dev,
 test
};
 
module.exports = config[env];
