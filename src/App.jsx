import { useEffect } from "react";
import AuthPage from "./pages/AuthPage";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Chat from "./pages/Chat";

function App() {
  const [isAuth, setIsAuth] = useState();
  const [room,setRoom] = useState(null)
  //auth objesinin degisimini izler
  //kullanici giris cikis yaptiginda tetiklenir
  //calistirdigi fonk aktif kullanici varsa gönderir
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

const handleSubmit = (e)=> {
  e.preventDefault();
setRoom(e.target[0].value);
}




//kullanicinin oturumu kapali ise login sayfasina yönlendir
  if (isAuth === false) {
    return (
      <div className="container">
        <AuthPage />
      </div>
    );
  } else {
    //kullanici otrumu aciksa
    return (
      <div className="container">
        {/* odayi belirlediyse burasi calisir */}
        {room ? (
          <Chat room={room} setRoom={setRoom} />
        ) : (
          //odayi belirlemediyse burasi calisir
          <form onSubmit={handleSubmit} className="room-page">
            <h1>ChatRoom</h1>
            <p>Which room would you like to chat?</p>
            <input type="text" placeholder="ex:weekend group" required />
            <button className="submit">Go to Room</button>
            <button className="button">Exit</button>
          </form>
        )}
      </div>
    );
  }
}

export default App;
