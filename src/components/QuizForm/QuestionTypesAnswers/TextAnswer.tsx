import React, { useState } from "react";
import { TextField } from "@mui/material";
const TextAnswer = ({questionType,onChange,value}) => {

  return (
    <>
      {questionType === "text" && (
        <TextField
          label="Answer"
          variant="outlined"
          margin="dense"
      
         value={value}
        onChange={onChange}
          style={{
            marginBottom: "16px",
            width: "100%",
            minWidth: "450px",
          }}
          InputProps={{
            style: {
              width: "100%",
              maxWidth: "750px",
            },
          }}
        />
      )}
    </>
  );
};

export default TextAnswer;
