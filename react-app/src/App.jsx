import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>React Playwright 테스트</h1>
      <p>현재 카운트: <span id="counter">{count}</span></p>
      <button id="increment" onClick={() => setCount(count + 1)}>증가</button>
      <button id="decrement" onClick={() => setCount(count - 1)}>감소</button>
    </div>
  );
}

export default App
