import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";

import AnalysisInfo from "./PageAnalysisInfo";
import OrganismIncNavigation from "../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../Global/molecules/MoleculeHeader";
import PopupWrap from "../../assets/styles/Popup";

import { Button, ButtonGroup, IconButton } from "../../assets/styles/ButtonStyle";
import images from "../../assets/styles/Images";
import { palette } from "../../assets/styles/Palette";
import { RadioButton, CustomTextarea, FormBox } from "../../assets/styles/InputStyle";
import { 
  ContentsWrap, 
  MainContent, 
  AnalysisWrap, 
  MainSection, 
  CardWrap,
  CardGroupWrap,
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
  BgBoxList,
  BgBoxItem,
  TextBox,
  TextInfo,
  Badge,
  BottomBar
} from "../../assets/styles/BusinessAnalysisStyle";
import { H5, Body1, Body2, Body3, Sub1, Caption1, Caption2 } from "../../assets/styles/Typography";

const FULL_DEFINITION_TEXT = '사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다.';

const InterviewWay = () => {
  const [selectedRadio1, setSelectedRadio1] = useState();
  const [selectedRadio2, setSelectedRadio2] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showQuestions, setShowQuestions] = useState({
    radio3: false,
    radio4: false,
    radio5: false
  });
  const [showCustomization, setShowCustomization] = useState(false);
  const [purposeText, setPurposeText] = useState('');
  const [showMethodology, setShowMethodology] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDefinition, setEditedDefinition] = useState('');
  const [editedPurpose, setEditedPurpose] = useState('');
  const [definitionText, setDefinitionText] = useState(
    '사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다.'
  );
  const [showNewListBox, setShowNewListBox] = useState(false);
  const [customizations, setCustomizations] = useState([]);
  const [showCustomButton, setShowCustomButton] = useState(true);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleCreatePurpose = () => {
    if (!purposeText.trim()) {
      setShowPopup(true);
    } else {
      setShowMethodology(true);
    }
  };

  const handleEditClick = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].isEditing = true;
    newCustomizations[index].editedDefinition = newCustomizations[index].definitionText;
    newCustomizations[index].editedPurpose = newCustomizations[index].purposeText;
    setCustomizations(newCustomizations);
  };

  const handleEditComplete = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].definitionText = newCustomizations[index].editedDefinition;
    newCustomizations[index].purposeText = newCustomizations[index].editedPurpose;
    newCustomizations[index].isEditing = false;
    setCustomizations(newCustomizations);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              {/* <AnalysisInfo showButtons={true} /> */}
              <InterviewWayTab>
                <InterviewWayTabItem active>
                  <span>1</span>
                  <H5>인터뷰 방법 선택</H5>
                </InterviewWayTabItem>
                <InterviewWayTabItem>
                  <span>2</span>
                  <H5>참여 페르소나 선택</H5>
                </InterviewWayTabItem>
              </InterviewWayTab>

              <InterviewWayContent>
                <div>
                  <Body2 color="gray800">인터뷰 방법 선택</Body2>

                  <CardGroupWrap>
                    <ListBoxItem active={selectedRadio1 === 'radio1'}>
                      <div>
                        <RadioButton 
                          id="radio1"
                          name="radioGroup1"
                          checked={selectedRadio1 === 'radio1'} 
                          onChange={() => setSelectedRadio1('radio1')} 
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1 color={selectedRadio1 === 'radio1' ? "primary" : "gray800"}>
                            여러 페르소나 인터뷰 (1:N)
                          </Body1>
                        </ListTitle>
                        <ListSubtitle>
                          <Caption1 color={selectedRadio1 === 'radio1' ? "gray800" : "gray500"}>
                            여러 페르소나의 다양한 의견을 한 번에 확인 하세요. 폭넓은 시각과 다양한 의견을 파악하는데 적합합니다. 
                          </Caption1>
                        </ListSubtitle>
                      </ListText>
                    </ListBoxItem>
                    
                    <ListBoxItem active={selectedRadio1 === 'radio2'}>
                      <div>
                        <RadioButton 
                          id="radio2"
                          name="radioGroup1"
                          checked={selectedRadio1 === 'radio2'} 
                          onChange={() => setSelectedRadio1('radio2')} 
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1 color={selectedRadio1 === 'radio2' ? "primary" : "gray800"}>
                            한 명과 심층 인터뷰 (1:1)
                          </Body1>
                        </ListTitle>
                        <ListSubtitle>
                          <Caption1 color={selectedRadio1 === 'radio1' ? "gray800" : "gray500"}>
                            한 명의 페르소나와 깊이 있는 대화를 통해 자세한 인사이트를 도출하세요. 구체적인 피드백이 필요한 경우 유용합니다.
                          </Caption1>
                        </ListSubtitle>
                      </ListText>
                    </ListBoxItem>
                  </CardGroupWrap>
                </div>

                <div>
                  <Body2 color="gray800">인터뷰 목적 </Body2>

                  <CardGroupWrap>
                    {showNewListBox && (
                      <ListBoxItem New
                        active={selectedRadio2 === 'radio6'}
                        showQuestions={showQuestions.radio6}
                      >
                        <div>
                          <RadioButton 
                            id="radio6"
                            name="radioGroup1"
                            checked={selectedRadio2 === 'radio6'} 
                            onChange={() => setSelectedRadio2('radio6')} 
                          />
                        </div>
                        <ListText>
                          <ListTitle>
                            <Body1 color={selectedRadio2 === 'radio6' ? "primary" : "gray800"}>
                              제품 경험 평가
                            </Body1>
                            <Badge Complete>New</Badge>
                          </ListTitle>
                          <ListSubtitle>
                            <Caption1 color="gray500">
                              다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견 
                            </Caption1>
                          </ListSubtitle>
                        </ListText>
                        <ListButton>
                          <Button 
                            Medium 
                            {...(showQuestions.radio6 ? { PrimaryLightest: true, Fill: true } : { View: true })}
                            onClick={(e) => {
                              e.preventDefault();
                              setShowQuestions(prev => ({
                                ...prev,
                                radio6: !prev.radio6
                              }));
                            }}
                          >
                            {showQuestions.radio6 ? '문항 닫기' : '문항 보기'}
                          </Button>
                        </ListButton>

                        {showQuestions.radio6 && (
                          <BoxListWrap>
                            <div>
                              <Body1 color="gray800">공통 질문</Body1>
                              <BgBoxList>
                                <BgBoxItem>
                                  <Body3 color="gray700">01.</Body3>
                                  <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                                </BgBoxItem>
                                <BgBoxItem>
                                  <Body3 color="gray700">02.</Body3>
                                  <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                                </BgBoxItem>
                                <BgBoxItem>
                                  <Body3 color="gray700">03.</Body3>
                                  <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                                </BgBoxItem>
                              </BgBoxList>
                            </div>

                            <div>
                              <Body1 color="gray800">특화 질문</Body1>
                              <BgBoxList>
                                <BgBoxItem>
                                  <Body3 color="gray700">01.</Body3>
                                  <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                                </BgBoxItem>
                                <BgBoxItem>
                                  <Body3 color="gray700">02.</Body3>
                                  <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                                </BgBoxItem>
                                <BgBoxItem>
                                  <Body3 color="gray700">03.</Body3>
                                  <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                                </BgBoxItem>
                              </BgBoxList>
                            </div>
                          </BoxListWrap>
                        )}
                      </ListBoxItem>
                    )}

                    <ListBoxItem 
                      active={selectedRadio2 === 'radio3'}
                      showQuestions={showQuestions.radio3}
                    >
                      <div>
                        <RadioButton 
                          id="radio3"
                          name="radioGroup1"
                          checked={selectedRadio2 === 'radio3'} 
                          onChange={() => setSelectedRadio2('radio3')} 
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1 color={selectedRadio2 === 'radio3' ? "primary" : "gray800"}>
                            제품 경험 평가
                          </Body1>
                        </ListTitle>
                        <ListSubtitle>
                          <Caption1 color="gray500">
                            다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견 
                          </Caption1>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <Button 
                          Medium 
                          {...(showQuestions.radio3 ? { PrimaryLightest: true, Fill: true } : { View: true })}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowQuestions(prev => ({
                              ...prev,
                              radio3: !prev.radio3
                            }));
                          }}
                        >
                          {showQuestions.radio3 ? '문항 닫기' : '문항 보기'}
                        </Button>
                      </ListButton>

                      {showQuestions.radio3 && (
                        <BoxListWrap>
                          <div>
                            <Body1 color="gray800">공통 질문</Body1>
                            <BgBoxList>
                              <BgBoxItem>
                                <Body3 color="gray700">01.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">02.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">03.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                            </BgBoxList>
                          </div>

                          <div>
                            <Body1 color="gray800">특화 질문</Body1>
                            <BgBoxList>
                              <BgBoxItem>
                                <Body3 color="gray700">01.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">02.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">03.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                            </BgBoxList>
                          </div>
                        </BoxListWrap>
                      )}
                    </ListBoxItem>

                    <ListBoxItem 
                      active={selectedRadio2 === 'radio4'} 
                      showQuestions={showQuestions.radio4}
                    >
                      <div>
                        <RadioButton 
                          id="radio4"
                          name="radioGroup1"
                          checked={selectedRadio2 === 'radio4'} 
                          onChange={() => setSelectedRadio2('radio4')} 
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1 color={selectedRadio2 === 'radio4' ? "primary" : "gray800"}>
                            제품 경험 평가
                          </Body1>
                        </ListTitle>
                        <ListSubtitle>
                          <Caption1 color="gray500">
                            다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견 
                          </Caption1>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <Button 
                          Medium 
                          {...(showQuestions.radio4 ? { PrimaryLightest: true, Fill: true } : { View: true })}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowQuestions(prev => ({
                              ...prev,
                              radio4: !prev.radio4
                            }));
                          }}
                        >
                          {showQuestions.radio4 ? '문항 닫기' : '문항 보기'}
                        </Button>
                      </ListButton>

                      {showQuestions.radio4 && (
                        <BoxListWrap>
                          <div>
                            <Body1 color="gray800">공통 질문</Body1>
                            <BgBoxList>
                              <BgBoxItem>
                                <Body3 color="gray700">01.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">02.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">03.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                            </BgBoxList>
                          </div>

                          <div>
                            <Body1 color="gray800">특화 질문</Body1>
                            <BgBoxList>
                              <BgBoxItem>
                                <Body3 color="gray700">01.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">02.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">03.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                            </BgBoxList>
                          </div>
                        </BoxListWrap>
                      )}
                    </ListBoxItem>

                    <ListBoxItem 
                      active={selectedRadio2 === 'radio5'}
                      showQuestions={showQuestions.radio5}
                    >
                      <div>
                        <RadioButton 
                          id="radio5"
                          name="radioGroup1"
                          checked={selectedRadio2 === 'radio5'} 
                          onChange={() => setSelectedRadio2('radio5')} 
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1 color={selectedRadio2 === 'radio5' ? "primary" : "gray800"}>
                            제품 경험 평가
                          </Body1>
                        </ListTitle>
                        <ListSubtitle>
                          <Caption1 color="gray500">
                            다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견 
                          </Caption1>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <Button 
                          Medium 
                          {...(showQuestions.radio5 ? { PrimaryLightest: true, Fill: true } : { View: true })}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowQuestions(prev => ({
                              ...prev,
                              radio5: !prev.radio5
                            }));
                          }}
                        >
                          {showQuestions.radio5 ? '문항 닫기' : '문항 보기'}
                        </Button>
                      </ListButton>

                      {showQuestions.radio5 && (
                        <BoxListWrap>
                          <div>
                            <Body1 color="gray800">공통 질문</Body1>
                            <BgBoxList>
                              <BgBoxItem>
                                <Body3 color="gray700">01.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">02.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">03.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                            </BgBoxList>
                          </div>

                          <div>
                            <Body1 color="gray800">특화 질문</Body1>
                            <BgBoxList>
                              <BgBoxItem>
                                <Body3 color="gray700">01.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">02.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                              <BgBoxItem>
                                <Body3 color="gray700">03.</Body3>
                                <Body3 color="gray700">페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다.</Body3>
                              </BgBoxItem>
                            </BgBoxList>
                          </div>
                        </BoxListWrap>
                      )}
                    </ListBoxItem>

                    <CustomizationWrap>
                      {showCustomButton && (
                        <Button 
                          DbExLarge 
                          W100 
                          Outline
                          onClick={() => {
                            setCustomizations(prev => [...prev, {
                              id: Date.now(),
                              purposeText: '',
                              showMethodology: false,
                              isEditing: false,
                              definitionText: FULL_DEFINITION_TEXT,
                              editedDefinition: '',
                              editedPurpose: ''
                            }]);
                            setShowCustomButton(false);
                          }}
                        >
                          <span />
                          <Sub1 color="gray700">인터뷰 커스터마이징</Sub1>
                        </Button>
                      )}
                      
                      {customizations.map((custom, index) => (
                        <div key={custom.id}>
                          {!custom.showMethodology ? (
                            <CustomizationBox>
                              <Body1 color="gray800" style={{ alignSelf: 'flex-start' }}>
                                인터뷰 목적
                              </Body1>
                              <CustomTextarea 
                                rows={4} 
                                placeholder="페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다." 
                                value={custom.purposeText}
                                onChange={(e) => {
                                  const newCustomizations = [...customizations];
                                  newCustomizations[index].purposeText = e.target.value;
                                  setCustomizations(newCustomizations);
                                }} 
                              />
                              <Button 
                                Medium 
                                Primary 
                                onClick={() => {
                                  if (!custom.purposeText.trim()) {
                                    setShowPopup(true);
                                  } else {
                                    const newCustomizations = [...customizations];
                                    newCustomizations[index].showMethodology = true;
                                    setCustomizations(newCustomizations);
                                  }
                                }}
                              >
                                목적 생성
                              </Button>
                            </CustomizationBox>
                          ) : (
                            <>
                              {!custom.isEditing ? (
                                <CustomizationBox>
                                  <CustomTitle>
                                    <Body1 color="gray800" style={{ alignSelf: 'flex-start' }}>
                                      방법론 타이틀
                                    </Body1>
                                    <ButtonGroup>
                                      <IconButton onClick={() => handleEditClick(index)}>
                                        <img src={images.PencilSquare} alt="수정하기" />
                                        수정하기
                                      </IconButton>
                                      <IconButton>
                                        <img src={images.MagicStick} alt="AI로 다듬기" />
                                        AI로 다듬기
                                      </IconButton>
                                    </ButtonGroup>
                                  </CustomTitle>

                                  <TextInfo>
                                    <Body3 color="gray700">정의</Body3>
                                    <TextBox>
                                      <Body3 color="gray700">{custom.definitionText}</Body3>
                                    </TextBox>
                                  </TextInfo>

                                  <TextInfo>
                                    <Body3 color="gray700">목적</Body3>
                                    <TextBox>
                                      <Body3 color="gray700">{custom.purposeText}</Body3>
                                    </TextBox>
                                  </TextInfo>

                                  <TextInfo>
                                    <Body3 color="gray700">질문</Body3>
                                    <BgBoxList>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">사용자의 트렌드 인지와 반응 속도 측정</Body3>
                                      </BgBoxItem>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">시장 변화에 대한 사용자의 태도와 행동 분석</Body3>
                                      </BgBoxItem>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">트렌드에 따른 구매 결정 요인 파악</Body3>
                                      </BgBoxItem>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">다양한 데모그래픽과 트렌드 반응성 비교</Body3>
                                      </BgBoxItem>
                                    </BgBoxList>
                                  </TextInfo>

                                  <Caption2 color="gray500" style={{ alignSelf: 'flex-start' }}>
                                    * 본 서비스는 B2C 페르소나를 타겟으로 진행되어, 질문문항이 소비자 중심으로 되지 않았을 경우, 적합한 결과 도출이 나오지 않을 수 있습니다. 
                                  </Caption2>

                                  <Button 
                                    Medium 
                                    Primary 
                                    onClick={() => {
                                      setShowNewListBox(true);
                                      setShowCustomization(false);
                                      setShowMethodology(false);
                                      setShowCustomButton(true);
                                      setCustomizations([]);
                                      setTimeout(() => {
                                        setShowCustomization(false);
                                      }, 100);
                                    }}
                                  >
                                    질문 생성하기
                                  </Button>
                                </CustomizationBox>
                              ) : (
                                <CustomizationBox Edit={custom.isEditing}>
                                  <CustomTitle>
                                    <Body1 color="gray800" style={{ alignSelf: 'flex-start' }}>
                                      방법론 타이틀
                                    </Body1>
                                    <ButtonGroup>
                                      <IconButton>
                                        <img src={images.PencilSquare} alt="수정하기" />
                                        수정하기
                                      </IconButton>
                                      <IconButton>
                                        <img src={images.MagicStick} alt="AI로 다듬기" />
                                        AI로 다듬기
                                      </IconButton>
                                    </ButtonGroup>
                                  </CustomTitle>

                                  <TextInfo>
                                    <Body3 color="gray700">정의</Body3>
                                    <FormBox>
                                      <CustomTextarea 
                                        Edit 
                                        rows={3}
                                        placeholder="textarea" 
                                        onChange={(e) => {
                                          const newCustomizations = [...customizations];
                                          newCustomizations[index].editedDefinition = e.target.value;
                                          setCustomizations(newCustomizations);
                                        }}
                                        value={custom.editedDefinition}
                                      />
                                    </FormBox>
                                  </TextInfo>

                                  <TextInfo>
                                    <Body3 color="gray700">목적</Body3>
                                    <FormBox>
                                      <CustomTextarea 
                                        Edit 
                                        rows={3}
                                        placeholder="textarea" 
                                        onChange={(e) => {
                                          const newCustomizations = [...customizations];
                                          newCustomizations[index].editedPurpose = e.target.value;
                                          setCustomizations(newCustomizations);
                                        }}
                                        value={custom.editedPurpose}
                                      />
                                    </FormBox>
                                  </TextInfo>

                                  <TextInfo>
                                    <Body3 color="gray700">질문</Body3>
                                    <BgBoxList>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">사용자의 트렌드 인지와 반응 속도 측정</Body3>
                                      </BgBoxItem>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">시장 변화에 대한 사용자의 태도와 행동 분석</Body3>
                                      </BgBoxItem>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">트렌드에 따른 구매 결정 요인 파악</Body3>
                                      </BgBoxItem>
                                      <BgBoxItem white>
                                        <Body3 color="gray800">다양한 데모그래픽과 트렌드 반응성 비교</Body3>
                                      </BgBoxItem>
                                    </BgBoxList>
                                  </TextInfo>

                                  <Caption2 color="gray500" style={{ alignSelf: 'flex-start' }}>
                                    * 본 서비스는 B2C 페르소나를 타겟으로 진행되어, 질문문항이 소비자 중심으로 되지 않았을 경우, 적합한 결과 도출이 나오지 않을 수 있습니다. 
                                  </Caption2>

                                  <Button Medium Primary onClick={() => handleEditComplete(index)}>완료</Button>
                                </CustomizationBox>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </CustomizationWrap>
                  </CardGroupWrap>
                </div>
              </InterviewWayContent>

              <BottomBar W100>
                <Body2 color="gray800">
                  제품 경험 평가 인터뷰에 참여할 페르소나를 선택하세요
                </Body2>
                <Button 
                  Large 
                  Primary 
                  Round 
                  Fill
                  disabled={!selectedRadio1 || !selectedRadio2}
                >
                  다음
                  <img src={images.ChevronRight} alt="다음" />
                </Button>
              </BottomBar>
            </MainSection>
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap 
          Warning
          title="다시 입력해 주세요." 
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handlePopupClose}
          show={showPopup}
        />
      )}
    </>
  );
};

export default InterviewWay;

const InterviewWayTab = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
`;

const InterviewWayTabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
  color: ${props => 
    props.active 
    ? palette.gray800 
    : palette.gray300
  };
  padding: 20px 24px;
  border-radius: 15px;
  background: ${props => 
    props.active 
    ? palette.chatGray 
    : palette.white
  };

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.white};
    border-radius: 50%;
    background: ${props => 
      props.active 
      ? palette.primary 
      : palette.gray300
    };
  }
`;

const InterviewWayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  text-align: left;
  margin-bottom: 100px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;

  > div {
    width: 100%;
  }

  button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.gray700};

    &::before, &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 1px;
      background: ${palette.gray700};
      content: '';
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;

const CustomizationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
