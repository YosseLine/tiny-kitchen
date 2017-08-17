import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Wrapper, Tiles } from './styled-components'
import Tile from './Tile'
import * as action from '../store'


class AllRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.filterRecipes.bind(this);
  }

  componentDidMount() {
    this.props.getRecipes();
  }

  filterRecipes(recipes, input){  
    input = input.toLowerCase();
    return recipes.filter(recipe => {
      return recipe.title.toLowerCase().includes(input) ||
        recipe.directions.join().toLowerCase().includes(input) ||
        recipe.ingredients.join().toLowerCase().includes(input)
    })
  }

  render() {
    let {input, recipes}= this.props;
    recipes = this.filterRecipes(recipes, input);

    return (
      <Tiles>
        {recipes.length && recipes.map((recipe, i) =>
          <Link key={i} to={`/recipe/${recipe.id}`}><Tile recipe={recipe}/></Link>)}
      </Tiles>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    recipes: state.recipes.recipes,
    input: state.recipes.input
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRecipes: id => dispatch(action.getRecipes())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(AllRecipes))
