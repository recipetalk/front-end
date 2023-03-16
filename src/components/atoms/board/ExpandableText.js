import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

const ExpandableText = ({text}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  let displayText = text;
  const maxLength = 106; // 임의로 최대 길이 설정

  if (text.length > maxLength) {
    displayText = isExpanded ? text : text.slice(0, maxLength);
  }

  const Description = styled.Text`
    color: #666666;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    font-family: 'Pretendard Variable';
  `;

  return (
    <View>
      <Description numberOfLines={isExpanded ? undefined : 10}>
        {displayText}
      </Description>
      {text.length > maxLength && (
        <TouchableOpacity
          onPress={toggleExpanded}
          style={{marginTop: 30, marginBottom: 30, width: 40, height: 40}}>
          <Text style={{color: '#A0A0A0'}}>
            {isExpanded ? '접기' : '펼치기'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExpandableText;
