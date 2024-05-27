import React, { useEffect, useMemo, useState } from "react";
import * as Styled from "../styled";
import Card from "components/Card";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestQuizList } from "Store/quiz/actions";
import { requestMyListList } from "Store/myList/actions";
import { MyListTypeValues } from "Store/myList/types";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import * as Block from "blocks/Dashboard";

export const StudentPage = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { quizzes } = useSelector((state: RootState) => state.quiz);
  const { userStudent } = useSelector((state: RootState) => state.user);
  const { myLists } = useSelector((state: RootState) => state.myList);

  const [tab, setTab] = useState("Quizzes");

  const myList = useMemo(() => {
    if (!quizzes || !Array.isArray(myLists)) {
      return [];
    }
    return quizzes?.filter(
      (item) => myLists && myLists?.includes(item.id as MyListTypeValues)
    );
  }, [myLists, quizzes]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: userStudent?.tutorID || "", size: 50 }));
    }
  }, [dispatch, quizzes, userStudent]);

  useEffect(() => {
    const myListRequest = {
      tutorUid: userStudent?.tutorID || "",
      uid: userStudent?.tutorID || "",
      studentUid: userStudent?.uid || "",
      // quizUid: item?.id,
    };
    if (myLists === undefined) {
      dispatch(requestMyListList(myListRequest));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, myLists]);

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: "Quizzes" },
              { label: "My list" },
              { label: "Results" },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(tab === "Quizzes" || !isMobile) && (
        <Block.QuizzesCard gridName="card1" origin />
      )}
      {(tab === "My list" || !isMobile) && (
        <Card
          gridName="card3"
          title={"My list"}
          isEmpty={myList?.length === 0}
          emptyMessage={
            "Your List is empty add quizzes here to do it later or retry it"
          }
          scrollable
          innerCard={isMobile}
        >
          {myList?.map((list) => {
            return <RenderQuizCard item={list} />;
          })}
        </Card>
      )}
      {(tab === "Results" || !isMobile) && (
        <Block.ResultsCard gridName="card2" origin />
      )}
    </Styled.Container>
  );
};
