import React from 'react';
import {Footer, View, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StringValueNode} from 'graphql';

interface FooterProps {
  text: string;
  textHighLighted: string;
  navigateTo: string;
}

export const EntryScreenFooter: React.FC<FooterProps> = (
  props: FooterProps,
) => {
  const navigation = useNavigation();

  return (
    <Footer style={styles.footer}>
      <View style={styles.textCenterContainer}>
        <Text style={styles.text}>
          {props.text}
          <Text
            style={styles.textRight}
            onPress={() => {
              navigation.navigate(props.navigateTo);
            }}>
            {props.textHighLighted}
          </Text>
        </Text>
      </View>
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'rgba(144,144,144,0.5)',
  },
  textCenterContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  textRight: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
