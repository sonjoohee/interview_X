// OrganismProUpgradePopup.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../../../assets/styles/ButtonStyle";
import popupimage from "../../../../assets/images/PopUpImage.png";

/**
 * 사용 예시
 * <OrganismProUpgradePopup
 *   open={isOpen}
 *   onClose={() => setOpen(false)}
 *   onLearnMore={() => console.log("learn more")}
 *   onStartTrial={() => console.log("start trial")}
 *   dontShowChecked={dontShow}
 *   onDontShowChange={(v) => setDontShow(v)}
 *   heroImageSrc={someImageUrl}   // 없으면 장식 그래픽이 보여집니다.
 * />
 */

const PromoBrushIcon = (props) => (
  <svg
    width="29"
    height="28"
    viewBox="0 0 29 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3907_909)">
      <path d="M25.1391 6.9632C24.2516 9.53029 22.2958 12.6985 19.6521 15.3421C17.3918 17.6024 15.2471 18.6735 13.4304 18.8211L8.60079 13.9915C8.77094 12.1663 9.87758 10.0175 12.1025 7.79253C14.7462 5.14888 18.009 3.28766 20.6582 2.48233L25.1391 6.9632ZM21.6319 5.81346C20.8655 5.04714 19.6229 5.04645 18.8566 5.81277C18.0903 6.5791 18.091 7.82171 18.8573 8.58803C19.6236 9.35405 20.8656 9.35423 21.6319 8.58803C22.3981 7.8218 22.3979 6.57981 21.6319 5.81346ZM25.1204 2.62043C25.7821 3.28241 25.821 4.61391 25.3566 6.26783L21.3757 2.28691C23.0832 1.87587 24.4585 1.95853 25.1204 2.62043Z" fill="#666666"/>
      <path d="M8.25098 14.343L13.0783 19.1703C11.822 19.6626 11.2109 19.8187 10.3335 19.8212L7.59494 17.0827C7.54357 16.066 7.73816 15.4549 8.25098 14.343Z" fill="#666666"/>
      <path d="M18.4773 20.8277C18.3226 21.4475 17.5148 21.6052 17.1382 21.0892L15.5107 18.859C16.8363 18.3424 18.2383 17.4233 19.6664 16.0649L18.4773 20.8277Z" fill="#666666"/>
      <path d="M11.326 7.83529C10.0067 9.23371 9.09555 10.6197 8.57528 11.9356L6.39073 10.3415C5.87468 9.96482 6.0324 9.15709 6.65224 9.00231L11.326 7.83529Z" fill="#666666"/>
      <path d="M9.66301 20.0629C9.83297 21.1765 9.73908 23.4638 8.14873 24.2647C8.00137 24.3389 7.85122 24.1951 7.89196 24.0352C8.03184 23.4873 8.16536 22.7295 8.01085 22.3983C7.32444 23.3964 5.42533 25.176 3.13725 24.6609C2.94186 24.6169 2.7887 24.4638 2.74471 24.2684C2.22964 21.9803 4.00933 20.0813 5.00748 19.3949C4.67627 19.2404 3.91845 19.3739 3.37052 19.5138C3.21067 19.5545 3.06686 19.4044 3.14105 19.257C3.94199 17.6667 6.22924 17.5728 7.34285 17.7428L7.81811 18.218C7.2406 18.1819 6.35064 18.3003 6.01161 18.9735C5.97577 19.0447 6.04523 19.1173 6.12248 19.0976C6.38735 19.03 6.75377 18.9654 6.91387 19.0401C6.4552 19.3555 5.655 20.2008 5.791 21.2336C5.81717 21.4322 5.97358 21.5886 6.17214 21.6148C7.205 21.7508 8.05026 20.9506 8.36568 20.4919C8.44037 20.652 8.37575 21.0184 8.30814 21.2833C8.28846 21.3605 8.36101 21.43 8.43223 21.3942C9.10538 21.0551 9.22398 20.1653 9.18789 19.5878L9.66301 20.0629Z" fill="#666666"/>
    </g>
    <defs>
      <clipPath id="clip0_3907_909">
        <rect width="28" height="28" fill="white" transform="translate(0.5)"/>
      </clipPath>
    </defs>
  </svg>
);

