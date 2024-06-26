import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  width: 100%;
  padding: 0px;
  height: 100%;

  @media screen and (min-width: 900px) {
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
  margin-top: 10px;
  @media screen and (min-width: 900px) {
    margin-top: 0px;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 50px;
      background: linear-gradient(
        0deg,
        ${({ theme }) => theme.colors.background.default} 20%,
        rgba(255, 255, 255, 0) 100%
      );
      bottom: 0;
      left: 0;
      border-radius: 0 0 20px 20px;
    }
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

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 500px;
`;

export const SearchContainerInner = styled.div`
  display: flex;
  width: 100%;
`;

export const SingleTabContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
