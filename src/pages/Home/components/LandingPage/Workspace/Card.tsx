import React from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const QuizCard = ({
  quizName,
  quizDescription,
  quizImage,
  createdAt,
  onDelete,
  onEdit,
  quizId,
}) => {
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
              sx={{ objectFit: "cover", maxHeight:200 }}
              
            />
            <CardContent sx={{ padding: "16px 24px" }}>
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
              justifyContent: "space-between",
              padding: "16px 24px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleEditClick}
            >
              EDIT
            </Button>
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
