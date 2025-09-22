import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  PRICE_START_BUTTON_STATE,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  CONVERSATION_STAGE,
  BUTTON_STATE,
  IS_LOGGED_IN,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";
import { InterviewXPriceScrapReportRequest, InterviewXPriceAnalysisReportRequest } from "../../../../utils/indexedDB";
import Loader from "../atoms/AtomLoader";

const OrganismPriceReport = () => {
  const [, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [priceProduct, ] = useAtom(PRICE_PRODUCT);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [
    mainFeaturesOfBusinessInformation,
    ,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    ,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    ,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  const [, setIsLoading] = useAtom(IS_LOADING);

  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [priceStartButtonState, setPriceStartButtonState] = useAtom(
    PRICE_START_BUTTON_STATE
  );
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);

  const [projectTotalInfo, ] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo, ] = useAtom(PROJECT_CREATE_INFO);

 

  const [isMoreView, setIsMoreView] = useState(false);
  const onClickImageMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  const sliderRef = useRef(null);

  const [productPrices, setProductPrices] = useState([]);
  const [, setBins] = useState([]);

  const [range, setRange] = useState([0, 0]);
  const [width, ] = useState(500);

  useEffect(() => {
    const fetchPriceReport = async () => {
      if (priceStartButtonState) {
        setIsLoading(true);
        setIsLoadingPrice(true);

        const data1 = {
          expert_id: "7",
          business_info: projectTotalInfo.projectTitle,
          business_analysis_data: projectCreateInfo,
        };


        let response1 = await InterviewXPriceScrapReportRequest(
          data1,
          isLoggedIn
        );
       // console.log("가격 스크랩 response", response1);

        let retryCount = 0;
        const maxRetries = 10;

        // while (
        //   (retryCount < maxRetries &&
        //     (!response1 ||
        //       !response1.data ||
        //       typeof response1.data !== "object" ||
        //       !response1.data.hasOwnProperty("price_scrap_report") ||
        //       typeof response1.data.price_scrap_report !== "object")) ||
        //   !response1.data.price_scrap_report.price_range_groups ||
        //   response1.data.price_scrap_report.price_range_groups.length === 0
        // ) {
        //   response1 = await axios.post(
        //     "https://wishresearch.kr/panels/price_scrap",
        //     data1,
        //     axiosConfig
        //   );
        //   retryCount++;
        // }
        // if (retryCount === maxRetries) {
        //   console.error(
        //     "최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다."
        //   );
        //   // 에러 처리 로직 추가
        //   throw new Error(
        //     "Maximum retry attempts reached. Empty response persists."
        //   );
        // }

        // const priceScrap = response1.data.price_scrap_report;

        while (retryCount < maxRetries && (
          !response1 || !response1.response || typeof response1.response !== "object" ||
          !response1.response.hasOwnProperty("price_scrap_report") ||
          typeof response1.response.price_scrap_report !== "object" ||
          !response1.response.price_scrap_report.price_range_groups ||
          response1.response.price_scrap_report.price_range_groups.length === 0
        )) {
    
         response1 = await InterviewXPriceScrapReportRequest(
            data1,
            isLoggedIn
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
        //  console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }

        const priceScrap = response1.response.price_scrap_report;

        setPriceScrapData(priceScrap);

        const data2 = {
          expert_id: "7",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          price_scrap_report: priceScrap,
        };

        // let response2 = await axios.post(
        //   "https://wishresearch.kr/panels/price_analysis",
        //   data2,
        //   axiosConfig
        // );

        let response2 = await InterviewXPriceAnalysisReportRequest(
          data2,
          isLoggedIn
        );

        retryCount = 0;

        while (retryCount < maxRetries && (
          !response2 || !response2.response || typeof response2.response !== "object" ||
          !response2.response.hasOwnProperty("price_analysis_persona_recommand_report") ||
          typeof response2.response.price_analysis_persona_recommand_report !== "object" ||
          !response2.response.price_analysis_persona_recommand_report.price_analysis ||
          Object.keys(response2.response.price_analysis_persona_recommand_report.price_analysis).length === 0
        )) {
      response2 = await InterviewXPriceAnalysisReportRequest(
            data2,
            isLoggedIn
          );
            retryCount++;
          }
        if (retryCount === maxRetries) {
       //   console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        const priceReport =
        response2.response.price_analysis_persona_recommand_report;
      setPriceReportData(priceReport);

        const prices = priceScrap.price_range_groups.flatMap((group) =>
          group.product_list.map((product) =>
            parseFloat(
              product["단위 당 가격"].replace("원", "").replace(",", "")
            )
          )
        );
        setProductPrices(prices);

        // bins 계산 및 상태 업데이트
        const binWidth = 500;
        const binsData = d3
          .histogram()
          .thresholds(d3.range(0, d3.max(prices) + binWidth, binWidth))(prices);
        setBins(binsData);

        const rangeString =
          priceReport.price_range_analysis.consumer_price_range.range;
        const rangeNumbers = rangeString.match(/\d+/g).map(Number);
        setRange(rangeNumbers);

        setIsLoading(false);
        setIsLoadingPrice(false);
        setPriceStartButtonState(0);

        const updatedConversation = [...conversation];

        if (priceProduct.length === 1) {
          updatedConversation.push(
            {
              type: "system",
              message: `시장 가격 분석이 완료되었습니다.`,
              expertIndex: selectedExpertIndex,
            },
            {
              type: "system",
              message: `리포트 내용을 보시고 추가로 궁금한 점이 있나요?\n아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊`,
              expertIndex: -1,
            },
            {
              type: "keyword",
            }
          );
        } else {
          updatedConversation.push(
            {
              type: "system",
              message:
                "시장 가격 분석이 완료되었습니다.\n이제 다른 제품의 가격을 분석하시겠어요, 아니면 상세한 분석을 진행하시겠습니까? 원하는 옵션을 선택해주세요 ",
              expertIndex: selectedExpertIndex,
            },
            { type: `priceContinueButton` }
          );
        }
        setButtonState({
          ...buttonState,
          priceEnough: 1,
        });
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversation({
          changingConversation: {
            conversation: updatedConversation,
            conversationStage: 3,
            priceScrapData: priceScrap,
            priceReportData: priceReport,
            buttonState: {
              ...buttonState,
              priceEnough: 1,
            },
          },
        });
      }
    };

    fetchPriceReport();
  }, [priceStartButtonState]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newWidth = sliderRef.current.parentElement.offsetWidth;
  //     setWidth(newWidth);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // useEffect(() => {
  //   // consumer_price_min과 consumer_price_max가 있을 때 handleRange 초기화
  //   if (
  //     priceReportData?.consumer_price_min &&
  //     priceReportData?.consumer_price_max
  //   ) {
  //     setHandleRange([
  //       priceReportData.consumer_price_min,
  //       priceReportData.consumer_price_max,
  //     ]);
  //   }
  // }, [priceReportData]);

  // 그래프 데이터 불러오기
  useEffect(() => {
    if (
      Object.keys(priceScrapData).length > 0 &&
      Object.keys(priceReportData).length > 0
    ) {
      const prices = priceScrapData.price_range_groups.flatMap((group) =>
        group.product_list.map((product) =>
          parseFloat(product["단위 당 가격"].replace("원", "").replace(",", ""))
        )
      );
      setProductPrices(prices);

      const binWidth = 500;
      const binsData = d3
        .histogram()
        .thresholds(d3.range(0, d3.max(prices) + binWidth, binWidth))(prices);
      setBins(binsData);

      const rangeString =
        priceReportData.price_range_analysis.consumer_price_range.range;
      const rangeNumbers = rangeString.match(/\d+/g).map(Number);
      setRange(rangeNumbers);
    }
  }, [priceScrapData, priceReportData]);

  // 만단위/5만단위 올림 함수 추가
  const roundToNearestUnit = (number) => {
    const numStr = Math.abs(number).toString();
    const digits = numStr.length;

    // 6자리 이하인 경우 만단위로 올림
    if (digits <= 6) {
      return Math.ceil(number / 10000) * 10000;
    }
    // 7자리 이상인 경우 5만단위로 올림
    else {
      return Math.ceil(number / 50000) * 50000;
    }
  };

  // 만단위/5만단위 내림 함수 추가
  const roundDownToUnit = (number) => {
    const numStr = Math.abs(number).toString();
    const digits = numStr.length;

    // 6자리 이하인 경우 만단위로 내림
    if (digits <= 6) {
      return Math.floor(number / 10000) * 10000;
    }
    // 7자리 이상인 경우 5만단위로 내림
    else {
      return Math.floor(number / 50000) * 50000;
    }
  };
  // useEffect 코드 수정
  useEffect(() => {
    if (productPrices.length > 0) {
      // SVG 요소 선택
      const svg = d3.select(sliderRef.current);
      const svgElement = sliderRef.current;
      const width = svgElement.clientWidth || 500;
      const height = 150;
      const margin = { left: 40, right: 40, top: 20, bottom: 20 };

      // 최소값과 최대값 계산
      const minPrice = roundDownToUnit(Math.min(...productPrices));
      const maxPrice = roundToNearestUnit(Math.max(...productPrices));

      // 초기 range 설정 (처음 렌더링 시)
      if (range[0] === 0 && range[1] === 0) {
        setRange([minPrice, maxPrice]);
      }
      // 구간 간격 계산
      const step = (maxPrice - minPrice) / 10;

      // 각 구간별 데이터 카운트
      const rangeCounts = Array(10).fill(0);
      productPrices.forEach((price) => {
        const index = Math.min(Math.floor((price - minPrice) / step), 9);
        if (index >= 0) rangeCounts[index]++;
      });

      // SVG 초기화
      svg.selectAll("*").remove();

      // consumer_price_min과 consumer_price_max 가져오기
      const consumerPriceMin = parseInt(
        priceReportData.price_range_analysis.consumer_price_range
          .consumer_price_min
      );
      const consumerPriceMax = parseInt(
        priceReportData.price_range_analysis.consumer_price_range
          .consumer_price_max
      );
      // 고정된 핸들 범위 설정
      const fixedHandleRange = [consumerPriceMin, consumerPriceMax];

      // 해당 값이 속한 구간 인덱스 찾기
      const startIndex = Math.floor((fixedHandleRange[0] - minPrice) / step);
      const endIndex = Math.floor((fixedHandleRange[1] - minPrice) / step);

      // 구간의 중앙점 계산
      const startPosition = minPrice + startIndex * step + step / 2;
      const endPosition = minPrice + endIndex * step + step / 2;
      // x축 스케일 설정
      const x = d3
        .scaleLinear()
        .domain([minPrice, maxPrice])
        .range([margin.left, width - margin.right])
        .clamp(true);

      // y축 스케일 설정
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(rangeCounts)])
        .range([height - margin.bottom, margin.top]);

      // x축 생성
      const xAxis = d3
        .axisBottom(x)
        .ticks(10)
        .tickFormat((d) => `${(d / 10000).toFixed(0)}만`);

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("path, line")
        .style("stroke", "#F6F6F6")
        .style("stroke-width", "2px");

      // 툴팁 추가
      const tooltip = d3
        .select(".App")
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("font-size", "0.75rem")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

      // 각 구간의 정보 생성
      const barData = Array(10)
        .fill(0)
        .map((_, i) => {
          const rangeStart = minPrice + i * step;
          const rangeEnd = minPrice + (i + 1) * step;
          return {
            rangeStart,
            rangeEnd,
            count: rangeCounts[i],
            // 천 단위 구분된 문자열 추가
            formattedStart: rangeStart.toLocaleString("ko-KR"),
            formattedEnd: rangeEnd.toLocaleString("ko-KR"),
          };
        });

      // 바차트 그리기
      svg
        .selectAll(".bar")
        .data(barData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr(
          "x",
          (d, i) =>
            margin.left + i * ((width - margin.left - margin.right) / 10)
        )
        .attr("y", (d) => y(d.count))
        .attr(
          "width",
          Math.max(1, (width - margin.left - margin.right) / 10 - 2)
        )
        .attr("height", (d) => Math.max(0, height - margin.bottom - y(d.count)))
        // style("fill", "#E0E4EB") 제거 (CSS로 처리)
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `범위: ${d.formattedStart}원 ~ ${d.formattedEnd}원<br/>제품수: ${d.count}개`
            )
            .style("left", event.pageX + 5 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 0);
        });

      const rangeIndicatorHeight = 5;
      svg
        .append("rect")
        .attr("class", "range-indicator")
        .attr("x", x(startPosition))
        .attr("y", height - margin.bottom - rangeIndicatorHeight / 2)
        .attr("width", x(endPosition) - x(startPosition))
        .attr("height", rangeIndicatorHeight)
        .style("fill", palette.primary);

      // 핸들 그리기
      svg
        .selectAll(".handle")
        .data([startPosition, endPosition]) // consumerPriceMin, consumerPriceMax 대신 중앙점 사용
        .enter()
        .append("circle")
        .attr("class", "handle")
        .attr("cx", (d) => x(d))
        .attr("cy", height - margin.bottom)
        .attr("r", 8)
        .style("fill", palette.primary)
        .on("mouseenter", (event, d) => {
          tooltip
            .style("opacity", 1)
            .html(
              `소비자 가격 수용 예측범위: ${consumerPriceMin.toLocaleString(
                "ko-KR"
              )}원 ~ ${consumerPriceMax.toLocaleString("ko-KR")}원`
            )
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", 0);
        });

      // 디버깅을 위한 로그
      // console.log("Chart Data:", {
      //   minPrice,
      //   maxPrice,
      //   rangeCounts,
      //   width,
      //   height,
      //   step,
      // });

      return () => {
        tooltip.remove();
      }; // 컴포넌트가 언마운트될 때 툴팁 제거
    }
  }, [productPrices, range, width]);

  return (
    <>
      {isLoadingPrice || priceStartButtonState ? (
        <Wrap
          style={{
            minWidth: "520px",
            minHeight: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Wrap>
      ) : (
        <>
          <Wrap H1Border>
            <h1>{titleOfBusinessInfo} 가격 분석 리포트</h1>
            <p>
              <span>소비자 가격 수용 범위 예측</span>
              {
                priceReportData.price_range_analysis.consumer_price_range.range
              }{" "}
              사이
            </p>

            <ChartWrap>
              <svg ref={sliderRef}></svg>

              <PriceWrap>
                <div>
                  <span>최소 가격</span>
                  <input
                    type="text"
                    value={`₩${parseInt(
                      priceReportData.price_analysis.price_data.lowest_price
                        .replace(/원/g, "")
                        .replace(/,/g, "")
                    ).toLocaleString()}원`}
                    readOnly
                  />
                </div>
                <div>
                  <span>최대 가격</span>
                  <input
                    type="text"
                    value={`₩${parseInt(
                      priceReportData.price_analysis.price_data.highest_price
                        .replace(/원/g, "")
                        .replace(/,/g, "")
                    ).toLocaleString()}원`}
                    readOnly
                  />
                </div>
                <div>
                  <span>평균가</span>
                  <input
                    type="text"
                    value={`₩${parseInt(
                      priceReportData.price_analysis.price_data.average_price
                        .replace(/원/g, "")
                        .replace(/,/g, "")
                    ).toLocaleString()}원`}
                    readOnly
                  />
                </div>
              </PriceWrap>

              <p>{priceReportData.price_analysis.summary.unit_setting}</p>
            </ChartWrap>

            <AnalysisWrap>
              <div>
                <span>가격대 분석</span>
                <p>
                  {
                    priceReportData.conclusion_and_strategic_recommendations
                      .description
                  }
                </p>
              </div>

              <AnalysisBox isMoreView={isMoreView}>
                {["lowest", "highest", "average"].map((type) => (
                  <div key={type}>
                    <span>
                      {type === "lowest" && "최소 가격군 제품"}
                      {type === "highest" && "최대 가격군 제품"}
                      {type === "average" && "평균가 가격군 제품"}
                    </span>
                    <ul>
                      {priceReportData.price_analysis.price_data[
                        `${type}_price_products`
                      ].map((product, idx) => (
                        <li key={idx}>
                          {/* <span>{idx + 1}</span> */}
                          <p>{product.name}</p>
                          <strong>{product.price}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AnalysisBox>

              <MoreViewButtonWrap isMoreView={isMoreView}>
                <MoreButton
                  onClick={onClickImageMoreViewButton}
                  isMoreView={isMoreView}
                >
                  {isMoreView ? "접기" : "더보기"}
                </MoreButton>
              </MoreViewButtonWrap>
            </AnalysisWrap>
          </Wrap>
        </>
      )}
    </>
  );
};

export default OrganismPriceReport;

const Wrap = styled.div`
  max-width: 540px;
  // width:100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin: 24px 0 0 44px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  h1 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: 700;
    text-align: left;
  }

  ${(props) =>
    props.H1Border &&
    css`
      h1 {
        padding-bottom: 8px;
        margin-bottom: 12px;
        border-bottom: 1px solid ${palette.lineGray};
      }
    `}

  p {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${palette.gray800};
    text-align: left;

    span {
      font-size: 0.88rem;
      font-weight: 400;
      color: ${palette.gray500};
    }
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
`;

const Option = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: ${palette.gray800};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid ${palette.lineGray};
  background-color: ${palette.white};
  transition: all 0.5s;

  &:before {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.lineGray};
    background-color: ${palette.white};
    transition: all 0.5s;
    content: "";
  }

  &:after {
    position: absolute;
    left: 12px;
    top: 8px;
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center no-repeat;
    content: "";
  }

  &:hover {
    border-color: ${palette.blue};
  }
`;

const ButtonWrap = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .finish {
    font-size: 0.88rem;
    color: ${palette.primary};
    margin-left: auto;
    border-radius: 8px;
    background: none;
    cursor: pointer;
    transition: all 0.5s;
  }
`;

const ChartWrap = styled.div`
  svg {
    max-width: 500px;
    width: 100%;
  }

  .tick {
    display: none;
  }

  .handle {
    box-shadow: 2px 2px 8px rgba(34, 111, 255, 0.5);
  }

  .bar {
    fill: #e0e4eb;
    transition: fill 0.2s ease;
    cursor: pointer;

    &:hover {
      fill: #c5cad3; // 더 진한 회색으로 변경
    }
  }

  p {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray500};
    margin-top: 8px;
  }
`;

const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 15px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1 1 40%;
    font-size: 0.88rem;
    text-align: left;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid ${palette.lineGray};

    span {
      font-size: 0.88rem;
      font-weight: 400;
      color: ${palette.gray500};
    }

    input {
      width: 100%;
      font-family: "Pretendard", "Poppins";
      font-size: 0.88rem;
      color: ${palette.gray800};
      border: 0;
      outline: none;
    }

    p {
      font-size: 0.88rem;
      font-weight: 400;
      color: ${palette.gray800};
    }
  }
`;

const AnalysisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 12px;
  padding-top: 20px;
  border-top: 1px solid ${palette.lineGray};

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;

    + div {
      margin-top: 12px;
    }
  }

  span {
    font-size: 0.88rem;
    font-weight: 400;
    color: ${palette.gray500};
  }

  p {
    font-size: 0.88rem;
    font-weight: 300;
    color: ${palette.gray800};
    line-height: 1.5;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
    // padding:8px 20px 8px 6px;
    padding: 20px;
    border-radius: 12px;
    background: ${palette.chatGray};
  }

  li {
    display: flex;
    // align-items:center;
    // gap:58px;
    justify-content: space-between;

    p {
      max-width: 320px;
      width: 100%;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      border: 1px solid ${palette.lineGray};
      background: ${palette.white};
    }

    strong {
      font-size: 0.88rem;
      font-weight: 400;
      color: ${palette.gray800};
      text-align: right;
      margin-left: auto;
      flex-shrink: 0;
    }

    + li {
      padding-top: 12px;
      margin-top: 12px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }
`;

const AnalysisBox = styled.div`
  max-height: ${(props) => (props.isMoreView ? "1000px" : "115px")};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

const MoreViewButtonWrap = styled.div`
  position: relative;
  align-items: center;
  margin-top: 14x;

  &:before {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 100%;
    height: ${(props) => (props.isMoreView ? "" : "100px")}; //그라데이션 높이
    background: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    content: "";
  }
`;

const MoreButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  color: ${palette.gray800};
  border: 0;
  background: none;

  &:after {
    width: 8px;
    height: 8px;
    margin-top: ${(props) => (props.isMoreView ? "5px" : "")};
    transform: ${(props) =>
      props.isMoreView ? "rotate(-135deg)" : "rotate(45deg)"};
    border-right: 2px solid ${palette.gray800};
    border-bottom: 2px solid ${palette.gray800};
    transition: all 0.5s;
    content: "";
  }
`;
