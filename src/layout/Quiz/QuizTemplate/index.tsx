import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Answer, EAnswerIndexation, QuestionFiltered } from "types/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setResult } from "Store/result/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import ProgressBar from "components/ProgressBar";
import Button from "components/Button";

type QuizTemplateProps = {
  onClose?: () => void;
  questions: QuestionFiltered[];
  quizId: string;
};

type TQuizResume = {
  question?: string;
  rightAnswer?: string;
  selectedAnswer?: string;
};

const QuizTemplate: FC<QuizTemplateProps> = ({
  onClose,
  questions,
  quizId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quiz } = useSelector((state: RootState) => state.quiz);
  const { student } = useSelector((state: RootState) => state.student);

  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quizResume, setQuizResume] = useState<TQuizResume[]>([]);

  const handleAnswer = () => {
    selectedAnswer?.type === "correct" && setScore(score + 1);
    setShowAnswer(true);
    //filtrar quando for correto
    setQuizResume([
      ...quizResume,
      {
        question: questions?.[current]?.question,
        rightAnswer: questions?.[current]?.correctAnswers.toString(),
        selectedAnswer: selectedAnswer?.answer,
      },
    ]);
  };

  useEffect(() => {
    current + 1 === questions?.length && setShowScore(true);
  }, [current, questions?.length]);

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer(undefined);
    questions && current + 1 === questions?.length
      ? setShowScore(true)
      : setCurrent(current + 1);
  };

  const finishQuiz = () => {
    setShowScore(false);
    const newResult = {
      tutorUid: student?.info?.tutorID || "",
      uid: student?.info?.tutorID || "",
      studentUid: student?.info?.uid || "",
      quizUid: quiz?.id,
      quizTitle: quiz?.title,
      quizCategory: quiz?.category,
      amount: questions?.length.toString(),
      score: score.toString(),
      resume: quizResume,
      date: new Date().toISOString(),
    };
    dispatch(setResult(newResult));
    navigate("/quizResult", {
      state: {
        score: score,
        amount: questions?.length,
        quizResume: quizResume,
        quizId: quizId,
      },
    });
  };

  return (
    <Styled.Container>
      <Styled.QuizContainer>
        <Styled.Header>
          <Styled.Close onClick={onClose}>
            <IoClose size={20} />
          </Styled.Close>
          <Styled.ProgressContainer>
            <ProgressBar
              progress={questions && ((current + 1) / questions?.length) * 100}
              color={"#89c799"}
              displayPercentage={false}
            />
            <Styled.ProgressNumber>
              {current + 1}/{questions?.length}
            </Styled.ProgressNumber>
          </Styled.ProgressContainer>
        </Styled.Header>

        <Styled.QuestionContainer>
          <Styled.Question>{questions?.[current]?.question}</Styled.Question>
          <Styled.OptionsContainer>
            {questions?.[current]?.answers.map((answer: any, index: number) => {
              const active = answer.answer === selectedAnswer?.answer;
              return (
                <Styled.ButtonContainer>
                  <Button
                    onClick={() => setSelectedAnswer(answer)}
                    variant={active ? "success" : "secondary"}
                    disabled={showAnswer}
                    width="100%"
                    padding="20px"
                  >
                    <Styled.AnswerIndex>
                      {EAnswerIndexation[index]}
                    </Styled.AnswerIndex>
                    <Styled.AnswerText active={active}>
                      {answer.answer || ""}
                    </Styled.AnswerText>
                  </Button>
                </Styled.ButtonContainer>
              );
            })}
          </Styled.OptionsContainer>
        </Styled.QuestionContainer>
      </Styled.QuizContainer>

      <Styled.QuizCheckContainer
        checkType={showAnswer ? selectedAnswer?.type : ""}
      >
        {showAnswer ? (
          selectedAnswer?.type === "incorrect" ? (
            <Styled.CheckedAnswerContainer>
              <Styled.CheckedAnswerIcon checkType={selectedAnswer?.type || ""}>
                <IoClose size={50} />
              </Styled.CheckedAnswerIcon>
              <Styled.CheckedAnswerTextContainer>
                <Styled.CheckedAnswerTitle>
                  The right answer is:
                </Styled.CheckedAnswerTitle>
                <Styled.CheckedAnswerText>
                  {questions?.[current]?.correctAnswers.toString()}!
                </Styled.CheckedAnswerText>
              </Styled.CheckedAnswerTextContainer>
            </Styled.CheckedAnswerContainer>
          ) : (
            <Styled.CheckedAnswerContainer>
              <Styled.CheckedAnswerIcon checkType={selectedAnswer?.type || ""}>
                <FaCheck size={50} />
              </Styled.CheckedAnswerIcon>
              <Styled.CheckedAnswerText>Grate job!</Styled.CheckedAnswerText>
            </Styled.CheckedAnswerContainer>
          )
        ) : (
          <Styled.CheckedAnswerIcon checkType={""} />
        )}
        <Styled.ContinueButtonContainer>
          <Button
            onClick={
              showAnswer && showScore
                ? finishQuiz
                : showAnswer
                ? nextQuestion
                : handleAnswer
            }
            disabled={!selectedAnswer}
            width="100%"
            variant="secondary"
          >
            {showAnswer && showScore
              ? "Finish"
              : showAnswer
              ? "Continue"
              : "Check"}
          </Button>
        </Styled.ContinueButtonContainer>
      </Styled.QuizCheckContainer>
    </Styled.Container>
  );
};

export default QuizTemplate;
