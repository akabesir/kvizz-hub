import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CheckboxChoiceAnswer = ({
    questionType,
    question,
    index,
    questions,
    setQuestions
  }) => {
    const [checkboxes, setCheckboxes] = useState(
      question.options.map(() => false)
    );
  
    const handleChange = (event, checkboxIndex) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[checkboxIndex] = event.target.checked;
      setCheckboxes(newCheckboxes);
    };
  
    return (
      <>
        {questionType === "checkbox" && (
          <>
            <FormControl
              component="fieldset"
              style={{
                marginBottom: "16px",
                width: "100%",
                minWidth: "450px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormLabel component="legend">Options:</FormLabel>
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={checkboxes[optionIndex]}
                    onChange={(event) => handleChange(event, optionIndex)}
               
                  />
                  <Typography style={{ margin: "5px" }}>
                    {option.label}
                  </Typography>
                </div>
              ))}
            </FormControl>
          </>
        )}
      </>
    );
  };

  export default CheckboxChoiceAnswer;