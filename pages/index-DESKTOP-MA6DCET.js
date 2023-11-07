import Link from "next/link";
import axios from "axios";
// import { useState } from 'react';

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    // Fetch the username when the component mounts
    setName(
      JSON.parse(localStorage.getItem("User_data")) == null
        ? ""
        : JSON.parse(localStorage.getItem("User_data")).name
    );
    setId(
      JSON.parse(localStorage.getItem("User_data")) == null
        ? ""
        : JSON.parse(localStorage.getItem("User_data"))._id
    );
  }, []); // The empty dependency array ensures this runs once after the component mounts

  const uploadImage = (e) => {
    const cloudName = "dtadjmpnx";
    const uploadPreset = "ml_default";
    const endPoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const folder = "kisumu";

    const photoFormData = new FormData();
    photoFormData.append("file", e.target.files[0]);
    photoFormData.append("upload_preset", uploadPreset);
    photoFormData.append("folder", folder);

    const config = {
      url: endPoint,
      method: "POST",
      data: photoFormData,
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.data.secure_url);
          setFile(response.data.secure_url);
        } else {
          console.log(response.data);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const saveImage = (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/api/register/route",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: {
          file,
          id: id,
        },
      };
      axios(config)
        .then(function (response) {
          if (response.data.status == 200) {
            console.log("Successful");
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
        <h1>Welcome home</h1>
        <h2>Welcome {name}</h2>
        <div>
          <Link href={"/signup"}>SignUp</Link>
          <Link href={"/login"}>Login</Link>
        </div>

        <div>
          <input type="file" onChange={(e) => uploadImage(e)}></input>
        </div>
        <button onClick={saveImage}>Save Image</button>
      </div>
    </>
  );
};

export default Dashboard;
