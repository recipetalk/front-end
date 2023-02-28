import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function FocusedTextInputBorder({
  placeholder,
  secureTextEntry,
  setData,
}) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  return (
    <TextInput
      style={[styles.textInput, isHighlighted && styles.isHighlighted]}
      onFocus={() => setIsHighlighted(true)}
      onBlur={() => setIsHighlighted(false)}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry !== undefined ? secureTextEntry : false}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#ffffff',
    height: 48,
  },
  isHighlighted: {
    borderColor: '#666666',
  },
});

//  background: #ffffff;
//   border: 1px solid
//     ${props => {
//       props.current.isFocused === undefined ? '#666666' : '#EDEDED';
//     }};
//   height: 48px;
//   border-radius: 8px;
//   padding: 8px;
