import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, DataTable } from 'react-native-paper';
import { format } from 'date-fns';

const attendanceHistory = [
  {
    id: '1',
    name: 'Jasper Something',
    timeIn: '2024-02-14T08:00:00',
    timeOut: '2024-02-14T17:00:00',
  },
  {
    id: '2',
    name: 'Nate iDontKnow',
    timeIn: '2024-02-14T08:15:00',
    timeOut: '2024-02-14T17:30:00',
  },
  {
    id: '3',
    name: 'Cole Anything',
    timeIn: '2024-02-14T09:00:00',
    timeOut: '2024-02-14T18:00:00',
  },
];

export default function AttendanceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Attendance History</Text>
      </View>

      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Time In</DataTable.Title>
          <DataTable.Title>Time Out</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {attendanceHistory.map((record) => (
          <DataTable.Row key={record.id}>
            <DataTable.Cell>{record.name}</DataTable.Cell>
            <DataTable.Cell>
              {format(new Date(record.timeIn), 'HH:mm')}
            </DataTable.Cell>
            <DataTable.Cell>
              {record.timeOut ? format(new Date(record.timeOut), 'HH:mm') : '--:--'}
            </DataTable.Cell>
            <DataTable.Cell>
              {format(new Date(record.timeIn), 'MMM dd, yyyy')}
            </DataTable.Cell>
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