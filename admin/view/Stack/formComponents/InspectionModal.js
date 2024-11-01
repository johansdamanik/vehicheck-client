import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { Card, Button, PaperProvider, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { Feather, MaterialIcons, Octicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';

export default function InspectionModal({ data, modal, setModal, setData }) {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth / 5;
 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedUris = result.assets.map((asset) => asset.uri);
        setData({ ...data, photo: selectedUris });
      }
    }
  };

  const color = (status) => {
    if (status === 'Safe') {
      return '#A6ECA8';
    } else if (status === 'Damaged') {
      return '#F97C7C';
    } else if (status === 'N/A') {
      return '#E8F6EF';
    } else {
      return '#EEEEEE';
    }
  };

  return (
    <Modal visible={modal} animationType="fade" transparent={true}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => setModal(false)} style={styles.mainContainerBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
        <Divider />
        <ScrollView style={{ marginBottom: 12 }}>
          {Object.keys(data)
            .filter((key) => key !== 'photo')
            .map((key) => (
              <View key={key} style={styles.container}>
                <Text style={{ fontSize: 20, flex: 1 }}>{data[key].title}</Text>
                <View
                  style={{
                    marginLeft: 20,
                    flex: 1,
                  }}
                >
                  <SelectDropdown
                    data={['Safe', 'Damaged', 'N/A']}
                    onSelect={(selectedItem, index) => {
                      const newData = { ...data };
                      newData[key].status = selectedItem;
                      setData(newData);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    defaultValue={'' || data[key].status}
                    buttonStyle={{
                      borderRadius: 25,
                      height: 25,
                      width: 150,
                      backgroundColor: color(data[key].status),
                    }}
                    dropdownIconPosition="right"
                    defaultButtonText="Status"
                    renderDropdownIcon={() => {
                      return <MaterialIcons name="arrow-drop-down" size={24} color="black" />;
                    }}
                  />
                </View>
              </View>
            ))}
          <Divider />
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600', marginVertical: 12 }}>Damaged Part Images</Text>
            <ScrollView horizontal>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 8,
                  padding: 8,
                }}
              >
                {data?.photo.map((item, index) => (
                  <View key={index} style={{ width: imageWidth, aspectRatio: 1 }}>
                    <Image source={{ uri: item }} style={{ flex: 1 }} />
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={{ marginVertical: 24 }}>
              <View style={{ alignSelf: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
                  <Feather name="plus-square" size={28} color="gray" />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center' }}>Upload Images</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  mainContainerBack: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#f3f6f4',
  },
});
