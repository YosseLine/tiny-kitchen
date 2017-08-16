import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Wrapper, SecondaryWrap, Button, Modify, RecipeImg, RecipeText, Form, Title, List, Input, Box, TextArea } from './styled-components'
import * as action from '../store'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '750px'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    cellHeight: 'auto'
  }
};

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addField = this.addField.bind(this);
    this.deleteField = this.deleteField.bind(this);
    this.selectPic = this.selectPic.bind(this);
  }
  componentDidMount() {
    this.props.chromeRecipe(this.props.location.search.slice(5));
  }
  handleChange(evt) {
    let recipe = Object.assign({}, this.props.recipe);
    if (evt.target.name === "title") recipe.title = evt.target.value;
    else recipe[evt.target.name][evt.target.id] = evt.target.value;
    this.props.getRecipeSuccess(recipe)
  }
  handleSubmit(e) {
    e.preventDefault();
    let recipe = Object.assign({},
      {
        title: this.props.recipe.title,
        source_url: this.props.recipe.source_url,
        directions: this.props.recipe.directions,
        ingredients: this.props.recipe.ingredients,
        picture_url: this.props.recipe.selected_pic
      });
    this.props.submitRecipe(recipe)
  }
  addField(e) {
    e.preventDefault();
    let recipe = Object.assign({}, this.props.recipe);
    recipe[e.target.name] = [...recipe[e.target.name], `New ${e.target.name.slice(0, -1)}`];
    this.props.getRecipeSuccess(recipe)
  }
  deleteField(e) {
    e.preventDefault();
    let recipe = Object.assign({}, this.props.recipe);
    recipe[e.target.name].splice(+e.target.id, 1);
    this.props.getRecipeSuccess(recipe)
  }
  selectPic(e) {
    e.preventDefault();
    let recipe = Object.assign({}, this.props.recipe);
    recipe.selected_pic = recipe.picture_url[+e.target.id];
    this.setState({ highlighted: +e.target.id })
    this.props.getRecipeSuccess(recipe)
  }
  render() {
    let recipe = this.props.recipe;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input title type="text" name="title" onChange={this.handleChange} value={recipe && recipe.title} />
        <Title secondary>Choose a Picture:</Title>
        <div style={styles.root}>
          {recipe.picture_url.length && <GridList style={styles.gridList} cols={2.2}>
            {recipe.picture_url.map((pic, i) => {
              return (<GridTile
                onClick={this.selectPic}
                key={i}
                id={i}
              >
                {i === this.state.highlighted ?
                  <img id={i} src={pic} style={{ border: "5px solid #db3434" }} />
                  : <img id={i} src={pic} style={{ border: "5px solid transparent" }} />
                }  </GridTile>)
            })
            }
          </GridList>
          }
        </div>
        <SecondaryWrap>
          <Box>
            <Title secondary>Ingredients</Title> {
              recipe.ingredients.map((ingredient, i) =>
              { return (<div><Modify x href="#" onClick={this.deleteField} name="ingredients" id={i}>x</Modify> <Input type="text" key={i} id={i} name="ingredients" value={ingredient} style={{ height: "auto" }} onChange={this.handleChange} /></div>) })}
            <Modify href="#" onClick={this.addField} name="ingredients">+</Modify>
          </Box>
          <Box>
            <Title secondary>Directions</Title> {
              recipe.directions.map((direction, i) =>
              { return (<div><Modify x href="#" onClick={this.deleteField} name="directions" id={i}>x</Modify>  <TextArea type="text" key={i} id={i} name="directions" value={direction} onChange={this.handleChange} /></div>) })
            }
            <Modify href="#" onClick={this.addField} name="directions">+</Modify>
          </Box>
        </SecondaryWrap>
        <Button type="submit">Add Recipe</Button>
      </Form>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    recipe: state.recipe
  }
}

const mapDispatch = (dispatch) => {
  return {
    chromeRecipe: id => dispatch(action.chromeRecipe(id)),
    getRecipeSuccess: (recipe) => dispatch(action.getRecipeSuccess(recipe)),
    submitRecipe: (recipe) => dispatch(action.submitRecipe(recipe))
  }
}
// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(AddRecipe))
