import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import QuizCard from "./Card";
import { db } from "../../../../../components/QuizForm/QuizForm";




const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  const handleDeleteQuiz = async (quizId) => {
    await deleteDoc(doc(db, "quizzes", quizId));
    setQuizzes((quizzes) => quizzes.filter((quiz) => quiz.id !== quizId));
  };

  const handleEditQuiz = (quizId) => {
   
    window.location.href=`/newQuiz/${quizId}`
  }



  useEffect(() => {
    const getQuizzes = async () => {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const data = [];
        querySnapshot.forEach((doc) => {
          const quizData = doc.data();
          const quiz = {
            id: doc.id,
            name: quizData.name,
            description: quizData.description,
            createdAt: quizData.createdAt,
            quizImage: quizData.quizImage 
          };
          data.push(quiz);
        });
        setQuizzes(data);
        
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
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quizImage={quiz.quizImage}
          quizName={quiz.name}
          quizDescription={quiz.description}
          createdAt={quiz.createdAt}
          onDelete={handleDeleteQuiz}
          onEdit={handleEditQuiz}
          quizId={quiz.id}
        />
      ))}
    </Box>
  );
};

export default QuizList;
