import React from 'react';
import {Header} from 'native-base';
import {StyleSheet} from 'react-native';
import {ApplicationLogo} from './applicationLogo';

// interface HeaderProps {}

export const EntryScreenHeader: React.FC = () => {
  return (
    <Header style={styles.header}>
      <ApplicationLogo></ApplicationLogo>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(144,144,144,0.5)',
    height: 80,
    alignItems: 'center',
    alignContent: 'center',
  },
});
