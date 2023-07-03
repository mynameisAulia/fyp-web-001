import "./login.scss"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { Password } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleLogin = (e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      navigate("/dashboard")
    })

    .catch ((error) => {
      setError(true)
    });
  };

  return (
    <div className="login">
      <span className="logo">MySecureAwareness</span>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}  />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  )
}

export default Login