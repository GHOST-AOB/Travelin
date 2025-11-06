import { NavigationState, RootStackParamList } from '@/types/navigation';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Initial navigation state
const initialState: NavigationState = {
  currentScreen: 'Home',
  bookingFlow: {
    isActive: false,
    currentStep: 'search',
    data: null,
  },
  userSession: {
    isAuthenticated: false,
    userId: undefined,
  },
};

// Navigation actions
type NavigationAction =
  | { type: 'SET_CURRENT_SCREEN'; payload: keyof RootStackParamList }
  | { type: 'START_BOOKING_FLOW'; payload: any }
  | { type: 'UPDATE_BOOKING_STEP'; payload: NavigationState['bookingFlow']['currentStep'] }
  | { type: 'END_BOOKING_FLOW' }
  | { type: 'SET_USER_SESSION'; payload: NavigationState['userSession'] }
  | { type: 'RESET_STATE' };

// Navigation reducer
const navigationReducer = (state: NavigationState, action: NavigationAction): NavigationState => {
  switch (action.type) {
    case 'SET_CURRENT_SCREEN':
      return {
        ...state,
        currentScreen: action.payload,
      };
    
    case 'START_BOOKING_FLOW':
      return {
        ...state,
        bookingFlow: {
          isActive: true,
          currentStep: 'search',
          data: action.payload,
        },
      };
    
    case 'UPDATE_BOOKING_STEP':
      return {
        ...state,
        bookingFlow: {
          ...state.bookingFlow,
          currentStep: action.payload,
        },
      };
    
    case 'END_BOOKING_FLOW':
      return {
        ...state,
        bookingFlow: {
          isActive: false,
          currentStep: 'search',
          data: null,
        },
      };
    
    case 'SET_USER_SESSION':
      return {
        ...state,
        userSession: action.payload,
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
};

// Navigation context
interface NavigationContextType {
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Navigation provider component
interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use navigation context
export const useNavigationState = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationState must be used within a NavigationProvider');
  }
  return context;
};