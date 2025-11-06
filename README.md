# 🚌 Travelin - Bus Booking App

A modern React Native bus booking application built with Expo Router, featuring a complete authentication flow and seamless booking experience for Ugandan routes.

## 📱 Features

### 🔐 Authentication Flow
- **Welcome Screen** - Professional landing page with app branding
- **Login/Signup** - Complete user authentication system
- **Guest Access** - Option to explore app without registration
- **Demo Credentials** - Any email/password works for testing

### 🎫 Booking System
- **Route Search** - Browse popular Ugandan routes (Kampala ↔ Arua, Koboko, Yumbe)
- **Bus Times** - Real-time schedule with seat availability
- **Booking Flow** - Passenger details and confirmation
- **Payment Processing** - Secure payment with multiple methods
- **E-Tickets** - Digital tickets with QR codes

### 🚌 Transport Companies
- **Nile Star** - 12 routes, 4.5★ rating
- **KK Travelers** - 8 routes, 4.2★ rating  
- **Baby Coach** - 20 routes, 4.8★ rating

### 📋 Additional Features
- **My Tickets** - View upcoming, past, and cancelled bookings
- **Customer Support** - File complaints and track resolution
- **Responsive Design** - Optimized for all screen sizes
- **Dark/Light Theme** - Automatic theme switching

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (File-based routing)
- **Language**: TypeScript
- **Icons**: Lucide React Native
- **Styling**: StyleSheet (Native)
- **State Management**: React Hooks

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GHOST-AOB/Travelin.git
   cd Travelin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## 📁 Project Structure

```
Travelin/
├── app/                          # Main app screens
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home screen
│   │   ├── bus_times.tsx        # Bus schedules
│   │   ├── bookings.tsx         # Booking form
│   │   ├── payments.tsx         # Payment processing
│   │   ├── myTickets.tsx        # Ticket management
│   │   ├── complaints.tsx       # Customer support
│   │   └── TicketSuccess.tsx    # Booking confirmation
│   ├── welcome.tsx              # Landing screen
│   ├── login.tsx                # Authentication
│   ├── signup.tsx               # Account creation
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
├── constants/                    # App constants & themes
├── hooks/                        # Custom React hooks
├── navigation/                   # Navigation utilities
├── types/                        # TypeScript definitions
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3B82F6
- **Success Green**: #10B981
- **Warning Orange**: #F59E0B
- **Error Red**: #EF4444
- **Gray Scale**: #F9FAFB → #111827

### Typography
- **Headers**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Captions**: Medium, 12-14px

## 🔄 Navigation Flow

### Authentication
```
App Start → Welcome → Login/Signup → Main App
                  ↘ Guest Access → Main App
```

### Booking Flow
```
Home → Bus Times → Booking → Payment → Success
  ↓        ↓         ↓         ↓        ↓
Search → Select → Details → Pay → Ticket
```

## 🧪 Demo Credentials

For testing purposes, the app accepts any login credentials:

- **Email**: demo@travelin.com
- **Password**: demo123
- **Note**: Any email/password combination will work

## 📱 Screenshots

*Screenshots would go here showing the key screens*

## 🚌 Routes & Pricing

| Route | Price | Duration | Company |
|-------|-------|----------|---------|
| Kampala → Arua | $35 | 4h 10m | KK Travelers |
| Kampala → Koboko | $45 | 7h 0m | Baby Coach |
| Kampala → Yumbe | $28 | 5h 20m | Nile Star |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**GHOST-AOB**
- GitHub: [@GHOST-AOB](https://github.com/GHOST-AOB)

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- Lucide for the beautiful icon set
- React Native community for continuous support

---

**Happy Traveling! 🚌✨**