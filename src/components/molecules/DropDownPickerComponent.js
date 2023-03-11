import React from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';

const DropDownPickerComponent = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <CustomDropDownPicker
      width={props.width}
      open={open}
      value={props.value}
      items={props.items}
      placeholder={props.items[0].placeholder}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

const CustomDropDownPicker = styled(DropDownPicker)`
  width: ${props => props.width};
  margin-right: 7px;
`;
export default DropDownPickerComponent;
