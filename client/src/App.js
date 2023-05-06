import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [room,setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  const joinRoom = () =>{
    if(room !== ""){
      socket.emit("join_room",room);
    }
  }
  const sendMessage = () => {
    socket.emit("send_message", { message , room});
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      //alert(data.message);
      setMessageRecieved(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
    <input placeholder="Room no." onChange={(event) =>{setRoom(event.target.value)}}/>
    <button onClick={joinRoom}>Join Room</button>
    <br></br>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message :</h1>
      {messageRecieved}
    </div>
  );
}

export default App;
