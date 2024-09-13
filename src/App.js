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

  const play = (userChoice)=>{
    console.log('선택', userChoice)
  }

  return (
    <div>
      <div className='container'>
        <Box name = 'User'></Box>
        <Box name = 'Computer'></Box>
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
