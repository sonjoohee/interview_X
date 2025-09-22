import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import MoleculePanelItemCard from "../molecules/MoleculePanelItemCard";
import MoleculePanelItemList from "../molecules/MoleculePanelItemList";
import MoleculePanelControls from "../molecules/MoleculePanelControls";
import { palette } from "../../../../assets/styles/Palette";
import { Link } from "react-router-dom";
import OrganismPanelSectionBottomBar from "./OrganismPanelSectionBottomBar"; // 하단 바 컴포넌트 import

import { useAtom } from "jotai";
import axios from "axios";
import {
  TOTAL_PANEL_COUNT,
  PANEL_LIST,
  SELECTED_PANEL_COUNT,
  SEARCH_BEHABIORAL_TYPE,
  SEARCH_UTILIZATION_TIME,
  SEARCH_GENDER,
  SEARCH_AGE,
  SEARCH_MARRIAGE,
  SEARCH_CHILD_M,
  SEARCH_CHILD_F,
  SEARCH_TAG_1,
  SEARCH_TAG_2,
  SEARCH_TAG_3,
  SEARCH_TAG_4,
  PANEL_LIST_PAGE_COUNT,
  SELECTED_COUNT,
  SELECTED_PANELS,
  VIEW_PANEL_TYPE,
  SELECTED_ALL_PANELS,
  IS_ALL_PANELS_LOADED,
  FILTERD_PANEL_COUNT,
  IS_RE_SEARCH,
  PANEL_TOTAL_VALUE,
  IS_PANEL_NULL,
} from "../../../AtomStates";

const OrganismPanelSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [panelList, setPanelList] = useAtom(PANEL_LIST);
  const [searchBehabioralType, setSearchBehabioralType] = useAtom(
    SEARCH_BEHABIORAL_TYPE
  );
  const [searchUtilizationTime, setSearchUtilizationTime] = useAtom(
    SEARCH_UTILIZATION_TIME
  );
  const [searchGender, setSearchGender] = useAtom(SEARCH_GENDER);
  const [searchAge, setSearchAge] = useAtom(SEARCH_AGE);
  const [searchMarriage, setSearchMarriage] = useAtom(SEARCH_MARRIAGE);
  const [searchChildM, setSearchChildM] = useAtom(SEARCH_CHILD_M);
  const [searchChildF, setSearchChildF] = useAtom(SEARCH_CHILD_F);
  const [searchTag1, setSearchTag1] = useAtom(SEARCH_TAG_1);
  const [searchTag2, setSearchTag2] = useAtom(SEARCH_TAG_2);
  const [searchTag3, setSearchTag3] = useAtom(SEARCH_TAG_3);
  const [searchTag4, setSearchTag4] = useAtom(SEARCH_TAG_4);
  const [panelListPageCount, setPanelListPageCount] = useAtom(
    PANEL_LIST_PAGE_COUNT
  );
  const [selectedCount, setSelectedCount] = useAtom(SELECTED_COUNT);
  const [selectedPanels, setSelectedPanels] = useAtom(SELECTED_PANELS); // 선택된 패널의 ID 저장
  const [viewPanelType, setViewPanelType] = useAtom(VIEW_PANEL_TYPE);
  const [selectedAllPanels, setSelectedAllPanels] =
    useAtom(SELECTED_ALL_PANELS); // 전체 선택 버튼

  const [totalPanelCount, setTotalPanelCount] = useAtom(TOTAL_PANEL_COUNT);
  const [filterdPanelCount, setFilterdPanelCount] =
    useAtom(FILTERD_PANEL_COUNT);

  const [isAllPanelsLoaded, setIsAllPanelsLoaded] =
    useAtom(IS_ALL_PANELS_LOADED);

  const [isPanelNull, setIsPanelNull] = useAtom(IS_PANEL_NULL);

  // 행동타입이 필터에 걸려있을때 최초검색(0)인지 재검색(1)인지
  // 재검색은 패널더보기, 칩삭제
  const [isReSearch, setIsReSearch] = useAtom(IS_RE_SEARCH);

  // 행동타입값 5개 저장
  const [panelTotalValue, setPanelTotalValue] = useAtom(PANEL_TOTAL_VALUE);

  // handleAllSelectChange 함수 추가
  const handleAllSelectChange = (e) => {
    if (e.target.checked) {
      // 전체 선택 상태로 설정
      const allPanelIds = new Set(panelList?.map((panel) => panel.id));
      setSelectedPanels(allPanelIds);
      setSelectedCount(panelList.length);
      setSelectedAllPanels(true);
    } else {
      // 전체 선택 해제 상태로 설정
      setSelectedPanels(new Set());
      setSelectedCount(0);
      setSelectedAllPanels(false);
    }
  };

  // 전체선택 버튼 (비)활성화 상태관리
  useEffect(() => {
    panelList.length === selectedCount
      ? setSelectedAllPanels(true)
      : setSelectedAllPanels(false);
  }, [selectedCount, panelList]);

  useEffect(() => {
    if (selectedAllPanels) {
      const allPanelIds = new Set(panelList?.map((panel) => panel.id));
      setSelectedCount(panelList.length);
      setSelectedPanels(allPanelIds);
    } else {
      // setSelectedCount(0);
      // setSelectedPanels(new Set());
    }
  }, [selectedAllPanels]);

  // 패널 저장 테스트용
  useEffect(() => {
    // console.log("selectedPanels:", selectedPanels);
  }, [selectedPanels]);

  const handleSelect = (isSelected, panelId) => {
    // console.log("Selected Panel ID:", panelId);
    setSelectedCount((prevCount) => {
      const newCount = isSelected ? prevCount + 1 : prevCount - 1;
      return Math.min(filterdPanelCount, Math.max(0, newCount)); // 마이너스 방지
    });
    setSelectedPanels((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (isSelected) {
        if (newSelected.size < filterdPanelCount) {
          newSelected.add(panelId);
        }
      } else {
        newSelected.delete(panelId);
      }
      return newSelected;
    });
  };

  const handleLoadMore = () => {
    if (panelList.length < filterdPanelCount) {
      setPanelListPageCount((prevPageCount) => prevPageCount + 1);
    }
  };

  const handleViewChange = (e) => {
    // console.log(`View changed to: ${e.target.value}`);
  };

  // 최초 패널 리스트
  useEffect(() => {
    setIsPanelNull(true);

    const fetchInitialPanelList = async () => {
      // console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20&searchBehabioralType=&searchUtilizationTime=&searchGender=&searchAge=&searchTag=&searchMarriage=&searchChildM=&searchChildF=`
        );
        setPanelList(response.data.results);
        setTotalPanelCount(response.data.count); // 전체 패널 개수
        setFilterdPanelCount(response.data.count); // 필터링된 패널 개수

        // console.log(panelList)
        // console.log(response);

        if (response.data.results.length < 20) setIsAllPanelsLoaded(true); // 20개 미만의 데이터가 오면 동작
      } catch (error) {
        console.error("Error fetching panel list:", error);
      } finally {
        setIsPanelNull(false);
      }
    };

    fetchInitialPanelList();
  }, []);

  // 추가 패널 리스트
  useEffect(() => {
    if (panelListPageCount > 1 && panelList.length < filterdPanelCount) {
      setIsPanelNull(true);

      const combinedTags = [...searchTag1, ...searchTag2, ...searchTag3]; // 소비습관, 기술수용도 하나의 태그에 담아서 보냄

      setIsLoading(true); // 검색 시작 시 로딩 상태 활성화
      const fetchAdditionalPanelList = async () => {
        // console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);

        try {
          let apiUrl = ``;
          if (!searchBehabioralType || isReSearch === 0) {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/panels/list?page=${panelListPageCount}&size=20
            &searchCode=&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}&searchGender=${searchGender}&searchAge=${searchAge}&searchTag=${combinedTags}&searchMarriage=${searchMarriage}&searchChildM=${searchChildM}&searchChildF=${searchChildF}`;
          } // 행동타입 최초검색 또는 행동타입이 검색 조건에 없을 때
          else {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/panels/list?page=${panelListPageCount}&size=20
            &searchCode=${panelTotalValue}&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}&searchGender=${searchGender}&searchAge=${searchAge}&searchTag=${combinedTags}&searchMarriage=${searchMarriage}&searchChildM=${searchChildM}&searchChildF=${searchChildF}`;
          } // 행동타입 재검색

          const response = await axios.get(apiUrl);

          setPanelList((prevPanelList) => [
            ...prevPanelList,
            ...response.data.results,
          ]); // 리스트 초기화 하지 않고 아래에 붙이기
          setFilterdPanelCount(response.data.count); // 필터링된 패널 개수

          // console.log(panelList)
          // console.log(response)

          // 20개 미만의 패널이 오거나, 더 이상 불러올 패널이 없을 때 활성화
          if (
            response.data.results.length < 20 ||
            panelList.length + response.data.results.length >= filterdPanelCount
          )
            setIsAllPanelsLoaded(true);
        } catch (error) {
          console.error("Error fetching panel list:", error);
        } finally {
          setIsPanelNull(false);
          setIsLoading(false); // 검색 완료 시 로딩 상태 비활성화
        }
      };

      fetchAdditionalPanelList();
    }
  }, [panelListPageCount]); // panelListPageCount가 변경될 때마다 실행

  // panelData가 유효한지 확인
  if (!Array.isArray(panelList) || panelList.length === 0) {
    if (isPanelNull) return <NoData>패널 데이터를 불러오고 있습니다.</NoData>;
    else return <NoData>패널 데이터가 없습니다.</NoData>;
  }

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <div className="loader"></div>
        </LoadingOverlay>
      )}
      <PanelWrap>
        <MoleculePanelControls
          selectedCount={selectedCount}
          loadedPanelCount={panelList.length}
          handleAllSelectChange={handleAllSelectChange}
        />
        {viewPanelType ? (
          <>
            <CardViewContainer>
              {panelList?.map((panel, index) => (
                <MoleculePanelItemCard
                  key={panel.id}
                  id={panel.id}
                  gender={panel.gender}
                  age={panel.age}
                  job={panel.job}
                  address={panel.address}
                  subAddress={panel.subAddress}
                  imgSrc={(index % 10) + 1} // 1부터 10까지 반복되는 숫자
                  tags={panel.tag}
                  comment={panel.comment}
                  lifeStyle={panel.lifeStyle}
                  consumption={panel.consumptionPropensity}
                  productGroup={panel.productGroup}
                  target_1={panel.target_1}
                  target_2={panel.target_2}
                  target_3={panel.target_3}
                  target_4={panel.target_4}
                  target_5={panel.target_5}
                  value_1={panel.value_1}
                  value_2={panel.value_2}
                  value_3={panel.value_3}
                  value_4={panel.value_4}
                  value_5={panel.value_5}
                  onSelect={handleSelect}
                />
              ))}
            </CardViewContainer>
          </>
        ) : (
          <ListViewContainer>
            {panelList?.map((panel, index) => (
              <MoleculePanelItemList
                key={panel.id}
                id={panel.id}
                gender={panel.gender}
                age={panel.age}
                job={panel.job}
                address={panel.address}
                subAddress={panel.subAddress}
                imgSrc={(index % 10) + 1} // 1부터 10까지 반복되는 숫자
                tags={panel.tag}
                comment={panel.comment}
                lifeStyle={panel.lifeStyle}
                consumption={panel.consumptionPropensity}
                productGroup={panel.productGroup}
                target_1={panel.target_1}
                target_2={panel.target_2}
                target_3={panel.target_3}
                target_4={panel.target_4}
                target_5={panel.target_5}
                value_1={panel.value_1}
                value_2={panel.value_2}
                value_3={panel.value_3}
                value_4={panel.value_4}
                value_5={panel.value_5}
                onSelect={handleSelect}
              />
            ))}
          </ListViewContainer>
        )}
        {isAllPanelsLoaded ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        ) : (
          <LoadMoreButton
            isBottomBarVisible={selectedCount > 0}
            onClick={handleLoadMore}
          >
            패널 더보기
          </LoadMoreButton>
        )}
      </PanelWrap>
      {selectedCount > 0 && (
        <OrganismPanelSectionBottomBar
          onSaveSelection={() => alert("선택패널이 저장되었습니다.")}
        />
      )}
    </>
  );
};

