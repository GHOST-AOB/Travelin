import { router } from 'expo-router';
import { Bus, LogIn, UserPlus } from 'lucide-react-native';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const WelcomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Bus color="#FFFFFF" size={40} />
          </View>
          <Text style={styles.logoText}>Travelin</Text>
        </View>
        <Text style={styles.tagline}>Your Journey Starts Here</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroImagePlaceholder}>
          <Bus color="#3B82F6" size={120} />
        </View>
        <Text style={styles.heroTitle}>Book Bus Tickets</Text>
        <Text style={styles.heroSubtitle}>
          Travel across Uganda with ease. Book your tickets, track your journey, and enjoy comfortable rides.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🎫</Text>
          <Text style={styles.featureText}>Easy Booking</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🚌</Text>
          <Text style={styles.featureText}>Reliable Service</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>💳</Text>
          <Text style={styles.featureText}>Secure Payment</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.navigate('./login')}
        >
          <LogIn color="#FFFFFF" size={20} />
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.navigate('./signup')}
        >
          <UserPlus color="#3B82F6" size={20} />
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.textButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.textButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: 16,
    color: '#BFDBFE',
    fontWeight: '500',
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 24,
  },
  heroImagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionSection: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  textButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  textButtonText: {
    fontSize: 16,
    color: '#BFDBFE',
    fontWeight: '600',
  },
});

export default WelcomeScreen;