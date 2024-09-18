import React, { Component } from 'react';
import './App.css';
import BoxClass from './component/BoxClass';

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

class AppClass extends Component {
    //constructor: 초기 상태 설정할 떄 사용
  constructor(props) {
    super(props);
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: { user: "", computer: "" },
      userScore: 0,
      computerScore: 0,
      timer: 5,
      gameStarted: false,
      gameOver: false,
    };
    this.countdown = null;  //UI에 직접적으로 나타나는 것이 아니므로 this.state에서 선언X / 일반 속성
  }


  /* 
  useEffect 기능은 Function Component에서 사용하는 기능이기 때문에
  Class Component를 사용할 때는 componentDidUpdate와 componentWillUnmount 기능으로 대체
  => componentDidUpdate: 컴포넌트가 업데이트(즉, 상태나 props가 변경된 후)된 직후에 실행
  => componentWillUnmount: 컴포넌트가 DOM에서 제거되기 직전에 호출 
  */

  componentDidUpdate(prevProps, prevState) {
    const { gameStarted, timer, userSelect, gameOver } = this.state;
    //다음의 객체들은 리렌더링할 때 UI 변경을 해야하는 "상태"이기 때문에 this.state로 구조 분해
    //구조 분해를 하지 않으면 모든 함수와 props에 this.state를 붙여야 돼서 가독성이 떨어짐
    //UI에 영향이 있지 않는 함수면 this.state가 아닌 this.(method_name)으로 선언한다. ex) 32, 157행

    if (gameStarted && timer > 0 && !userSelect && !gameOver) {
      if (this.countdown === null) {
        this.countdown = setInterval(() => {
          this.setState((prevState) => ({ timer: prevState.timer - 1 }));
        }, 1000);
      }

      if (timer === 1 && userSelect === null) {
        this.nextRound();
      }
    }
  }

  componentWillUnmount() {
    if (this.countdown) clearInterval(this.countdown);
  }


  randomChoice = () => {
    const itemArray = Object.keys(choice);
    const randomItem = Math.floor(Math.random() * itemArray.length);
    const final = itemArray[randomItem];
    return choice[final];
  };

  //아니 왜 정상작동안됨
//   noInput = () => {
//     const matchResult = this.judgement(null, this.state.computerSelect);
//     console.log('업뎃전', this.state.computerScore);
    
//     this.setState((prevState) => ({
//       result: matchResult,
//       computerScore: matchResult.computer === "Win" ? prevState.computerScore + 1 : prevState.computerScore,
//     }), () => {
//       this.checkGameOver();
//     });
    
//     this.nextRound();
//   };

  
  play = (userChoice) => {
    const { computerSelect, gameOver } = this.state;
    if (gameOver) return;

    const userSelection = choice[userChoice];
    const matchResult = this.judgement(userSelection, computerSelect);

    this.setState((prevState) => ({
      userSelect: userSelection,
      result: matchResult,
      userScore: matchResult.user === "Win" ? prevState.userScore + 1 : prevState.userScore,
      computerScore: matchResult.computer === "Win" ? prevState.computerScore + 1 : prevState.computerScore,
    }), this.checkGameOver);

    this.nextRound();
  };

  nextRound = () => {
    setTimeout(() => {
      this.setState({
        userSelect: null,
        computerSelect: this.randomChoice(),
        result: '',
        timer: 5,
      });
      this.changeBorder('black');
    }, 1000);
  };

  startGame = () => {
    this.setState({
      gameStarted: true,
      userScore: 0,
      computerScore: 0,
      gameOver: false,
      timer: 5,
      computerSelect: this.randomChoice(),
    });
  };

  checkGameOver = () => {
    const { userScore, computerScore } = this.state;
    if (userScore === 3 || computerScore === 3) {
      clearInterval(this.countdown);
      this.countdown = null;
      this.setState({ gameOver: true });
    }
  };

  judgement = (user, computer) => {
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

  changeBorder = (result) => result === "Win" ? "green" : result === "Lose" ? "red" : "gray";

  render() {
    const { gameStarted, userSelect, computerSelect, result, userScore, computerScore, timer, gameOver } = this.state;

    return (
      <div>
        {!gameStarted ? (
          <button onClick={this.startGame}>Start</button> //startGame은 단순히 동작하는 함수이므로 this.state로 선언X 즉, UI에 영향을 미치지 않는다. 
        ) : (
          <div>
            <div className="container">
              <BoxClass name="User" item={userSelect} result={result.user} borderColor={this.changeBorder(result.user)} />
              <BoxClass name="Computer" item={computerSelect} result={result.computer} borderColor={this.changeBorder(result.computer)} />
            </div>
            <div className="container">
              {!gameOver && (
                <>
                  <button onClick={() => this.play("scissor")}>가위</button>
                  <button onClick={() => this.play("rock")}>바위</button>
                  <button onClick={() => this.play("paper")}>보</button>
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
}

export default AppClass;
