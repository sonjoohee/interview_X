import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Body1, Caption1, Sub1, Sub2_1 } from "../../../../../assets/styles/Typography";
import { palette } from "../../../../../assets/styles/Palette";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import EditIcon from "../../../../../assets/images/Profile_Edit.png";
import DeleteIcon from "../../../../../assets/images/Profile_Delete.png";
import ExpandIcon from "../../../../../assets/images/Profile_Up.png";
import AiModify from "../../../../../assets/images/Profile_Ai.png";
import { fill } from "three/src/extras/TextureUtils.js";
// import {
//   Pencil,
//   Trash,
//   ChevronUp,
//   ChevronDown,
// } from "../../../../../assets/icons";

const MoleculeIdeaSelectForm = ({ ideas, setIdeas, readOnly = false, onAiRefine, aiRefineLoading = {}, selectedIdeas = [], onSelectionChange }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (ideas.length === 0 && !readOnly) {
      setIdeas(
        Array(10)
          .fill(null)
          .map((_, index) => ({ 
            title: `아이디어 ${index + 1}`, 
            description: `아이디어 ${index + 1}에 대한 설명입니다.`, 
            isCompleted: true 
          }))
      );
    }
  }, [ideas, setIdeas, readOnly]);

  const handleAddField = () => {
    if (readOnly || ideas.length >= 20) return;
    const newIndex = ideas.length;
    setIdeas([...ideas, { title: "", description: "", isCompleted: false }]);
    setEditingIndex(newIndex);
    setExpandedIndex(newIndex);
  };

  const handleInputChange = (index, field, value) => {
    if (readOnly) return;
    const newIdeas = [...ideas];
    newIdeas[index][field] = value;
    setIdeas(newIdeas);
  };

  const handleComplete = (index) => {
    if (readOnly) return;
    const newIdeas = [...ideas];
    newIdeas[index].isCompleted = true;
    setIdeas(newIdeas);
    setEditingIndex(null);
    setExpandedIndex(null);
  };

  const handleEdit = (index) => {
    if (readOnly) return;
    setEditingIndex(index);
    setExpandedIndex(index);
  };

  const handleSelection = (index) => {
    if (readOnly || !onSelectionChange) return;
    const title = ideas?.[index]?.title ?? "";
    if (!title) return; // 빈 제목은 선택 불가 (안전장치)
    onSelectionChange(title);
  };

  const toggleExpand = (index) => {
    if (ideas[index].isCompleted || readOnly) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  const isCompleteButtonDisabled = (idea, index) => {
    return !idea.title || !idea.description || readOnly || aiRefineLoading[index];
  };

  return (
    <FormContainer>
      {ideas.map((idea, index) => {
        const isEditing = !readOnly && editingIndex === index;
        const isSelected = selectedIdeas.includes(idea.title);
        return (
          <IdeaCard key={index} isCompleted={idea.isCompleted || readOnly}>
            <Header>
              <CheckboxContainer>
                <CheckCircle
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelection(index)}
                  disabled={readOnly || isEditing}
                />
              </CheckboxContainer>
              <HeaderContent
                onClick={() => !isEditing && toggleExpand(index)}
              >
                {isEditing ? (
                  <TitleInputContainer>
                    <TitleInput
                      placeholder="아이디어 제목을 입력해주세요"
                      value={idea.title}
                      onChange={(e) => handleInputChange(index, "title", e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      PrimaryLightest
                      Large
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComplete(index);
                      }}
                      disabled={isCompleteButtonDisabled(idea, index)}
                      style={{
                        width: "64px",
                        height: "32px",
                        color: isCompleteButtonDisabled(idea, index) ? palette.gray300 : palette.primary,
                        background: isCompleteButtonDisabled(idea, index) ? palette.gray100 : palette.primaryLightest,
                        border: "none",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                       <path
                         d="M1.41443 3.90098L3.87917 6.36257L9.41443 0.804932"
                         stroke={isCompleteButtonDisabled(idea, index) ? palette.gray300 : palette.primary}
                         strokeWidth="1.16667"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                       />
                      </svg>
                      완료
                    </Button>
                  </TitleInputContainer>
                ) : (
                  <>
                    <Body1>{idea.title}</Body1>
                    <IconGroup>
                      {!readOnly && (
                        <IconButton>
                          <img src={EditIcon} 
                          alt="edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(index);
                          }}
                          style={{ width: "24px", height: "24px" }} />
                        </IconButton>
                      )}

                      <IconButton
                        onClick={e => {
                          e.stopPropagation();
                          toggleExpand(index);
                        }}
                      >
                        {expandedIndex === index ? (
                          // 펼쳐진 상태: ↑ 위로 향한 PNG
                          <img
                            src={ExpandIcon}
                            alt="collapse"
                            width={24}
                            height={24}
                          />
                        ) : (
                          // 접힌 상태: ↓ 아래로 향한 SVG
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.57727 10.209L12.5 16.3995L18.4227 10.209" stroke="#226FFF" strokeWidth="1.37143" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </IconButton>
                    </IconGroup>
                  </>
                )}
              </HeaderContent>
            </Header>

            {isEditing && !readOnly && (
              <Content>
                <TextareaContainer>
                  <Textarea
                    placeholder="아이디어 및 기능에 대한 설명을 입력해주세요."
                    value={idea.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    disabled={aiRefineLoading[index]}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <AiRefineButton 
                    onClick={() => onAiRefine && !aiRefineLoading[index] && idea.title && idea.description && onAiRefine(index)}
                    disabled={aiRefineLoading[index] || !idea.title || !idea.description}
                    style={{ 
                      opacity: (aiRefineLoading[index] || !idea.title || !idea.description) ? 0.6 : 1,
                      cursor: (aiRefineLoading[index] || !idea.title || !idea.description) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {aiRefineLoading[index] ? (
                      <>
                        <LoadingSpinner /> 
                        <Sub2_1 color="gray500">다듬는 중...</Sub2_1>
                      </>
                    ) : (
                      <>
                        <img src={AiModify} 
                        alt="ai refine"
                        style={{ width: "14px", height: "14px" }} />
                        <Sub2_1 color="primary">AI 다듬기</Sub2_1>
                      </>
                    )}
                  </AiRefineButton>
                </TextareaContainer>
              </Content>
            )}

            {expandedIndex === index && editingIndex !== index && (
              <Content>
                <Description>{idea.description}</Description>
              </Content>
            )}
          </IdeaCard>
        );
      })}
      {!readOnly && ideas.length < 20 && (
        <Button
          Large
          Outline
          onClick={handleAddField}
          style={{ width: "100%", marginTop: "8px" }}
        >
          + 추가하기
        </Button>
      )}
    </FormContainer>
  );
};

export default MoleculeIdeaSelectForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const IdeaCard = styled.div`
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  padding: 16px;
  background-color: ${(props) =>
    props.isCompleted ? palette.white : palette.white};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  gap: 12px;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${palette.gray700};
  background: transparent;
  
  &::placeholder {
    color: ${palette.gray400};
  }
`;

const TitleInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0px;
`;

const CompleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 12px;
`;

const Input = styled.input`
  width: 100%;
  align-items: start;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${palette.gray700};
  outline: none;
`;

const TextareaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px 12px 30px 12px; /* 하단 패딩으로 AI 다듬기 버튼 영역 확보 */
  border: 1px solid ${palette.outlineGray};
  border-radius: 4px;
  min-height: 113px;
  max-height: 200px; /* 최대 높이 제한 */
  resize: vertical;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${palette.gray700};
  outline-color: ${palette.primary};
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: thin;
  margin-top: 12px;
  
  /* 텍스트가 하단 버튼 영역에 들어가지 않도록 스크롤 영역 제한 */
  scroll-padding-bottom: 60px;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${palette.gray100};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${palette.gray300};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${palette.gray400};
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const AiRefineButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: white;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${palette.gray50};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const Description = styled(Body1)`
  text-align: left;
  border: 1px solid ${palette.outlineGray};
  border-radius: 4px;
  padding: 8px 12px 8px 12px;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  font-weight: 400;
  margin-top: 12px;
  color: ${palette.gray700};
`;

const LoadingSpinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid ${palette.gray200};
  border-top: 2px solid ${palette.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CheckCircle = styled.input`
  appearance: none;
  display: block !important;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;

  background-image: ${(props) =>
    props.checked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`; 