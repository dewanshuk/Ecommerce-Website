import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import { useForm, submitHandler } from "react-hook-form";
import { Button, Input } from "@chakra-ui/react";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    dispatch(signin(data.email, data.password));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="w-[30%] h-[55%] shadow-xl  rounded-2xl flex flex-col items-center gap-y-8 bg-gradient-to-b from-gray-400 to-gray-200  ">
        <h1 className="text-4xl font-customFont font-bold mt-6">Login</h1>
        <form
          className="w-80 flex flex-col gap-y-6"
          onClick={handleSubmit(submitHandler)}
        >
          <Input
            variant="filled"
            placeholder="Email"
            {...register("email", { required: true })}
          ></Input>
          {errors.email && (
            <span style={{ color: "red", marginTop: "-15px" }}>
              Email is required
            </span>
          )}
          <Input
            variant="filled"
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          ></Input>
          {errors.password && (
            <span style={{ color: "red", marginTop: "-15px" }}>
              Password is required
            </span>
          )}
          <Button type="submit" style={{ background: "black", color: "white" }}>
            Login
          </Button>
        </form>
        {error ? (
          <h2 className="text-red-500">Invalid Username or Password </h2>
        ) : null}
        <span>
          New Here?{" "}
          <Link
            to={redirect === "/" ? "register" : "register?redirect=" + redirect}
            className="font-semibold"
          >
            Create your account
          </Link>
        </span>
      </div>
    </div>
  );
}
export default SigninScreen;
