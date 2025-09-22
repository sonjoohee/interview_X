import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../../assets/styles/Theme";
import { palette } from "../../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_BM_REPORT_DATA,
  MARKETING_CUSTOMER_DATA,
  MARKETING_CUSTOMER_BUTTON_STATE,
  MARKETING_SELECTED_CUSTOMER,
} from "../../../../AtomStates";

import Loader from "../../atoms/AtomLoader";
import { useSaveConversation } from "../../atoms/AtomSaveConversation";
import { MarketingCustomerRecommendationRequest } from "../../../../../utils/indexedDB";

const MoleculeMarketingCustomer = ({ marketingCustomerCount }) => {
  
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    ,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);

  const [marketingCustomerButtonState, setMarketingCustomerButtonState] =
    useAtom(MARKETING_CUSTOMER_BUTTON_STATE);
  const [, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingMarketingCustomer, setIsLoadingMarketingCustomer] =
    useState(false);

  const [marketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);
  const [marketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);
  const [marketingCustomerData, setMarketingCustomerData] = useAtom(
    MARKETING_CUSTOMER_DATA
  );
  const [marketingSelectedCustomer, setMarketingSelectedCustomer] = useAtom(
    MARKETING_SELECTED_CUSTOMER
  );
  const [marketingSelectedCustomerState1, setMarketingSelectedCustomerState1] =
    useState({});
  const [marketingSelectedCustomerState2, setMarketingSelectedCustomerState2] =
    useState({});
  const [marketingSelectedCustomerState3, setMarketingSelectedCustomerState3] =
    useState({});

  useEffect(() => {
    if (marketingSelectedCustomer.length === 1) {
      setMarketingSelectedCustomerState1(marketingSelectedCustomer[0]);
    } else if (marketingSelectedCustomer.length === 2) {
      setMarketingSelectedCustomerState1(marketingSelectedCustomer[0]);
      setMarketingSelectedCustomerState2(marketingSelectedCustomer[1]);
    } else if (marketingSelectedCustomer.length === 3) {
      setMarketingSelectedCustomerState1(marketingSelectedCustomer[0]);
      setMarketingSelectedCustomerState2(marketingSelectedCustomer[1]);
      setMarketingSelectedCustomerState3(marketingSelectedCustomer[2]);
    }
  }, [marketingSelectedCustomer]);

  const handleOptionClick = (index) => {
    const selectedCustomer = marketingCustomerData[index];

    if (marketingCustomerCount === 0) {
      setMarketingSelectedCustomerState1({
        content: selectedCustomer,
        index: index,
      });
    } else if (marketingCustomerCount === 1) {
      setMarketingSelectedCustomerState2({
        content: selectedCustomer,
        index: index,
      });
    } else if (marketingCustomerCount === 2) {
      setMarketingSelectedCustomerState3({
        content: selectedCustomer,
        index: index,
      });
    }
  };


  useEffect(() => {
    const fetchMarketingCustomer = async () => {
      if (marketingCustomerButtonState) {
        setIsLoading(true);
        setIsLoadingMarketingCustomer(true);
        setMarketingCustomerButtonState(0);

        const data = {
          expert_id: "11",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
          },
          marketing_research_report: marketingResearchReportData,
          marketing_bm_report: marketingBmReportData,
        };

        let response = await MarketingCustomerRecommendationRequest(data);
        let marketingCustomer =
          response.response.marketing_customer_recommendation;

        let retryCount = 0;
        const maxRetries = 10;

        while (
          retryCount < maxRetries &&
          (!response ||
            !response.response ||
            typeof response.response !== "object" ||
            !response.response.hasOwnProperty(
              "marketing_customer_recommendation"
            ) ||
            !Array.isArray(
              response.response.marketing_customer_recommendation
            ) ||
            response.response.marketing_customer_recommendation.length !== 5 ||
            response.response.marketing_customer_recommendation.some(
              (item) =>
                !item.hasOwnProperty("name") ||
                !item.hasOwnProperty("characteristic") ||
                !item.characteristic.hasOwnProperty("summary") ||
                !item.characteristic.hasOwnProperty("description") ||
                !item.hasOwnProperty("market") ||
                !item.market.hasOwnProperty("summary") ||
                !item.market.hasOwnProperty("description") ||
                !item.hasOwnProperty("function") ||
                !item.function.hasOwnProperty("summary") ||
                !item.function.hasOwnProperty("description") ||
                !item.hasOwnProperty("competence") ||
                !item.competence.hasOwnProperty("summary") ||
                !item.competence.hasOwnProperty("description")
            ))
        ) {
         
          response = await MarketingCustomerRecommendationRequest(data);
          retryCount++;

          marketingCustomer =
            response.response.marketing_customer_recommendation;
        }
        if (retryCount === maxRetries) {
          throw new Error(
            "Maximum retry attempts reached. Empty response persists."
          );
        }

        setMarketingCustomerData(marketingCustomer);

        await saveConversation({
          changingConversation: { marketingCustomerData: marketingCustomer },
        });

        setIsLoading(false);
        setIsLoadingMarketingCustomer(false);
      }
    };

    fetchMarketingCustomer();
  }, [marketingCustomerButtonState]);

  const handleConfirm = async () => {
    if (
      (marketingCustomerCount === 0 &&
        Object.keys(marketingSelectedCustomerState1).length === 0) ||
      (marketingCustomerCount === 1 &&
        Object.keys(marketingSelectedCustomerState2).length === 0) ||
      (marketingCustomerCount === 2 &&
        Object.keys(marketingSelectedCustomerState3).length === 0)
    )
      return;

    if (marketingCustomerCount === 0) {
      setMarketingSelectedCustomer([marketingSelectedCustomerState1]);
      await saveConversation({
        changingConversation: {
          marketingSelectedCustomer: [marketingSelectedCustomerState1],
        },
      });
    } else if (marketingCustomerCount === 1) {
      setMarketingSelectedCustomer([
        ...marketingSelectedCustomer,
        marketingSelectedCustomerState2,
      ]);
      await saveConversation({
        changingConversation: {
          marketingSelectedCustomer: [
            ...marketingSelectedCustomer,
            marketingSelectedCustomerState2,
          ],
        },
      });
    } else if (marketingCustomerCount === 2) {
      setMarketingSelectedCustomer([
        ...marketingSelectedCustomer,
        marketingSelectedCustomerState3,
      ]);
      await saveConversation({
        changingConversation: {
          marketingSelectedCustomer: [
            ...marketingSelectedCustomer,
            marketingSelectedCustomerState3,
          ],
        },
      });
    }

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message:
          marketingCustomerCount === 0
            ? `${marketingSelectedCustomerState1.content.name}`
            : marketingCustomerCount === 1
            ? `${marketingSelectedCustomerState2.content.name}`
            : `${marketingSelectedCustomerState3.content.name}`,
      },
      {
        type: "system",
        message:
          marketingCustomerCount === 0
            ? `${marketingSelectedCustomerState1.content.name}을 주요 고객으로 생각하시는 군요,\n그럼 이 고객에게 어떤 매력 포인트가 먹힐지, 어떻게 포지셔닝을 하면 좋을지 확인해볼게요 💭`
            : marketingCustomerCount === 1
            ? `${marketingSelectedCustomerState2.content.name}도 알아보겠습니다.\n${marketingSelectedCustomerState1.content.name}과 어떤 관점에서 변화가 있는지 궁금하네요 🤔`
            : `${marketingSelectedCustomerState3.content.name}으로 마지막 주요 고객층을 선택하셨네요🙌🏻\n마지막으로 아이템은 어떻게 달라질까요? `,
        expertIndex: 0,
      },
      {
        type: `marketingSegmentReport`,
      },
      {
        type: "system",
        message:
          marketingCustomerCount === 0
            ? `좋습니다🌞 첫번째 주요 고객을 확인해보았습니다.\n다른 고객들도 주요 고객이라고 생각하신다면, 추가적으로 더 확인해볼게요! (2명 더 분석 가능)`
            : marketingCustomerCount === 1
            ? `두번째 주요 고객도 확인해 보았네요. 마지막 고객도 확인해 볼까요? (이제 1명 더 분석 가능)`
            : `세 가지 타겟 고객층을 모두 확인해 보았습니다. 이제 ${titleOfBusinessInfo}에 가장 적합하다고 생각하는 핵심 타겟 고객층을 하나 선택해 주세요. 선택하신 타겟층을 중심으로 서비스의 잠재력을 집중 분석해 보겠습니다. 🚀`,
        expertIndex: -1,
      },
      {
        type: "marketingCustomerButton",
      }
    );
    setConversation(updatedConversation);

    await saveConversation({
      changingConversation: { conversation: updatedConversation },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {isLoadingMarketingCustomer ? (
          <LoadingOptionsContainer>
            <Loader />
          </LoadingOptionsContainer>
        ) : (
          <>
            {marketingCustomerCount === 0 ? (
              <>
                <OptionsContainer>
                  <Question>
                    아래 고객 유형 중, 어떤 고객이 주요 고객이라고 생각하시나요?
                  </Question>
                  {marketingCustomerData?.map((customer, index) => (
                    <Option1
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      selected={
                        marketingSelectedCustomerState1?.index === index
                      }
                      marketingSelectedCustomer={marketingSelectedCustomer}
                      marketingCustomerCount={marketingCustomerCount}
                    >
                      <Label1
                        marketingSelectedCustomer={marketingSelectedCustomer}
                        selected={
                          marketingSelectedCustomerState1?.index === index
                        }
                        marketingCustomerCount={marketingCustomerCount}
                      >
                        {customer?.name}
                      </Label1>
                    </Option1>
                  ))}
                </OptionsContainer>

                <ButtonWrap>
                  <Button1
                    marketingSelectedCustomerState1={
                      marketingSelectedCustomerState1
                    }
                    marketingSelectedCustomer={marketingSelectedCustomer}
                    marketingCustomerCount={marketingCustomerCount}
                    onClick={handleConfirm}
                  >
                    확인
                  </Button1>
                </ButtonWrap>
              </>
            ) : marketingCustomerCount === 1 ? (
              <>
                <OptionsContainer>
                  <Question>
                    아래 고객 유형 중, 어떤 고객이 주요 고객이라고 생각하시나요?
                  </Question>
                  {marketingCustomerData
                    .filter(
                      (_, index) =>
                        index !== marketingSelectedCustomerState1?.index
                    )
                    .map((customer) => {
                      const originalIndex = marketingCustomerData.findIndex(
                        (c) => c.name === customer.name
                      );
                      return (
                        <Option2
                          key={originalIndex}
                          onClick={() => handleOptionClick(originalIndex)}
                          selected={
                            marketingSelectedCustomerState2?.index ===
                            originalIndex
                          }
                          marketingSelectedCustomer={marketingSelectedCustomer}
                          marketingCustomerCount={marketingCustomerCount}
                        >
                          <Label2
                            marketingSelectedCustomer={
                              marketingSelectedCustomer
                            }
                            selected={
                              marketingSelectedCustomerState2?.index ===
                              originalIndex
                            }
                            marketingCustomerCount={marketingCustomerCount}
                          >
                            {customer.name}
                          </Label2>
                        </Option2>
                      );
                    })}
                </OptionsContainer>

                <ButtonWrap>
                  <Button2
                    marketingSelectedCustomerState2={
                      marketingSelectedCustomerState2
                    }
                    marketingSelectedCustomer={marketingSelectedCustomer}
                    marketingCustomerCount={marketingCustomerCount}
                    onClick={handleConfirm}
                  >
                    확인
                  </Button2>
                </ButtonWrap>
              </>
            ) : (
              <>
                <OptionsContainer>
                  <Question>
                    아래 고객 유형 중, 어떤 고객이 주요 고객이라고 생각하시나요?
                  </Question>
                  {marketingCustomerData
                    .filter(
                      (_, index) =>
                        index !== marketingSelectedCustomerState1?.index &&
                        index !== marketingSelectedCustomerState2?.index
                    )
                    .map((customer) => {
                      const originalIndex = marketingCustomerData.findIndex(
                        (c) => c.name === customer.name
                      );
                      return (
                        <Option3
                          key={originalIndex}
                          onClick={() => handleOptionClick(originalIndex)}
                          selected={
                            marketingSelectedCustomerState3?.index ===
                            originalIndex
                          }
                          marketingSelectedCustomer={marketingSelectedCustomer}
                          marketingCustomerCount={marketingCustomerCount}
                        >
                          <Label3
                            marketingSelectedCustomer={
                              marketingSelectedCustomer
                            }
                            selected={
                              marketingSelectedCustomerState3?.index ===
                              originalIndex
                            }
                            marketingCustomerCount={marketingCustomerCount}
                          >
                            {customer.name}
                          </Label3>
                        </Option3>
                      );
                    })}
                </OptionsContainer>

                <ButtonWrap>
                  <Button3
                    marketingSelectedCustomerState3={
                      marketingSelectedCustomerState3
                    }
                    marketingSelectedCustomer={marketingSelectedCustomer}
                    marketingCustomerCount={marketingCustomerCount}
                    onClick={handleConfirm}
                  >
                    확인
                  </Button3>
                </ButtonWrap>
              </>
            )}
          </>
        )}
      </Wrapper>
    </ThemeProvider>
  );
};