export default OrganismPanelSection;

const NoData = styled.p`
  min-height: 700px;
`;

const PanelWrap = styled.section`
  .sortBooth {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .choicePanel {
    strong {
      font-weight: 400;
      margin: 0 12px;
      padding: 4px 20px;
      border-radius: 10px;
      background: rgba(4, 83, 244, 0.1);
    }
  }

  .viewList {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;

    input[type="radio"] {
      opacity: 0;
    }

    input[type="radio"] + label {
      position: relative;
      padding-left: 28px;
      cursor: pointer;
    }
  }
`;

const CardViewContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px; /* 기본적으로 충분한 하단 여백 추가 */
`;

const ListViewContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const LoadMoreButton = styled.button`
  position: relative;
  font-size: 0.875rem;
  color: ${palette.gray};
  display: block;
  margin: ${({ isBottomBarVisible }) =>
    isBottomBarVisible
      ? "50px auto 120px"
      : "50px auto 120px"}; /* 하단 바가 보일 때 더 위로 이동 */
  padding: 12px 20px;
  border: 1px solid ${palette.gray};
  border-radius: 40px;
  cursor: pointer;
  background-color: ${palette.white};
  z-index: 10;
  transition: all 0.5s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const CreatePanelLink = styled(Link)`
  display: block;
  margin: ${({ isBottomBarVisible }) =>
    isBottomBarVisible
      ? "20px auto 120px"
      : "20px auto"}; /* 하단 바가 보일 때 더 위로 이동 */
  padding: 10px 20px;
  background-color: ${palette.blue};
  color: ${palette.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  z-index: 10;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader {
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
