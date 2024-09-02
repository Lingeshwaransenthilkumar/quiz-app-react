import questionsData from "./question.json";
import { useEffect, useState } from "react";
import './App.css'


// don't use {} for arrow functions in react because its not working 
function App() {
  const [currentQuestion,setCurrentQuestion] = useState(0);
  const [score,setScore] = useState(0);
  const [showScore,setShowScore]=useState(false);
  const [timer,setTimer]=useState(10);


  useEffect(()=>{
    let interval;
    // if timer present and score should not shown
    if(timer && !showScore){
      // timer will decraese from 10 to -1
      interval = setInterval(()=>{
        setTimer((prevTimer)=>prevTimer-1);
      },1000);
    }else{
      clearInterval(interval)
      setShowScore(true);
    }
    // should return clearInterval because js will use it in memory location
    return ()=> clearInterval(interval);
  },[timer,showScore])

  // check correct answer
  function handleCorrectAnswer(seletedOption){
    if(seletedOption===questionsData[currentQuestion].correctOption){
      setScore((prevScore)=>prevScore+1)
    }
    // checking if data or question is present 
    if(currentQuestion < questionsData.length - 1){
      setCurrentQuestion((prevQuestion)=>
        prevQuestion+1);
      setTimer(10);
    }
    else{
      setShowScore(true)
    }
  }

  function restartQuiz(){
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }


  return (
    <>
    <div className="quiz-app">
      {/* score card will be the last section */}
      {/* score card */}
      {showScore ? (
        <div className="score-section">
        <h2>Your Score : {score}/{questionsData.length}</h2>
        <button onClick={restartQuiz}>Restart</button>
      </div>
      ) :
      (
      <div className="question-section">
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questionsData[currentQuestion].question}</p>
      <div className="options">
        {questionsData[currentQuestion].options.map((option,index)=>(
          <button key={index} onClick={()=>{handleCorrectAnswer(option)}}>{option}</button>
        ))}
      </div>
      <div className="timer">Time Left : <span>{timer}s</span></div>
     </div>
      )}
    </div>
    </>
  );
}
export default App;
