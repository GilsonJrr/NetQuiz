import React, { useMemo } from "react";
import * as Styled from "../styled";
import { TResult, TCollection, THeader } from "types/index";
import { easyQuizzes } from "assets/consts";
import Table from "components/Table";
import Card from "components/Card";
import RenderTable from "components/renderItems/RenderTable";
import RenderQuizCard from "components/renderItems/RenderQuizCard";

export const StudentPage = () => {
  const myList: TCollection[] = JSON.parse(
    localStorage.getItem("netQuiz_my_list") || "null"
  );

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];

  const results = useMemo(() => {
    const resultStorage = localStorage.getItem("netQuiz_my_results");
    return resultStorage ? JSON.parse(resultStorage).reverse() : [];
  }, []);

  return (
    <Styled.Container>
      <Card
        gridName="card1"
        title="New Quizes"
        isEmpty={easyQuizzes && easyQuizzes.length < 0}
        emptyMessage={"No new quiz available at this time. Please check later"}
        scrollable
      >
        {easyQuizzes?.map((item) => {
          return <RenderQuizCard item={item} />;
        })}
      </Card>
      <Card
        gridName="card3"
        title="My list"
        isEmpty={myList && myList.length < 0}
        emptyMessage={
          "Your List is empty add quizzes here to do it later or retry it"
        }
        scrollable
      >
        {myList?.map((list) => {
          return <RenderQuizCard item={list} />;
        })}
      </Card>
      <Card
        gridName="card2"
        title="Last Completed Quizzes"
        isEmpty={results?.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
        redirectTo="Results"
        redirectPath="/results"
      >
        <Table<TResult>
          header={TableHeaderTitles}
          content={results.slice(0, 5)}
          renderItem={(item) => <RenderTable item={item} />}
        />
      </Card>
    </Styled.Container>
  );
};