'use client';
import { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
    isRegisterOpen: false,
    isSignInOpen: false,
    isVer: false,
    loading: false,
    message: '',
    cart: false,
    user: null,
    isAuthenticated: false,
    openPopup:false,
    popupMessage:'Action has been Completed',
    popupType:'success',
};

// Utility function to reset all modal states to false
const resetAll = (state) => ({
    ...state,
    isRegisterOpen: false,
    isSignInOpen: false,
    isVer: false,
    cart: false,
    loading: false,
    openPopup:false
});

// Reducer function to handle state changes
const reducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_SIGNIN':
            return { ...resetAll(state), isSignInOpen: true };
        case 'CLOSE_SIGNIN':
            return { ...state, isSignInOpen: false };

        case 'OPEN_REGISTER':
            return { ...resetAll(state), isRegisterOpen: true };
        case 'CLOSE_REGISTER':
            return { ...state, isRegisterOpen: false };

        case 'OPEN_VERIFICATION':
            return { ...resetAll(state), isVer: true };
        case 'CLOSE_VERIFICATION':
            return { ...state, isVer: false };

        case 'OPEN_LOADING':
            return { ...state, loading: true };
        case 'CLOSE_LOADING':
            return { ...state, loading: false };

        case 'OPEN_CART':
            return { ...resetAll(state), cart: true };
        case 'CLOSE_CART':
            return { ...state, cart: false };

        case 'OPEN_POPUP':
            return {...resetAll(state) , openPopup:true};

        case 'CLOSE_POPUP':
            return {...resetAll(state) , openPopup:false};

        case 'SET_POPUPMESSAGE':
            return { ...state, popupMessage: action.payload };

        case 'SET_POPUPTYPE':
            return { ...state, popupType: action.payload };

        case 'SET_MESSAGE':
            return { ...state, message: action.payload };

        case 'SET_AUTH':
            return { ...state, isAuthenticated: action.payload };
        default:
            return state;
    }
};

// Create the context
const GlobalStateContext = createContext();

// Provider component
export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook for accessing the global state
export const useGlobalState = () => useContext(GlobalStateContext);
