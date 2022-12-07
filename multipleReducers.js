// // ---------------USING SINGLE REDUCER

// // ==================
// // ACTION
// // ==================

// const BUY_CAKE = "BUY_CAKE";
// const BUY_ICECREAM = "BUY_ICECREAM";

// function buyCake() {
//   return {
//     type: BUY_CAKE,
//     info: "Cake redux action",
//   };
// }

// function buyIcecream() {
//   return {
//     type: BUY_ICECREAM,
//     info: "Icecream redux action",
//   };
// }

// // ==================
// // REDUCER
// // ==================

// const initialState = {
//   numberOfCakes: 10,
//   numberOfIcecream: 10,
// };

// const reducer = (previousState = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...previousState,
//         numberOfCakes: previousState.numberOfCakes - 1,
//       };

//     case BUY_ICECREAM:
//       return {
//         ...previousState,
//         numberOfIcecream: previousState.numberOfIcecream - 1,
//       };

//     default:
//       return previousState;
//   }
// };

// // ==================
// // STORE
// // ==================

// const redux = require("redux");

// const createStore = redux.createStore;

// const store = createStore(reducer);

// console.log("Initial store State", store.getState());
// const unsubscribe = store.subscribe(() => {
//   console.log("Updated store state", store.getState());
// });
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyIcecream());
// store.dispatch(buyIcecream());
// unsubscribe();

// ---------------USING MULTIPLE REDUCERS---------------

const redux = require("redux");

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
  numberOfIcecream: 10,
};

const initialIcecreamState = {
  numberOfCakes: 10,
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

// const redux = require("redux");

const createStore = redux.createStore;

const store = createStore(rootReducer);

console.log("Initial cake store state", store.getState().cake.numberOfCakes);
console.log(
  "Initial icecream store state",
  store.getState().icecream.numberOfIcecream
);
const unsubscribe = store.subscribe(() => {
  console.log("Updated cake store state", store.getState().cake.numberOfCakes);
  console.log(
    "Updated icecream store state",
    store.getState().icecream.numberOfIcecream
  );
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();
