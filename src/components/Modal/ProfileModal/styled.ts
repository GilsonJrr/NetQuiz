import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa6";

type Props = { editMode?: boolean };

export const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.15);
`;

export const Content = styled.div<Props>`
  background-color: #f8f8f8;
  width: 30vw;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100000;
  padding: 30px 40px 30px;
  border-left: 1px solid rgba(0, 0, 0, 0.5);
`;

export const ChevronRight = styled(FaChevronRight)`
  cursor: pointer;
`;

export const IconContainer = styled.div``;

export const AvatarContainer = styled.div`
  margin: 10px 0 20px;
  position: relative;
`;

export const ProfileEditContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
`;

export const Spacer = styled.div<Props>`
  border-top: ${({ editMode }) => (editMode ? 0 : 1)}px solid rgba(0, 0, 0, 0.5);
  width: 100%;
`;

export const ButtonContainer = styled.div`
  width: 90%;
  padding: 10px;
  margin: 0 5%;
  position: absolute;
  right: 0;
  bottom: 20px;
`;

export const PhotoButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;
