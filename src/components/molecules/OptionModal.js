import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Modal, Platform, TouchableOpacity} from 'react-native';

export const OptionModal = ({
  items,
  setCheckedItem,
  width,
  defaultItem = null,
  setOpened,
  x,
  y,
  height = 'auto',
}) => {
  const [isClicked, setClicked] = useState(false);
  const [item, checkItem] = useState(defaultItem);

  return (
    <Modal transparent={true} onRequestClose={() => setOpened(false)}>
      <TouchableOpacity
        style={{width: '100%', height: '100%', position: 'absolute'}}
        onPress={() => setOpened(false)}
        activeOpacity={0}>
        <ItemBox
          style={{height: height}}
          width={width}
          x={x - width}
          y={y}
          data={items}
          height={height}
          renderItem={({item}) => (
            <Item>
              <TouchableOpacity
                onPress={() => {
                  setCheckedItem(item);
                  setOpened(false);
                }}>
                <ItemLabel>{item.label}</ItemLabel>
              </TouchableOpacity>
            </Item>
          )}
        />
      </TouchableOpacity>
    </Modal>
  );
};

const ItemBox = styled.FlatList`
  width: ${props => props.width}px;
  background: #ffffff;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  border-radius: 7px;
  ${() =>
    Platform.OS === 'ios'
      ? 'box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15); ' + 'overflow: visible'
      : 'elevation: 20;'}
`;

const Item = styled.View`
  width: 100%;
  height: 48px;
  padding-left: 15px;
  justify-content: center;
`;

const ItemLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #333333;
`;
