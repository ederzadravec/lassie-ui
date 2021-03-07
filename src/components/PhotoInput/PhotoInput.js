import React from 'react';
import * as R from 'ramda';

import { BaseInput } from '../BaseInput';
import { CameraHOC } from '../Camera/Camera';
import * as S from './PhotoInput.style';

const PhotoInput = ({
  value,
  label,
  labelSuccess,
  onChange,
  mask,
  sideCam,
  error,
  align,
  placeholder,
  floatLabel,
  photoConfig,
}) => {
  const handleOnChange = data => {
    onChange(data);
  };

  const hasValue = !R.isNil(value) && !R.isEmpty(value);
  const floatingLabel = mask || hasValue || !!placeholder || floatLabel;

  return (
    <BaseInput error={error}>
      <S.Label
        numberOfLines={1}
        ellipsizeMode="tail"
        align={align}
        float={floatingLabel}
        hasError={!!error}>
        {label}
      </S.Label>

      <S.Content>
        <S.InputContainer>
          <S.Input hasValue={hasValue} align={align}>
            {hasValue && labelSuccess}
          </S.Input>
        </S.InputContainer>

        <CameraHOC title={label} mask={mask} sideCam={sideCam} onChange={handleOnChange} photoConfig={photoConfig}>
          {({ openCamera }) => (
            <S.IconContent onPress={openCamera}>
              <S.Icon name="camera-outline" />
            </S.IconContent>
          )}
        </CameraHOC>
      </S.Content>
    </BaseInput>
  );
};

export default PhotoInput;

PhotoInput.defaultProps = {
  onChange: () => {},
  labelSuccess: 'Imagem anexada',
  align: 'left',
  photoConfig: {},
};
