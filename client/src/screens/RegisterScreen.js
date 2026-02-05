import React, { useState } from "react";
import axios from "axios";

function RegisterScreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = { name, email, password, cpassword };
      try {
        const result = await axios.post("/api/users/register", user).data;
        alert("Registration Successful!");
        window.location.href = '/login';
      } catch (error) {
        console.log(error);
        alert("Registration Failed");
      }
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5 bs">
        <div className="auth-inner">
          <h2>Register</h2>
          <input type="text" className="form-control mt-2" placeholder="name" 
            value={name} onChange={(e) => setname(e.target.value)} />
          <input type="text" className="form-control mt-2" placeholder="email" 
            value={email} onChange={(e) => setemail(e.target.value)} />
          <input type="password" name="password" className="form-control mt-2" placeholder="password" 
            value={password} onChange={(e) => setpassword(e.target.value)} />
          <input type="password" name="cpassword" className="form-control mt-2" placeholder="confirm password" 
            value={cpassword} onChange={(e) => setcpassword(e.target.value)} />
          
          <button className="btn btn-primary mt-3" onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;