export default MoleculeMarketingCustomer;

const Wrapper = styled.div`
  max-width: 540px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin: 12px 0 0 50px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;

  .loading {
    min-width: 500px;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      min-width: 150px; // 모바일일 때 크기 조정
      min-height: 150px; // 모바일일 때 크기 조정
    }
  }
`;

const LoadingOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;

  min-width: 518px;
  min-height: 317px;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 150px; // 모바일일 때 크기 조정
    min-height: 150px; // 모바일일 때 크기 조정
  }
`;

const Option1 = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${palette.gray800};
  font-size: 0.88rem;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 1
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? Object.keys(props.marketingSelectedCustomer).length >= 1
          ? palette.gray800
          : palette.primary
        : palette.outlineGray};
  transition: all 0.5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height: 1.3;
  }

  img {
    margin-bottom: 5px;
    background-color: ${(props) =>
      !props.selected ||
      Object.keys(props.marketingSelectedCustomer).length >= 1
        ? "rgba(246, 246, 246, 1)"
        : "rgba(255, 255, 255, 1)"};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.marketingSelectedCustomer).length >= 1
        ? "none"
        : palette.primary};
  }
`;

const Option2 = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${palette.gray800};
  font-size: 0.88rem;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 2
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? Object.keys(props.marketingSelectedCustomer).length >= 2
          ? palette.gray800
          : palette.primary
        : palette.outlineGray};
  transition: all 0.5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height: 1.3;
  }

  img {
    margin-bottom: 5px;
    background-color: ${(props) =>
      !props.selected ||
      Object.keys(props.marketingSelectedCustomer).length >= 2
        ? "rgba(246, 246, 246, 1)"
        : "rgba(255, 255, 255, 1)"};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.marketingSelectedCustomer).length >= 2
        ? "none"
        : palette.primary};
  }
