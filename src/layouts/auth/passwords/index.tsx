import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaLayout } from './extra/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../../components/icons/Icon';
import PasswordView from './PasswordView';

export default (props: any): React.ReactElement => {
  const {navigation} = props;
  const state = navigation.getState();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  React.useEffect(() => {
    console.log(state.routes[2].params.data);
  }, []);

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Create Password'
        accessoryLeft={renderBackAction}
      />
      <PasswordView navigation={navigation}/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});