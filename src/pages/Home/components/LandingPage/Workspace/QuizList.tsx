import React, { useState, useEffect } from "react";
import { Box, Typography, Dialog, TextField } from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import { db } from "../../../../../components/QuizForm/QuizForm";
import QuizCard from "./Card";
import { useParams } from "react-router-dom";
import { auth } from "../../../../../firebase/firebase";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteQuiz = async (quizId) => {
    await deleteDoc(doc(db, "quizzes", quizId));
    setQuizzes((quizzes) => quizzes.filter((quiz) => quiz.id !== quizId));
  };

  const handleEditQuiz = (quizId) => {
    window.location.href = `/edit-quiz/${quizId}`;
  };

  useEffect(() => {
    const getQuizzes = async () => {
      const currentUser = auth.currentUser;
      const uid = currentUser.uid;
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const quizData = doc.data();
        const quiz = {
          id: doc.id,
          name: quizData.name,
          description: quizData.description,
          createdAt: quizData.createdAt,
          quizImage: quizData.quizImage,
          author: quizData.author_id,
        };
        if (quiz.author === uid) {
          data.push(quiz);
        }
      });
      setQuizzes(data);
      setIsLoading(false);
    };

    console.log("Fetching quizzes...");
    getQuizzes();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        px: 2,
        py: 4,
        flexWrap: "wrap",
        minHeight: "100vh",
        marginLeft: "10%",
        marginRight: "10%",
        width: "80%",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "block",

            margin: "15px auto 0",
          }}
        >
          <Typography variant="h5">Loading Quizzes...</Typography>
        </Box>
      ) : (
        quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quizImage={quiz.quizImage}
            quizName={quiz.name}
            quizDescription={quiz.description}
            createdAt={quiz.createdAt}
            onDelete={handleDeleteQuiz}
            onEdit={() => handleEditQuiz(quiz.id)}
            quizId={quiz.id}
          />
        ))
      )}
    </Box>
  );
};

export default QuizList;
