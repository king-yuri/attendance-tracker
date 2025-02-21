import { View, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Button, Card, Text, IconButton } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Camera, CameraType } from 'expo-camera';

const employees = {
  '1': {
    firstName: 'Jasper',
    lastName: 'Something',
    position: 'Barista',
    timeIn: null,
    timeOut: null,
    photo: null,
  },
  '2': {
    firstName: 'Nate',
    lastName: 'iDontKnow',
    position: 'Counter Attendant',
    timeIn: null,
    timeOut: null,
    photo: null,
  },
  '3': {
    firstName: 'Cole',
    lastName: 'Anything',
    position: 'Manager',
    timeIn: null,
    timeOut: null,
    photo: null,
  },
};

export default function EmployeeDetails() {
  const { id } = useLocalSearchParams();
  const employee = employees[id as keyof typeof employees];

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [lastPhotoTime, setLastPhotoTime] = useState<Date | null>(null);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [timeIn, setTimeIn] = useState<Date | null>(null);
  const [timeOut, setTimeOut] = useState<Date | null>(null);

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    if (lastPhotoTime) {
      const checkPhotoAvailability = () => {
        const hoursSinceLastPhoto =
          (new Date().getTime() - lastPhotoTime.getTime()) / (1000 * 60 * 60);
        setCanTakePhoto(hoursSinceLastPhoto >= 7);
      };

      const interval = setInterval(checkPhotoAvailability, 1000);
      return () => clearInterval(interval);
    }
  }, [lastPhotoTime]);

  const handleTakePhoto = async () => {
    if (!permission?.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) {
        return;
      }
    }
    setIsCameraActive(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setIsCameraActive(false);
      const now = new Date();
      setLastPhotoTime(now);
      setCanTakePhoto(false);

      // Update time in/out based on whether we already have a time in
      if (!timeIn) {
        setTimeIn(now);
      } else {
        setTimeOut(now);
      }
    }
  };

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text>Employee not found</Text>
      </View>
    );
  }

  if (isCameraActive) {
    return (
      <View style={styles.cameraContainer}>
        <Camera ref={cameraRef} style={styles.camera} type={CameraType.front}>
          <View style={styles.cameraControls}>
            <IconButton
              icon="close"
              size={30}
              onPress={() => setIsCameraActive(false)}
            />
            <IconButton icon="camera" size={30} onPress={takePicture} />
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text variant="titleLarge">Employee Details</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <View style={styles.photoContainer}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : (
                <View style={styles.placeholderPhoto}>
                  <Text variant="headlineMedium">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.employeeInfo}>
              <Text variant="headlineMedium">{`${employee.firstName} ${employee.lastName}`}</Text>
              <Text variant="titleMedium" style={styles.position}>
                {employee.position}
              </Text>
            </View>
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.timeBlock}>
              <Text variant="labelMedium">Time In</Text>
              <Text variant="bodyLarge">
                {timeIn ? format(timeIn, 'HH:mm') : '--:--'}
              </Text>
            </View>
            <View style={styles.timeBlock}>
              <Text variant="labelMedium">Time Out</Text>
              <Text variant="bodyLarge">
                {timeOut ? format(timeOut, 'HH:mm') : '--:--'}
              </Text>
            </View>
          </View>

          <View style={styles.photoSection}>
            <Button
              mode="contained"
              onPress={handleTakePhoto}
              disabled={!canTakePhoto || (timeIn && timeOut)}
              icon={({ size, color }) => (
                <MaterialCommunityIcons
                  name="camera"
                  size={size}
                  color={color}
                />
              )}
            >
              {!timeIn ? 'Time In' : !timeOut ? 'Time Out' : 'Completed'}
            </Button>
            {photo && (
              <Text variant="bodySmall" style={styles.photoInfo}>
                Last photo taken:{' '}
                {lastPhotoTime ? format(lastPhotoTime, 'HH:mm') : '--:--'}
                {!canTakePhoto && '\nNext photo available in 7 hours'}
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  timeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 24,
  },
  timeBlock: {
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    gap: 16,
  },
  photoInfo: {
    textAlign: 'center',
    color: '#666',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
