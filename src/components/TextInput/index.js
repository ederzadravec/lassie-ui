import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import R from 'ramda';
import { debounce as debounceFunc } from 'throttle-debounce';

import { BaseInput, Text } from '../';

const Label = styled.Text`
  position: absolute;
  font-size: 12;
  background: transparent;

  color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.typography.text.color};

  ${({ float, theme }) =>
    float
      ? ''
      : `
    font-size: 14;
    z-index: 1;
    bottom: ${theme.spacing.unit * 3};

  `};
`;

const Input = styled.TextInput`
  height: ${({ theme }) => theme.spacing.unit * 4};
  margin-top: ${({ theme }) => theme.spacing.unit * 2};
  margin-top: auto
  font-size: 14;
  z-index: 2;
  border-bottom-width: 1;
  border-bottom-color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.palette.colors.grey[400]};
  padding: 0;
`;

const createDebounce = debounce => debounceFunc(debounce, exec => exec());

export const TextInput = ({
  name,
  style,
  label,
  error,
  value: valueProp,
  placeholder,
  floatLabel,
  debounce,
  onChange,
  onBlur,
  onFocus,
  onEndEditing,
  ...props
}) => {
  const [{ init, value, isFocused }, useSetState] = React.useState({
    init: false,
    value: null,
    isFocused: false,
  });
  const setState = data => useSetState(prev => ({ ...prev, ...data }));

  React.useEffect(() => {
    if (value !== valueProp) setState({ value: valueProp });
  }, [valueProp]);

  const onChangeDebounce = React.useCallback(createDebounce(debounce), []);

  React.useEffect(() => {
    if (init) onChangeDebounce(() => onChange(value));
  }, [value]);

  const hasValue = !R.isNil(value) && !R.isEmpty(value);
  const floatingLabel = hasValue || !!placeholder || floatLabel || isFocused;

  const handleOnChange = text => {
    setState({ value: text, init: true });
  };

  const handleOnBlur = (...props) => {
    onEndEditing(...props);
    onBlur(...props);
  };

  const handleOnEndEditing = () => {
    setState({ isFocused: false, init: true });
  };

  const handleOnFocus = (...focus) => {
    setState({ isFocused: true, init: true });
    onFocus(...focus);
  };

  return (
    <BaseInput style={style} error={error}>
      <Label as={Text} float={floatingLabel} hasError={!!error}>
        {label}
      </Label>

      <Input
        {...props}
        value={value}
        hasValue={hasValue}
        onChangeText={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onEndEditing={debounceFunc(debounce, handleOnEndEditing)}
        onEndEditing={handleOnEndEditing}
        placeholder={placeholder}
        hasError={!!error}
      />
    </BaseInput>
  );
};

TextInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onEndEditing: () => {},
  floatLabel: false,
  debounce: 250,
};

TextInput.proptypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEndEditing: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  floatLabel: PropTypes.bool,
  debounce: PropTypes.number,
};
