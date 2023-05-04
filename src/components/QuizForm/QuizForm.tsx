import React, { useState } from "react";

import PrimarySearchAppBar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,

} from "@mui/material";
import { styled } from "@mui/material/styles";
import Text from "./QuestionType/Text";
import CheckboxChoice from "./QuestionType/CheckboxChoice";
import MultipleChoiceQuestion from "./QuestionType/MultipleChoiceQuestion";
import TrueFalseChoice from "./QuestionType/TrueFalseChoice";
import Dropdown from "./QuestionType/Dropdown";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  maxWidth: 750,
  padding: "20px",
});

const SectionTitle = styled(Typography)({
  marginTop: 10,
  marginBottom: 10,
  fontWeight: "bold",
});

const SelectLabel = styled(Typography)({
  marginBottom: 8,
  fontWeight: "bold",
});

const QuizForm = () => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  
  const [questionType, setQuestionType] = useState("text");
  const [questions, setQuestions] = useState([]);
  const [buttonType, setButtonType] = useState("text");

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuizDescriptionChange = (event) => {
    setQuizDescription(event.target.value);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleButtonTypeChange = (event) => {
    setButtonType(event.target.value);
  };

  const handleAddQuestion = () => {
    if (buttonType === "text" || buttonType === "checkbox") {
      setQuestions([...questions, { question: "", answer: "" }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Quiz Name:", quizName);
    console.log("Quiz Description:", quizDescription);
    console.log("Questions:", questions);
  };

  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState(null);


  const handleOptionChange = (optionIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].checked = !newOptions[optionIndex].checked;
    setOptions(newOptions);
  };

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([
        ...options,
        {
          label: newOption.trim(),
          checked: false,
        },
      ]);
      setNewOption("");
    }
  };

  const handleOptionLabelChange = (event, optionIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].label = event.target.value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (optionIndex) => {
    const newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    setOptions(newOptions);
  };

  const createQuizButtonDisabled = questions.length === 0;

  return (
    <Box sx={{ backgroundColor: "rgb(238, 242, 246)", minHeight: "100vh" }}>
      <PrimarySearchAppBar />
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Card sx={{ minWidth: "750px" }}>
          <FormContainer onSubmit={handleSubmit}>
            <SectionTitle variant="h4">Create New Quiz</SectionTitle>
            <TextField
              label="Quiz Name"
              variant="outlined"
              required
              value={quizName}
              onChange={handleQuizNameChange}
              defaultValue={questions.length > 0 ? questions[0].question : ""}
              style={{ marginBottom: "16px", width: "65%", maxWidth: "750px" }}
            />
            <TextField
              label="Quiz Description"
              variant="outlined"
              margin="dense"
              required
              multiline
              rows={3}
              maxRows={10}
              value={quizDescription}
              onChange={handleQuizDescriptionChange}
              defaultValue={questions.length > 0 ? questions[0].answer : ""}
              style={{ width: "65%", maxWidth: "750px" }}
            />

            {questions.map((question, index) => (
              <div key={index}>
                <SectionTitle variant="h5">Add a Question</SectionTitle>

                <SelectLabel variant="subtitle1">
                  Select Question Type
                </SelectLabel>
                <Select
                  value={questionType}
                  onChange={handleQuestionTypeChange}
                  fullWidth
                  style={{
                    marginBottom: "16px",

                    width: "450px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="multiple choice">Radio Buttons</MenuItem>
                  <MenuItem value="checkbox">Checkbox</MenuItem>
                  <MenuItem value="true/false">True/False</MenuItem>
                  <MenuItem value="dropdown">Dropdown</MenuItem>
                </Select>
                <TextField
                  label="Question"
                  variant="outlined"
                  margin="dense"
                  required
                  value={question.question}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].question = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  style={{
                    marginBottom: "16px",
                    width: "100%",
                    maxWidth: "750px",
                  }}
                />
                {questionType === "text" && (
                  
                    <Text questions={questions} setQuestions={setQuestions} questionType={questionType}/>
                  
                )}

                {questionType === "checkbox" && (
                  
                    <CheckboxChoice questionType={questionType} options={options}
                   newOption={newOption}
              
                    handleAddOption={handleAddOption} handleNewOptionChange={handleNewOptionChange} handleOptionChange={handleOptionChange}
                    handleOptionLabelChange={handleOptionLabelChange} handleRemoveOption={handleRemoveOption} />
                  
                )}

                {questionType === "multiple choice" && (
                  
                    <MultipleChoiceQuestion questionType={questionType} options={options}
                    newOption={newOption}
               
                     handleAddOption={handleAddOption} handleNewOptionChange={handleNewOptionChange} handleOptionChange={handleOptionChange}
                     handleOptionLabelChange={handleOptionLabelChange} handleRemoveOption={handleRemoveOption} />
                  
                )}

                {questionType === "true/false" && (
                  
                    <TrueFalseChoice questionType={questionType} questions={questions} setQuestions={setQuestions} />
                  
                )}

                {questionType === "dropdown" && (
                  
                    <Dropdown questionType={questionType} options={options}
                    setOptions={setOptions} questions={questions} newOption={newOption}
                    setNewOption={setNewOption} selectedOptionId={selectedOptionId}
                    handleAddOption={handleAddOption} handleNewOptionChange={handleNewOptionChange} handleOptionChange={handleOptionChange}
                    handleOptionLabelChange={handleOptionLabelChange} handleRemoveOption={handleRemoveOption}
                    ></Dropdown>
                  
                )}

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      const newQuestions = [...questions];
                      newQuestions.splice(index, 1);
                      setQuestions(newQuestions);
                    }}
                    style={{
                      margin: "0 auto",
                      marginBottom: "16px",
                      marginTop: "16px",
                    }}
                  >
                    Remove Question
                  </Button>
                </Box>
                <hr style={{ width: "100%", marginBottom: "16px" }} />
              </div>
            ))}
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                type="button"
                style={{ marginBottom: "10px", marginTop: "10px" }}
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
              {questions.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginBottom: "16px" }}
                >
                  Create Quiz
                </Button>
              )}
            </Box>
          </FormContainer>
        </Card>
      </Box>
    </Box>
  );
};

export default QuizForm;
