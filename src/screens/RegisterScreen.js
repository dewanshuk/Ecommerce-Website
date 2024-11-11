import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/userActions";
import { Button, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const submitHandler = (data) => {
    console.log(data, data.name, data.email);
    dispatch(registerUser(data.name, data.email, data.password));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center  ">
      <div className="w-[30%] h-[70%] shadow-xl  rounded-2xl flex flex-col items-center gap-y-8 bg-gradient-to-b from-gray-400 to-gray-200">
        <h1 className="text-4xl font-customFont font-bold mt-6">Register</h1>
        <form
          className="w-80 flex flex-col gap-y-6"
          onClick={handleSubmit(submitHandler)}
        >
          <Input
            variant="filled"
            placeholder="Name"
            {...register("name", { required: true })}
          ></Input>
          {errors.name && (
            <span style={{ color: "red", marginTop: "-15px" }}>
              Email is required
            </span>
          )}
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
          <Input
            variant="filled"
            placeholder="Re-enter Password"
            type="repassword"
            {...register("repassword", { required: true })}
          ></Input>
          {errors.repassword && (
            <span style={{ color: "red", marginTop: "-15px" }}>
              Password is required
            </span>
          )}
          <Button type="submit" style={{ background: "black", color: "white" }}>
            Register
          </Button>
        </form>
        <span>
          Already a User?{" "}
          <Link
            to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
            className="font-semibold"
          >
            Login Here
          </Link>
        </span>
      </div>
    </div>
  );
  // return <div className="form">
  //   <form onSubmit={submitHandler} >
  //     <ul className="form-container">
  //       <li>
  //         <h2>Create Account</h2>
  //       </li>
  //       <li>
  //         {loading && <div>Loading...</div>}
  //         {error && <div>{error}</div>}
  //       </li>
  //       <li>
  //         <label htmlFor="name">
  //           Name
  //         </label>
  //         <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
  //         </input>
  //       </li>
  //       <li>
  //         <label htmlFor="email">
  //           Email
  //         </label>
  //         <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
  //         </input>
  //       </li>
  //       <li>
  //         <label htmlFor="password">Password</label>
  //         <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
  //         </input>
  //       </li>
  //       <li>
  //         <label htmlFor="rePassword">Re-Enter Password</label>
  //         <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
  //         </input>
  //       </li>
  //       <li>
  //         <button type="submit" className="button primary">Register</button>
  //       </li>
  //       <li>
  //         Already have an account?
  //         <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link>

  //       </li>

  //     </ul>
  //   </form>
  // </div>
}
export default RegisterScreen;
