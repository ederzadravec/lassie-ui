import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

import { Header } from '../Header';
import { CameraComponent, Content, Footer, CameraButton } from './Camera.styled';

export const TakePhoto = ({ noPickerImage, sideCam, title, mask, onClose, onTake, config }) => {
  const handleOnTake = (camera) => async () => {
    const options = {
      quality: 0.5,
      width: 1024,
      base64: true,
      fixOrientation: true,
      mirrorImage: sideCam === 'front' ? true : false,
      ...config,
    };
    const data = await camera.takePictureAsync(options);

    onTake(data);
  };

  const handleOnPickPhoto = () => {
    const callback = async ({ assets }) => {
      const picture = assets[0];

      onTake(picture);
    };

    launchImageLibrary({ mediaType: 'photo', quality: 0.5, includeBase64: true }, callback);
  };

  return (
    <CameraComponent type={sideCam} captureAudio={false}>
      {({ camera, status }) => (
        <Content>
          <Header
            left={[
              {
                icon: 'close',
                onPress: onClose,
              },
            ]}>
            {title}
          </Header>

          <Footer>
            {!noPickerImage && <CameraButton name="picture" onPress={handleOnPickPhoto} />}

            {status === 'READY' && (
              <CameraButton onPress={handleOnTake(camera)} name="camera-outline" />
            )}
          </Footer>
        </Content>
      )}
    </CameraComponent>
  );
};

TakePhoto.defaultProps = {
  sideCam: 'back',
  onTake: () => {},
  onClose: () => {},
  config: {},
};
