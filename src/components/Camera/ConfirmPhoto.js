import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Header } from '../Header';
import { PhotoContainer, Photo, Content, Footer, CheckButton, RetryButton } from './Camera.styled';

export const ConfirmPhoto = ({ title, mask, photo, onConfirm, onClose }) => {
  return (
    <PhotoContainer>
      <Photo source={{ uri: photo.uri }} />

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
          <TouchableOpacity onPress={() => onConfirm(false)}>
            <RetryButton name="camera-retake-outline" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onConfirm(true)}>
            <CheckButton name="check-circle-outline" />
          </TouchableOpacity>
        </Footer>
      </Content>
    </PhotoContainer>
  );
};

ConfirmPhoto.defaultProps = {
  onConfirm: () => {},
  onClose: () => {},
};
