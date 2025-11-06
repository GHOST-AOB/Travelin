import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CreditCard, Mail, Minus, Phone, Plus, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookingScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const selectedRoute = {
    routeId: params.routeId as string || '1',
    departure: params.departure as string || '08:30 AM',
    arrival: params.arrival as string || 'Arua',
    price: parseFloat(params.price as string) || 35
  };
  const [passengerCount, setPassengerCount] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const incrementPassengers = () => {
    if (passengerCount < 20) { // Default max seats
      setPassengerCount(passengerCount + 1);
    }
  };

  const decrementPassengers = () => {
    if (passengerCount > 1) {
      setPassengerCount(passengerCount - 1);
    }
  };

  const totalAmount = selectedRoute.price * passengerCount;
  const serviceFee = 2.5;
  const finalTotal = totalAmount + serviceFee;

  const handleProceedToPayment = () => {
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    router.push({
      pathname: '/payments',
      params: {
        routeId: selectedRoute.routeId,
        passengerCount: passengerCount.toString(),
        totalAmount: finalTotal.toString(),
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Ticket</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trip Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Summary</Text>
          <View style={styles.tripCard}>
            <View style={styles.tripRow}>
              <Text style={styles.tripLabel}>Route</Text>
              <Text style={styles.tripValue}>{selectedRoute.departure} → {selectedRoute.arrival}</Text>
            </View>
            <View style={styles.tripRow}>
              <Text style={styles.tripLabel}>Departure</Text>
              <Text style={styles.tripValue}>{selectedRoute.departure}</Text>
            </View>
            <View style={styles.tripRow}>
              <Text style={styles.tripLabel}>Price per ticket</Text>
              <Text style={styles.tripValue}>${selectedRoute.price}</Text>
            </View>
          </View>
        </View>

        {/* Passenger Count */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Passengers</Text>
          <View style={styles.passengerControl}>
            <TouchableOpacity
              style={[styles.controlButton, passengerCount === 1 && styles.controlButtonDisabled]}
              onPress={decrementPassengers}
              disabled={passengerCount === 1}
            >
              <Minus color={passengerCount === 1 ? '#D1D5DB' : '#111827'} size={20} />
            </TouchableOpacity>
            <Text style={styles.passengerCount}>{passengerCount}</Text>
            <TouchableOpacity
              style={[styles.controlButton, passengerCount === 20 && styles.controlButtonDisabled]}
              onPress={incrementPassengers}
              disabled={passengerCount === 20}
            >
              <Plus color={passengerCount === 20 ? '#D1D5DB' : '#111827'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Passenger Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Information</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <User color="#6B7280" size={20} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Mail color="#6B7280" size={20} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Phone color="#6B7280" size={20} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Ticket ({passengerCount}x ${selectedRoute.price})</Text>
              <Text style={styles.priceValue}>${totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service Fee</Text>
              <Text style={styles.priceValue}>${serviceFee.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerTotal}>${finalTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handleProceedToPayment}>
          <CreditCard color="#FFFFFF" size={20} />
          <Text style={styles.payButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  tripValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  expressBadge: {
    backgroundColor: '#DBEAFE',
  },
  regularBadge: {
    backgroundColor: '#F3F4F6',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  expressText: {
    color: '#1E40AF',
  },
  regularText: {
    color: '#4B5563',
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonDisabled: {
    backgroundColor: '#F9FAFB',
  },
  passengerCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 32,
    minWidth: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerTotal: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default BookingScreen;