const User = require('./user');
const Recipe = require('./recipe');
const RecipeBox = require('./recipe_box');
const Grocery = require('./grocery')
const GroceryUser = require('./groceryUser')

Recipe.belongsToMany(User, {through: RecipeBox});
User.belongsToMany(Recipe, {through: RecipeBox});


Grocery.belongsToMany(User, {through: GroceryUser});
User.belongsToMany(Grocery, {through: GroceryUser});

module.exports = {
  User,
  Recipe,
  RecipeBox,
  Grocery,
  GroceryUser
}
