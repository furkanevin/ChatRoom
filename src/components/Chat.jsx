import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db, auth } from './../firebase/FirebaseConfig';

const Chat = ({ room }) => {
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, 'messages'); //referansını alıyoruz

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMsg);
    if (newMsg === '') return;
    await addDoc(messagesRef, {
      text: newMsg,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room, //tek isimde olur
    });
    setNewMsg('');
  };

  useEffect(() => {
    const queryMsg = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );
    const temizle = onSnapshot(queryMsg, (snapshot) => {
      let comingMessages = [];
      snapshot.forEach((doc) => {
        comingMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(comingMessages);
    });
    return () => temizle();
  }, []);

  return (
    <div className="chat">
      <div className="info">
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <a href="/">Farklı Oda</a>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <>
            {auth.currentUser.displayName === message.user ? (
              <div key={message.id} className="user-message">
                <span className="text"> {message.text}</span>
              </div>
            ) : (
              <div key={message.id} className="message">
                <span className="user">{message.user}</span>
                <span className="text"> {message.text}</span>
              </div>
            )}
          </>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message"
          placeholder="Mesajınızı yazın.."
          onChange={(e) => setNewMsg(e.target.value)}
          value={newMsg} // içindeki değerin 0 lanması için
        />
        <button type="submit" className="submit-btn">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default Chat;
