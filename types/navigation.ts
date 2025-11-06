/**
 * Navigation parameter types for the Travelin app
 * Defines the structure of parameters passed between screens using Expo Router
 */

/**
 * Search criteria for bus times screen
 */
export interface SearchCriteria {
  from: string;
  to: string;
  date: string;
}

/**
 * Selected route information for booking screen
 */
export interface SelectedRoute {
  routeId: string;
  departure: string;
  arrival: string;
  price: number;
}

/**
 * Booking details for payment screen
 */
export interface BookingDetails {
  routeId: string;
  passengerCount: number;
  totalAmount: number;
}

/**
 * Success screen confirmation details
 */
export interface SuccessDetails {
  ticketId: string;
  bookingReference: string;
}

/**
 * Navigation state management interface
 */
export interface NavigationState {
  currentScreen: string;
  bookingFlow: {
    isActive: boolean;
    currentStep: 'search' | 'booking' | 'payment' | 'success';
    data: any;
  };
  userSession: {
    isAuthenticated: boolean;
    userId?: string;
  };
}

/**
 * Navigation error types for error handling
 */
export type NavigationError = {
  type: 'INVALID_PARAMS' | 'SCREEN_LOAD_FAILED' | 'FLOW_INTERRUPTED';
  message: string;
  screen?: string;
};