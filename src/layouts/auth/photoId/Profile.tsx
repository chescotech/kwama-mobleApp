import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
  Card,
  Modal,
  ButtonGroup,
} from '@ui-kitten/components';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {ProfileSetting} from './extra/profile-setting.component';
import {AddCircleIcon} from './extra/icons';
import {Profile} from './extra/data';
import {
  CameraOutlineIcon,
  ImageOutlineIcon,
} from '../../../components/icons/Icon';

const profile: Profile = Profile.jenniferGreen();

const ProfileView = (props: any) => {
  const {navigation} = props;
  const state = navigation.getState();
  const {first_name, last_name, nrc, phone, account, dob, email} =
    state.routes[2].params.allUserData;

  const styles = useStyleSheet(themedStyle);
  const [visible, setVisible] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState(null);

  const age = moment().diff(dob, 'years');

  // React.useEffect(() => {
  //   console.log(state.routes[2].params.allUserData);
  // }, []);

  let options = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const onDoneButtonPress = (): void => {
    // if (photoUrl) {
      const data = state.routes[2].params.allUserData;
      data.photo = photoUrl;

      navigation && navigation.navigate('Password', {data});
    // } else {
    //   setVisible(true);
    // }
  };

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      onPress={() => setVisible(true)}
      accessoryLeft={AddCircleIcon}
    />
  );

  const SetImageFromPicker = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setPhotoUrl(response.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ProfileAvatar
        style={styles.profileAvatar}
        source={photoUrl ? {uri: photoUrl} : profile.photo}
        editButton={renderPhotoButton}
      />
      <Text style={{textAlign: 'center'}} appearance="hint">
        Add photo of your self it's requierd*
      </Text>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text style={{marginBottom: 5}}>Choose an action</Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <ButtonGroup style={styles.buttonGroup} size="small">
              <Button
                accessoryLeft={CameraOutlineIcon}
                onPress={() => launchCamera(options, SetImageFromPicker)}>
                Open Camera
              </Button>
              <Button
                accessoryLeft={ImageOutlineIcon}
                onPress={() => launchImageLibrary(options, SetImageFromPicker)}>
                Open Gallery
              </Button>
            </ButtonGroup>
          </View>
        </Card>
      </Modal>

      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint="First Name"
        value={first_name}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Last Name"
        value={last_name}
      />
      {/* <ProfileSetting
        style={styles.profileSetting}
        hint="Gender"
        value={profile.gender}
      /> */}
      <ProfileSetting
        style={styles.profileSetting}
        hint="Age"
        value={age.toString()}
      />
      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint="Email"
        value={email}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Natinal Registartion Card"
        value={nrc}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Acount Number"
        value={account}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Phone Number"
        value={phone}
      />
      <Button style={styles.doneButton} onPress={onDoneButtonPress}>
        Continue
      </Button>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonGroup: {
    margin: 2,
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});

export default ProfileView;
