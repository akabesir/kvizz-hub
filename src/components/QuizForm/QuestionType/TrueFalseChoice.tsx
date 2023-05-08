import React, { useState } from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
const TrueFalseChoice = ({
  questionType,
  questions,
  setQuestions,
  index,
  question,
}) => {
  return (
    <>
      {questionType === "true/false" && (
        <FormControl
          component="fieldset"
          style={{ marginBottom: "16px", width: "100%" }}
        >
          <FormLabel component="legend">Answer</FormLabel>
          <RadioGroup
            aria-label="answer"
            name="answer"
            value={question.answer}
            onChange={(e) => {
              const newQuestion = { ...question };
              newQuestion.answer = e.target.value;
              const newQuestions = [...questions];
              newQuestions[index] = newQuestion;
              setQuestions(newQuestions);
            }}
            style={{ width: "100%" }}
          >
            <FormControlLabel
              value="True"
              control={<Radio />}
              label="True"
              style={{ width: "100%" }}
            />
            <FormControlLabel
              value="False"
              control={<Radio />}
              label="False"
              style={{ width: "100%" }}
            />
          </RadioGroup>
        </FormControl>
      )}
    </>
  );
};

export default TrueFalseChoice;
