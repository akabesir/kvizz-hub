import React, { useState } from "react";
import { TextField } from "@mui/material";
const Text = ({question, index, questions, setQuestions,questionType}) => {

  return (
    <>
      {questionType === "text" && (
        <TextField
          label="Answer"
          variant="outlined"
          margin="dense"
          required
          value={question.answer}
          onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[index].answer = e.target.value;
            setQuestions(newQuestions);
          }}
          style={{
            marginBottom: "16px",
            width: "100%",
            maxWidth: "750px",
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

export default Text;
