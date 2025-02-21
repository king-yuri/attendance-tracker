import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

const employees = [
  { id: '1', firstName: 'Jasper', lastName: 'Something', position: 'Barista' },
  { id: '2', firstName: 'Nate', lastName: 'iDontKnow', position: 'Counter Attendant' },
  { id: '3', firstName: 'Cole', lastName: 'Anything', position: 'Manager' },
];

export default function EmployeesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Employees</Text>
      </View>

      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>First Name</DataTable.Title>
          <DataTable.Title>Last Name</DataTable.Title>
          <DataTable.Title>Position</DataTable.Title>
        </DataTable.Header>

        {employees.map((employee) => (
          <DataTable.Row key={employee.id}>
            <DataTable.Cell>{employee.firstName}</DataTable.Cell>
            <DataTable.Cell>{employee.lastName}</DataTable.Cell>
            <DataTable.Cell>{employee.position}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
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
  table: {
    backgroundColor: '#fff',
    margin: 16,
  },
});