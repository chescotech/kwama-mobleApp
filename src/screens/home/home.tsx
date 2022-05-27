import {View, Text} from 'react-native';
import React from 'react';
import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';

const Home = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.formContainer} level="1">
      <Text>Home</Text>
    </Layout>
  );
};

export default Home;

const themedStyles = StyleService.create({
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});
