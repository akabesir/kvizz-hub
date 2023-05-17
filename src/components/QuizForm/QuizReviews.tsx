import React from "react";
import { Avatar, Typography, Rating, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const UserReview = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      rating: 4.5,
      comment:
        "Great product! I highly recommend it. Great product! I highly recommend it. Great product! I highly recommend it. Great product! I highly recommend it. Great product! I highly recommend it.Great product! I highly recommend it. Great product! I highly recommend it.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      rating: 3.8,
      comment: "Decent product. Could be better.",
      avatar: "https://example.com/avatar2.jpg",
    },
    // Dodajte ostale recenzije ovde
  ];

  const ReviewContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "55vh",
    background: "#f0f0f0",
    padding: "1rem",
  });

  const MainCardContainer = styled(Box)({
    width: "100%",
    maxWidth: 750,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    margin: "0 auto",
  });

  const ReviewCardContainer = styled(Box)({
    marginBottom: "1.5rem",
    padding: "1.5rem",
    background: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  });

  const UserAvatar = styled(Avatar)({
    width: 60,
    height: 60,
    marginBottom: "0.5rem",
  });

  const UserEmail = styled(Typography)({
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "0.2rem",
  });

  const RatingContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginBottom: "0.2rem",
  });

  const RatingText = styled(Typography)({
    marginLeft: "0.5rem",
    fontSize: "0.9rem",
  });

  const Comment = styled(Typography)({
    fontSize: "1rem",
  });

  return (
    <ReviewContainer>
      <MainCardContainer>
        {reviews.map((review) => (
          <ReviewCardContainer key={review.id}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <UserAvatar
                src={review.avatar}
                alt={review.name}
              />
              <Box sx={{ marginLeft: "1rem" }}>
                <UserEmail variant="h6">{review.email}</UserEmail>
                <RatingContainer>
                  <Rating value={review.rating} precision={0.5} readOnly />
                  <RatingText variant="body2">{review.rating}</RatingText>
                </RatingContainer>
              </Box>
            </Box>
            <Comment variant="body1">{review.comment}</Comment>
          </ReviewCardContainer>
        ))}
      </MainCardContainer>
    </ReviewContainer>
  );
};

export default UserReview
