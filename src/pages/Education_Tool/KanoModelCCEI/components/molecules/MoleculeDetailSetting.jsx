import React from 'react';
import styled from 'styled-components';
import { Body2 } from '../../../../../assets/styles/Typography';
import { SelectBox, SelectBoxTitle, SelectBoxList, SelectBoxItem } from '../../../../../assets/styles/InputStyle';
import { palette } from '../../../../../assets/styles/Palette';
import images from '../../../../../assets/styles/Images';

const MoleculeDetailSetting = ({
  customPersonaForm,
  selectedValues,
  selectBoxStates,
  toggleSelectBox,
  handleFormChange,
  handlePurposeSelect
}) => {
  return (
    <DetailSettingContainer>
      <SettingColumn>
        <Body2 color="gray700" align="left">
          성별
        </Body2>
        <SelectBox>
          <SelectBoxTitle
            Small
            onClick={() => toggleSelectBox("gender")}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}>
              {customPersonaForm.gender && customPersonaForm.gender !== "상관없음" && (
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
              <Body2 color={customPersonaForm.gender ? "gray800" : "gray300"}>
                {customPersonaForm.gender === "상관없음" 
                  ? "상관없음"
                  : customPersonaForm.gender === "male"
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
                transform: selectBoxStates.gender ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </SelectBoxTitle>

          {selectBoxStates.gender && (
            <SelectBoxList>
              <SelectBoxItem onClick={() => {
                handleFormChange("gender", "상관없음");
                handlePurposeSelect("상관없음", "gender");
              }}>
                <Body2 color="gray700" align="left">상관없음</Body2>
              </SelectBoxItem>
              <SelectBoxItem onClick={() => {
                handleFormChange("gender", "male");
                handlePurposeSelect("남성", "gender");
              }}>
                <Body2 color="gray700" align="left">남성</Body2>
              </SelectBoxItem>
              <SelectBoxItem onClick={() => {
                handleFormChange("gender", "female");
                handlePurposeSelect("여성", "gender");
              }}>
                <Body2 color="gray700" align="left">여성</Body2>
              </SelectBoxItem>
            </SelectBoxList>
          )}
        </SelectBox>
      </SettingColumn>

      <SettingColumn>
        <Body2 color="gray700" align="left">
          연령
        </Body2>
        <SelectBox>
          <SelectBoxTitle Small onClick={() => toggleSelectBox("age")}>
            <Body2 color={selectedValues.age ? "gray800" : "gray300"}>
              {selectedValues.age || "선택해주세요"}
            </Body2>
            <images.ChevronDown
              width="24px"
              height="24px"
              color={palette.gray500}
              style={{
                transform: selectBoxStates.age ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </SelectBoxTitle>

          {selectBoxStates.age && (
            <SelectBoxList>
              {[
                "상관없음",
                "10대",
                "20대",
                "30대",
                "40대",
                "50대",
                "60대 이상",
              ].map((age) => (
                <SelectBoxItem
                  key={age}
                  onClick={() => {
                    handleFormChange("age", [age]);
                    handlePurposeSelect(age, "age");
                  }}
                >
                  <Body2 color="gray700" align="left">{age}</Body2>
                </SelectBoxItem>
              ))}
            </SelectBoxList>
          )}
        </SelectBox>
      </SettingColumn>

      <SettingColumn>
        <Body2 color="gray700" align="left">
          거주지역
        </Body2>
        <SelectBox>
          <SelectBoxTitle Small onClick={() => toggleSelectBox("residence")}>
            <Body2 color={selectedValues.residence ? "gray800" : "gray300"}>
              {selectedValues.residence || "선택해주세요"}
            </Body2>
            <images.ChevronDown
              width="24px"
              height="24px"
              color={palette.gray500}
              style={{
                transform: selectBoxStates.residence ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </SelectBoxTitle>

          {selectBoxStates.residence && (
            <SelectBoxList>
              {[
                "상관없음",
                "수도권 (Seoul, Gyeonggi, Inchen)",
                "광역시 (Busan, Daegu, Daejeon, etc)",
                "지방 도시 및 농어촌 (Other residence) ",
              ].map((residence) => (
                <SelectBoxItem
                  key={residence}
                  onClick={() => {
                    handleFormChange("residence", [residence]);
                    handlePurposeSelect(residence, "residence");
                  }}
                >
                  <Body2 color="gray700" align="left">{residence}</Body2>
                </SelectBoxItem>
              ))}
            </SelectBoxList>
          )}
        </SelectBox>
      </SettingColumn>

      <SettingColumn>
        <Body2 color="gray700" align="left">
          소득 수준
          {/* <span style={{ color: "red" }}>*</span> */}
        </Body2>
        <SelectBox>
          <SelectBoxTitle Small onClick={() => toggleSelectBox("income")}>
            <Body2 color={selectedValues.income ? "gray800" : "gray300"}>
              {selectedValues.income || "선택해주세요"}
            </Body2>
            <images.ChevronDown
              width="24px"
              height="24px"
              color={palette.gray500}
              style={{
                transform: selectBoxStates.income ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </SelectBoxTitle>

          {selectBoxStates.income && (
            <SelectBoxList>
              {[
                "상관없음",
                "상 (high income level)",
                "중상 (upper-middle income level)",
                "중 (middle income level)",
                "중하 (lower-middle income level)",
                "하 (low income level)",
              ].map((income) => (
                <SelectBoxItem
                  key={income}
                  onClick={() => {
                    handleFormChange("income", [income]);
                    handlePurposeSelect(income, "income");
                  }}
                >
                  <Body2 color="gray700" align="left">{income}</Body2>
                </SelectBoxItem>
              ))}
            </SelectBoxList>
          )}
        </SelectBox>
      </SettingColumn>
    </DetailSettingContainer>
  );
};


const DetailSettingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 16px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  background-color: white;
  width: 100%; // 전체 너비를 사용하도록 추가
  box-sizing: border-box; // 패딩이 너비에 포함되도록 설정
`;

const SettingColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export default MoleculeDetailSetting;