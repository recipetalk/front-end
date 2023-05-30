import React from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import {Image} from 'react-native';

const DropDownPickerComponent = ({
  width,
  value,
  setValue,
  placeholder,
  minHeight,
  items,
  zIndex = 5000,
  zIndexInverse = 5000,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Container width={width} open={open}>
      <CustomDropDownPicker
        open={open}
        value={value}
        items={items}
        placeholder={placeholder}
        setOpen={setOpen}
        setValue={setValue}
        minHeight={minHeight}
        dropDownDirection="BOTTOM"
        selectedItemContainerStyle={{backgroundColor: '#e5e5e5'}}
        props={{
          backgroundColor: 'white',
        }}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        containerstyle={{
          width: '100%',
        }}
        listMode="SCROLLVIEW"
        ArrowDownIconComponent={TriangleDownIcon}
        ArrowUpIconComponent={TriangleUpIcon}
        placeholderStyle={{
          color: 'gray',
        }}
      />
    </Container>
  );
};

const TriangleDownIcon = () => {
  return (
    <Image
      style={{width: 11, height: 8}}
      source={require('../../assets/images/TriangleDown.png')}
      resizeMode={'contain'}
    />
  );
};

const TriangleUpIcon = () => {
  return (
    <Image
      style={{width: 11, height: 8}}
      source={require('../../assets/images/TriangleUp.png')}
      resizeMode={'contain'}
    />
  );
};

const Container = styled.View`
  width: ${props => props.width};
  z-index: 1000;
`;

const CustomDropDownPicker = styled(DropDownPicker)`
  margin-right: 7px;
  ${props =>
    props.minHeight !== undefined
      ? 'min-height : ' + props.minHeight + ' ;'
      : undefined}
  border: 1px solid #d8d8d8;
`;
export default DropDownPickerComponent;
