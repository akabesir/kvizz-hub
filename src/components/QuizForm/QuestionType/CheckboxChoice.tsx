import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CheckboxChoice = ({ questionType, question, index, questions, setQuestions }) => {
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState(
    question.options || [{ label: "", checked: false }]
  );

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleAddOption = () => {
    if (newOption.trim() === "") return;

    const newOptions = [...options, { label: newOption, checked: false }];
    setOptions(newOptions);
    setNewOption("");
  };

  const handleRemoveOption = (optionIndex) => {
    const newOptions = options.filter((option, index) => index !== optionIndex);
    setOptions(newOptions);

    const newQuestions = [...questions];
    newQuestions[index].options = newOptions;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optionIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].checked = !newOptions[optionIndex].checked;
    setOptions(newOptions);

    const newQuestions = [...questions];
    newQuestions[index].options = newOptions;
    setQuestions(newQuestions);
  };

  const handleOptionLabelChange = (event, optionIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].label = event.target.value;
    setOptions(newOptions);

    const newQuestions = [...questions];
    newQuestions[index].options = newOptions;
    setQuestions(newQuestions);
  };

  return (
    <>
      {questionType === "checkbox" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
                <Checkbox
                  checked={option.checked}
                  onChange={() => handleOptionChange(optionIndex)}
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
      )}
    </>
  );
};

export default CheckboxChoice;
