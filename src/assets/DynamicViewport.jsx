import { useEffect } from "react";

export const useDynamicViewport = (viewportContent) => {
  useEffect(() => {
    const metaTag = document.querySelector("meta[name='viewport']");
    if (metaTag) {
      metaTag.setAttribute("content", viewportContent);
    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.name = "viewport";
      newMetaTag.content = viewportContent;
      document.head.appendChild(newMetaTag);
    }

    return () => {
      // 기본 뷰포트로 복원
      const metaTag = document.querySelector("meta[name='viewport']");
      if (metaTag) {
        metaTag.setAttribute("content", "width=device-width, initial-scale=1");
      }
    };
  }, [viewportContent]);
};