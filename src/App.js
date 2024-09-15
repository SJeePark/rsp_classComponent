import { useEffect, useState } from 'react';
import './App.css';
import Box from './component/Box';

const choice = {
  rock: {
    title: "Rock",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_1280.png"
  },
  scissor: {
    title: "Scissor",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_1280.png"
  },
  paper: {
    title: "Paper",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png"
  }
};

/* 
1. 컴퓨터 값이 먼저 출력
2. user가 컴퓨터 값을 보고 이겨야 됨
3. 5초 제한시간
4. 만약 값 미입력시 컴퓨터 득점
5. 3선승
*/

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState({ user: "", computer: "" });
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    if (gameStarted && timer > 0 && !userSelect && !gameOver) { //게임이 시작하고, 타이머가 진행되고, user가 값을 입력하지 않고, 게임이 종료되지 않았으면 실행
      const countdown = setInterval(() => { //일정한 시간동안 반복
        setTimer((prev) => prev - 1);
      }, 1000);

      if (timer === 1 && userSelect==(null)) {
        noInput();
      }

      return () => clearInterval(countdown);  //clearInterval: setInterval 반복 중지
    }
  }, [gameStarted, timer, userSelect, gameOver]);


  const randomChoice = () => {
    const itemArray = Object.keys(choice);
    const randomItem = Math.floor(Math.random() * itemArray.length);
    const final = itemArray[randomItem];
    return choice[final];
  };


  //값 미입력 시 컴퓨터 득점
  const noInput = () => {
    setResult(judgement(null, computerSelect));
    setComputerScore((prev) => prev + 1);
    checkGameOver();  // 게임 종료 여부 확인
    nextRound();
  };


  const play = (userChoice) => {
    if (gameOver) return; // 게임 종료 시 입력 차단

    setUserSelect(choice[userChoice]);
    const matchResult = judgement(choice[userChoice], computerSelect);
    setResult(matchResult);

    if (matchResult.user === "Win") {
      setUserScore((prev) => prev + 1);
    } else if (matchResult.computer === "Win") {
      setComputerScore((prev) => prev + 1);
    }

    checkGameOver();  // 게임 종료 여부 확인
    nextRound();
  };


  const nextRound = () => {
    setTimeout(() => {
      setUserSelect(null);
      setComputerSelect(randomChoice()); // 컴퓨터가 먼저 선택
      setResult('');
      setTimer(5);
      changeBorder('black')
    }, 1000);
  };


  const startGame = () => {
    setGameStarted(true);
    setUserScore(0);
    setComputerScore(0);
    setGameOver(false);
    setTimer(5);
    setComputerSelect(randomChoice()); // 게임 시작 시 컴퓨터 먼저 선택
  };

  const checkGameOver = () => {
    if (userScore === 2  || computerScore === 2) {
      setGameOver(true);
    }
  };

  const judgement = (user, computer) => {
    if (!user) return { user: "Lose", computer: "Win" };

    if (user.title === computer.title) {
      return { user: "tie", computer: "tie" };
    } else if (user.title === "Rock") {
      return computer.title === "Scissor"
        ? { user: "Win", computer: "Lose" }
        : { user: "Lose", computer: "Win" };
    } else if (user.title === "Scissor") {
      return computer.title === "Paper"
        ? { user: "Win", computer: "Lose" }
        : { user: "Lose", computer: "Win" };
    } else if (user.title === "Paper") {
      return computer.title === "Rock"
        ? { user: "Win", computer: "Lose" }
        : { user: "Lose", computer: "Win" };
    }
  };

  const changeBorder = (result) => result === "Win" ? "green" : result === "Lose" ? "red" : "gray";

  return (
    <div>
      {!gameStarted ? (
        <button onClick={startGame}>Start</button>
      ) : (
        <div>
          <div className="container">
            <Box name="User" item={userSelect} result={result.user} borderColor={changeBorder(result.user)} />
            <Box name="Computer" item={computerSelect} result={result.computer} borderColor={changeBorder(result.computer)} />
          </div>
          <div className="container">
            {!gameOver && (
              <>
                <button onClick={() => play("scissor")}>가위</button>
                <button onClick={() => play("rock")}>바위</button>
                <button onClick={() => play("paper")}>보</button>
              </>
            )}
          </div>
          <div>
            <h2>Timer: {timer}</h2>
          </div>
          <div>
            <h3>Score</h3>
            <p>User: {userScore}</p>
            <p>Computer: {computerScore}</p>
          </div>
          {gameOver && (
            <div>
              <h2>{userScore > computerScore ? "You Win!" : "Computer Win!"}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
