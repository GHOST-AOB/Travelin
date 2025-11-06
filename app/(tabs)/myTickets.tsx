import { router } from 'expo-router';
import { Calendar, ChevronRight, Clock, Download, MapPin, Share2, Ticket } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Define proper TypeScript interfaces
interface TicketItem {
  id: string;
  ticketId: string;
  route: string;
  date: string;
  time: string;
  passengers: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  company: string;
}

const MyTicketsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  const upcomingTickets: TicketItem[] = [
    {
      id: '1',
      ticketId: 'TKT2025110501',
      route: 'Kampala → Arua',
      date: 'Today',
      time: '02:45 PM',
      passengers: 2,
      status: 'confirmed',
      company: 'KK Travelers',
    },
    {
      id: '2',
      ticketId: 'TKT2025110601',
      route: 'Kampala → Koboko',
      date: 'Tomorrow',
      time: '09:15 AM',
      passengers: 1,
      status: 'confirmed',
      company: 'Baby Coach',
    },
    {
      id: '3',
      ticketId: 'TKT2025110801',
      route: 'Kampala → Yumbe',
      date: 'Dec 8',
      time: '11:30 AM',
      passengers: 3,
      status: 'confirmed',
      company: 'Nile Star',
    },
  ];

  const pastTickets: TicketItem[] = [
    {
      id: '4',
      ticketId: 'TKT2025103101',
      route: 'Arua → Kampala',
      date: 'Oct 31',
      time: '05:00 PM',
      passengers: 1,
      status: 'completed',
      company: 'KK Travelers',
    },
    {
      id: '5',
      ticketId: 'TKT2025102801',
      route: 'Koboko → Kampala',
      date: 'Oct 28',
      time: '03:30 PM',
      passengers: 1,
      status: 'completed',
      company: 'Baby Coach',
    },
  ];

  const cancelledTickets: TicketItem[] = [
    {
      id: '6',
      ticketId: 'TKT2025102501',
      route: 'Kampala → Yumbe',
      date: 'Oct 25',
      time: '10:00 AM',
      passengers: 2,
      status: 'cancelled',
      company: 'Nile Star',
    },
  ];

  const getTickets = (): TicketItem[] => {
    switch (selectedTab) {
      case 'upcoming':
        return upcomingTickets;
      case 'past':
        return pastTickets;
      case 'cancelled':
        return cancelledTickets;
      default:
        return upcomingTickets;
    }
  };

  const handleDownloadTicket = (ticket: TicketItem) => {
    Alert.alert('Download', `Downloading ticket ${ticket.ticketId}...`);
  };

  const handleShareTicket = async (ticket: TicketItem) => {
    try {
      await Share.share({
        message: `My Bus Ticket\n\nTicket ID: ${ticket.ticketId}\nRoute: ${ticket.route}\nDate: ${ticket.date} at ${ticket.time}\nPassengers: ${ticket.passengers}\nCompany: ${ticket.company}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share ticket. Please try again.');
    }
  };

  const handleCancelTicket = (ticket: TicketItem) => {
    Alert.alert(
      'Cancel Ticket',
      'Are you sure you want to cancel this ticket? Refund will be processed according to our policy.',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Your ticket has been cancelled. Refund will be processed within 3-5 business days.');
          },
        },
      ]
    );
  };

  const renderTicket = ({ item }: { item: TicketItem }) => {
    const isUpcoming = item.status === 'confirmed';
    const isPast = item.status === 'completed';
    const isCancelled = item.status === 'cancelled';

    return (
      <View
        style={[
          styles.ticketCard,
          isPast && styles.ticketCardPast,
          isCancelled && styles.ticketCardCancelled,
        ]}
      >
        <TouchableOpacity
          style={styles.ticketContent}
        >
          <View style={styles.ticketHeader}>
            <View style={styles.ticketIdSection}>
              <Ticket color={isCancelled ? '#EF4444' : isPast ? '#10B981' : '#3B82F6'} size={20} />
              <Text style={styles.ticketId}>{item.ticketId}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                isPast && styles.statusBadgeCompleted,
                isCancelled && styles.statusBadgeCancelled,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  isPast && styles.statusTextCompleted,
                  isCancelled && styles.statusTextCancelled,
                ]}
              >
                {isUpcoming ? 'Confirmed' : isPast ? 'Completed' : 'Cancelled'}
              </Text>
            </View>
          </View>

          <View style={styles.routeSection}>
            <MapPin color="#6B7280" size={18} />
            <Text style={styles.routeText}>{item.route}</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Calendar color="#6B7280" size={16} />
              <Text style={styles.detailText}>{item.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Clock color="#6B7280" size={16} />
              <Text style={styles.detailText}>{item.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.passengerCount}>{item.passengers} 👤</Text>
            </View>
          </View>

          <Text style={styles.companyText}>{item.company}</Text>
        </TouchableOpacity>

        {isUpcoming && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDownloadTicket(item)}
            >
              <Download color="#3B82F6" size={18} />
              <Text style={styles.actionButtonText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleShareTicket(item)}
            >
              <Share2 color="#3B82F6" size={18} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelTicket(item)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => Alert.alert('Ticket Details', `Ticket ID: ${item.ticketId}\nRoute: ${item.route}\nDate: ${item.date}\nTime: ${item.time}`)}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
          <ChevronRight color="#3B82F6" size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ticket color="#D1D5DB" size={64} />
      <Text style={styles.emptyTitle}>No Tickets Found</Text>
      <Text style={styles.emptyMessage}>
        {selectedTab === 'upcoming'
          ? 'You don\'t have any upcoming trips'
          : selectedTab === 'past'
          ? 'You haven\'t completed any trips yet'
          : 'No cancelled tickets'}
      </Text>
      {selectedTab === 'upcoming' && (
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.bookButtonText}>Book a Ticket</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <Text style={styles.headerSubtitle}>View and manage your bookings</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
          {upcomingTickets.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{upcomingTickets.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}
        >
          <Text style={[styles.tabText, selectedTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
          {pastTickets.length > 0 && selectedTab !== 'past' && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pastTickets.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'cancelled' && styles.activeTab]}
          onPress={() => setSelectedTab('cancelled')}
        >
          <Text style={[styles.tabText, selectedTab === 'cancelled' && styles.activeTabText]}>
            Cancelled
          </Text>
          {cancelledTickets.length > 0 && selectedTab !== 'cancelled' && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cancelledTickets.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={getTickets()}
        renderItem={renderTicket}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#111827',
  },
  badge: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ticketContent: {
    flex: 1,
  },
  ticketCardPast: {
    borderLeftColor: '#10B981',
  },
  ticketCardCancelled: {
    borderLeftColor: '#EF4444',
    opacity: 0.8,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketIdSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  statusBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusBadgeCancelled: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  statusTextCompleted: {
    color: '#065F46',
  },
  statusTextCancelled: {
    color: '#991B1B',
  },
  routeSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    flexWrap: 'wrap',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  passengerCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  companyText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B82F6',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
    flex: 1,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 20,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MyTicketsScreen;