`;

const Option3 = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${palette.gray800};
  font-size: 0.88rem;
  text-align: left;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 3
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? Object.keys(props.marketingSelectedCustomer).length >= 3
          ? palette.gray800
          : palette.primary
        : palette.outlineGray};
  transition: all 0.5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height: 1.3;
  }

  img {
    margin-bottom: 5px;
    background-color: ${(props) =>
      !props.selected ||
      Object.keys(props.marketingSelectedCustomer).length >= 3
        ? "rgba(246, 246, 246, 1)"
        : "rgba(255, 255, 255, 1)"};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.marketingSelectedCustomer).length >= 3
        ? "none"
        : palette.primary};
  }
`;

const Label1 = styled.label`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
  color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 1
        ? palette.gray800
        : palette.primary
      : palette.gray800};
  cursor: pointer;

  &:before {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid
      ${(props) =>
        props.selected
          ? Object.keys(props.marketingSelectedCustomer).length >= 1
            ? palette.gray800
            : palette.primary
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
        ? Object.keys(props.marketingSelectedCustomer).length >= 1
          ? palette.gray800
          : palette.primary
        : palette.white};
    transition: all 0.5s;
    content: "";
  }

  &:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center no-repeat;
    content: "";
  }
`;

const Label2 = styled.label`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
  color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 2
        ? palette.gray800
        : palette.primary
      : palette.gray800};
  cursor: pointer;

  &:before {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid
      ${(props) =>
        props.selected
          ? Object.keys(props.marketingSelectedCustomer).length >= 2
            ? palette.gray800
            : palette.primary
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
        ? Object.keys(props.marketingSelectedCustomer).length >= 2
          ? palette.gray800
          : palette.primary
        : palette.white};
    transition: all 0.5s;
    content: "";
  }

  &:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center no-repeat;
    content: "";
  }
`;

