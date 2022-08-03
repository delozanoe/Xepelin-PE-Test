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
    {
      username: "daniellozano.ee@gmail.com",
      password: "daniellozano",
    },
    {
      username: "ianiv@xepelin.com",
      password: "xepelin",
    },
    {
      username: "admin@xepelin.com",
      password: "admin",
    },
  ];

  const errors = {
    usernameM: "invalid username",
    passwordM: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { username, password } = document.forms[0];

    // Find users from the database
    const userData = database.find((user) => user.username === username.value);

    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.passwordM });
      } else {
        //setSubmitted(true);
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
                name="username"
                type="text"
                placeholder="johndoe@email.com"
                color="secondary"
                label="Email"
                required
              />
              <div className="space-div"></div>
              <TextField
                name="password"
                type="password"
                placeholder="password"
                label="Password"
                color="secondary"
                required
              />
              <div className="space-div"></div>
              <Button
                variant="contained"
                className="principal-button"
                type="submit"
                color="secondary"
                size="medium"
                disableElevation
              >
                <h6 className={"no-borders"}>Ingresar</h6>
              </Button>
              <div className="space-div"></div>

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
