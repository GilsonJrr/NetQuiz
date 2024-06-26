import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import { StudentTypeValues } from "Store/students/types";
import Avatar from "components/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "components/Button";
import { Paragraph, Title } from "components/ui/Typography/styled";
import Tabs from "components/Tabs";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import Chat from "components/Chat";

type ProfileInfoProps = {
  student: StudentTypeValues;
  onClick?: () => void;
};

const ProfileInfo: FC<ProfileInfoProps> = ({ student, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openChat = new URLSearchParams(location.search).get("chat");

  const { user } = useSelector((state: RootState) => state.user);

  const [tab, setTab] = useState("Profile");

  const { photo, name, socialNetWork, birthDate, email, phone, about, uid } =
    student;

  const handleEdit = () => {
    // localStorage.setItem("quizy_edit_student_id", uid || "");
    navigate(`/students?id=${uid}`);
    onClick?.();
  };

  useEffect(() => {
    setTab(openChat ? "Chat" : "Profile");
  }, [student, openChat]);

  return (
    <Styled.Container>
      <Styled.TabContainer>
        <Tabs
          tabs={[{ label: "Profile" }, { label: "Chat" }]}
          activeTab={(tab) => setTab(tab)}
          radius={10}
          active={tab}
          wrap
        />
      </Styled.TabContainer>
      {tab === "Profile" && (
        <Styled.Content>
          <Avatar name={name} photo={photo} size="big" />
          <Styled.HeaderContainer>
            <Title>{name}</Title>
            <Title size="smaller">{socialNetWork}</Title>
          </Styled.HeaderContainer>
          <Styled.InfosContainer>
            <Styled.InfoTagContainer>
              <Styled.TagBackGround>
                <Styled.BirthDate />
              </Styled.TagBackGround>
              <Title size="small">{birthDate}</Title>
            </Styled.InfoTagContainer>
            <Styled.InfoTagContainer>
              <Styled.TagBackGround>
                <Styled.Email />
              </Styled.TagBackGround>
              <Title size="small">{email}</Title>
            </Styled.InfoTagContainer>
            <Styled.InfoTagContainer>
              <Styled.TagBackGround>
                <Styled.Phone />
              </Styled.TagBackGround>
              <Title size="small">{phone}</Title>
            </Styled.InfoTagContainer>
          </Styled.InfosContainer>
          <Styled.AboutContainer>
            <Title size="small">About</Title>
            <Paragraph size="smaller">{about}</Paragraph>
          </Styled.AboutContainer>
          <Styled.ButtonContainer>
            <Button
              // onClick={() => navigate(`/students?id=${uid}`)}
              onClick={handleEdit}
              width="100%"
              align="center"
            >
              Edit
            </Button>
          </Styled.ButtonContainer>
        </Styled.Content>
      )}
      {tab === "Chat" && (
        <Chat
          tutorUid={user?.info?.uid || ""}
          studentUid={uid || ""}
          userType={"tutor"}
        />
      )}
    </Styled.Container>
  );
};

export default ProfileInfo;
