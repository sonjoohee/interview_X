import React from 'react';
import styled from 'styled-components';

const ProfileCard = ({ image, title, tags }) => {
  // 태그를 두 줄로 나누기 (첫 줄 최대 2개, 두 번째 줄 나머지)
  const firstRowTags = tags.slice(0, 2);
  const secondRowTags = tags.slice(2);

  return (
    <CardContainer>
      <ProfileImage src={image} alt="프로필 이미지" />
      <ContentWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <TagsContainer>
          <TagRow>
            {firstRowTags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagRow>
          <TagRow>
            {secondRowTags.map((tag, index) => (
              <Tag key={index + 2}>{tag}</Tag>
            ))}
          </TagRow>
        </TagsContainer>
      </ContentWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 24px 20px;
  background: #FFFFFF;
  border: 1px solid #E0E4EB;
  border-radius: 10px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 36px;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 150px;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h3`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #323232;
  text-align: center;
  margin: 0;
  white-space: pre-line;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const TagRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 150px;
  height: 18px;
`;

const Tag = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #8C8C8C;
`;

export default ProfileCard; 