import styled from "styled-components";

type Props = { width?: number; fillAnswerType?: "default" | "right" | "wrong" };

export const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media screen and (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    align-items: flex-start;
    justify-content: space-between;
    gap: 50px;
    height: 100%;
    overflow-y: scroll;
    padding: 0 60px;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

export const Words = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Input = styled.input<Props>`
  border: none;
  outline: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.main.default};
  font-size: 1.8rem;
  background-color: ${({ theme }) => theme.colors.background.default};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${({ width }) => (width && width + 2) || 3}rem;
  color: ${({ theme }) => theme.colors.main.default};
`;

export const AnswerCheckerContainer = styled.div`
  display: flex;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 6px 20px;
  border-radius: 10px;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  display: flex;
  flex-wrap: wrap;
`;

export const AnswerCheckerText = styled.p<Props>`
  color: ${({ fillAnswerType, theme }) =>
    fillAnswerType === "default"
      ? theme.colors.main.default
      : fillAnswerType === "right"
      ? theme.colors.quiz.right
      : fillAnswerType === "wrong"
      ? theme.colors.quiz.wrong
      : ""};
  text-decoration: ${({ fillAnswerType, theme }) =>
    fillAnswerType === "wrong" ? "underline" : ""};
`;
