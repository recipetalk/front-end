import React from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

const DropDownPickerComponent = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <Container width={props.width} open={open}>
      <TouchableWithoutFeedback>
        <CustomDropDownPicker
          open={open}
          value={props.value}
          items={props.items}
          placeholder={props.items[0].placeholder}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          minHeight={props.minHeight}
          dropDownDirection="BOTTOM"
          props={{
            backgroundColor: 'white',
          }}
          zIndex={props.zIndex ? props.zIndex : 5000}
          zIndexInverse={props.zIndexInverse ? props.zIndexInverse : 5000}
          containerstyle={{
            width: '100%',
          }}
        />
      </TouchableWithoutFeedback>
    </Container>
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
`;
export default DropDownPickerComponent;
