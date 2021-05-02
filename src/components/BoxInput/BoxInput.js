import React from 'react';
import proptypes from 'prop-types';

import { Text } from '../Text';

import * as S from './boxInput.styled';

export const BoxInput = ({ variant, value, label, onChange, error, ...props }) => {
  const handleOnChange = () => {
    onChange(!value);
  };

  return (
    <S.Container error={error} {...props}>
      <S.BoxContent onPress={handleOnChange}>
        <S.Box variant={variant}>
          <S.Check variant={variant} isChecked={value} />
        </S.Box>
      </S.BoxContent>
      <S.Label as={Text}>{label}</S.Label>
    </S.Container>
  );
};

BoxInput.defaultProps = {
  variant: 'checkbox',
  value: false,
  label: '',
  onChange: () => {},
};

BoxInput.propTypes = {
  variant: proptypes.oneOf(['checkbox', 'radio']),
  value: proptypes.bool,
  label: proptypes.string,
  onChange: proptypes.func,
};
