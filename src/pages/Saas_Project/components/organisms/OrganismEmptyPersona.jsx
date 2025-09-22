//페르소나가 없을때
import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { useAtom } from "jotai";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import { Sub3 } from "../../../../assets/styles/Typography";
import { css } from "styled-components";
import {
  createPersonaOnServer,
  getPersonaListOnServer,
  InterviewXPersonaMacroSegmentRequest,
  InterviewXPersonaUniqueUserRequest,
  InterviewXPersonaKeyStakeholderRequest,
  UserCreditCheck,
  UserCreditInfo,
  UserCreditUse,  
} from "../../../../utils/indexedDB";
import {
  PROJECT_PERSONA_LIST,
  IS_LOGGED_IN,
  PROJECT_SAAS,
  PERSONA_LIST_SAAS,
  CREDIT_CREATE_PERSONA_DEFAULT,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  USER_CREDITS,
} from "../../../../pages/AtomStates";
import PopupWrap from "../../../../assets/styles/Popup";

const OrganismEmptyPersona = () => {

  const [, setProjectPersonaList] = useAtom(PROJECT_PERSONA_LIST);
  const [isLoggedIn, ] = useAtom(IS_LOGGED_IN);
  const [project, ] = useAtom(PROJECT_SAAS);
  const [, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [creditCreatePersonaDefault] = useAtom(CREDIT_CREATE_PERSONA_DEFAULT);
  const [isLoading, setIsLoading] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [, setUserCredits] = useAtom(USER_CREDITS);


  const handleCreditPopup =  () => {
    setShowRequestPopup(true);
  }
  const handleCreatePersona = async () => {

    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    // 크레딧 사용전 사용 확인
    const creditPayload = {
      mount: creditCreatePersonaDefault,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      return;
    }

    setIsLoading(true);

    const data = {
      business_description:
        project.projectAnalysis.business_analysis +
        (project.projectAnalysis.file_analysis
          ? project.projectAnalysis.file_analysis
          : ""),
      target_customer: project.projectAnalysis.target_customer,
      business_model: project.businessModel,
      industry_type: project.industryType,
      target_country: project.targetCountry,
    };

    try {
      // Macro Segment 페르소나 생성
      let response1 = await InterviewXPersonaMacroSegmentRequest(
        data,
        isLoggedIn
      );

      const max_attempt1 = 10;
      let attempt1 = 0;

      while (
        !response1 ||
        !response1.response ||
        !response1.response.persona_macro_segment ||
        response1.response.persona_macro_segment.length === 0
      ) {
        response1 = await InterviewXPersonaMacroSegmentRequest(
          data,
          isLoggedIn
        );
        attempt1++;

        if (attempt1 >= max_attempt1) {
          throw new Error("Macro Segment 페르소나 생성에 실패했습니다.");
          // 에러 팝업 추가
        }
      }

      const personasWithType1 = response1.response.persona_macro_segment.map(
        (persona) => {
          // 스네이크 케이스를 카멜 케이스로 변환
          const camelCasePersona = {
            personaName: persona.persona_name,
            personaCharacteristics: persona.persona_characteristics,
            type: persona.type,
            age: persona.age,
            gender: persona.gender,
            job: persona.job,
            keywords: persona.keywords,
            personaType: "macro_segment",
            projectId: project._id,
            imageKey: `persona_${persona.gender === "남성" ? "m" : "f"}_${
              Math.floor(parseInt(persona.age.replace("세", "")) / 10) * 10
            }_${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`,
            // 다른 필드가 있다면 여기에 추가
          };

          return camelCasePersona;
        }
      );

      // Unique User 페르소나 생성
      let response2 = await InterviewXPersonaUniqueUserRequest(
        data,
        isLoggedIn
      );

      const max_attempt2 = 10;
      let attempt2 = 0;

      while (
        !response2 ||
        !response2.response ||
        !response2.response.persona_unique_user ||
        response2.response.persona_unique_user.length === 0
      ) {
        response2 = await InterviewXPersonaUniqueUserRequest(data, isLoggedIn);
        attempt2++;

        if (attempt2 >= max_attempt2) {
          throw new Error("Unique User 페르소나 생성에 실패했습니다.");
          // 에러 팝업 추가
        }
      }

      const personasWithType2 = response2.response.persona_unique_user.map(
        (persona) => {
          // 스네이크 케이스를 카멜 케이스로 변환
          const camelCasePersona = {
            personaName: persona.persona_name,
            personaCharacteristics: persona.persona_characteristics,
            type: persona.type,
            age: persona.age,
            gender: persona.gender,
            job: persona.job,
            keywords: persona.keywords,
            personaType: "unique_user",
            projectId: project._id,
            imageKey: `persona_${persona.gender === "남성" ? "m" : "f"}_${
              Math.floor(parseInt(persona.age.replace("세", "")) / 10) * 10
            }_${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`,
            // 다른 필드가 있다면 여기에 추가
          };

          return camelCasePersona;
        }
      );

      // Key Stakeholder 페르소나 생성
      let response3 = await InterviewXPersonaKeyStakeholderRequest(
        data,
        isLoggedIn
      );

      const max_attempt3 = 10;
      let attempt3 = 0;

      while (
        !response3 ||
        !response3.response ||
        !response3.response.persona_key_stakeholder ||
        response3.response.persona_key_stakeholder.length === 0
      ) {
        response3 = await InterviewXPersonaKeyStakeholderRequest(
          data,
          isLoggedIn
        );
        attempt3++;

        if (attempt3 >= max_attempt3) {
          throw new Error("Key Stakeholder 페르소나 생성에 실패했습니다.");
          // 에러 팝업 추가
        }
      }

      const personasWithType3 = response3.response.persona_key_stakeholder.map(
        (persona) => {
          // 스네이크 케이스를 카멜 케이스로 변환
          const camelCasePersona = {
            personaName: persona.persona_name,
            personaCharacteristics: persona.persona_characteristics,
            type: persona.type,
            age: persona.age,
            gender: persona.gender,
            job: persona.job,
            keywords: persona.keywords,
            personaType: "key_stakeholder",
            projectId: project._id,
            imageKey: `persona_${persona.gender === "남성" ? "m" : "f"}_${
              Math.floor(parseInt(persona.age.replace("세", "")) / 10) * 10
            }_${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`,
            // 다른 필드가 있다면 여기에 추가
          };

          return camelCasePersona;
        }
      );

      // 모든 페르소나를 하나의 배열로 합치기
      const allPersonas = [
        ...personasWithType1,
        ...personasWithType2,
        ...personasWithType3,
      ];

      // 상태 업데이트
      setProjectPersonaList(allPersonas);

      // DB에 저장하고 반환된 ID로 페르소나 객체 업데이트
      const updatedPersonas = [];
      for (let i = 0; i < allPersonas.length; i++) {
        const persona = allPersonas[i];
        try {
          // 서버에 저장하고 ID 반환 받기
          const insertedId = await createPersonaOnServer(persona, isLoggedIn);

          // 서버에서 반환된 ID가 있으면 페르소나 객체에 _id 추가
          if (insertedId) {
            const updatedPersona = {
              ...persona,
              _id: insertedId,
            };
            updatedPersonas.push(updatedPersona);
          } else {
            // ID가 없는 경우 원래 객체 사용
            updatedPersonas.push(persona);
          }
        } catch (error) {
          updatedPersonas.push(persona);
        }
      }

      // 서버에서 최신 데이터 가져오기

      try {
        const savedPersonaListInfo = await getPersonaListOnServer(
          project?._id,
          true
        );

        if (savedPersonaListInfo) {
          const sortedList = [...savedPersonaListInfo].sort((a, b) => {
            const dateA = a.timestamp;
            const dateB = b.timestamp;
            return dateA - dateB; 
          });

          setPersonaListSaas(sortedList);
        }
      } catch (error) {
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: project.projectTitle,
      service_type: "페르소나 모집 요청",
      target: "",
      state: "use",
      mount: creditCreatePersonaDefault,
    };

    await UserCreditUse(creditUsePayload, isLoggedIn);

    // 크레딧 사용 후 사용자 정보 새로고침
    accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const userCreditValue = await UserCreditInfo(isLoggedIn);
      setUserCredits(userCreditValue);
    }
  };

  return (
    <>
    <EmptyStateWrapper
      disabled={isLoading}
      onClick={isLoading ? undefined : handleCreditPopup}
    >
      {isLoading ? (
        <AtomPersonaLoader message="페르소나를 생성하고 있습니다." />
      ) : (
        <EmptyStateContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src={images.PeopleFillPrimary2} alt="" />
            <Sub3 color="gray700">
              아직 생성된 페르소나가 없습니다.
              <br />
              지금 바로 AI 페르소나를 만들어보세요
            </Sub3>
          </div>
          <Button Medium Outline Fill>
            AI Person 생성
          </Button>
        </EmptyStateContent>
      )}
    </EmptyStateWrapper>
    <>
    {showRequestPopup &&
      (eventState ? (
        <PopupWrap
          Event
          title="페르소나 모집 요청"
          message={
            <>
              현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
              <br />({creditCreatePersonaDefault.toLocaleString()} 크레딧)
            </>
          }
          buttonType="Outline"
          closeText="취소"
          confirmText="시작하기"
          isModal={false}
          onCancel={() => setShowRequestPopup(false)}
          onConfirm={() => {
            handleCreatePersona();
            setShowRequestPopup(false);
          }}
        />
      ) : trialState ? (
        <PopupWrap
          Check
          title="페르소나 모집 요청"
          message={
            <>
              해당 서비스 사용시 크레딧이 소진됩니다.
              <br />({creditCreatePersonaDefault.toLocaleString()} 크레딧)
              {/* <br />
              신규 가입 2주간 무료로 사용 가능합니다. */}
            </>
          }
          buttonType="Outline"
          closeText="취소"
          confirmText="시작하기"
          isModal={false}
          onCancel={() => setShowRequestPopup(false)}
          onConfirm={() => {
            handleCreatePersona();
            setShowRequestPopup(false);
          }}
        />
      ) : (
        <PopupWrap
          Check
          title="페르소나 모집 요청"
          message={
            <>
              해당 서비스 사용시 크레딧이 소진됩니다.
              <br />({creditCreatePersonaDefault.toLocaleString()} 크레딧)
            </>
          }
          buttonType="Outline"
          closeText="취소"
          confirmText="시작하기"
          isModal={false}
          onCancel={() => setShowRequestPopup(false)}
          onConfirm={() => {
            handleCreatePersona();
            setShowRequestPopup(false); // 팝업 닫기
          }}
        />
      ))}
    {showCreditPopup && (
      <PopupWrap
        Warning
        title="크레딧이 모두 소진되었습니다"
        message={
          <>
            보유한 크레딧이 부족합니다.
            <br />
            크레딧을 충전한 후 다시 시도해주세요.
          </>
        }
        buttonType="Outline"
        closeText="확인"
        isModal={false}
        onCancel={() => setShowCreditPopup(false)}
      />
    )}
    </>
    </>
  );
};

const EmptyStateWrapper = styled.div`
  width: 100%;
  height: 258px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette.white};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  transition: all 0.2s ease-in-out;
  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        border-color: ${palette.primary};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }
    `}
`;

const EmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 40px;
`;



export default OrganismEmptyPersona;
