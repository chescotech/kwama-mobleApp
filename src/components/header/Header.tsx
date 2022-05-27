import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../icons/Icon';

const Header = (props: any) => {
  const {
    title,
    alignment,
    subtitle,
    renderLeftActions,
    renderRightContener,
    titlePosition,
    showTitle,
    backIconOnclick,
  } = props;

  const renderBackAction = () => (
    <TopNavigationAction onPress={backIconOnclick} icon={ArrowIosBackIcon} />
  );

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment={alignment}
        title={title}
        subtitle={subtitle}
        accessoryLeft={backIconOnclick && renderBackAction}
        accessoryRight={renderRightContener && renderRightContener}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
});

export default Header;
