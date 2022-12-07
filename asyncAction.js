const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

// ==================
// ACTION
// ==================

const FETCH_USERS_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USER_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (user) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: user,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// Thunk special action creator
const fetchUsers = () => {
  // can return function instead of action
  // can have async API call
  // can dispatch action
  // To dispatch action pass 'dispatch' as the functions argument
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

// ==================
// REDUCER
// ==================

const initialState = {
  loading: true,
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// ==================
// STORE
// ==================

const createStore = redux.createStore;

const applyMiddleware = redux.applyMiddleware;

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());

// unsubscribe();
