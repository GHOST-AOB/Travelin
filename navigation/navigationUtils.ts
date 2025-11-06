import {
    BookingDetails,
    NavigationError,
    RootStackParamList,
    SearchCriteria,
    SelectedRoute,
    SuccessDetails
} from '../types/navigation';

/**
 * Navigation utility functions for error handling and validation
 */

/**
 * Validates navigation parameters for type safety
 */
export const validateNavigationParams = (
  screen: keyof RootStackParamList,
  params: any
): boolean => {
  switch (screen) {
    case 'Home':
    case 'Complaints':
    case 'MyTickets':
      return params === undefined;
    
    case 'BusTimes':
      return !params || (
        params.searchCriteria && 
        typeof params.searchCriteria.from === 'string' &&
        typeof params.searchCriteria.to === 'string' &&
        typeof params.searchCriteria.date === 'string'
      );
    
    case 'Booking':
      return params && params.selectedRoute && 
        typeof params.selectedRoute.routeId === 'string' &&
        typeof params.selectedRoute.departure === 'string' &&
        typeof params.selectedRoute.arrival === 'string' &&
        typeof params.selectedRoute.price === 'number';
    
    case 'Payment':
      return params && params.bookingDetails &&
        typeof params.bookingDetails.routeId === 'string' &&
        typeof params.bookingDetails.passengerCount === 'number' &&
        typeof params.bookingDetails.totalAmount === 'number';
    
    case 'Success':
      return params && 
        typeof params.ticketId === 'string' &&
        typeof params.bookingReference === 'string';
    
    default:
      return false;
  }
};

/**
 * Handles navigation errors with appropriate recovery actions
 */
export const handleNavigationError = (error: NavigationError, navigation: any) => {
  console.error('Navigation Error:', error);
  
  switch (error.type) {
    case 'INVALID_PARAMS':
      // Redirect to home screen for invalid parameters
      navigation.navigate('Home');
      break;
    case 'SCREEN_LOAD_FAILED':
      // Show error screen with retry option
      console.warn('Screen load failed, staying on current screen');
      break;
    case 'FLOW_INTERRUPTED':
      // Preserve partial data and restart flow
      navigation.navigate('Home');
      break;
    default:
      navigation.navigate('Home');
  }
};

/**
 * Creates a navigation error object
 */
export const createNavigationError = (
  type: NavigationError['type'],
  message: string,
  screen?: keyof RootStackParamList
): NavigationError => ({
  type,
  message,
  screen,
});

/**
 * Type-safe navigation helper functions
 */

/**
 * Navigate to BusTimes screen with search criteria
 */
export const navigateToBusTimes = (
  navigation: any,
  searchCriteria?: SearchCriteria
) => {
  if (searchCriteria && !validateNavigationParams('BusTimes', { searchCriteria })) {
    throw createNavigationError('INVALID_PARAMS', 'Invalid search criteria for BusTimes screen');
  }
  navigation.navigate('BusTimes', searchCriteria ? { searchCriteria } : undefined);
};

/**
 * Navigate to Booking screen with selected route
 */
export const navigateToBooking = (
  navigation: any,
  selectedRoute: SelectedRoute
) => {
  if (!validateNavigationParams('Booking', { selectedRoute })) {
    throw createNavigationError('INVALID_PARAMS', 'Invalid selected route for Booking screen');
  }
  navigation.navigate('Booking', { selectedRoute });
};

/**
 * Navigate to Payment screen with booking details
 */
export const navigateToPayment = (
  navigation: any,
  bookingDetails: BookingDetails
) => {
  if (!validateNavigationParams('Payment', { bookingDetails })) {
    throw createNavigationError('INVALID_PARAMS', 'Invalid booking details for Payment screen');
  }
  navigation.navigate('Payment', { bookingDetails });
};

/**
 * Navigate to Success screen with confirmation details
 */
export const navigateToSuccess = (
  navigation: any,
  successDetails: SuccessDetails
) => {
  if (!validateNavigationParams('Success', successDetails)) {
    throw createNavigationError('INVALID_PARAMS', 'Invalid success details for Success screen');
  }
  navigation.navigate('Success', successDetails);
};