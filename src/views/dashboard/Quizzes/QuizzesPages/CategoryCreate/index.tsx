import React, { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import { CategoryCreateSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { idGenerator } from "utils/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import Avatar from "components/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeCategory,
  requestCategoryList,
  setCategory,
} from "Store/category/actions";
type StudentCreateProps = {};

type TStudent = {
  title: string;
  about?: string;
  image?: string;
};

const CategoryCreate: FC<StudentCreateProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const categoryId = new URLSearchParams(location.search).get("id");

  const { categories } = useSelector(
    (state: RootState) => state.categoryReducer
  );
  const { quizzesCategory } = useSelector(
    (state: RootState) => state.quizReducer
  );

  const userID = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TStudent>({
    resolver: yupResolver(CategoryCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    console.log("data", data);
    const preparedData = {
      id: categoryId !== null ? categoryId : idGenerator(18),
      uid: userID || "",
      userType: "student",
      ...data,
    };

    dispatch(setCategory(preparedData));
    navigate("/quizzes");
  };

  useEffect(() => {
    if (categories === undefined && userID) {
      dispatch(requestCategoryList({ uid: userID }));
    }
  }, [dispatch, categories, userID]);

  const crumbs = [
    { label: "Quizzes", path: "/quizzes" },
    { label: categoryId !== null ? "Edit Category" : "Add Category", path: "" },
  ];

  useEffect(() => {
    if (categoryId !== null && categories) {
      reset(...categories?.filter((g) => g.id === categoryId));
    }
  }, [categoryId, categories, reset]);

  //TODO: Mudar para "hasQuiz" aqui
  const hasStudent = useMemo(() => {
    return quizzesCategory?.some(
      (a) =>
        a.category === categories?.filter((g) => g.id === categoryId)[0]?.title
    );
  }, [categoryId, categories, quizzesCategory]);

  const handleDelete = () => {
    dispatch(
      removeCategory({ uid: userID || "", categoryId: categoryId || "" })
    );
    navigate("/quizzes");
  };

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.ContainerInner>
        <Card title={"New Category"} isEmpty={false} gridName="newQuiz">
          <Styled.Form id="newStudentForm" onSubmit={handleSubmit(onSubmit)}>
            <SimpleInput
              label={"Category Title"}
              placeholder="Enter the category title"
              error={
                hasStudent
                  ? {
                      type: "custom",
                      message:
                        "Category has active quiz, name can't be changed",
                    }
                  : errors.title
              }
              {...register("title")}
              disabled={hasStudent}
            />
            <SimpleInput
              label={"Category image"}
              placeholder="Enter the category image"
              error={errors.image}
              {...register("image")}
            />
            <TextAreaInput
              label="About"
              height="40vh"
              error={errors.about}
              {...register("about")}
            />
          </Styled.Form>
        </Card>
        <Card title={"All Categories"} isEmpty={false} gridName="newQuestion">
          <Styled.CategoryCardContainer>
            {categories &&
              categories.length > 0 &&
              categories?.map((category) => {
                return (
                  <Styled.CategoryCard
                    active={category.id === categoryId}
                    onClick={() =>
                      navigate(`/quizzes/category-create?id=${category.id}`)
                    }
                  >
                    <Avatar
                      size="medium"
                      name={category.title}
                      photo={category.image}
                    />
                    <Styled.CategoryTitle>
                      {category.title}
                    </Styled.CategoryTitle>
                  </Styled.CategoryCard>
                );
              })}
          </Styled.CategoryCardContainer>
        </Card>
        <Styled.ButtonContainer
          justify={
            categoryId !== null && !hasStudent ? "space-between" : "flex-end"
          }
        >
          {categoryId !== null && !hasStudent && (
            <Styled.DeleteButton
              type="button"
              disabled={hasStudent}
              onClick={handleDelete}
            >
              Delete Category
            </Styled.DeleteButton>
          )}
          <Styled.SubmitButton type="submit" form="newStudentForm">
            {categoryId !== null ? "Update Category" : "Add Category"}
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default CategoryCreate;
