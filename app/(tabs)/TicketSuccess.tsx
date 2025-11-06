import { router, useLocalSearchParams } from 'expo-router';
import { Calendar, CheckCircle, Clock, Download, Home, MapPin, Share2 } from 'lucide-react-native';
import React from 'react';
import {
    Alert,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SuccessScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const ticketId = params.ticketId as string || 'TKT' + Date.now();
  const bookingReference = params.bookingReference as string || 'REF' + Date.now();

  const handleDownloadTicket = () => {
    Alert.alert(
      'Download Ticket',
      'Your ticket has been saved to your device.',
      [{ text: 'OK' }]
    );
  };

  const handleShareTicket = async () => {
    try {
      await Share.share({
        message: `My Bus Ticket\n\nTicket ID: ${ticketId}\nBooking Reference: ${bookingReference}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.checkCircle}>
            <CheckCircle color="#10B981" size={64} />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successMessage}>
            Your ticket has been booked successfully. Check your email for confirmation.
          </Text>
        </View>

        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <Text style={styles.ticketTitle}>E-Ticket</Text>
            <View style={styles.ticketIdBadge}>
              <Text style={styles.ticketIdText}>{ticketId}</Text>
            </View>
          </View>

          {/* QR Code Placeholder */}
          <View style={styles.qrSection}>
            <View style={styles.qrCode}>
              <Text style={styles.qrText}>QR CODE</Text>
            </View>
            <Text style={styles.qrInstruction}>Show this at the boarding point</Text>
          </View>

          <View style={styles.divider} />

          {/* Trip Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <MapPin color="#6B7280" size={20} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Booking Reference</Text>
                <Text style={styles.detailValue}>{bookingReference}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Calendar color="#6B7280" size={20} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>Today</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Clock color="#6B7280" size={20} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>Confirmed</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Booking Info */}
          <View style={styles.passengerSection}>
            <Text style={styles.passengerTitle}>Booking Information</Text>
            <Text style={styles.passengerName}>Ticket ID: {ticketId}</Text>
            <Text style={styles.passengerContact}>Reference: {bookingReference}</Text>
            <Text style={styles.passengerContact}>Status: Confirmed</Text>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>Important Notes</Text>
          <Text style={styles.noteText}>• Please arrive 15 minutes before departure</Text>
          <Text style={styles.noteText}>• Carry a valid ID for verification</Text>
          <Text style={styles.noteText}>• Show this QR code at the boarding point</Text>
          <Text style={styles.noteText}>• Refunds available up to 2 hours before departure</Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleDownloadTicket}>
          <Download color="#3B82F6" size={20} />
          <Text style={styles.secondaryButtonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleShareTicket}>
          <Share2 color="#3B82F6" size={20} />
          <Text style={styles.secondaryButtonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/')}
        >
          <Home color="#FFFFFF" size={20} />
          <Text style={styles.primaryButtonText}>Home</Text>
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
  content: {
    flex: 1,
  },
  successHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  checkCircle: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  ticketIdBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ticketIdText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCode: {
    width: 180,
    height: 180,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  qrText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  qrInstruction: {
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  detailsSection: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  passengerSection: {
    paddingVertical: 4,
  },
  passengerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  passengerContact: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  paymentSection: {
    gap: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  paymentMethod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  notesCard: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 12,
  },
  noteText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 8,
    lineHeight: 20,
  },
  actionBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 6,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SuccessScreen;