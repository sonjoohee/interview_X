// src/components/molecules/MoleculeSearchForm.jsx
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TOTAL_PANEL_COUNT,
  PANEL_LIST,
  SELECTED_COUNT,
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
  PANEL_LIST_PAGE_COUNT,
  IS_ALL_PANELS_LOADED,
  FILTERD_PANEL_COUNT,
  SELECTED_PANELS,
  IS_RE_SEARCH,
  PANEL_TOTAL_VALUE,
  IS_PANEL_NULL,
} from "../../../AtomStates";

import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { InputField, CheckBox } from "../../../../assets/styles/Input";
import Button from "../../../../assets/styles/Button";
import images from "../../../../assets/styles/Images";

const MoleculeSearchForm = () => {
  const [totalPanelCount, setTotalPanelCount] = useAtom(TOTAL_PANEL_COUNT);
  const [panelList, setPanelList] = useAtom(PANEL_LIST);
  const [selectedCount, setSelectedCount] = useAtom(SELECTED_COUNT);
  const [panelListPageCount, setPanelListPageCount] = useAtom(
    PANEL_LIST_PAGE_COUNT
  );

  // 검색 관련 atoms
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

  const [isAllPanelsLoaded, setIsAllPanelsLoaded] =
    useAtom(IS_ALL_PANELS_LOADED);
  const [filterdPanelCount, setFilterdPanelCount] =
    useAtom(FILTERD_PANEL_COUNT);
  const [selectedPanels, setSelectedPanels] = useAtom(SELECTED_PANELS); // 선택된 패널의 ID 저장

  // 행동타입이 필터에 걸려있을때 최초검색(0)인지 재검색(1)인지
  // 재검색은 패널더보기, 칩삭제
  const [isReSearch, setIsReSearch] = useAtom(IS_RE_SEARCH);

  // 행동타입값 5개 저장
  const [panelTotalValue, setPanelTotalValue] = useAtom(PANEL_TOTAL_VALUE);

  const [isPanelNull, setIsPanelNull] = useAtom(IS_PANEL_NULL);

  const [isLoading, setIsLoading] = useState(false);

  const [showDetailOption, setShowDetailOption] = useState(false);
  const [showTimeOption, setShowTimeOption] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    behabioralType: "",
    utilizationTime: "",
    gender: [],
    age: [],
    marriage: [],
    childM: "",
    childF: "",
    tag1: [],
    tag2: [],
    tag3: [],
  });
  const [tempBehabioralType, setTempBehabioralType] = useState("");
  const [tempUtilizationTime, setTempUtilizationTime] = useState("");
  const [tempGender, setTempGender] = useState([]);
  const [tempAge, setTempAge] = useState([]);
  const [tempMarriage, setTempMarriage] = useState([]);
  const [tempChildM, setTempChildM] = useState("");
  const [tempChildF, setTempChildF] = useState("");
  const [tempTag1, setTempTag1] = useState([]);
  const [tempTag2, setTempTag2] = useState([]);
  const [tempTag3, setTempTag3] = useState([]);

  const [shouldSearch, setShouldSearch] = useState(false); // 필터가 변경되어 검색이 필요한지?
  const [isAfterSearch, setIsAfterSearch] = useState(false); // 검색을 하기전인지 하고난후인지?

  // 초기상태 설정
  useEffect(() => {
    setTotalPanelCount(0);
    setPanelList([]);
    setSelectedCount(0);
    setSearchBehabioralType("");
    setSearchUtilizationTime("");
    setSearchGender([]);
    setSearchAge([]);
    setSearchMarriage([]);
    setSearchChildM("");
    setSearchChildF("");
    setSearchTag1([]);
    setSearchTag2([]);
    setSearchTag3([]);
    setIsAllPanelsLoaded(false);
    setFilterdPanelCount(0);
    setSelectedPanels(new Set());
    setShowDetailOption(false);
    setShowTimeOption(false);
    setSelectedFilters({
      behabioralType: "",
      utilizationTime: "",
      gender: [],
      age: [],
      marriage: [],
      childM: "",
      childF: "",
      tag1: [],
      tag2: [],
      tag3: [],
    });

    setTempBehabioralType("");
    setTempUtilizationTime("");
    setTempGender([]);
    setTempAge([]);
    setTempMarriage([]);
    setTempChildM("");
    setTempChildF("");
    setTempTag1([]);
    setTempTag2([]);
    setTempTag3([]);
    setShouldSearch(false);
    setIsAfterSearch(false);
    setIsReSearch(0);
    setPanelTotalValue([]);
  }, []);

  // 행동 타입만 해제되었다면 재검색 여부 초기화
  useEffect(() => {
    setIsReSearch(0);
  }, [searchBehabioralType]);

  useEffect(() => {
    // 모든 필터가 해제되었다면 검색 여부 초기화
    if (
      !searchBehabioralType &&
      !searchUtilizationTime &&
      !searchGender.length &&
      !searchAge.length &&
      !searchMarriage.length &&
      !searchChildM &&
      !searchChildF &&
      !searchTag1.length &&
      !searchTag2.length &&
      !searchTag3.length
    ) {
      setIsAfterSearch(false);
    }

    // 검색을 하고 난 후 필터가 변경되었다면 재검색
    if (shouldSearch && isAfterSearch) {
      handleSearch();
      setShouldSearch(false);
    }

    // 검색값이 바뀔 때마다 임시값도 초기화
    setTempBehabioralType(searchBehabioralType);
    setTempUtilizationTime(searchUtilizationTime);
    setTempGender(searchGender);
    setTempAge(searchAge);
    setTempMarriage(searchMarriage);
    setTempChildM(searchChildM);
    setTempChildF(searchChildF);
    setTempTag1(searchTag1);
    setTempTag2(searchTag2);
    setTempTag3(searchTag3);
  }, [
    isAfterSearch,
    shouldSearch,
    searchBehabioralType,
    searchUtilizationTime,
    searchGender,
    searchAge,
    searchMarriage,
    searchChildM,
    searchChildF,
    searchTag1,
    searchTag2,
    searchTag3,
  ]);

  // 상세옵션 취소 함수
  const cancleDetailOption = () => {
    if (showTimeOption) setShowTimeOption((prev) => !prev);
    setShowDetailOption((prev) => !prev);

    setTempBehabioralType(searchBehabioralType);
    setTempUtilizationTime(searchUtilizationTime);
    setTempGender(searchGender);
    setTempAge(searchAge);
    setTempMarriage(searchMarriage);
    setTempChildM(searchChildM);
    setTempChildF(searchChildF);
    setTempTag1(searchTag1);
    setTempTag2(searchTag2);
    setTempTag3(searchTag3);
  };

  // 선택 초기화 함수
  const resetSelectionOption = () => {
    setIsAllPanelsLoaded(false);

    setSelectedFilters({
      behabioralType: "",
      utilizationTime: "",
      gender: [],
      age: [],
      marriage: [],
      childM: "",
      childF: "",
      tag1: [],
      tag2: [],
      tag3: [],
    });

    setTempBehabioralType("");
    setTempUtilizationTime("");
    setTempGender([]);
    setTempAge([]);
    setTempMarriage([]);
    setTempChildM("");
    setTempChildF("");
    setTempTag1([]);
    setTempTag2([]);
    setTempTag3([]);

    setSearchBehabioralType("");
    setSearchUtilizationTime("");
    setSearchGender([]);
    setSearchAge([]);
    setSearchMarriage([]);
    setSearchChildM("");
    setSearchChildF("");
    setSearchTag1([]);
    setSearchTag2([]);
    setSearchTag3([]);

    setShouldSearch(true);
  };

  const handleDetailOptionToggle = () => {
    if (showTimeOption) setShowTimeOption((prev) => !prev);
    setShowDetailOption((prev) => !prev);
  };
  const handleTimeOptionToggle = () => {
    if (showDetailOption) setShowDetailOption((prev) => !prev);
    setShowTimeOption((prev) => !prev);
  };

  const handleSearch = async () => {
    if (tempBehabioralType && !tempUtilizationTime) {
      alert("활용 시간을 입력해주세요.");
      return;
    }

    setIsAfterSearch(true);
    setIsPanelNull(true);

    setPanelList([]); // 검색할 때마다 패널리스트 초기화
    setIsAfterSearch(true);
    setIsLoading(true); // 검색 시작 시 로딩 상태 활성화

    const combinedTags = [...searchTag1, ...searchTag2, ...searchTag3]; // 소비습관, 기술수용도 하나의 태그에 담아서 보냄

    try {
      let apiUrl = ``;
      if (!searchBehabioralType || isReSearch === 0) {
        apiUrl = `${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20
        &searchCode=&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}&searchGender=${searchGender}&searchAge=${searchAge}&searchTag=${combinedTags}&searchMarriage=${searchMarriage}&searchChildM=${searchChildM}&searchChildF=${searchChildF}`;
      } // 행동타입 최초검색 또는 행동타입이 검색 조건에 없을 때
      else {
        apiUrl = `${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20
        &searchCode=${panelTotalValue}&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}&searchGender=${searchGender}&searchAge=${searchAge}&searchTag=${combinedTags}&searchMarriage=${searchMarriage}&searchChildM=${searchChildM}&searchChildF=${searchChildF}`;
      } // 행동타입 재검색

      const response = await axios.get(apiUrl);

      // console.log(response);

      if (searchBehabioralType) setIsReSearch(1); // 행동타입 검색을 했으면 재검색 모드

      setPanelList(response.data.results);
      setFilterdPanelCount(response.data.count); // 필터링된 패널 개수

      if (response.data.results.length > 0) {
        const firstResult = response.data.results[0];

        // target_1 속성 존재 여부 확인
        setPanelTotalValue([
          firstResult.hasOwnProperty("target_1") ? firstResult.target_1 : null,
          firstResult.hasOwnProperty("target_2") ? firstResult.target_2 : null,
          firstResult.hasOwnProperty("target_3") ? firstResult.target_3 : null,
          firstResult.hasOwnProperty("target_4") ? firstResult.target_4 : null,
          firstResult.hasOwnProperty("target_5") ? firstResult.target_5 : null,
        ]);
      } else {
        setPanelTotalValue([]);
      }

      setSelectedCount(0); // 선택된 패널 개수 초기화
      setSelectedPanels(new Set()); // 선택된 패널 ID 초기화

      if (response.data.results.length < 20)
        setIsAllPanelsLoaded(true); // 20개 미만의 데이터가 오면 동작
      else setIsAllPanelsLoaded(false);
    } catch (error) {
      console.error("Error fetching panel list:", error);
    } finally {
      setIsPanelNull(false);
      setIsLoading(false);
    }
  };

  const handleApplyDetail = () => {
    if (
      !tempGender.length &&
      !tempAge.length &&
      !tempMarriage.length &&
      tempChildM === "" &&
      tempChildF === "" &&
      !tempTag1.length &&
      !tempTag2.length &&
      !tempTag3.length
    ) {
      alert("상세 옵션에 적용할 항목을 선택해주세요.");
      return;
    }

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      gender: tempGender,
      age: tempAge,
      marriage: tempMarriage,
      childM: tempChildM,
      childF: tempChildF,
      tag1: tempTag1,
      tag2: tempTag2,
      tag3: tempTag3,
    }));

    setSearchGender(tempGender);
    setSearchAge(tempAge);
    setSearchMarriage(tempMarriage);
    setSearchChildM(tempChildM);
    setSearchChildF(tempChildF);
    setSearchTag1(tempTag1);
    setSearchTag2(tempTag2);
    setSearchTag3(tempTag3);

    setShowDetailOption(false);
  };

  const handleRemoveFilter = (filterKey, filterValue = null) => {
    // 칩 삭제하면 페이징 초기화
    setPanelListPageCount(1);
    // console.log(filterKey, filterValue);
    // 칩 삭제하면 검색값상태 초기화
    if (filterKey === "behabioralType") {
      selectedFilters.behabioralType = "";
      selectedFilters.utilizationTime = "";
      setSearchUtilizationTime("");
      setSearchBehabioralType("");
    } else if (filterKey === "gender") {
      if (selectedFilters.gender.length === 2) {
        setSearchGender([]);
        selectedFilters.gender = [];
      } else if (filterValue !== null) {
        setSearchGender((prevGender) =>
          prevGender.filter((gender) => gender !== filterValue)
        );
        selectedFilters.gender.filter((gender) => gender !== filterValue);
      } else {
        setSearchGender([]);
        selectedFilters.gender = [];
      }
    } else if (filterKey === "age") {
      if (selectedFilters.age.length === 6) {
        setSearchAge([]);
        selectedFilters.age = [];
      } else if (filterValue !== null) {
        setSearchAge((prevAge) => prevAge.filter((age) => age !== filterValue));
        selectedFilters.age.filter((age) => age !== filterValue);
      } else {
        setSearchAge([]);
        selectedFilters.age = [];
      }
    } else if (filterKey === "marriage") {
      if (selectedFilters.marriage.length === 3) {
        setSearchMarriage([]);
        selectedFilters.marriage = [];
      } else if (filterValue !== null) {
        setSearchMarriage((prevMarriage) =>
          prevMarriage.filter((marriage) => marriage !== filterValue)
        );
        selectedFilters.marriage.filter((marriage) => marriage !== filterValue);
      } else {
        setSearchMarriage([]);
        selectedFilters.marriage = [];
      }
    } else if (filterKey === "childM") {
      selectedFilters.childM = "";
      setSearchChildM("");
    } else if (filterKey === "childF") {
      selectedFilters.childF = "";
      setSearchChildF("");
    } else if (filterKey === "tag1") {
      if (selectedFilters.tag1.length === 2) {
        setSearchTag1([]);
        selectedFilters.tag1 = [];
      } else if (filterValue !== null) {
        setSearchTag1((prevtag1) =>
          prevtag1.filter((tag1) => tag1 !== filterValue)
        );
        selectedFilters.tag1.filter((tag1) => tag1 !== filterValue);
      } else {
        setSearchTag1([]);
      }
    } else if (filterKey === "tag2") {
      if (selectedFilters.tag2.length === 2) {
        setSearchTag2([]);
        selectedFilters.tag2 = [];
      } else if (filterValue !== null) {
        setSearchTag2((prevtag2) =>
          prevtag2.filter((tag2) => tag2 !== filterValue)
        );
        selectedFilters.tag2.filter((tag2) => tag2 !== filterValue);
      } else {
        setSearchTag2([]);
      }
    } else if (filterKey === "tag3") {
      if (selectedFilters.tag3.length === 5) {
        setSearchTag3([]);
        selectedFilters.tag3 = [];
      } else if (filterValue !== null) {
        setSearchTag3((prevtag3) =>
          prevtag3.filter((tag3) => tag3 !== filterValue)
        );
        selectedFilters.tag3.filter((tag3) => tag3 !== filterValue);
      } else {
        setSearchTag3([]);
        selectedFilters.tag3 = [];
      }
    }
    setSelectedFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [filterKey]:
          filterValue !== null
            ? prevFilters[filterKey].filter((item) => item !== filterValue)
            : "",
      };
      return newFilters;
    });

    setShouldSearch(true);
  };

  // 상세옵션 선택 함수
  const handleDetailOptionSelect = (key, val) => {
    if (key === "gender") {
      setTempGender((prevGender) => {
        if (val === "all") {
          return prevGender.length === 2 ? [] : ["M", "F"];
        } else if (prevGender.length === 2) {
          return [val];
        } else {
          return prevGender.includes(val) ? [] : [val];
        }
      });
    } else if (key == "age") {
      setTempAge((prevAge) => {
        const newSet = new Set(prevAge);
        if (val === "all") {
          return prevAge.length === 6 ? [] : [10, 20, 30, 40, 50, 60];
        } else if (newSet.has(val)) {
          newSet.delete(val);
        } else {
          newSet.add(val);
        }
        return Array.from(newSet);
      });
    } else if (key === "marriage") {
      setTempMarriage((prevMarriage) => {
        const newSet = new Set(prevMarriage);
        if (val === "all") {
          return prevMarriage.length === 3 ? [] : ["미혼", "기혼", "사별"];
        } else if (newSet.has(val)) {
          newSet.delete(val);
        } else {
          newSet.add(val);
        }
        return Array.from(newSet);
      });
    } else if (key === "child") {
      setTempChildM((prevChildM) => {
        if (prevChildM === val) {
          return "";
        } else {
          return val;
        }
      });
      setTempChildF((prevChildF) => {
        if (prevChildF === val) {
          return "";
        } else {
          return val;
        }
      });
    } else if (key === "tag1") {
      setTempTag1((prevTag1) => {
        if (val === "all") {
          return prevTag1.length === 2 ? [] : ["충동구매자", "계획구매자"];
        } else if (prevTag1.length === 2) {
          return [val];
        } else {
          return prevTag1.includes(val) ? [] : [val];
        }
      });
    } else if (key === "tag2") {
      setTempTag2((prevTag2) => {
        if (val === "all") {
          return prevTag2.length === 2 ? [] : ["절약형", "고급형"];
        } else if (prevTag2.length === 2) {
          return [val];
        } else {
          return prevTag2.includes(val) ? [] : [val];
        }
      });
    } else if (key === "tag3") {
      setTempTag3((prevTag3) => {
        const newSet = new Set(prevTag3);
        if (val === "all") {
          return prevTag3.length === 5
            ? []
            : [
                "혁신가",
                "얼리어답터",
                "보통 사용자",
                "후기 사용자",
                "보수적 사용자",
              ];
        } else if (newSet.has(val)) {
          newSet.delete(val);
        } else {
          newSet.add(val);
        }
        return Array.from(newSet);
      });
    }
  };

  // 활용시간 선택 함수
  const handleTimeOptionSelect = (val) => {
    if (!tempBehabioralType) {
      alert("행동 타입을 입력해주세요.");
      return;
    }
    setTempUtilizationTime((prevUtilizationTime) => {
      // if (!prevUtilizationTime || prevUtilizationTime != val) {
      //   return val;
      // }
      // else {
      //   return "";
      // }
      return val;
    });
  };

  useEffect(() => {
    if (tempUtilizationTime) {
      handleBehabioralTimeOption();
    }
  }, [tempUtilizationTime]);

  useEffect(() => {
    if (tempUtilizationTime) {
      setTempBehabioralType("");
      setSearchBehabioralType("");
      selectedFilters.behabioralType = "";

      setTempUtilizationTime("");
      setSearchUtilizationTime("");
      selectedFilters.utilizationTime = "";

      setShouldSearch(true);
    }
  }, [tempBehabioralType]);

  // 행동타입, 활용시간 선택적용 함수
  const handleBehabioralTimeOption = () => {
    const regex = /^[가-힣a-zA-Z0-9\s.,'"-]*$/;
    if (!regex.test(tempBehabioralType)) {
      alert(
        "행동 타입에 한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한 경우 검색이 제한되니, 문장을 완전하게 입력해주세요."
      );
      return;
    }
    if (tempBehabioralType.length > 100) {
      alert("행동 타입은 100자 이내로 입력주세요.");
      return;
    }

    selectedFilters.behabioralType = tempBehabioralType;
    selectedFilters.utilizationTime = tempUtilizationTime;

    setSearchBehabioralType(tempBehabioralType);
    setSearchUtilizationTime(tempUtilizationTime);

    setShowTimeOption(false);
  };

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <div className="loader"></div>
        </LoadingOverlay>
      )}
      <SearchFormWrap>
        <div className="searchForm">
          <div>
            <span>행동 타입</span>
            <InputField
              None
              type="text"
              name="type"
              placeholder="입력하세요"
              value={tempBehabioralType}
              onChange={(e) => setTempBehabioralType(e.target.value)}
            />
          </div>
          <div>
            <span>활용 시간</span>
            <Button SelectBtn onClick={handleTimeOptionToggle}>
              {!tempUtilizationTime ? "선택하세요" : tempUtilizationTime}
            </Button>
            {/* <InputField None type="text" name="type" placeholder="선택하세요" /> */}
            {showTimeOption && (
              <DetailOptions>
                <div>
                  <div>
                    <button
                      className={tempUtilizationTime === "적게" ? "active" : ""}
                      onClick={() => {
                        handleTimeOptionSelect("적게");
                      }}
                    >
                      적게
                    </button>
                    <button
                      className={tempUtilizationTime === "보통" ? "active" : ""}
                      onClick={() => {
                        handleTimeOptionSelect("보통");
                      }}
                    >
                      보통
                    </button>
                    <button
                      className={tempUtilizationTime === "많이" ? "active" : ""}
                      onClick={() => {
                        handleTimeOptionSelect("많이");
                      }}
                    >
                      많이
                    </button>
                    <button
                      className={tempUtilizationTime === "모두" ? "active" : ""}
                      onClick={() => {
                        handleTimeOptionSelect("모두");
                      }}
                    >
                      모두
                    </button>
                  </div>
                </div>
              </DetailOptions>
            )}
          </div>
          <div>
            <span>상세 옵션</span>
            <Button SelectBtn onClick={handleDetailOptionToggle}>
              선택하세요
            </Button>
            {/* <InputField None type="text" name="type" placeholder="선택하세요" /> */}
            {showDetailOption && (
              <DetailOptions Full>
                <h4 onClick={handleDetailOptionToggle}>
                  상세옵션<span></span>
                </h4>

                <div>
                  <p>성별</p>
                  <div className="gender">
                    <button
                      className={tempGender.includes("M") ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("gender", "M")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="33"
                        viewBox="0 0 15 33"
                        fill="none"
                      >
                        <path
                          d="M4.33359 13.4999V29.9999C4.33133 30.1975 4.36859 30.3936 4.44317 30.5766C4.51775 30.7596 4.62815 30.9259 4.76789 31.0656C4.90763 31.2054 5.07389 31.3158 5.2569 31.3904C5.43991 31.4649 5.63598 31.5022 5.83359 31.4999C6.0312 31.5022 6.22727 31.4649 6.41028 31.3904C6.59329 31.3158 6.75955 31.2054 6.89929 31.0656C7.03903 30.9259 7.14944 30.7596 7.22402 30.5766C7.2986 30.3936 7.33585 30.1975 7.33359 29.9999"
                          stroke="#777"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M7.33359 21.4999V29.9999C7.33133 30.1975 7.36859 30.3936 7.44317 30.5766C7.51775 30.7596 7.62815 30.9259 7.76789 31.0656C7.90763 31.2054 8.07389 31.3158 8.2569 31.3904C8.43991 31.4649 8.63598 31.5022 8.83359 31.4999C9.0312 31.5022 9.22727 31.4649 9.41028 31.3904C9.59329 31.3158 9.75955 31.2054 9.89929 31.0656C10.039 30.9259 10.1494 30.7596 10.224 30.5766C10.2986 30.3936 10.3359 30.1975 10.3336 29.9999V13.4999"
                          stroke="#777"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M4.3336 12.4999V17.9999C4.33595 18.1976 4.29875 18.3937 4.2242 18.5767C4.14965 18.7598 4.03925 18.9261 3.89949 19.0658C3.75973 19.2056 3.59344 19.316 3.41039 19.3905C3.22734 19.4651 3.03123 19.5023 2.8336 19.4999C2.63597 19.5023 2.43986 19.4651 2.25681 19.3905C2.07376 19.316 1.90747 19.2056 1.76771 19.0658C1.62795 18.9261 1.51755 18.7598 1.443 18.5767C1.36845 18.3937 1.33125 18.1976 1.3336 17.9999V12.4999C1.3336 11.7043 1.64967 10.9412 2.21228 10.3786C2.77489 9.81601 3.53795 9.49994 4.3336 9.49994H10.3336C11.1293 9.49994 11.8923 9.81601 12.4549 10.3786C13.0175 10.9412 13.3336 11.7043 13.3336 12.4999V17.9999C13.3359 18.1976 13.2988 18.3937 13.2242 18.5767C13.1497 18.7598 13.0393 18.9261 12.8995 19.0658C12.7597 19.2056 12.5934 19.316 12.4104 19.3905C12.2273 19.4651 12.0312 19.5023 11.8336 19.4999C11.636 19.5023 11.4399 19.4651 11.2568 19.3905C11.0738 19.316 10.9075 19.2056 10.7677 19.0658C10.628 18.9261 10.5176 18.7598 10.443 18.5767C10.3684 18.3937 10.3313 18.1976 10.3336 17.9999V12.4999"
                          stroke="#777"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M7.3335 6.49997C8.71421 6.49997 9.8335 5.38068 9.8335 3.99997C9.8335 2.61926 8.71421 1.49997 7.3335 1.49997C5.95278 1.49997 4.8335 2.61926 4.8335 3.99997C4.8335 5.38068 5.95278 6.49997 7.3335 6.49997Z"
                          stroke="#777"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                      </svg>
                      <span>남성</span>
                    </button>
                    <button
                      className={tempGender.includes("F") ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("gender", "F")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="33"
                        viewBox="0 0 18 33"
                        fill="none"
                      >
                        <path
                          d="M5.99912 23.5V30C5.99686 30.1976 6.03411 30.3937 6.10869 30.5767C6.18328 30.7597 6.29368 30.9259 6.43342 31.0657C6.57316 31.2054 6.73942 31.3158 6.92243 31.3904C7.10544 31.465 7.30151 31.5022 7.49912 31.5C7.69673 31.5022 7.8928 31.465 8.07581 31.3904C8.25882 31.3158 8.42508 31.2054 8.56482 31.0657C8.70456 30.9259 8.81497 30.7597 8.88955 30.5767C8.96413 30.3937 9.00138 30.1976 8.99912 30"
                          stroke="#777777"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9.00071 23.5V30C8.99845 30.1976 9.0357 30.3936 9.11028 30.5767C9.18486 30.7597 9.29527 30.9259 9.43501 31.0657C9.57475 31.2054 9.74101 31.3158 9.92402 31.3904C10.107 31.465 10.3031 31.5022 10.5007 31.5C10.6983 31.5022 10.8944 31.465 11.0774 31.3904C11.2604 31.3158 11.4267 31.2054 11.5664 31.0657C11.7061 30.9259 11.8166 30.7597 11.8911 30.5767C11.9657 30.3936 12.003 30.1976 12.0007 30V23.5M4.43821 17.625C4.38416 17.8151 4.29265 17.9925 4.16907 18.1467C4.04549 18.301 3.89232 18.429 3.71857 18.5232C3.54482 18.6174 3.354 18.6759 3.1573 18.6953C2.96061 18.7147 2.76202 18.6946 2.57321 18.6362C2.38311 18.5822 2.20573 18.4907 2.0515 18.3671C1.89728 18.2435 1.76933 18.0903 1.67517 17.9165C1.581 17.7428 1.52254 17.5519 1.5032 17.3552C1.48387 17.1586 1.50406 16.96 1.56258 16.7712L3.12508 11.5037C3.29738 10.9246 3.65215 10.4167 4.13655 10.0556C4.62095 9.69458 5.20904 9.49967 5.81321 9.49997H12.1882C12.7924 9.49988 13.3805 9.69503 13.8648 10.0563C14.3491 10.4176 14.7037 10.9258 14.8757 11.505L16.4382 16.7725C16.4967 16.9612 16.5169 17.1598 16.4976 17.3565C16.4783 17.5532 16.4198 17.744 16.3256 17.9178C16.2315 18.0915 16.1035 18.2447 15.9493 18.3683C15.7951 18.4919 15.6177 18.5834 15.4276 18.6375C15.2389 18.6953 15.0406 18.7149 14.8443 18.6951C14.648 18.6753 14.4576 18.6166 14.2842 18.5223C14.1109 18.428 13.9581 18.3001 13.8348 18.146C13.7116 17.9919 13.6203 17.8148 13.5663 17.625"
                          stroke="#777777"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M8.99902 6.49997C10.3797 6.49997 11.499 5.38068 11.499 3.99997C11.499 2.61926 10.3797 1.49997 8.99902 1.49997C7.61831 1.49997 6.49902 2.61926 6.49902 3.99997C6.49902 5.38068 7.61831 6.49997 8.99902 6.49997Z"
                          stroke="#777777"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M5.99902 12.5L2.99902 22.5H14.999L11.999 12.5"
                          stroke="#777777"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span>여성</span>
                    </button>
                    <button
                      className={tempGender.length === 2 ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("gender", "all")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="33"
                        viewBox="0 0 23 24"
                        fill="none"
                      >
                        <path
                          d="M4.8985 19.001L4.49328 18.3699L4.8985 19.001L8.82365 16.4807C8.99383 16.3714 9.21658 16.4989 9.20853 16.701L9.02021 21.4303C8.98067 22.4234 9.77502 23.25 10.7688 23.25H12.5582C13.5566 23.25 14.3527 22.4161 14.3063 21.4188L14.0877 16.7111C14.0782 16.5083 14.3016 16.3794 14.4725 16.4891L18.3944 19.0074C19.2319 19.5452 20.3488 19.2771 20.8509 18.4177L21.7833 16.8219C22.2888 15.9568 21.9661 14.8447 21.0761 14.3845L16.9312 12.2414C16.7516 12.1485 16.7508 11.8919 16.9299 11.7979L21.0886 9.616C21.9722 9.15242 22.2899 8.04501 21.7865 7.18347L20.8509 5.58225C20.3488 4.72287 19.2319 4.45477 18.3944 4.99255L14.4725 7.51081C14.3016 7.62049 14.0782 7.49162 14.0877 7.28884L14.3063 2.58118C14.3527 1.58387 13.5566 0.749969 12.5582 0.749969H10.7688C9.77502 0.749969 8.98067 1.57658 9.02021 2.5696L9.20853 7.29894C9.21657 7.50102 8.99383 7.62852 8.82365 7.51925L4.8985 4.99893C4.05444 4.45696 2.92845 4.73396 2.43217 5.60567L1.52729 7.19507C1.03744 8.05548 1.35831 9.15057 2.23504 9.61056L6.40412 11.7979C6.58319 11.8919 6.58242 12.1485 6.4028 12.2414L2.2474 14.3899C1.36427 14.8466 1.03847 15.9463 1.53036 16.8103L2.43217 18.3943C2.92846 19.266 4.05444 19.543 4.8985 19.001Z"
                          stroke="#777777"
                          stroke-width="1.5"
                        />
                      </svg>
                      <span>상관없음</span>
                    </button>
                  </div>

                  <p>나이</p>
                  <div>
                    <button
                      className={tempAge.includes(10) ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("age", 10)}
                    >
                      10대
                    </button>
                    <button
                      className={tempAge.includes(20) ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("age", 20)}
                    >
                      20대
                    </button>
                    <button
                      className={tempAge.includes(30) ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("age", 30)}
                    >
                      30대
                    </button>
                    <button
                      className={tempAge.includes(40) ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("age", 40)}
                    >
                      40대
                    </button>
                  </div>
                  <div>
                    <button
                      className={tempAge.includes(50) ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("age", 50)}
                    >
                      50대
                    </button>
                    <button
                      className={tempAge.includes(60) ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("age", 60)}
                    >
                      60대 이상
                    </button>
                    <button
                      className={tempAge.length === 6 ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("age", "all")}
                    >
                      상관없음
                    </button>
                  </div>

                  <p>결혼 및 자녀 정보</p>
                  <div>
                    <button
                      className={tempMarriage.includes("미혼") ? "active" : ""}
                      onClick={() =>
                        handleDetailOptionSelect("marriage", "미혼")
                      }
                    >
                      미혼
                    </button>
                    <button
                      className={tempMarriage.includes("기혼") ? "active" : ""}
                      onClick={() =>
                        handleDetailOptionSelect("marriage", "기혼")
                      }
                    >
                      기혼
                    </button>
                    <button
                      className={tempMarriage.includes("사별") ? "active" : ""}
                      onClick={() =>
                        handleDetailOptionSelect("marriage", "사별")
                      }
                    >
                      사별
                    </button>
                    <button
                      className={tempMarriage.length === 3 ? "active" : ""}
                      onClick={() =>
                        handleDetailOptionSelect("marriage", "all")
                      }
                    >
                      상관없음
                    </button>
                  </div>
                  <div className="kids">
                    <button
                      className={
                        (tempChildM === 100 && tempChildF === 100) ||
                        (tempChildM === 99 && tempChildF === 99)
                          ? "active"
                          : ""
                      }
                      onClick={() => handleDetailOptionSelect("child", 100)}
                    >
                      자녀 있음
                    </button>
                    <button
                      className={
                        (tempChildM === 0 && tempChildF === 0) ||
                        (tempChildM === 99 && tempChildF === 99)
                          ? "active"
                          : ""
                      }
                      onClick={() => handleDetailOptionSelect("child", 0)}
                    >
                      자녀 없음
                    </button>
                    <button
                      className={
                        tempChildM === 99 && tempChildF === 99 ? "active" : ""
                      }
                      onClick={() => handleDetailOptionSelect("child", 99)}
                    >
                      자녀 상관없음
                    </button>
                    {/* <button className={tempChildM === 100 && tempChildF === 100 ? 'active' : ''} onClick={() => {setTempChildM(100); setTempChildF(100);}}>있음</button>
                  <button className={tempChildM === 0 && tempChildF === 0 ? 'active' : ''} onClick={() => {setTempChildM(0); setTempChildF(0);}}>없음</button>
                  <button className={tempChildM === 99 && tempChildF === 99 ? 'active' : ''} onClick={() => {setTempChildM(99); setTempChildF(99);}}>상관없음</button> */}
                    {/* {isChild &&
                    <>
                    <InputField Black type="text" name="type" placeholder="남아 수" value={tempChildM === 100 ? '' : tempChildM} onChange={(e) => setTempChildM(e.target.value)}/>
                    <InputField Black type="text" name="type" placeholder="여아 수" value={tempChildF} onChange={(e) => setTempChildF(e.target.value)}/>
                    </>
                  } */}
                  </div>

                  <p>소비 성향</p>
                  <div>
                    <button
                      className={
                        tempTag1.includes("충동구매자") ? "active" : ""
                      }
                      onClick={() =>
                        handleDetailOptionSelect("tag1", "충동구매자")
                      }
                    >
                      충동 구매자
                    </button>
                    <button
                      className={
                        tempTag1.includes("계획구매자") ? "active" : ""
                      }
                      onClick={() =>
                        handleDetailOptionSelect("tag1", "계획구매자")
                      }
                    >
                      계획 구매자
                    </button>
                    <button
                      className={tempTag1.length === 2 ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("tag1", "all")}
                    >
                      상관없음
                    </button>
                  </div>
                  <div>
                    <button
                      className={tempTag2.includes("절약형") ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("tag2", "절약형")}
                    >
                      절약형
                    </button>
                    <button
                      className={tempTag2.includes("고급형") ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("tag2", "고급형")}
                    >
                      고급형
                    </button>
                    <button
                      className={tempTag2.length === 2 ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("tag2", "all")}
                    >
                      상관없음
                    </button>
                  </div>

                  <p>기술 수용도</p>
                  <div>
                    <button
                      className={tempTag3.includes("혁신가") ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("tag3", "혁신가")}
                    >
                      혁신가
                    </button>
                    <button
                      className={
                        tempTag3.includes("얼리어답터") ? "active" : ""
                      }
                      onClick={() =>
                        handleDetailOptionSelect("tag3", "얼리어답터")
                      }
                    >
                      얼리어답터
                    </button>
                    <button
                      className={
                        tempTag3.includes("보통 사용자") ? "active" : ""
                      }
                      onClick={() =>
                        handleDetailOptionSelect("tag3", "보통 사용자")
                      }
                    >
                      보통 사용자
                    </button>
                    <button
                      className={
                        tempTag3.includes("후기 사용자") ? "active" : ""
                      }
                      onClick={() =>
                        handleDetailOptionSelect("tag3", "후기 사용자")
                      }
                    >
                      후기 사용자
                    </button>
                    <button
                      className={
                        tempTag3.includes("보수적 사용자") ? "active" : ""
                      }
                      onClick={() =>
                        handleDetailOptionSelect("tag3", "보수적 사용자")
                      }
                    >
                      보수적 사용자
                    </button>
                    <button
                      className={tempTag3.length === 5 ? "active" : ""}
                      onClick={() => handleDetailOptionSelect("tag3", "all")}
                    >
                      상관없음
                    </button>
                  </div>
                </div>

                <ButtonWrap>
                  <Button onClick={cancleDetailOption}>취소</Button>
                  <Button Blue onClick={handleApplyDetail}>
                    선택 적용
                  </Button>
                </ButtonWrap>
              </DetailOptions>
            )}
          </div>
          <Button Black onClick={handleSearch}>
            <img src={images.Search} alt="" />
            검색
          </Button>
        </div>
        <SelectedFiltersDisplay>
          <SelectedFilters>
            {selectedFilters.behabioralType &&
            selectedFilters.utilizationTime ? (
              <FilterChipArea>
                <FilterChip
                  onClick={() => handleRemoveFilter("behabioralType")}
                >
                  {selectedFilters.behabioralType}
                </FilterChip>
                <span>에 시간을</span>
                <FilterChip>{selectedFilters.utilizationTime}</FilterChip>
                <span>활용하는,</span>
              </FilterChipArea>
            ) : (
              selectedFilters.gender.length === 0 &&
              selectedFilters.age.length === 0 &&
              selectedFilters.marriage.length === 0 &&
              selectedFilters.childM === "" &&
              selectedFilters.childF === "" &&
              selectedFilters.tag1.length === 0 &&
              selectedFilters.tag2.length === 0 &&
              selectedFilters.tag3.length === 0 && (
                <FilterChipArea>
                  <span>예시)</span>
                  <FilterChip>건강관리</FilterChip>
                  <span>에 시간을</span>
                  <FilterChip>많이</FilterChip>
                  <span>활용하는,</span>
                  <FilterChip bgGray>여성</FilterChip>
                  <FilterChip bgGray>20대</FilterChip>
                  <FilterChip bgGray>30대</FilterChip>
                </FilterChipArea>
              )
            )}
            {selectedFilters.gender.length === 1 &&
              selectedFilters.gender?.map((gender) => (
                <FilterChip
                  bgGray
                  key={gender}
                  onClick={() => handleRemoveFilter("gender", gender)}
                >
                  {gender === "M" ? "남성" : "여성"}
                </FilterChip>
              ))}
            {selectedFilters.gender.length === 2 && (
              <FilterChip
                bgGray
                onClick={() =>
                  handleRemoveFilter("gender", selectedFilters.gender)
                }
              >
                성별(상관없음)
              </FilterChip>
            )}

            {selectedFilters.age.length > 0 &&
              selectedFilters.age.length < 6 &&
              selectedFilters.age
                .sort((a, b) => a - b)
                ?.map(
                  (
                    age // 오름차순 정렬
                  ) => (
                    <FilterChip
                      bgGray
                      key={age}
                      onClick={() => handleRemoveFilter("age", age)}
                    >
                      {age === 60 ? `${age}대 이상` : `${age}대`}
                    </FilterChip>
                  )
                )}
            {selectedFilters.age.length === 6 && (
              <FilterChip
                bgGray
                onClick={() => handleRemoveFilter("age", selectedFilters.age)}
              >
                나이(상관없음)
              </FilterChip>
            )}

            {selectedFilters.marriage.length > 0 &&
              selectedFilters.marriage.length < 3 &&
              selectedFilters.marriage?.map((marriage) => (
                <FilterChip
                  bgGray
                  key={marriage}
                  onClick={() => handleRemoveFilter("marriage", marriage)}
                >
                  {marriage}
                </FilterChip>
              ))}
            {selectedFilters.marriage.length === 3 && (
              <FilterChip
                bgGray
                onClick={() =>
                  handleRemoveFilter("marriage", selectedFilters.marriage)
                }
              >
                결혼정보(상관없음)
              </FilterChip>
            )}
            {/* {selectedFilters.childM !== "" &&
            <FilterChip onClick={() => handleRemoveFilter('childM')}>
              {selectedFilters.childM === 0 && <>남아(없음) <span>X</span></>}
              {selectedFilters.childM === 99 && <>남아(상관없음) <span>X</span></>}
              {selectedFilters.childM === 100 && <>남아(있음) <span>X</span></>}
              {selectedFilters.childM !== 0 && selectedFilters.childM !== 99 && <>남아({selectedFilters.childM}명) <span>X</span></>}
            </FilterChip>
          }
          {selectedFilters.childF !== "" &&
            <FilterChip onClick={() => handleRemoveFilter('childF')}>
              {selectedFilters.childF === 0 && <>여아(없음) <span>X</span></>}
              {selectedFilters.childF === 99 && <>여아(상관없음) <span>X</span></>}
              {selectedFilters.childF === 100 && <>여아(있음) <span>X</span></>}
              {selectedFilters.childF !== 0 && selectedFilters.childF !== 99 && <>여아({selectedFilters.childM}명) <span>X</span></>}
            </FilterChip>
          } */}
            {selectedFilters.childM !== "" && selectedFilters.childF !== "" && (
              <FilterChip
                bgGray
                onClick={() => {
                  handleRemoveFilter("childM");
                  handleRemoveFilter("childF");
                }}
              >
                {selectedFilters.childM === 0 && <>자녀(없음) </>}
                {selectedFilters.childM === 99 && <>자녀(상관없음) </>}
                {selectedFilters.childM === 100 && <>자녀(있음) </>}
              </FilterChip>
            )}

            {selectedFilters.tag1.length === 1 &&
              selectedFilters.tag1?.map((tag1) => (
                <FilterChip
                  bgGray
                  key={tag1}
                  onClick={() => handleRemoveFilter("tag1", tag1)}
                >
                  {tag1}
                </FilterChip>
              ))}
            {selectedFilters.tag2.length === 1 &&
              selectedFilters.tag2?.map((tag2) => (
                <FilterChip
                  bgGray
                  key={tag2}
                  onClick={() => handleRemoveFilter("tag2", tag2)}
                >
                  {tag2}
                </FilterChip>
              ))}
            {selectedFilters.tag1.length === 2 && (
              <FilterChip bgGray onClick={() => handleRemoveFilter("tag1")}>
                소비성향1(상관없음)
              </FilterChip>
            )}
            {selectedFilters.tag2.length === 2 && (
              <FilterChip bgGray onClick={() => handleRemoveFilter("tag2")}>
                소비성향2(상관없음)
              </FilterChip>
            )}

            {selectedFilters.tag3.length > 0 &&
              selectedFilters.tag3.length < 5 &&
              selectedFilters.tag3?.map((tag3) => (
                <FilterChip
                  bgGray
                  key={tag3}
                  onClick={() => handleRemoveFilter("tag3", tag3)}
                >
                  {tag3}
                </FilterChip>
              ))}
            {selectedFilters.tag3.length === 5 && (
              <FilterChip
                bgGray
                onClick={() => handleRemoveFilter("tag3", selectedFilters.tag3)}
              >
                기술수용도(상관없음)
              </FilterChip>
            )}
          </SelectedFilters>
          {(selectedFilters.behabioralType ||
            selectedFilters.utilizationTime ||
            selectedFilters.gender.length > 0 ||
            selectedFilters.age.length > 0 ||
            selectedFilters.marriage.length > 0 ||
            selectedFilters.childM ||
            selectedFilters.childF ||
            selectedFilters.tag1.length > 0 ||
            selectedFilters.tag2.length > 0 ||
            selectedFilters.tag3.length > 0) && (
            <Button onClick={resetSelectionOption}>초기화</Button>
          )}
        </SelectedFiltersDisplay>
      </SearchFormWrap>
    </>
  );
};

