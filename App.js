import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Linking,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { registerRootComponent } from 'expo';

function App() {
  const [testDriveVisible, setTestDriveVisible] = useState(false);
  const [emiVisible, setEmiVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  const openPhone = () => {
    Linking.openURL('tel:+913532505000');
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/919434505000');
  };

  const calculateEMI = () => {
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = tenure * 12;
    const emi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return Math.round(emi);
  };

  const handleTestDrive = (carName) => {
    setSelectedCar(carName);
    setTestDriveVisible(true);
  };

  const submitTestDrive = () => {
    Alert.alert(
      'Test Drive Booked!',
      'Thank you for booking a test drive. We will contact you soon to confirm your appointment.',
      [{ text: 'OK', onPress: () => setTestDriveVisible(false) }]
    );
  };

  const cars = [
    {
      name: 'Wagon R',
      price: '₹5.54 Lakh',
      features: ['21.79 kmpl Mileage', '5 Seater', 'Smart Hybrid'],
      badge: 'Arena'
    },
    {
      name: 'Baleno',
      price: '₹6.61 Lakh',
      features: ['22.35 kmpl Mileage', '5 Seater', 'Premium Interior'],
      badge: 'Nexa'
    },
    {
      name: 'Dzire',
      price: '₹6.57 Lakh',
      features: ['24.12 kmpl Mileage', '5 Seater Sedan', 'CNG Available'],
      badge: 'Arena'
    },
    {
      name: 'Super Carry',
      price: '₹5.42 Lakh',
      features: ['21 kmpl Mileage', '740 kg Payload', 'CNG Option'],
      badge: 'Commercial'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Sevoke Motors</Text>
        <TouchableOpacity onPress={openPhone} style={styles.phoneButton}>
          <Ionicons name="call" size={20} color="#0071bc" />
          <Text style={styles.phoneText}>Call Now</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Drive Your Dreams with <Text style={styles.primaryText}>Sevoke Motors</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Siliguri's trusted Maruti Suzuki dealership. Explore Arena & Nexa cars, commercial vehicles, and pre-owned cars.
          </Text>
          
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Years of Trust</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>10,000+</Text>
              <Text style={styles.statLabel}>Happy Customers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Car Models</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickItem} onPress={openPhone}>
            <Ionicons name="call" size={24} color="#0071bc" />
            <Text style={styles.quickText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickItem} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={24} color="#0071bc" />
            <Text style={styles.quickText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickItem} onPress={() => setEmiVisible(true)}>
            <Ionicons name="calculator" size={24} color="#0071bc" />
            <Text style={styles.quickText}>EMI Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickItem}>
            <Ionicons name="location" size={24} color="#0071bc" />
            <Text style={styles.quickText}>Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Cars */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Popular Cars</Text>
          <Text style={styles.sectionSubtitle}>
            Discover our range of Maruti Suzuki vehicles designed for every need
          </Text>
          
          {cars.map((car, index) => (
            <View key={index} style={styles.carCard}>
              <View style={[styles.badge, { backgroundColor: car.badge === 'Nexa' ? '#4f46e5' : car.badge === 'Commercial' ? '#059669' : '#0071bc' }]}>
                <Text style={styles.badgeText}>{car.badge}</Text>
              </View>
              <Text style={styles.carName}>{car.name}</Text>
              <Text style={styles.carPrice}>Starting {car.price}</Text>
              {car.features.map((feature, idx) => (
                <Text key={idx} style={styles.carFeature}>• {feature}</Text>
              ))}
              <View style={styles.carActions}>
                <TouchableOpacity 
                  style={styles.outlineButton} 
                  onPress={() => handleTestDrive(car.name)}
                >
                  <Text style={styles.outlineButtonText}>Test Drive</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Why Choose Us */}
        <View style={[styles.section, styles.graySection]}>
          <Text style={styles.sectionTitle}>Why Choose Sevoke Motors?</Text>
          <Text style={styles.sectionSubtitle}>
            Experience the difference with Siliguri's most trusted Maruti Suzuki dealer
          </Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="trophy" size={32} color="white" />
            </View>
            <Text style={styles.featureTitle}>15+ Years of Excellence</Text>
            <Text style={styles.featureText}>
              Serving Siliguri with unmatched automotive expertise since 2008.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="construct" size={32} color="white" />
            </View>
            <Text style={styles.featureTitle}>Certified Service Center</Text>
            <Text style={styles.featureText}>
              State-of-the-art service facility with genuine Maruti parts and expert technicians.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="people" size={32} color="white" />
            </View>
            <Text style={styles.featureTitle}>Customer First Approach</Text>
            <Text style={styles.featureText}>
              Dedicated relationship managers ensuring personalized service throughout your journey.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Our Showroom</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Ionicons name="location" size={20} color="#0071bc" />
              <View>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactText}>Sevoke Road, Siliguri, West Bengal 734001</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color="#0071bc" />
              <View>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactText}>+91 353 250 5000</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="time" size={20} color="#0071bc" />
              <View>
                <Text style={styles.contactLabel}>Working Hours</Text>
                <Text style={styles.contactText}>Mon-Sat: 9:00 AM - 7:00 PM{"\n"}Sunday: 10:00 AM - 6:00 PM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Test Drive Modal */}
      <Modal
        visible={testDriveVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTestDriveVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Test Drive</Text>
              <TouchableOpacity onPress={() => setTestDriveVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.selectedCar}>Selected: {selectedCar}</Text>
            <TextInput style={styles.input} placeholder="Your Name" />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" />
            <TouchableOpacity style={styles.submitButton} onPress={submitTestDrive}>
              <Text style={styles.submitButtonText}>Book Test Drive</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* EMI Calculator Modal */}
      <Modal
        visible={emiVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEmiVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>EMI Calculator</Text>
              <TouchableOpacity onPress={() => setEmiVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.emiResult}>
              <Text style={styles.emiLabel}>Monthly EMI</Text>
              <Text style={styles.emiAmount}>₹{calculateEMI().toLocaleString('en-IN')}</Text>
            </View>
            
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Loan Amount: ₹{loanAmount.toLocaleString('en-IN')}</Text>
              <TextInput 
                style={styles.input} 
                value={loanAmount.toString()}
                onChangeText={(text) => setLoanAmount(Number(text) || 0)}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Interest Rate: {interestRate}%</Text>
              <TextInput 
                style={styles.input} 
                value={interestRate.toString()}
                onChangeText={(text) => setInterestRate(Number(text) || 0)}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Tenure: {tenure} years</Text>
              <TextInput 
                style={styles.input} 
                value={tenure.toString()}
                onChangeText={(text) => setTenure(Number(text) || 0)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0071bc',
    includeFontPadding: false,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phoneText: {
    color: '#0071bc',
    fontWeight: '500',
    includeFontPadding: false,
  },
  hero: {
    padding: 32,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1f2937',
    includeFontPadding: false,
  },
  primaryText: {
    color: '#0071bc',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    includeFontPadding: false,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0071bc',
    includeFontPadding: false,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    includeFontPadding: false,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  quickItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#f8fafc',
    marginHorizontal: 4,
    borderRadius: 12,
  },
  quickText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
    marginTop: 8,
    includeFontPadding: false,
  },
  section: {
    padding: 20,
  },
  graySection: {
    backgroundColor: '#f8fafc',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
    includeFontPadding: false,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    includeFontPadding: false,
  },
  carCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    includeFontPadding: false,
  },
  carName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    includeFontPadding: false,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0071bc',
    marginBottom: 12,
    includeFontPadding: false,
  },
  carFeature: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    includeFontPadding: false,
  },
  carActions: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#6b7280',
    fontWeight: '500',
    includeFontPadding: false,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0071bc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    includeFontPadding: false,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  featureIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#0071bc',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
    includeFontPadding: false,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    includeFontPadding: false,
  },
  contactCard: {
    backgroundColor: '#f8fafc',
    padding: 24,
    borderRadius: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    includeFontPadding: false,
  },
  contactText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    includeFontPadding: false,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    includeFontPadding: false,
  },
  selectedCar: {
    fontSize: 16,
    color: '#0071bc',
    marginBottom: 16,
    fontWeight: '500',
    includeFontPadding: false,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0071bc',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    includeFontPadding: false,
  },
  emiResult: {
    backgroundColor: '#0071bc',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  emiLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 8,
    includeFontPadding: false,
  },
  emiAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    includeFontPadding: false,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    includeFontPadding: false,
  },
});

registerRootComponent(App);
export default App;