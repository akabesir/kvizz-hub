import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

const DropdownAnswer = ({
  question,
  index,
  questions,
  setQuestions,
  questionType,
}) => {
  const [options, setOptions] = useState(question.options);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleOptionSelect = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    const newQuestions = [...questions];
    newQuestions[index].answer = selectedOption.label;
    setQuestions(newQuestions);
  };
  return (
    <>
      {questionType === "dropdown" && (
        <>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px", width: "100%", minWidth: "450px" }}
          >
            <InputLabel>{question.placeholder}</InputLabel>
            <Select
              value={selectedOptionId}
              label={question.placeholder}
              onChange={handleOptionSelect}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            Molim vas da zamenite taj kod u postojećoj komponenti. Ako imate još
            pitanja, slobodno pitajte.
          </FormControl>

          <Typography variant="subtitle1">{question.newOptionTitle}</Typography>

          <Typography variant="subtitle1" sx={{ margin: "10px" }}>
            {question.currentOptionsTitle}
          </Typography>
        </>
      )}
    </>
  );
};

export default DropdownAnswer;
