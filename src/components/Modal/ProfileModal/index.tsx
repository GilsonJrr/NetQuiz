import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { UseData } from "Store/auth/types";
import { updateStudent } from "Store/students/actions";
import { setUser } from "Store/user/actions";

import Avatar from "components/Avatar";
import { useModalContext } from "../modalContext";
import SimpleInput from "components/inputs/SimpleInput";
import { TStudent } from "views/dashboard/Students/StudentPages/StudentCreate";

import { FaCamera } from "react-icons/fa";
import { LoadingContainerCard } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import Button from "components/Button";

type ExampleProps = {};

const ProfileModal: FC<ExampleProps> = () => {
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
    watch,
  } = useForm<TStudent>({});

  const { handleModal } = useModalContext();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const { student } = useSelector((state: RootState) => state.student);

  const [editMode, setEditMode] = useState(false);

  const tutorInfo = user?.info || ([] as unknown as UseData);
  const studentInfo = student?.info || ([] as unknown as UseData);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    handleModal("");
  };

  const onSubmit = (data: TStudent) => {
    isDirty && handleModal("");

    if (data.userType === "student" && isDirty) {
      return dispatch(updateStudent(data));
    }
    if (data.userType === "tutor" && isDirty) {
      return dispatch(setUser(data));
    }
  };

  const userType = tutorInfo.userType || studentInfo.userType;

  useEffect(() => {
    if (userType === "tutor") {
      return reset(tutorInfo);
    }
    if (userType === "student") {
      return reset(studentInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  const handleClick = () => {
    setEditMode(!editMode);
  };

  if (isLoading || watch("name") === undefined) {
    return (
      <Styled.Container onClick={handleContainerClick}>
        <Styled.Content onClick={(event) => event.stopPropagation()}>
          <LoadingContainerCard>
            <LoadingSpinner size="medium" />
          </LoadingContainerCard>
        </Styled.Content>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container onClick={handleContainerClick}>
      <Styled.Content onClick={(event) => event.stopPropagation()}>
        <Styled.IconContainer onClick={handleContainerClick}>
          <Styled.ChevronRight size={18} />
        </Styled.IconContainer>
        <Styled.ProfileEditContainer
          id="profileUpdate"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Styled.AvatarContainer>
            <Avatar
              name={watch("name")}
              photo={watch("photo")}
              size={editMode ? "big" : "bigger"}
            />
            {editMode && (
              <Styled.PhotoButtonContainer>
                <Button padding="10px" radius="100%">
                  <FaCamera />
                </Button>
              </Styled.PhotoButtonContainer>
            )}
          </Styled.AvatarContainer>
          <Styled.Spacer editMode={editMode} />
          <SimpleInput
            label="Name"
            viewMode={!editMode}
            disabled={!editMode}
            {...register("name")}
          />
          <SimpleInput
            label="Email"
            disabled
            viewMode={!editMode}
            {...register("email")}
          />
          <SimpleInput
            label="Phone"
            disabled={!editMode}
            viewMode={!editMode}
            {...register("phone")}
          />
          <SimpleInput
            label="Birth"
            disabled={!editMode}
            viewMode={!editMode}
            {...register("birthDate")}
          />
          <SimpleInput
            label="Social"
            disabled={!editMode}
            viewMode={!editMode}
            {...register("socialNetWork")}
          />
          <SimpleInput
            label="Type"
            disabled
            viewMode={!editMode}
            {...register("userType")}
          />
        </Styled.ProfileEditContainer>
        <Styled.ButtonContainer>
          <Button
            onClick={handleClick}
            type={!editMode ? "submit" : "button"}
            form={!editMode ? "profileUpdate" : "none"}
            width="100%"
          >
            {editMode ? "Update Profile" : "Edit"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default ProfileModal;
