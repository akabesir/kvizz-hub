import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const MultipleChoiceAnswer = ({ question, index, questions, setQuestions }) => {
  const [options, setOptions] = useState(question.options);

  useEffect(() => {
    // resetujemo stanje svaki put kada se komponenta montira
    resetState();
  }, []);

  const resetState = () => {
    const newOptions = options.map((option) => ({ ...option, checked: false }));
    setOptions(newOptions);
  };

  const handleChange = (e, optionIndex) => {
    const { value } = e.target;

    const newOptions = options.map((option, index) => {
      if (index === optionIndex) {
        return { ...option, checked: true };
      } else {
        return { ...option, checked: false };
      }
    });

    const newQuestion = { ...question, options: newOptions };
    const newQuestions = [...questions];
    newQuestions[index] = newQuestion;
    setQuestions(newQuestions);

    setOptions(newOptions);
  };

  return (
    <FormControl
      component="fieldset"
      style={{ marginBottom: "16px", width: "100%", minWidth: "450px" }}
    >
      <FormLabel component="legend">Options:</FormLabel>
      <RadioGroup>
        {options.map((option, optionIndex) => (
          <div
            key={uuidv4()}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Radio
              defaultValue={option.checked}
              value={option.label}
              onChange={(e) => handleChange(e, optionIndex)}
              style={{ marginRight: "16px" }}
            />
            <Typography style={{ margin: "5px" }}>{option.label}</Typography>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MultipleChoiceAnswer;