const Label3 = styled.label`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
  color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 3
        ? palette.gray800
        : palette.primary
      : palette.gray800};
  cursor: pointer;

  &:before {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid
      ${(props) =>
        props.selected
          ? Object.keys(props.marketingSelectedCustomer).length >= 3
            ? palette.gray800
            : palette.primary
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
        ? Object.keys(props.marketingSelectedCustomer).length >= 3
          ? palette.gray800
          : palette.primary
        : palette.white};
    transition: all 0.5s;
    content: "";
  }

  &:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center no-repeat;
    content: "";
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Button1 = styled.button`
  font-family: Pretendard, Poppins;
  font-size: 0.88rem;
  color: ${(props) =>
    Object.keys(props.marketingSelectedCustomerState1).length
      ? palette.primary
      : palette.gray500};
  line-height: 22px;
  // padding:8px 20px;
  margin-left: auto;
  border-radius: 8px;
  border: 0;
  background: ${palette.white};
  transition: all 0.5s;

  display: ${(props) =>
    props.marketingCustomerCount === 0 &&
    Object.keys(props.marketingSelectedCustomer).length >= 1
      ? "none"
      : "block"};
`;

const Button2 = styled.button`
  font-family: Pretendard, Poppins;
  font-size: 0.88rem;
  color: ${(props) =>
    Object.keys(props.marketingSelectedCustomerState2).length
      ? palette.primary
      : palette.gray500};
  line-height: 22px;
  // padding:8px 20px;
  margin-left: auto;
  border-radius: 8px;
  border: 0;
  background: ${palette.white};
  transition: all 0.5s;

  display: ${(props) =>
    Object.keys(props.marketingSelectedCustomer).length >= 2
      ? "none"
      : "block"};
`;

const Button3 = styled.button`
  font-family: Pretendard, Poppins;
  font-size: 0.88rem;
  color: ${(props) =>
    Object.keys(props.marketingSelectedCustomerState3).length
      ? palette.primary
      : palette.gray500};
  line-height: 22px;
  // padding:8px 20px;
  margin-left: auto;
  border-radius: 8px;
  border: 0;
  background: ${palette.white};
  transition: all 0.5s;

  display: ${(props) =>
    Object.keys(props.marketingSelectedCustomer).length >= 3
      ? "none"
      : "block"};
`;

const Question = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  text-align: left;
  padding-bottom: 5px;
`;
