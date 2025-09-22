import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "./Palette";
import images from "./Images";
import { TabWrapType3, TabButtonType3 } from "./BusinessAnalysisStyle";
import { Sub3 } from "./Typography";

const PopupWrap = ({
  title,
  message,
  message2,
  body,
  onConfirm,
  onCancel,
  Warning,
  Check,
  Error,
  Info,
  Success,
  Fail,
  Event,
  buttonType,
  nomalText,
  closeText,
  confirmText,
  redirectUrl,
  isModal,
  isTextareaValid,
  isRadioSelected,
  isFormValid,
  Wide,
  Wide455,
  Wide880,
  Wide1000,
  TitleFlex,
  TitleBorder,
  showTabs,
  activeTab,
  onTabChange,
  tabs,
  eventState,
  eventTitle,
  trialState,
  creditRequestCustomPersona,
  customAlertBox,
  prevText,
  onPrev,
  showPrevButton,
  prevTextSmall,
  bottomText,
  messageBox,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // 부모 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트 언마운트 시 원래 상태로 복원
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  const renderButtons = (
    buttonType,
    handleClose,
    handleConfirm,
    nomalText,
    closeText,
    confirmText,
    prevText,
    onPrev,
    showPrevButton,
    prevTextSmall
  ) => {
    if (buttonType === "Outline") {
      return (
        <ButtonWrap>
          {nomalText && (
            <Button className="Outline" onClick={handleClose}>
              {nomalText}
            </Button>
          )}
          {closeText && (
            <Button Close className="Outline" onClick={handleClose}>
              {closeText}
            </Button>
          )}
          {confirmText && (
            <Button
              Confirm
              Event={Event}
              className="Outline"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          )}
        </ButtonWrap>
      );
    } else if (buttonType === "Fill") {
      return (
        <FillButtonWrap>
          {nomalText && <Button className="Fill">{nomalText}</Button>}
          {closeText && (
            <Button Close className="Fill" onClick={handleClose}>
              {closeText}
            </Button>
          )}
          {showPrevButton && (
            <Button 
              className="Fill" 
              Close 
              onClick={onPrev}
              prevTextSmall={prevTextSmall}
            >
              {prevText}
            </Button>
          )}
          {confirmText && (
            <Button
              Confirm
              className={`Fill ${!isFormValid ? "disabled" : ""}`}
              onClick={isFormValid ? handleConfirm : undefined}
              disabled={!isFormValid}
            >
              {confirmText}
              {confirmText === "다음" && (
                <images.ChevronRight
                  width="20"
                  height="20"
                  color={!isFormValid ? palette.gray500 : palette.white}
                />
              )}
            </Button>
          )}
        </FillButtonWrap>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <PopupBox>
      {isModal ? (
        <ModalPopup Wide={Wide} Wide455={Wide455} Wide880={Wide880} Wide1000={Wide1000} TitleBorder={TitleBorder}>
          <Header>
            {title}
            <CloseButton TitleFlex={TitleFlex} onClick={handleClose} />
          </Header>

          {customAlertBox}

          {showTabs && tabs && (
            <>
              {eventState !== false && (
                <AlertBox {...(eventState ? { Green: true } : { Blue: true })}>
                  {eventState ?? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.729 12.2828L10.871 6H9.11619L9.27103 12.2828H10.729ZM10.0065 13.0943C9.45166 13.1004 8.99362 13.5246 9.00007 14.041C8.99362 14.5697 9.45166 15 10.0065 15C10.542 15 11 14.5697 11 14.041C11 13.5246 10.542 13.1004 10.0065 13.0943Z"
                        fill="#34C759"
                      />
                    </svg>
                  )}
                  {eventState ? (
                    <Sub3 color="green">
                      {eventTitle} 기간으로 이벤트 크레딧이 사용되고 있습니다 (
                      {creditRequestCustomPersona.toLocaleString()} 크레딧이
                      소진됩니다.)
                    </Sub3>
                  ) : (
                    <Sub3 color="blue">
                      {creditRequestCustomPersona.toLocaleString()} 크레딧이
                      소진됩니다.
                    </Sub3>
                  )}
                </AlertBox>
              )}

              <TabWrapContainer>
                {tabs.map((tab, index) => (
                  <TabButtonType3
                    key={index}
                    isActive={activeTab === index}
                    onClick={() => onTabChange(index)}
                  >
                    {tab}
                  </TabButtonType3>
                ))}
              </TabWrapContainer>
            </>
          )}

          <Body>{body}</Body>

          {bottomText && (
            <BottomText>
              <Sub3 color="gray500">{bottomText}</Sub3>
            </BottomText>
          )}

          {renderButtons(
            buttonType,
            handleClose,
            handleConfirm,
            nomalText,
            closeText,
            confirmText,
            prevText,
            onPrev,
            showPrevButton,
            prevTextSmall
          )}
        </ModalPopup>
      ) : (
        <AlertPopup>
          {/* <CloseButton TitleFlex={TitleFlex} onClick={handleClose} /> */}
          <Contents>
            {Warning ? (
              <img src={images.ExclamationMark} alt="Warning" />
            ) : Check ? (
              <img src={images.CheckMark} alt="Check" />
            ) : Info ? (
              <img src={images.iconQuestionMark} alt="Info" />
            ) : Error ? (
              <img src={images.ExclamationMark} alt="Error" />
            ) : Success ? (
              <img src={images.RocketSuccess} alt="Success" />
            ) : Fail ? (
              <img src={images.RocketFail} alt="Fail" />
            ) : Event ? (
              <img src={images.EventMark} alt="Event" />
            ) : null}

            <Text>
              <strong>{title}</strong>
              <p>
                {message && message}
                {message && message2 && <br />}
                {message2 && message2}
                {messageBox && <p className="popup-message">{messageBox}</p>} {/* messageBox 추가 */}
              </p>
            </Text>
          </Contents>

          {renderButtons(
            buttonType,
            handleClose,
            handleConfirm,
            nomalText,
            closeText,
            confirmText,
            prevText,
            onPrev,
            showPrevButton,
            prevTextSmall
          )}
        </AlertPopup>
      )}
    </PopupBox>
  );
};

export default PopupWrap;

export const AlertBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 4px 8px;
  border-radius: 10px;
  background: ${(props) =>
    props.Green
      ? "rgba(52, 199, 89, 0.10)"
      : props.Blue
      ? "rgba(0, 112, 255, 0.10)"
      : palette.gray100};
`;

export const TabWrapContainer = styled(TabWrapType3)`
  width: 100%;
`;

export const PopupBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

export const AlertPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 15px;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.15);
  background: ${palette.white};
`;

export const ModalPopup = styled(AlertPopup)`
  gap: ${(props) => (
    props.TitleBorder 
    ? "20px" 
    : props.Wide455
    ? "20px"
    : "32px"
  )};
  // max-width: 800px;
  height: ${(props) => (props.Wide1000 ? "100%" :  "auto")};
  height: ${(props) => (props.Wide ? "720px" :  "auto")};
max-height: ${(props) => (
    props.Wide1000 
    ? "800px" 
    : "auto"
  )};
  max-width: ${(props) =>
    props.Wide
    ? "820px"
    : props.Wide455
    ? "455px"
    : props.Wide880
    ? "880px"
    : props.Wide1000
    ? "1000px"
    : "583px"};
  padding: ${(props) => (props.Wide455 ? "32px 24px 20px" : "32px")};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.3;
  color: ${palette.gray800};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // gap: 20px;
  gap: ${(props) => (props.TitleFlex ? "20px" : "32px")};
  width: 100%;
  height: 100%;
  // max-height: 60dvh;
  padding-right: 10px;
  overflow-y: auto;
  overflow-x: hidden;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;

    > div {
      width: 100%;
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }

  .flex {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 12px;
    width: 100%;

    > div {
      width: 100%;
    }
  }

  .box-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;

    > div {
      max-width: 97px;
      width: 100%;
      padding: 8px 0;
      border-radius: 5px;
      border: 1px solid ${palette.outlineGray};
    }
  }

  .bgBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: ${palette.chatGray};

    strong {
      font-weight: 600;
      line-height: 1.5;
      color: ${palette.gray800};
    }

    .tag {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
        font-size: 0.75rem;
        line-height: 1.5;
        color: ${palette.gray700};
        padding: 4px 10px;
        border-radius: 20px;
        border: 1px solid ${palette.outlineGray};

        &:before {
          content: "#";
        }
      }
    }
  }

  dl {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  dt {
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;

    &.point:after {
      color: ${palette.error};
      margin-left: 4px;
      content: "*";
    }

    p {
      font-size: 0.875rem;
      line-height: 1.5;
      color: ${palette.gray700};
      margin-top: 4px;
    }
  }

  dd {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    flex-wrap: wrap;
    width: 100%;
  }

  input[type="radio"],
  input[type="checkbox"] {
    display: none;
  }

  label.persona,
  label.age {
    flex: 1 1 20%;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    cursor: pointer;
    transition: all 0.5s;
  }

  label.age.none {
    border: 0;
    cursor: default;

    &:hover {
      background: none;
    }
  }

  label.gender {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    cursor: pointer;
    transition: all 0.5s;

    .icon {
      width: 32px;
      height: 32px;
      transition: background-image 0.5s ease;

      &.man {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M27.3125 3.75H19.4375C19.3344 3.75 19.25 3.83438 19.25 3.9375V5.6875C19.25 5.79063 19.3344 5.875 19.4375 5.875H24.45L18.2219 12.1031C16.6594 10.9 14.7531 10.25 12.75 10.25C10.3469 10.25 8.08437 11.1875 6.3875 12.8875C4.69062 14.5875 3.75 16.8469 3.75 19.25C3.75 21.6531 4.6875 23.9156 6.3875 25.6125C8.08437 27.3125 10.3469 28.25 12.75 28.25C15.1531 28.25 17.4156 27.3125 19.1125 25.6125C20.8125 23.9156 21.75 21.6531 21.75 19.25C21.75 17.2469 21.1 15.3469 19.9 13.7844L26.125 7.55937V12.5625C26.125 12.6656 26.2094 12.75 26.3125 12.75H28.0625C28.1656 12.75 28.25 12.6656 28.25 12.5625V4.6875C28.25 4.17188 27.8281 3.75 27.3125 3.75ZM12.75 25.875C9.09688 25.875 6.125 22.9031 6.125 19.25C6.125 15.5969 9.09688 12.625 12.75 12.625C16.4031 12.625 19.375 15.5969 19.375 19.25C19.375 22.9031 16.4031 25.875 12.75 25.875Z' fill='%23CCCCCC'/%3E%3C/svg%3E");
      }

      &.woman {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M22.775 17.15C24.45 15.475 25.375 13.2437 25.375 10.875C25.375 8.50313 24.4531 6.275 22.775 4.6C21.1 2.925 18.8687 2 16.5 2C14.1312 2 11.9 2.92187 10.225 4.6C8.55 6.27812 7.625 8.50313 7.625 10.875C7.625 12.8687 8.27812 14.7625 9.48125 16.3094C9.70937 16.6031 9.95625 16.8812 10.2219 17.15C10.4875 17.4156 10.7687 17.6625 11.0594 17.8906C12.2969 18.8531 13.7562 19.4656 15.3125 19.6719V23H11.75C11.6125 23 11.5 23.1125 11.5 23.25V25.125C11.5 25.2625 11.6125 25.375 11.75 25.375H15.3125V29.75C15.3125 29.8875 15.425 30 15.5625 30H17.4375C17.575 30 17.6875 29.8875 17.6875 29.75V25.375H21.25C21.3875 25.375 21.5 25.2625 21.5 25.125V23.25C21.5 23.1125 21.3875 23 21.25 23H17.6875V19.6719C19.6094 19.4156 21.3812 18.5437 22.775 17.15ZM16.5 17.375C14.7625 17.375 13.1344 16.7 11.9031 15.4719C10.675 14.2438 10 12.6125 10 10.875C10 9.1375 10.675 7.50937 11.9031 6.27812C13.1312 5.04687 14.7625 4.375 16.5 4.375C18.2375 4.375 19.8656 5.05 21.0969 6.27812C22.325 7.50625 23 9.1375 23 10.875C23 12.6125 22.325 14.2406 21.0969 15.4719C19.8656 16.7 18.2375 17.375 16.5 17.375Z' fill='%23CCCCCC'/%3E%3C/svg%3E");
      }
    }
  }

  .check-circle {
    width: 24px;
    height: 24px;
    margin-left: auto;
    border-radius: 50%;
    cursor: pointer;
    background-image: ${(props) =>
      props.$isChecked
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
    transition: background-image 0.3s ease-in-out;
    cursor: pointer;
  }

  input[type="radio"]:checked + .persona,
  input[type="radio"]:checked + .gender,
  input[type="radio"]:checked + .age,
  input[type="checkbox"]:checked + .age {
    color: ${palette.primary};
    border: 1px solid ${palette.primary};

    .man {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M27.3125 3.75H19.4375C19.3344 3.75 19.25 3.83438 19.25 3.9375V5.6875C19.25 5.79063 19.3344 5.875 19.4375 5.875H24.45L18.2219 12.1031C16.6594 10.9 14.7531 10.25 12.75 10.25C10.3469 10.25 8.08437 11.1875 6.3875 12.8875C4.69062 14.5875 3.75 16.8469 3.75 19.25C3.75 21.6531 4.6875 23.9156 6.3875 25.6125C8.08437 27.3125 10.3469 28.25 12.75 28.25C15.1531 28.25 17.4156 27.3125 19.1125 25.6125C20.8125 23.9156 21.75 21.6531 21.75 19.25C21.75 17.2469 21.1 15.3469 19.9 13.7844L26.125 7.55937V12.5625C26.125 12.6656 26.2094 12.75 26.3125 12.75H28.0625C28.1656 12.75 28.25 12.6656 28.25 12.5625V4.6875C28.25 4.17188 27.8281 3.75 27.3125 3.75ZM12.75 25.875C9.09688 25.875 6.125 22.9031 6.125 19.25C6.125 15.5969 9.09688 12.625 12.75 12.625C16.4031 12.625 19.375 15.5969 19.375 19.25C19.375 22.9031 16.4031 25.875 12.75 25.875Z' fill='%23226FFF'/%3E%3C/svg%3E");
    }

    .woman {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cpath d='M22.775 17.15C24.45 15.475 25.375 13.2437 25.375 10.875C25.375 8.50313 24.4531 6.275 22.775 4.6C21.1 2.925 18.8687 2 16.5 2C14.1312 2 11.9 2.92187 10.225 4.6C8.55 6.27812 7.625 8.50313 7.625 10.875C7.625 12.8687 8.27812 14.7625 9.48125 16.3094C9.70937 16.6031 9.95625 16.8812 10.2219 17.15C10.4875 17.4156 10.7687 17.6625 11.0594 17.8906C12.2969 18.8531 13.7562 19.4656 15.3125 19.6719V23H11.75C11.6125 23 11.5 23.1125 11.5 23.25V25.125C11.5 25.2625 11.6125 25.375 11.75 25.375H15.3125V29.75C15.3125 29.8875 15.425 30 15.5625 30H17.4375C17.575 30 17.6875 29.8875 17.6875 29.75V25.375H21.25C21.3875 25.375 21.5 25.2625 21.5 25.125V23.25C21.5 23.1125 21.3875 23 21.25 23H17.6875V19.6719C19.6094 19.4156 21.3812 18.5437 22.775 17.15ZM16.5 17.375C14.7625 17.375 13.1344 16.7 11.9031 15.4719C10.675 14.2438 10 12.6125 10 10.875C10 9.1375 10.675 7.50937 11.9031 6.27812C13.1312 5.04687 14.7625 4.375 16.5 4.375C18.2375 4.375 19.8656 5.05 21.0969 6.27812C22.325 7.50625 23 9.1375 23 10.875C23 12.6125 22.325 14.2406 21.0969 15.4719C19.8656 16.7 18.2375 17.375 16.5 17.375Z' fill='%23226FFF'/%3E%3C/svg%3E");
    }

    .check-circle {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }

  .delete-info {
    padding: 8px 16px;
    margin-top: auto;
    background-color: ${palette.primaryLightest};
  }

  .deleted-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    height: 460px;
    overflow-y: auto;

    > div {
      display: flex;
      align-items: center;
      gap: 12px;

      svg {
        align-self: flex-start;
        flex-shrink: 0;
        margin-top: 5px;
      }

      .button {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;

        span {
          cursor: pointer;
        }
      }
    }
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: ${(props) => (props.TitleFlex ? "37px" : "24px")};
  right: ${(props) => (props.TitleFlex ? "32px" : "24px")};
  // top: 24px;
  // right: 24px;
  width: ${(props) => (props.TitleFlex ? "16px" : "12px")};
  height: ${(props) => (props.TitleFlex ? "16px" : "12px")};
  // width: 12px;
  // height: 12px;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: ${palette.gray500};
    content: "";
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px 0 0;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  strong {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.gray800};
  }

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};

    .popup-message {
      font-size: 0.875rem;
      margin-top: 12px;
      font-weight: 300;
      line-height: 1.5;
      color: #226FFF;
       background-color: rgba(34, 111, 255, 0.1); /* 배경색을 10% 투명도로 설정 */
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 12px;
      

    }
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-self: stretch;
  align-items: flex-start;
  gap: 16px;
  // padding-top: 16px;
  padding-top: 8px;
  border-top: 1px solid ${palette.gray200};
`;

export const FillButtonWrap = styled(ButtonWrap)`
  padding-top: 0;
  border-top: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Button = styled.div`
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  padding: 8px 0 0;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.5s;

  // 텍스트와 이미지를 가로로 정렬하기 위한 스타일 추가
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &.Outline {
    color: ${(props) => {
      if (props.Confirm && props.Event) return palette.green;
      if (props.Confirm) return "#0453F4";
      if (props.Close) return palette.gray500;
      return "#7D7D7D";
    }};
  }

  &.Fill {
    color: ${(props) =>
      props.Confirm
        ? props.disabled
          ? palette.gray500
          : palette.white
        : props.Close
        ? palette.gray500
        : palette.gray500};
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid
      ${(props) =>
        props.Confirm
          ? props.disabled
            ? palette.gray300
            : palette.primary
          : props.Close
          ? palette.outlineGray
          : palette.outlineGray};
    background: ${(props) =>
      props.Confirm
        ? props.disabled
          ? palette.gray200
          : palette.primary
        : props.Close
        ? palette.chatGray
        : palette.chatGray};

    &:hover {
      background: ${(props) =>
        props.Confirm && !props.disabled
          ? palette.blue
          : props.Close
          ? palette.gray100
          : palette.gray100};
    }

    flex: ${props => props.Close ? '0 0 auto' : '1 1 auto'};
    min-width: ${props => 
      props.prevTextSmall && props.Close ? '80px' : // prevTextSmall이 있고 Close 버튼일 때
      props.Close ? '80px' : 'auto'}; // 일반 Close 버튼일 때
    padding: ${props =>
      props.prevTextSmall && props.Close ? '12px 16px' : '12px 20px'}; // prevTextSmall이 있을 때 패딩도 줄임
    font-size: ${props =>
      props.prevTextSmall && props.Close ? '0.875rem' : '0.875rem'}; // prevTextSmall이 있을 때 폰트 사이즈도 줄임
  }

  &.disabled {
    opacity: 0.5;
    border: 1px solid ${palette.gray300};
    background: ${palette.gray300};
    cursor: not-allowed;
  }
`;

export const BottomText = styled.div`
  margin-bottom: -25px;
`;
