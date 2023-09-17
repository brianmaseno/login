import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      const config = {
        url: "/api/Login/route",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          email,
          password,
        },
      };
      axios(config)
        .then(function (response) {
          if (response.data.status == 200) {
            console.log("Successful");
            localStorage.setItem("User_data",JSON.stringify(response.data.data))
            router.push("/");
          } else {
            console.log(response.data.message);
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
          <Link href={"/signup"}>Dont have an account ?Sign up</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
