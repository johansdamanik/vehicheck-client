import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'BODY',
    content: `Inspection is carried out on the exterior of the motorcycle, including the authenticity of the paint, bodywork condition, fenders, and other parts. We ensure that there are no significant signs of damage, scratches, or cracks on the motorcycle body.`,
    image: 'https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/10/20/843168204.png',
  },
  {
    title: 'COMPONENTS',
    content: `We inspect the components of the motorcycle such as the electrical system, fuel system, braking system, suspension system, and others. The purpose of this inspection is to ensure that all components function properly and there are no noticeable damages.`,
    image: 'https://images.fosterwebmarketing.com/mylegalneeds.com/357389471%20motorcycle%20maintenance.jpg',
  },
  {
    title: 'RIDING TEST',
    content: `We conduct a riding test on the motorcycle to evaluate its performance and handling on the road. During the riding test, we assess factors such as acceleration, braking, steering response, suspension comfort, and overall riding experience. The goal is to ensure that the motorcycle operates smoothly and meets your expectations in terms of agility and riding comfort.`,
    image: 'https://otomotifzone.com/wp-content/uploads/2022/02/img_9150.jpg',
  },
];

export default function InfoMotor() {
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
        <Text  style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return <Accordion sectionContainerStyle={styles.containerCard}sections={SECTIONS} activeSections={activeSections} renderHeader={renderHeader} renderContent={renderContent} onChange={updateSections} />;
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
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});
