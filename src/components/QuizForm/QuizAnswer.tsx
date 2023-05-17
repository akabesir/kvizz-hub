import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ShareIcon from "@mui/icons-material/Share";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Card from "@mui/material/Card";
import html2canvas from "html2canvas/dist/html2canvas.min.js";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  TextField,
  Button,
  Dialog,
  Typography,
  Modal,
  Rating,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Text from "./QuestionType/Text";

import ResponsiveAppBar from "../Navbar/NavbarUser";
import { useParams } from "react-router-dom";

import TextAnswer from "./QuestionTypesAnswers/TextAnswer";
import MultipleChoiceAnswer from "./QuestionTypesAnswers/MultipleChoiceAnswer";
import CheckboxChoiceAnswer from "./QuestionTypesAnswers/CheckboxChoiceAnswer";

import TrueFalseAnswer from "./QuestionTypesAnswers/TrueFalseAnswer";
import DropdownAnswer from "./QuestionTypesAnswers/DropdownAnswer";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  maxWidth: 750,
  padding: "20px",
});
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: "center",
  fontSize: "2rem",

  color: "#333",
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  margin: `${theme.spacing(2)}px auto`,

  fontSize: "1rem",

  maxWidth: "450px",
  color: "#333",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SelectLabel = styled(Typography)({
  marginBottom: 8,
  fontWeight: "bold",
});

export const db = getFirestore();

