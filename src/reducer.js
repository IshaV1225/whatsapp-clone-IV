//What the data layer looks like
// user: null means user isnt logged in

export const initialState = {
    user: null,
};

//there are certain actions. This is where we can push data into the data layer.
//Example: when we sign in, we dispatch an action meaning push this user into the data layer

export const actionTypes = {
    SET_USER: "SET_USER",
};

//When action is dispatched, we listen to it. What action ndid you dispatch. What we return is how we intend to change the data layer.
//Here we are saying that, keep the state of the data layer, but change the user to what we dispatched, or if something else, send default state

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
            
        default:
            return state;
    }
};

export default reducer;