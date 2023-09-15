import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      // const resUserExists = await fetch("/api/userExists", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // const { user } = await resUserExists.json();
      // if (user) {
      //   setError("User already exists.");
      //   return;
      // }

      const config = {
        url: "/api/register/route",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          name,
          email,
          password,
        },
      };
      axios(config)
        .then(function (response) {
          if(response.data.status== 200){
            console.log("Successful");
            router.push("/");
          }
          else{
            console.log(response.data.message);
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      //   const res = await fetch("/api/register/route", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       name,
      //       email,
      //       password,
      //     }),
      //   });
      //   console.log(res);
      //   if (res.ok) {

      //     setName("");
      //     setEmail("");
      //     setPassword("");
      //   } else {
      //     console.log("User registration failed");
      //   }
      // } catch (error) {
      //   console.log("Error during registration", error);
      // }
      // console.log("Name: ", name);
      // console.log("Email: ", email);
      // console.log("Password: ", password);
    } catch (error) {}
  };

  //

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
          <h1 className="text-xl font-bold my-4">Signup</h1>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button className="text-sm mt-3 text-right">Signup</button>

            {error && <div className="bg-red-500">{error}</div>}

            <Link href={"/login"}>Don't have an account? Login</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
