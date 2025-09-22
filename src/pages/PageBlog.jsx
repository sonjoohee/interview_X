import React from "react";
import styled from "styled-components";
import { ContentsWrap } from "../assets/styles/BusinessAnalysisStyle";
import OrganismIncNavigation from "../pages/Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../pages/Global/molecules/MoleculeHeader";

const PageBlog = () => {
  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <BlogContainer>
          <iframe
            // src="https://www.notioniframe.com/notion/2cduo7gbv65"
            src="https://interviewx.tistory.com/"
            title="Blog Content"
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              padding: 0,
            }}
            allowFullScreen
          />
        </BlogContainer>
      </ContentsWrap>
    </>
  );
};

export default PageBlog;

const BlogContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  padding: 50px 0px 0 69px;
`;
