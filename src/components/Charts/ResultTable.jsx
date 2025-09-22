import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

/**
 * 아이디어 평가 결과를 테이블 형태로 보여주는 컴포넌트
 * 각 아이디어의 순위, 이름, 카노모델 속성, 비율을 표시
 * 
 * @param {Array} data - 테이블에 표시할 데이터 배열
 * @param {number} headerColumnGap - 헤더 영역의 '아이디어 명'과 '카노모델 속성' 사이의 간격 (px 단위)
 * @param {number} bodyColumnGap - 본문 영역의 아이디어명과 카노모델 속성 사이의 간격 (px 단위)
 */
const ResultTable = ({
  data,
  headerColumnGap = 308,
  bodyColumnGap = 180
}) => {
  return (
    <TableContainer>
      <TableContent>
        {/* 헤더 영역 */}
        <TableHeader>
          <RankHeaderCell>
            <HeaderText>순위</HeaderText>
          </RankHeaderCell>
          <IdeaHeaderArea gap={headerColumnGap}>
            <IdeaHeaderCell>
              <HeaderText>아이디어 명</HeaderText>
            </IdeaHeaderCell>
            <AttributeHeaderCell>
              <HeaderText>카노모델 속성</HeaderText>
            </AttributeHeaderCell>
          </IdeaHeaderArea>
          <PercentageHeaderCell>
            <HeaderText>비율 (100%)</HeaderText>
          </PercentageHeaderCell>
        </TableHeader>
        
        {/* 구분선 */}
        <Divider />
        
        {/* 데이터 행 */}
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <TableRow>
              <RankCell>
                <CellText>{item.rank}</CellText>
              </RankCell>
              <IdeaArea gap={bodyColumnGap}>
                <IdeaCell>
                  <CellText>{item.ideaName}</CellText>
                </IdeaCell>
                <AttributeCell>
                  <CellText>{item.kanoAttribute}</CellText>
                </AttributeCell>
              </IdeaArea>
              <PercentageCell>
                <CellText>{item.percentage}%</CellText>
              </PercentageCell>
            </TableRow>
            {index < data.length - 1 && <RowDivider />}
          </React.Fragment>
        ))}
      </TableContent>
    </TableContainer>
  );
};

// 스타일 컴포넌트
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 820px;
  max-width: 820px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  background-color: #FFFFFF;
  padding: 24px 24px 24px 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const HeaderText = styled.span`
  font-family: 'Pretendard', poppins;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.19;
  letter-spacing: -0.03em;
  color: #323232;
`;

const RankHeaderCell = styled.div`
  width: 90px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0;
`;

const IdeaHeaderArea = styled.div`
  display: flex;
  flex: 1;
  gap: ${props => props.gap}px;
`;

const IdeaHeaderCell = styled.div`
  text-align: left;
`;

const AttributeHeaderCell = styled.div`
  text-align: left;
`;

const PercentageHeaderCell = styled.div`
  text-align: right;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #DDDDDD;
  margin: 16px 0;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const CellText = styled.span`
  font-family: 'Pretendard', poppins;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #666666;
`;

const RankCell = styled.div`
  width: 90px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0;
`;

const IdeaArea = styled.div`
  display: flex;
  flex: 1;
  gap: ${props => props.gap}px;
`;

const IdeaCell = styled.div`
  width: 200px;
  text-align: left;
`;

const AttributeCell = styled.div`
  text-align: left;
`;

const PercentageCell = styled.div`
  min-width: 50px;
  text-align: right;
`;

const RowDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: transparent;
  margin: 8px 0;
`;

export default ResultTable; 