const QuizAnswer = () => {
  const { quizId } = useParams();
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const totalQuestions = questions.length;


  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const percentage = (correctAnswers / totalQuestions) * 100;
  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleShare = () => {
    setOpen(true);
    setLink(`localhost:3000/quiz/${quizId}`);
  };


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    // Dohvati podatke o kvizu iz Firebase baze podataka na temelju njegovog ID-a
    const getQuizData = async () => {
      const quizRef = doc(db, "quizzes", quizId);
      const quizData = await getDoc(quizRef);
   
      if (quizData.exists()) {
        // Postavi naziv i opis kviza
        setQuizName(quizData.data().name);
        setQuizDescription(quizData.data().description);

        const questionsRef = collection(quizRef, "questions");

        const questionsSnapshot = await getDocs(questionsRef);

        const newQuestions = questionsSnapshot.docs.map((doc) => {
          const questionData = doc.data();
          return {
            id: doc.id,
            question: questionData.question,
            answer: questionData.answer,
            questionType: questionData.questionType,
            options: questionData.options || [],
          };
        });

        setQuestions(newQuestions);

        const newAnswers = new Array(newQuestions.length).fill("");
        setAnswers(newAnswers);
      }
    };

    getQuizData();
  }, [quizId]);

  const handleAnswer = (e) => {
    e.preventDefault();
    let correctAnswer = 0;
    questions.forEach((question, index) => {
      const answer = answers[index];

      if (question.questionType === "text") {
        if (answer === question.answer) {
          correctAnswer++;
        }
      }

      if (question.questionType === "true/false") {
        if (answer === question.answer) {
          correctAnswer++;
        }
      }

      if (question.questionType === "multiple choice") {
        const selectedOptions = question.options.filter(
          (option) => option.checked
        );
        const selectedLabels = selectedOptions.map((option) => option.label);
        const isCorrect = selectedLabels.every((label) =>
          question.answer.includes(label)
        );
  
        if (
          selectedOptions.length === question.answer.length &&
          isCorrect
        ) {
          correctAnswer++;
        }
      }
    });
    setCorrectAnswers(correctAnswer)

    setOpenModal(true);
  };

  return (
    <div id="quiz-card-container">
      <Box sx={{ backgroundColor: "rgb(238, 242, 246)", minHeight: "100vh" }}>
        <ResponsiveAppBar />
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Card sx={{ minWidth: "750px" }}>
            <FormContainer onSubmit={handleAnswer}>
              <Typography>Quiz Name</Typography>

              <SectionTitle variant="h2">{quizName}</SectionTitle>
              <hr style={{ width: "64%", marginBottom: "10px" }} />
              <Typography>Quiz Description</Typography>

              <SectionDescription>{quizDescription}</SectionDescription>
              <hr style={{ width: "64%", marginBottom: "10px" }} />

              {questions.map((question, index) => (
                <div key={index}>
                  <SelectLabel variant="subtitle1">
                    {`Question ${index + 1}`}
                  </SelectLabel>

                  <SelectLabel>{question.question}</SelectLabel>
                  {question.questionType === "text" && (
                    <TextAnswer
                      value={answers[index]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      questionType={question.questionType}
                    />
                  )}

                  {question.questionType === "multiple choice" && (
                    <MultipleChoiceAnswer
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  )}

                  {question.questionType === "checkbox" && (
                    <CheckboxChoiceAnswer
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                      questionType={question.questionType}
                    />
                  )}

                  {question.questionType === "true/false" && (
                    <TrueFalseAnswer
                      value={answers[index]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      questionType={question.questionType}
                    />
                  )}

                  {question.questionType === "dropdown" && (
                    <DropdownAnswer
                      
                      question={question}
                      index={index}
                      questions={questions}
                      setQuestions={setQuestions}
                      questionType={question.questionType}
                   
                    />
                  )}

                  <hr style={{ width: "100%", marginBottom: "16px" }} />
                </div>
              ))}

              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "16px", backgroundColor: "#112240" }}
                onClick={handleAnswer}
              >
                Submit Your Answer
              </Button>
              <Modal open={openModal}>
                <Box
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <Card sx={{ minWidth: "750px", maxWidth: "900px" }}>
                    <FormContainer>
                      <SectionTitle
                        variant="h2"
                        sx={{ textAlign: "center", mb: 2 }}
                      >
                        {quizName}
                      </SectionTitle>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={1}
                      >
                        <Box display="block" textAlign="center">
                          <Typography variant="h6">
                            You scored {correctAnswers} of {totalQuestions} (
                            {percentage.toFixed(2)}%)
                          </Typography>
                          <Typography variant="h6">Rate this quiz:</Typography>
                          <Rating
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ width: "65%" }}>
                        <TextField
                          id="comment"
                          label="Add a comment"
                          multiline
                          rows={4}
                          value={comment}
                          onChange={handleCommentChange}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 3 }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          variant="contained"
                          sx={{
                         
                            borderRadius: "30px",
                            backgroundColor: "#fff",
                            color: "#112240",
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "#f1f1f1",
                              boxShadow: "none",
                            },
                          }}
                          onClick={() => (window.location.href = "/workspace")}
                        >
                          <ReplyIcon
                            sx={{ fontSize: "1.8rem", color: "#112240" }}
                          />
                          <Typography variant="button" sx={{ ml: 1, fontSize:"1rem" }}>
                            Workspace
                          </Typography>
                          
                        </Button>

                        <IconButton
                            sx={{
                              color: "#00bcd4",
                              "&:hover": { color: "green" },
                              mr:2, 
                            }}
                            onClick={handleShare}
                          >
                            <ShareIcon sx={{ fontSize: "1.5rem",  }} />
                            <Typography variant="button" sx={{ ml: 1, fontSize:"1.2rem"  }}>
                            Share
                          </Typography>
                          </IconButton>

                          <Dialog open={open} onClose={() => setOpen(false)}>
                            <Box
                              sx={{
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <TextField value={link} sx={{ mr: 2 }} />
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FileCopyIcon />}
                                onClick={() => {
                                  navigator.clipboard.writeText(link);
                                  toast.success("Link copied to clipboard");
                                }}
                              >
                                Copy
                              </Button>
                            </Box>
                          </Dialog>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            borderRadius: "30px",
                            backgroundColor: "#112240",
                            color: "#fff",
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "#0c1a33",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </FormContainer>
                  </Card>
                </Box>
              </Modal>
            </FormContainer>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default QuizAnswer;
