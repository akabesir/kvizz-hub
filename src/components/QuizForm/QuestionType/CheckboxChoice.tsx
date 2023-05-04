import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  TextField,
  FormControl,
  FormLabel,
  IconButton,
  Checkbox,
} from "@mui/material";

const CheckboxChoice = ({
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
