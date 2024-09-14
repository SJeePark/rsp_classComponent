import { useState } from 'react';
import './App.css';
import Box from './component/Box';

/*
1. 박스 2개 (타이틀, 사진, 결과)
2. 가위 바위 보 버튼이 있다. 
3. 버튼 클릭시 클릭한 값이 박스에 보임
4. 컴퓨터는 컴퓨터는 랜덤하게 아이템 선택이 된다. 
5. 3 4 의 결과를 갖고 누가 이겼는지 승패를 따진다. 
6. 승패에 따라 테두리 색 변환
*/

const choice = {
  rock: {
    title: "Rock",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_1280.png"
  },
  scissor:{
    title: "Scissor",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_1280.png"
  },
  paper: {
    title: "Paper",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png"
  }
}


function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState({user:"", computer:""});

  const play = (userChoice)=>{
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  }

  const randomChoice=()=>{
    let itemArray = Object.keys(choice) //Object.keys: 객체의 키값만 뽑아 배열로 만들어주는 함수
    console.log("item", itemArray); 
    let randomItem = Math.floor(Math.random()*itemArray.length) //객체의 지정된 인덱스 번호를 랜덤하게 출력
    console.log("random", randomItem);
    let final = itemArray[randomItem];
    return choice[final];
  }

  const judgement = (user, computer) =>{
    //user == computer tie
    //user == rock, computer == scissors Win
    //user == rock, com == paper Lose
    //user == scissor com==paper Win
    //user Scissor com == rock Lose
    //user == paper com == rock Win
    //user == paper com == scissor Lose

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
  }

  const changeBorder = (result) => result === "Win" ? "green" : result === "Lose" ? "red" : "gray";


  return (
    <div>
      <div className='container'>
        <Box name = 'User' item={userSelect} result={result.user} borderColor={changeBorder(result.user)}></Box>
        <Box name = 'Computer' item={computerSelect} result={result.computer} borderColor={changeBorder(result.computer)}></Box>
      </div>
      <div className='container'>
        <button onClick={() => play("scissor")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    
    </div>
  );
}

//onClick {()=>function} 콜백함수를 쓰는 이유: 만약 쓰지 않으면 이벤트를 실행하기도 전에 함수가 실행된다. 이를 방지하기 위해서 콜백 함수를 선언해줘야 한다. 

export default App;
