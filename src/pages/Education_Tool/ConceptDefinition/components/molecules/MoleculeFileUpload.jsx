import React from 'react';
import { Body1, Body2, Sub3 } from '../../../../../assets/styles/Typography';
import Dropzone from 'react-dropzone-uploader';
import images from "../../../../../assets/styles/Images";
import { TabContent5Item,StyledDropzone } from '../../../../../assets/styles/BusinessAnalysisStyle';

const MoleculeFileUpload = ({ 
  fileNames, 
  handleChangeStatus, 
  toolSteps
}) => {
  return (
    <TabContent5Item required>
      <div className="title">
        <Body1 color="gray700">파일 업로드 (20MB)</Body1>
      </div>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canRemove={false}
        canRestart={false}
        disabled={toolSteps >= 1}
        accept="application/pdf"
        maxSizeBytes={20 * 1024 * 1024}
        inputWithFilesContent={
          <>
            <img src={images.ImagePrimary} alt="" />
            {fileNames.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div>
                  <Body2 color="gray800">
                    업로드하려는 파일을 드래그하여 놓아주세요
                  </Body2>
                  <Sub3 color="gray500">
                    jpg, png, PDF 파일만 업로드가 가능합니다
                    (20MB 이하)
                  </Sub3>
                </div>
                <div className="browse-button">
                  파일 찾아보기
                </div>
              </div>
            )}
            {fileNames.length > 0 && (
              <div>
                {fileNames.map((name, index) => (
                  <Body2 key={index} color="gray700">
                    {name}
                  </Body2>
                ))}
              </div>
            )}
          </>
        }
        inputContent={
          <>
            <img src={images.ImagePrimary} alt="" />
            {fileNames.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div>
                  <Body2 color="gray800">
                    업로드하려는 파일을 드래그하여 놓아주세요
                  </Body2>
                  <Sub3 color="gray500">
                    PDF 파일만 업로드가 가능합니다 (20MB 이하)
                  </Sub3>
                </div>
                <div className="browse-button">
                  파일 찾아보기
                </div>
              </div>
            )}
            {fileNames.length > 0 && (
              <div>
                {fileNames.map((name, index) => (
                  <Body2 key={index} color="gray700">
                    {name}
                  </Body2>
                ))}
              </div>
            )}
          </>
        }
        styles={StyledDropzone}
      />
    </TabContent5Item>
  );
};

export default MoleculeFileUpload;