const OrganismProUpgradePopup = ({
  open = false,
  onClose,
  onLearnMore,
  onStartTrial,
  dontShowChecked = false,
  onDontShowChange,
  // 텍스트 커스터마이즈
  badgeText = "Pro 업그레이드 안내",
  headline = "InterviewX Pro",
  subHeadline = "Pro에서, 검증된 AI로 비즈니스 전략을 완성하세요",
  promoText = "지금 7일 동안 무료 체험이 가능합니다!",
  primaryCta = "InterviewX Pro 알아보기",
  secondaryCta = "7일 무료체험 신청하기",
  // 이미지 교체 포인트
  heroImageSrc,
  heroImageAlt = "프로 업그레이드 일러스트",
}) => {
  // 체크박스 내부 상태 fallback: 부모가 상태를 안 올려줘도 토글이 보이도록
  const [localDontShow, setLocalDontShow] = React.useState(!!dontShowChecked);
  useEffect(() => {
    setLocalDontShow(!!dontShowChecked);
  }, [dontShowChecked]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay role="dialog" aria-modal="true" aria-label="Pro 업그레이드 안내">
      <ModalContainer>

        {/* 헤더 */}
        <HeadArea>
        <HeaderRow>
          <Badge>{badgeText}</Badge>
          <CloseButton
            onClick={onClose}
            aria-label="닫기"
            title="닫기"
          >
            <CloseIcon />
          </CloseButton>
        </HeaderRow>

        {/* 타이틀/설명 */}
        <HeadingGroup>
          <Title>{headline}</Title>
          <Subtitle>{subHeadline}</Subtitle>
        </HeadingGroup>
        </HeadArea>

        <HeroArea>
          {/* 교체 가능한 이미지 */}
          {popupimage ? (
            <HeroImage src={popupimage} alt={popupimage} />
          ) : (
            <></>
          )}
        </HeroArea>


        <ContentArea>
        {/* 프로모 문구 */}
        <PromoRow>
        <PromoBrushIcon aria-hidden />
          <PromoText>{promoText}</PromoText>
        </PromoRow>

        {/* CTA 버튼 */}
        <CTAGroup>
          <Button
           Other2
           Primary
           Fill
           onClick={onLearnMore}>
            {primaryCta}
          </Button>
          <Button
           Other2
           Outline
           radius="4px"
           onClick={onStartTrial}>
            {secondaryCta}
          </Button>
        </CTAGroup>
        </ContentArea>

        {/* 하단 옵션 */}
        <FooterRow as="label" htmlFor="dont-show-week"> {/* 라벨 전체를 클릭 가능 영역으로 */}
          <Checkbox 
            id="dont-show-week" 
            type="checkbox" 
            checked={localDontShow} 
            onChange={(e) => { 
              const v = e.target.checked; 
              setLocalDontShow(v); 
              onDontShowChange && onDontShowChange(v); 
            }} 
          /> 
          <CheckboxText>일주일간 보지 않기</CheckboxText> 
        </FooterRow>
      </ModalContainer>
    </Overlay>
  );
};

export default OrganismProUpgradePopup;
export { OrganismProUpgradePopup };

/* ===================== styled ===================== */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9990;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 480px;
  background: #ffffff;
  border-radius: 30px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.25);
  overflow: hidden;
  padding: 24px 32px 24px 32px;
  font-family: Pretendard, poppins;
`;

/* ==== Hero / Illustration area ==== */
const HeroArea = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 24px;
  background: #fff;
  overflow: hidden;
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 240px;
  object-fit: cover;
`;


/* ==== Header ==== */
const HeadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 416px;
  gap: 24px;
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Badge = styled.div`
  padding: 5px 12px;
  border-radius: 20px;
  margin-left: 137px;
  color: #3F67C3;
  font-size: 16px;
  font-weight: 500;
  font-family: Pretendard, poppins;
  line-height: 24px;
  background: linear-gradient(
    143deg,
    rgba(90,129,255,0.27) 0%,
    rgba(86,126,255,0.29) 45%,
    rgba(78,120,255,0.27) 100%
  );
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover { background: #F5F6FA; }
`;

const CloseIcon = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  display: inline-block;

  &::before, &::after {
    content: "";
    position: absolute;
    left: 9px;
    top: 2px;
    width: 2px;
    height: 16px;
    background: #666;
    border-radius: 1px;
  }
  &::before { transform: rotate(45deg); }
  &::after { transform: rotate(-45deg); }
`;

/* ==== Texts ==== */
const HeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
`;

const Title = styled.h2`
&&{
  margin: 0;
  color: #000;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  font-family: Pretendard, poppins;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  color: #3F67C3;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  font-family: Pretendard, poppins;
  letter-spacing: 0.5px;
`;

/* ==== Promo ==== */
const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const PromoRow = styled.div`
  width: 416px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;


const PromoText = styled.span`
  color: #666666;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  font-family: Pretendard, poppins;
`;

/* ==== Buttons ==== */
const CTAGroup = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* ==== Footer ==== */
const FooterRow = styled.div`
  margin: 20px auto 0 auto;
  width: 416px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid #666;
  appearance: none;
  outline: none;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background: #fff;

  &:checked {
    background: #226FFF;
    border-color: #226FFF;
  }

  &:checked::after {
    content: "";
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 12px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxText  = styled.label`
  color: #666666;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

