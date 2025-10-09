// src/app/(dashboard)/eccd_office/classroom.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

export default function Classroom() {
  const [selectedBarangay, setSelectedBarangay] = useState('All');
  const [selectedCenter, setSelectedCenter] = useState('All');
  const [schoolYear, setSchoolYear] = useState('2024');
  const [showBarangayDropdown, setShowBarangayDropdown] = useState(false);
  const [showCenterDropdown, setShowCenterDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showObservationForm, setShowObservationForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    observationDate: '',
    teachingPerformance: '',
    classroomManagement: '',
    studentEngagement: '',
    additionalNotes: '',
    overallRating: ''
  });

  const barangays = [
    'All',
    'Abella',
    'Bagumbayan Norte',
    'Bagumbayan Sur',
    'Balatas',
    'Calauag',
    'Cararayan',
    'Carolina',
    'Concepcion Grande',
    'Concepcion Pequeña',
    'Dayangdang',
    'Del Rosario',
    'Dinaga',
    'Igualdad Interior',
    'Lerma',
    'Liboton',
    'Mabolo',
    'Pacol',
    'Panicuason',
    'Peñafrancia',
    'Sabang',
    'San Felipe',
    'San Francisco (City Center)',
    'San Isidro',
    'Santa Cruz',
    'Tabuco',
    'Tinago',
    'Triangulo'
  ];

  const centers = ['All', 'Educare Center I', 'Educare Center II', 'Educare Center III', 'Educare Center IV'];
  const years = ['2024', '2023', '2022', '2021'];

  const [educareData, setEducareData] = useState([
    { id: 1, barangay: 'Abella', centerName: 'Educare Center I', location: 'Barangay Hall', teacher: 'MARY GRACE BUENAVIDA', status: 'Observed' },
    { id: 2, barangay: 'Abella', centerName: 'Educare Center I', location: 'Barangay Hall', teacher: 'ZARILU A. GABO', status: 'Pending' },
    { id: 3, barangay: 'Bagumbayan Norte', centerName: 'Educare Center I', location: 'Barangay Hall', teacher: 'MA. ELENA P. LOZANO', status: 'Observed' },
    { id: 4, barangay: 'Bagumbayan Sur', centerName: 'Educare Center I', location: 'Barangay Hall', teacher: 'GEMMA MUÑOZ', status: 'Pending' },
    { id: 5, barangay: 'Bagumbayan Sur', centerName: 'Educare Center II', location: 'Barangay Hall', teacher: 'GINA BELBIS', status: 'Observed' },
    { id: 6, barangay: 'Bagumbayan Sur', centerName: 'Educare Center II', location: 'Barangay Hall', teacher: 'PAULA PALEAN', status: 'Pending' },
    { id: 7, barangay: 'Balatas', centerName: 'Educare Center I', location: 'Barangay Hall', teacher: 'GEMMA M. BADANOY', status: 'Observed' },
    { id: 8, barangay: 'Balatas', centerName: 'Educare Center II', location: 'Barangay Hall', teacher: 'HAZEL E. PORTUGUEZ', status: 'Pending' },
    { id: 9, barangay: 'Balatas', centerName: 'Educare Center III', location: 'Barangay Hall', teacher: 'JUNABEL SJ. AYNERA', status: 'Observed' },
    { id: 10, barangay: 'Calauag', centerName: 'Educare Center I', location: 'Barangay Hall', teacher: 'SALVE G. LEONEN', status: 'Pending' },
    { id: 11, barangay: 'Calauag', centerName: 'Educare Center II', location: 'St. Vincent', teacher: 'GLORIA L. MORALES', status: 'Observed' },
    { id: 12, barangay: 'Calauag', centerName: 'Educare Center III', location: 'CLUPA', teacher: 'VIRGINIA G. SACAYAN', status: 'Pending' },
  ]);

  const filteredData = educareData.filter(item => {
    const matchesBarangay = selectedBarangay === 'All' || item.barangay === selectedBarangay;
    const matchesCenter = selectedCenter === 'All' || item.centerName === selectedCenter;
    const matchesSearch = searchTerm === '' ||
      item.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.centerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesBarangay && matchesCenter && matchesSearch;
  });

  const closeAllDropdowns = () => {
    setShowBarangayDropdown(false);
    setShowCenterDropdown(false);
    setShowYearDropdown(false);
  };

  const handleStatusClick = (item) => {
    if (item.status === 'Pending') {
      setSelectedTeacher(item);
      setFormData({
        observationDate: '',
        teachingPerformance: '',
        classroomManagement: '',
        studentEngagement: '',
        additionalNotes: '',
        overallRating: ''
      });
      setShowObservationForm(true);
    }
  };

  const handleFormSubmit = () => {
    setEducareData(prevData =>
      prevData.map(item =>
        item.id === selectedTeacher.id
          ? { ...item, status: 'Observed' }
          : item
      )
    );

    setShowObservationForm(false);
    setSelectedTeacher(null);
  };

  const handleFormCancel = () => {
    setShowObservationForm(false);
    setSelectedTeacher(null);
  };

  const EnhancedDropdown = ({ title, value, options, onSelect, isOpen, onToggle }) => (
    <View style={styles.enhancedDropdownContainer}>
      <TouchableOpacity
        style={[styles.enhancedDropdownButton, isOpen && styles.enhancedDropdownButtonActive]}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <View style={styles.dropdownContent}>
          <Text style={styles.dropdownLabel}>{title}</Text>
          <Text style={styles.dropdownValue}>{value}</Text>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#1e40af"
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.enhancedDropdownList}>
          <ScrollView style={styles.enhancedDropdownScroll} nestedScrollEnabled>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.enhancedDropdownItem,
                  value === option && styles.enhancedDropdownItemSelected
                ]}
                onPress={() => onSelect(option)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.enhancedDropdownItemText,
                  value === option && styles.enhancedDropdownItemTextSelected
                ]}>
                  {option}
                </Text>
                {value === option && (
                  <Ionicons name="checkmark" size={18} color="#1e40af" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  const MobileEnhancedDropdown = ({ title, value, options, onSelect, isOpen, onToggle }) => (
    <View style={mobileStyles.enhancedDropdownContainer}>
      <TouchableOpacity
        style={[mobileStyles.enhancedDropdownButton, isOpen && mobileStyles.enhancedDropdownButtonActive]}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <View style={mobileStyles.dropdownContent}>
          <Text style={mobileStyles.dropdownLabel}>{title}</Text>
          <Text style={mobileStyles.dropdownValue}>{value}</Text>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={18}
          color="#1e40af"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={mobileStyles.enhancedDropdownList}>
          <ScrollView style={mobileStyles.enhancedDropdownScroll} nestedScrollEnabled>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  mobileStyles.enhancedDropdownItem,
                  value === option && mobileStyles.enhancedDropdownItemSelected
                ]}
                onPress={() => onSelect(option)}
                activeOpacity={0.7}
              >
                <Text style={[
                  mobileStyles.enhancedDropdownItemText,
                  value === option && mobileStyles.enhancedDropdownItemTextSelected
                ]}>
                  {option}
                </Text>
                {value === option && (
                  <Ionicons name="checkmark" size={16} color="#1e40af" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  // Observation Form Component
  const ObservationForm = () => (
    <Modal
      visible={showObservationForm}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleFormCancel}
    >
      <View style={formStyles.container}>
        <View style={formStyles.header}>
          <TouchableOpacity onPress={handleFormCancel} style={formStyles.closeButton}>
            <Ionicons name="close" size={24} color="#475569" />
          </TouchableOpacity>
          <Text style={formStyles.title}>Observation Form</Text>
          <View style={formStyles.placeholder} />
        </View>

        {selectedTeacher && (
          <View style={formStyles.teacherInfo}>
            <Text style={formStyles.teacherName}>{selectedTeacher.teacher}</Text>
            <Text style={formStyles.teacherDetails}>
              {selectedTeacher.centerName} • {selectedTeacher.barangay}
            </Text>
          </View>
        )}

        <ScrollView style={formStyles.form} showsVerticalScrollIndicator={false}>
          <View style={formStyles.field}>
            <Text style={formStyles.label}>Observation Date *</Text>
            <TextInput
              style={formStyles.input}
              value={formData.observationDate}
              onChangeText={(text) => setFormData({...formData, observationDate: text})}
              placeholder="Enter observation date"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={formStyles.field}>
            <Text style={formStyles.label}>Teaching Performance *</Text>
            <TextInput
              style={[formStyles.input, formStyles.textArea]}
              value={formData.teachingPerformance}
              onChangeText={(text) => setFormData({...formData, teachingPerformance: text})}
              placeholder="Evaluate teaching methods, lesson delivery, and subject knowledge"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={formStyles.field}>
            <Text style={formStyles.label}>Classroom Management *</Text>
            <TextInput
              style={[formStyles.input, formStyles.textArea]}
              value={formData.classroomManagement}
              onChangeText={(text) => setFormData({...formData, classroomManagement: text})}
              placeholder="Assess classroom organization, discipline, and environment"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={formStyles.field}>
            <Text style={formStyles.label}>Student Engagement *</Text>
            <TextInput
              style={[formStyles.input, formStyles.textArea]}
              value={formData.studentEngagement}
              onChangeText={(text) => setFormData({...formData, studentEngagement: text})}
              placeholder="Observe student participation and interaction"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={formStyles.field}>
            <Text style={formStyles.label}>Overall Rating *</Text>
            <View style={formStyles.ratingContainer}>
              {['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    formStyles.ratingButton,
                    formData.overallRating === rating && formStyles.ratingButtonSelected
                  ]}
                  onPress={() => setFormData({...formData, overallRating: rating})}
                >
                  <Text style={[
                    formStyles.ratingText,
                    formData.overallRating === rating && formStyles.ratingTextSelected
                  ]}>
                    {rating}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={formStyles.field}>
            <Text style={formStyles.label}>Additional Notes</Text>
            <TextInput
              style={[formStyles.input, formStyles.textArea]}
              value={formData.additionalNotes}
              onChangeText={(text) => setFormData({...formData, additionalNotes: text})}
              placeholder="Any additional observations or recommendations"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
            />
          </View>
        </ScrollView>

        <View style={formStyles.footer}>
          <TouchableOpacity style={formStyles.cancelButton} onPress={handleFormCancel}>
            <Text style={formStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={formStyles.submitButton} onPress={handleFormSubmit}>
            <Text style={formStyles.submitButtonText}>Submit Observation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const TableRow = ({ item, index }) => (
    <View style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <Text style={[styles.tableCell, styles.barangayColumn]} numberOfLines={2}>
        {item.barangay}
      </Text>
      <Text style={[styles.tableCell, styles.centerColumn]} numberOfLines={2}>
        {item.centerName}
      </Text>
      <Text style={[styles.tableCell, styles.locationColumn]} numberOfLines={2}>
        {item.location}
      </Text>
      <Text style={[styles.tableCell, styles.teacherColumn]} numberOfLines={3}>
        {item.teacher}
      </Text>
      <View style={[styles.statusColumn, styles.statusContainer]}>
        <TouchableOpacity
          style={[
            styles.statusBadge,
            item.status === 'Observed' ? styles.observedBadge : styles.pendingBadge,
            item.status === 'Pending' && styles.clickableStatus
          ]}
          onPress={() => handleStatusClick(item)}
          disabled={item.status !== 'Pending'}
        >
          <Text style={[
            styles.statusText,
            item.status === 'Observed' ? styles.observedText : styles.pendingText
          ]}>
            {item.status}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Mobile Component
  const MobileCard = ({ item, index }) => (
    <View style={mobileStyles.card}>
      <View style={mobileStyles.cardHeader}>
        <Text style={mobileStyles.cardTitle}>{item.barangay}</Text>
        <TouchableOpacity
          style={[
            mobileStyles.statusBadge,
            item.status === 'Observed' ? mobileStyles.observedBadge : mobileStyles.pendingBadge,
            item.status === 'Pending' && mobileStyles.clickableStatus
          ]}
          onPress={() => handleStatusClick(item)}
          disabled={item.status !== 'Pending'}
        >
          <Text style={[
            mobileStyles.statusText,
            item.status === 'Observed' ? mobileStyles.observedText : mobileStyles.pendingText
          ]}>
            {item.status}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={mobileStyles.cardContent}>
        <View style={mobileStyles.cardRow}>
          <Text style={mobileStyles.cardLabel}>Center:</Text>
          <Text style={mobileStyles.cardValue}>{item.centerName}</Text>
        </View>

        <View style={mobileStyles.cardRow}>
          <Text style={mobileStyles.cardLabel}>Location:</Text>
          <Text style={mobileStyles.cardValue}>{item.location}</Text>
        </View>

        <View style={mobileStyles.cardRow}>
          <Text style={mobileStyles.cardLabel}>Teacher:</Text>
          <Text style={mobileStyles.cardValue}>{item.teacher}</Text>
        </View>
      </View>
    </View>
  );

  if (isMobile) {
    return (
      <View style={mobileStyles.container}>
        <ScrollView style={mobileStyles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Text style={mobileStyles.title}>EDUCARE CENTERS{'\n'}MASTERLIST</Text>

          {/* Search */}
          <View style={mobileStyles.searchContainer}>
            <Ionicons name="search" size={20} color="#64748b" style={mobileStyles.searchIcon} />
            <TextInput
              style={mobileStyles.searchInput}
              placeholder="Search by any field..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={mobileStyles.filtersContainer}>
            <MobileEnhancedDropdown
              title="Barangay"
              value={selectedBarangay}
              options={barangays}
              onSelect={(value) => {
                setSelectedBarangay(value);
                setShowBarangayDropdown(false);
              }}
              isOpen={showBarangayDropdown}
              onToggle={() => {
                closeAllDropdowns();
                setShowBarangayDropdown(!showBarangayDropdown);
              }}
            />

            <MobileEnhancedDropdown
              title="Center"
              value={selectedCenter}
              options={centers}
              onSelect={(value) => {
                setSelectedCenter(value);
                setShowCenterDropdown(false);
              }}
              isOpen={showCenterDropdown}
              onToggle={() => {
                closeAllDropdowns();
                setShowCenterDropdown(!showCenterDropdown);
              }}
            />

            <MobileEnhancedDropdown
              title="Year"
              value={schoolYear}
              options={years}
              onSelect={(value) => {
                setSchoolYear(value);
                setShowYearDropdown(false);
              }}
              isOpen={showYearDropdown}
              onToggle={() => {
                closeAllDropdowns();
                setShowYearDropdown(!showYearDropdown);
              }}
            />
          </View>

          <View style={mobileStyles.cardsContainer}>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <MobileCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <View style={mobileStyles.noResults}>
                <Ionicons name="search" size={48} color="#cbd5e1" />
                <Text style={mobileStyles.noResultsTitle}>No Records Found</Text>
                <Text style={mobileStyles.noResultsText}>
                  Try adjusting your search or filter criteria
                </Text>
              </View>
            )}
          </View>

          <Text style={mobileStyles.resultsCount}>
            Showing {filteredData.length} of {educareData.length} records
          </Text>
        </ScrollView>

        <ObservationForm />
      </View>
    );
  }

  // Web Layout
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDUCARE CENTERS MASTERLIST</Text>

      <View style={styles.filterRow}>
        <View style={styles.leftFilters}>
          <EnhancedDropdown
            title="Barangay"
            value={selectedBarangay}
            options={barangays}
            onSelect={(value) => {
              setSelectedBarangay(value);
              setShowBarangayDropdown(false);
            }}
            isOpen={showBarangayDropdown}
            onToggle={() => {
              closeAllDropdowns();
              setShowBarangayDropdown(!showBarangayDropdown);
            }}
          />

          <EnhancedDropdown
            title="Center"
            value={selectedCenter}
            options={centers}
            onSelect={(value) => {
              setSelectedCenter(value);
              setShowCenterDropdown(false);
            }}
            isOpen={showCenterDropdown}
            onToggle={() => {
              closeAllDropdowns();
              setShowCenterDropdown(!showCenterDropdown);
            }}
          />

          <EnhancedDropdown
            title="School Year"
            value={schoolYear}
            options={years}
            onSelect={(value) => {
              setSchoolYear(value);
              setShowYearDropdown(false);
            }}
            isOpen={showYearDropdown}
            onToggle={() => {
              closeAllDropdowns();
              setShowYearDropdown(!showYearDropdown);
            }}
          />
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by any field..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={styles.scrollableTableContainer}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.barangayColumn]}>BARANGAY</Text>
            <Text style={[styles.headerCell, styles.centerColumn]}>CENTER NAME</Text>
            <Text style={[styles.headerCell, styles.locationColumn]}>LOCATION</Text>
            <Text style={[styles.headerCell, styles.teacherColumn]}>TEACHER</Text>
            <Text style={[styles.headerCell, styles.statusColumn]}>STATUS</Text>
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => <TableRow item={item} index={index} />}
            style={styles.tableBody}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              <View style={styles.noResults}>
                <Ionicons name="search" size={48} color="#cbd5e1" />
                <Text style={styles.noResultsTitle}>No Records Found</Text>
                <Text style={styles.noResultsText}>
                  No records found matching your filter criteria.
                </Text>
              </View>
            }
          />
        </View>
      </View>

      <Text style={styles.resultsCount}>
        Showing {filteredData.length} of {educareData.length} records
      </Text>

      <ObservationForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e40af',
    marginBottom: 32,
    letterSpacing: 1,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 20,
    zIndex: 2000,
    position: 'relative',
  },
  leftFilters: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    flex: 1,
    zIndex: 2000,
    position: 'relative',
  },
  searchContainer: {
    position: 'relative',
    width: 320,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -9 }],
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingLeft: 44,
    borderRadius: 12,
    fontSize: 14,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  enhancedDropdownContainer: {
    position: 'relative',
    width: 180,
    zIndex: 2100,
  },
  enhancedDropdownButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  enhancedDropdownButtonActive: {
    borderColor: '#1e40af',
    shadowColor: '#1e40af',
    shadowOpacity: 0.15,
  },
  dropdownContent: {
    flex: 1,
  },
  dropdownLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dropdownValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  enhancedDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 240,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 2200,
  },
  enhancedDropdownScroll: {
    maxHeight: 240,
  },
  enhancedDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  enhancedDropdownItemSelected: {
    backgroundColor: '#f0f9ff',
  },
  enhancedDropdownItemText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  enhancedDropdownItemTextSelected: {
    color: '#1e40af',
    fontWeight: '600',
  },
   scrollableTableContainer: {
    flex: 1,
    marginBottom: 20,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1,
    position: 'relative',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
  },
  headerCell: {
    fontWeight: '700',
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableBody: {
    maxHeight: 600,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
  },
  evenRow: {
    backgroundColor: '#fafbfc',
  },
  oddRow: {
    backgroundColor: 'white',
  },
  tableCell: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  barangayColumn: {
    width: '20%',
    paddingRight: 12,
  },
  centerColumn: {
    width: '20%',
    paddingRight: 12,
  },
  locationColumn: {
    width: '18%',
    paddingRight: 12,
  },
  teacherColumn: {
    width: '25%',
    paddingRight: 12,
  },
  statusColumn: {
    width: '17%',
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  observedBadge: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  clickableStatus: {
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  observedText: {
    color: '#22c55e',
  },
  pendingText: {
    color: '#f59e0b',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  resultsCount: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});

// Form Styles
const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  placeholder: {
    width: 40,
  },
  teacherInfo: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  teacherDetails: {
    fontSize: 14,
    color: '#64748b',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  ratingButtonSelected: {
    backgroundColor: '#1e40af',
    borderColor: '#1e40af',
  },
  ratingText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  ratingTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  submitButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#1e40af',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e40af',
    lineHeight: 32,
    marginBottom: 24,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  searchContainer: {
    position: 'relative',
    width: 320,
    zIndex: 2000,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 20,
    paddingLeft: 50,
    borderRadius: 25,
    fontSize: 15,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  enhancedDropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  enhancedDropdownButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  enhancedDropdownButtonActive: {
    borderColor: '#1e40af',
    shadowColor: '#1e40af',
    shadowOpacity: 0.1,
  },
  dropdownContent: {
    flex: 1,
  },
  dropdownLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 2,
  },
  dropdownValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  enhancedDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
  },
  enhancedDropdownScroll: {
    maxHeight: 200,
  },
  enhancedDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  enhancedDropdownItemSelected: {
    backgroundColor: '#f0f9ff',
  },
  enhancedDropdownItemText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  enhancedDropdownItemTextSelected: {
    color: '#1e40af',
    fontWeight: '600',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    width: 80,
    marginRight: 12,
  },
  cardValue: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  observedBadge: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  clickableStatus: {
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  observedText: {
    color: '#22c55e',
  },
  pendingText: {
    color: '#f59e0b',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    marginHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  resultsCount: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    paddingHorizontal: 20,
  },
});