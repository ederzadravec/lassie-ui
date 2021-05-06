import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { debounce as debounceFunc } from 'throttle-debounce';

import { useState } from '../../hooks/state';
import { Loader } from '../Loader';
import { Header } from '../Header';
import { Item } from './Item';
import * as S from './List.styled';

const semAcentos = text => (text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text);

export const List = ({
  staticData,
  loadedData,
  format,
  variant,
  path,
  onChange,
  onClose,
  handleSearchData,
  dinamicOnlyFirst,
  debounce,
  value,
  multiple,
}) => {
  const [state, setState] = useState({ data: [], staticData: [], isLoading: false });

  React.useEffect(() => {
    if (variant === 'dinamic') {
      return setState({
        staticData: loadedData,
        data: formatData(loadedData),
      });
    }

    return setState({
      staticData,
      data: formatData(staticData),
    });
  }, []);

  const handleSelectItem = item => {
    if (!multiple) {
      onChange(item);

      return onClose();
    }

    const selected = getSelected(item);

    const newValue = selected ? value.filter(x => x.id !== item.id) : [...(value || []), item];

    onChange(newValue);
  };

  const handleFilterData = text => {
    const filterData = (data, filter) => {
      return (data || []).filter(item => {
        const name = semAcentos(item[format.name]);
        return name.match(new RegExp(`${filter}`, 'i'));
      });
    };

    setState({ data: filterData(formatData(state.staticData), semAcentos(text)) });
  };

  const formatData = result => {
    const data = R.cond([
      [R.isEmpty, () => result],
      [R.is(String), () => R.pathOr([], path.split('.'), result)],
      [R.is(Array), () => R.pathOr([], path, result)],
      [R.is(Function), () => path(result)],
    ])(path);

    if (R.isEmpty(format)) return data;

    return data.map(item => {
      const values = R.path(['keys'], item) ? R.pick(item.keys(), item) : item;
      return { ...values, id: item[format.id].toString(), name: item[format.name] };
    });
  };

  const getSelected = item => {
    if (!multiple) {
      return value && item?.id === value[format.id];
    }

    return !!value?.find(x => item.id === x[format.id]);
  };

  return (
    <S.Container>
      <S.Content>
        <S.SafeAreaView>
          <Header
            left={[{ icon: 'broom', onPress: () => onChange(multiple ? [] : {}) }]}
            right={[{ icon: 'close', onPress: onClose }]}>
            <S.SearchInput
              placeholderTextColor={'#FFF'}
              autoCorrect={false}
              placeholder="Buscar ..."
              onChangeText={debounceFunc(
                debounce,
                variant === 'static' || dinamicOnlyFirst ? handleFilterData : handleSearchData
              )}
            />
          </Header>

          <Loader show={state.isLoading} />

          {!state.isLoading && (
            <S.List
              data={state.data}
              renderItem={({ item }) => (
                <Item
                  selected={getSelected(item)}
                  key={item.id.toString()}
                  item={item}
                  tags={R.pathOr([], ['tags'], format)}
                  onPress={handleSelectItem}
                />
              )}
            />
          )}
        </S.SafeAreaView>
      </S.Content>
    </S.Container>
  );
};

List.defaultProps = {
  onSearchData: () => {},
  debounce: 500,
  staticData: null,
  path: '',
  format: { id: 'id', name: 'name' },
  variant: 'static',
  dinamicOnlyFirst: false,
};

List.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearchData: PropTypes.func,
  debounce: PropTypes.number,
  staticData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  path: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.array]),
  format: PropTypes.object,
};
