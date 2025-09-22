//AI Persona
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../assets/styles/Palette";
import OrganismIncNavigation from "../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../Global/molecules/MoleculeHeader";
import MoleculeAccountPopup from "../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../assets/styles/Popup";
import { Button, ButtonGroup } from "../../assets/styles/ButtonStyle";
import { CheckBox } from "../../assets/styles/Input";
import {
  CustomTextarea,
  SelectBox,
  SelectBoxTitle,
  SelectBoxList,
  SelectBoxItem,
} from "../../assets/styles/InputStyle";
import {
  ContentsWrap,
  MainContent,
  TabWrapType3,
  TabButtonType3,
  AiPersonaCardGroupWrap,
  AiPersonaCardListItem,
  AiPersonaCardButtonWrap,
  UniqueTag,
  TabWrapType2,
  TabButtonType2,
  TabContent,
  InterviewPopup,
  PopupTitle,
  PopupTitle2,
  PopupContent,
  BgBoxItem,
  OCEANRangeWrap,
  RangeSlider,
} from "../../assets/styles/BusinessAnalysisStyle";
import images from "../../assets/styles/Images";
import {
  H1,
  H2,
  H4,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  Caption1,
  Caption2,
  InputText,
} from "../../assets/styles/Typography";

const PageAiPersona = () => {
  const navigate = useNavigate();

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isCustomizePopupOpen, setIsCustomizePopupOpen] = useState(false);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);

  const [isStarred, setIsStarred] = useState(false);
  const [activeTab2, setActiveTab2] = useState("lifestyle");
  const [showPopup, setShowPopup] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [genderRef, setGenderRef] = useState(null);
  const [ageGroupRef, setAgeGroupRef] = useState(null);
  const [businessRef, setBusinessRef] = useState(null);
  const [uniqueUserRef, setUniqueUserRef] = useState(null);
  const [keyStakeholderRef, setKeyStakeholderRef] = useState(null);
  const [purpose, setPurpose] = useState(null);

  const handleEditClose = () => {
    setIsEditPopupOpen(false);
  };
  const handleEditContinue = () => {
    setIsEditPopupOpen(false);
    setShowPopup(false);
    setActiveTabIndex(0);

    setTimeout(() => {
      setIsCustomizePopupOpen(true);
    }, 100);
  };

  const handleCreateContinue = () => {
    setIsCreatePopupOpen(false);
  };

  const handleCustomizePopupClose = () => {
    setIsCustomizePopupOpen(false);
  };

  const handleCustomizePopupConfirm = () => {
    if (activeTabIndex === 0) {
      setActiveTabIndex(1);
    } else if (activeTabIndex === 1) {
      setActiveTabIndex(2);
    } else {
      setIsCustomizePopupOpen(false);
      setIsRequestPopupOpen(true);
    }
  };

  const handleRequestPopupClose = () => {
    setIsRequestPopupOpen(false);
  };

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };

  const [oceanValues, setOceanValues] = useState({
    openness: 0.5,
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.5,
  });

  const handleOceanChange = (trait, value) => {
    // 값을 0 또는 1로 스냅
    const snappedValue = Number(value) <= 0.5 ? 0 : 1;

    setOceanValues((prev) => ({
      ...prev,
      [trait]: snappedValue,
    }));
  };

  const [ignoreOcean, setIgnoreOcean] = useState(false);

  const handleIgnoreOcean = (e) => {
    setIgnoreOcean(e.target.checked);
  };

  const [selectBoxStates, setSelectBoxStates] = useState({
    gender: false,
    ageGroup: false,
    business: false,
    uniqueUser: false,
    keyStakeholder: false,
  });

  const [selectedValues, setSelectedValues] = useState({
    gender: "",
    ageGroup: "",
    business: "",
    uniqueUser: "",
    keyStakeholder: "",
  });

  const [customPersonaForm, setCustomPersonaForm] = useState({
    description: "", // 페르소나 특징과 역할
    purpose: "", // 사용 목적
    quantity: 1, // 모집 인원

    gender: "", // 성별 ('' | 'male' | 'female')
    ageGroups: [], // 연령대 선택 ['10s', '20s', ...]
    additionalInfo: "", // 추가 필요 정보
  });

  const handleFormChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    if (activeTabIndex === 0) {
      return (
        customPersonaForm.gender !== "" &&
        customPersonaForm.ageGroups.length > 0 &&
        customPersonaForm.purpose.trim() !== "" &&
        customPersonaForm.additionalInfo.trim() !== ""
      );
    }
    return true; // 다른 탭에서는 항상 true 반환
  };

  const toggleSelectBox = (type) => {
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePurposeSelect = (value, type) => {
    setSelectedValues((prev) => ({
      ...prev,
      [type]: value,
    }));
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: false,
    }));
  };

  const handleCustomizePopupOpen = () => {
    setActiveTabIndex(0);
    setCustomPersonaForm({
      description: "",
      purpose: "",
      quantity: 1,
      gender: "",
      ageGroups: [],
      additionalInfo: "",
    });
    setIsCustomizePopupOpen(true);
  };

  useEffect(() => {
    if (isCustomizePopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCustomizePopupOpen]);

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1240>
          <AiPersonaWrap>
            <AiPersonaTitle>
              <div>
                <H1 color="gray800" align="left">
                  AI Persona
                </H1>
                <Body3 color="gray700" align="left">
                  당신의 비즈니스에 새로운 인사이트를 제시해줄 AI 페르소나가
                  대화를 기다리고 있어요
                </Body3>
              </div>

              <Button
                exLarge
                PrimaryLightest
                Fill
                onClick={handleCustomizePopupOpen}
              >
                <img src={images.PlusPrimary} width="14" height="14" />
                <Sub1 color="primary">나만의 AI Persona 요청</Sub1>
              </Button>
            </AiPersonaTitle>

            <AiPersonaContent>
              <TabWrapType3 Border>
                <TabButtonType3>Macro Segment</TabButtonType3>
                <TabButtonType3>Unique User</TabButtonType3>
                <TabButtonType3>Key Stakeholder</TabButtonType3>
                <TabButtonType3>Favorite</TabButtonType3>
              </TabWrapType3>

              <AiPersonaInfo>
                <div>
                  <span className="active">
                    <Sub3 color="primary">1</Sub3>
                  </span>
                  <Sub3 color="gray700">활성 페르소나</Sub3>
                </div>
                <div>
                  <span className="inactive">
                    <Sub3 color="primary">15</Sub3>
                  </span>
                  <Sub3 color="gray700">비활성 페르소나</Sub3>
                </div>
              </AiPersonaInfo>

              <AiPersonaCardGroupWrap>
                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>

                <AiPersonaCardListItem>
                  <div className="header">
                    <UniqueTag color="Haker" />
                    <div className="title">
                      <Body1 color="gray800">스마트홈 자동화 유저</Body1>
                      <div>
                        <Sub3 color="gray700">#남성</Sub3>
                        <Sub3 color="gray700">#20세</Sub3>
                        <Sub3 color="gray700">#은퇴 후 건강 관리에 집중</Sub3>
                        <Sub3 color="gray700">#부드러운 기상 선호</Sub3>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Sub3 color="gray700">
                      스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을
                      연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀
                      기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고,
                      커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을
                      자동화하고, 커스텀 기능을 연구
                    </Sub3>
                  </div>

                  <AiPersonaCardButtonWrap>
                    <div>
                      <StarButton
                        onClick={() => setIsStarred(!isStarred)}
                        isStarred={isStarred}
                      >
                        {isStarred ? (
                          <img src={images.StarFill} />
                        ) : (
                          <img src={images.Star} />
                        )}
                      </StarButton>
                    </div>

                    <div>
                      <CustomButton
                        Medium
                        Outline
                        onClick={() => setShowPopup(true)}
                      >
                        프로필
                      </CustomButton>
                      <CustomButton Medium Primary Fill>
                        채팅
                      </CustomButton>
                    </div>
                  </AiPersonaCardButtonWrap>
                </AiPersonaCardListItem>
              </AiPersonaCardGroupWrap>
            </AiPersonaContent>
          </AiPersonaWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <>
          <InterviewPopup>
            <div style={{ maxWidth: "560px" }}>
              <div className="header">
                <H4>
                  시간이 부족한 바쁜 프리랜서
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <p className="info noLine">
                  <Sub3>#남성</Sub3>
                  <Sub3>#20세</Sub3>
                  <Sub3>#은퇴 후 건강 관리에 집중</Sub3>
                  <Sub3>#부드러운 기상 선호</Sub3>
                </p>
              </div>

              <div className="content">
                <TabWrapType2>
                  <TabButtonType2
                    isActive={activeTab2 === "lifestyle"}
                    onClick={() => setActiveTab2("lifestyle")}
                  >
                    라이프스타일
                  </TabButtonType2>
                  <TabButtonType2
                    isActive={activeTab2 === "interests"}
                    onClick={() => setActiveTab2("interests")}
                  >
                    관심사
                  </TabButtonType2>
                  <TabButtonType2
                    isActive={activeTab2 === "consumption"}
                    onClick={() => setActiveTab2("consumption")}
                  >
                    소비성향
                  </TabButtonType2>
                  <TabButtonType2
                    isActive={activeTab2 === "experience"}
                    onClick={() => setActiveTab2("experience")}
                  >
                    사용경험
                  </TabButtonType2>
                </TabWrapType2>

                {activeTab2 === "lifestyle" && (
                  <TabContent>
                    <Body3 color="gray700">
                      학업과 여가를 균형 있게 추구하며, 문화적 호기심이
                      많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술
                      전시와 독립영화를 감상하거나 워크숍에 참여합니다. 소셜
                      미디어를 통해 최신 문화 소식을 빠르게 접하고, 친구들과
                      경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해 자기
                      계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.학업과 여가를 균형 있게 추구하며, 문화적
                      호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며,
                      예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다.
                      소셜 미디어를 통해 최신 문화 소식을 빠르게 접하고,
                      친구들과 경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해
                      자기 계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.
                    </Body3>
                  </TabContent>
                )}
                {activeTab2 === "interests" && (
                  <TabContent>
                    <Body3 color="gray700">
                      학업과 여가를 균형 있게 추구하며, 문화적 호기심이
                      많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술
                      전시와 독립영화를 감상하거나 워크숍에 참여합니다. 소셜
                      미디어를 통해 최신 문화 소식을 빠르게 접하고, 친구들과
                      경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해 자기
                      계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.학업과 여가를 균형 있게 추구하며, 문화적
                      호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며,
                      예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다.
                      소셜 미디어를 통해 최신 문화 소식을 빠르게 접하고,
                      친구들과 경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해
                      자기 계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.
                    </Body3>
                  </TabContent>
                )}
                {activeTab2 === "consumption" && (
                  <TabContent>
                    <Body3 color="gray700">
                      학업과 여가를 균형 있게 추구하며, 문화적 호기심이
                      많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술
                      전시와 독립영화를 감상하거나 워크숍에 참여합니다. 소셜
                      미디어를 통해 최신 문화 소식을 빠르게 접하고, 친구들과
                      경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해 자기
                      계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.학업과 여가를 균형 있게 추구하며, 문화적
                      호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며,
                      예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다.
                      소셜 미디어를 통해 최신 문화 소식을 빠르게 접하고,
                      친구들과 경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해
                      자기 계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.
                    </Body3>
                  </TabContent>
                )}
                {activeTab2 === "experience" && (
                  <TabContent>
                    <Body3 color="gray700">
                      학업과 여가를 균형 있게 추구하며, 문화적 호기심이
                      많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술
                      전시와 독립영화를 감상하거나 워크숍에 참여합니다. 소셜
                      미디어를 통해 최신 문화 소식을 빠르게 접하고, 친구들과
                      경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해 자기
                      계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.학업과 여가를 균형 있게 추구하며, 문화적
                      호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며,
                      예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다.
                      소셜 미디어를 통해 최신 문화 소식을 빠르게 접하고,
                      친구들과 경험을 공유하는 것을 즐깁니다. 새로운 시도를 통해
                      자기 계발을 추구하며, 학업과 관련된 창의적 활동에도
                      열정적입니다.
                    </Body3>
                  </TabContent>
                )}
              </div>

              <ButtonGroup>
                <Button
                  DbExLarge
                  PrimaryLightest
                  Fill
                  W100
                  onClick={() => setIsEditPopupOpen(true)}
                >
                  페르소나 편집
                </Button>
                <Button
                  DbExLarge
                  Primary
                  Fill
                  W100
                  onClick={() => setIsCreatePopupOpen(true)}
                >
                  페르소나 생성
                </Button>
              </ButtonGroup>
            </div>
          </InterviewPopup>
        </>
      )}

      {isEditPopupOpen && (
        <PopupWrap
          Warning
          title="편집을 진행하면 기존 페르소나가 삭제됩니다"
          message="편집 후에는 복구 할 수 없으니, 변경 전 확인해주세요"
          buttonType="Outline"
          closeText="취소"
          confirmText="페르소나 편집"
          isModal={false}
          onCancel={handleEditClose}
          onConfirm={handleEditContinue}
        />
      )}

      {isCreatePopupOpen && (
        <PopupWrap
          Warning
          title="사용경험에 대한 내용을 입력해주세요"
          message="사용경험에 대한 내용은 필수입력 항목입니다"
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={handleCreateContinue}
        />
      )}

      {isRequestPopupOpen && (
        <PopupWrap
          Check
          title={
            <>
              나만의 AI Person 요청이 완료되었습니다.
              <br />
              완료된 AI Person은 "My Persona"에서 확인하세요
            </>
          }
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={handleRequestPopupClose}
        />
      )}

      {isCustomizePopupOpen && (
        <PopupWrap
          TitleFlex
          title="📝 나만의 AI Person 요청하기"
          buttonType="Fill"
          confirmText={activeTabIndex === 2 ? "맞춤 페르소나 모집하기" : "다음"}
          prevText={activeTabIndex === 2 ? "이전" : ""}
          onPrev={() => setActiveTabIndex(1)}
          showPrevButton={activeTabIndex === 2}
          isModal={true}
          isFormValid={isFormValid()}
          onCancel={handleCustomizePopupClose}
          onConfirm={handleCustomizePopupConfirm}
          showTabs={true}
          tabs={["필수정보", "OCEAN 정보", "요청사항확인"]}
          onTabChange={(index) => {
            if (index === 1) {
              const isGenderSelected = customPersonaForm.gender !== "";
              const isAgeGroupSelected = customPersonaForm.ageGroups.length > 0;
              if (!isGenderSelected || !isAgeGroupSelected) {
                return;
              }
            }
            setActiveTabIndex(index);
          }}
          activeTab={activeTabIndex}
          eventState={false}
          creditRequestCustomPersona={100}
          body={
            <div>
              {activeTabIndex === 0 && (
                <>
                  <div className="flex">
                    <div>
                      <Body2 color="gray700" align="left">
                        성별<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle
                          onClick={() => toggleSelectBox("gender")}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {customPersonaForm.gender && (
                              <img
                                src={
                                  customPersonaForm.gender === "male"
                                    ? images.GenderMenPrimary
                                    : images.GenderWomenPrimary
                                }
                                alt="성별"
                                style={{ width: "25px", height: "25px" }}
                              />
                            )}
                            <Body2
                              color={
                                customPersonaForm.gender ? "primary" : "gray300"
                              }
                            >
                              {customPersonaForm.gender === "male"
                                ? "남성"
                                : customPersonaForm.gender === "female"
                                ? "여성"
                                : "선택해주세요"}
                            </Body2>
                          </div>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates.gender
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates.gender && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                handleFormChange("gender", "male");
                                handlePurposeSelect("남성", "gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                남성
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleFormChange("gender", "female");
                                handlePurposeSelect("여성", "gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                여성
                              </Body2>
                            </SelectBoxItem>
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>

                    <div>
                      <Body2 color="gray700" align="left">
                        연령<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle onClick={() => toggleSelectBox("age")}>
                          <Body2
                            color={
                              customPersonaForm.ageGroups.length > 0
                                ? "primary"
                                : "gray300"
                            }
                          >
                            {customPersonaForm.ageGroups.length > 0
                              ? customPersonaForm.ageGroups.join(", ")
                              : "선택해주세요"}
                          </Body2>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates.age
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates.age && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                const newAgeGroups = [
                                  ...customPersonaForm.ageGroups,
                                ];
                                const index = newAgeGroups.indexOf("10대");
                                if (index === -1) {
                                  newAgeGroups.push("10대");
                                } else {
                                  newAgeGroups.splice(index, 1);
                                }
                                handleFormChange("ageGroups", newAgeGroups);
                                handlePurposeSelect(
                                  newAgeGroups.join(", "),
                                  "age"
                                );
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                10대
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                const newAgeGroups = [
                                  ...customPersonaForm.ageGroups,
                                ];
                                const index = newAgeGroups.indexOf("20대");
                                if (index === -1) {
                                  newAgeGroups.push("20대");
                                } else {
                                  newAgeGroups.splice(index, 1);
                                }
                                handleFormChange("ageGroups", newAgeGroups);
                                handlePurposeSelect(
                                  newAgeGroups.join(", "),
                                  "age"
                                );
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                20대
                              </Body2>
                            </SelectBoxItem>
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>
                  </div>

                  <div>
                    <Body2 color="gray700" align="left">
                      맞춤 페르소나를 생성하는 이유와 목적이 무엇인가요?
                      <span style={{ color: "red" }}>*</span>
                    </Body2>
                    <PopupContent>
                      <CustomTextarea
                        width="100%"
                        rows={5}
                        placeholder="이유와 목적을 알려주시면 상황에 걸맞은 최적의 페르소나를 생성해 드려요!"
                        value={customPersonaForm.purpose}
                        onChange={(e) =>
                          handleFormChange("purpose", e.target.value)
                        }
                      />
                    </PopupContent>
                  </div>

                  <div>
                    <Body2 color="gray700" align="left">
                      필수적으로 필요한 정보가 있다면, 알려주세요{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Body2>
                    <PopupContent>
                      <CustomTextarea
                        width="100%"
                        rows={5}
                        placeholder="필수로 고려해야할 정보가 있다면 작성해주세요."
                        value={customPersonaForm.additionalInfo}
                        onChange={(e) =>
                          handleFormChange("additionalInfo", e.target.value)
                        }
                      />
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex === 1 && (
                <>
                  <BgBoxItem NoOutline style={{ marginBottom: "10px" }}>
                    <Sub3 color="gray500" align="left">
                      OCEAN이란?
                      <br />
                      성격 심리학에서 인간의 성격을 설명하는 다섯 요인
                      창의성(Openness), 성실성(Conscientiouseness),
                      외향성(Extraversion), 친화성(Agreeableness), 정서적
                      안정성(Neuroticism)을 평가하는 방법입니다.
                    </Sub3>
                  </BgBoxItem>

                  <OCEANRangeWrap>
                    <div>
                      <Body3 color="gray800">보수적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.openness}
                        onChange={(e) =>
                          handleOceanChange("openness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">개방적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">즉흥적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.conscientiousness}
                        onChange={(e) =>
                          handleOceanChange("conscientiousness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">성실함</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">내향적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.extraversion}
                        onChange={(e) =>
                          handleOceanChange("extraversion", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">외향적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">독립적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.agreeableness}
                        onChange={(e) =>
                          handleOceanChange("agreeableness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">우호적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">무던함</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.neuroticism}
                        onChange={(e) =>
                          handleOceanChange("neuroticism", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">신경적</Body3>
                    </div>
                  </OCEANRangeWrap>

                  <div style={{ marginTop: "12px", textAlign: "left" }}>
                    <CheckBox Fill>
                      <input
                        type="checkbox"
                        id="chk1"
                        checked={ignoreOcean}
                        onChange={handleIgnoreOcean}
                      />
                      <label htmlFor="chk1">
                        페르소나의 성격 유형을 랜덤으로 생성 하겠습니다.
                      </label>
                    </CheckBox>
                  </div>
                </>
              )}

              {activeTabIndex === 2 && (
                <>
                  <BgBoxItem
                    NoOutline
                    style={{ marginBottom: "10px", alignItems: "flex-start" }}
                  >
                    <Sub3 color="gray500" align="left">
                      💡 맞춤 페르소나 요청이 많은 경우,
                      <br />
                      페르소나 생성 시간이 다소 길어질 수 있는 점 양해
                      부탁드립니다.
                      <br />
                      보다 정확하고 정교한 페르소나를 제공해 드릴 수 있도록
                      최선을 다하겠습니다. 😊
                    </Sub3>
                  </BgBoxItem>

                  <div className="flex">
                    <div>
                      <Body3 color="gray500" align="left">
                        성별
                      </Body3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <img
                          src={
                            customPersonaForm.gender === "male"
                              ? images.GenderMen
                              : customPersonaForm.gender === "female"
                              ? images.GenderWomen
                              : images.GenderMen
                          }
                          alt="성별"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <Body2 color="gray800" align="left">
                          {customPersonaForm.gender === "male"
                            ? "남성"
                            : customPersonaForm.gender === "female"
                            ? "여성"
                            : "선택 안함"}
                        </Body2>
                      </div>
                    </div>

                    <div>
                      <Body3 color="gray500" align="left">
                        연령
                      </Body3>
                      <Body2 color="gray800" align="left">
                        20대
                      </Body2>
                    </div>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      이유, 목적
                    </Body3>
                    <Body2 color="gray800" align="left">
                      여러가지 이유와 목적을 작성하시면 됩니다.
                      <br />
                      해당 내용이 길어질 수 있습니다.
                    </Body2>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      필수정보
                    </Body3>
                    <Body2 color="gray800" align="left">
                      여러가지 내용이 들어갈 수 있는 다양한 정보를 보여줍니다.
                      너무 많은 내용은 줄 바꿈이 필요 합니다. 당연히 두줄도 가능
                      합니다. 너무 많은 내용은 힘들 수 있습니다.
                      <br />
                      물론 세줄까지도!! 가능 할지도 모릅니다. 하지만 이 이상은
                      정말 힘들기 때문에 자제..{" "}
                    </Body2>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      성격(OCEAN)
                    </Body3>
                    <div className="box-list">
                      <div>
                        <Body2 color="gray800">개방적</Body2>
                        <Sub3 color="gray300">open mind</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">즉흥적</Body2>
                        <Sub3 color="gray300">impromptu</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">내향적</Body2>
                        <Sub3 color="gray300">introvert</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">우호적</Body2>
                        <Sub3 color="gray300">friendly</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">무던함</Body2>
                        <Sub3 color="gray300">simple</Sub3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          }
        />
      )}
    </>
  );
};

export default PageAiPersona;

const AiPersonaWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 54px;
  margin: 50px auto;
`;

const AiPersonaTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const AiPersonaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const AiPersonaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    border-radius: 5px;

    &.active {
      border: 1px solid ${palette.white};
      background: ${palette.primaryLightest};
    }

    &.inactive {
      border: 1px solid ${palette.primary};
      background: ${palette.white};
    }
  }
`;

const CustomButton = styled(Button)`
  min-width: 92px;
`;

const StarButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.isStarred ? `rgba(255, 149, 0, 0.10)` : palette.gray200};
  background: ${(props) =>
    props.isStarred ? `rgba(255, 149, 0, 0.10)` : palette.white};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const PersonaStatusWrap = styled.div`
  display: flex;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    // max-width: calc(100% / 3);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  ${(props) =>
    props.NoData &&
    `
    > div {
      align-items: center;
      gap: 8px;
      padding: 44px 24px;

      button {
        margin-top: 4px;
      }
    }
  `}
`;
