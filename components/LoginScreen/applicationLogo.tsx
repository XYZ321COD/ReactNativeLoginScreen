import React from 'react';

import {View, Image, StyleSheet} from 'react-native';
interface ApplicationLogoProps {}

export const ApplicationLogo: React.FC<ApplicationLogoProps> = ({}) => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoText}
        source={require('../../resources/Spotties.png')}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: 75,
    height: 75,
  },
  logoText: {
    width: 150,
    height: 50,
  },
});
