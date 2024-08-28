import { useState } from "react";
import Student from "../components/Student";
import { Link } from "react-router-dom";

function Home() {
  const [counter, setCounter] = useState<number>(0);
  const [username, setUsername] = useState<String>("");

  function increase() {
    const newCount = counter + 1;
    setCounter(newCount);
  }
  function resetnumber() {
    setCounter(0);
  }
  function decrease() {
    const newCount = counter - 1;
    setCounter(newCount);
  }

  function handleUsername(event: any) {
    setUsername(event.target.value);
  }

  return (
    <>
      <Link to="/profile">Profile</Link>
      <br />
      <Link to="/categories">Categories</Link>
      <h1>Wecome {username} !!</h1>
      <input type="text" onChange={handleUsername} />
      <h1>{counter}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={resetnumber}>Reset</button>
      <Student name="Saneshka" age={24} />
      <Student name="Costa" age={20} />
    </>
  );
}
export default Home;
