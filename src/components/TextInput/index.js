import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import R from 'ramda';
import { debounce as debounceFunc } from 'throttle-debounce';
import TextInputMask from 'react-native-text-input-mask';

import { BaseInput, Text, hooks } from '../../';

const Label = styled.Text`
  position: absolute;
  font-size: 12;
  background: transparent;
  width: 100%;
  text-align: ${({ align }) => align};

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

const Input = styled(TextInputMask)`
  height: ${({ theme }) => theme.spacing.unit * 4};
  margin-top: ${({ theme }) => theme.spacing.unit * 2};
  margin-top: auto;
  color: ${({ theme, editable }) =>
    editable ? theme.typography.text.color : theme.palette.disabled.main};
  font-size: 14;
  z-index: 2;
  border-bottom-width: 1;
  border-bottom-color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.palette.colors.grey[400]};
  padding: 0;
  text-align: ${({ align }) => align};
`;

const createDebounce = (debounce) => debounceFunc(debounce, (exec) => exec());

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
  align,
  mask,
  disabled,
  ...props
}) => {
  let inputRef = null;
  const [{ init, value, secoundValue, isFocused }, setState] = hooks.useState({
    init: false,
    value: null,
    secoundValue: null,
    isFocused: false,
  });

  React.useEffect(() => {
    if (value !== valueProp) {
      setState({ value: valueProp });

      if (inputRef) inputRef.setNativeProps({ text: valueProp });
    }
  }, [valueProp]);

  const onChangeDebounce = React.useCallback(createDebounce(debounce), []);

  React.useEffect(() => {
    if (init) onChangeDebounce(() => onChange(value, secoundValue));
  }, [value]);

  const hasValue = !R.isNil(value) && !R.isEmpty(value);
  const floatingLabel = mask || hasValue || !!placeholder || floatLabel || isFocused;

  const handleOnChange = (maskedValue, unMasked) => {
    setState({ value: maskedValue, secoundValue: unMasked, init: true });
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
      <Label as={Text} align={align} float={floatingLabel} hasError={!!error}>
        {label}
      </Label>

      <Input
        autoCapitalize="none"
        refInput={(ref) => (inputRef = ref)}
        {...props}
        editable={!disabled}
        mask={mask}
        align={align}
        value={value}
        hasValue={hasValue}
        onChangeText={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
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
  align: 'left',
  mask: null,
  disabled: false,
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
  disabled: PropTypes.bool,
  debounce: PropTypes.number,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  mask: PropTypes.string,
};
