import React, { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  IconButton,
  InputLabel,
} from "@mui/material";

const Dropdown = ({ questionType,  options, setOptions,questions, newOption,setNewOption, selectedOptionId,handleOptionChange, handleNewOptionChange,handleAddOption,handleOptionLabelChange,handleRemoveOption}) => {
 
  

  return (
    <>
      {questions.map((question, index) => (
        <>
          {questionType === "dropdown" && (
            <>
              <Typography variant="subtitle1">Select an Option</Typography>
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginBottom: "16px", width: "100%" }}
              >
                <InputLabel>Options</InputLabel>
                <Select
                  value={selectedOptionId}
                  onChange={(e) => handleOptionChange(e.target.value)}
                  label="Options"
                >
                  {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle1">Add an Option</Typography>

              <TextField
                label="Option Label"
                variant="outlined"
                required
                value={newOption}
                onChange={handleNewOptionChange}
                type="text"
              />
              <IconButton onClick={handleAddOption}>
                <AddCircleOutlineIcon />
              </IconButton>

              <Typography variant="subtitle1" sx={{ margin: "10px" }}>
                Current Options
              </Typography>
              {options.map((option, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    label="Option Label"
                    variant="outlined"
                    required
                    value={option.label}
                    onChange={(e) =>
                      handleOptionLabelChange(e.target.value, index)
                    }
                    type="text"
                    style={{ marginRight: "16px" }}
                  />
                  <IconButton
                    aria-label="remove option"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </div>
              ))}
            </>
          )}
        </>
      ))}
    </>
  );
};

export default Dropdown;
