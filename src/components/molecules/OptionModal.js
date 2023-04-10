import React, {useState} from 'react';
import styled from 'styled-components/native';
import AlertBackground from '../atoms/board/background/AlertBackground';
import {
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

export const OptionModal = ({
  items,
  checkedItem,
  width,
  scrollable,
  defaultItem = null,
  setOpened,
  x,
  y,
}) => {
  const [isClicked, setClicked] = useState(false);
  const [item, checkItem] = useState(defaultItem);

  return (
    <Modal transparent={true} onRequestClose={() => setOpened(false)}>
      <TouchableOpacity
        style={{width: '100%', height: '100%', position: 'absolute'}}
        onPress={() => setOpened(false)}>
        <TouchableWithoutFeedback>
          {scrollable ? (
            <ScrollBox width={width} x={x - width} y={y}>
              {items.map(item => (
                <Item>
                  <TouchableOpacity>
                    <ItemLabel>{item.label}</ItemLabel>
                  </TouchableOpacity>
                </Item>
              ))}
            </ScrollBox>
          ) : (
            <ItemBox width={width} x={x - width} y={y}>
              {items.map(item => (
                <Item>
                  <TouchableOpacity>
                    <ItemLabel>{item.label}</ItemLabel>
                  </TouchableOpacity>
                </Item>
              ))}
            </ItemBox>
          )}
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const ItemBox = styled.View`
  width: ${props => props.width}px;
  background: #ffffff;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  border-radius: 7px;
  ${() =>
    Platform.OS === 'ios'
      ? 'box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);'
      : 'elevation: 20;'}
`;

const ScrollBox = styled.View`
  width: ${props => props.width};
  background: #ffffff;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

const Item = styled.View`
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

const ItemLabel = styled.Text`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #333333;
`;
