import React from "react";
import { Sub3 } from "../../../../assets/styles/Typography"; // 필요한 스타일 import
import images from "../../../../assets/styles/Images"; // 이미지 import
import { Button } from "../../../../assets/styles/ButtonStyle"; // 버튼 스타일 import

const OrganismNoPersonaMessage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <img src={images.PeopleFillPrimary2} alt="" />
      <Sub3 color="gray700">
        현재 분석할 페르소나가 없습니다
        <br />
        AI Person을 생성 한 후 다시 분석툴을 활용해주세요
      </Sub3>
      <Button Medium Outline Fill>
        AI Person 확인하기
      </Button>
    </div>
  );
};

export default OrganismNoPersonaMessage;
