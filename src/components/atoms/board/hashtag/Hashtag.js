import styled from 'styled-components/native';
import React from 'react';

export default function Hashtag({hashtags}) {
  const HashtagContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 6px;

    width: 153px;
    height: 20px;
  `;

  const Button = styled.TouchableOpacity`
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 3px 10px;

    width: 47px;
    height: 20px;

    /* ffffff */

    background: #ffffff;
    /* f09311 */

    border: 1px solid #f09311;
    border-radius: 40px;
  `;

  const Label = styled.Text`
    /* #한식 */

    width: 35px;
    height: 14px;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #f09311;

    text-align: center;

    margin-left: -5px;
    margin-top: -1px;
  `;

  return (
    <HashtagContainer>
      {hashtags.map(value => (
        <Button>
          <Label>{value}</Label>
        </Button>
      ))}
    </HashtagContainer>
  );
}
