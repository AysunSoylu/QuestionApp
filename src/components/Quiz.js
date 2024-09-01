
import React, { useState, useEffect } from "react";
import Question from "./Question";

// 10 question data
const questions = [
  {
    question: "Çin Seddi'ni oluşturan taşlar birbirine ne ile tutturulmuştur?",
    options: ["Bambu Harcı", "Anne Duası", "Pirinç Unu", "Noodle"],
    answer: "Pirinç Unu",
    media: "cin-seddi.jpg" 
  },
  {
    question: "İlk Pamuk şekeri bulan kişinin mesleği nedir?",
    options: ["Gıda Mühendisi", "Diş Doktoru", "Ev Hanımı", "Güzellik Uzmanı"],
    answer: "Diş Doktoru",
    media: "pamuk.jpg"
  },
  {
    question: "Tarkan'ın 'Hüp' klibini izledikten sonra gaza gelip 'Tarkan keşke beni hüpletseydi' diyen kişi kimdir?",
    options: ["Gülben Ergen", "Hülya Avşar", "Harika Avcı", "Sevtap Parman"],
    answer: "Gülben Ergen",
    media: "tarkan.jpg"
  },
  {
    question: "Pteronofobi nedir?",
    options: ["Yeşil ışık yanar yanmaz korna çalacak korkusu", "Fakir kalma korkusu", "Taksi bulamama korkusu", "Kuş tüyüyle gıdıklanma korkusu"],
    answer: "Kuş tüyüyle gıdıklanma korkusu",
    media: "fobi.jpg"
  },
  {
    question: "Japon balığı Tish kaç yıl hayatta kalmayı başarmıştır?",
    options: ["43", "78", "23", "99"],
    answer: "43",
    media: "balik.jpg"
  },
  {
    question: "90'lara damgasını vuran 'Bandira Bandira' şarkısının söz yazarı kimdir?",
    options: ["Sezen Aksu", "Sibel Can", "Mustafa Sandal", "Bülent Ersoy"],
    answer: "Mustafa Sandal",
    media: "bandira.jpg"
  },
  {
    question: "Hangi şarkıcımız sevgilisinden ayrıldıktan sonra karşı apartmanını kendi posteriyle kaplatmıştır?",
    options: ["Hande Yener", "Hadise", "Gülşen", "Simge"],
    answer: "Hadise",
    media: "billboard.jpg"
  },
  {
    question: "Antik Roma'da kadınlar parfüm olarak ne kullanıyordu?",
    options: ["Gül Suyu", "Bal", "Gladyatör Teri", "Kan"],
    answer: "Gladyatör Teri",
    media: "parfum.jpg"
  },
  {
    question: "T-Rex'in yaşayan en yakın akrabası aşağıdakilerden hangisidir?",
    options: ["İnekler", "Tavuklar", "Timsahlar", "Köpekler"],
    answer: "Tavuklar",
    media: "trex.jpg"
  },
  {
    question: "Her şeyin olduğu gibi mutluluğun da bir fobisi varmış. Bu fobiye ne ad verilir?",
    options: ["Çerofobi", "Euphobia", "Felicifobia", "Mutluluk Korkusu"],
    answer: "Çerofobi",
    media: "mutluluk.jpg"
  }
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [answered, setAnswered] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
  
    useEffect(() => {
      if (!quizFinished && !answered) {
        const timer = setTimeout(() => setShowOptions(true), 4000); // Show options after 4 seconds
        const nextQuestionTimer = setTimeout(() => handleNextQuestion(), 30000); // Go to next question after 30 seconds
  
        return () => {
          clearTimeout(timer);
          clearTimeout(nextQuestionTimer);
        };
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestion, quizFinished, answered]);
  
    const handleNextQuestion = () => {
      // Go to next question
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowOptions(false);
        setAnswered(false); // 'answered' is reset when moving to a new question
      } else {
        setQuizFinished(true); // When the test is finished
      }
    };
  
    const handleAnswer = (option) => {
      if (answered) return; // If the answer is given, do not take any further action.
  
      const currentQuestionData = questions[currentQuestion];
      
      // Before comparing the answers, we remove the spaces and convert them to lowercase.
      const isCorrect = option.trim().toLowerCase() === currentQuestionData.answer.trim().toLowerCase();
      
      setAnswers(prevAnswers => [
        ...prevAnswers, 
        { correct: isCorrect, question: currentQuestionData, selectedAnswer: option }
      ]);
  
      setAnswered(true); // Mark as answered
  
      setTimeout(() => handleNextQuestion(), 1000); // 1 saniye sonra sonraki soruya geç
    };
  
    const correctCount = answers.filter(answer => answer.correct).length;
    const wrongCount = answers.length - correctCount;
  
    if (quizFinished) {
      return (
        <div className="quiz-results">
          <h2>Test Sonuçları</h2>
          <p>Doğru Sayısı: {correctCount}</p>
          <p>Yanlış Sayısı: {wrongCount}</p>
          <h3>Yanıt Detayları:</h3>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <strong>{answer.question.question}</strong><br />
                Doğru Yanıt: {answer.question.answer}<br />
                Verdiğiniz Yanıt: {answer.selectedAnswer} ({answer.correct ? "Doğru" : "Yanlış"})
              </li>
            ))}
          </ul>
        </div>
      );
    }
  
    return (
      <div className="quiz">
        <Question
          data={questions[currentQuestion]}
          showOptions={showOptions}
          handleAnswer={handleAnswer}
        />
      </div>
    );
  };
  
  export default Quiz;
