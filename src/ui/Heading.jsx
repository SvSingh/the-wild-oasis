import styled from "styled-components";

const Heading = styled.h1`
  color: green;

  font-family: "Arial", sans-serif;
  margin-top: 10px;

  ${(props) =>
    props.as === "h1" &&
    `
    font-size: 30px;
    font-weight: 700;
  `}

  ${(props) =>
    props.as === "h2" &&
    `
    font-size: 24px;
    font-weight: 600;
  `}
  ${(props) =>
    props.as === "h3" &&
    `
    font-size: 20px;
    font-weight: 500;
  `}
`;
export default Heading;
