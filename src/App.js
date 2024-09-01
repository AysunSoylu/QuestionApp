

import React, { useState } from "react";
import Quiz from "./components/Quiz";
import "./index.css";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStart = () => {
    setStartQuiz(true);
  };

  return (
    <div className="App">
      {!startQuiz ? (
        <div>
          <h1 className="welcome-circle">Hoşgeldiniz!</h1>
          <p className="welcome-box">Bu test 10 sorudan oluşmaktadır. Her soru için 30 saniyeniz var. Cevap şıkları ilk 4 saniye görünmeyecektir. Testi tamamladığınızda doğru ve yanlış sayılarınızı görebileceksiniz.</p>
          <button id="start" onClick={handleStart}>
            Teste Başla
          </button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;

