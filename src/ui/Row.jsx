import styled from "styled-components";

const Row = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: ${(props) => (props.type === "vertical" ? "column" : "row")};

  ${(props) =>
    props.type === "horizontal"
      ? "align-items: center; justify-content: space-between;"
      : ""}

  margin: 10px 0;
  ${(props) => (props.type === "vertical" ? "gap: 0;" : "gap: 10px;")}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
