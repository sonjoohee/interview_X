import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false); // 이메일 인증 상태 관리

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const userid = queryParams.get("id");
    // https://wishresearch.kr/api/user/activate/4?auth=${token}

    if (token && !isVerified) {
      // isVerified가 false일 때만 요청
      fetch(`https://wishresearch.kr/api/user/activate/${userid}?auth=${token}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("인증 실패");
          }
        })
        .then((data) => {
          if (data.message === "이메일 인증이 완료되었습니다.") {
            setIsVerified(true); // 이메일 인증이 완료되었음을 상태로 저장
            navigate("/email-verified"); // 성공 시 이메일 인증 완료 페이지로 이동
          } else {
            navigate("/email-verification-failed"); // 실패 시 이메일 인증 실패 페이지로 이동
          }
        })
        .catch((error) => {
          navigate("/email-verification-failed"); // 오류 시 이메일 인증 실패 페이지로 이동
        });
    }
  }, [navigate, isVerified]); // isVerified를 의존성 배열에 추가하여 재요청 방지

  return (
    <div>
      <h2>이메일 인증 중...</h2>
    </div>
  );
};

export default VerifyEmail;
