import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  IconButton,
  InputLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Dropdown = ({
  question,
  index,
  questions,
  setQuestions,
  questionType,
}) => {
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState(question.options);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
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

  const handleOptionSelect = (event) => {
    setSelectedOptionId(event.target.value);
  };
  return (
    <>
      {questionType === "dropdown" && (
        <>
          <Typography variant="subtitle1">{question.title}</Typography>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px", width: "100%" }}
          >
            <InputLabel>{question.placeholder}</InputLabel>
            <Select value={selectedOptionId} label={question.placeholder} onChange={handleOptionSelect}>
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  value={index}
                 
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle1">{question.newOptionTitle}</Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                margin: "10px",
                marginLeft: "2rem",
              }}
              value={newOption}
              onChange={handleNewOptionChange}
              label="New Option"
            />
            <IconButton
              style={{ width: "64px", marginLeft: "10px" }}
              onClick={() => handleAddOption()}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>

          <Typography variant="subtitle1" sx={{ margin: "10px" }}>
            {question.currentOptionsTitle}
          </Typography>

          {options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              style={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                value={option.label}
                onChange={(event) =>
                  handleOptionLabelChange(event, optionIndex)
                }
                fullWidth
              />
              <IconButton
                aria-label={question.removeOptionLabel}
                onClick={() => handleRemoveOption(optionIndex)}
                style={{ width: "64px" }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Dropdown;
