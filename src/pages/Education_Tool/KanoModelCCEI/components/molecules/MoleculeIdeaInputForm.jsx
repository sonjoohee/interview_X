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

const MoleculeIdeaInputForm = ({ ideas, setIdeas, readOnly = false, onAiRefine, aiRefineLoading = {} }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (ideas.length === 0 && !readOnly) {
      setIdeas(
        Array(10)
          .fill(null)
          .map(() => ({ title: "", description: "", isCompleted: false }))
      );
    }
  }, [ideas, setIdeas, readOnly]);

  const handleAddField = () => {
    if (readOnly || ideas.length >= 20) return;
    setIdeas([...ideas, { title: "", description: "", isCompleted: false }]);
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
    setExpandedIndex(index);
  };

  const handleEdit = (index) => {
    if (readOnly) return;
    setEditingIndex(index);
    setExpandedIndex(index);
  };

  const handleDelete = (index) => {
    if (readOnly) return;
    const newIdeas = ideas.filter((_, i) => i !== index);
    setIdeas(newIdeas);
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
        const isEditing = !readOnly && 
          (editingIndex === index ||
          (!idea.isCompleted && editingIndex === null && index === 0));
        return (
          <IdeaCard key={index} isCompleted={idea.isCompleted || readOnly}>
            <Header
              onClick={() =>
                readOnly || idea.isCompleted ? toggleExpand(index) : setEditingIndex(index)
              }
            >
              {idea.isCompleted || readOnly ? (
                <>
                     {isEditing ? null : (
                 <>
                <Body1>{idea.title}</Body1>
                  {!readOnly && (
                    <IconGroup>
                      <IconButton>
                      <img src={EditIcon} 
                      alt="edit"
                      onClick={() => handleEdit(index)}
                      style={{ width: "24px", height: "24px" }} />
                      </IconButton>

                      <IconButton>
                      <img src={DeleteIcon} 
                      alt="delete"
                      onClick={() => handleDelete(index)}
                      style={{ width: "24px", height: "24px" }} />
                      </IconButton>

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
                  )}
                  {readOnly && (
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
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.31763 8.49536L10.5 13.912L15.6824 8.49536"
                          stroke="#226FFF"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </IconButton>
                  )}
                </>
                )}
              </>
            ) : (
              !isEditing && <Body1 color="gray300">아이디어 (기능 등)</Body1>
            )}
            </Header>

            {isEditing && !readOnly && (
              <Content>
                <InputContainer>
                <Input
                  style={{ width: "714px" , border: "none" }}
                  placeholder="아이디어 (기능 등)"
                  value={idea.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  disabled={idea.isCompleted && editingIndex !== index || aiRefineLoading[index]}
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
                </InputContainer>
                <TextareaContainer>
                  <Textarea
                    placeholder="아이디어 및 기능에 대한 설명을 입력해주세요."
                    value={idea.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    disabled={idea.isCompleted && editingIndex !== index || aiRefineLoading[index]}
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

            {(idea.isCompleted || readOnly) &&
              expandedIndex === index &&
              editingIndex !== index && (
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

export default MoleculeIdeaInputForm;

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
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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