import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaLayout } from './extra/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../../components/icons/Icon';
import ProfileView from './Profile';

export default ({ navigation }): React.ReactElement => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Profile'
        accessoryLeft={renderBackAction}
      />
      <ProfileView navigation={navigation}/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});