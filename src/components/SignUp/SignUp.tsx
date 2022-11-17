import React, { FC, useState, useEffect } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import "./SignUp.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services";
import { useAppDispatch } from "./../../hooks";
import { setUser } from "../../redux";
import { toast } from "react-toastify";

export const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [agree, setAgree] = useState(false);

  // error states
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [match, setMatch] = useState("");
  const [agreeError, setAgreeErro] = useState(false);
  // error states

  const [register, { data, isSuccess, isLoading, isError, error }] =
    useRegisterMutation();

  const emailValidator = (email: string) => {
    const pattern = /@/g;
    const res = email.match(pattern);
    return !!res;
  };

  const validating = () => {
    if (!username) {
      setUserError("Username is required");
    } else {
      setUserError("");
    }
    if (!email) {
      setEmailError("Email is required");
    } else if (!emailValidator(email)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }

    if (!pass) {
      setPassError("Password is required");
    } else if (pass.length < 6) {
      setPassError("Your password needs to be at least 6 characters.");
    } else {
      setPassError("");
    }

    if (!(pass === repeatPass)) {
      setMatch("Passwords must match");
    } else {
      setMatch("");
    }

    setAgreeErro(!agree);

    if (
      username &&
      emailValidator(email) &&
      pass.length > 5 &&
      pass === repeatPass
    )
      return true;

    return false;
  };

  const onButtonClick = (e: any) => {
    e.preventDefault();
    if (!validating() || !agree) return;
    const body = {
      user: {
        username,
        email,
        password: pass,
      },
    };
    register(body);
  };

  useEffect(() => {
    if (isSuccess && data) {
      const { token, username, image, email } = data.user;

      localStorage.setItem("token", token);
      dispatch(setUser({ email, username, token, image, isAuth: true }));
      navigate("/");
      toast.success("Registered", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (isError && error) toast.error("User already exist");
  }, [isSuccess, data, isLoading, dispatch, navigate, isError, error]);

  return (
    <form className="signup">
      <h3 className="signup__title"> Create a new account</h3>
      <ul className="signup__inputs">
        <Input
          title="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          isError={!!userError}
          errorMsg={userError}
        />
        <Input
          title="Email address"
          type="email"
          isError={!!emailError}
          errorMsg={emailError}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          title="Password"
          type="password"
          isError={!!passError}
          errorMsg={passError}
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <Input
          type="password"
          title="Repeat Password"
          isError={!!match}
          errorMsg={match}
          onChange={(e) => setRepeatPass(e.target.value)}
          value={repeatPass}
        />
      </ul>
      <div className="signup__line"></div>
      <label className="signup__agree">
        <input
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          type="checkbox"
          name=""
          id=""
        />
        <div>I agree to the processing of my personal information</div>
      </label>
      {agreeError && (
        <p
          style={{
            textAlign: "center",
            color: "red",
            marginTop: "-21px 0 10px",
            fontSize: "12px",
          }}
        >
          Check!!!
        </p>
      )}
      <Button onClick={onButtonClick} width="100%" text="Create" />
      <p className="signup__quest">
        Already have an account? <NavLink to={"/signin"}>Sign Ip.</NavLink>
      </p>
    </form>
  );
};
