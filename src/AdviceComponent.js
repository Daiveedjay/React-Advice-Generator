// Importing the necessary tools and methods
import React, { useState, useEffect } from "react";
import desktopDivider from "./assests/desktopDivider.svg";
import dice from "./assests/dice.svg";

// Style Imports
import "./AdviceComponent.css";

export default function AdviceComponent() {
  // Setting the initial state and placeholder state
  const [adviceData, setAdviceData] = useState({
    advice: "In everythiing you do, stay humble",
    id: "000",
  });
  // Laading animation logic
  const [isLoading, setIsLoading] = useState(false);

  // Retrieving our data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("adviceData");
    if (storedData) {
      const { advice, id } = JSON.parse(storedData);
      setAdviceData({ advice: advice, id: id });
    }
  }, []);

  // Async function to fetch our data
  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setIsLoading(false);
      setAdviceData({ advice: data.slip.advice, id: data.slip.id });

      // STORING FETCHED DATA IN LOCA STORAGE
      localStorage.setItem(
        "adviceData",
        JSON.stringify({ advice: data.slip.advice, id: data.slip.id })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={textStyles}>
      <div className="advice__container">
        <div className="advice--index"> Advice #{adviceData.id}</div>
        <div className="advice--text">{adviceData.advice}</div>
        <div className="advice__border">
          <img src={desktopDivider} alt="" />
        </div>
        <div className="dice">
          <img onClick={fetchQuote} src={dice} alt="" />
        </div>
        {/* Stop rendering spinner after data is sdisplayed */}
        {isLoading && <span className="loader"></span>}
      </div>
    </div>
  );
}

//Font Family
const textStyles = {
  fontFamily: "Manrope",
};
