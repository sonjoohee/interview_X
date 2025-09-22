import styled from "styled-components";
import { palette } from "./Palette";

// H1
export const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.96px;
`;

// H2
export const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.72px;
`;

// H3
export const H3 = styled.h3`
  font-size: 1.38rem;
  font-weight: 700;
  line-height: 1.3;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.66px;
`;

// H4
export const H4 = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.6px;
`;

// H5
export const H5 = styled.h5`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.3;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.6px;
`;

// H6
export const H6 = styled.h6`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.3;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.6px;
`;

// Body1
export const Body1 = styled.div`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.48px;
`;

// Body2_1
export const Body2_1 = styled.strong`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.48px;
`;

// Body2
export const Body2 = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.48px;
`;

// Body3
export const Body3 = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.48px;
`;
// Body4
export const Body4 = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.48px;
`;

// Sub1
export const Sub1 = styled.div`
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.42px;
`;

// Sub2_1
export const Sub2_1 = styled.div`
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.42px;
`;

// Sub2
export const Sub2 = styled.div`
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.42px;
`;

// Sub3
export const Sub3 = styled.div`
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.42px;
`;
// Sub4
export const Sub4= styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.55;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.42px;
`;
// Caption1
export const Caption1 = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.36px;
`;

// Caption2
export const Caption2 = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.36px;
`;

// InputText
export const InputText = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.36px;
`;

// Helptext
export const Helptext = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.2;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.3px;
`;

// ModerText
export const ModerText = styled.div`
  font-size: 0.63rem;
  font-weight: 400;
  line-height: 1.2;
  color: ${(props) => palette[props.color] || "inherit"};
  text-align: ${(props) => props.align || "inherit"};
  letter-spacing: -0.3px;
`;
