import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { Wrapper, Tiles, TileTitle, ProfileUpperArea, ProfileWarning, ProfileCard, ProfilePic, ProfilePicArea, ProfileInfoArea, Links, AccentButton } from './styled-components'
import Tile from './Tile'
import * as action from '../store'
/**
 * COMPONENT
 */
class UserNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editName: false,
      editEmail: false,
      name: '',
      email: ''
    }
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleNameClick(event){
    const {value} = event.target;
    const editName = value === 'edit' ? true : false;
    this.setState({editName});
  }

  handleEmailClick(event){
    const {value} = event.target;
    const editEmail = value === 'edit' ? true : false;
    this.setState({editEmail});
  }

  handleChange(event, type){
    let newState = this.state;
    newState[type] = event.target.value
    this.setState(newState);
  }

  handleDone(event, type){
    let newState = this.state;
    let field = type === 'name' ? 'editName' : 'editEmail';
    newState[field] = false;
    this.setState(newState);

    let info = this.state[type];
    this.props.updateUser(info, type);
  }

  componentDidMount(){
    this.props.fetchUserRecipes(this.props.user.id)
  }
  render(){
    const {user, userRecipes} = this.props;
    console.log('state', this.state);
    return (
      <div>
        <ProfileUpperArea column>
          <ProfileCard>
            <ProfilePicArea>
              <ProfilePic src={user.picture_url} />
            </ProfilePicArea>
            <ProfileInfoArea>
              <div>
                {this.state.editName ? 
                  <div>
                    <input onChange={(e) => this.handleChange(e, 'name')}></input>
                    <AccentButton small type="submit" onClick={(e) => this.handleDone(e, 'name')}>
                      <span className="glyphicon glyphicon-ok" />
                    </AccentButton>
                    </div>
                  :
                  <div>
                    <h3>{user.first_name + ' ' + user.last_name}</h3>
                    <AccentButton small value="edit" onClick={this.handleNameClick}>
                      <span className="glyphicon glyphicon-pencil" />
                    </AccentButton>
                  </div>
                }
                {this.state.editEmail ?
                  <div>
                    <input onChange={(e) => this.handleChange(e, 'email')}></input>
                    <button type="submit" onClick={(e) => this.handleDone(e, 'email')}>Done</button>
                    <AccentButton small type="submit" onClick={(e) => this.handleDone(e, 'email')}>
                      <span className="glyphicon glyphicon-ok" />
                    </AccentButton>
                  </div>
                  :
                  <div>
                    <h5>{user.email}</h5>
                    <AccentButton small value="edit" name="email" onClick={this.handleEmailClick}>
                      <span className="glyphicon glyphicon-pencil" />
                    </AccentButton>
                    </div>
                  }
              </div>
            </ProfileInfoArea>
          </ProfileCard>
            <Links>
              <Link to='/home/recipes'>Recipes</Link>
              <Link to='/home/groceries'>Groceries</Link>
            </Links>
        </ProfileUpperArea>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    userRecipes: state.userRecipes
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUserRecipes: (userId) => dispatch(action.fetchUserRecipes(userId)),
    updateUser: (info, type) => dispatch(action.updateUser(info, type))
  }
}

export default connect(mapState, mapDispatch)(UserNav)

/**
 * PROP TYPES
 */
UserNav.propTypes = {
  user: PropTypes.object
}
