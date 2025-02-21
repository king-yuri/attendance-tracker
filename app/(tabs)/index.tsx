import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { router } from 'expo-router';

const employees = [
  { id: '1', firstName: 'Jasper', lastName: 'Something', position: 'Barista', photo: null },
  { id: '2', firstName: 'Nate', lastName: 'iDontKnow', position: 'Counter Attendant', photo: null },
  { id: '3', firstName: 'Cole', lastName: 'Anything', position: 'Manager', photo: null },
];

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.grid}>
        {employees.map((employee) => (
          <Pressable
            key={employee.id}
            onPress={() => router.push(`/employee/${employee.id}`)}
          >
            <Card style={styles.employeeCard}>
              <Card.Content>
                <View style={styles.profileSection}>
                  <View style={styles.photoContainer}>
                    {employee.photo ? (
                      <Image
                        source={{ uri: employee.photo }}
                        style={styles.photo}
                      />
                    ) : (
                      <View style={styles.placeholderPhoto}>
                        <Text variant="headlineMedium">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.employeeInfo}>
                    <Text variant="titleMedium">{`${employee.firstName} ${employee.lastName}`}</Text>
                    <Text variant="bodyMedium" style={styles.position}>{employee.position}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
  },
  grid: {
    padding: 16,
    gap: 16,
  },
  employeeCard: {
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  photoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholderPhoto: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  employeeInfo: {
    flex: 1,
  },
  position: {
    color: '#666',
    marginTop: 4,
  },
});