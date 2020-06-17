import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // backgroundColor: 'green',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: '#ff4136',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: screen.width / 3,
  },
  circleCorrect: {
    backgroundColor: '#28A125',
  },
});

const Alert = ({ correct, visible }) => {
  const icon = correct
    ? require('../assets/check.png')
    : require('../assets/close.png');
  let circleStyles = [styles.circle];

  if (!visible) {
    return null;
  }

  if (correct) {
    circleStyles.push(styles.circleCorrect);
  }

  return (
    <View style={styles.container}>
      <View style={circleStyles}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
    </View>
  );
};

export default Alert;
