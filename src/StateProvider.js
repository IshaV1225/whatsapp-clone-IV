import React, { createContext, useContext, useReducer} from 'react';

//Create Data Layer to push user data. Creating a context, this is where the data layer lives 
export const StateContext = createContext();

// StateProvider is the DataLayer.
// The higher order component takes 3 inputs (reducer, initialState, children) 
// <App/> is the child here

export const StateProvider= ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
//Allows us to pull info from Data Layer
export const useStateValue = () => useContext(StateContext);