import { useState, useRef } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';
import './styles/style.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/FirebaseConfig';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    setIsAuth(null);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="container">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className="container">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room-container">
          <h1>Chat Odası</h1>
          <label>Hangi Odaya gireceksin ?</label>
          <input ref={inputRef} />
          <button
            className="enter"
            onClick={() => setRoom(inputRef.current.value)}
          >
            Odaya Gir
          </button>
          <button className="exit" onClick={() => signUserOut()}>
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
