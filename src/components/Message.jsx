import { auth } from "../firebase/firebaseConfig";

const Message = ({ msg }) => {

  //mesaji gönderen kisi oturumu acik olan kullanici ile
  //eslesirse ekrana bas
  if (msg.user?.uid === auth.currentUser.uid) {
    return <p className="msg-user">{msg.text}</p>;
  }

  //msji baskasi gönderdiyse
  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={msg.user?.photo} />
        <span>{msg.user?.name}</span>
      </p>
      <p className="msg-text">{msg.text}</p>
    </div>
  );
};

export default Message;
