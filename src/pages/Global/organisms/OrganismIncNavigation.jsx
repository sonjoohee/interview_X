//네비게이션 컴포넌트
//좌측 사이드바 네비게이션 컴포넌트
//로그인/로그아웃 관리, 대화 히스토리 관리, 프로젝트 관리. 사용자 계정 설정
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../assets/styles/Palette";
import images from "../../../assets/styles/Images";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";
import PopupWrap from "../../../assets/styles/Popup";
import { Caption2 } from "../../../assets/styles/Typography";
import {
  IS_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
  CONVERSATION_ID,
  REPORT_REFRESH_TRIGGER,
  CHAT_REFRESH_TRIGGER,
  IS_SOCIAL_LOGGED_IN,
  IS_MOBILE,
  IS_SIGNUP_POPUP_OPEN,
  IS_LOGIN_POPUP_OPEN,
  PERSONA_STEP,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  PROJECT_LIST,
  PROJECT_REPORT_LIST,
  REPORT_LIST,
  PERSONA_LIST,
  SELECTED_PERSONA_LIST,
  CUSTOMIZE_PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  SELECTED_INTERVIEW_PURPOSE,
  CATEGORY_COLOR,
  PROJECT_LOAD_BUTTON_STATE,
  REPORT_LOAD_BUTTON_STATE,
  REPORT_DESCRIPTION_LOAD_BUTTON_STATE,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_EDIT_MODE,
  IS_SHOW_TOAST,
  PROJECT_REFRESH_TRIGGER,
  CUSTOM_PERSONA_LIST,
  ACCESS_DASHBOARD,
  EDUCATION_STATE,
  USER_MEMBERSHIP,
} from "../../../pages/AtomStates";
import {
  getAllConversationsFromIndexedDB,
  getToolListOnServer,
  updateChatOnServer,
  updateInsightOnServer,
  deleteInsightOnServer,
  deleteChatOnServer,
} from "../../../utils/indexedDB";
import MoleculeLoginPopup from "../../../pages/Login_Sign/components/molecules/MoleculeLoginPopup";
import MoleculeAccountPopup from "../../../pages/Login_Sign/components/molecules/MoleculeAccountPopup";
import MoleculeSignPopup from "../../../pages/Login_Sign/components/molecules/MoleculeSignPopup";

const OrganismIncNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [accessDashboard] = useAtom(ACCESS_DASHBOARD);
  const [educationState, setEducationState] = useAtom(EDUCATION_STATE);
  const [userMembership, setUserMembership] = useAtom(USER_MEMBERSHIP);
  const [, setCustomPersonaList] = useAtom(CUSTOM_PERSONA_LIST);
  const [, setRefreshTrigger] = useAtom(PROJECT_REFRESH_TRIGGER);
  const [, setProjectLoadButtonState] = useAtom(PROJECT_LOAD_BUTTON_STATE);
  const [, setProjectId] = useAtom(PROJECT_ID);
  const [, setProjectReportId] = useAtom(PROJECT_REPORT_ID);
  const [, setProjectList] = useAtom(PROJECT_LIST);
  const [, setProjectReportList] = useAtom(PROJECT_REPORT_LIST);
  const [, setReportList] = useAtom(REPORT_LIST);
  const [, setPersonaList] = useAtom(PERSONA_LIST);
  const [, setSelectedPersonaList] = useAtom(SELECTED_PERSONA_LIST);
  const [, setCustomizePersonaList] = useAtom(CUSTOMIZE_PERSONA_LIST);
  const [, setInterviewQuestionList] = useAtom(INTERVIEW_QUESTION_LIST);
  const [, setSelectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [, setReportLoadButtonState] = useAtom(REPORT_LOAD_BUTTON_STATE);
  const [, setReportDescriptionLoadButtonState] = useAtom(
    REPORT_DESCRIPTION_LOAD_BUTTON_STATE
  );
  const [, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [, setInterviewReportAdditional] = useAtom(INTERVIEW_REPORT_ADDITIONAL);
  const [, setIsEditMode] = useAtom(IS_EDIT_MODE);
  const [, setIsShowToast] = useAtom(IS_SHOW_TOAST);
  const [, setPersonaStep] = useAtom(PERSONA_STEP);
  const [isMobile] = useAtom(IS_MOBILE);

  const [, setConversations] = useState([]); // 저장된 대화 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태 관리
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN); // 로그인 팝업 상태 관리
  const [reports, setReports] = useState([]); // 서버에서 가져온 보고서 리스트 상태
  const [reportRefreshTrigger, setReportRefreshTrigger] = useAtom(
    REPORT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독
  const [chatRefreshTrigger, setChatRefreshTrigger] =
    useAtom(CHAT_REFRESH_TRIGGER); // 리프레시 트리거 상태 구독

  const [chatList, setChatList] = useState([]); // 서버에서 가져온 대화 리스트

  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 상태 읽기
  const [isSignupPopupOpen, setIsSignupPopupOpen] =
    useAtom(IS_SIGNUP_POPUP_OPEN); // 회원가입 팝업 상태 관리
  const [isLogoutPopup, setIsLogoutPopup] = useState(false); // 로그아웃 팝업 상태 관리
  const [, setUserName] = useAtom(USER_NAME); // 아톰에서 유저 이름 불러오기
  const [, setUserEmail] = useAtom(USER_EMAIL); // 아톰에서 유저 이메일 불러오기
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // 삭제 경고 팝업 상태
  const [isChatDeletePopupOpen, setChatIsDeletePopupOpen] = useState(false); // 삭제 경고 팝업 상태
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false); // 나가기 경고 팝업 상태

  const [reportIdToDelete, setReportIdToDelete] = useState(null); // 삭제하려는 reportId 저장
  const [chatIdToDelete, setChatIdToDelete] = useState(null); // 삭제하려는 reportId 저장

  const [conversationId] = useAtom(CONVERSATION_ID);

  const insightEditBoxRef = useRef(null);
  const historyEditBoxRef = useRef(null);
  const toggleRef = useRef(null);
  const [editToggleIndex, setEditToggleIndex] = useState(null); // 특정 인덱스를 저장

  // State variables for report name change
  const [isReportChangePopupOpen, setIsReportChangePopupOpen] = useState(false);
  const [reportIdToChangeName, setReportIdToChangeName] = useState(null);
  const [newReportName, setNewReportName] = useState("");

  // State variables for chat name change
  const [isChatChangePopupOpen, setIsChatChangePopupOpen] = useState(false);
  const [chatIdToChangeName, setChatIdToChangeName] = useState(null);
  const [newChatName, setNewChatName] = useState("");
  const [, setInsightEditToggleIndex] = useState(null);

  const [isPopupLogin, setIsPopupLogin] = useState(false);

  const closePopupLogin = () => {
    setIsPopupLogin(false);
    setIsLoginPopupOpen(true);
  };

  // const handleChangeReportNameButtonClick = (reportId) => {
  //   setReportIdToChangeName(reportId);
  //   setIsReportChangePopupOpen(true);
  // };

  // const handleChangeChatNameButtonClick = (chatId) => {
  //   setChatIdToChangeName(chatId);
  //   setIsChatChangePopupOpen(true);
  // };

  const handleExitChatConfirm = () => {
    navigate("/Project");
  };
  const handleExitChatCancel = () => {
    setIsExitPopupOpen(false);
  };

  //사이드바/히스토리 섹션/ .../이름변경
  const handleChangeInsightConfirm = async () => {
    try {
      await updateInsightOnServer(reportIdToChangeName, {
        view_name: newReportName,
      });

      setReportRefreshTrigger((prev) => !prev);
      setIsReportChangePopupOpen(false);
      setReportIdToChangeName(null);
      setNewReportName("");
    } catch (error) {
      // console.error("Error updating report name on server:", error);
    }
  };

  const handleChangeChatConfirm = async () => {
    try {
      await updateChatOnServer(chatIdToChangeName, { view_name: newChatName });
      // Refresh the chat list after successful update
      setChatRefreshTrigger((prev) => !prev);
      // Close the pop-up and reset state
      setIsChatChangePopupOpen(false);
      setChatIdToChangeName(null);
      setNewChatName("");
    } catch (error) {
      // console.error("Error updating conversation on server:", error);
    }
  };

  const handleChangeCancel = () => {
    setIsReportChangePopupOpen(false);
    setIsChatChangePopupOpen(false);
    setReportIdToChangeName(null);
    setChatIdToChangeName(null);
    setNewReportName("");
    setNewChatName("");
  };

  //아코디언 생성 코드   //아코디언 :  클릭하면 펼처지고 다시 클릭하면 접히는 형태의 인터페이스
  //1. 높이 제한
  // 사이드바의 최대 높이 설정
  const maxSidebarHeight = 600;
  //각 아이템의 높이 설정
  const ITEM_HEIGHT = 50;

  // 2. 첫 번째 아코디언(보고서)와 두 번째 아코디언(대화 내역)의 높이를 계산하는 함수
  const calculateAccordionHeight = () => {
    const reportHeight = reports.length * ITEM_HEIGHT;
    const chatHeight = chatList.length * ITEM_HEIGHT;

    return { reportHeight, chatHeight };
  };

  //3. 높이 초과 체크

  // const exceedsSidebarHeight = () => {
  //   const { reportHeight, chatHeight } = calculateAccordionHeight();

  //   // 두 아코디언이 열렸을 때의 총 높이 계산
  //   const totalHeight = reportHeight + chatHeight; // 조건 없이 둘 다 더함

  //   return totalHeight > maxSidebarHeight; // maxSidebarHeight와 비교하여 넘는지 확인
  // };

  // // 첫 번째 아코디언 토글 함수
  // const toggleSection1 = () => {
  //   setIsSection1Open((prev) => {
  //     const willOpen = !prev;

  //     // 열릴 때 사이드바 높이를 초과하면 두 번째 아코디언을 닫음
  //     if (willOpen && exceedsSidebarHeight()) {
  //       setIsSection2Open(false);
  //     }
  //     setIsSection2Open(false);

  //     return willOpen;
  //   });
  // };

  // // 두 번째 아코디언 토글 함수
  // const toggleSection2 = () => {
  //   setIsSection2Open((prev) => {
  //     const willOpen = !prev;

  //     // 열릴 때 사이드바 높이를 초과하면 첫 번째 아코디언을 닫음
  //     if (willOpen && exceedsSidebarHeight()) {
  //       setIsSection1Open(false);
  //     }
  //     setIsSection1Open(false);

  //     return willOpen;
  //   });
  // };

  //아코디언 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        // 클릭한 곳이 요소 내부가 아니면 토글을 닫음
        setIsToggle(true);
      }
    };
    // 마운트될 때 클릭 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 언마운트될 때 클릭 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        insightEditBoxRef.current &&
        !insightEditBoxRef.current.contains(event.target) && //클릭한 요소가 인사이트 편집 박스 내부가 아니면
        !event.target.closest(".toggle")
      ) {
        setInsightEditToggleIndex(null); //클릭이 컴포넌트 외부에서 발생
      }
    };
    document.addEventListener("mousedown", handleClickOutside); //문서 전체에 마우스 클릭 이벤트 적용
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [insightEditBoxRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        historyEditBoxRef.current &&
        !historyEditBoxRef.current.contains(event.target) &&
        !event.target.closest(".toggle")
      ) {
        setEditToggleIndex(null); // setInsightEditToggleIndex가 아닌 히스토리용 상태를 업데이트
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [historyEditBoxRef]);

  // const editBoxToggle = (index, event, category) => {

  //   if (editToggleIndex === index) {
  //     setEditToggleIndex(null);
  //     return;
  //   }
  //   setEditToggleIndex(index);

  //   if (event && accordionContentRef.current) {
  //     const container = accordionContentRef.current;
  //     const clickedElement = event.currentTarget;

  //     let top = clickedElement.offsetTop - container.scrollTop;
  //     let left = clickedElement.offsetLeft + clickedElement.offsetWidth + 10;

  //     // category에 따라 이동
  //     if (category === "recent") {
  //       left -= 190; // 최근 대화면 40px 왼쪽 이동
  //       top += 30; // 10px 아래로 이동
  //     } else if (category === "7days") {
  //       left -= 190; // 지난 7일이면 190px 왼쪽 이동
  //       top += 30; // 10px 아래로 이동
  //     } else if (category === "30days") {
  //       left -= 190; // 지난 30일이면 340px 왼쪽 이동
  //       top += 30; // 20px 아래로 이동
  //     }

  //     setEditBoxPosition({ top, left });
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editToggleIndex !== null) {
        const editBoxElement = document.getElementById(
          `edit-box-${editToggleIndex}`
        );
        const toggleElement = document.getElementById(
          `insight-toggle-${editToggleIndex}`
        );
        if (
          editBoxElement &&
          !editBoxElement.contains(event.target) &&
          toggleElement &&
          !toggleElement.contains(event.target)
        ) {
          setEditToggleIndex(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editToggleIndex]);

  // // 삭제 버튼 클릭 시, 삭제 경고 팝업 열기
  // const handleDeleteButtonClick = (reportId) => {
  //   setReportIdToDelete(reportId); // 삭제할 reportId 저장
  //   setIsDeletePopupOpen(true); // 팝업 열기
  // };

  // const handleChatDeleteButtonClick = (ChatId) => {
  //   setChatIdToDelete(ChatId); // 삭제할 reportId 저장
  //   setChatIsDeletePopupOpen(true); // 팝업 열기
  // };

  // // 인사이트 보관함용 EditBox 열기/닫기 함수
  // const insightEditBoxToggle = (index, event) => {
  //   setInsightEditToggleIndex((prevIndex) =>
  //     prevIndex === index ? null : index
  //   );

  //   if (event && insightAccordionContentRef.current) {
  //     const container = insightAccordionContentRef.current;
  //     const clickedElement = event.currentTarget;

  //     // Calculate the position considering the scroll
  //     const top = clickedElement.offsetTop - container.scrollTop - 10;
  //     const left = clickedElement.offsetLeft + clickedElement.offsetWidth - 30;

  //     setInsightEditBoxPosition({ top, left });
  //   }
  // };

  useEffect(() => {
    const loadConversations = async () => {
      const allConversations = await getAllConversationsFromIndexedDB();
      setConversations(allConversations);
    };
    loadConversations();
  }, []);

  // // 대화 리스트 가져오기 (챗 리스트)
  // useEffect(() => {
  //   const fetchChatList = async () => {
  //     try {
  //       const accessToken = sessionStorage.getItem("accessToken");

  //       if (!accessToken || !isLoggedIn) {
  //         setChatList([]); // 로그아웃 상태에서는 대화 리스트를 빈 배열로 설정
  //         return;
  //       }
  //       const response_chat_list = await axios.get(
  //         "https://wishresearch.kr/panels/chat_list",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       const response = await getToolListOnServer(1000, 1, isLoggedIn);

  //       // 두 리스트 병합
  //       const mergedList = [
  //         ...response_chat_list.data.filter((item) => item.business_info),
  //         ...response.data,
  //       ];

  //       // 날짜 기준으로 정렬
  //       const sortedChatList = mergedList.sort((a, b) => {
  //         const dateA = b.timestamp;
  //         const dateB = a.timestamp;
  //         return dateA - dateB;
  //       }); // 최근 날짜 순으로 정렬


  //       setChatList(sortedChatList);
  //     } catch (error) {
  //       // console.error("대화 목록 가져오기 오류:", error);
  //     }
  //   };
  //   fetchChatList();
  // }, [chatRefreshTrigger, isLoggedIn]);

  // useEffect(() => {
  //   // 서버에서 보고서 목록을 가져오는 함수
  //   const fetchReports = async () => {
  //     try {
  //       const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기

  //       if (!accessToken || !isLoggedIn) {
  //         setReports([]); // 로그아웃 상태에서는 대화 리스트를 빈 배열로 설정
  //         return;
  //       }
  //       const response = await axios.get(
  //         "https://wishresearch.kr/panels/insight_list",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       setReports(response.data); // 보고서 리스트를 상태로 설정
  //     } catch (error) {
  //       // console.error("보고서 목록 가져오기 오류:", error);
  //     }
  //   };
  //   fetchReports();
  // }, [reportRefreshTrigger, isLoggedIn]);

  const handleLoginClick = () => {
    navigate("/Login");
    // setIsLoginPopupOpen(true); // 로그인 팝업 열기
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false); // 로그인 팝업 닫기
  };

  const closeSignupPopup = () => {
    setIsSignupPopupOpen(false); // 회원가입 팝업 닫기
  };

  // const handleAccountClick = () => {
  //   setAccountPopupOpen(true); // 계정설정 팝업 열기
  // };

  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };

  const handleLogoutClick = () => {
    // 로그아웃 버튼 클릭 시 로그아웃 팝업 열기
    setIsLogoutPopup(true);
  };

  const handleLogoutConfirm = () => {
    // 로그아웃 확인 버튼을 눌렀을 때 실행
    let url_address = "/";
    if (educationState) {
      const educationLandingUrl = sessionStorage.getItem("educationLandingUrl");
      url_address = `/${educationLandingUrl}`;
    }
    sessionStorage.clear(); // 세션 스토리지 모두 삭제
    setIsLoggedIn(false);
    setIsSocialLoggedIn(false);
    setUserName("");
    setUserEmail("");
    setIsLogoutPopup(false); // 로그아웃 팝업 닫기
    window.location.href = url_address; // 페이지 이동
  };

  const handleCloseLogoutPopup = () => {
    // 로그아웃 팝업 닫기
    setIsLogoutPopup(false);
  };

  // const handleReportClick = async (reportId) => {
  //   try {
  //     const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기
  //     const response = await axios.get(
  //       `https://wishresearch.kr/panels/insight/${reportId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     setSelectedReport(response.data); // 선택된 보고서의 상세 데이터 상태로 설정
  //   } catch (error) {
  //     // console.error("보고서 상세 정보 가져오기 오류:", error);
  //   }
  // };

  // const closePopup = () => {
  //   setSelectedReport(null); // 팝업 닫기
  // };

  const handleDeleteInsightConfirm = async () => {
    try {
      await deleteInsightOnServer(reportIdToDelete);
      // 삭제가 성공적으로 이루어진 경우 처리할 코드

      // 삭제 후에 상태 업데이트 (예: 삭제된 항목을 리스트에서 제거)
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== reportIdToDelete)
      );

      // 팝업 닫기 및 삭제할 reportId 초기화
      setIsDeletePopupOpen(false);
      setReportIdToDelete(null);
      setReportRefreshTrigger((prev) => !prev);
    } catch (error) {
      // console.error("삭제 요청 오류:", error);
    }
  };

  const handleDeleteHistoryConfirm = async () => {
    try {
      await deleteChatOnServer(chatIdToDelete);

      // 삭제가 성공적으로 이루어진 경우 처리할 코드

      // 삭제 후에 상태 업데이트 (예: 삭제된 항목을 리스트에서 제거)
      setReports((prevReports) =>
        prevReports.filter((chat) => chat.id !== chatIdToDelete)
      );

      // 팝업 닫기 및 삭제할 reportId 초기화
      setChatIsDeletePopupOpen(false);
      setChatIdToDelete(null);
      setChatRefreshTrigger((prev) => !prev);
      if (chatIdToDelete === conversationId) {
        navigate("/Project"); // / 경로로 이동
      }
    } catch (error) {
      // console.error("삭제 요청 오류:", error);
    }
  };

  // 삭제 취소 처리 함수
  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false); // 팝업 닫기
    setChatIsDeletePopupOpen(false);
    setReportIdToDelete(null); // 삭제할 reportId 초기화
    setChatIdToDelete(null);
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".accordion-toggle");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    // Cleanup 이벤트 리스너
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, []);

  // 클릭 시 이동
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // 컴포넌트가 마운트될 때 모바일 상태에 따라 초기 상태 설정
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile, setIsOpen]);

  const [isToggle, setIsToggle] = useState(true);
  const moreProfile = (event) => {
    event.stopPropagation(); // 내부 클릭 이벤트가 외부로 전파되지 않도록 방지
    setIsToggle((prev) => !prev); // 팝업 열기/닫기
  };

  //새작업 버튼 클릭 시 호출되는 함수
  const handleNewProjectClick = () => {
    setPersonaStep(0);

    window.location.href = "/Project";
  };

  const [showSubNav, setShowSubNav] = useState(false);

  const handleWorkManageClick = () => {
    if (!isLoggedIn) {
      setIsPopupLogin(true);
      return;
    }

    setShowSubNav(!showSubNav);
  };

  const handleMyProjectClick = () => {
    setPersonaStep(0);
    setProjectId("");
    setProjectReportId("");
    setProjectList([]);
    setProjectReportList([]);
    setReportList([]);
    setPersonaList({
      selected: [],
      unselected: [],
    });
    setSelectedPersonaList([]);
    setCustomizePersonaList({
      selected: [],
      unselected: [],
    });
    setInterviewQuestionList([]);
    setSelectedInterviewPurpose("");
    setCategoryColor({});
    setProjectLoadButtonState(false);
    setReportLoadButtonState(false);
    setReportDescriptionLoadButtonState(false);
    setInterviewData([]);
    setInterviewReport([]);
    setInterviewReportAdditional([]);
    setIsEditMode(false);
    setIsShowToast(false);
    setCustomPersonaList([]);

    if (isLoggedIn) {
      setRefreshTrigger((prev) => prev + 1); // 트리거 증가로 새로고침 실행
      navigate("/MyProject", { replace: true });
    } else {
      if (!isLoggedIn) {
        setIsPopupLogin(true);
        return;
      }
    }
  };

  // const handleCloseSubNav = () => {
  //   setShowSubNav(false);
  // };

  const [isHomePopupOpen, setIsHomePopupOpen] = useState(false);

  const handleConfirmAndNavigate = () => {
    setPersonaStep(0);

    window.location.href = "/Project";
    setIsHomePopupOpen(false);
  };

  const handleCloseHomePopup = () => {
    setIsHomePopupOpen(false);
  };

  const handleClickHome = () => {
    if (location.pathname !== "/Project") {
      setIsHomePopupOpen(true);
    }
  };

  const handleResearchToolClick = () => {
    setSelectedInterviewPurpose("");
    navigate("/Tool");
  };

  //메뉴리스트-> molcules로?
  return (
    <>
      <NavigationWrap>
        <Link onClick={() => handleClickHome()}>
          <Logo />
        </Link>

        <MenuList>
          <li
            onClick={handleNewProjectClick}
            className={`home ${
              location.pathname === "/Project" ? "active" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
            >
              <path
                d="M10.4703 1.67781C9.94131 1.13051 9.05869 1.13051 8.52968 1.67781L1.876 8.56168C1.05756 9.40844 1.66315 10.8143 2.84632 10.8143H3.35025V15.7309C3.35025 16.5795 4.04437 17.2673 4.90061 17.2673H8.00132V13.119C8.00132 12.2987 8.6723 11.6338 9.5 11.6338C10.3277 11.6338 10.9987 12.2987 10.9987 13.119V17.2673H14.2027C15.059 17.2673 15.7531 16.5795 15.7531 15.7309V10.8143H16.1537C17.3369 10.8143 17.9424 9.40843 17.124 8.56168L10.4703 1.67781Z"
                stroke="#666666"
                stroke-width="1.33333"
              />
            </svg>

            <span>프로젝트</span>
          </li>

          {accessDashboard && (
            <>
              <li
                onClick={() => navigate("/DashBoard")}
                className={`dashboard ${
                  location.pathname === "/DashBoard" ? "active" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <rect
                    x="3.5"
                    y="3.26733"
                    width="5.96754"
                    height="5.96754"
                    rx="0.661257"
                    stroke="#666666"
                  />
                  <rect
                    x="11.6289"
                    y="3.26733"
                    width="5.96754"
                    height="5.96754"
                    rx="0.661257"
                    stroke="#666666"
                  />
                  <rect
                    x="11.6289"
                    y="11.3962"
                    width="5.96754"
                    height="5.96754"
                    rx="0.661257"
                    stroke="#666666"
                  />
                  <rect
                    x="3.5"
                    y="11.3962"
                    width="5.96754"
                    height="5.96754"
                    rx="0.661257"
                    stroke="#666666"
                  />
                </svg>

                <span>대시보드</span>
              </li>

              <li
                onClick={() => navigate("/AiPersona")}
                className={`persona ${
                  location.pathname === "/AiPersona" ? "active" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M4.3671 6.17358C4.47011 7.60339 5.53077 8.70483 6.68741 8.70483C7.84405 8.70483 8.90648 7.60374 9.00773 6.17358C9.1132 4.68612 8.08066 3.64233 6.68741 3.64233C5.29417 3.64233 4.26163 4.71319 4.3671 6.17358Z"
                    stroke="#666"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.68764 10.9548C8.97877 10.9548 11.182 12.0928 11.734 14.3091C11.8071 14.6023 11.6232 14.8923 11.3219 14.8923H2.05299C1.7517 14.8923 1.56889 14.6023 1.64096 14.3091C2.19291 12.0573 4.39616 10.9548 6.68764 10.9548Z"
                    stroke="#666"
                    stroke-width="1.125"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M11.4688 6.80429C11.551 7.94616 12.4082 8.84546 13.3321 8.84546C14.256 8.84546 15.1145 7.94651 15.1953 6.80429C15.2794 5.61636 14.4451 4.76733 13.3321 4.76733C12.219 4.76733 11.3848 5.63815 11.4688 6.80429Z"
                    stroke="#666"
                    stroke-width="1.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.2575 11.0246C11.892 10.7339 12.5909 10.6221 13.3317 10.6221C15.1598 10.6221 16.9211 11.5309 17.3624 13.301C17.4204 13.5351 17.2734 13.7668 17.0329 13.7668H13.0856"
                    stroke="#666"
                    stroke-width="1.125"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                </svg>

                <span>페르소나</span>
              </li>

              <li
                onClick={() => handleResearchToolClick()}
                className={`research ${
                  location.pathname === "/Tool" ? "active" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="25"
                  viewBox="0 0 27 25"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.0468 8.00732C17.7344 8.61753 17.2913 9.11436 16.8005 9.50821C16.4813 9.76433 16.1402 9.97879 15.7976 10.1558C16.5655 10.5238 17.1449 11.0936 17.5631 11.7297C17.7497 12.0133 17.9047 12.3106 18.0317 12.6101C18.308 12.1292 18.6624 11.7073 19.059 11.3464C19.4728 10.9699 19.9361 10.6557 20.4141 10.4039C19.7026 10.0837 19.1416 9.60167 18.7094 9.05924C18.4416 8.72319 18.2233 8.36469 18.0468 8.00732ZM17.4279 14.8634C17.4277 14.1931 17.2134 13.1727 16.6565 12.3258C16.1146 11.5015 15.2573 10.8479 13.916 10.8115C13.556 10.8018 13.4086 10.503 13.3831 10.3426C13.3681 10.2485 13.3736 10.1225 13.44 9.99631C13.5145 9.85469 13.6517 9.74486 13.8234 9.71151C14.4839 9.58321 15.3864 9.25175 16.1214 8.66197C16.8443 8.08188 17.3903 7.26785 17.426 6.13639C17.4377 5.7665 17.7502 5.62493 17.9097 5.60405C18.0041 5.59169 18.1278 5.60079 18.2499 5.66791C18.3862 5.74282 18.4946 5.8783 18.5268 6.05039C18.6506 6.71102 18.9592 7.63179 19.5579 8.38304C20.1431 9.11738 21.0054 9.69443 22.2969 9.72375C22.6358 9.73144 22.7981 10.0029 22.8303 10.1805C22.848 10.2788 22.8434 10.4091 22.7752 10.5383C22.6993 10.6822 22.5632 10.7863 22.4017 10.8206C21.5393 11.0042 20.5523 11.4546 19.7893 12.1489C19.0338 12.8364 18.5167 13.7425 18.5129 14.8651L18.5129 14.8778H17.4279L17.4279 14.8634ZM13.9454 9.72692L13.9474 9.72698L13.9454 9.72692ZM7.38263 8.50154C7.08301 8.50154 6.84013 8.74442 6.84013 9.04404V19.5233C6.84013 19.823 7.08301 20.0658 7.38263 20.0658H19.2113C19.5109 20.0658 19.7538 19.823 19.7538 19.5233V15.6146H20.8388V19.5233C20.8388 20.4222 20.1101 21.1508 19.2113 21.1508H7.38263C6.48379 21.1508 5.75513 20.4222 5.75513 19.5233V9.04404C5.75513 8.14519 6.48378 7.41653 7.38263 7.41653H12.6407C12.9403 7.41653 13.1832 7.65942 13.1832 7.95904C13.1832 8.25865 12.9403 8.50154 12.6407 8.50154H7.38263Z"
                    fill="#666666"
                  />
                </svg>

                <span>리서치툴</span>
              </li>

              <li
                onClick={() => navigate("/StorageBox")}
                className={`storagebox ${
                  location.pathname === "/StorageBox" ? "active" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                >
                  <path
                    d="M4.30088 8.85938H1.91275C1.35364 8.85938 0.900391 9.31262 0.900391 9.87174V16.5C0.900391 17.0591 1.35364 17.5124 1.91275 17.5124H16.0858C16.6449 17.5124 17.0981 17.0591 17.0981 16.5V9.87173C17.0981 9.31262 16.6449 8.85938 16.0858 8.85938H13.6977C13.1385 8.85938 12.6853 9.31262 12.6853 9.87173V11.4249C12.6853 11.984 12.232 12.4372 11.6729 12.4372H8.99927H6.3256C5.76649 12.4372 5.31324 11.984 5.31324 11.4249V9.87173C5.31324 9.31262 4.85999 8.85938 4.30088 8.85938Z"
                    stroke="#666666"
                    stroke-width="1.01236"
                  />
                  <path
                    d="M1.08789 9.24237L4.15858 1.56219C4.24528 1.34533 4.45529 1.20312 4.68884 1.20312H13.1816C13.4122 1.20312 13.6202 1.3419 13.7088 1.55489L16.9063 9.24237"
                    stroke="#666666"
                    stroke-width="1.0108"
                  />
                </svg>

                <span>보관함</span>
              </li>
            </>
          )}
        </MenuList>

        <Setting className="logBtn">
          {/*v CSS에서  */}
          {isLoggedIn ? (
            // <button onClick={handleLogout}>로그아웃</button>
            <>
              <LogoutBtnWrap className="logInfo">
                {/* <div>
                  <strong>{sessionStorage.getItem("userName")}</strong>{" "}
                  <p>{sessionStorage.getItem("userEmail")}</p>{" "}
                </div> */}

                <button className="more" onMouseDown={moreProfile}>
                  {/* <img src={images.AccountSetting} alt="" /> */}
                  <span>
                    {(() => {
                      const userName = sessionStorage.getItem("userName");
                      return userName && userName.length > 1
                        ? `${userName.slice(0, 1)}`
                        : userName;
                    })()}
                  </span>
                </button>
              </LogoutBtnWrap>

              <LogoutToggle
                ref={toggleRef}
                isToggle={isToggle}
                className="AccountInfo"
              >
                <div className="info">
                  <div className="userName">
                    <strong>{sessionStorage.getItem("userName")}</strong>
                    {/* 일반일때 Grade General */}
                    {userMembership === "Normal" ? (
                      <Grade General />
                    ) : (
                      <Grade />
                    )}
                  </div>
                  {/* 유저 이름 표시 */}
                  <Caption2 color="gray500" align="left">
                    {sessionStorage.getItem("userEmail")}
                  </Caption2>
                  {/* 유저 이메일 표시 */}
                </div>

                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigate("/MyProfile")}
                    >
                      <img src={images.AccountSetting} alt="" />
                      계정 설정
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={handleLogoutClick}>
                      <img src={images.AccountLogout} alt="" />
                      로그아웃
                    </button>
                  </li>
                </ul>
              </LogoutToggle>
            </>
          ) : (
            <>
              <button onClick={handleLoginClick} className="login">
                <img src={images.PersonCircle} alt="로그인" />
                로그인
              </button>
            </>
          )}
        </Setting>
      </NavigationWrap>

      {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}
      {isSignupPopupOpen && <MoleculeSignPopup onClose={closeSignupPopup} />}

      {isAccountPopupOpen && (
        <MoleculeAccountPopup onClose={closeAccountPopup} />
      )}

      {isDeletePopupOpen && (
        <Popup Cancel onClick={handleDeleteCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleDeleteCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>정말 이 보고서를 삭제하시겠습니까?</p>
            <div className="btnWrap">
              <button type="button" onClick={handleDeleteCancel}>
                취소
              </button>
              <button type="button" onClick={handleDeleteInsightConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isChatDeletePopupOpen && (
        <Popup Cancel onClick={handleDeleteCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleDeleteCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>정말 삭제하시겠습니까?</p>
            <div className="btnWrap">
              <button type="button" onClick={handleDeleteCancel}>
                취소
              </button>
              <button type="button" onClick={handleDeleteHistoryConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isLogoutPopup && (
        <Popup Cancel onClick={handleCloseLogoutPopup}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleCloseLogoutPopup}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>
              <strong>정말 로그아웃하시겠습니까?</strong>
              <span>로그아웃하시면 모든 계정 세션이 종료됩니다.</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={handleLogoutConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {/* Report Name Change Popup */}
      {isReportChangePopupOpen && (
        <ChangeNamePopup onClick={handleChangeCancel}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="closePopup"
              onClick={handleChangeCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>새로운 보고서 이름을 입력하세요</p>
            <input
              type="text"
              value={newReportName}
              onChange={(e) => setNewReportName(e.target.value)}
            />
            <div className="btnWrap">
              <button type="button" onClick={handleChangeCancel}>
                취소
              </button>
              <button type="button" onClick={handleChangeInsightConfirm}>
                확인
              </button>
            </div>
          </div>
        </ChangeNamePopup>
      )}
      {isChatChangePopupOpen && (
        <ChangeNamePopup onClick={handleChangeCancel}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="closePopup"
              onClick={handleChangeCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>새로운 프로젝트 이름을 입력하세요</p>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
            />
            <div className="btnWrap">
              <button type="button" onClick={handleChangeCancel}>
                취소
              </button>
              <button type="button" onClick={handleChangeChatConfirm}>
                확인
              </button>
            </div>
          </div>
        </ChangeNamePopup>
      )}
      {isExitPopupOpen && (
        <Popup Cancel onClick={handleExitChatCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleExitChatCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>
              <strong>정말 나가시겠습니까?</strong>
              <span>진행사항이 저장되지 않을 수 있습니다.</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={handleExitChatCancel}>
                취소
              </button>
              <button type="button" onClick={handleExitChatConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isPopupLogin && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupLogin();
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupLogin}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>로그인 후 사용해 주세요.</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupLogin}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isHomePopupOpen && (
        <PopupWrap
          Warning
          title="홈으로 이동하시겠습니까?"
          buttonType="Outline"
          closeText="아니요"
          confirmText="이동하기"
          isModal={false}
          onCancel={handleCloseHomePopup}
          // onClose={handleCloseHomePopup}
          onConfirm={handleConfirmAndNavigate}
        />
      )}
    </>
  );
};

export default OrganismIncNavigation;

const NavigationWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 69px;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 8px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.chatGray};
  z-index: 101;
`;

const Logo = styled.div`
  width: 48px;
  height: 50px;
  background: url(${images.LogoVerticality}) no-repeat center;
  background-size: contain;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 6px 6px 4px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.5s;

    &.active {
      background: rgba(34, 111, 255, 0.04);

      &.home path,
      &.persona path,
      &.management path,
      &.storagebox path {
        stroke: ${palette.primary};
      }

      &.dashboard rect {
        stroke: ${palette.primary};
      }

      &.research path,
      &.history path {
        fill: ${palette.primary};
      }

      span {
        color: ${palette.primary};
      }
    }

    &:hover {
      background: #e5efff;

      span {
        color: ${palette.primary};
      }

      &.home path,
      &.persona path,
      &.management path,
      &.storagebox path {
        stroke: ${palette.primary};
      }

      &.dashboard rect {
        stroke: ${palette.primary};
      }

      &.research path,
      &.history path {
        fill: ${palette.primary};
      }
    }
  }

  img {
    transition: all 0.5s;
  }

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray700};
    line-height: 1.5;
    letter-spacing: -1px;
  }
`;

const Setting = styled.div`
  // width: 22px;
  // height: 22px;
  margin-top: auto;

  button.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    font-family: "Pretendard", "Poppins";
    font-size: 0.75rem;
    color: ${palette.gray700};
    border: 0;
    background: none;
    // background: url(${images.Gear}) no-repeat center;
    // background-size: contain;
  }
`;

// const SubNavigation = styled.div`
//   position: fixed;
//   top: 0;
//   left: 64px;
//   max-width: 400px;
//   width: 100%;
//   height: 100dvh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 32px;
//   padding: 20px 16px;
//   border-right: 1px solid ${palette.outlineGray};
//   background: ${palette.white};
//   overflow-y: auto;
//   z-index: 100;
//   transform: translateX(${(props) => (props.show ? "0" : "-100%")});
//   transition: transform 0.3s ease-in-out;
// `;

// const SubTitle = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   width: 100%;

//   div {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     line-height: 1.5;
//     color: ${palette.gray700};
//   }

//   > img {
//     margin-left: auto;
//     cursor: pointer;
//   }
// `;

// const HistoryWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 32px;
//   width: 100%;
// `;

// const HistoryList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   text-align: left;

//   strong {
//     font-size: 0.875rem;
//     font-weight: 300;
//     color: #393939;
//   }

//   ul {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//   }

//   li {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 12px;
//     font-size: 0.875rem;
//     color: #393939;
//     padding: 8px 12px;
//     cursor: pointer;

//     span {
//       opacity: 0;
//       visibility: hidden;
//       transition: all 0.5s;
//     }

//     &:before {
//       display: block;
//       width: 10px;
//       height: 10px;
//       border-radius: 2px;
//       background: #cecece;
//       transition: all 0.5s;
//       content: "";
//     }

//     &:hover {
//       span {
//         opacity: 1;
//         visibility: visible;
//       }

//       &:before {
//         background: ${palette.primary};
//       }
//     }

//     p {
//       width: 78%;
//       font-weight: 300;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       overflow: hidden;
//     }

//     // span {
//     //   width: 10px;
//     //   height: 10px;
//     //   display: block;
//     //   margin-left: auto;
//     //   background: #cecece;
//     // }
//   }
// `;

const ChangeNamePopup = styled.div`
  /* Overlay styles */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  /* Content area */
  .popup-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    .closePopup {
      position: absolute;
      right: 24px;
      top: 24px;
      width: 16px;
      height: 16px;
      font-size: 0;
      padding: 11px;
      border: 0;
      background: none;

      &:before,
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 100%;
        border-radius: 10px;
        background: ${palette.black};
        content: "";
      }

      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }

    span {
      display: block;
      margin: 0 auto 20px;

      img {
        /* Adjust image styles if needed */
      }
    }

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #8c8c8c;
        display: block;
        margin-top: 8px;
      }
    }

    input {
      margin-bottom: 24px;
      padding: 12px;
      border: 1px solid ${palette.lineGray};
      border-radius: 8px;
      font-size: 1rem;
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }
  }
`;
const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 11px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.black};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #8c8c8c;
        display: block;
        margin-top: 8px;
      }
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.primary};
              background: none;
            }
          }
        }
      `}
  }
`;

