const db = require("../models");
const axios = require("axios");

const appId = process.env.EDAMAM_RECIPE_APP_ID;
const appKey = process.env.EDAMAM_RECIPE_APP_KEY;


module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", async function(req, res) {
    const data = await db.Example.findAll({});
    res.json(data);
  });

  // Create a new example
  app.post("/api/recipes", async function(req, res) {
    const data = await db.recipe_db.create(req.body.pantry-item);
    res.json(data);
  });

  // Delete an example by id
  app.delete("/api/examples/:id", async function(req, res) {
    const data = await db.Example.destroy({ where: { id: req.params.id } });
    res.json(data);
  });

  app.get("/api/recipes/:query", async function(req,res){
    const search = req.params.query;
    console.log(search);
    const baseUrl = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&`;
    const data = await axios.get(`${baseUrl}q=${search}`);
    const {hits:results} = data.data;
    console.log(results);
    res.json(results);
    // res.send(JSON.stringify(results));
  });
};
