import React, { useState } from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const TrueFalseAnswer = ({
  questionType,
 
  value,onChange
}) => {


 

  return (
    <>
      {questionType === "true/false" && (
        <FormControl
          component="fieldset"
          style={{ marginBottom: "16px", width: "100%",minWidth:"450px" }}
        >
          <FormLabel component="legend">Answer</FormLabel>
          <RadioGroup
            aria-label="answer"
            name="answer"
            value={value}
            onChange={onChange}
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
  );
};

export default TrueFalseAnswer;
