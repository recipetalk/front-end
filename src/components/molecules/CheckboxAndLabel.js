import {Platform, StyleSheet, Text} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import React from 'react';
import styled from 'styled-components/native';

const AutoLoginCheckContainer = styled.View`
  right: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: auto;
`;

const CheckboxAndLabel = ({
  value,
  setValue,
  label,
  labelFontStyle,
  checkboxSize,
}) => {
  const styles = StyleSheet.create({
    checkbox:
      Platform.OS === 'ios'
        ? {
            width: checkboxSize !== undefined ? checkboxSize : 15,
            height: checkboxSize !== undefined ? checkboxSize : 15,
          }
        : {
            marginRight: -15,

            width: checkboxSize !== undefined ? checkboxSize : 15,
            height: checkboxSize !== undefined ? checkboxSize : 15,
          },
    label: {
      marginLeft: Platform.OS === 'ios' ? 10 : 20,
    },
  });

  return (
    <AutoLoginCheckContainer>
      <Checkbox
        value={value}
        onValueChange={setValue}
        onFillColor="#F09311"
        tintColors={{true: '#F09311', false: '#A4A4A4'}}
        boxType="square"
        tintColor="#A4A4A4"
        onCheckColor="#FFFFFF"
        onTintColor="#F09311"
        style={styles.checkbox}
      />
      <Text
        style={[
          styles.label,
          labelFontStyle !== undefined ? labelFontStyle : undefined,
        ]}>
        {label}
      </Text>
    </AutoLoginCheckContainer>
  );
};

export default CheckboxAndLabel;
