import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  width: 100%;
  padding: 0px;
  height: calc(100vh - 6vh);
  @media screen and (min-width: 600px) {
    height: calc(100vh - 9vh);
    padding: 0px 40px 20px 40px;
    display: flex;
    flex-direction: column;
  }
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  overflow: hidden;
  height: auto;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 50px;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 20%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
  }
`;

export const MapRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  overflow: auto;
  padding-bottom: 150px;
`;