export default MoleculeSearchForm;

const SearchFormWrap = styled.div`
  position: relative;
  padding: 20px 30px;
  border-radius: 15px;
  background: ${palette.white};

  .searchForm {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 40px;

    > div {
      position: relative;
      flex: 1 1 0;

      + div:before {
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 100%;
        background: ${palette.lineGray};
        content: "";
      }

      button {
        margin-top: 0;

        &:hover {
          background: none;
        }
      }

      > button {
        letter-spacing: -2px;
      }
    }

    span {
      font-size: 0.75rem;
      color: ${palette.lightGray};
    }

    > button {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 0;
    }
  }
`;

const DetailOptions = styled.div`
  position: absolute;
  left: 0;
  top: 75px;
  width: ${(props) => {
    if (props.Full) return `calc(188% - 30px)`;
    else return `100%`;
  }};
  padding: ${(props) => {
    if (props.Full) return `36px`;
    else return `20px`;
  }};
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.16);
  z-index: 1;

  h4 {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${palette.lineGray};

    > span {
      position: relative;
      width: 16px;
      height: 16px;

      &:before,
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 16px;
        border-radius: 10px;
        background: ${palette.gray};
        cursor: pointer;
        content: "";
      }

      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    > p {
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.gray};

      ~ p {
        margin-top: 30px;
      }
    }

    > div {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      button {
        font-family: "Pretendard";
        color: ${palette.gray};
        display: flex;
        align-items: center;
        gap: 4px;
        margin: 0;
        padding: 6px 20px;
        border-radius: 15px;
        border: 1px solid #f6f6f6;
        background: #f6f6f6;
        cursor: pointer;

        &:hover {
          background: #f6f6f6 !important;
        }

        &.active {
          color: ${palette.blue};
          border: 1px solid ${palette.blue};
          background: ${palette.white};

          &:before {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='9' viewBox='0 0 10 9' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.72288 0.385952C10.0513 0.661821 10.0939 1.15169 9.81803 1.48011L3.90529 8.51908C3.76071 8.6912 3.54865 8.79223 3.3239 8.79607C3.09915 8.79991 2.88377 8.70618 2.7334 8.5391L0.199365 5.72351C-0.0875578 5.4047 -0.0617137 4.91366 0.25709 4.62674C0.575894 4.33982 1.06693 4.36566 1.35386 4.68447L3.29043 6.83622L8.62873 0.481096C8.9046 0.15268 9.39447 0.110083 9.72288 0.385952Z' fill='%230453F4'/%3E%3C/svg%3E")
              center no-repeat;
            content: "";
          }
        }
      }
    }

    .gender {
      > button {
        flex: 1 1 0;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        border: 1px solid ${palette.lineGray};
        background: ${palette.white};
        box-sizing: border-box;

        &.active {
          span {
            font-weight: 700;
            color: ${palette.blue};
          }
          svg path {
            stroke: ${palette.blue};
          }
          &:before {
            display: none;
          }
        }
      }
    }

    .kids {
      gap: 12px;

      button {
        position: relative;
        padding: 0;
        border: 0 !important;
        background: none;

        &:hover {
          background: none !important;
        }

        &:before {
          width: 20px !important;
          height: 20px !important;
          border-radius: 4px;
          border: 1px solid ${palette.lineGray};
          content: "";
        }

        &:after {
          position: absolute;
          left: 6px;
          top: 6px;
          transform: rotate(-45deg);
          width: 9px;
          height: 6px;
          border-left: 2px solid ${palette.blue};
          border-bottom: 2px solid ${palette.blue};
        }

        &.active {
          background: none;

          &:before {
            border: 1px solid ${palette.blue};
          }
        }
      }
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row !important;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${palette.lineGray};

  > button {
    padding: 10px 16px;

    &:hover {
      background: auto !important;
    }
  }
`;

const SelectedFiltersDisplay = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.lineGray};

  > div {
    width: 85%;
  }

  > button {
    flex-shrink: 0;
    font-size: 0.875rem;
    padding: 8px 16px;
    border: 1px solid ${palette.lineGray};
  }
`;

const SelectedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterChip = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding: 8px 30px 8px 10px;
  background: ${(props) => {
    if (props.bgGray) return `rgba(0,0,0,0.05)`;
    else return `rgba(4,83,244,0.1)`;
  }};
  border-radius: 10px;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    right: 15px;
    top: 50%;
    width: 1px;
    height: 10px;
    background: ${palette.lightGray};
    content: "";
  }

  &:before {
    transform: translateY(-50%) rotate(45deg);
  }

  &:after {
    transform: translateY(-50%) rotate(-45deg);
  }

  span {
    margin-left: 5px;
    color: ${palette.white};
    border-radius: 50%;
    padding: 0 5px;
  }
`;

const FilterChipArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: ${palette.lightGray};
  }
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

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0);
    border-right: 1.1em solid rgba(255, 255, 255, 0);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0);
    border-left: 1.1em solid #0453f4;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
