import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import { multipleChosesSchema } from "lib/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import QuizForm from "layout/QuizForm";
import { QuizTypeValues } from "Store/quiz/types";
import { idGenerator, randomize } from "utils/index";
import QuizTemplate from "layout/Quiz/QuizTemplate";

type MultipleQuestionProps = {
  sendQuiz: (data: QuizTypeValues) => void;
};

type TMultipleQuestions = {
  questions: {
    questionTitle: string;
    answer01: string;
    answer02: string;
    answer03?: string;
    answer04?: string;
    rightAnswer?: string;
  }[];
};

const MultipleQuestion: FC<MultipleQuestionProps> = ({ sendQuiz }) => {
  const userID = localStorage.getItem("userId");

  const [question, setQuestion] = useState([0]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
  } = useForm<TMultipleQuestions>({
    resolver: yupResolver(multipleChosesSchema),
  });

  const onSubmit = (data: TMultipleQuestions) => {
    handleTestAllQuestions();

    const addRightAnswer = (): TMultipleQuestions => {
      return {
        questions: data.questions.map((question) => ({
          ...question,
          rightAnswer: question.answer01,
        })),
      };
    };

    const dataPrepared = {
      id: idGenerator(18),
      uid: userID || "",
      ...JSON.parse(localStorage.getItem("preSendQuiz") || ""),
      ...addRightAnswer(),
    };

    console.log("data aqui", dataPrepared);
    sendQuiz(dataPrepared);
  };

  const handleAddQuestion = () => {
    if (question.length < 15) {
      setQuestion([...question, question[question.length - 1] + 1]);
      setSelectedQuestion(question[question.length - 1] + 1);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    unregister(`questions.${selectedQuestion}`);
    setQuestion(question.filter((a) => a !== id));
    setSelectedQuestion(id - 1);
  };

  const addButtonDisabled = !question.every((question) => {
    return (
      watch(`questions.${question}.questionTitle`)?.trim() ||
      watch(`questions.${question}.answer01`)?.trim() ||
      watch(`questions.${question}.answer02`)?.trim()
    );
  });

  const errorEmptyQuestion = question.findIndex((q) => {
    const questionData = watch(`questions.${q}`);
    if (!questionData) return true;
    const { questionTitle, answer01, answer02 } = watch(`questions.${q}`);
    return !(questionTitle?.trim() && answer01?.trim() && answer02?.trim());
  });

  const handleTestAllQuestions = () => {
    if (errorEmptyQuestion !== -1) {
      setSelectedQuestion(errorEmptyQuestion);
    }
  };

  const questions = [
    {
      id: 1,
      answer: watch(`questions.${selectedQuestion}.answer01`),
      type: "correct",
    },
    {
      id: 2,
      answer: watch(`questions.${selectedQuestion}.answer02`),
      type: "incorrect",
    },
    {
      id: 3,
      answer: watch(`questions.${selectedQuestion}.answer03`),
      type: "incorrect",
    },
    {
      id: 4,
      answer: watch(`questions.${selectedQuestion}.answer04`),
      type: "incorrect",
    },
  ];

  const questionTest: any[] = [
    {
      question: watch(`questions.${selectedQuestion}.questionTitle`),
      answers: randomize(questions.filter((a) => a.answer !== "")),
      correctAnswers: watch(`questions.${selectedQuestion}.answer01`),
    },
  ];

  return (
    <QuizForm
      preview={
        <Styled.PreviewContainer>
          <QuizTemplate questions={questionTest} />
        </Styled.PreviewContainer>
      }
      edit={false}
      formName={"FormMultipleQuestion"}
      title={"Multiple choices"}
      buttonTitle="Save"
    >
      <Styled.Container>
        <Styled.Form
          id="FormMultipleQuestion"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SimpleInput
            label={"Question"}
            placeholder="Enter question title"
            value={watch(`questions.${selectedQuestion}.questionTitle`) || ""}
            error={errors.questions?.[selectedQuestion]?.questionTitle}
            {...register(`questions.${selectedQuestion}.questionTitle`)}
          />

          <Styled.AnswerContainer>
            <SimpleInput
              label={<Styled.Label>Right answer</Styled.Label>}
              value={watch(`questions.${selectedQuestion}.answer01`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer01}
              {...register(`questions.${selectedQuestion}.answer01`)}
              width="45%"
            />
            <SimpleInput
              label={"Answer 2"}
              value={watch(`questions.${selectedQuestion}.answer02`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer02}
              {...register(`questions.${selectedQuestion}.answer02`)}
              width="45%"
            />
            <SimpleInput
              label={"Answer 3"}
              value={watch(`questions.${selectedQuestion}.answer03`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer03}
              {...register(`questions.${selectedQuestion}.answer03`)}
              width="45%"
            />
            <SimpleInput
              label={"Answer 4"}
              value={watch(`questions.${selectedQuestion}.answer04`) || ""}
              error={errors.questions?.[selectedQuestion]?.answer04}
              {...register(`questions.${selectedQuestion}.answer04`)}
              width="45%"
            />
          </Styled.AnswerContainer>
        </Styled.Form>
        <Styled.ButtonContainer
          justify={
            question.length > 1 && selectedQuestion !== 0
              ? "space-between"
              : "flex-end"
          }
        >
          {question.length > 1 && selectedQuestion !== 0 && (
            <Styled.SubmitButton
              onClick={() => handleDeleteQuestion(selectedQuestion)}
            >
              Delete
            </Styled.SubmitButton>
          )}
          {question.length < 15 && (
            <Styled.SubmitButton
              onClick={handleAddQuestion}
              disabled={addButtonDisabled}
            >
              Add
            </Styled.SubmitButton>
          )}
        </Styled.ButtonContainer>
        <Styled.QuestionsContainer>
          {question.map((question, index) => {
            return (
              <Styled.QuestionTag
                onClick={() => setSelectedQuestion(question)}
                active={selectedQuestion === question}
              >
                Q {index + 1}
              </Styled.QuestionTag>
            );
          })}
        </Styled.QuestionsContainer>
      </Styled.Container>
    </QuizForm>
  );
};

export default MultipleQuestion;