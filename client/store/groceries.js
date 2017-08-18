import axios from 'axios'
// Action Types
const GET_GROCERIES = 'GET_GROCERIES';

//Initial State
const groceries = [];

// Action Creators
const getGroceries = (groceries) => ({type: GET_GROCERIES, groceries});

//THUNK
export const fetchGroceries = () =>
  dispatch => {
    axios.get()
  }

// Reducer
export default function(state = groceries, action){
  switch (action.type) {
    case GET_GROCERIES:
      return action.groceries;
    default: return state;
  }
}
