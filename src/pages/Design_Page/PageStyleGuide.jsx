import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { Button, IconButton } from "../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomInput,
  CustomTextarea,
  ErrorMessage,
  CheckCircle,
  RadioButton,
  GenderRadioButton,
} from "../../assets/styles/InputStyle";
import { CheckBox } from "../../assets/styles/Input";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body1,
  Body2_1,
  Body2,
  Body3,
  Sub1,
  Sub2_1,
  Sub2,
  Sub3,
  Caption1,
  Caption2,
  InputText,
  Helptext,
} from "../../assets/styles/Typography";
import {
  TabWrap,
  TabButton,
  TabWrapType2,
  TabWrapType3,
  TabButtonType2,
  TabButtonType3,
  Status,
  Badge,
  Tag,
  BottomBar,
  PersonaGroup,
  Persona,
  ListGroupWrap,
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  CardGroupWrap,
  CardListItem,
  CardText,
  CardTitle,
  CardButton,
  ViewType,
  TypeButton,
  BoxWrap,
  CategoryView,
  ChoiceWrap,
  Choice,
  OCEANRangeWrap,
  RangeSlider,
} from "../../assets/styles/BusinessAnalysisStyle";
import PopupWrap from "../../assets/styles/Popup";
import {
  SkeletonH1,
  SkeletonTitle,
  SkeletonLine,
} from "../../assets/styles/Skeleton";
import AtomPersonaLoader from "../Global/atoms/AtomPersonaLoader";
import images from "../../assets/styles/Images";
import personaImages from "../../assets/styles/PersonaImages";
import BarChart from "../../components/Charts/BarChart";
import CardPersonaSelected from "../../components/Charts/CardPersonaSelected";
import BarChartLikertScale5 from "../../components/Charts/BarChartLikertScale5";
import ABGraph from "../../components/Charts/ABGraph";
import BarChartLikertScale11 from "../../components/Charts/BarChartLikertScale11";
import GraphChartScale2 from "../../components/Charts/GraphChartScale2";
import GraphChartScale5 from "../../components/Charts/GraphChartScale5";
import GraphChartScale11 from "../../components/Charts/GraphChartScale11";
import ImportanceButtonGroup from "../../components/Charts/ImportanceButtonGroup";
import ImportanceButtonLevel from "../../components/Charts/ImportanceButtonLevel";
import QuickSurveyCard from "../../components/Charts/QuickSurveyCard";
import QuckSurveyPopup from "../../components/Charts/QuckSurveyPopup";
import KanoModelGraph from "../../components/Charts/KanoModelGraph";
import MandalArtGraph from "../../components/Charts/MandalArtGraph";
import WriteSelfCard from "../../components/Charts/WriteSelfCard";
import IdeaGenerationTag from "../../components/Charts/IdeaGenerationTag";
import ParetoCurveGraph from "../../components/Charts/ParetoCurveGraph";
import BusinessModelPopup from "../../components/Charts/BusinessModelPopup";
import WaitLongLodingBar from "../../components/Charts/WaitLongLodingBar";
import BusinessModelGraph from "../../components/Charts/BusinessModelGraph";
import FavoritePersonaStatus from "../../components/Charts/FavoritePersonaStatus";
import MyPersonaTag from "../../components/Charts/MyPersonaTag";
import MacroSegTag from "../../components/Charts/MacroSegTag";
import StakeHolderTag from "../../components/Charts/StakeHolderTag";
import NeedsKeywordSelected from "../../components/Charts/NeedsKeywordSelected";
import NeedsKeywordResult from "../../components/Charts/NeedsKeywordResult";
import MultipleQustionSelection from "../../components/Charts/MultipleQustionSelection";
import ParticipationTeamList from "../../components/Charts/ParticipationTeamList";
import ParticipationTeamList2 from "../../components/Charts/ParticipationTeamList2";
import NoticeBoxContent from "../../components/Charts/NoticeBoxContent";
import ResultTable from "../../components/Charts/ResultTable";
import BusinessModelResult from "../../components/Charts/BusinessModelResult";
import AddContentWriting from "../../components/Charts/AddContentWriting";
import { useAtom } from "jotai";
import { KANO_MODEL_GRAPH_DATA } from "../../pages/AtomStates";
import OrganismProUpgradePopup from "../Saas_Project/components/organisms/OrganismProUpgradePopup";

const PageStyleGuide = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("radio2");
  const [selectedRadio1, setSelectedRadio1] = useState("radio3");
  const [selectedRadio2, setSelectedRadio2] = useState("gender2");
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeTab1, setActiveTab1] = useState("tab1");
  const [activeTab2, setActiveTab2] = useState("tab1");
  const [showPopup, setShowPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);
  const [selectedKeywords, setSelectedKeywords] = useState(['k1', 'k3']);
  const [isCardSelected, setIsCardSelected] = useState(false);
  
  // 더미 키워드 데이터
  const dummyKeywords = [
    { id: 'k1', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k2', text: '정보 통합 & 개인화' },
    { id: 'k3', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k4', text: '경험 공유 커뮤니티' },
    { id: 'k5', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k6', text: '정보 통합 & 개인화' },
    { id: 'k7', text: '경험 기반 쇼핑 큐레이션' },
    { id: 'k8', text: '경험 공유 커뮤니티' }
  ];
  
  // KanoModelGraph를 위한 더미 데이터
  const [kanoModelGraphData, setKanoModelGraphData] = useAtom(KANO_MODEL_GRAPH_DATA);
  
  // KanoModelGraph 더미 데이터 설정
  useEffect(() => {
    // 카노 모델 더미 데이터
    const kanoModelDummyData = {
      "직관적인 UI": { CSP: 0.8, CSM: 0.6 },
      "빠른 로딩 속도": { CSP: 0.7, CSM: 0.4 },
      "다양한 필터링 옵션": { CSP: 0.5, CSM: 0.8 },
      "개인화된 추천": { CSP: 0.2, CSM: 0.9 },
      "사용자 리뷰 시스템": { CSP: 0.3, CSM: 0.1 },
      "실시간 알림": { CSP: 0.9, CSM: -0.2 },
      "결제 간소화": { CSP: 0.1, CSM: 0.2 },
      "쇼핑 히스토리": { CSP: 0.4, CSM: -0.5 }
    };
    
    // KanoModelGraph 데이터 설정
    setKanoModelGraphData(kanoModelDummyData);
  }, [setKanoModelGraphData]);
  
  // ParetoCurveGraph에 사용할 더미데이터
  const paretoDummyData = [
    { name: "고고품질 문제", value: 175 },
    { name: "많은 배송 지연", value: 50 },
    { name: "겁나게 비싸서 사기 힘든 높은 가격 불만", value: 35 },
    { name: "이은결제 오류", value: 20 },
    { name: "어머나 재고 부족", value: 15 },
    { name: "기존의 서비스 불량", value: 10 },
    { name: "수 많은 앱 오류", value: 8 },
    { name: "비싼 통기타", value: 5 },
  ];

  const handleWarningClose = () => {
    setShowWarning(false);
  };

  const handleWarningContinue = () => {
    setShowWarning(false);
  };

  const handleErrorClose = () => {
    setShowErrorPopup(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["font", "color", "button", "form", "tab"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header>
        <a href="#font" onClick={scrollToSection}>
          Font
        </a>
        <a href="#color" onClick={scrollToSection}>
          Color
        </a>
        <a href="#button" onClick={scrollToSection}>
          Button
        </a>
        <a href="#form" onClick={scrollToSection}>
          Form
        </a>
        <a href="#tab" onClick={scrollToSection}>
          Tab
        </a>
        <a href="#placeholders" onClick={scrollToSection}>
          Placeholders
        </a>
        <a href="#spinners" onClick={scrollToSection}>
          Spinners
        </a>
        <a href="#status" onClick={scrollToSection}>
          Status
        </a>
        <a href="#viewtype" onClick={scrollToSection}>
          View Type
        </a>
        <a href="#popup" onClick={scrollToSection}>
          Popup
        </a>
        <a href="#bottombar" onClick={scrollToSection}>
          BottomBar
        </a>
        <a href="#personas" onClick={scrollToSection}>
          Personas
        </a>
        <a href="#listgroup" onClick={scrollToSection}>
          ListGroup
        </a>
        <a href="#barChart" onClick={scrollToSection}>
          BarChart
        </a>
        <a href="#boxWrap" onClick={scrollToSection}>
          BoxWrap
        </a>
        <a href="#rangeSlider" onClick={scrollToSection}>
          RangeSlider
        </a>
        <a href="#chartComponents" onClick={scrollToSection}>
          Chart Components
        </a>
        <a href="#kanoModel" onClick={scrollToSection}>
          Kano Model
        </a>
        <a href="#needsKeyword" onClick={scrollToSection}>
          NeedsKeyword
        </a>
      </Header>

      <ChartComponentsWrap id="chartComponents">
        <h2>Chart Components</h2>
        <FlexContainer>
          <CardPersonaSelected />
          {/* <BarChartLikertScale5 />
          <ABGraph />
          <BarChartLikertScale11 />
          <GraphChartScale2 />
          <GraphChartScale5 />
          <GraphChartScale11 /> */}
          {/* <ImportanceButtonGroup />
          <ImportanceButtonLevel />
          <QuickSurveyCard />
          <KanoModelGraph />
          <QuckSurveyPopup />
          <MandalArtGraph />
          <WriteSelfCard /> */}
          <IdeaGenerationTag text="경험 기반 쇼핑 큐레이션" />
          <ParetoCurveGraph data={paretoDummyData} />
          <BusinessModelPopup isOpen={false} />
          {/* <WaitLongLodingBar />
          <BusinessModelGraph />
          <FavoritePersonaStatus />
          <MyPersonaTag />
          <NeedsKeywordSelected />
          <NeedsKeywordResult />
          <MultipleQustionSelection />
          <ParticipationTeamList />
          <ParticipationTeamList2 />
          <NoticeBoxContent />
          <ResultTable /> */}
          <BusinessModelResult />
          <AddContentWriting />
        </FlexContainer>
        <MacroSegTag />
        <StakeHolderTag />
        <OrganismProUpgradePopup open={true} />
      </ChartComponentsWrap>

      {/* Kano Model Graph Section */}
      <KanoModelWrap id="kanoModel">
        <SectionTitle>Kano Model</SectionTitle>
        <ComponentDescription>
          Kano Model은 제품 또는 서비스의 기능이 고객 만족도에 어떤 영향을 미치는지 
          시각화하는 그래프입니다. 가로축은 충족도(CSP), 세로축은 만족도(CSM)를 나타냅니다.
        </ComponentDescription>
        <KanoModelGraphWrapper>
          <KanoModelGraph />
        </KanoModelGraphWrapper>
      </KanoModelWrap>

      <ContentsWrap>
        <div id="loader">
          <AtomPersonaLoader />
        </div>

        <div id="font">
          <h2>Font</h2>
          <Note>
            한글 폰트는 'Pretendard'를 사용하며, 영문은 'Poppins'를 사용합니다.
            <br />
            별도의 지정을 하지 않아도 자동으로 적용됩니다.
          </Note>

          <FlexBox column>
            <H1>H1/Pretendard/SemiBold(600)/2rem/120%/-3%</H1>
            <H2>H2/Pretendard/SemiBold(600)/1.5rem/130%/-3%</H2>
            <H3>H3/Pretendard/Bold(700)/1.38rem/130%/-3%</H3>
            <H4>H4/Pretendard/SemiBold(600)/1.25rem/130%/-3%</H4>
            <H5>H5/Pretendard/Medium(500)/1.25rem/130%/-3%</H5>
            <H6>H6/Pretendard/Regular(400)/1.25rem/130%/-3%</H6>

            <Body1>Body1/Pretendard/Bold(700)/1rem/155%/-3%</Body1>
            <Body2_1>Body2_1/Pretendard/Medium(500)/1rem/130%/-3%</Body2_1>
            <Body2>Body2/Pretendard/Medium(500)/1rem/155%/-3%</Body2>
            <Body3>Body3/Pretendard/Regular(400)/1rem/155%/-3%</Body3>

            <Sub1>Sub1/Pretendard/SemiBold(600)/0.88rem/155%/-3%</Sub1>
            <Sub2_1>Sub2_1/Pretendard/Medium(500)/0.88rem/155%/-3%</Sub2_1>
            <Sub2>Sub2_2/Pretendard/Medium(500)/0.88rem/155%/-3%</Sub2>
            <Sub3>Sub3/Pretendard/Medium(500)/0.88rem/155%/-3%</Sub3>

            <Caption1>
              Caption1/Pretendard/Medium(500)/0.75rem/150%/-3%
            </Caption1>
            <Caption2>
              Caption2/Pretendard/Regular(400)/0.75rem/150%/-3%
            </Caption2>
            <InputText>
              InputText/Pretendard/Medium(500)/0.75rem/150%/-3%
            </InputText>
            <Helptext>
              Helptext/Pretendard/Regular(400)/0.63rem/150%/-3%
            </Helptext>
          </FlexBox>
        </div>

        <div id="color">
          <h2>Color</h2>

          <FlexBox>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.gray800,
                }}
              />
              <div>
                <Sub1>gray800</Sub1>
                <Caption1>#323232</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.gray700,
                }}
              />
              <div>
                <Sub1>gray700</Sub1>
                <Caption1>#666666</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.gray500,
                }}
              />
              <div>
                <Sub1>gray500</Sub1>
                <Caption1>#8C8C8C</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.gray300,
                }}
              />
              <div>
                <Sub1>gray300</Sub1>
                <Caption1>#CCCCCC</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.gray200,
                }}
              />
              <div>
                <Sub1>gray200</Sub1>
                <Caption1>#DDDDDD</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.gray100,
                }}
              />
              <div>
                <Sub1>gray100</Sub1>
                <Caption1>#F6F6F6</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.gray50,
                }}
              />
              <div>
                <Sub1>gray50</Sub1>
                <Caption1>#FAFAFA</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.primary,
                }}
              />
              <div>
                <Sub1>primary</Sub1>
                <Caption1>#226FFF</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.black,
                }}
              />
              <div>
                <Sub1>black</Sub1>
                <Caption1>#000000</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.white,
                }}
              />
              <div>
                <Sub1>white</Sub1>
                <Caption1>#FFFFFF</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.chatGray,
                }}
              />
              <div>
                <Sub1>chatGray</Sub1>
                <Caption1>#F7F8FA</Caption1>
              </div>
            </CardItem>
            <CardItem>
              <div
                style={{
                  width: "180px",
                  height: "100px",
                  backgroundColor: palette.outlineGray,
                }}
              />
              <div>
                <Sub1>outlineGray</Sub1>
                <Caption1>#E0E4EB</Caption1>
              </div>
            </CardItem>
          </FlexBox>
        </div>

        <div id="button">
          <h2>Button</h2>
          <Note>
            기본버튼에 필요한 요소를 추가하여 사용합니다.
            <br />
            <CodeBlock>{"<Button>바로가기</Button>"}</CodeBlock>
          </Note>

          <FlexBox column>
            <Button>바로가기</Button>
          </FlexBox>

          <Sub1>1. Type</Sub1>
          <Note>
            라운드형 버튼 : Round
            <CodeBlock>{"<Button Round>바로가기</Button>"}</CodeBlock>
          </Note>

          <FlexBox column>
            <div>
              <Sub2>기본형</Sub2>
              <Button Small>기본형 버튼</Button>
            </div>
            <div>
              <Sub2>라운드형</Sub2>
              <Button Small Round>
                라운드형 버튼
              </Button>
            </div>
          </FlexBox>

          <Sub1>2. Size</Sub1>
          <Note>
            제일 작은 사이즈 : Small
            <br />
            중간 사이즈 : Medium
            <br />
            큰 사이즈 : Large
            <br />
            좀 더 큰 사이즈 : ExLarge
            <br />
            제일 큰 사이즈 : DbExLarge
            <CodeBlock>{"<Button Medium>바로가기</Button>"}</CodeBlock>
          </Note>

          <FlexBox column>
            <div>
              <Sub2>Small</Sub2>
              <Button Small>제일 작은 사이즈 버튼</Button>
            </div>
            <div>
              <Sub2>Medium</Sub2>
              <Button Medium>중간 사이즈 버튼</Button>
            </div>
            <div>
              <Sub2>Large</Sub2>
              <Button Large>큰 사이즈 버튼</Button>
            </div>
            <div>
              <Sub2>ExLarge</Sub2>
              <Button ExLarge>좀 더 큰 사이즈 버튼</Button>
            </div>
            <div>
              <Sub2>DbExLarge</Sub2>
              <Button DbExLarge>제일 큰 사이즈 버튼</Button>
            </div>
          </FlexBox>

          <Sub1>3. Color</Sub1>
          <Note>
            기본 버튼 : Primary
            <br />
            서브 버튼 : PrimaryLightest (※ Fill 속성 필수로 입력합니다. 추후
            아웃라인 추가가능 합니다.)
            <br />
            에러 버튼 : Error
            <br />
            수정 버튼 : Edit
            <CodeBlock>{"<Button Primary>바로가기</Button>"}</CodeBlock>
          </Note>

          <FlexBox column>
            <div>
              <Sub2>기본 버튼</Sub2>
              <Button Small Primary>
                기본 버튼
              </Button>
            </div>
            <div>
              <Sub2>서브 버튼</Sub2>
              <Button Small PrimaryLightest Fill>
                서브 버튼
              </Button>
            </div>
            <div>
              <Sub2>에러 버튼</Sub2>
              <Button Small Error>
                에러 버튼
              </Button>
            </div>
            <div>
              <Sub2>수정 버튼</Sub2>
              <Button Small Edit>
                수정 버튼
              </Button>
            </div>
          </FlexBox>

          <Sub1>4. Fill</Sub1>
          <Note>
            채움버튼을 사용시, Primary 속성을 적용해야 합니다.
            <br />
            채움 버튼 : Fill, PrimaryLightest
            <CodeBlock>
              {`<Button Small Primary Fill>바로가기</Button>
<Button Small PrimaryLightest Fill>채움 버튼</Button>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Button Small Primary Fill>
              채움 버튼
            </Button>
            <Button Small PrimaryLightest Fill>
              채움 버튼
            </Button>
          </FlexBox>

          <Sub1>5. Disabled</Sub1>
          <Note>
            <CodeBlock>
              {`<Button disabled>바로가기</Button>
<Button Round disabled>바로가기</Button>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Button Small disabled>
              Disabled 버튼
            </Button>
            <Button Small Round disabled>
              Disabled 버튼
            </Button>
          </FlexBox>

          <Sub1>6. Icon Type</Sub1>
          <Note>
            아이콘을 삽입할 경우, 아이콘 위치를 지정해야 합니다.
            <br />
            <CodeBlock>
              {'<Button>바로가기<img src="이미지" alt="" /></Button>'}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Button Small Primary>
              바로가기
              <img src={images.ChevronRightPrimary} alt="" />
            </Button>
            <Button Small Primary>
              <img src={images.PeopleFillPrimary} alt="" />
              바로가기
            </Button>
          </FlexBox>

          <Sub1>7. Icon Type 2</Sub1>
          <Note>
            아이콘을 삽입할 경우, 아이콘 위치를 지정해야 합니다.
            <br />
            필요에 따라, 박스가 필요할 경우 6번 참고
            <strong>
              <br />
              아이콘 명
            </strong>
            저장하기 : FolderArrowDown
            <br />
            재생성하기 : IconRepeatSquare
            <br />
            수정하기 : PencilSquare
            <br />
            이전으로 되돌리기 : ClockCounterclockwise
            <br />
            AI로 다듬기 : MagicStick
            <br />
            인터뷰 스크립트 보기 : ReportSearch
            <br />
            결과리포트 리스트 : BoxArrowUpRight
            <br />
            구독 플랜 관리 : CalendarCheck
            <br />
            고객 서비스 : Headset
            <CodeBlock>
              {'<IconButton>바로가기<img src="이미지" alt="" /></IconButton>'}
            </CodeBlock>
          </Note>

          <FlexBox>
            <IconButton>
              <img src={images.FolderArrowDown} alt="저장하기" />
              <span>저장하기</span>
            </IconButton>
            <IconButton>
              <img src={images.IconRepeatSquare} alt="재생성하기" />
              <span>재생성하기</span>
            </IconButton>
            <IconButton>
              <img src={images.PencilSquare} alt="수정하기" />
              <span>수정하기</span>
            </IconButton>
            <IconButton>
              <img src={images.ClockCounterclockwise} alt="이전으로 되돌리기" />
              <span>이전으로 되돌리기</span>
            </IconButton>
            <IconButton>
              <img src={images.MagicStick} alt="AI로 다듬기" />
              <span>AI로 다듬기</span>
            </IconButton>
            <IconButton>
              <img src={images.ReportSearch} alt="인터뷰 스크립트 보기" />
              <span>인터뷰 스크립트 보기</span>
            </IconButton>
            <IconButton>
              <span>결과리포트 리스트</span>
              <img src={images.BoxArrowUpRight} alt="결과리포트 리스트" />
            </IconButton>
            <IconButton>
              <img src={images.CalendarCheck} alt="구독 플랜 관리" />
              <span>구독 플랜 관리</span>
            </IconButton>
            <IconButton>
              <img src={images.Headset} alt="고객 서비스" />
              <span>고객 서비스</span>
            </IconButton>
          </FlexBox>
        </div>

        <div id="form">
          <h2>Form</h2>

          <Sub1>1. Input Text</Sub1>
          <Note>
            input의 타입을 지정해야 합니다.
            <CodeBlock>
              {`<CustomInput type="text" placeholder="input text" />
<CustomInput type="text" placeholder="disabled" disabled />
<CustomInput type="text" placeholder="error" status="error" />`}
            </CodeBlock>
          </Note>

          <FlexBox column>
            <CustomInput type="text" placeholder="input text" />
            <CustomInput type="text" placeholder="disabled" disabled />
            <CustomInput type="text" placeholder="error" status="error" />
            <ErrorMessage>에러 메시지</ErrorMessage>
          </FlexBox>

          <Sub1>1-1. Type</Sub1>
          <Note>
            border가 없을 경우 아래와 같이 사용합니다.
            <CodeBlock>
              {`<FormBox>
  <CustomInput Edit type="text" placeholder="input text" onChange="" status="valid" />
</FormBox>`}
            </CodeBlock>
            disabled 상태일 경우, disabled를 적용해야 합니다.
            <CodeBlock>
              {`<FormBox disabled>
  <CustomInput Edit type="text" placeholder="disabled" onChange="" disabled />
</FormBox>`}
            </CodeBlock>
            에러의 경우, status="error"를 적용해야 합니다.
            <CodeBlock>
              {`<FormBox status="error">
  <CustomInput Edit type="text" placeholder="error input" onChange="" status="error" />
</FormBox>
<ErrorMessage>에러 메시지</ErrorMessage>`}
            </CodeBlock>
          </Note>

          <FlexBox column>
            <FormBox>
              <CustomInput
                Edit
                type="text"
                placeholder="input text"
                onChange=""
                status="valid"
              />
            </FormBox>

            <FormBox disabled>
              <CustomInput
                Edit
                type="text"
                placeholder="disabled"
                onChange=""
                disabled
              />
            </FormBox>

            <FormBox status="error">
              <CustomInput
                Edit
                type="text"
                placeholder="error input"
                onChange=""
                status="error"
              />
            </FormBox>
            <ErrorMessage>에러 메시지</ErrorMessage>
          </FlexBox>

          <Sub1>2. Textarea</Sub1>
          <Note>
            <CodeBlock>
              {`<CustomTextarea placeholder="textarea" onChange="" />
<CustomTextarea placeholder="textarea disabled" onChange="" disabled />
<CustomTextarea placeholder="textarea error" onChange="" status="error" />`}
            </CodeBlock>
            에러의 경우, status="error"를 적용해야 합니다.
          </Note>

          <FlexBox column>
            <CustomTextarea placeholder="textarea" onChange="" />
            <CustomTextarea
              placeholder="textarea disabled"
              onChange=""
              disabled
            />
            <CustomTextarea
              placeholder="textarea error"
              onChange=""
              status="error"
            />
            <ErrorMessage>에러 메시지</ErrorMessage>
          </FlexBox>

          <Sub1>2-1. Type</Sub1>
          <Note>
            border가 없을 경우 아래와 같이 사용합니다.
            <CodeBlock>
              {`<FormBox>
  <CustomTextarea Edit placeholder="textarea" onChange="" status="valid" />
</FormBox>`}
            </CodeBlock>
            에러의 경우, status="error"를 적용해야 합니다.
            <CodeBlock>
              {`<FormBox status="error">
  <CustomTextarea Edit placeholder="textarea error" onChange="" status="error" />
</FormBox>
<ErrorMessage>에러 메시지</ErrorMessage>`}
            </CodeBlock>
          </Note>

          <FlexBox column>
            <FormBox>
              <CustomTextarea
                Edit
                placeholder="textarea"
                onChange=""
                status="valid"
              />
            </FormBox>

            <FormBox disabled>
              <CustomTextarea
                Edit
                placeholder="textarea"
                onChange=""
                disabled
              />
            </FormBox>

            <FormBox status="error">
              <CustomTextarea
                Edit
                placeholder="textarea error"
                onChange=""
                status="error"
              />
            </FormBox>
            <ErrorMessage>에러 메시지</ErrorMessage>
          </FlexBox>

          <Sub1>2-2. Height</Sub1>
          <Note>
            height를 지정할 경우, rows를 지정해야 합니다.
            <CodeBlock>
              {`<CustomTextarea rows={10} placeholder="textarea" value="" onChange="" />`}
            </CodeBlock>
          </Note>

          <FlexBox column>
            <CustomTextarea
              rows={10}
              placeholder="textarea"
              value=""
              onChange=""
            />
          </FlexBox>

          <Sub1>3. Checkbox</Sub1>
          <Note>
            <CodeBlock>
              {`<CheckBox>
  <input type="checkbox" id="chk1" />
  <label for="chk1">체크박스</label>
</CheckBox>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <CheckBox>
              <input type="checkbox" id="chk1" />
              <label for="chk1">체크박스</label>
            </CheckBox>
            <CheckBox>
              <input type="checkbox" id="chk2" checked />
              <label for="chk2">체크박스</label>
            </CheckBox>
            <CheckBox>
              <input type="checkbox" id="chk3" disabled />
              <label for="chk3">체크박스</label>
            </CheckBox>
          </FlexBox>

          <Sub1>4. Radiobox</Sub1>
          <Note>
            label이 필요없을시 삭제 가능합니다.
            <CodeBlock>
              {`<RadioButton id="radio1" name="radioGroup" checked={selectedRadio === 'radio1'} onChange={() => setSelectedRadio('radio1')} />
<label htmlFor="radio1">라디오 버튼 1</label>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <div>
              <RadioButton
                id="radio1"
                name="radioGroup"
                checked={selectedRadio === "radio1"}
                onChange={() => setSelectedRadio("radio1")}
              />
              <label htmlFor="radio1">라디오 버튼 1</label>
            </div>
            <div>
              <RadioButton
                id="radio2"
                name="radioGroup"
                checked={selectedRadio === "radio2"}
                onChange={() => setSelectedRadio("radio2")}
              />
              <label htmlFor="radio2">라디오 버튼 2</label>
            </div>
            <div>
              <RadioButton
                id="radio3"
                name="radioGroup"
                checked={selectedRadio === "radio3"}
                onChange={() => setSelectedRadio("radio3")}
                disabled
              />
              <label htmlFor="radio3">라디오 버튼 3</label>
            </div>
          </FlexBox>

          <FlexBox>
            <div>
              <RadioButton
                id="radio1"
                name="radioGroup1"
                checked={selectedRadio1 === "radio1"}
                onChange={() => setSelectedRadio1("radio1")}
              />
            </div>
            <div>
              <RadioButton
                id="radio2"
                name="radioGroup1"
                checked={selectedRadio1 === "radio2"}
                onChange={() => setSelectedRadio1("radio2")}
              />
            </div>
            <div>
              <RadioButton
                id="radio3"
                name="radioGroup1"
                checked={selectedRadio1 === "radio3"}
                onChange={() => setSelectedRadio1("radio3")}
                disabled
              />
            </div>
          </FlexBox>

          <Sub1>4-1. Type</Sub1>
          <Note>
            가로의 길이를 조절하려면 라디오박스 상위에 지정해야합니다.
            <br />
            아이콘을 삭제 가능합니다.
            <CodeBlock>
              {`<GenderRadioButton
id="gender1"
name="gender"
gender="men"
icon={images.GenderMen}
checked={selectedRadio2 === "gender1"}
onChange={() => setSelectedRadio2('gender1')}
/>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <GenderRadioButton
              id="gender1"
              name="gender"
              gender="men"
              icon={images.GenderMen}
              checked={selectedRadio2 === "gender1"}
              onChange={() => setSelectedRadio2("gender1")}
            />
            <GenderRadioButton
              id="gender2"
              name="gender"
              gender="women"
              icon={images.GenderWomen}
              checked={selectedRadio2 === "gender2"}
              onChange={() => setSelectedRadio2("gender2")}
            />
            <GenderRadioButton
              id="gender1"
              name="gender"
              gender="men"
              checked={selectedRadio2 === "gender1"}
              onChange={() => setSelectedRadio2("gender1")}
              disabled
            />
            <GenderRadioButton
              id="gender2"
              name="gender"
              gender="women"
              checked={selectedRadio2 === "gender2"}
              onChange={() => setSelectedRadio2("gender2")}
              disabled
            />
          </FlexBox>
        </div>

        <div id="tab">
          <h2>Tab</h2>
          <Note>
            탭의 갯수 만큼 버튼을 생성해야 합니다.
            <CodeBlock>
              {`<TabWrap>
  <TabButton isActive={activeTab === 'tab1'} onClick={() => setActiveTab('tab1')}>
    TAB01
  </TabButton>
  <TabButton isActive={activeTab === 'tab2'} onClick={() => setActiveTab('tab2')}>
    TAB02
  </TabButton>
  <TabButton isActive={activeTab === 'tab3'} onClick={() => setActiveTab('tab3')}>
    TAB03
  </TabButton>
</TabWrap>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <TabWrap>
              <TabButton
                isActive={activeTab === "tab1"}
                onClick={() => setActiveTab("tab1")}
              >
                TAB01
              </TabButton>
              <TabButton
                isActive={activeTab === "tab2"}
                onClick={() => setActiveTab("tab2")}
              >
                TAB02
              </TabButton>
              <TabButton
                isActive={activeTab === "tab3"}
                onClick={() => setActiveTab("tab3")}
              >
                TAB03
              </TabButton>
            </TabWrap>
          </FlexBox>

          <Sub1>1. Type</Sub1>
          <Note>
            <CodeBlock>
              {`<TabWrapType2>
  <TabButtonType2 isActive={activeTab1 === 'tab1'} onClick={() => setActiveTab1('tab1')}>TAB01</TabButtonType2>
  <TabButtonType2 isActive={activeTab1 === 'tab2'} onClick={() => setActiveTab1('tab2')}>TAB02</TabButtonType2>
  <TabButtonType2 isActive={activeTab1 === 'tab3'} onClick={() => setActiveTab1('tab3')}>TAB03</TabButtonType2>
</TabWrapType2>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <TabWrapType2>
              <TabButtonType2
                isActive={activeTab1 === "tab1"}
                onClick={() => setActiveTab1("tab1")}
              >
                TAB01
              </TabButtonType2>
              <TabButtonType2
                isActive={activeTab1 === "tab2"}
                onClick={() => setActiveTab1("tab2")}
              >
                TAB02
              </TabButtonType2>
              <TabButtonType2
                isActive={activeTab1 === "tab3"}
                onClick={() => setActiveTab1("tab3")}
              >
                TAB03
              </TabButtonType2>
            </TabWrapType2>
          </FlexBox>

          <Note>
            <CodeBlock>
              {`<TabWrapType3>
  <TabButtonType3 isActive={activeTab2 === 'tab1'} onClick={() => setActiveTab2('tab1')}>TAB01 (10)</TabButtonType3>
  <TabButtonType3 isActive={activeTab2 === 'tab2'} onClick={() => setActiveTab2('tab2')}>TAB02 (20)</TabButtonType3>
  <TabButtonType3 isActive={activeTab2 === 'tab3'} onClick={() => setActiveTab2('tab3')}>TAB03 (30)</TabButtonType3>
</TabWrapType3>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <TabWrapType3>
              <TabButtonType3
                isActive={activeTab2 === "tab1"}
                onClick={() => setActiveTab2("tab1")}
              >
                TAB01 (10)
              </TabButtonType3>
              <TabButtonType3
                isActive={activeTab2 === "tab2"}
                onClick={() => setActiveTab2("tab2")}
              >
                TAB02 (20)
              </TabButtonType3>
              <TabButtonType3
                isActive={activeTab2 === "tab3"}
                onClick={() => setActiveTab2("tab3")}
              >
                TAB03 (30)
              </TabButtonType3>
            </TabWrapType3>
          </FlexBox>
        </div>

        <div id="placeholders">
          <h2>Placeholders</h2>

          <Note>
            굵기, 사이즈에 따라 달리 사용합니다.
            <CodeBlock>
              {`<SkeletonH1 />
<SkeletonTitle />
<SkeletonLine />`}
            </CodeBlock>
          </Note>
          <FlexBox>
            <div className="loading-wrap">
              <SkeletonH1 />
              <SkeletonTitle />
              <SkeletonLine />
            </div>
          </FlexBox>
        </div>

        <div id="spinners">
          <h2>Spinners</h2>

          <Note>
            원형 로더입니다.
            <br />
            메시지를 추가할 수 있습니다.
            <br />
            기본 메시지는 "비즈니스를 분석하고 있어요..." 입니다.
            <br />
            메시지 삭제를 원할 시, message="" 로 사용합니다.
            <CodeBlock>
              {`<AtomPersonaLoader />
<AtomPersonaLoader message="" />
<AtomPersonaLoader message="분석하고 있어요..." />`}
            </CodeBlock>
          </Note>
          <FlexBox>
            <AtomPersonaLoader />
            <AtomPersonaLoader message="" />
            <AtomPersonaLoader message="분석하고 있어요..." />
          </FlexBox>
        </div>

        <div id="status">
          <h2>Status</h2>

          <Sub1>1. 준비중, 진행중, 완료</Sub1>
          <Note>
            <CodeBlock>
              {`<Status status="Pre" />
<Status status="Ing" />
<Status status="Complete" />`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Status status="Pre" />
            <Status status="Ing" />
            <Status status="Complete" />
          </FlexBox>

          <Sub1>2. Badge</Sub1>
          <Note>
            아이콘은 삭제 가능합니다.
            <CodeBlock>
              {`<Badge Basic>
  <img src={images.StatusBadgeBasic} alt="기본형" />
  기본형
</Badge>

<Badge Custom>
  <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
  커스터마이즈
</Badge>

<Badge Request>
  <img src={images.NoteArrowUp} alt="요청필요" />
  요청 필요
</Badge>

<Badge Keyword>
  #키워드
</Badge>

<Badge Request>
<img src={images.Plus} alt="모집 요청" />
모집 요청
</Badge>

<Badge Ing>
모집 중
</Badge>

<Badge Complete>
<img src={images.CheckGreen} alt="모집 완료" />
모집 완료
</Badge>
`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Badge Basic>
              <img src={images.StatusBadgeBasic} alt="기본형" />
              기본형
            </Badge>

            <Badge Custom>
              <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
              커스터마이즈
            </Badge>

            <Badge Keyword>#키워드</Badge>

            <Badge Request>
              <img src={images.Plus} alt="모집 요청" />
              모집 요청
            </Badge>

            <Badge Ing>모집 중</Badge>

            <Badge Complete>
              <img src={images.CheckGreen} alt="모집 완료" />
              모집 완료
            </Badge>
          </FlexBox>

          <Sub1>3. Tag</Sub1>
          <Note>
            태그는 각각의 컬러로 사용합니다.
            <br />
            Red, LavenderMagenta, Amethyst, VistaBlue, BlueYonder, MidnightBlue,
            ButtonBlue, CeruleanFrost, MiddleBlueGreen, GreenSheen,
            TropicalRainForest, DollarBill, Olivine, ChineseGreen, Jonquil,
            PastelOrange, Tangerine, Copper, Shadow, Tuscany, VeryLightTangelo,
            Orange, CarnationPink
            <CodeBlock>{`<Tag color="Red" />`}</CodeBlock>
          </Note>

          <FlexBox>
            <Tag color="Red" />
            <Tag color="LavenderMagenta" />
            <Tag color="Amethyst" />
            <Tag color="VistaBlue" />
            <Tag color="BlueYonder" />
            <Tag color="MidnightBlue" />
            <Tag color="ButtonBlue" />
            <Tag color="CeruleanFrost" />
            <Tag color="MiddleBlueGreen" />
            <Tag color="GreenSheen" />
            <Tag color="TropicalRainForest" />
            <Tag color="DollarBill" />
            <Tag color="Olivine" />
            <Tag color="ChineseGreen" />
            <Tag color="Jonquil" />
            <Tag color="PastelOrange" />
            <Tag color="Tangerine" />
            <Tag color="Copper" />
            <Tag color="Shadow" />
            <Tag color="Tuscany" />
            <Tag color="VeryLightTangelo" />
            <Tag color="Orange" />
            <Tag color="CarnationPink" />
          </FlexBox>

          <Sub1>4. Category</Sub1>

          <FlexBox>
            <ChoiceWrap>
              <Choice>대표 사용자</Choice>
            </ChoiceWrap>
          </FlexBox>
        </div>

        <div id="viewtype">
          <h2>View Type</h2>
          <Note>
            리스트형, 카드형으로 구분합니다.
            <br />
            active 속성을 추가하면 활성화 됩니다.
            <CodeBlock>
              {`<ViewType>
  <TypeButton List active>리스트</TypeButton>
  <TypeButton Card>카드</TypeButton>
</ViewType>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <ViewType>
              <TypeButton List active>
                리스트
              </TypeButton>
              <TypeButton Card>카드</TypeButton>
            </ViewType>
          </FlexBox>
        </div>

        <div id="popup">
          <h2>Popup</h2>

          <Note>
            팝업은 모달 형태로 사용합니다.
            <br />
            - Warning, Check, Info, Error로 이미지를 사용합니다. (이미지 삭제
            가능)
            <br />
            - title는, 굵게 표시합니다.
            <br />
            - message는, 서브 메시지 입니다.
            <br />
            - buttonType은, Outline, Fill 중 하나를 사용합니다.
            <br />
            - closeText, confirmText는, 버튼 텍스트 입니다.
            <br />- isModal은, 모달 형태로 사용합니다.
            <CodeBlock>
              {`<PopupWrap
  Warning
  title="정말 삭제하시겠습니까?"
  message="삭제된 프로젝트는 복구 할 수 없습니다. "
  buttonType="Outline"
  closeText="취소"
  confirmText="확인"
  isModal={false}
  onCancel={handleWarningClose}
  onConfirm={handleWarningContinue}
/>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Button Small Primary Fill onClick={() => setShowPopup(true)}>
              Popup Button
            </Button>
            {showPopup && (
              <PopupWrap
                Warning
                title="정말 삭제하시겠습니까?"
                message="삭제된 프로젝트는 복구 할 수 없습니다. "
                buttonType="Outline"
                closeText="취소"
                confirmText="확인"
                isModal={false}
                onCancel={handleWarningClose}
                onConfirm={handleWarningContinue}
              />
            )}
          </FlexBox>
        </div>

        <div id="bottombar">
          <h2>Bottom Bar</h2>

          <Note>
            플러팅 바 입니다.
            <br />
            최소 가로사이즈는 608px 입니다.
            <br />
            바의 기본 백그라운드 컬러는 흰색입니다. (Black 속성을 추가하면
            검은색으로 변경됩니다.)
            <br />
            바의 라운드 속성은 10px 입니다. (Round 속성을 추가하면 50px로
            변경됩니다.)
            <CodeBlock>
              {`<BottomBar>
  <p>BottomBar</p>
  <Button Medium Primary Fill>Button</Button>
</BottomBar>`}
            </CodeBlock>
          </Note>

          <FlexBox column>
            <BottomBarWrap>
              <p>BottomBar</p>
              <Button Medium Primary Fill>
                Button
              </Button>
            </BottomBarWrap>

            <BottomBarWrap Round>
              <p>BottomBar</p>
              <Button Medium Primary Fill>
                Button
              </Button>
            </BottomBarWrap>

            <BottomBarWrap W100>
              <p>BottomBar</p>
              <Button Medium Primary Fill>
                Button
              </Button>
            </BottomBarWrap>

            <BottomBarWrap Black>
              <p>BottomBar</p>
              <Button Medium Primary Fill>
                Button
              </Button>
            </BottomBarWrap>

            <BottomBarWrap Black Round>
              <p>BottomBar</p>
              <Button Medium Primary Fill>
                Button
              </Button>
            </BottomBarWrap>

            <BottomBarWrap Black W100>
              <p>BottomBar</p>
              <Button Medium Primary Fill>
                Button
              </Button>
            </BottomBarWrap>
          </FlexBox>
        </div>

        <div id="personas">
          <h2>Personas</h2>

          <Sub1>1. 사이즈</Sub1>
          <Note>
            사이즈는 작은 사이즈, 중간 사이즈, 큰 사이즈로 구분합니다.
            <br />
            size 속성은 Small, Medium, Large 중 하나를 사용합니다.
            <CodeBlock>
              {`<Persona color="PastelBlue" size="Small">
  <img src={personaImages.PersonaWomen01} alt="페르소나" />
</Persona>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Persona color="PastelBlue" size="Small">
              <img src={personaImages.PersonaWomen01} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Medium">
              <img src={personaImages.PersonaWomen01} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large">
              <img src={personaImages.PersonaWomen01} alt="페르소나" />
            </Persona>
          </FlexBox>

          <Sub1>2. 컬러</Sub1>
          <Note>
            컬러는 피그마를 참고합니다.
            <CodeBlock>
              {`<Persona color="Linen3" size="Large">
  <img src={personaImages.PersonaWomen01} alt="페르소나" />
</Persona>`}
            </CodeBlock>
          </Note>
          <FlexBox>
            <Persona color="Linen3" size="Large">
              <img src={personaImages.PersonaWomen01} alt="페르소나" />
            </Persona>
            <Persona color="Alabaster" size="Large">
              <img src={personaImages.PersonaWomen01} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large">
              <img src={personaImages.PersonaWomen01} alt="페르소나" />
            </Persona>
          </FlexBox>

          <Sub1>3. 이미지</Sub1>
          <Note>
            여성의 경우, PersonaWomen01 ~ PersonaWomen33 사용합니다.
            <br />
            남성의 경우, PersonaMen25 ~ PersonaMen27 사용합니다.
            <CodeBlock>
              {`<Persona color="Linen" size="Large">
  <img src={personaImages.PersonaWomen01} alt="페르소나" />
</Persona>`}
            </CodeBlock>
          </Note>
          <FlexBox>
            <Persona color="Linen" size="Large">
              <img src={personaImages.PersonaWomen02} alt="페르소나" />
            </Persona>
            <Persona color="Linen" size="Large">
              <img src={personaImages.PersonaMen02} alt="페르소나" />
            </Persona>
          </FlexBox>

          <Sub1>4. 라운드</Sub1>
          <Note>
            라운드는 라운드 속성을 추가하면 됩니다.
            <CodeBlock>
              {`<Persona color="Linen" size="Large" Round>
  <img src={personaImages.PersonaWomen01} alt="페르소나" />
</Persona>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <Persona color="Linen" size="Large" Round>
              <img src={personaImages.PersonaWomen01} alt="페르소나" />
            </Persona>
          </FlexBox>

          <Sub2>5. 아이콘</Sub2>
          <FlexBox>
            <Persona color="PastelBlue" size="Large" icon="OrangeLine" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="BlackLine" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="BlueLine" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
          </FlexBox>

          <FlexBox>
            <Persona
              color="PastelBlue"
              size="Large"
              icon="OrangeBottomLikeFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona
              color="PastelBlue"
              size="Large"
              icon="OrangeBottomLike"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlackBottomLikeFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlackBottomLike"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlueBottomLikeFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlueBottomLike"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
          </FlexBox>

          <FlexBox>
            <Persona
              color="PastelBlue"
              size="Large"
              icon="OrangeTopCrownFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona
              color="PastelBlue"
              size="Large"
              icon="OrangeTopCrown"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlackTopCrownFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="BlackTopCrown" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlueTopCrownFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="BlueTopCrown" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
          </FlexBox>

          <FlexBox>
            <Persona
              color="PastelBlue"
              size="Large"
              icon="OrangeTopStarFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="OrangeTopStar" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlackTopStarFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="BlackTopStar" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona
              color="PastelBlue"
              size="Large"
              icon="BlueTopStarFill"
              Round
            >
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="BlueTopStar" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
          </FlexBox>

          <br />

          <FlexBox>
            <Persona color="PastelBlue" size="Large" icon="BgStar" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona color="PastelBlue" size="Large" icon="LineCrown" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>

            <Persona color="PastelBlue" size="Large" icon="StarFill" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
            <Persona color="PastelBlue" size="Large" icon="StarFill3D" Round>
              <img src={personaImages.PersonaWomen24} alt="페르소나" />
            </Persona>
          </FlexBox>

          <Sub1>6. 그룹</Sub1>
          <Note>
            페르소나는 역순으로 추가됩니다.
            <CodeBlock>
              {`<PersonaGroup>
  <span>+2</span>
  <Persona color="Linen" size="Small" Round>
    <img src={personaImages.PersonaWomen01} alt="페르소나" />
  </Persona>
  <Persona color="PastelPink" size="Small" Round>
    <img src={personaImages.PersonaWomen02} alt="페르소나" />
  </Persona>
  <Persona color="Crayola" size="Small" Round>
    <img src={personaImages.PersonaWomen03} alt="페르소나" />
  </Persona>
</PersonaGroup>`}
            </CodeBlock>
          </Note>
          <FlexBox>
            <PersonaGroup>
              <span>+2</span>
              <Persona color="Linen" size="Small" Round>
                <img src={personaImages.PersonaWomen01} alt="페르소나" />
              </Persona>
              <Persona color="PastelPink" size="Small" Round>
                <img src={personaImages.PersonaWomen02} alt="페르소나" />
              </Persona>
              <Persona color="Crayola" size="Small" Round>
                <img src={personaImages.PersonaWomen03} alt="페르소나" />
              </Persona>
            </PersonaGroup>
          </FlexBox>
        </div>

        <div id="listgroup">
          <h2>List Group</h2>
          <Note>불필요한 컴포넌트는 삭제가 가능합니다.</Note>

          <Sub1>1. 리스트 형</Sub1>
          <Note>
            <CodeBlock>
              {`<CardGroupWrap column>
  <ListBoxItem>
    <ListText>
      <ListTitle>
        가족과 함께 여가를 보내는 활동 지향형 소비자
        <Badge Custom>
          <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
          커스터마이즈
        </Badge>
      </ListTitle>
      <ListSubtitle>
        <Badge Keyword>#키워드1</Badge>
        <Badge Keyword>#키워드2</Badge>
        <Badge Keyword>#키워드3</Badge>
      </ListSubtitle>
    </ListText>

    <ListButton>
      <Button Medium Primary>버튼</Button>
      <Button Medium Primary Fill>버튼</Button>
    </ListButton>
  </ListBoxItem>
</CardGroupWrap>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <CardGroupWrap column>
              <ListBoxItem>
                <ListText>
                  <ListTitle>
                    가족과 함께 여가를 보내는 활동 지향형 소비자
                    <Badge Custom>
                      <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
                      커스터마이즈
                    </Badge>
                  </ListTitle>
                  <ListSubtitle>
                    <Badge Keyword>#키워드1</Badge>
                    <Badge Keyword>#키워드2</Badge>
                    <Badge Keyword>#키워드3</Badge>
                  </ListSubtitle>
                </ListText>

                <ListButton>
                  <Button Medium Primary>
                    버튼
                  </Button>
                  <Button Medium Primary Fill>
                    버튼
                  </Button>
                </ListButton>
              </ListBoxItem>
            </CardGroupWrap>
          </FlexBox>

          <Sub1>2. 카드 형</Sub1>
          <Note>
            <CodeBlock>
              {`<CardGroupWrap>
  <CardListItem>
    <CardText>
      <CardTitle>
        <Badge Custom>
          <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
          커스터마이즈
        </Badge>
        가족과 함께 여가를 보내는 활동 지향형 소비자
      </CardTitle>
      <ListSubtitle>
        <Badge Keyword>#키워드1</Badge>
        <Badge Keyword>#키워드2</Badge>
        <Badge Keyword>#키워드3</Badge>
      </ListSubtitle>
      <ListSubtitle>
        <p>김지영은 아침마다 피트니스 센터에서 운동을 하고, 건강한 아침 식사로 하루를 시작하는 활동적인 생활을 즐깁니다. 직장에서 효율적으로 업무를 처리하며 최신 마케팅 트렌드를 주시합니다.<br />주말에는 친구들과 브런치를 즐기거나 패션 아이템을 쇼핑하며 사교적인 시간을 보냅니다. 또한, 새로운 장소를 탐험하는 것을 좋아해 국내외 여행을 자주 다닙니다. 자기계발에도 관심이 많아 꾸준히 독서와 온라인 강의를 통해 지식을 넓혀갑니다.</p>
      </ListSubtitle>
    </CardText>

    <CardButton>
      <Button Medium Primary>버튼</Button>
      <Button Medium Primary Fill>버튼</Button>
    </CardButton>
  </CardListItem>
</CardGroupWrap>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <CardGroupWrap>
              <CardListItem>
                <CardText>
                  <CardTitle>
                    <Badge Custom>
                      <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
                      커스터마이즈
                    </Badge>
                    가족과 함께 여가를 보내는 활동 지향형 소비자
                  </CardTitle>
                  <ListSubtitle>
                    <Badge None>#키워드1</Badge>
                    <Badge None>#키워드2</Badge>
                    <Badge None>#키워드3</Badge>
                  </ListSubtitle>
                  <ListSubtitle>
                    <p>
                      김지영은 아침마다 피트니스 센터에서 운동을 하고, 건강한
                      아침 식사로 하루를 시작하는 활동적인 생활을 즐깁니다.
                      직장에서 효율적으로 업무를 처리하며 최신 마케팅 트렌드를
                      주시합니다.
                      <br />
                      주말에는 친구들과 브런치를 즐기거나 패션 아이템을 쇼핑하며
                      사교적인 시간을 보냅니다. 또한, 새로운 장소를 탐험하는
                      것을 좋아해 국내외 여행을 자주 다닙니다. 자기계발에도
                      관심이 많아 꾸준히 독서와 온라인 강의를 통해 지식을
                      넓혀갑니다.
                    </p>
                  </ListSubtitle>
                </CardText>

                <CardButton>
                  <Button Medium Primary>
                    버튼
                  </Button>
                  <Button Medium Primary Fill>
                    버튼
                  </Button>
                </CardButton>
              </CardListItem>
              <CardListItem>
                <CardText>
                  <CardTitle>
                    <Badge Custom>
                      <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
                      커스터마이즈
                    </Badge>
                    가족과 함께 여가를 보내는 활동 지향형 소비자
                  </CardTitle>
                  <ListSubtitle>
                    <Badge None>#키워드1</Badge>
                    <Badge None>#키워드2</Badge>
                    <Badge None>#키워드3</Badge>
                  </ListSubtitle>
                  <ListSubtitle>
                    <p>
                      김지영은 아침마다 피트니스 센터에서 운동을 하고, 건강한
                      아침 식사로 하루를 시작하는 활동적인 생활을 즐깁니다.
                      직장에서 효율적으로 업무를 처리하며 최신 마케팅 트렌드를
                      주시합니다.
                      <br />
                      주말에는 친구들과 브런치를 즐기거나 패션 아이템을 쇼핑하며
                      사교적인 시간을 보냅니다. 또한, 새로운 장소를 탐험하는
                      것을 좋아해 국내외 여행을 자주 다닙니다. 자기계발에도
                      관심이 많아 꾸준히 독서와 온라인 강의를 통해 지식을
                      넓혀갑니다.
                    </p>
                  </ListSubtitle>
                </CardText>

                <CardButton>
                  <Button Medium Primary Fill>
                    버튼
                  </Button>
                </CardButton>
              </CardListItem>
              <CardListItem>
                <CardText>
                  <CardTitle>
                    <Badge Custom>
                      <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
                      커스터마이즈
                    </Badge>
                    가족과 함께 여가를 보내는 활동 지향형 소비자
                  </CardTitle>
                  <ListSubtitle>
                    <Badge None>#키워드1</Badge>
                    <Badge None>#키워드2</Badge>
                    <Badge None>#키워드3</Badge>
                  </ListSubtitle>
                  <ListSubtitle>
                    <p>
                      김지영은 아침마다 피트니스 센터에서 운동을 하고, 건강한
                      아침 식사로 하루를 시작하는 활동적인 생활을 즐깁니다.
                      직장에서 효율적으로 업무를 처리하며 최신 마케팅 트렌드를
                      주시합니다.
                      <br />
                      주말에는 친구들과 브런치를 즐기거나 패션 아이템을 쇼핑하며
                      사교적인 시간을 보냅니다. 또한, 새로운 장소를 탐험하는
                      것을 좋아해 국내외 여행을 자주 다닙니다. 자기계발에도
                      관심이 많아 꾸준히 독서와 온라인 강의를 통해 지식을
                      넓혀갑니다.
                    </p>
                  </ListSubtitle>
                </CardText>

                <CardButton>
                  <Button Medium Primary>
                    버튼
                  </Button>
                  <Button Medium Primary Fill>
                    버튼
                  </Button>
                </CardButton>
              </CardListItem>
            </CardGroupWrap>
          </FlexBox>
        </div>

        <div id="barChart">
          <h2>Bar Chart</h2>

          <FlexBox>
            <BarChart />
          </FlexBox>
        </div>

        <div id="boxWrap">
          <h2>Background Box</h2>
          <Note>
            안에 내용은 별도로 작성해주세요.
            <br />
            필요에 따라 이미지를 추가, 삭제 가능합니다.
            <CodeBlock>
              {`<BoxWrap>
  <img src={images.BgUserChatDots} alt="" />
  <div>
    <Body1>타이틀</Body1>
    <Body3 color="gray700">내용</Body3>
  </div>
</BoxWrap>`}
            </CodeBlock>
          </Note>

          <FlexBox column>
            <BoxWrap>
              <div>
                <Body1>타이틀</Body1>
                <Body3 color="gray700">내용</Body3>
              </div>
            </BoxWrap>

            <BoxWrap>
              <img src={images.BgUserChatDots} alt="" />
              <div>
                <Body1>타이틀</Body1>
                <Body3 color="gray700">내용</Body3>
              </div>
            </BoxWrap>
          </FlexBox>
        </div>

        <div id="rangeSlider">
          <h2>RangeSlider</h2>
          <Note>
            범위 컨트롤 컴포넌트입니다.
            <br />
            Body3 대신 다른 컴포넌트를 사용할 수 있습니다.
            <CodeBlock>
              {`<OCEANRangeWrap>
  <div>
    <Body3 color="gray800">보수적</Body3>
    <RangeSlider 
      type="range"
      min="0"
      max="100"
      value={rangeValue}
      onChange={(e) => setRangeValue(e.target.value)}
    />
    <Body3 color="gray800">개방적</Body3>
  </div>
</OCEANRangeWrap>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <OCEANRangeWrap>
              <div>
                <Body3 color="gray800">보수적</Body3>
                <RangeSlider
                  type="range"
                  min="0"
                  max="100"
                  value={rangeValue}
                  onChange={(e) => setRangeValue(e.target.value)}
                />
                <Body3 color="gray800">개방적</Body3>
              </div>
            </OCEANRangeWrap>
          </FlexBox>
        </div>

        <div id="needsKeyword">
          <h2>NeedsKeywordSelected</h2>
          <Note>
            <p>
              NeedsKeywordSelected 컴포넌트는 키워드 선택 카드를 표시합니다. 
              좌측 상단에는 radioGroup1 버튼이 있으며, 내부 키워드는 각각 체크 가능합니다.
            </p>
            <CodeBlock>
              {`<NeedsKeywordSelected 
  title="아이디어 1" 
  keywords={dummyKeywords} 
  selectedKeywords={selectedKeywords} 
  onSelectionChange={setSelectedKeywords}
  isSelected={isCardSelected}
  onCardSelect={setIsCardSelected}
/>`}
            </CodeBlock>
          </Note>

          <FlexBox>
            <NeedsKeywordSelected 
              title="페르소나의 구매 여정 분석 키워드" 
              keywords={dummyKeywords} 
              selectedKeywords={selectedKeywords} 
              onSelectionChange={setSelectedKeywords}
              isSelected={isCardSelected}
              onCardSelect={setIsCardSelected}
            />
          </FlexBox>
        </div>
      </ContentsWrap>
    </>
  );
};

export default PageStyleGuide;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 30px;
  border-bottom: 1px solid ${palette.lineGray};
  background-color: ${palette.white};
  z-index: 100;

  a {
    font-size: 0.75rem;
    color: ${palette.gray800};
    padding: 3px 20px;
    background-color: ${palette.gray100};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: ${palette.gray200};
    }
  }
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 0 30px 30px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
    padding: 50px 0;
  }

  #font > h2,
  #color > h2,
  #button > h2,
  #form > h2,
  #icon > h2,
  #Placeholders > h2,
  #Spinners > h2,
  #status > h2,
  #viewtype > h2,
  #popup > h2,
  #bottombar > h2,
  #personas > h2,
  #listgroup > h2,
  #barChart > h2,
  #boxWrap > h2,
  #rangeSlider > h2 {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: left;
    border-bottom: 1px solid ${palette.gray800};
  }
`;

const Note = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: left;
  padding: 10px 20px;
  background-color: ${palette.gray100};

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: ${palette.gray300};
    content: "";
  }
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    width: 100%;
  }
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  gap: 0 !important;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    padding: 10px;
  }
`;

const CodeBlock = styled.pre`
  font-family: "Pretendard", "Poppins";
  font-size: 0.88rem;
  color: ${palette.gray800};
  width: 100%;
  padding: 10px;
  overflow-x: auto;
  border-radius: 5px;
  border: 1px solid ${palette.gray200};
  background-color: ${palette.white};
`;

const BottomBarWrap = styled(BottomBar)`
  position: relative;
  bottom: 0;
`;

const ChartComponentsWrap = styled.div`
  padding: 80px 20px 40px;
  margin-top: 60px;

  h2 {
    margin-bottom: 0px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
`;

// Kano Model 관련 스타일 컴포넌트
const KanoModelWrap = styled.div`
  margin: 50px 0;
  padding: 20px;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const KanoModelGraphWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: ${palette.white};
  border-radius: 8px;
  border: 1px solid ${palette.gray300};
  height: 600px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ComponentDescription = styled.p`
  font-size: 16px;
  color: ${palette.gray700};
  margin-bottom: 20px;
  line-height: 1.5;
`;
