import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  TextField,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const MultipleChoice = ({ question, index, questions, setQuestions }) => {
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState(question.options);

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleAddOption = () => {
    if (newOption) {
      const newOptions = [...options, { label: newOption, checked: false }];
      setOptions(newOptions);
      updateQuestion(newOptions);
      setNewOption("");
    }
  };

  const handleOptionChange = (optionIndex) => {
    const newOptions = options.map((option, index) => ({
      ...option,
      checked: index === optionIndex,
    }));
    setOptions(newOptions);
    updateQuestion(newOptions);
  };

  const handleOptionLabelChange = (event, optionIndex) => {
    const newOptions = options.map((option, index) => ({
      ...option,
      label: index === optionIndex ? event.target.value : option.label,
    }));
    setOptions(newOptions);
    updateQuestion(newOptions);
  };

  const handleRemoveOption = (optionIndex) => {
    const newOptions = options.filter((option, index) => index !== optionIndex);
    setOptions(newOptions);
    updateQuestion(newOptions);
  };

  const updateQuestion = (newOptions) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...question, options: newOptions };
    setQuestions(newQuestions);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{
            margin: "10px",
            marginLeft: "2rem",
          }}
          value={newOption}
          onChange={handleNewOptionChange}
          label="New option"
        />
        <IconButton
          style={{ width: "64px", marginLeft: "10px" }}
          onClick={() => handleAddOption()}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Options:</FormLabel>
        {options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Radio
              checked={option.checked}
              onChange={() => handleOptionChange(optionIndex)}
              style={{ marginRight: "16px" }}
            />
            <TextField
              value={option.label}
              onChange={(event) =>
                handleOptionLabelChange(event, optionIndex)
              }
              fullWidth
            />
            <IconButton
              aria-label="remove option"
              onClick={() => handleRemoveOption(optionIndex)}
              style={{ width: "64px" }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </div>
        ))}
      </FormControl>
    </>
  );
};

export default MultipleChoice;
