import React from 'react';

import * as S from './Camera.styled';
import { TakePhoto } from './TakePhoto';
import { ConfirmPhoto } from './ConfirmPhoto';

const Camera = ({ title, mask, onChange, sideCam, onClose, visible, photoConfig }) => {
  const [showCamera, setCamera] = React.useState(true);
  const [showConfirmation, setConfirmation] = React.useState(false);
  const [data, setData] = React.useState();

  const handleOnTake = async data => {
    setData(data);
    setCamera(false);
    setConfirmation(true);
  };

  const handleOnClose = () => {
    onClose && onClose();
    setData(undefined);
    setCamera(true);
    setConfirmation(false);
  };

  const handleOnConfirmation = confirm => {
    if (confirm) {
      onClose && onClose();
      onChange(data);
      setData(undefined);
      setCamera(true);
      setConfirmation(false);
    } else {
      setData(undefined);
      setCamera(true);
      setConfirmation(false);
    }
  };

  return (
    <S.Modal visible={visible} transparent>
      <S.Container>
        {showCamera && (
          <TakePhoto
            title={title}
            mask={mask}
            onTake={handleOnTake}
            sideCam={sideCam}
            onClose={handleOnClose}
            config={photoConfig}
          />
        )}

        {showConfirmation && (
          <ConfirmPhoto
            title={title}
            mask={mask}
            photo={data}
            onConfirm={handleOnConfirmation}
            onClose={handleOnClose}
          />
        )}
      </S.Container>
    </S.Modal>
  );
};

export default Camera;

Camera.defaultProps = {
  onChange: () => {},
  onClose: () => {},
  photoConfig: {},
};

export const CameraHOC = ({ children, ...props }) => {
  const [visible, setVisible] = React.useState(false);

  const openCamera = () => setVisible(true);

  const closeCamera = () => setVisible(false);

  if (!children || typeof children !== 'function') return null;

  return (
    <>
      {children({ openCamera })}

      <Camera visible={visible} onClose={closeCamera} {...props} />
    </>
  );
};
