import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Input } from "@chakra-ui/react";
import { useForm, submitHandler } from "react-hook-form";
import CustomForm from "../components/CustomForm";
//'https://www.clickpost.in/api/v2/pincode_details/?pincode=380055'

let inputFields = {
  'Address':'address',
  'City':'city',
  'Postal Code':'postcode',
  'Country':'country'
}
let buttonText = 'Continue'

function ShippingScreen(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push("payment");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandlerr = (data) => {
    e.preventDefault();
    console.log(data);
    // dispatch(signin(data.email, data.password));
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <CustomForm inputFields= {inputFields} buttonText = {buttonText} formSubmit={submitHandlerr} title={'Shipping Details'}/>
      {/* <div className="w-screen h-screen flex justify-center items-center ">
      <div className="w-[30%] h-[55%] shadow-xl  rounded-2xl flex flex-col items-center gap-y-8 bg-gradient-to-b from-gray-400 to-gray-200  ">
        <h1 className="text-4xl font-customFont font-bold mt-6">Login</h1>
        <form
          className="w-80 flex flex-col gap-y-6"
          onClick={handleSubmit(submitHandlerr)}
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
      </div>
    </div> */}
      {/* <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div> */}
    </div>
  );
}
export default ShippingScreen;
