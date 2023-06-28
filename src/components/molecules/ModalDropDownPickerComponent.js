import React from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import {Image} from 'react-native';

const ModalDropDownPickerComponent = ({
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
        modalTitle={placeholder}
        selectedItemContainerStyle={{backgroundColor: '#e5e5e5'}}
        placeholderStyle={{color: '#a0a0a0'}}
        props={{
          backgroundColor: 'white',
        }}
        listMode="MODAL"
        modalProps={{
          animationType: 'fade',
          presentationStyle: null,
          transparent: true,
          style: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
        modalContentContainerStyle={{
          width: '50%',
          height: '50%',
          backgroundColor: 'white',
          position: 'absolute',
          left: '25%',
          top: '25%',
          borderRadius: 8,
        }}
        searchContainerStyle={{
          borderBottomColor: '#f09311',
          borderBottomWidth: 2,
        }}
        modalTitleStyle={{
          fontStyle: 'normal',
          fontFamily: 'Pretendard Variable',
          fontWeight: 500,
        }}
        ArrowDownIconComponent={TriangleDownIcon}
        ArrowUpIconComponent={TriangleUpIcon}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        containerStyle={{
          borderColor: null,
          border: null,
          borderWidth: null,
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
`;

const CustomDropDownPicker = styled(DropDownPicker)`
  margin-right: 7px;
  ${props =>
    props.minHeight !== undefined
      ? 'min-height : ' + props.minHeight + ' ;'
      : undefined}
  border: 1px solid #d8d8d8;
`;
export default ModalDropDownPickerComponent;
