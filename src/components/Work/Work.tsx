import React from "react";
import PickMeals from "../../assets/pick-meals-image.png";
import ChooseMeals from "../../assets/choose-image.png";
import DeliveryMeals from "../../assets/delivery-image.png";
import One from '../../assets/one.png'
import Two from '../../assets/two.png'
import Three from '../../assets/three.png'
import "./Work.css";
const Work = () => {
  const workInfoData = [
    {
      image: One,
      title: "Create Quizzes",
      text: "Use Kvizzhub's intuitive quiz builder to create custom quizzes on any topic you like.",
    },
    {
      image: Two,
      title: "Join the Community",
      text: " Share your quizzes with others or browse and take quizzes created by others on Kvizzhub's platform.",
    },
    {
      image: Three,
      title: "Learn and Have Fun",
      text: "Test your knowledge, compete with others, and discover new things with Kvizzhub's wide range of quizzes.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Kvizzhub is a free online quiz platform that allows you to create and
          share quizzes with your friends, family, or colleagues. With Kvizzhub,
          you can create custom quizzes on any topic you like, and share them
          with others via email, social media, or a unique link.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
