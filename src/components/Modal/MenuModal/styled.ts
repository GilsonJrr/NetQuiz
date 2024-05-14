import styled from "styled-components";

type Props = {
  active?: boolean;
  exit?: boolean;
  showMenu?: boolean;
};

export const Container = styled.div<Props>`
  background-color: #ffffff;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 30px 0 0 0;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DragClose = styled.div`
  background-color: #4a4747;
  height: 10px;
  width: 15%;
  border-radius: 10px;
  margin-bottom: 30px;
`;

export const ContainerBackGround = styled.div<Props>`
  width: 100%;
  height: calc(100vh - 9vh);
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  z-index: 100;
  @media screen and (min-width: 600px) {
    background-color: transparent;
    width: 7vw;
  }
`;

export const MenuContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  background-color: #ffffff;
  height: auto;
  @media screen and (min-width: 600px) {
    padding: 20px 20px 0 20px;
    height: 100%;
  }
`;

export const IconContainer = styled.div<Props>`
  color: ${({ active }) => (active ? "#f8f8f8" : "#4a4747")};
  padding: 15px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#4a4747" : "transparent")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: 0.3s ease-in-out all;
  gap: 20px;

  &:hover {
    background-color: #4a4747;
    color: #f8f8f8;
  }

  @media screen and (min-width: 600px) {
    align-items: center;
    justify-content: center;
  }
`;

export const MenuText = styled.h2<Props>`
  display: flex;
  margin: 0;
  font-size: 1.3rem;
  color: ${({ active, exit }) =>
    active ? "#F8f8f8" : exit ? "#996868" : "#4a4747"};
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

export const ExitContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #996868;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  padding: 35px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  @media screen and (min-width: 600px) {
    padding: 0;
    align-items: center;
    justify-content: center;
  }
`;
