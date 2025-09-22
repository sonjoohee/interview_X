import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../../assets/styles/Palette';
import {
        ListBoxItem,
        ListText,
        ListTitle,
        ListSubtitle,
        PercentBadge,
      } from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
        Sub1,
        Sub3,
        Body2_1,
        Body3,
        Caption1,
      } from "../../../../../assets/styles/Typography";

const MoleculeAnalysisItem = ({ percentage, title, subtitle, FlexStart, details = {}, business }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ListBoxItem FlexStart={FlexStart}>
      <PercentBadge primary>
        <Caption1>{percentage}</Caption1>
      </PercentBadge>

      <ListText Small>
        <ListTitle>
          <Sub1 color="gray800" align="left">{title}</Sub1>
        </ListTitle>
        <ListSubtitle>
          <Sub3 color="gray500" align="left">{subtitle}</Sub3>
        </ListSubtitle>
      </ListText>

      <ToggleButton
        className="toggleButton"
        $isExpanded={isExpanded}
        onClick={handleToggle}
      />

    {isExpanded && (
                <ToggleContent $isExpanded={isExpanded}>
                    <Body3 color="gray700" align="left">
                      {details.design_direction}
                    </Body3>

                    <div className="bgContent">
                        {/* 고정된 제목을 사용하여 렌더링 */}
                        <div>
                            <Body2_1 color="gray800" align="left">기능 및 성능 제안 방향</Body2_1>
                            <ul>
                                {details.features && details.features.map((item, idx) => (
                                    <li key={idx}>
                                        <Body3 color="gray800" align="left">{item.title + " : " + item.description}</Body3>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <Body2_1 color="gray800" align="left">디자인 및 구조 제안 방향</Body2_1>
                            <ul>
                                {details.form_factors && details.form_factors.map((item, idx) => (
                                    <li key={idx}>
                                        <Body3 color="gray800" align="left">{item.title + " : " + item.description}</Body3>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
{/* 
<Body3 color="gray700" align="left">
    {details.design_direction} // design_direction을 사용
 
</Body3>

<div className="bgContent">
    <div>
        <Body2_1 color="gray800" align="left">기능 및 성능 제안 방향</Body2_1>
        <ul>
            {details.features.map(feature => (
                <li key={feature.title}>
                    <Body3 color="gray800" align="left">{feature.title + " : " + feature.description}</Body3>
                </li>
            ))}
        </ul>
    </div>

    <div>
        <Body2_1 color="gray800" align="left">디자인 및 구조 제안 방향</Body2_1>
        <ul>
            {details.form_factors.map(formFactor => (
                <li key={formFactor.title}>
                    <Body3 color="gray800" align="left">{formFactor.title + " : " + formFactor.description}</Body3>
                </li>
            ))}
        </ul>
    </div>
</div>
*/}


        </ToggleContent>
      )}
    </ListBoxItem>
  );
};

export default MoleculeAnalysisItem; 


const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid ${palette.outlineGray};

  .bgContent {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: ${palette.chatGray};

    > div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;

      + div {
        padding-top: 8px;
        border-top: 1px solid ${palette.outlineGray};
      }
    }

    li {
      display: flex;
      align-items: center;
      gap: 10px;

      &:before {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${palette.gray800};
        content: "";
      }
    }
  }
`;

const ToggleButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-bottom: 6px;
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: ${(props) =>
      props.$isExpanded
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, -50%) rotate(-135deg)"};
    margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all 0.5s;
  }
`;
