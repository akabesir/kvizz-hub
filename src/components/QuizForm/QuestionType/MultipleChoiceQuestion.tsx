import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
const MultipleChoiceQuestion = ({
    options,
    newOption,
    questionType,
    handleOptionChange,
    handleNewOptionChange,
    handleAddOption,
    handleOptionLabelChange,
    handleRemoveOption,
  }) => {


    return (
        <>
          {questionType === "multiple choice" && (
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
          )}
        </>
      );
      
};

export default MultipleChoiceQuestion;
