import Parse from 'parse/dist/parse.min.js';

Parse.initialize(
  import.meta.env.VITE_APP_ID,
  import.meta.env.VITE_JS_KEY
);
Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;