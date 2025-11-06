import { router } from 'expo-router';
import { AlertCircle, ArrowLeft, CheckCircle2, FileText, Send } from 'lucide-react-native';
import React, { useState } from 'react';
import {
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

const ComplaintsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'delay', label: 'Delay', icon: '⏰' },
    { id: 'service', label: 'Poor Service', icon: '😞' },
    { id: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
    { id: 'staff', label: 'Staff Behavior', icon: '👤' },
    { id: 'safety', label: 'Safety Concern', icon: '⚠️' },
    { id: 'refund', label: 'Refund Issue', icon: '💰' },
    { id: 'other', label: 'Other', icon: '📋' },
  ];

  const handleSubmitComplaint = () => {
    if (!selectedCategory || !subject.trim() || !description.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Complaint Submitted',
        'Your complaint has been registered successfully. We will contact you within 24-48 hours.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSelectedCategory('');
              setTicketId('');
              setSubject('');
              setDescription('');
              router.back();
            },
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>File a Complaint</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <AlertCircle color="#1E40AF" size={20} />
          <Text style={styles.infoBannerText}>
            We take your feedback seriously and will respond within 24-48 hours.
          </Text>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Category <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    selectedCategory === category.id && styles.categoryLabelSelected,
                  ]}
                >
                  {category.label}
                </Text>
                {selectedCategory === category.id && (
                  <View style={styles.selectedBadge}>
                    <CheckCircle2 color="#FFFFFF" size={14} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ticket ID (Optional) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ticket ID (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your ticket ID if applicable"
            value={ticketId}
            onChangeText={setTicketId}
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.helperText}>
            This helps us investigate your complaint faster
          </Text>
        </View>

        {/* Subject */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Subject <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Brief summary of your complaint"
            value={subject}
            onChangeText={setSubject}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please provide detailed information about your complaint"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.charCounter}>
            {description.length} / 500 characters
          </Text>
        </View>

        {/* Previous Complaints */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <FileText color="#6B7280" size={20} />
            <Text style={styles.historyTitle}>Your Recent Complaints</Text>
          </View>
          <View style={styles.historyCard}>
            <View style={styles.historyItem}>
              <View style={styles.historyDot} />
              <View style={styles.historyContent}>
                <Text style={styles.historySubject}>KK Travelers bus delayed by 30 minutes</Text>
                <Text style={styles.historyDate}>Nov 2, 2025 • Resolved</Text>
              </View>
              <View style={styles.resolvedBadge}>
                <Text style={styles.resolvedText}>✓</Text>
              </View>
            </View>
            <View style={styles.historyItem}>
              <View style={[styles.historyDot, styles.historyDotPending]} />
              <View style={styles.historyContent}>
                <Text style={styles.historySubject}>Baby Coach refund not processed</Text>
                <Text style={styles.historyDate}>Oct 28, 2025 • In Progress</Text>
              </View>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingText}>...</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmitComplaint}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.submitButtonText}>Submitting...</Text>
          ) : (
            <>
              <Send color="#FFFFFF" size={20} />
              <Text style={styles.submitButtonText}>Submit Complaint</Text>
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    gap: 12,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  required: {
    color: '#EF4444',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    minWidth: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  categoryCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: '#1E40AF',
  },
  selectedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
  },
  charCounter: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 6,
  },
  historySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  historyDotPending: {
    backgroundColor: '#F59E0B',
  },
  historyContent: {
    flex: 1,
  },
  historySubject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  resolvedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolvedText: {
    fontSize: 14,
    color: '#059669',
  },
  pendingBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingText: {
    fontSize: 14,
    color: '#D97706',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ComplaintsScreen;