//작업관리/ 프로젝트 리스트
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../assets/styles/Palette";

import OrganismIncNavigation from "../pages/Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../pages/Global/organisms/OrganismIncNavigation";
import {
  ContentsWrap,
  MainContent,
  Title,
} from "../../src/assets/styles/BusinessAnalysisStyle";
import { H4, Body2, Sub3 } from "../../src/assets/styles/Typography";

const PageTerms = () => {
  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <TermsWrap>
            <Title>
              <H4>서비스 이용약관</H4>
            </Title>

            <div>
              <Body2 align="left">제1조 (목적)</Body2>
              <Sub3 align="left" color="gray700">
                본 약관은 주식회사 유저커넥트(이하 "회사"라 함)가 제공하는
                인터뷰엑스 서비스의 이용과 관련하여, 회사와 회원과의 권리, 의무
                및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </Sub3>
            </div>

            <div>
              <Body2 align="left">제2조 (용어의 정의)</Body2>
              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    이 약관에서 사용하는 용어의 정의는 아래와 같습니다.
                  </Sub3>
                </li>
              </CircleNumber>
              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    "서비스"라 함은 사용자가 “AI 전문가” 또는 “AI Person”을
                    통하여 비즈니스, 기술, 마케팅, 고객 관리 등 분야에서 조언과
                    정보를 얻을 수 있도록 회사가 제공하는 제반 서비스를
                    의미합니다. “서비스”에는 특정 산업 또는 업무에 맞춰 설정된
                    “AI Person”과의 상호작용, 비즈니스 인사이트 제공, 데이터
                    분석 및 보고서 생성, 시뮬레이션 및 예측 서비스 등이
                    포함됩니다. 또한, “서비스”는 사용자 맞춤형 경험을 제공하기
                    위해 인공지능 알고리즘과 학습 모델을 기반으로 사용자
                    피드백을 수집하고 개선합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "회원"이라 함은 “회사”의 "서비스"에 접속하여 이 약관에 따라
                    "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를
                    이용하는 사용자를 의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "회원ID"라 함은 “회원”의 식별과 “회원”의 “서비스” 이용을
                    위하여 “회원”이 등록하고 “회사”가 승인한 이메일 주소를
                    의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "비밀번호"라 함은 “회원ID”를 부여 받은 “회원”과 동일인임을
                    확인하고 “회원”의 비밀을 보호하기 위하여 “회원”이 정한 문자
                    또는 문자와 숫자의 조합을 의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "AI 전문가"라 함은 AI 기술을 이용해 특정 분야에서 전문적인
                    조언과 정보를 제공하도록 설계된 가상 전문가를 의미합니다
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "AI Person"이라 함은 특정 산업 또는 직업에 맞춘
                    페르소나(persona)를 생성하고 사용자와 상호작용하도록 설계된
                    가상 인격체를 의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "유료서비스"라 함은 "서비스" 중 "회사"가 유료로 제공하는
                    “서비스”를 의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "유료회원"이 함은 회사가 제공하는 “유료 서비스”를 이용하기
                    위해 크레딧을 결제하여 사용하는 “회원”을 의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "콘텐츠"라 함은 “AI 전문가” 또는 “AI Person”이 제공하는
                    정보, 조언, 텍스트, 이미지, 데이터 등 “서비스” 내 모든
                    자료를 의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “결제”라 함은 “회원”이 “유료서비스”를 이용하기 위하여 일정
                    금액을 “회사”가 지정하는 결제수단을 통해 지불하는 것을
                    의미합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    "크레딧"이 함은 “회원”이 “회사”가 제공하는 “서비스”를
                    이용하기 위해 구매하는 가상의 단위로, “서비스” 내에서 특정
                    기능이나 도구를 사용할 때 차감되는 포인트를 의미합니다.
                    “회원”은 필요에 따라 “크레딧”을 추가로 구매할 수 있으며,
                    구매한 “크레딧”은 “서비스” 내에서 일정 기간 동안 유효하게
                    사용 가능합니다
                  </Sub3>
                </li>
              </Decimal>
              <CircleNumber>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    이 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을
                    제외하고는 관련 법령에서 정하는 바에 따르며, 관련 법령에서
                    정하지 않는 것은 일반적인 상관례에 따릅니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제3조 (약관의 명시와 개정)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 이 약관의 내용과 상호, 영업소재지, 대표자의 성명,
                    사업자등록번호, 연락처 등을 ”회원”이 알 수 있도록 “서비스”
                    초기화면에 게시하거나 기타의 방법으로 ”회원”에게 공지합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 약관의 규제에 관한 법률, 전기통신기본법,
                    전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한
                    법률 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할
                    수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”가 약관을 개정할 경우에는 시행일자 및 개정사유를
                    명시하여 현행약관과 함께 개정약관의 시행일자 7일전부터
                    시행일자 전일까지 공지합니다. 단 “회원”의 권리, 의무에
                    중대한 영향을 주는 변경의 경우에는 시행일자 30일 전부터
                    공지하도록 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 변경된 약관에 대해 거부할 권리가 있습니다. “회원”은
                    변경된 약관이 공지된 지 15일 이내에 거부의사를 표시할 수
                    있습니다. “회원”이 거부하는 경우 “서비스” 제공자인 “회사”는
                    15일의 기간을 정하여 “회원”에게 사전통지 후 당해 “회원”과의
                    계약을 해지할 수 있습니다. 만약, “회원”이 거부 의사를
                    표시하지 않거나, 전항에 따른 시행일자 이후에 "서비스"를
                    이용하는 경우에는 개정약관에 동의한 것으로 간주합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제4조 (약관의 해석)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 “회사”와 개별계약을 체결하여 “서비스”를 이용하는
                    경우 “회사”는 개별 서비스에 대한 이용약관 또는 운영정책
                    등(이하 "운영정책 등")을 둘 수 있으며, 해당 내용이 본 약관과
                    상충되는 경우 개별 서비스에 대한 운영정책 등이 우선합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    이 약관에서 규정하지 않은 사항에 관해서는 약관의 규제에 관한
                    법률, 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및
                    정보보호 등에 관한 법률 등의 관계법령에 따릅니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제5조 (이용계약의 성립)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”와 “회원” 사이의 “서비스” 이용계약(이하 "이용계약"이라
                    함)은 “서비스”를 이용하고자 하는 자(이하 "가입신청자"라
                    함)가 본 약관과 개인정보처리방침의 내용에 대한 동의를 한
                    다음 회원가입 신청을 하고, 그에 대해 "회사"가 이용 승낙을
                    함으로써 체결됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “가입신청자”의 신청에 대하여 서비스 이용을 승낙함을
                    원칙으로 합니다. 다만, “회사”는 다음 각 호에 해당하는
                    이용신청에 대하여는 승낙을 거절하거나 사후에 “이용계약”을
                    해지할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    “가입신청자”가 이 약관에 의하여 이전에 회원자격을 상실한
                    적이 있는 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    실명이 아니거나 타인의 명의를 이용한 가입신청의 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    허위의 정보를 기재하거나, “회사”가 제시하는 내용을 기재하지
                    않은 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    만 14세 이상이 아닌 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “크레딧” 을 부정한 방법으로 적립하거나 사용한 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “가입신청자”의 귀책사유로 인하여 승인이 불가능하거나 그 밖에
                    “회사”가 “서비스”를 제공할 수 없는 사유가 있는 경우
                  </Sub3>
                </li>
              </Decimal>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “서비스” 관련 설비의 여유가 없거나, 기술상 또는
                    업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”가 본조 제2항의 제2호, 제3호, 제5호 또는 제3항에 따라
                    가입신청에 대한 승낙을 거절 또는 유보하거나 “이용계약”을
                    해지한 경우, “회사”는 원칙적으로 그 사실을 “가입신청자”에게
                    알리도록 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “이용계약”의 성립 시기는 “회사”가 신청 절차 상에서
                    가입완료를 표시한 시점으로 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑥</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 “유료서비스”를 이용하기 위해서는 이용대금을
                    납부하여야 합니다. “회사”는 다음 각 호에 해당하는 경우
                    “유료서비스” 이용 신청에 대한 승낙을 거절하거나 사후에
                    “유료서비스”의 “이용계약”을 해제/해지할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    이용대금을 납부하지 않거나 잘못 납부하여 “회사”가 이용대금
                    납부 사실을 확인할 수 없는 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    회원자격을 상실한 이후 “회사”의 회원 재가입 승낙을 얻지 못한
                    경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    제3자의 신용카드, 유/무선 전화, 은행계좌 등을 무단으로 이용
                    또는 도용하여 이용대금을 결제하는 경우
                  </Sub3>
                </li>
              </Decimal>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">⑦</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 회사정책에 따라 “회원”을 등급별로 구분하여,
                    이용시간, 이용횟수, 이용 가능한 서비스 기능 등을 세분하여
                    이용에 차등을 둘 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제6조 (이용자 정보의 제공)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”으로 가입하여 “서비스”를 이용하고자 하는 사용자는
                    이메일, 휴대폰 번호 등의 정보를 제공하고, 휴대폰 또는 이메일
                    인증을 하여야 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    사용자가 제1항에서 정한 인증을 거치지 않은 경우 “서비스”
                    이용이 제한될 수 있으며, 실명으로 등록하지 않은 사용자 또는
                    “회원”은 본 “서비스”에 관하여 일체의 권리를 주장할 수
                    없습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    타인의 명의를 도용하여 이용신청을 한 “회원”의 “회원ID”는
                    삭제되며, 그 “회원”은 관계 법령에 따라 처벌을 받을 수
                    있습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제7조 (개인정보의 보호 및 관리)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 관계 법령이 정하는 바에 따라 계정정보를 포함한
                    회원의 개인정보를 보호하기 위하여 노력합니다. “회원”의
                    개인정보 보호 및 사용에 대해서는 “회사”가 별도로 고지하는
                    개인정보처리방침에 따릅니다. 다만, “회사”가 제공하는 공식
                    서비스 애플리케이션 및 사이트 이외의 사이트에서는 “회사”의
                    개인정보처리방침이 적용되지 않습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”의 귀책사유로 인하여 노출된 “회원”의
                    계정정보를 포함한 모든 정보에 대해서는 일체의 책임을 지지
                    않습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제8조 (회원ID 및 비밀번호)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 “서비스”의 원활한 이용 및 “회원”의 정보보호, 서비스
                    이용안내 등의 편의를 위하여 ”회원”이 선정한 이메일 주소를
                    “회원ID”로 사용합니다. 다만, “회사”는 “회원ID”의 내용이
                    반사회적이거나 미풍양속을 해치거나 운영자로 오인할 우려가
                    있는 등의 경우에는 해당 ID의 사용을 거부하거나 제한할 수
                    있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 계정정보를 통하여 당해 “회원”의 “서비스” 이용가능
                    여부 등 제반 “회원” 관리 업무를 수행합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 자신의 계정정보를 선량한 관리자의 주의의무를 다하여
                    관리하여야 합니다. 이를 위반함으로써 발생하는 손해에
                    대하여는 “회원”에게 책임이 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 자신의 계정정보를 선량한 관리자의 주의의무를 다하여
                    관리하여야 합니다. 이를 위반함으로써 발생하는 손해에
                    대하여는 “회원”에게 책임이 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 “비밀번호”에 대한 보호 및 관리 책임을 부담합니다.
                    다만, “회사”는 보안 등을 이유로 “회원”에게 정기적 또는
                    비정기적으로 “비밀번호”의 변경을 권고할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제9조 (크레딧)</Body2>
              <Sub3 align="left" color="gray700">
                “크레딧”는 “서비스” 내에서 유료상품의 “결제” 또는 “회사”가 정한
                이벤트, 미션 수행 등의 사유로 적립받을 수 있습니다. 크레딧은
                다음과 같이 세 가지 유형으로 분류됩니다.
              </Sub3>
              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    일반 크레딧 : 단건 결제를 통해 적립되는 크레딧.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    구독 크레딧 : 정기적으로 매달 일정 시기에 자동 결제를 통해
                    적립되는 크레딧.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    이벤트 크레딧 : 특정 이벤트나 프로모션을 통해 적립되는
                    크레딧.
                  </Sub3>
                </li>
              </Decimal>

              <Sub3 align="left" color="gray700">
                “크레딧” 적립과 관련하여 제세공과금이 발생하는 경우 제세공과금을
                제외한 만큼만 적립됩니다. 다만, 사후적으로 적립 사유가 취소된
                경우, 적립된 “크레딧”는 회수됩니다.
              </Sub3>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “크레딧”는 서비스” 내에서 상품 또는 제휴 콘텐츠를 “결제”하는
                    데 사용할 수 있으며, 1크레딧 당1원과 동일한 가치로 사용할 수
                    있습니다. 단, 회사는 약관 개정을 통하여 교환비율을 변경할 수
                    있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 “크레딧”을 사용할 경우, 유효 기간이 더 짧은
                    크레딧(구독 크레딧 또는 이벤트 크레딧)이 먼저 사용됩니다.
                    유효 기간이 같을 경우에는 먼저 적립된 크레딧이 우선
                    사용됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “크레딧”은 구매일로부터 12개월간 유효하며, 사용되지 않는
                    경우 차례로 소멸됩니다. 12개월이 경과한 캐시는 한 달의 유예
                    기간 후 자동으로 소멸됩니다. 소멸일은 구매일로부터 12개월
                    경과 후 그 다음달 말일입니다. (예: 2021년 3월 4일 구매된
                    미사용 크레딧은 2022년 4월 30일에 소멸됩니다.) 단, 특정
                    유형의 크레딧(구독 및 이벤트)에 대해서는 다른 소멸 기간이
                    적용될 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “크레딧”소멸에 대해 소멸일 3일 전 이메일 알림을 발송합니다.
                    크레딧 소멸에 대해 다음과 같은 일정으로 총 3회 이메일을
                    발송합니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Sub3 align="left" color="gray700">
                - 소멸일 기준 당월 1일 발송
              </Sub3>
              <Sub3 align="left" color="gray700">
                - 소멸일 기준 14일 전 발송
              </Sub3>
              <Sub3 align="left" color="gray700">
                - 소멸일 기준 1일 전 발송
              </Sub3>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">⑥</Sub3>
                  <Sub3 align="left" color="gray700">
                    “크레딧”은 타인에게 양도할 수 없고 대여 또는 담보의 목적으로
                    이용할 수 없습니다. “크레딧”는 “이용계약”의 해지 또는
                    “회원”의 탈퇴 등을 비롯하여 어떠한 경우에도 현금으로
                    환급되지 않습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑦</Sub3>
                  <Sub3 align="left" color="gray700">
                    “크레딧”의 적립 또는 최소 사용 기준이나 기타 제한 조건은
                    “회사”의 운영 정책에 따라 달라질 수 있으며, 이에 대한 사항은
                    “서비스” 화면에 게시하거나 별도로 통지합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제10조 (회원에 대한 통지)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”가 “회원”에 대한 통지를 하는 경우 본 약관에 별도
                    규정이 없는 한 “회원”이 지정한 이메일, “서비스” 내 알림
                    메시지 또는 전자 게시물 등으로 할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원” 전체에 대한 통지의 경우 7일 이상 “회사”의
                    홈페이지 또는 “서비스” 공지사항 게시판에 게시함으로써
                    제1항의 통지에 갈음할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제11조 (회사의 의무)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 본 약관 및 관련 법령에서 금지하는 행위 및
                    미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적인
                    “서비스”의 제공을 위하여 최선을 다하여 노력합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”이 안전하게 “서비스”를 이용할 수 있도록
                    일체의 개인정보 보호를 위한 보안시스템을 갖추어야 하며
                    개인정보처리방침을 공시하고 준수합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”으로부터 제기되는 의견이나 불만이 정당하다고
                    객관적으로 인정될 경우에는 합리적인 기간 내에 신속하게
                    처리하여야 합니다. 다만, 처리에 장기간이 소요되는 경우
                    “회원”에게 게시판 또는 전자우편 등을 통하여 지체 사유를
                    안내하고 처리과정 및 처리결과를 전달합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “이용계약”의 체결, 계약사항의 변경 및 해지 등
                    ”회원”과의 계약관련 절차 및 내용 등에 있어 ”회원”에게 편의를
                    제공하도록 노력합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”가 “유료서비스”를 제공하는 경우, “회사”는 다음의
                    사항을 해당 서비스의 이용 초기화면이나 FAQ 화면 등에
                    “회원”이 알기 쉽게 표시합니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    “유료서비스”의 명칭 또는 제호
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “유료서비스”의 내용, 이용방법, 이용대금, 결제방법 및 기타
                    이용조건
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    이용가능 기기 및 이용에 필요한 최소한의 기술사양{" "}
                  </Sub3>
                </li>
              </Decimal>
            </div>

            <div>
              <Body2 align="left">제12조 (회원의 의무)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 “회사”에서 제공하는 “서비스”를 본래의 이용 목적
                    이외의 용도로 사용하거나 다음 각 호에 해당하는 행위를 해서는
                    안됩니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    가입신청 또는 정보 변경을 목적으로 “회사”에 개인정보 등록 시
                    실명이 아닌 정보 또는 다른 사람의 정보를 사용하거나 허위
                    사실을 기재하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    타인으로 가장하거나 타인과의 관계를 허위로 명시하는 행위,
                    다른 “회원”의 계정 및 “비밀번호”를 도용, 부정하게
                    사용하거나, 타인의 신용카드, 전화번호 등을 무단으로 도용하여
                    유료 콘텐츠 등을 구매하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회사”의 “서비스”를 이용하여 얻은 정보를 “회사”의 사전 승낙
                    없이 복제, 유통, 조장하거나 상업적으로 이용하는 행위 또는
                    알려지거나 알려지지 않은 버그를 악용하여 “서비스”를 이용하는
                    행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회사”의 “서비스”를 이용하여 자기 또는 타인에게 재산상의
                    이익을 발생시키는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회사” 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위
                    또는 회사 및 제3자에게 손해를 가하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회사” 또는 제3자의 지적재산권, 초상권 등 기타 권리를
                    침해하거나 “회사”의 “서비스”를 통하지 않고 다른 “회원”의
                    개인정보를 수집, 저장, 유포, 게시하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    제3자를 기망하여 이득을 취하는 등 “회사”가 제공하는
                    “서비스”를 불건전하게 이용하여 제3자에게 피해를 주는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    음란, 저속한 정보를 교류, 게재하거나 그에 관해
                    연결(링크)하거나 사회통념상 타인에게 불쾌감을 줄 수 있는
                    내용을 담은 광고 및 홍보물을 게재하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    재물을 걸고 도박하는 등 사해행위를 유도하거나 참여하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    수치심이나 혐오감 또는 공포심을 일으키는 말이나 음향, 글,
                    화상 또는 영상을 게재하거나 상대방에게 전송, 도달, 유포하는
                    행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    관련 법령에 의하여 전송 또는 게시가 금지되는 정보 또는
                    컴퓨터 소프트웨어, 하드웨어, 전기통신장비의 정상적인 가동을
                    방해, 파괴할 목적으로 고안된 소프트웨어 바이러스 기타 다른
                    컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 전송,
                    게시, 유포, 사용하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회사”로부터 특별한 권리를 부여받지 않고 “서비스”를
                    변경하거나 다른 프로그램을 추가 또는 삽입하거나, 서버를
                    해킹, 역설계, 소스코드나 데이터의 유출 및 변경, 별도의
                    서버를 구축하거나 어플리케이션 또는 웹사이트의 일부분을
                    임의로 변경 또는 도용하여 “회사”를 사칭하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회사”의 직원이나 운영자를 가장, 사칭하거나 또는 타인의
                    명의를 도용하여 “AI 전문가”로 사칭하는 경우{" "}
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “AI전문가”를 활용하여 영리 목적으로 부당하게 이용하는 행위{" "}
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회사”의 동의 없이 영리, 영업, 광고, 정치활동, 불법선거운동
                    등을 목적으로 “서비스”를 이용하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    부정한 방법으로 “크레딧”를 적립 및 사용하는 행위
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    기타 공공질서 및 미풍양속을 위반하거나 불법적, 부당한 행위
                    및 법령에 위배되는 행위
                  </Sub3>
                </li>
              </Decimal>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 “회사” 홈페이지 상의 공지사항 및 이용약관의
                    수정사항 등을 확인하고 이를 준수할 의무가 있으며 기타
                    “회사”의 업무에 방해되는 행위를 하여서는 안 됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”의 계정에 관한 관리 책임은 “회원”에게 있으며, 이를
                    제3자가 이용하도록 하여서는 안 됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 제1항, 제2항 및 다음 각 호의 어느 하나에 해당하는
                    행위의 구체적인 유형을 운영 정책에서 정할 수 있으며, 회원은
                    이를 준수할 의무가 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    “회원”의 “회원ID”, “비밀번호”의 정함에 대한 제한
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “서비스”의 사용 및 등록에 대한 제한{" "}
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    게시판 이용 등에 대한 제한
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    기타 “회원”의 “서비스” 이용에 대한 본질적인 권리를 침해하지
                    않는 범위 내에서 “회사”가 운영상 필요하다고 인정되는 사항
                  </Sub3>
                </li>
              </Decimal>
            </div>

            <div>
              <Body2 align="left">제13조 (서비스의 제공시간 및 중지)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”의 회원가입을 승낙한 때부터 “서비스”를
                    개시합니다. 단, 일부 서비스의 경우, “회사”의 필요에 따라
                    지정된 일자부터 서비스를 제공할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴
                    1일 24시간 “서비스”를 제공합니다. 다만, 정보통신설비 등
                    시스템 정기점검, 서버의 증설 및 교체, 각종 버그 패치, 새로운
                    서비스로의 교체 등 운영상 필요한 경우, 일정 기간 동안
                    “서비스”를 일시 중지시킬 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    제2항 단서의 경우 “회사”는 그 내용 및 시간을 홈페이지나
                    애플리케이션 내에 공지합니다. 다만, “회사”가 사전에 통지할
                    수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “서비스”의 제공에 필요한 경우 정기점검을 실시할 수
                    있으며, 정기점검시간은 “서비스” 제공화면에 공시한 바에
                    따릅니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    회사”가 사업종목의 전환, 사업의 포기 등의 이유로 “회원”이
                    신청한 “유료서비스”를 제공할 수 없게 되는 경우, “회사”는
                    제9조(회원에 대한 통지)에서 정한 방법으로 “회원”에게
                    통지하고 당초 “회사”에서 제시한 조건에 따라 “회원”에게
                    보상합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제14조 (서비스의 내용 및 변경)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 “회사”가 제공하는 “서비스”를 본 약관, 운영정책 등
                    “회사”가 정한 규칙에 따라 이용할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”가 “회원”에게 제공하는 “서비스”에 대하여 “회사”는
                    제작, 변경, 유지, 보수에 관한 포괄적인 권한을 가집니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 새로운 서비스 내용, 각종 버그 패치 등 “서비스”의
                    운영상 또는 기술상 필요한 경우, 제공하고 있는 “서비스”의
                    전부 또는 일부를 상시적으로 수정, 추가, 폐지 등 변경할 수
                    있습니다. 변경될 “서비스”의 내용 및 제공일자 등에 대해서는
                    그 변경 7일 이상 전에 “회사”가 운영하는 홈페이지 및 해당
                    서비스 초기화면에 게시함으로써 “회원”에 대한 통지에
                    갈음합니다. 다만, “회사”가 통제할 수 없는 사유로 인한
                    “서비스”의 중단으로 인하여 사전 통지가 불가능한 경우에는
                    그러하지 아니합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 무료로 제공되는 “서비스”의 일부 또는 전부를
                    “회사”의 정책 기획이나 운영상의 사정 또는 “회사”의 긴박한
                    상황 등 “회사”의 필요에 의해 수정, 중단, 변경할 수 있으며,
                    이에 대하여 관련 법령상 특별한 규정이 없는 한 “회원”에게
                    별도의 보상을 하지 않습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “유료서비스”의 변경 내용이 중대하거나 “회원”에게
                    불리한 경우 해당 유료서비스를 제공받는 “회원”에게 제10조에서
                    정한 방법으로 통지합니다. 이 경우, 변경 내용에 대하여 동의를
                    거절한 “회원”에 대해서는 변경 전 서비스를 제공합니다. 다만,
                    변경 전 서비스의 제공이 불가능한 경우 해당 서비스의 제공을
                    중지하거나 중단할 수 있으며 그 경우 환불에 대해서는 제21조에
                    따라 진행합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 다음 각호에 해당하는 경우 “서비스”의 전부 또는
                    일부를 제한하거나 중지할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    전시, 사변, 천재지변 또는 국가비상사태 등 불가항력적인
                    사유가 있는 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인
                    “서비스” 이용에 지장이 있는 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    “서비스”용 설비의 보수 등 공사로 인한 부득이한 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    기타 “회사”의 제반 사정으로 “서비스”를 할 수 없는 경우
                  </Sub3>
                </li>
              </Decimal>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">⑦</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “서비스”가 변경되거나 중지된 원인이 “회사”의 고의
                    또는 중대한 과실로 인한 경우를 제외하고는 “서비스”의 변경 및
                    중지로 발생하는 문제에 대해서 책임을 부담하지 않습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제15조 (정보의 제공 및 광고의 게재)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 관련 법령을 준수하는 범위 내에서 “회원”에게
                    “서비스” 이용 중 필요하다고 인정되는 서비스 관련 정보, 회원
                    별 맞춤형 서비스 정보 등의 다양한 정보를 “회원”에게 이메일,
                    스마트폰 알림(Push 알림), 문자 메시지(SMS/LMS), 전화를
                    이용해 제공하거나 “회사”의 홈페이지 또는 앱의 공지사항에
                    게시하여 “회원”에게 제공할 수 있습니다. 또한 “회원”이 원하지
                    않는 경우에는 “회사”가 제공하는 서비스 관련 정보, 회원 별
                    맞춤형 서비스 정보 등의 다양한 정보 또는 광고성 정보의
                    수신을 “설정” 화면 또는 “이메일 수신거부” 또는 “무료수신거부
                    전화번호”를 통해 수신 거부할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “서비스” 등을 유지하기 위하여 “서비스” 이용 시
                    노출되는 공간 또는 타 광고 사업자가 운영하는 매체에 광고를
                    게재할 수 있으며, “회원”은 이로 인한 광고게재에 대하여
                    동의합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”가 제공하는, 제3자가 주체인, 제2항의 광고에 “회원”이
                    참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에
                    대해서 “회사”는 어떠한 책임도 부담하지 않습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 적법하게 수집한 “회원”의 개인정보를 활용하여
                    제2항의 광고 등을 제공하는 경우 문자 스마트폰 알림(Push
                    알림), 이메일, 메시지(SMS/LMS) 등을 활용하여 발송할 수
                    있으며, ”회원”이 원하지 않는 경우에는 언제든지 수신을 “설정”
                    화면 또는 “이메일 수신거부” 또는 “무료수신거부 전화번호”를
                    통해 수신 거부할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 상기 정보 제공과 광고와 관련해서는 정보를 “회사”에
                    제공하는 플랫폼사업자, 앱스토어 사업자의 약관 및 “회사”의
                    약관에 준거하며 관련 법령 및 시행령의 규정을 준수합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제16조 (게시물의 저작권)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 “서비스” 내에 게시한 게시물의 저작권은 해당
                    게시물의 저작자에게 귀속됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    제1항에도 불구하고 “회사”는 “회원”이 “서비스” 내에 게시하는
                    콘텐츠를 검색결과 내지 서비스 및 관련 프로모션 등에 노출할
                    수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정,
                    복제, 편집되어 게시할 수 있습니다. 이 경우, “회사”는
                    저작권법 규정을 준수하며, “회원”은 언제든지 고객센터 또는
                    “서비스” 내 관리기능을 통해 해당 게시물에 대해 삭제,
                    검색결과 제외, 비공개 등의 조치를 취할 수 있습니다
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 제2항 이외의 방법으로 “회원”의 게시물을 이용하고자
                    하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 “회원”의
                    동의를 얻어야 합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제17조 (게시물의 관리)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”의 게시물이 정보통신망 이용촉진 및 정보보호에 관한
                    법률 또는 저작권법 등 관련 법령에 위반되는 내용을 포함하는
                    경우, 해당 게시물의 권리자는 관련 법령이 정한 절차에 따라
                    해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며,
                    “회사”와 “회원”은 관련 법령에 따른 조치를 취하여야 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 제1항에 따른 권리자의 요청이 없는 경우라도 특정
                    게시물에 권리침해가 인정될 만한 사유가 있거나 기타 “회사”
                    정책 및 관련 법령에 위반되는 경우에는 관련 법령에 따라 해당
                    게시물에 대해 임시조치 등을 취할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제18조 (권리의 귀속)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “서비스” 및 “서비스” 내 “회사”가 제작한 콘텐츠 등에 대한
                    저작권 및 기타 지적재산권은 “회사”에 귀속됩니다. 단,
                    “회원”의 게시물 및 제휴 계약에 따라 제공된 저작물 등은
                    제외합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회사”가 정한 이용조건에 따라 “서비스”와 관련하여
                    “회원”에게 계정(ID), 게시물 등을 이용할 수 있는 이용권만을
                    부여하며, “회원”은 이를 양도, 판매, 담보 제공하는 등 일체의
                    처분행위를 할 수 없습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제19조 (회원의 계약해제·해지 등)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 언제든지 '설정' 메뉴를 통하여 “서비스” 탈퇴 신청을
                    할 수 있으며, “회사”는 관련 법령 등에서 정하는 바에 따라
                    이를 즉시 처리하여야 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “유료서비스”를 이용 중인 “회원”이 탈퇴하는 경우 이용중인
                    이용권은 즉시 해지되며 환불은 불가합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 본 이용계약을 해지할 경우, 관련 법령 및 회사의
                    개인정보보호정책에서 정한 바에 따라 “회사”가 회원정보를
                    보유하는 경우를 제외하고는, 해지 즉시 “회원”이 등록한 정보,
                    적립된 “크레딧” 등 모든 데이터는 소멸됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 “유료서비스”를 해지할 경우 해당 “유료서비스”와
                    관련된 “회원”이 등록한 정보 등 모든 데이터는 소멸됩니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제20조 (결제수단)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 “유료서비스”의 결제를 위하여 이용할 수 있는 수단은
                    다음 각 호와 같습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    제휴된 신용카드
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    제휴된 통신사 청구서 통합 결제
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    기타 “회사”가 제3자와 제휴계약 등을 체결하여 “회원”에게 결제
                    가능 여부 및 그 방법을 안내하게 되는 결제 수단에 의한 대금
                    지급
                  </Sub3>
                </li>
              </Decimal>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”의 결제에 법적, 기술적 문제가 발생하거나
                    “회사”가 예견하지 못한 장애(은행 통신망 장애 등)가 발생하는
                    경우 “회사”의 정책에 따라 “회원”에게 결제 수단의 변경을
                    요청하거나 잠정 결제보류 내지 거부할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “유료서비스”를 이용하는 “회원”의 거래금액에 대하여 내부정책
                    및 외부 결제업체(은행사, 카드사 등), 기타 관련 법령의 변경에
                    따라 회원 당 월 누적 결제액, 결제한도 등의 거래한도를 정할
                    수 있으며, “회원”은 “회사”가 정한 거래한도를 초과하는 범위의
                    “유료서비스”를 이용하고자 할 경우 거래한도의 초과로 인하여
                    “유료서비스”의 추가 이용이 불가능할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제21조 (청약철회 및 환불 등)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 구매한 “유료서비스”의 경우에는 계약 체결일 또는
                    “유료서비스” 이용 가능일로부터 7일 이내에
                    청약철회(구매취소)를 할 수 있습니다. 단, 청약철회 요청 당시
                    이미 “유료서비스”를 사용하였거나 사용한 것으로 간주되는
                    경우, 청약철회가능기간이 경과한 경우, 선물 및 이벤트 등
                    “회사”나 제3자로부터 무상으로 제공받은 유료서비스 및 이에
                    준하는 특성을 가진 일부 서비스를 이용하는 경우에 대하여는
                    「전자상거래 등에서의 소비자보호에 관한 법률」 제17조
                    제2항에 따라 청약철회(구매취소)가 제한될 수 있습니다. 이
                    경우 “회사”는 “회원”이 해당 유료서비스 구매 시 고지하는 등
                    관련 법률에서 정한 바에 따른 조치를 취하기로 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회사”의 귀책사유로 인하여 “회원”이 구매한
                    “유료서비스”를 이용하지 못하는 경우, 동일한 “유료서비스”를
                    무상으로 제공하거나 해당 구매금액 전액을 환불합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 제13조 제5항의 경우 잔여 금액을 환불합니다. 단,
                    정상적으로 사용되었거나 무상으로 지급한 이벤트성 포인트는
                    환불대상에서 제외됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회사”의 귀책사유로 과오금이 발생한 경우 이용대금의
                    결제와 동일한 방법으로 과오금 전액을 환불하여야 하며,
                    ”회원”의 귀책사유로 과오금이 발생한 경우 과오금을 환급하는데
                    소요되는 비용을 합리적인 범위 내에서 공제하고 환급할 수
                    있습니다. “회사”가 과오금에 대한 환불을 거부할 경우 “회사”는
                    정당하게 이용대금이 부과되었음을 증명하여야 하며, 과오금
                    환불의 세부 사항은 콘텐츠이용자보호지침에 따릅니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 결제와 동일한 방법으로 환불을 진행하며, 결제와
                    동일한 방법으로 환불이 불가능한 때는 이를 사전에 고지합니다.
                    단, “회사”가 사전에 유료회원에게 공지한 경우 및 아래의 각
                    경우와 같이 개별 결제 수단별 환불 방법, 환불 가능 기간 등이
                    차이가 있을 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Decimal>
                <li>
                  <Sub3 align="left" color="gray700">
                    1. 신용카드 등 수납 확인이 필요한 결제수단의 경우에는 수납
                    확인일로부터 3영업일 이내
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    2. 결제수단 별 사업자가 “회사”와의 약정을 통하여 사전에 대금
                    청구 정지 내지 결제 취소 가능 기한 등을 미리 정하여 둔
                    경우로 해당 기한을 지난 환불의 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    3. 유료회원이 환불 처리에 필요한 정보 내지 자료를 “회사”에
                    즉시 제공하지 않는 경우(현금 환불 시 신청인의 계좌 및 신분증
                    사본을 제출하지 아니하거나, 타인 명의의 계좌를 제공하는 경우
                    등)
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    4. 해당 “회원”의 명시적 의사표시가 있는 경우
                  </Sub3>
                </li>
              </Decimal>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">⑥</Sub3>
                  <Sub3 align="left" color="gray700">
                    본 조에 따른 환불 진행 시, “회사”는 콘텐츠이용자보호지침
                    등에 따라 “회사”가 부담하였거나 부담할 부대비용, 수수료를
                    차감하여 환불할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑦</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 실제 정상적인 구매내역이 기록되는 이용대금의 결제를
                    통하지 않고 서비스 중에 보상으로 취득하거나, “회사”의 내부
                    혹은 외부 제휴 이벤트 등을 통하여 지급한 유료서비스 이용권
                    또는 유료콘텐츠 등은 환불의 대상이 되지 않습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑧</Sub3>
                  <Sub3 align="left" color="gray700">
                    카드결제를 통한 구매 건의 환불은 원칙적으로 카드 매출 취소
                    환불을 통해서만 가능합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑨</Sub3>
                  <Sub3 align="left" color="gray700">
                    유료회원의 신청 또는 동의에 따라 정기 자동결제 중인
                    “유료서비스”의 경우, 해당 유료회원이 “유료서비스”의
                    이용요금을 체납하는 경우 연체가 발생한 날 자동으로 상품
                    해지가 될 수 있으므로, 정기 자동결제를 통한 혜택을
                    유지하고자 하는 유료회원은 이용요금의 체납 또는 결제수단의
                    연체가 발생하지 않도록 사전에 조치하여야 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑩</Sub3>
                  <Sub3 align="left" color="gray700">
                    만약 각 개별서비스의 “운영정책 등”에서 본 조의 규정과 다른
                    청약철회 및 환불 정책을 규정하고 있는 경우, 해당 서비스의
                    “운영정책 등”을 우선하여 따릅니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제22조 (이용제한 등)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”이 본 약관의 의무를 위반하거나 “서비스”의
                    정상적인 운영을 방해한 경우, “서비스” 이용을 경고, 일시정지,
                    계약해지로 단계적으로 제한할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 제1항의 규정에도 불구하고, 주민등록법을 위반한
                    명의도용 및 결제도용, 저작권법을 위반한 불법프로그램의 제공
                    및 운영방해, 정보통신망 이용촉진 및 정보보호 등에 관한
                    법률을 위반한 불법통신 및 해킹, 악성프로그램의 배포,
                    접속권한 초과행위 등과 같이 관련법령을 위반한 경우에는 즉시
                    계약을 해지 할 수 있습니다. 이에 따른 계약해지시 “서비스”
                    이용을 통해 획득한 혜택 등은 모두 소멸되며, “회사”는 이에
                    대해 별도로 보상하지 않습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”가 제1항에 따라 “회원”의 “서비스” 이용을 제한하거나
                    계약을 해지하는 경우, 제한의 조건 및 세부내용은 이용제한정책
                    등에서 정한 바에 따르며, “회사”는 제10조에서 정한 방법으로
                    통지합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”은 “회사”의 이용제한 조치 등에 대하여 “회사”가 정한
                    절차에 따라 이의신청을 할 수 있습니다. “회원”의 이의 사유가
                    정당하다고 인정되는 경우 “회사”는 즉시 “회원”의 “서비스”
                    이용을 재개하여야 합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제23조 (손해배상)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “유료서비스”의 결함에 의하여 유료회원에게 손해가
                    발생한 경우 “회사”는 유료회원에게 실제 발생한 손해만을
                    배상합니다. 다만, “회사”의 고의 또는 과실 없이 유료회원에게
                    발생한 일체의 손해에 대하여는 책임을 지지 아니합니다.
                    “회사”는 유료회원에게 손해를 배상하는 경우, 그 방식과 절차
                    등에 관해 「콘텐츠이용자보호지침」의 관련 규정 및 기타
                    상관례를 따릅니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 이 약관의 의무를 위반함으로 인하여 “회사”에 손해를
                    입힌 경우 또는 “회원”이 “서비스”의 이용과 관련하여 “회사”에
                    손해를 입힌 경우 “회원”은 “회사”에 대하여 손해를 배상하여야
                    합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회원”이 서비스를 이용함에 있어 행한 불법행위 또는 본 약관을
                    위반한 행위로 “회사”가 당해 회원 외의 제3자로부터
                    손해배상청구 또는 소송 등 각종 이의제기를 받는 경우 당해
                    “회원”은 자신의 책임과 비용으로 “회사”를 면책시켜야 하며,
                    “회사”가 면책되지 못한 경우 당해 “회원”은 그로 인하여
                    “회사”에 발생한 모든 손해를 배상할 책임이 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제24조 (책임의 한계)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 천재지변 또는 이에 준하는 불가항력으로 인하여
                    “서비스”를 제공할 수 없는 경우에는 “서비스” 제공에 관한
                    책임이 면제됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”의 귀책사유로 인한 “서비스” 중지 또는 이용의
                    장애에 대하여는 책임을 지지 아니하며, 기간통신사업자가
                    전기통신서비스를 중지하거나 정상적으로 제공하지 아니하여
                    “회원”에게 손해가 발생한 경우에는 책임이 면제됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">③</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원”이 “서비스”와 관련하여 게재한 정보, 자료,
                    사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지
                    않습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">④</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 “회원” 간 또는 “회원”과 제3자 상호간에 “서비스”를
                    매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">⑤</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”는 무료로 제공되는 “서비스” 이용과 관련하여 관련법령에
                    특별한 규정이 없는 한 책임을 지지 않습니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제25조 (준거법 및 재판관할)</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">①</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”와 “회원” 간 제기된 소송은 대한민국법을 준거법으로
                    합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">②</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사”와 “회원” 간 발생한 분쟁에 관한 소송은 “회사”의
                    주소지를 관할하는 법원을 1심 소송에 관한 전속적 관할법원으로
                    합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>

            <div>
              <Body2 align="left">제26조 (회사의 연락처)</Body2>

              <Sub3 color="gray700" align="left">
                “회사”의 상호 및 주소 등은 다음과 같습니다.
              </Sub3>
              <Sub3 color="gray700" align="left">
                상호 : 주식회사 유저커넥트{" "}
              </Sub3>
              <Sub3 color="gray700" align="left">
                대표자 : 박영수{" "}
              </Sub3>
              <Sub3 color="gray700" align="left">
                주소 : 경기도 안산시 상록구 해양3로 15, 그랑시티 시그니처 타워
                1512호~1515호{" "}
              </Sub3>
              <Sub3 color="gray700" align="left">
                대표전화 : 031-216-5930
              </Sub3>
              <Sub3 color="gray700" align="left">
                이메일 주소 : info@userconnect.kr
              </Sub3>
            </div>
          </TermsWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageTerms;

const TermsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
`;

const Decimal = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 30px;
  margin: 10px auto;

  li {
    list-style: outside decimal;
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.55;
    color: ${palette.gray700};
    text-align: left;
    letter-spacing: -0.42px;
  }
`;

const CircleNumber = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  li {
    display: flex;
    flex-direction: row;
    gap: 4px;

    > div:nth-child(1) {
      margin-top: -2px;
    }
  }
`;
