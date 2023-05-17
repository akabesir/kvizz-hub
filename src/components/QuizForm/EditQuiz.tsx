import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Card from "@mui/material/Card";
import html2canvas from "html2canvas/dist/html2canvas.min.js";
import { TextField, Button, Select, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Text from "./QuestionType/Text";
import CheckboxChoice from "./QuestionType/CheckboxChoice";
import MultipleChoiceQuestion from "./QuestionType/MultipleChoiceQuestion";
import TrueFalseChoice from "./QuestionType/TrueFalseChoice";
import Dropdown from "./QuestionType/Dropdown";
import ResponsiveAppBar from "../Navbar/NavbarUser";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import QuizReviews from "./QuizReviews";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3rem",
  maxWidth: 750,
  padding: "20px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
});

const EditButton = styled(Button)({
  backgroundColor: "#f50057",
  color: "#fff",
  marginRight: "1rem",
  "&:hover": {
    backgroundColor: "#d5004f",
  },
});

const ReviewButton = styled(Button)({
  backgroundColor: "#2196f3",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1976d2",
  },
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
  "& input": {
    fontWeight: "bold",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    border: "none",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    outline: "none",
  },
}));

const SelectLabel = styled(Typography)({
  marginBottom: 8,
  fontWeight: "bold",
});

const db = getFirestore();

const EditQuiz = () => {
  const { quizId } = useParams();
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const getQuizData = async () => {
      const quizRef = doc(db, "quizzes", quizId);
      const quizData = await getDoc(quizRef);

      if (quizData.exists()) {
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
      }
    };

    getQuizData();
  }, [quizId]);

  const currentUser = auth.currentUser;
  const uid = currentUser.uid;

  let currentDate = new Date();
  let day = currentDate.toLocaleString("default", { weekday: "short" });
  let month = currentDate.toLocaleString("default", { month: "short" });
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  const [editOpen, setEditOpen] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(false);

  const handleEdit = () => {
    setReviewOpen(false);
    setEditOpen(true);
  };

  const handleReview = () => {
    setEditOpen(false);
    setReviewOpen(true);
  };
  let createdAt = `${day} ${month} ${date} ${year} ${hours}:${minutes}:${seconds}`;

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuizDescriptionChange = (event) => {
    setQuizDescription(event.target.value);
  };
  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: uuidv4(), // Generirajte jedinstveni ID koristeći vremensku oznaku
        question: "",
        answer: "",
        questionType: "text",
        options: [],
      },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const canvas = await html2canvas(
        document.querySelector("#quiz-card-container")
      );
      const quizImage = canvas.toDataURL("image/png");

      // Stvorite novi objekt sa svim ažuriranim podacima
      const updatedQuiz = {
        author_id: uid,
        name: quizName,
        description: quizDescription,
        quizImage: quizImage,
        createdAt: createdAt,
      };

      // Stvorite novi objekt newQuestions koji sadrži sve postojeće pitanja u kvizu
      const newQuestions = questions.map((question, index) => {
        return {
          ...question,
          id: index + 1,
        };
      });

      // Stvorite podkolekciju "questions" za ažuriranje u bazi podataka
      const questionsRef = collection(doc(db, "quizzes", quizId), "questions");

      // Spremite svako pitanje u podkolekciju "questions"
      for (const question of newQuestions) {
        const questionRef = doc(questionsRef, question.id.toString());
        await setDoc(questionRef, {
          id: uuidv4(),
          question: question.question,
          answer: question.answer,
          questionType: question.questionType,
          options: question.options,
        });
      }

      // Ažurirajte dokument s novim podacima o kvizu
      const quizRef = doc(db, "quizzes", quizId);
      await updateDoc(quizRef, updatedQuiz);
      alert("Editing Quiz..");
      window.location.href = "/workspace";
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to remove this question?")) {
      const updatedQuestions = questions.filter(
        (question) => question.id !== questionId
      );

      // Update the IDs of the remaining questions
      const updatedQuestionsWithIDs = updatedQuestions.map(
        (question, index) => ({
          ...question,
          id: uuidv4(),
        })
      );

      setQuestions(updatedQuestionsWithIDs);

      // Remove the question from the Firestore database
      const questionRef = doc(
        db,
        "quizzes",
        quizId,
        "questions",
        questionId.toString()
      );
      await deleteDoc(questionRef);

      // Reorder the remaining questions in the database
      const batch = [];
      updatedQuestionsWithIDs.forEach((question, index) => {
        const updatedQuestionRef = doc(
          db,
          "quizzes",
          quizId,
          "questions",
          question.id.toString()
        );
        batch.push(updateDoc(updatedQuestionRef, { id: uuidv4() }));
      });

      await Promise.all(batch);
    }
  };

  const createQuizButtonDisabled = questions.length === 0;
  return (
    <div id="quiz-card-container">
      <Box sx={{ backgroundColor: "rgb(238, 242, 246)", minHeight: "100vh" }}>
        <ResponsiveAppBar />
        <ButtonContainer>
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleReview}>
            Review
          </Button>
        </ButtonContainer>
        <Box display="flex" justifyContent="center" marginTop="20px">
          {editOpen && (
            <Card sx={{ minWidth: "750px" }}>
              <FormContainer onSubmit={handleSubmit}>
                <SectionTitle>
                  <input
                    type="text"
                    style={{ textAlign: "center" }}
                    placeholder="Enter Quiz Name!"
                    value={quizName}
                    onChange={handleQuizNameChange}
                    required
                  />
                </SectionTitle>

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
                        style={{
                          margin: "0 auto",
                          marginBottom: "16px",
                          marginTop: "16px",
                        }}
                        onClick={() => handleRemoveQuestion(question.id)}
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
                    className="edit"
                    type="submit"
                    variant="contained"
                    style={{ marginTop: "16px", backgroundColor: "#112240" }}
                  >
                    Edit Quiz
                  </Button>
                )}
              </FormContainer>
            </Card>
          )}
          {reviewOpen && <QuizReviews />}
        </Box>
      </Box>
    </div>
  );
};

export default EditQuiz;
