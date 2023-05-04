import React, { useState } from "react";


import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
const TrueFalseChoice = ({questionType, questions, setQuestions}) => {

  

  return (
    <>
       {questions.map((question, index) => (
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
                        const newQuestions = [...questions];
                        newQuestions[index].answer = e.target.value;
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
                ))}
                
    </>
  )
}

export default TrueFalseChoice
