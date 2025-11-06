import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar, Clock, DollarSign, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BusTimesScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const searchCriteria = {
    from: params.from as string || 'Kampala',
    to: params.to as string || 'Arua', 
    date: params.date as string || 'Today'
  };
  const [selectedDate, setSelectedDate] = useState(searchCriteria.date || 'Today');

  type BusTime = {
    id: string;
    time: string;
    route: string;
    seats: number;
    price: number;
    type: 'Express' | 'Regular';
  };

  const busTimes: BusTime[] = [
    { id: '1', time: '08:30 AM', route: 'Kampala → Arua', seats: 12, price: 35, type: 'Express' },
    { id: '2', time: '09:15 AM', route: 'Kampala → Arua', seats: 8, price: 35, type: 'Express' },
    { id: '3', time: '10:00 AM', route: 'Kampala → Koboko', seats: 20, price: 45, type: 'Regular' },
    { id: '4', time: '11:30 AM', route: 'Kampala → Yumbe', seats: 5, price: 28, type: 'Express' },
    { id: '5', time: '01:00 PM', route: 'Kampala → Arua', seats: 15, price: 35, type: 'Regular' },
    { id: '6', time: '02:45 PM', route: 'Kampala → Koboko', seats: 0, price: 45, type: 'Express' },
    { id: '7', time: '04:00 PM', route: 'Kampala → Yumbe', seats: 18, price: 28, type: 'Regular' },
    { id: '8', time: '05:30 PM', route: 'Kampala → Arua', seats: 10, price: 35, type: 'Express' },
  ];

  const dates = ['Today', 'Tomorrow', 'Dec 8', 'Dec 9', 'Dec 10'];

  const renderBusTime = ({ item }: { item: BusTime }) => (
    <TouchableOpacity 
      style={[styles.busCard, item.seats === 0 && styles.busCardDisabled]}
      onPress={() => item.seats > 0 && router.push({
        pathname: '/bookings',
        params: {
          routeId: item.id,
          departure: item.time,
          arrival: item.route.split(' → ')[1] || 'Destination',
          price: item.price.toString()
        }
      })}
      disabled={item.seats === 0}
    >
      <View style={styles.busTimeSection}>
        <Text style={styles.busTime}>{item.time}</Text>
        <View style={[styles.typeBadge, item.type === 'Express' ? styles.expressBadge : styles.regularBadge]}>
          <Text style={[styles.typeText, item.type === 'Express' ? styles.expressText : styles.regularText]}>
            {item.type}
          </Text>
        </View>
      </View>

      <Text style={styles.busRoute}>{item.route}</Text>

      <View style={styles.busDetails}>
        <View style={styles.detailItem}>
          <Users color="#6B7280" size={16} />
          <Text style={[styles.detailText, item.seats === 0 && styles.soldOutText]}>
            {item.seats === 0 ? 'Sold Out' : `${item.seats} seats`}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <DollarSign color="#10B981" size={16} />
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
      </View>

      {item.seats > 0 && item.seats <= 5 && (
        <View style={styles.warningBadge}>
          <Text style={styles.warningText}>⚠️ Only {item.seats} seats left</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {searchCriteria ? `${searchCriteria.from} → ${searchCriteria.to}` : 'Bus Schedule'}
          </Text>
          <Text style={styles.headerSubtitle}>Select your departure time</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/myTickets')}
          >
            <Text style={styles.headerButtonText}>Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/complaints')}
          >
            <Text style={styles.headerButtonText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dateScrollContainer}>
        <FlatList
          horizontal
          data={dates}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.dateCard, selectedDate === item && styles.dateCardActive]}
              onPress={() => setSelectedDate(item)}
            >
              <Calendar color={selectedDate === item ? '#FFFFFF' : '#6B7280'} size={18} />
              <Text style={[styles.dateText, selectedDate === item && styles.dateTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.infoBar}>
        <View style={styles.infoItem}>
          <Clock color="#6B7280" size={16} />
          <Text style={styles.infoText}>{busTimes.length} trips today</Text>
        </View>
        <View style={styles.infoDivider} />
        <Text style={styles.infoText}>Price range: $28 - $45</Text>
      </View>

      <FlatList
        data={busTimes}
        renderItem={renderBusTime}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 6,
  },
  headerButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  dateScrollContainer: {
    marginBottom: 16,
  },
  dateList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  dateCardActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  busCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  busCardDisabled: {
    opacity: 0.6,
  },
  busTimeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  busTime: {
    fontSize: 20,
    fontWeight: '700',
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
  busRoute: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  busDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  soldOutText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  warningBadge: {
    marginTop: 12,
    backgroundColor: '#FEF3C7',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  warningText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
});

export default BusTimesScreen;