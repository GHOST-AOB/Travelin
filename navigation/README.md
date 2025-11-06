# Navigation System

This app uses **Expo Router** with file-based routing for navigation. The app starts with authentication screens and then routes to the main tab-based navigation.

## Structure

### Authentication Flow
Users first encounter the authentication screens:

- **Welcome** (`/welcome`) - Landing page with login/signup options
- **Login** (`/login`) - User authentication screen
- **Signup** (`/signup`) - Account creation screen

### Tab Navigation
After authentication, users access the main app via bottom tabs defined in `app/(tabs)/_layout.tsx`:

- **Home** (`/`) - Main dashboard and search
- **Bus Times** (`/bus_times`) - Bus schedule and route selection  
- **My Tickets** (`/myTickets`) - Ticket management and history
- **Support** (`/complaints`) - Customer support and feedback

### Hidden Screens
These screens are part of the tab layout but hidden from the tab bar:

- **Booking** (`/bookings`) - Passenger details and booking confirmation
- **Payment** (`/payments`) - Payment processing  
- **Success** (`/TicketSuccess`) - Booking confirmation and ticket display

## Navigation Flow

### Authentication Flow
1. **App Start** → **Welcome Screen**
2. **Welcome** → **Login** or **Signup**
3. **Login/Signup** → **Main App (Tabs)**
4. **Guest Option** → **Main App (Tabs)** (bypass authentication)

### Main App Flow
1. **Home** → Search and browse routes
2. **Bus Times** → Select departure time → **Booking**
3. **Booking** → Enter passenger details → **Payment**
4. **Payment** → Process payment → **Success**
5. **Success** → Return to Home or view tickets

## Usage

Use Expo Router's navigation methods:

```tsx
import { router } from 'expo-router';

// Navigate to a screen
router.push('/bus_times');

// Navigate with parameters
router.push({
  pathname: '/bookings',
  params: { routeId: '123', price: '15' }
});

// Go back
router.back();

// Replace current screen (for auth flow)
router.replace('/(tabs)');
```

## Parameters

Access route parameters using `useLocalSearchParams()`:

```tsx
import { useLocalSearchParams } from 'expo-router';

const params = useLocalSearchParams();
const routeId = params.routeId as string;
```

## Authentication

The app accepts any credentials for demo purposes:
- **Demo Email**: demo@travelin.com
- **Demo Password**: demo123
- Any email/password combination will work

## Type Safety

Navigation types are defined in `types/navigation.ts` for consistent parameter passing between screens.