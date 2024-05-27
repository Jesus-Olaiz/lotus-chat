import {useState, useEffect} from 'react'
import {getDatabase, ref, onValue, set, get, child} from 'firebase/database'
import './App.css';


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyABsDYN5rm7lUnrbi03RJhEk27w01De-Pg",
  authDomain: "testing-c82eb.firebaseapp.com",
  databaseURL: "https://testing-c82eb-default-rtdb.firebaseio.com",
  projectId: "testing-c82eb",
  storageBucket: "testing-c82eb.appspot.com",
  messagingSenderId: "637586527997",
  appId: "1:637586527997:web:fe33532d1b4c3cb0819094",
  measurementId: "G-N6W8PCNGP6"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);





function App() {
  const dbRef = ref(getDatabase())

  const [data, setData] = useState()

  const [message, setMessage] = useState("")



  // functions
  function handleMessage(e) {
    setMessage(e.target.value)
  }



  // send message
  function sendMessage(user, message, currentChat) {
    const db = getDatabase()
    set(ref(db, `/chats/${currentChat}/messages/${data.length}` ),{
      user: user,
      value: message
    })
    setMessage("")

  }


  async function getData() {
    await get(child(dbRef, '/chats/chat01/messages'))
    .then((snapshot) => {
      if(snapshot.exists()) {
        let newData = snapshot.val()
        setData(newData)
        
      } else{
        setData([{user: "admin", value:"Data not found"}])
      }
    })
    .catch(err => console.log(err))
  }

  
  

  // Get data on load
  useEffect(() => {
    getData() 
  }, [])
  

// Get data on change
  if(data !== undefined){
    const db = getDatabase()
    const messagesRef = ref(db, '/chats/chat01/messages')
    let newData 
    onValue(messagesRef, (snapshot) => {
      newData = snapshot.val()
      if(newData.length > data.length){
        setData(newData)
      }else{
      }
    })

  }

  

  return (
    <div className="App  App-header">
      <h1 className='title'>
      We are just getting started
      </h1>


      <div className="chat-display">
        { 
          data?
          data.map((x, i) => {
            return <p key={i}>{`${x.user}: ${x.value}`}</p>
          })
          :
          <p>There are no chats to be seen here</p>
        }
      </div>
      
      <input value={message} onChange={handleMessage} type="text" placeholder='Start Chatting...'/>
      <button onClick={() => {sendMessage("olaysus", message, 'chat01')}}>Send</button>
    </div>
  );
}

export default App;
