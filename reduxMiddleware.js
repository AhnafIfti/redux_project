const redux = require("redux");
// import middleware
const reduxLogger = require("redux-logger");

// ==================
// ACTION
// ==================

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "Cake redux action",
  };
}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: "Icecream redux action",
  };
}

// ==================
// REDUCER
// ==================

const initialCakeState = {
  numberOfCakes: 10,
};

const initialIcecreamState = {
  numberOfIcecream: 10,
};

const combineReducers = redux.combineReducers;

const cakeReducer = (previousState = initialCakeState, action) => {
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

const icecreamReducer = (previousState = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...previousState,
        numberOfIcecream: previousState.numberOfIcecream - 1,
      };

    default:
      return previousState;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

// ==================
// STORE
// ==================

const createStore = redux.createStore;
// apply middleware
const applyMiddleware = redux.applyMiddleware;
// create createLogger method
const logger = reduxLogger.createLogger();

// pass the logger middleware by applyMiddleware as the 2nd parameter
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial cake store state", store.getState().cake.numberOfCakes);
console.log(
  "Initial icecream store state",
  store.getState().icecream.numberOfIcecream
);
// const unsubscribe = store.subscribe(() => {
//   console.log("Updated cake store state", store.getState().cake.numberOfCakes);
//   console.log(
//     "Updated icecream store state",
//     store.getState().icecream.numberOfIcecream
//   );
// });

// do not need to console. bcz logger middleware will handle it
const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();
