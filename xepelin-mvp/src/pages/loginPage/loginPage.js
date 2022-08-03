import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardImg from "../../assets/card.svg";
const LoginPage = (setLogIn) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);
  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    usernameM: "invalid username",
    passwordM: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  console.log("TENGO SUENO")
    let { username, password } = document.forms[0];
    console.log(document.forms[0])
    // Find users from the database
    const userData = database.find((user) => user.username === username.value);

    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.passwordM });
      } else {
        console.log("SI ENTRO");
        //setSubmitted(true);
        console.log(setLogIn);
        setLogIn.setLogin(false);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.usernameM });
    }
  };

  const renderErrorMessage = (name) =>
      name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
      );

  return (
    <div className="row fullpage-height">
      <div className="col-6 media-continer center-items">
        <img src={CardImg} alt="" />
        <h2>Realiza los cambios de tasa para nuestros usuarios</h2>
      </div>
      <div className="col-6 center-items">
        <div className="">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Ingresa al sistema de tasas</h1>
            <div className="space-div"></div>
            <div className="row">
              <TextField
                // html input attribute
                name="username"
                type=""
                placeholder="johndoe@email.com"
                // pass down to FormLabel as children
                label="Email"
                required
              />
              <div className="space-div"></div>
              <TextField
                name="password"
                type="password"
                placeholder="password"
                label="Password"
                required
              />
              <div className="space-div"></div>
              <Button
                variant="contained"
                className="principal-button"
                type="submit"
                disableElevation
              >
                Ingresar
              </Button>
              <div className="space-div"></div>
              <a>Recuperar acceso a mi cuenta</a>
              <div className="space-div"></div>
              <div className="space-div"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
