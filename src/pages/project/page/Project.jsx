import React from "react";

import Header from "../../layout/Header";
import LeftMenu from "../../layout/LeftMenu";
import Summary from "./Summary";
import Question from "./Question";
import Target from "./Target";

import {
  Title,
  ContentsWrap,
  Contents,
  TabGroup,
} from "../../../assets/styles/Common";

import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { MODULES_ALL_DATA, PROJECT_NOW_STATE } from "../state/project_manager";
import {
  PROJECTLIST,
  WORKSPACE,
} from "../../main-dashboard/state/dashboard_data_manager";

const Project = () => {
  const { projectId } = useParams();

  const [module, set_module] = useAtom(PROJECT_NOW_STATE);

  var nowModule = PROJECTLIST.init.Data.find(function (pro) {
    return pro.P_Idx === parseInt(projectId);
  });

  var nowWork = WORKSPACE.init.Data.find(function (work) {
    return work.W_Idx === parseInt(nowModule.W_Idx);
  });

  var modules = MODULES_ALL_DATA.init.Data.find(function (mod) {
    return mod.P_Idx === parseInt(nowModule.P_Idx) && mod.module === module;
  });

  ///////////// 차트 해본다

  var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(
      width,
      window.innerHeight - margin.top - margin.bottom - 20
    );

  // console.log("???????????::", module);

  return (
    <>
      <Header />

      <ContentsWrap>
        <LeftMenu />

        <Contents>
          <Title H1>{nowWork.Title}</Title>

          <TabGroup>
            {nowModule.Module?.map((module_name, index) => (
              <p key={index} className={module_name === module ? "on" : ""}>
                <span
                  onClick={() => {
                    set_module(module_name);
                  }}
                >
                  {module_name}
                </span>
              </p>
            ))}
          </TabGroup>

          <div>
            {module === "프로젝트 개요" ? (
              <>
                <Summary projectId={projectId} />

                {/* <div>
                <h1>기본 내용 소환 </h1>
              </div> */}
              </>
            ) : module === "문항별 결과" ? (
              <Question projectId={projectId} />
            ) : // <div>
            //   <h1>시장분석 </h1>

            //   <p>{modules.blog_detail}</p>
            // </div>
            module === "타겟고객 분석" ? (
              <Target projectId={projectId} />
            ) : (
              // <div>
              //   <h1>타겟고객분석</h1>
              // </div>
              <h1> 모듈이 설정되지 않았습니다.</h1>
            )}
          </div>
        </Contents>
      </ContentsWrap>
    </>
  );
};

export default Project;
