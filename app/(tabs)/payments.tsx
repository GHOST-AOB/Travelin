import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Check, CreditCard, Smartphone, Wallet } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const PaymentScreen = () => {
  const params = useLocalSearchParams();
  const bookingDetails = {
    routeId: params.routeId as string || '1',
    passengerCount: parseInt(params.passengerCount as string) || 1,
    totalAmount: parseFloat(params.totalAmount as string) || 37.5
  };
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Mobile money
  const [mobileNumber, setMobileNumber] = useState('');

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'mobile', name: 'Mobile Money', icon: Smartphone },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet },
  ];

  const formatCardNumber = (text: string): string => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiryDate = (text: string): string => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    if (cleaned.length <= 16) {
      setCardNumber(formatCardNumber(cleaned));
    }
  };

  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setExpiryDate(formatExpiryDate(cleaned));
    }
  };

  const handlePayment = () => {
    // Validate inputs based on payment method
    if (selectedMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        Alert.alert('Missing Information', 'Please fill in all card details');
        return;
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number');
        return;
      }
    } else if (selectedMethod === 'mobile') {
      if (!mobileNumber) {
        Alert.alert('Missing Information', 'Please enter your mobile money number');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push({
        pathname: '/TicketSuccess',
        params: {
          ticketId: 'TKT' + Date.now(),
          bookingReference: 'REF' + Date.now(),
          paymentMethod: selectedMethod,
          transactionId: 'TXN' + Date.now(),
        }
      });
    }, 2000);
  };

  const renderPaymentForm = () => {
    if (selectedMethod === 'card') {
      return (
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="number-pad"
              maxLength={19}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={cardName}
              onChangeText={setCardName}
              autoCapitalize="words"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={handleExpiryChange}
                keyboardType="number-pad"
                maxLength={5}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                value={cvv}
                onChangeText={(text) => text.length <= 3 && setCvv(text)}
                keyboardType="number-pad"
                maxLength={3}
                secureTextEntry
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>
      );
    } else if (selectedMethod === 'mobile') {
      return (
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mobile Money Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+256 700 000 000"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              You will receive a prompt on your phone to authorize the payment
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.formSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Digital wallet integration coming soon. Please use another payment method.
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Summary */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amountValue}>${bookingDetails?.totalAmount.toFixed(2)}</Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && styles.methodCardSelected,
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodContent}>
                  <View style={[
                    styles.methodIcon,
                    selectedMethod === method.id && styles.methodIconSelected,
                  ]}>
                    <Icon
                      color={selectedMethod === method.id ? '#3B82F6' : '#6B7280'}
                      size={24}
                    />
                  </View>
                  <Text style={[
                    styles.methodName,
                    selectedMethod === method.id && styles.methodNameSelected,
                  ]}>
                    {method.name}
                  </Text>
                </View>
                {selectedMethod === method.id && (
                  <View style={styles.checkmark}>
                    <Check color="#FFFFFF" size={16} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          {renderPaymentForm()}
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            🔒 Your payment information is encrypted and secure
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, (selectedMethod === 'wallet' || isProcessing) && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={selectedMethod === 'wallet' || isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.payButtonText}>Pay ${bookingDetails?.totalAmount.toFixed(2)}</Text>
            </>
          )}
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
  amountCard: {
    backgroundColor: '#3B82F6',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#BFDBFE',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  methodCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodIconSelected: {
    backgroundColor: '#DBEAFE',
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  methodNameSelected: {
    color: '#111827',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  securityNote: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  securityText: {
    fontSize: 14,
    color: '#065F46',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  payButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PaymentScreen;