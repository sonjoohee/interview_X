//작업관리/ 프로젝트 리스트
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../assets/styles/Palette";

import OrganismIncNavigation from "../pages/Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../pages/Global/molecules/MoleculeHeader";
import {
  ContentsWrap,
  MainContent,
  Title,
} from "../../src/assets/styles/BusinessAnalysisStyle";
import {
  H4,
  Body2,
  Sub1,
  Sub3,
} from "../../src/assets/styles/Typography";

const PagePolicy = () => {

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <TermsWrap>
            <Title style={{alignItems: 'flex-start'}}>
              <H4>개인정보처리방침</H4>
            </Title>

            <div>
              <Sub3 align="left" color="gray700">
                주식회사 유저커넥트(이하 '회사'라 함)는 개인정보 보호법 등 회사가 준수하여야 할 국내 개인정보 보호 및 관련 법령을 준수하며, 관련 법령에 의거한 개인정보 처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.<br /><br />
              </Sub3>
              <Sub3 align="left" color="gray700">
                본 개인정보 처리방침은 회사가 운영하는 인터뷰엑스 서비스에 적용되며, 회사가 어떤 정보를 수집하고 수집한 정보를 어떻게 이용하며 필요에 따라 누구에게 위탁 또는 제공하며, 이용목적을 달성한 정보를 언제·어떻게 파기하는지 등과 관련한 내용을 담고 있습니다.<br /><br />
              </Sub3>
              <Sub3 align="left" color="gray700">
                이 개인정보 처리방침에서 사용하는 용어의 의미는 관련 법령 및 회사의 이용약관에서 정한 바에 따르며, 그 밖의 사항은 일반적인 상관례에 따릅니다.<br /><br />
              </Sub3>
              <Sub3 align="left" color="gray700">
                ※ 인터뷰엑스 서비스는 만 14세 이상 가입 및 이용 가능한 서비스로 만 14세 미만의 아동에 대해서는 회원 가입을 받지 않습니다.
              </Sub3>
              <Decimal style={{margin: '10px 0'}}>
                <li><Sub3 align="left" color="gray700">개인정보 수집 및 이용 현황</Sub3></li>
                <li><Sub3 align="left" color="gray700">개인정보의 제공 및 위탁</Sub3></li>
                <li><Sub3 align="left" color="gray700">개인정보 보유 및 이용기간</Sub3></li>
                <li><Sub3 align="left" color="gray700">개인정보 파기</Sub3></li>
                <li><Sub3 align="left" color="gray700">이용자의 권리</Sub3></li>
                <li><Sub3 align="left" color="gray700">쿠키의 운영</Sub3></li>
                <li><Sub3 align="left" color="gray700">행태정보의 운영</Sub3></li>
                <li><Sub3 align="left" color="gray700">회원의 권리와 의무</Sub3></li>
                <li><Sub3 align="left" color="gray700">개인정보의 기술적·관리적 보호대책</Sub3></li>
                <li><Sub3 align="left" color="gray700">개인정보 보호책임자 및 담당자의 연락처</Sub3></li>
                <li><Sub3 align="left" color="gray700">개인위치정보의 처리</Sub3></li>
                <li><Sub3 align="left" color="gray700">기타</Sub3></li>
                <li><Sub3 align="left" color="gray700">고지의 의무</Sub3></li>
              </Decimal>
            </div>

            <div>
              <Body2 align="left">1. 개인정보 수집 및 이용현황</Body2>
              <Sub3 align="left" color="gray700">
                회사는 인터뷰엑스 서비스를 제공하기 위해 회원가입, 서비스 제공 및 이용에 필요한 개인정보를 수집하며 이용합니다.
              </Sub3>

              <table className="table-auto">
                <thead>
                  <tr>
                    <th>수집 시기</th>
                    <th>수집하는 개인정보 항목</th>
                    <th>이용목적</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>회원가입</td>
                    <td>
                      <p>[필수] 이메일 주소, 휴대전화 번호, 비밀번호</p>
                      <p>※ 외부 서비스를 이용한 회원 가입 시 외부 서비스에서 제공하는 계정 관련 정보와 회원이 제공에 동의한 정보</p>
                      <p>- 구글 : [필수] 이메일 주소, 구글 계정 식별자, [선택] 프로필사진</p>
                    </td>
                    <td>가입의사 확인 및 회원가입 승인, 전화번호 소유 인증, 회원 식별, 공지사항 전달 및 회원 설정 기반 정보 제공을 위해 필수 항목으로 수집 및 이용합니다.</td>
                  </tr>
                  <tr>
                    <td>유료 서비스 이용 및 환불</td>
                    <td>
                      신용카드 결제 시: 이름, 휴대전화 번호, 이메일 주소, 카드번호(일부), 카드사명 등<br />
                      계좌이체 시: 예금주명, 계좌번호, 은행명 등<br />
                      환불 처리 시: 예금주명, 계좌번호, 은행명 등
                    </td>
                    <td>유료 서비스 제공에 따른 구매, 서비스 배송, 요금 결재, 환불, 상담을 위해 선택항목으로 수집 및 이용합니다.</td>
                  </tr>
                  <tr>
                    <td>설문조사 응답</td>
                    <td>
                      [필수] 휴대전화 번호, 해당 설문조사에서 설정한 정보<br />
                      [선택] 해당 설문조사에서 설정한 정보
                    </td>
                    <td>
                      설문 응답 수집 및 리워드 발송을 위해 수집 및 이용합니다.<br />
                      고지한 항목 외 추가로 개인정보 수집이 발생할 수 있습니다. 이 경우에는 회원에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의를 거부할 권리 및 동의 거부에 따른 불이익’에 대해 별도로 안내 드리고 동의를 받습니다.
                    </td>
                  </tr>
                  <tr>
                    <td>일반 상담 문의</td>
                    <td>
                      ∙ 1:1앱/홈페이지 문의: [필수] 이메일 주소<br />
                      ∙ CONTACT이메일 문의: [필수] (이용자의 문의 매체에 따름) 이메일 주소, 휴대전화번호<br />
                      ∙ 전화유선 문의 : [필수] 이름, 이메일 주소, 휴대전화번호, 통화 음성, [선택] 이름, 이메일 주소, 회사 정보
                    </td>
                    <td>원활한 상담 문의 응대를 위한 회원 식별 및 요청사항 처리, 회신을 위해 수집 및 이용합니다.</td>
                  </tr>
                  <tr>
                    <td>상품/서비스 문의</td>
                    <td>
                      ∙ 광고상품 상담문의: [필수] 이름, 휴대전화번호, 이메일 주소, 회사명<br />
                      ∙ 리서치 서비스 상담문의: [필수] 이름, 이메일 주소, 휴대전화 번호, 회사명, 부서명, 직급
                    </td>
                    <td>상품 및 서비스별 원활한 상담 문의 응대를 위한 회원 식별 및 요청사항 처리, 회신을 위해 수집 및 이용합니다.</td>
                  </tr>
                  <tr>
                    <td>서비스 이용에 따른 자동 수집 및 생성 정보</td>
                    <td>PC웹, 모바일 웹/앱 이용 과정에서 생성된 단말기 정보(OS, 단말기 모델명, 디바이스 아이디), IP주소, 쿠키, 광고식별자, 방문일시, 서비스 이용 기록, 인맥 지수 및 기타 서비스 이용 과정에서 생성된 정보</td>
                    <td>
                      · 인터뷰엑스 서비스 제공(광고 포함), 인구통계학적 분석, 맞춤형 서비스 제공, 신규 서비스 발굴 및 기존 서비스 개선을 위해 이용.<br />
                      ·서비스 이용과 접속 빈도 분석, 서비스 분석, 서비스 이용에 대한 통계에 따른 맞춤 서비스 제공과 광고 게재를 위해 이용.<br />
                      ·법령 및 인터뷰엑스 서비스 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정 도용 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 고객 문의 처리, 회원 보호 및 서비스 운영을 위해 이용.
                    </td>
                  </tr>
                  <tr>
                    <td>서비스 이용</td>
                    <td>&nbsp;</td>
                    <td>사용자 맞춤형 설문조사 제공 및 분석, 사용자 행동 패턴 분석을 통한 서비스 개선,  AI 모델 학습 및 성능 향상 </td>
                  </tr>
                </tbody>
              </table>

              <Sub3 align="left" color="gray700">
                이벤트 및 경품 신청 과정 등 인터뷰엑스 서비스 제공 과정에서 추가로 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집하는 시점에 회원에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의를 거부할 권리 및 동의 거부에 따른 불이익’에 대해 별도로 안내 드리고 동의를 받습니다.
              </Sub3>

              <Sub3 align="left" color="gray700">
                회사는 회사와 제휴한 외부 기업이나 단체로부터 개인정보를 제공받을 수도 있습니다. 이러한 경우 개인정보보호법에 따라 제휴한 외부 기업 또는 단체에서 회원의 개인정보 제공 동의 등을 받은 후 회사에 제공합니다.
              </Sub3>
            </div>

            <div>
              <Body2 align="left">2. 개인정보의 제공 및 위탁</Body2>

              <Sub3 align="left" color="gray700">
                회사는 회원의 사전 동의 없이 개인정보를 제3자 혹은 외부에 제공하지 않습니다. 단, 회원이 서비스 이용 중 개인정보 제공에 직접 동의를 한 경우, 관련 법령에 의거해 회사에 개인정보 제출 의무가 발생한 경우에 한하여 개인정보를 제공하고 있습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">
                가. 개인정보의 제3자 제공
              </Sub1>

              <Sub3 align="left" color="gray700">
                1) 회사는 서비스의 원활한 제공을 위해 필요한 때에는 개인정보의 취급을 일부 위탁하고 있습니다. 위탁처리 기관 및 위탁업무의 내용은 아래를 참조해 주세요.
              </Sub3>

              <table className="table-auto">
                <thead>
                  <tr>
                    <th>위탁 받는자(수탁자)</th>
                    <th>위탁업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Amazon Web Service, Inc</td>
                    <td>컨텐츠 보관을 위한 Public Cloud Service 제공</td>
                  </tr>
                </tbody>
              </table>

              <Sub3 align="left" color="gray700">
                2) 법률에 특별한 규정이 있거나, 수사 목적으로 법률에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우, 회사에서 개인정보 제출 의무가 발생함으로 개인정보를 제공합니다. <br />
                이용자는 회사의 개인정보보호 책임자 및 개인정보보호 담당자를 통해 개인정보의 국외 이전을 거부할 수 있습니다. 이용자가 개인정보의 국외 이전을 거부하는 경우 회사는 해당 이용자의 개인정보를 국외 이전 대상에서 제외합니다. 다만, 이 경우 회사의 서비스 중 개인정보 국외 이전이 
              </Sub3>
            </div>
 
            <div>
              <Body2 align="left">3. 개인정보 보유 및 이용기간</Body2>

              <Sub3 align="left" color="gray700">
                회사는 원칙적으로 회원의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.
              </Sub3>

              <Sub3 align="left" color="gray700">
                단, 내부 방침에 따른 경우와 법령에서 일정 기간 정보 보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.
              </Sub3>

              <Sub3 align="left" color="gray700">
                1) 내부 방침에 의한 보관
              </Sub3>

              <Sub3 align="left" color="gray700">- 부정이용기록은 부정 이용 방지를 위해 1년간 보관됩니다.</Sub3>
              <Sub3 align="left" color="gray700">- 상담 문의는 이력 확인 및 분쟁 발생에 대한 소명자료 활용을 위해 요청사항 처리 완료 후 1년간 보관됩니다.</Sub3>
              <Sub3 align="left" color="gray700">※ 단, 소비자 대상 재화나 용역의 거래 또는 통신판매와 같은 비대면 판매와 관련한 상담 문의는 전자상거래법에 따라 3년간 보관됩니다.</Sub3>

              <Sub3 align="left" color="gray700">
                2) 관련 법령에 의한 보관
              </Sub3>

              <Sub3 align="left" color="gray700">- 계약 또는 청약철회 등에 관한 기록 보유 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</Sub3>
              <Sub3 align="left" color="gray700">- 대금결제 및 재화 등의 공급에 관한 기록 보유 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</Sub3>
              <Sub3 align="left" color="gray700">- 소비자 불만 또는 분쟁처리에 관한 기록 보유 : 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</Sub3>
              <Sub3 align="left" color="gray700">- 방문에 관한 기록 보유 : 3개월 (통신비밀보호법)</Sub3>
            </div>
 
            <div>
              <Body2 align="left">4. 개인정보 파기 </Body2>

              <Sub3 align="left" color="gray700">
                개인정보 파기 시에는 재생이 불가능한 방법으로 파기하고 있습니다. 또한 법령에서 보존의무를 부과한 정보에 대해서도 해당 기간 경과 후 지체없이 재생이 불가능한 방법으로 파기합니다.
              </Sub3>

              <Sub3 align="left" color="gray700">
                전자적 파일 형태의 경우 복구 및 재생이 되지 않도록 기술적인 방법을 이용하여 안전하게 삭제하며, 출력물 등은 분쇄하거나 소각하는 방식 등으로 파기합니다.
              </Sub3>
            </div>
 
            <div>
              <Body2 align="left">5. 이용자의 권리</Body2>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">가.</Sub3>
                  <Sub3 align="left" color="gray700">
                    회원은 언제든지 인터뷰엑스 서비스 내에서 자신의 개인정보를 조회ㆍ수정ㆍ삭제할 수 있으며, 자신의 개인정보에 대한 열람을 요청할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">나.</Sub3>
                  <Sub3 align="left" color="gray700">
                    이용자는 언제든지 개인정보 처리의 정지를 요청할 수 있으며, 법률에 특별한 규정이 있는 등의 경우에는 처리정지 요청을 거부할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">다.</Sub3>
                  <Sub3 align="left" color="gray700">
                    회원은 언제든지 개인정보의 수집 및 이용 동의를 철회할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              {/* <Sub3 align="left" color="gray700">
                - 앱 : 앱 우측상단 “≡” > 설정 > 계정관리 > 회원 탈퇴
              </Sub3> */}
              <Sub3 align="left" color="gray700">
                - 웹 : 좌측 하단(이름) &gt; 계정 설정 &gt; 회원 탈퇴
              </Sub3>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">라.</Sub3>
                  <Sub3 align="left" color="gray700">
                    회원이 개인정보 오류에 대한 정정 또는 삭제를 요청한 경우, 정정 또는 삭제를 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">마.</Sub3>
                  <Sub3 align="left" color="gray700">
                    이용자의 권리는 “설정” 페이지 등에서 직접 처리하거나, “문의하기”를 통해 요청할 수 있습니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">바.</Sub3>
                  <Sub3 align="left" color="gray700">
                    이용자의 권리 행사는 정보주체의 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 개인정보 처리 방법에 관한 고시에 따른 “위임장”을 제출하여야 합니다.
                  </Sub3>
                </li>
              </CircleNumber>
            </div>
 
            <div>
              <Body2 align="left">6. 쿠키운영</Body2>

              <Sub3 align="left" color="gray700">
                쿠키란 서비스 이용 중 회원의 저장장치에 전송하는 특별한 텍스트 파일(text file)을 말합니다. 쿠키는 웹사이트의 서버(server)에서만 읽어 들일 수 있는 형태로 전송되며 개인이 사용하는 브라우저(browser)의 디렉터리(directory) 하위에 저장됩니다. 모바일 애플리케이션과 같이 쿠키 기술을 사용할 수 없는 경우에는 쿠키와 유사한 기능을 수행하는 기술(광고식별자 등)을 사용할 수도 있습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">가. 쿠키의 사용 목적</Sub1>

              <Sub3 align="left" color="gray700">
                인터뷰엑스 서비스가 쿠키를 통해 수집하는 정보는 '수집하는 개인정보의 항목'과 같으며 '개인정보의 수집 및 이용목적' 외의 용도로는 이용되지 않습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">나. 쿠키 설정 거부</Sub1>

              <Sub3 align="left" color="gray700">
                이용자는 쿠키에 대한 선택권을 가지고 있습니다. 웹 브라우저 옵션(option)을 선택함으로써 모든 쿠키의 허용, 동의를 통한 쿠키의 허용, 모든 쿠키의 차단을 스스로 결정할 수 있습니다. 단, 쿠키 저장을 거부할 경우에는 로그인이 필요한 일부 서비스를 이용하지 못할 수도 있습니다.
              </Sub3>
            </div>
 
            <div>
              <Body2 align="left">7. 행태정보의 운영</Body2>
              <Sub3 align="left" color="gray700">
                행태정보란, 웹 사이트 방문 이력, 앱 사용 이력, 구매 및 검색 이력 등 이용자의 관심, 흥미, 기호 및 성향 등을 파악하고 분석할 수 있는 온라인상의 이용자 활동정보를 말합니다. 회사는 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 온라인 행태정보를 수집 및 이용하고 있습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">가. 행태정보의 수집 및 처리 안내</Sub1>

              <Sub3 align="left" color="gray700">
                회사에서 운영하는 서비스에서 다음과 같이 행태정보를 수집하며, 온라인 맞춤형 광고사업자가 행태정보를 수집 및 처리하도록 허용하고 있습니다.
              </Sub3>

              <table className="table-auto">
                <tbody>
                  <tr>
                    <th>수집 및 처리하는 행태정보 항목</th>
                    <td>이용자의 웹·앱 서비스 방문 기록, 검색·클릭 등 사용기록, 광고식별자</td>
                  </tr>
                  <tr>
                    <th>행태정보 수집 및 처리 방법</th>
                    <td>
                      - 쿠키 설치 및 운용<br />
                      - 웹·앱 사이트 방문 또는 앱 실행 시 생성 정보 수집 툴 등을 통해 자동 수집 전송
                    </td>
                  </tr>
                  <tr>
                    <th>행태정보를 수집(툴) 및 처리하는 광고 사업자</th>
                    <td>Google LLC(GA)</td>
                  </tr>
                  <tr>
                    <th>행태정보 수집 및 처리 목적</th>
                    <td>이용자의 관심, 성향에 기반한 개인 맞춤형 상품 추천 서비스(광고포함)를 제공</td>
                  </tr>
                  <tr>
                    <th>보유 및 이용기간</th>
                    <td>Google LLC: 14개월 보유한 후 파기</td>
                  </tr>
                </tbody>
              </table>

              <Sub3 align="left" color="gray700">
                회사는 온라인 맞춤형 광고 등에 필요한 비식별화 처리된 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.
              </Sub3>

              <Sub3 align="left" color="gray700">
                회사는 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 맞춤형 광고를 제공하지 않습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">나. 웹브라우저 및 모바일을 통한 맞춤형 광고 차단/허용</Sub1>

              <Sub3 align="left" color="gray700">
                정보주체는 웹브라우저의 쿠키 설정 변경 및 부가기능 설치 등을 통해 온라인 맞춤형 광고를 일괄적으로 차단 · 허용할 수 있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.
              </Sub3>

              <Sub3 align="left" color="gray700">1) 웹브라우저</Sub3>

              <CircleNumber>
                <li>
                  <Sub3 align="left" color="gray700">
                    - Internet Explorer : 메뉴 &gt; 도구 &gt; 인터넷옵션 &gt; 일반 &gt; 검색 기록 &gt; '삭제' 및 '설정'
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    - Chrome : 메뉴 &gt; 설정 &gt; '개인정보 및 보안' &gt; '쿠키 및 기타 사이트 데이터' &gt; 쿠키 차단 및 데이터 삭제
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    - Safari : 환경설정 &gt; '크로스 사이트 추적 방지' 및 '모든 쿠키 차단'
                  </Sub3>
                </li>
              </CircleNumber>

              <Sub3 align="left" color="gray700">2) 모바일</Sub3>

              <CircleNumber>
                <li>
                  <Sub3 align="left" color="gray700">
                    - Android: 홈 &gt; 설정 &gt; Google &gt; 광고 &gt; 광고 맞춤설정 선택 해제 (ON)
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    - iPhone: 홈 &gt; 설정 &gt; 개인 정보 보호 &gt; 추적 &gt; 앱이 추적을 요청하도록 허용 (OFF)
                  </Sub3>
                </li>
              </CircleNumber>
            </div>
 
            <div>
              <Body2 align="left">8. 회원의 권리와 의무</Body2>

              <Sub3 align="left" color="gray700">
                회원은 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를 포함한 회원의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 훼손하지 않도록 유의해 주십시오.<br />
                회원이 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 회원 자신에게 있습니다. 회원은 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방하여야 할 의무가 있습니다.<br />
                회원이 위 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 『개인정보 보호법』, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 등 관련 법률에 의해 처벌받을 수 있습니다.
              </Sub3>
            </div>
 
            <div>
              <Body2 align="left">9. 개인정보의 기술적, 관리적 보호대책</Body2>

              <Sub3 align="left" color="gray700">
                회사는 회원의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">가. 해킹 등에 대비한 대책</Sub1>

              <Sub3 align="left" color="gray700">
                회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 회원의 개인정보나 자료가 유출되거나 손상되지 않도록 방지하고 있으며, 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">나. 개인정보취급자의 최소화 및 교육</Sub1>

              <Sub3 align="left" color="gray700">
                회사의 개인정보취급자는 해당 업무를 직접적으로 수행하는 담당자에 한정시키고 있으며 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 회사의 개인정보보호 정책 및 개인정보 처리방침 등 관련 규정의 준수를 항상 강조하고 있습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">다. 개인정보보호전담기구의 운영</Sub1>

              <Sub3 align="left" color="gray700">
                회사는 사내 개인정보보호전담기구 등을 통하여 회사의 개인정보보호정책 및 개인정보 처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고 있습니다. 단, 회원 본인의 부주의나 회사의 고의 또는 중대한 과실이 아닌 사유로 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다.
              </Sub3>

              <Sub1 align="left" color="gray700">라. 개인정보의 기술적/관리적 보호 대책</Sub1>

              <CircleNumber>
                <li>
                  <Sub3 align="left" color="gray700">
                  •	AI 패널 데이터는 암호화되어 저장 및 관리됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    •	AI 모델 학습 시 사용되는 개인정보는 익명화 또는 가명처리되어 사용됩니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    •	최신 보안 기술을 적용하여 외부로부터의 무단 접근을 차단하고 있습니다. 
                  </Sub3>
                </li>
              </CircleNumber>
            </div>
 
            <div>
              <Body2 align="left">10. 개인정보 보호책임자 및 담당자의 연락처</Body2>

              <Sub3 align="left" color="gray700">
                회사의 서비스를 이용하며 발생하는 모든 개인정보 관련 민원을 개인정보 보호책임자 혹은 담당부서로 신고할 수 있습니다. 회사는 회원의 신고사항에 대하여 신속하게 답변을 드릴 것입니다.
              </Sub3>

              <Sub1 align="left" color="gray700">개인정보 보호책임자</Sub1>

              <Sub3 align="left" color="gray700">
                이 름 : 이선근<br />
                소 속 : AI 솔루션 개발팀<br />
                전 화 : 031-216-5930<br />
                이메일 : sungeun_lee@userconnect.kr
              </Sub3>

              <Sub3 align="left" color="gray700">
                기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
              </Sub3>

              <CircleNumber>
                <li>
                  <Sub3 align="left" color="gray700">
                    개인정보침해신고센터 (https://privacy.kisa.or.kr / 국번없이 118)
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    대검찰청 사이버수사과 (https://www.spo.go.kr / 국번없이 1301)
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    경찰청 사이버수사국 (https://ecrm.cyber.go.kr / 국번없이 182)
                  </Sub3>
                </li>
              </CircleNumber>
            </div>
 
            <div>
              <Body2 align="left">11. 개인위치정보의 처리 </Body2>

              <Sub1 align="left" color="gray700">가. 개인위치정보의 처리목적 및 보유기간</Sub1>

              <Sub3 align="left" color="gray700">
                회사는 위치기반서비스 제공을 위해 필요한 최소한의 기간 동안 개인위치정보를 보유 및 이용하며, 위치기반서비스에서 개인위치정보를 일회성 이용 후 지체없이 파기합니다.
              </Sub3>

              <Sub1 align="left" color="gray700">나. 개인위치정보 수집·이용·제공사실 확인자료의 보유근거 및 보유기간</Sub1>

              <Sub3 align="left" color="gray700">
                회사는 위치정보의 보호 및 이용 등에 관한 법률 제16조 제2항에 근거하여 개인위치정보주체의 민원처리를 목적으로 위치정보 수집·이용·제공사실 확인자료를 위치정보시스템에 자동으로 기록하며, 해당 자료는 6개월간 보관합니다.
              </Sub3>

              <Sub1 align="left" color="gray700">다. 개인위치정보의 파기 절차 및 방법</Sub1>

              <Sub3 align="left" color="gray700">
                회사는 개인위치정보의 처리목적이 달성된 경우, 개인위치정보를 재생이 불가능한 방법으로 파기하고 있습니다. 전자적 파일 형태의 경우 복구 및 재생이 되지 않도록 기술적인 방법을 이용하여 안전하게 삭제하며, 출력물 등은 분쇄하거나 소각하는 방식 등으로 파기합니다.
              </Sub3>

              <Sub1 align="left" color="gray700">라. 개인위치정보의 제3자 제공 및 통보에 관한 사항</Sub1>

              <Sub3 align="left" color="gray700">
                회사는 개인위치정보주체의 동의 없이 당해 개인위치정보주체의 개인위치정보를 제3자에게 제공하지 아니하며, 제3자 제공 서비스를 제공하는 경우에는 제공 받는 자 및 제공 목적을 사전에 개인위치정보주체에게 고지하고 동의를 받습니다.
              </Sub3>

              <Sub3 align="left" color="gray700">
                회사는 개인위치정보를 개인위치정보주체가 지정하는 제3자에게 제공하는 경우에는 개인위치정보를 수집한 당해 통신 단말장치로 매회 개인위치정보주체에게 제공받는 자, 제공일시 및 제공목적을 즉시 통보합니다. 단, 아래에 해당하는 경우에는 개인위치정보주체가 미리 특정하여 지정한 통신 단말장치 또는 전자우편주소로 통보합니다.                
              </Sub3>

              <CircleNumber>
                <li>
                  <Sub3 align="left" color="gray700">
                    - 개인위치정보를 수집한 당해 통신단말장치가 문자, 음성 또는 영상의 수신기능을 갖추지 아니한 경우
                  </Sub3>
                </li>
                <li>
                  <Sub3 align="left" color="gray700">
                    - 개인위치정보주체가 온라인 게시 등의 방법으로 통보할 것을 미리 요청한 경우
                  </Sub3>
                </li>
              </CircleNumber>

              <Sub1 align="left" color="gray700">마. 8세 이하의 등의 보호의무자 권리·의무 및 그 행사방법</Sub1>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">1)</Sub3>
                  <Sub3 align="left" color="gray700">
                    “회사“는 아래의 경우에 해당하는 자(이하 “8세 이하의 아동”등이라 한다)의 보호의무자가 8세 이하의 아동 등의 생명 또는 신체의 보호를 위하여 개인위치정보의 이용 또는 제공에 동의하는 경우에는 본인의 동의가 있는 것으로 봅니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Sub3 align="left" color="gray700">
                - 8세 이하의 아동
              </Sub3>
              <Sub3 align="left" color="gray700">
                - 금치산자
              </Sub3>
              <Sub3 align="left" color="gray700">
                - 장애인복지법제2조제2항제2호의 규정에 의한 정신적 장애를 가진 자로서 장애인 고용 촉진 및 직업재활법 제2조제2호의 규정에 의한 중증장애인에 해당하는 자(장애인복지법 제29조의 규정에 의하여 장애인등록을 한 자에 한한다)
              </Sub3>

              <CircleNumber>
                <li>
                  <Sub3 color="gray700">2)</Sub3>
                  <Sub3 align="left" color="gray700">
                    8세 이하의 아동 등의 생명 또는 신체의 보호를 위하여 개인위치정보의 이용 또는 제공에 동의를 하고자 하는 보호의무자는 서면동의서에 보호의무자임을 증명하는 서면을 첨부하여 회사에 제출하여야 합니다.
                  </Sub3>
                </li>
                <li>
                  <Sub3 color="gray700">3)</Sub3>
                  <Sub3 align="left" color="gray700">
                    보호의무자는 8세 이하의 아동 등의 개인위치정보 이용 또는 제공에 동의하는 경우 개인위치정보주체 권리의 전부를 행사할 수 있습니다.
                  </Sub3>
                </li>
              </CircleNumber>

              <Sub1 align="left" color="gray700">바. 위치정보 관리책임자의 정보</Sub1>

              <Sub3 align="left" color="gray700">
                회사의 위치정보 관리책임자는 위 개인정보 보호책임자가 겸직하고 있습니다.
              </Sub3>
            </div>
 
            <div>
              <Body2 align="left">12. 기타 </Body2>

              <Sub3 align="left" color="gray700">
                인터뷰엑스 서비스 내에 링크되어 있는 웹사이트 등 타 서비스들이 개인정보를 수집하는 행위에 대해서는 본 인터뷰엑스 서비스 개인정보 처리방침이 적용되지 않음을 알려드립니다.
              </Sub3>
            </div>
 
            <div>
              <Body2 align="left">13. 고지의 의무 </Body2>

              <Sub3 align="left" color="gray700">
                현 개인정보 처리방침 내용 추가, 삭제 및 수정이 있을 시에는 시행일 최소 7일전부터 인터뷰엑스 웹사이트 또는 서비스 내 '공지사항'을 통해 공지할 것입니다. 다만, 이용자 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 공지하도록 하며 필요 시 이용자의 동의를 다시 받을 수도 있습니다.
              </Sub3>

              <Sub3 align="left" color="gray700">공고일자 : 2025. 01. 23</Sub3>
              <Sub3 align="left" color="gray700">시행일자 : 2025. 01. 23</Sub3>
            </div>
         </TermsWrap>

        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePolicy;


const TermsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .table-auto {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    border:1px solid #ddd;

    th {
      font-size: 0.88rem;
      font-weight: 600;
      text-align: center;
      color: #666;
      padding: 10px 0;
      border: 1px solid #ddd;
      background: #f2f2f2;
    }

    td {
      font-size: 0.88rem;
      color: #666;
      text-align: left;
      vertical-align: middle;
      padding: 10px;
      border: 1px solid #ddd;
    }
  }
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
