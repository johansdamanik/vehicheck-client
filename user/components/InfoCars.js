import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'EXTERIOR',
    content: `In this section, we perform an inspection on the exterior of your vehicle, such as the authenticity of the car's paint, bumpers, engine hood condition, vehicle doors, and others.`,
    image: 'https://images.pexels.com/photos/257988/pexels-photo-257988.jpeg',
  },
  {
    title: 'INTERIOR',
    content: `The interior inspection is conducted on the inside of the vehicle (car cabin), including the dashboard, seats, carpets, steering wheel, vehicle ceiling, and others.`,
    image: 'https://i.ibb.co/ccpXJbs/Get-Paid-Stock-com-647c4c0beb3a9.jpg',
  },
  {
    title: 'COMPONENTS',
    content: `The inspection of the vehicle components is carried out to determine whether the car's engine is still functioning properly or not, including the condition of the car's electrical system, and so on.`,
    image: 'https://i.ibb.co/GnBS8Kc/Screenshot-9.png',
  },
  {
    title: 'DRIVING TEST',
    content: `In addition, we also conduct a test drive to evaluate the performance and handling of the vehicle on the road. During the test drive, we assess factors such as acceleration, braking, steering response, suspension, and overall driving experience. This allows us to ensure that the vehicle is in good operating condition and meets your expectations in terms of drivability and comfort.`,
    image: 'https://i.ibb.co/GVLPRMc/image.png',
  },
];

export default function InfoCars() {
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section) => {
    return (
      <ImageBackground source={{ uri: section.image }} style={styles.imageBackground}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{section.title}</Text>
        </View>
      </ImageBackground>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return <Accordion sectionContainerStyle={styles.containerCard} sections={SECTIONS} activeSections={activeSections} renderHeader={renderHeader} renderContent={renderContent} onChange={updateSections} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  containerCard: {
    marginVertical: 3,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  contentText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify' 
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  imageBackground: {
    height: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});
