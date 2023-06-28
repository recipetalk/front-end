import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Image, TouchableOpacity, View} from 'react-native';
import {OptionModal} from '../molecules/OptionModal';

export const OptionModalChildImage = props => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const optionRef = useRef();

  const getBoxMeasure = () => {
    optionRef.current.measureInWindow((x, y) => {
      setX(() => Math.round(x));
      setY(() => Math.round(y));
      console.log(x + ' ' + y);
    });
  };

  return (
    <View style={{position: 'relative'}} ref={optionRef}>
      <TouchableOpacity
        style={{paddingLeft: 5, paddingRight: 5}}
        onPress={async () => {
          await getBoxMeasure();
          await setClicked(true);
        }}>
        {props.children}
      </TouchableOpacity>
      {isClicked ? (
        <OptionModal
          items={props.items}
          width={150}
          setOpened={setClicked}
          x={x}
          y={y}
          setCheckedItem={props.setCheckedItem}
        />
      ) : undefined}
    </View>
  );
};
