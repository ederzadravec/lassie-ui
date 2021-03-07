import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Header } from '../Header';
import { CameraComponent, Content, Footer, CameraButton } from './Camera.styled';

export const TakePhoto = ({ sideCam, title, mask, onClose, onTake, config }) => {
  const handleOnTake = camera => async () => {
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
            {status === 'READY' && (
              <TouchableOpacity onPress={handleOnTake(camera)}>
                <CameraButton name="camera-outline" />
              </TouchableOpacity>
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
