import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import { GroupCreateSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { idGenerator } from "utils/index";
import { requestGroupList, setGroup } from "Store/group/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import Avatar from "components/Avatar";
type StudentCreateProps = {};

type TStudent = {
  title: string;
  about?: string;
  image?: string;
};

const GroupCreate: FC<StudentCreateProps> = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state: RootState) => state.groupReducer);
  const userID = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStudent>({
    resolver: yupResolver(GroupCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    console.log("data", data);
    const preparedData = {
      id: idGenerator(18),
      uid: userID || "",
      userType: "student",
      ...data,
    };

    dispatch(setGroup(preparedData));
  };

  useEffect(() => {
    if (groups === undefined && userID) {
      dispatch(requestGroupList({ uid: userID }));
    }
  }, [dispatch, groups, userID]);

  console.log("groups grr", groups);

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Add Group", path: "/students/group-create" },
  ];

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      aqui: {userID}
      <Styled.ContainerInner>
        <Card title={"New Group"} isEmpty={false} gridName="newQuiz">
          <Styled.Form id="newStudentForm" onSubmit={handleSubmit(onSubmit)}>
            <SimpleInput
              label={"Group Title"}
              placeholder="Enter the group title"
              error={errors.title}
              {...register("title")}
            />
            <SimpleInput
              label={"Group image"}
              placeholder="Enter the group image"
              error={errors.image}
              {...register("image")}
            />
            <TextAreaInput
              label="About"
              height="45vh"
              error={errors.about}
              {...register("about")}
            />
          </Styled.Form>
        </Card>
        <Card title={"All Groups"} isEmpty={false} gridName="newQuestion">
          {groups &&
            groups.length > 0 &&
            groups?.map((group) => {
              return (
                <div>
                  <Avatar
                    size="medium"
                    name={group.title}
                    photo={group.image}
                  />
                  {group.title}
                </div>
              );
            })}
        </Card>
        <Styled.ButtonContainer>
          <Styled.SubmitButton type="submit" form="newStudentForm">
            Add Group
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default GroupCreate;
