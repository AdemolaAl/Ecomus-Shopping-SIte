'use client';
import { createContext, useReducer, useContext, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = async (...args) => {
  const res = await fetch(...args, { credentials: 'include' }); // Include cookies
  if (!res.ok) {
    const errorData = await res.json();
    const error = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    error.info = errorData;
    throw error;
  }
  return res.json();
};

// Initial state (without user, because it comes from SWR)
const initialState = {
  isRegisterOpen: false,
  isSignInOpen: false,
  isVer: false,
  loading: false,
  message: '',
  cart: false,
  isAuthenticated: false,
  openPopup: false,
  popupMessage: 'Action has been Completed',
  popupType: 'success',
  user: null,
};

// Utility function to reset all modal states to false
const resetAll = (state) => ({
  ...state,
  isRegisterOpen: false,
  isSignInOpen: false,
  isVer: false,
  cart: false,
  loading: false,
  openPopup: false,
});

// Reducer
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
      return { ...resetAll(state), openPopup: true };

    case 'CLOSE_POPUP':
      return { ...resetAll(state), openPopup: false };

    case 'SET_POPUPMESSAGE':
      return { ...state, popupMessage: action.payload };

    case 'SET_POPUPTYPE':
      return { ...state, popupType: action.payload };

    case 'SET_MESSAGE':
      return { ...state, message: action.payload };

    case 'SET_AUTH':
      return { ...state, isAuthenticated: action.payload };

    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };

    default:
      return state;
  }
};

// Context
const GlobalStateContext = createContext();

// Provider
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch user with SWR
  const { data: user, error } = useSWR('/api/user', fetcher);

  // Update state when user data changes
  useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_USER', payload: user });
    } else if (error) {
      dispatch({ type: 'SET_USER', payload: null });
    }
  }, [user, error]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook
export const useGlobalState = () => useContext(GlobalStateContext);
