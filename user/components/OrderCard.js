import * as React from 'react';
import { Card, Button, PaperProvider, Divider } from 'react-native-paper';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import ModalReder from './ModalReder';
import { useNavigation } from '@react-navigation/native';

export default function OrderCard({ order }) {
  console.log(order);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [loaded] = useFonts({
    Poppins: require('../assets/font/Poppins.ttf'),
    Nunito: require('../assets/font/Nunito.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <View>
        <Card style={{ backgroundColor: 'white' }}>
          <Card.Title
            titleStyle={{
              paddingTop: 6,
              textAlign: 'left',
              fontWeight: '700',
              fontSize: 18,
              fontFamily: 'Poppins',
            }}
            title={`${order.vehicle.brand} ${order.vehicle.model} - ${order.vehicle.year}`}
          />

          <Divider bold={true} />
          <Card.Content>
            <View style={{ gap: 5, marginVertical: 12 }}>
              <Text variant="titleLarge">
                {order.fullName} - {order.phoneNumber}
              </Text>
              <Text variant="bodyMedium">Booking Date: {order.date}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={{ gap: 8 }}>
            {order.payment !== 'unpaid' ? (
              <>
                <Button onPress={showModal} style={{ borderColor: '#FDA62A', borderWidth: 1 }}>
                  <Text style={{ color: '#FDA62A' }}>View Details</Text>
                </Button>
                {order.status !== 'taken' ? (
                  <Button
                    style={{
                      width: 100,
                      borderWidth: 1,
                      backgroundColor:
                        order.status === 'pending'
                          ? '#BDC3C7' // Merah
                          : order.status === 'taken'
                          ? '#FDA62A' // Oranye
                          : order.status === 'finish'
                          ? '#00FF00' // Hijau
                          : null,
                    }}
                  >
                    <Text style={{ color: '#FFFFFF' }}>{order.status === 'pending' ? 'Pending' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text>
                  </Button>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chat', {
                        userId: order.userId,
                        staffId: order.staffId,
                      })
                    }
                  >
                    <Button
                      style={{
                        borderColor: '#FDA62A',
                        backgroundColor: '#FDA62A',
                        borderWidth: 1,
                        width: 100,
                      }}
                    >
                      <Text style={{ color: '#FFFFFF' }}>Chat</Text>
                    </Button>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                <Button onPress={showModal} style={{ borderColor: '#FDA62A', borderWidth: 1 }}>
                  <Text style={{ color: '#FDA62A' }}>View Details</Text>
                </Button>
                <Button style={{ borderColor: '#F97C7C', width: 100, borderWidth: 1 }}>
                  <Text style={{ color: '#F97C7C' }}>Unpaid</Text>
                </Button>
              </>
            )}
          </Card.Actions>
        </Card>
        <ModalReder visible={visible} order={order} hideModal={hideModal} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
