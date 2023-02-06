import { useState, useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('token'));
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);
  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <div> CHAT</div>
      ) : (
        <div>
          <label>Hangi Odaya gireceksin ?</label>
          <input ref={inputRef} />
          <button onClick={() => setRoom(inputRef?.current.value)}>
            Odaya Gir
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
