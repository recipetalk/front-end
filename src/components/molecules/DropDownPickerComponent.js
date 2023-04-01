import React from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';

const DropDownPickerComponent = props => {
  const [open, setOpen] = useState(false);

  return (
    <CustomDropDownPicker
      width={props.width}
      open={open}
      value={props.state}
      items={props.items}
      placeholder={props.items[0].placeholder}
      setOpen={setOpen}
      setValue={props.setState}
      listMode="SCROLLVIEW"
      placeholderStyle={{color: 'gray'}}
    />
  );
};

const CustomDropDownPicker = styled(DropDownPicker)`
  width: ${props => props.width};
  margin-right: 7px;
  border: #d8d8d8;
`;
export default DropDownPickerComponent;
