import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BaseInput, Text } from '../';
import { Select as SelectComponent } from './components';

const TouchableOpacity = styled.TouchableOpacity`
  position: relative;
  flex: 1;
`;

const Label = styled.Text`
  position: absolute;
  font-size: 12;

  color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.typography.text.color};

  ${({ float, theme }) =>
    float
      ? ''
      : `
    font-size: 14;
    z-index: 2;
    bottom: ${theme.spacing.unit};

  `};
`;

const Input = styled.View`
  height: ${({ theme }) => theme.spacing.unit * 4};
  margin-top: ${({ theme }) => theme.spacing.unit * 2};
  z-index: 1;
  border-bottom-width: 1;
  border-bottom-color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.palette.colors.grey[400]};

  justify-content: center;
`;

const Value = styled.Text`
  font-size: 14;
`;

const ModalSelect = styled.Modal``;

export const Select = ({ error, value, format, label, disabled, data, ...props }) => {
  const [showModal, setModal] = React.useState(false);

  const getValue = () => {
    return value ? value[format.name] : false;
  };

  const labelValue = getValue();

  return (
    <>
      <BaseInput error={error}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModal(!showModal)}
          disabled={disabled}>
          <Label as={Text} float={!!labelValue}>
            {label}
          </Label>

          <Input hasError={!!error}>
            <Value as={Text}>{labelValue}</Value>
          </Input>
        </TouchableOpacity>
      </BaseInput>

      {showModal && (
        <ModalSelect visible={showModal}>
          <SelectComponent
            onClose={() => setModal(false)}
            format={format}
            {...props}
            staticData={data}
          />
        </ModalSelect>
      )}
    </>
  );
};

Select.defaultProps = {
  onChange: () => {},
  format: { id: 'id', name: 'name' },
  variant: 'static',
};

Select.prototypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.object,
  data: PropTypes.array,
  variant: PropTypes.oneOf('static', 'dinamic'),
  onChange: PropTypes.func.isRequired,
  onSearchData: PropTypes.func,
  dinamicOnlyFirst: PropTypes.bool,
};