// const EditBox = styled.div`
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   max-width: 217px;
//   width: 100%;
//   padding: 20px;
//   border-radius: 15px;
//   background: ${palette.white};
//   box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
//   z-index: 1000;
//   transition: all 0.5s;
//   visibility: ${(props) => (props.isEditToggle ? "visible" : "hidden")};
//   opacity: ${(props) => (props.isEditToggle ? "1" : "0")};

//   button {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     font-family: "Pretendard", "Poppins";
//     font-size: 0.875rem;
//     color: ${palette.gray};
//     border: 0;
//     background: none;
//   }
// `;

const LogoutBtnWrap = styled.div`
  justify-content: space-between !important;

  > div {
    width: 85%;
    flex-direction: column;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray};

    strong {
      display: flex;
      width: 100%;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      width: 100%;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-family: "Pretendard", "Poppins";
    font-size: 1.25rem;
    font-weight: 600;
    color: ${palette.white};
    padding: 0;
    border: 0;
    flex-shrink: 0;
    border-radius: 50%;
    background: #9eb0d1;
    // background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.86724 2.23147L8.51621 1.47925C8.30624 1.02933 7.66602 1.03062 7.45787 1.48139L7.10987 2.23502C6.67141 3.18455 5.57856 3.63981 4.59565 3.28238L3.81553 2.9987C3.34892 2.82902 2.89712 3.28264 3.06868 3.74857L3.3555 4.52753C3.71689 5.509 3.26604 6.60367 2.31828 7.04596L1.56606 7.39699C1.11613 7.60695 1.11742 8.24718 1.56819 8.45533L2.32182 8.80333C3.27136 9.24179 3.72661 10.3346 3.36918 11.3175L3.0855 12.0977C2.91582 12.5643 3.36945 13.0161 3.83537 12.8445L4.61434 12.5577C5.5958 12.1963 6.69047 12.6472 7.13276 13.5949L7.48379 14.3471C7.69376 14.7971 8.33398 14.7958 8.54213 14.345L8.89013 13.5914C9.32859 12.6418 10.4214 12.1866 11.4044 12.544L12.1845 12.8277C12.6511 12.9974 13.1029 12.5437 12.9313 12.0778L12.6445 11.2989C12.2831 10.3174 12.734 9.22272 13.6817 8.78044L14.4339 8.4294C14.8839 8.21944 14.8826 7.57921 14.4318 7.37106L13.6782 7.02307C12.7286 6.5846 12.2734 5.49175 12.6308 4.50884L12.9145 3.72873C13.0842 3.26212 12.6306 2.81032 12.1646 2.98188L11.3857 3.2687C10.4042 3.63008 9.30953 3.17923 8.86724 2.23147ZM9.16348 1.1772C8.69645 0.176413 7.27237 0.179282 6.80938 1.18194L6.46138 1.93557C6.17858 2.548 5.47371 2.84163 4.83975 2.6111L4.05963 2.32742C3.02174 1.95 2.01679 2.959 2.39839 3.99537L2.68521 4.77434C2.9183 5.40737 2.62751 6.11341 2.01622 6.39868L1.264 6.74971C0.263217 7.21674 0.266087 8.64082 1.26874 9.10381L2.02237 9.45181C2.63481 9.73461 2.92844 10.4395 2.6979 11.0734L2.41422 11.8536C2.0368 12.8915 3.04581 13.8964 4.08218 13.5148L4.86114 13.228C5.49417 12.9949 6.20022 13.2857 6.48549 13.897L6.83652 14.6492C7.30355 15.65 8.72763 15.6471 9.19062 14.6445L9.53862 13.8908C9.82142 13.2784 10.5263 12.9848 11.1603 13.2153L11.9404 13.499C12.9783 13.8764 13.9832 12.8674 13.6016 11.831L13.3148 11.0521C13.0817 10.419 13.3725 9.71298 13.9838 9.42771L14.736 9.07668C15.7368 8.60965 15.7339 7.18557 14.7313 6.72258L13.9776 6.37458C13.3652 6.09178 13.0716 5.38691 13.3021 4.75295L13.5858 3.97283C13.9632 2.93493 12.9542 1.92998 11.9178 2.31158L11.1389 2.59841C10.5058 2.83149 9.79978 2.5407 9.51452 1.92941L9.16348 1.1772Z' fill='%238C8C8C'/%3E%3Cpath d='M10.7611 7.91279C10.7611 9.43735 9.52524 10.6732 8.00068 10.6732C6.47613 10.6732 5.24023 9.43735 5.24023 7.91279C5.24023 6.38824 6.47613 5.15234 8.00068 5.15234C9.52524 5.15234 10.7611 6.38824 10.7611 7.91279Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.00068 9.95896C9.13075 9.95896 10.0468 9.04286 10.0468 7.91279C10.0468 6.78273 9.13075 5.86663 8.00068 5.86663C6.87062 5.86663 5.95452 6.78273 5.95452 7.91279C5.95452 9.04286 6.87062 9.95896 8.00068 9.95896ZM8.00068 10.6732C9.52524 10.6732 10.7611 9.43735 10.7611 7.91279C10.7611 6.38824 9.52524 5.15234 8.00068 5.15234C6.47613 5.15234 5.24023 6.38824 5.24023 7.91279C5.24023 9.43735 6.47613 10.6732 8.00068 10.6732Z' fill='%238C8C8C'/%3E%3C/svg%3E") center no-repeat !important;
    // background: url(${images.Gear}) center no-repeat;
    background-size: contain;
  }
`;

const LogoutToggle = styled.div`
  position: absolute;
  min-width: 300px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: ${(props) => (props.isToggle ? "0" : "1000px")};
  padding: ${(props) => (props.isToggle ? "0" : "20px")};
  overflow: hidden;
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isToggle ? "0" : "1")};
  // transition: max-height 0.5s ease, padding 0.5s ease;
  transform: translateX(45px);
  transition: all 0.5s;

  .info {
    font-size: 0.75rem;
    color: ${palette.gray};
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid ${palette.lineGray};
  }

  .userName {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 1rem;
    font-weight: 600;
    color: ${palette.gray700};
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    text-align: left;
    word-wrap: break-word;
    word-break: break-word;
  }

  li {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: "Pretendard", "Poppins";
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      padding: 0;
      border: 0;
      background: none;
    }
  }
`;

const Grade = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${(props) =>
    props.General ? palette.primaryLightest : palette.primary};

  &:before {
    font-size: 0.63rem;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.3px;
    color: ${(props) => (props.General ? palette.primary : palette.white)};
    content: "${(props) => (props.General ? "일반" : "구독")}";
  }
`;
