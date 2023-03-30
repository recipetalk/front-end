import React from 'react';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';

const DropDownPickerComponent = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <CustomDropDownPicker
      width={props.width}
      open={open}
      value={value}
      items={props.items}
      placeholder={props.items[0].placeholder}
      setOpen={setOpen}
      setValue={setValue}
    />
  );
};

const CustomDropDownPicker = styled(DropDownPicker)`
  width: ${props => props.width};
  margin-right: 7px;
`;
export default DropDownPickerComponent;
