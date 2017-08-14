const router = require('express').Router();
const {Recipe} = require('../db/models');
module.exports = router;

// GET /api/recipes
router.get('/', (req, res, next) => {
  Recipe.findAll()
    .then(recipes => res.json(recipes))
    .catch(next);
});

// POST /api/recipes
router.post('/', (req, res, next) => {
  Recipe.create(req.body)
  .then(recipe => res.json(recipe))
  .catch(next);
});

// GET /api/recipes/:recipeId
router.get('/:recipeId', (req, res, next) => {
  const id = req.params.recipeId;
  Recipe.findOne({
    where: {id},
    attributes: ['id', 'email', 'firstName', 'lastName', 'picture_url']
  })
  .then(recipe => res.json(recipe))
  .catch(next);
});

// PUT /api/recipes/:recipeId
router.put('/:recipeId', (req, res, next) => {
  const id = req.params.recipeId;
  Recipe.findById(id)
  .then(recipe => recipe.update(req.body))
  .then(() => res.json(req.body))
  .catch(next);
});

// DELETE /api/recipes/:recipeId
router.delete('/:recipeId', (req, res, next) => {
  const id = req.params.recipeId;
  Recipe.findById(id)
  .then(recipe => recipe.destroy())
  .then(res.send('Recipe destroyed'))
  .catch(next);
});
