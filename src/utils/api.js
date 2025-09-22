// C:\dev\Crowd_Insight-\src\utils\api.js

import axios from 'axios';

// 패널 데이터를 가져오는 함수
export const fetchPanelList = async ({
  page = 1,
  size = 20,
  searchBehabioralType = '',
  searchUtilizationTime = '',
  searchGender = [],
  searchAge = [],
  searchTag1 = [],
  searchTag2 = [],
  searchTag3 = [],
  searchMarriage = [],
  searchChildM = '',
  searchChildF = '',
  panelTotalValue = '',
  isReSearch = 0,
  tempBehabioralType = '',
  tempUtilizationTime = '',
}) => {
  const combinedTags = [...searchTag1, ...searchTag2, ...searchTag3];
  
  try {
    let apiUrl = ``;
    if (!searchBehabioralType || isReSearch === 0) {
      apiUrl = `${process.env.REACT_APP_SERVER_URL}/panels/list?page=${page}&size=${size}
      &searchCode=&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}
      &searchGender=${searchGender}&searchAge=${searchAge}&searchTag=${combinedTags}&searchMarriage=${searchMarriage}
      &searchChildM=${searchChildM}&searchChildF=${searchChildF}&text=${encodeURIComponent(tempBehabioralType)}`;  // 추가된 매개변수
    } else {
      apiUrl = `${process.env.REACT_APP_SERVER_URL}/panels/list?page=${page}&size=${size}
      &searchCode=${panelTotalValue}&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}
      &searchGender=${searchGender}&searchAge=${searchAge}&searchTag=${combinedTags}&searchMarriage=${searchMarriage}
      &searchChildM=${searchChildM}&searchChildF=${searchChildF}&text_target=${encodeURIComponent(tempUtilizationTime)}`;  // 추가된 매개변수
    }

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching panel list:", error);
    throw error;
  }
};
