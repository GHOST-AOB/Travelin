import { router } from 'expo-router';
import { Bus, Clock, MapPin, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TransportCompany = {
  id: string;
  name: string;
  routes: number;
  rating: number;
  color: string;
};

type PopularRoute = {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  company: string;
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
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
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#111827',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  companyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  companyRoutes: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeLocations: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeFrom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 6,
  },
  routeArrow: {
    fontSize: 16,
    color: '#9CA3AF',
    marginHorizontal: 8,
  },
  routeTo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  routePrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  routeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  routeCompany: {
    fontSize: 14,
    color: '#6B7280',
  },
});

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'routes'>('all');

  // sample data to avoid undefined variable errors
  const transportCompanies: TransportCompany[] = [
    { id: '1', name: 'Nile Star', routes: 12, rating: 4.5, color: '#06B6D4' },
    { id: '2', name: 'KK Travelers', routes: 8, rating: 4.2, color: '#F97316' },
    { id: '3', name: 'Baby Coach', routes: 20, rating: 4.8, color: '#10B981' },
  ];

  const popularRoutes: PopularRoute[] = [
    { id: 'r1', from: 'Kampala', to: 'Arua', price: 35, duration: '4h 10m', company: 'KK Travelers' },
    { id: 'r2', from: 'Kampala', to: 'Koboko', price: 45, duration: '7h 0m', company: 'Baby Coach' },
    { id: 'r3', from: 'Kampala', to: 'Yumbe', price: 28, duration: '5h 20m', company: 'Nile Star' },
  ];

  const renderCompanyCard = ({ item }: { item: TransportCompany }) => (
    <TouchableOpacity 
      style={[styles.companyCard, { borderLeftColor: item.color }]}
      onPress={() => router.push({
        pathname: '/bus_times',
        params: { 
          from: 'Kampala', 
          to: 'Arua', 
          date: 'Today',
          company: item.name
        }
      })}
    >
      <View style={styles.companyHeader}>
        <View style={[styles.companyIcon, { backgroundColor: item.color + '20' }]}>
          <Bus color={item.color} size={24} />
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{item.name}</Text>
          <Text style={styles.companyRoutes}>{item.routes} routes available</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRouteCard = ({ item }: { item: PopularRoute }) => (
    <TouchableOpacity 
      style={styles.routeCard}
      onPress={() => router.push({
        pathname: '/bus_times',
        params: { 
          from: item.from, 
          to: item.to, 
          date: 'Today' 
        }
      })}
    >
      <View style={styles.routeHeader}>
        <View style={styles.routeLocations}>
          <MapPin color="#6B7280" size={16} />
          <Text style={styles.routeFrom}>{item.from}</Text>
          <Text style={styles.routeArrow}>→</Text>
          <Text style={styles.routeTo}>{item.to}</Text>
        </View>
        <Text style={styles.routePrice}>${item.price}</Text>
      </View>
      <View style={styles.routeFooter}>
        <View style={styles.routeDetail}>
          <Clock color="#6B7280" size={14} />
          <Text style={styles.routeDetailText}>{item.duration}</Text>
        </View>
        <Text style={styles.routeCompany}>{item.company}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Book Your Journey</Text>
            <Text style={styles.headerSubtitle}>Find buses and book tickets</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.push('/myTickets')}
            >
              <Text style={styles.headerButtonText}>My Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.push('/complaints')}
            >
              <Text style={styles.headerButtonText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#9CA3AF" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search routes or companies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>
            All Companies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'routes' && styles.activeTab]}
          onPress={() => setSelectedTab('routes')}
        >
          <Text style={[styles.tabText, selectedTab === 'routes' && styles.activeTabText]}>
            Popular Routes
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'all' ? (
        <FlatList
          data={transportCompanies}
          renderItem={renderCompanyCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={popularRoutes}
          renderItem={renderRouteCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;