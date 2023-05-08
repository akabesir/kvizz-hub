import React, { useState } from "react";

import PrimarySearchAppBar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Card from "@mui/material/Card";
import html2canvas from "html2canvas/dist/html2canvas.min.js";

import { TextField, Button, Select, MenuItem, Typography } from "@mui/material";
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

export const db = getFirestore();

const QuizForm = () => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState(null);

  let currentDate = new Date();
  let day = currentDate.toLocaleString('default', { weekday: 'short' });
  let month = currentDate.toLocaleString('default', { month: 'short' });
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  
  

  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  let createdAt = `${day} ${month} ${date} ${year} ${hours}:${minutes}:${seconds}`;

  const [questionType, setQuestionType] = useState([]);

  const [questions, setQuestions] = useState([]);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuizDescriptionChange = (event) => {
    setQuizDescription(event.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        answer: "",
        questionType: "text",
        options: [],
      },
    ]);
    setQuestionType([
      ...questionType,
      { questionId: questions.length + 1, type: "text" },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const canvas = await html2canvas(
        document.querySelector("#quiz-card-container")
      );
      setQuizImage(canvas.toDataURL("image/png"));

      // Kreiranje novog dokumenta u kolekciji "quizzes"
      const quizRef = await addDoc(collection(db, "quizzes"), {
        name: quizName,
        description: quizDescription,
        createdAt: createdAt,
        quizImage: canvas.toDataURL("image/png"),
      });

      // Dodavanje svakog pitanja u podkolekciju "questions" za novi kviz
      for (const question of questions) {
        const questionRef = await addDoc(
          collection(quizRef, "questions"),
          question
        );
      }

      window.location.href = "/workspace";
    } catch (error) {
      console.error(error);
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
    <div id="quiz-card-container">
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
                style={{
                  marginBottom: "16px",
                  width: "65%",
                  maxWidth: "750px",
                }}
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
                    value={question.questionType}
                    onChange={(event) => {
                      const newQuestions = [...questions];
                      newQuestions[index].questionType = event.target.value;
                      setQuestions(newQuestions);
                    }}
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
                  {question.questionType === "text" && (
                    <Text
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                      questionType={question.questionType}
                    />
                  )}

                  {question.questionType === "multiple choice" && (
                    <MultipleChoiceQuestion
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  )}

                  {question.questionType === "checkbox" && (
                    <CheckboxChoice
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                      questionType={question.questionType}
                    />
                  )}

                  {question.questionType === "true/false" && (
                    <TrueFalseChoice
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                      questionType={question.questionType}
                    />
                  )}

                  {question.questionType === "dropdown" && (
                    <Dropdown
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                      questionType={question.questionType}
                    />
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

              <Button variant="contained" onClick={handleAddQuestion}>
                Add Question
              </Button>
              {questions.length > 0 && (
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "16px", backgroundColor: "#112240" }}
                >
                  Create Quiz
                </Button>
              )}
            </FormContainer>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default QuizForm;
