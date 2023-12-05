import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { useEffect,useRef,useState } from "react";
import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
  //collection refaransi alma
  const [messages, setMessages] = useState();
const inputRef = useRef(null);
  const messagesCol = collection(db, "messages");

  //formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const text = e.target[0].value;

    inputRef.current.value= "";

    //koleksiyona yeni document(msj)ekleme
    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      createdAt: serverTimestamp(),
    });

    
  };

  useEffect(() => {
    //filtreme ayarlari
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    //kolleksiyondaki her degisimi izleyip
    //bir callback fonk calistirir ve güncel verileri aktarir
    const unsubscribe = onSnapshot(
      queryOptions,
      (snapshot) => {
        const comingMessages = [];
        //dokumanlari dönup doc icindeki verilere
        //eerisip bir diziye aktarma
        snapshot.docs.forEach((doc) =>
          comingMessages.push({ ...doc.data(), id: doc.id })
        );

        setMessages(comingMessages);
      },
      []
    );

    return () => {
      //koleksiyonu izlemeyi durdurur
      unsubscribe();
    };

  });

  return (
    <div className="chat">
      <header>
        <p className="user">UserName</p>
        <p>{room}</p>
        <a onClick={() => setRoom(null)}>Exit</a>
      </header>
      <main>
        {messages?.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input placeholder="Type.." ref={inputRef} type="text" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
