import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  ImageBackground,
} from "react-native";
import {
  Card,
  Button,
  PaperProvider,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import InspectionModal from "./formComponents/InspectionModal";
import openMap from "react-native-open-maps";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";

import { useDispatch, useSelector } from "react-redux";
const SUBMIT_INSPECTION = gql`
  mutation Mutation($input: NewInspection) {
    createInspection(input: $input) {
      id
      orderId
    }
  }
`;

export default function InspectionDetail({ route, navigation }) {
  const order = route.params.order;
  const dispatch = useDispatch();
  const inspectionForm = useSelector((state) => state.Form.Form);
  const [inspectionMutation, { loading, error }] =
    useMutation(SUBMIT_INSPECTION);

  const [modal, setModal] = useState({
    exterior: false,
    interior: false,
    component: false,
    tesJalan: false,
  });

  const [dataForm, setData] = useState({
    exterior: inspectionForm.exterior,
    interior: inspectionForm.interior,
    components: inspectionForm.components,
    tesJalan: inspectionForm.tesJalan,
  });

  const handleModal = (type) => {
    setModal((prevState) => ({
      ...prevState,
      [type]: true,
    }));
  };

  const openMaps = () => {
    const latitude = order.map.latitude;
    const longitude = order.map.longitude;
    const query = `${latitude},${longitude}`;

    openMap({
      query: query,
    });
  };

  const uploadImages = async () => {
    const dataKeys = Object.keys(dataForm);

    for (const key of dataKeys) {
      const uploadedImageUrls = [];
      for (const uri of dataForm[key].photo) {
        console.log(uri);
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `Images/${Date.now()}.jpg`);
        await uploadBytes(storageRef, blob);

        const downloadUrl = await getDownloadURL(storageRef);
        uploadedImageUrls.push(downloadUrl);
      }
      dataForm[key].photo = uploadedImageUrls;
      // setData((prevData) => ({
      //   ...prevData,
      //   [key]: {
      //     ...prevData[key],
      //     photo: uploadedImageUrls,
      //   },
      // }));
    }
  };

  const submitForm = async () => {
    try {
      await uploadImages();
      const { data } = await inspectionMutation({
        variables: {
          input: {
            orderId: order.id,
            vehicle: {
              type: order.vehicle.type,
              brand: order.vehicle.type,
              model: order.vehicle.model,
              year: order.vehicle.year,
              transmission: order.vehicle.transmission,
            },
            ...dataForm,
          },
        },
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#FDA62A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <PaperProvider>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {order.vehicle.brand} {order.vehicle.model}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>
              {order.vehicle.year} | {order.vehicle.transmission}
            </Text>
            <Divider style={{ marginBottom: 24 }} />

            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: "500" }}>Name: </Text>
              {order.fullName}
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: "500" }}>Phone Number: </Text>
              {order.phoneNumber}
            </Text>

            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: "500" }}>Booking Date: </Text>
              {order.date}, {order.time}
            </Text>

            <View style={{ marginBottom: 24 }}>
              <Text
                style={{ fontSize: 16, marginBottom: 4, fontWeight: "500" }}
              >
                Inspection Address:
              </Text>
              <Text style={{ padding: 8, backgroundColor: "rgba(0,0,0,0.1)" }}>
                {order.inspectionAddress}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              marginTop: 16,
              borderWidth: 2,
              borderColor: "#FDA62A",
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 16, color: "#FDA62A" }}>
              <TouchableOpacity onPress={openMaps}>
                <Button>
                  <Text style={{ color: "#FDA62A" }}> Open Google Maps</Text>
                </Button>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => handleModal("exterior")}
        >
          {/* <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setExteriorModal(true)}> */}
          <ImageBackground
            source={{
              uri: "https://images.pexels.com/photos/257988/pexels-photo-257988.jpeg",
            }}
            style={styles.imageBackground}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>Exterior</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 4 }}
          onPress={() => handleModal("interior")}
        >
          {/* <TouchableOpacity style={{ marginTop: 4 }} onPress={() => setInteriorModal(true)}> */}
          <ImageBackground
            source={{
              uri: "https://i.ibb.co/ccpXJbs/Get-Paid-Stock-com-647c4c0beb3a9.jpg",
            }}
            style={styles.imageBackground}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>Interior</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 4 }}
          onPress={() => handleModal("component")}
        >
          {/* <TouchableOpacity style={{ marginTop: 4 }} onPress={() => setComponentModal(true)}> */}
          <ImageBackground
            source={{ uri: "https://i.ibb.co/GnBS8Kc/Screenshot-9.png" }}
            style={styles.imageBackground}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>Komponen</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 4 }}
          onPress={() => handleModal("tesJalan")}
        >
          {/* <TouchableOpacity style={{ marginTop: 4 }} onPress={() => setTesJalanModal(true)}> */}
          <ImageBackground
            source={{ uri: "https://i.ibb.co/GVLPRMc/image.png" }}
            style={styles.imageBackground}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>Tes Jalan</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </PaperProvider>
      <View
        style={{
          alignSelf: "center",
          marginVertical: 16,
          borderWidth: 2,
          borderColor: "#FDA62A",
          borderRadius: 20,
        }}
      >
        <TouchableOpacity>
          <Button style={{ backgroundColor: "#FDA62A" }} onPress={submitForm}>
            <Text style={{ color: "white" }}>Finish Inspection</Text>
          </Button>
        </TouchableOpacity>
      </View>

      <InspectionModal
        modal={modal.exterior}
        data={dataForm.exterior}
        setData={(newData) =>
          setData((prevState) => ({ ...prevState, exterior: newData }))
        }
        setModal={(value) =>
          setModal((prevState) => ({ ...prevState, exterior: value }))
        }
      />

      <InspectionModal
        modal={modal.interior}
        data={dataForm.interior}
        setData={(newData) =>
          setData((prevState) => ({ ...prevState, interior: newData }))
        }
        setModal={(value) =>
          setModal((prevState) => ({ ...prevState, interior: value }))
        }
      />

      <InspectionModal
        modal={modal.component}
        data={dataForm.components}
        setData={(newData) =>
          setData((prevState) => ({ ...prevState, components: newData }))
        }
        setModal={(value) =>
          setModal((prevState) => ({ ...prevState, component: value }))
        }
      />

      <InspectionModal
        modal={modal.tesJalan}
        data={dataForm.tesJalan}
        setData={(newData) =>
          setData((prevState) => ({ ...prevState, tesJalan: newData }))
        }
        setModal={(value) =>
          setModal((prevState) => ({ ...prevState, tesJalan: value }))
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 125,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
});
