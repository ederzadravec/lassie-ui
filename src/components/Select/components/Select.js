import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { View, FlatList } from 'react-native';
import { debounce as debounceFunc } from 'throttle-debounce';
import styled from 'styled-components';

import { TextInput, Loader, Header } from '../../';
import { SelectItem } from './SelectItem';

const semAcentos = (text) => (text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : text);

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  position: relative;
  flex-direction: row;
  padding-horizontal: ${({ theme }) => theme.spacing.unit * 3};
  padding-vertical: ${({ theme }) => theme.spacing.unit * 1.5};
  background: ${({ theme }) => theme.palette.primary.main};
`;

const SearchInput = styled.TextInput`
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }) => theme.palette.colors.white};
  height: 40;
  width: 100%;
  font-size: 18;
  padding-horizontal: 8;
  color: #fff;
`;

const List = styled.FlatList`
  margin-top: 8;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spacing.unit * 3};
`;

export class Select extends React.PureComponent {
  state = {
    data: [],
    staticData: [],
    isLoading: false,
  };

  componentDidMount() {
    const { staticData, loadedData, variant } = this.props;

    if (variant === 'dinamic') {
      return this.setState({
        staticData: loadedData,
        data: this.formatData(loadedData),
      });
    }

    return this.setState({
      staticData,
      data: this.formatData(staticData),
    });
  }

  handleSelectItem = (item) => {
    const { onChange, onClose } = this.props;

    onChange(item);

    return onClose();
  };

  handleFilterData = (text) => {
    const { format } = this.props;
    const { staticData } = this.state;

    const filterData = (data, filter) => {
      return (data || []).filter((item) => {
        const name = semAcentos(item[format.name]);
        return name.match(new RegExp(`${filter}`, 'i'));
      });
    };

    this.setState({ data: filterData(this.formatData(staticData), semAcentos(text)) });
  };

  formatData = (result) => {
    const { format, path } = this.props;

    const data = R.cond([
      [R.isEmpty, () => result],
      [R.is(String), () => R.pathOr([], path.split('.'), result)],
      [R.is(Array), () => R.pathOr([], path, result)],
      [R.is(Function), () => path(result)],
    ])(path);

    if (R.isEmpty(format)) return data;

    return data.map((item) => {
      return { ...item, id: item[format.id].toString(), name: item[format.name] };
    });
  };

  render() {
    const { debounce, format, variant, dinamicOnlyFirst, onClose, handleSearchData } = this.props;
    const { data, isLoading } = this.state;

    return (
      <SafeAreaView>
        <Header
          left={[{ icon: 'chevron-left', onPress: onClose }]}
          right={[{ icon: 'close', onPress: () => this.handleSelectItem({}) }]}>
          <SearchInput
            placeholderTextColor={'#FFF'}
            autoCorrect={false}
            placeholder="Digite para filtrar"
            onChangeText={debounceFunc(
              debounce,
              variant === 'static' || dinamicOnlyFirst ? this.handleFilterData : handleSearchData
            )}
          />
        </Header>

        <Loader show={isLoading} />

        {!isLoading && (
          <List
            data={data}
            renderItem={({ item }) => (
              <SelectItem
                key={item.id.toString()}
                item={item}
                tags={R.pathOr([], ['tags'], format)}
                onPress={this.handleSelectItem}
              />
            )}
          />
        )}
      </SafeAreaView>
    );
  }
}

Select.defaultProps = {
  onSearchData: () => {},
  debounce: 1000,
  staticData: null,
  path: '',
  format: { id: 'id', name: 'name' },
  variant: 'static',
  dinamicOnlyFirst: false,
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearchData: PropTypes.func,
  debounce: PropTypes.number,
  staticData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  path: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.array]),
  format: PropTypes.object,
};
