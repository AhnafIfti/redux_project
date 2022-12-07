// ==================
// ACTION
// ==================

// SIMPLE ACTION
const BUY_CAKE = "BUY_CAKE";

// {
//   type: BUY_CAKE;
// }

// ACTION CREATOR
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

// ==================
// REDUCER
// ==================

// (previousState, action) => newState

// PREVIOUS STATE as the store has to be an object
const initialState = {
  numberOfCakes: 10,
};

// REDUCER
const reducer = (previousState = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...previousState,
        numberOfCakes: previousState.numberOfCakes - 1,
      };

    default:
      return previousState;
  }
};

// ==================
// STORE
// ==================

// FOR REACT APP
// import redux from 'redux'

// AS IT IS A JS APP
const redux = require("redux");

// -------------1. Holds App State-------------
// CREATE A STORE
const createStore = redux.createStore;

const store = createStore(reducer);

// -------------2. Implement getState to allow the app to access the store-------------
console.log("Initial store State", store.getState());

// -------------4. Allow the app to subscribe the changes in the store-------------
// as subsribe method returns a method which unsubscribes the store by calling it. store that method in unsubscribe
const unsubscribe = store.subscribe(() => {
  console.log("Updated store state", store.getState());
});

// -------------3. dispatch action to update state-------------
// dispatch method accepts an action. on the other hand actionCreator method returns an action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

// -------------5. unsubscribe-------------
unsubscribe();
