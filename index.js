var request = require('request');

//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config(); // everything after this line will have the environment variables available 
const edamam = require("./modules/edamam/api");

//set up Express app
const app = express();
const port = process.env.PORT || 9999;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  response.render("index", {title: "Search Page"});
});

app.get('/search', async function(request,response) {
  var query = request.query.query;
  let searchList = await edamam.getSearchedRecipes(query);
  console.log(searchList);
  response.render("searchResults", { title: "Search Results", searchResults: searchList });
});

app.get('/dish-videos', async function(request, response){
  let dish = request.query.id;
  let itemList = await edamam.getVideos(dish);
  console.log(itemList);
  response.render("videos", {title: "Videos", items: itemList})
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


