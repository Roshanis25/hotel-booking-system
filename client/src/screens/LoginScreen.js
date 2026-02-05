import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function Login() {
    const user = { email, password };
    try {
      setLoading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setLoading(false);

      // CRITICAL: Store the user object in localStorage
      localStorage.setItem("currentuser", JSON.stringify(result));

      // Redirect to home after successful login
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bs">
          {error && <Error message="Invalid Credentials" />}
          <h2>Login</h2>
          <input
            type="text"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary mt-3" onClick={Login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;