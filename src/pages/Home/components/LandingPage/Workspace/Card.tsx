import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Divider,
  TextField,
  Dialog,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import EditIcon from "@mui/icons-material/Edit";
import { Link, useParams } from "react-router-dom";
import EditQuiz from "../../../../../components/QuizForm/EditQuiz";
import ShareIcon from "@mui/icons-material/Share";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizCard = ({
  quizName,
  quizDescription,
  quizImage,
  createdAt,
  onDelete,
  onEdit,
  quizId,
}) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");

  const handleShare = () => {
    setOpen(true);
    setLink(`localhost:3000/quiz/${quizId}`);
 
  };

  const handleDelete = () => {
    onDelete(quizId);
  };

  const handleEditClick = () => {
    onEdit(quizId);
  };

 

  return (
    <>
      <Box
        sx={{
          transform: { xs: "none", sm: "translateX(25%)" },
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 350,
            flex: "1 1 auto",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={quizImage}
              alt={quizDescription}
              sx={{ objectFit: "cover", maxHeight: 200 }}
              onClick={() => onEdit(quizId)}
            />
            <CardContent
              sx={{ padding: "16px 24px" }}
              onClick={() => onEdit(quizId)}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}
              >
                {quizName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarMonthIcon sx={{ fontSize: "1.2rem", mr: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "1rem", fontStyle: "italic" }}
                >
                  Created at: {createdAt}
                </Typography>
              </Box>
              <Divider sx={{ margin: "12px 0" }} />
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "16px 24px",
            }}
          >
            <IconButton
              sx={{ color: "#1976d2", "&:hover": { color: "navy" } }}
              onClick={() => onEdit(quizId)}
            >
              <EditIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>

            <IconButton
              sx={{ color: "#00bcd4", "&:hover": { color: "green" } }}
              onClick={handleShare}
            >
              <ShareIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>

            <Dialog open={open} onClose={() => setOpen(false)}>
              <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <TextField value={link} sx={{ mr: 2 }} />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FileCopyIcon />}
                  onClick={() => {
                    navigator.clipboard.writeText(link)
                    toast.success("Link copied to clipboard");
                    
                }  }
                >
                  Copy
                </Button>
             
              </Box>
            </Dialog>
            <IconButton
              sx={{ color: "red", "&:hover": { color: "darkred" } }}
              aria-label="delete"
              onClick={() => onDelete(quizId)}
            >
              <DeleteIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default QuizCard;
