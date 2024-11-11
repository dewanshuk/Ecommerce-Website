import React from "react";
function CheckoutSteps(props) {
  return (
    <div className="flex flex-row justify-center  ">
    <div className="flex flex-row justify-around w-[50%] my-8 [&>*]:w-[100%]  [&>*]:align-middle">
      <div className={props.step1 ? "active" : "not-active"}>Signin</div>
      <div className={props.step2 ? "active" : "not-active"}>Shipping</div>
      <div className={props.step3 ? "active" : "not-active"}>Payment</div>
      <div className={props.step4 ? "active" : "not-active"}>Place Order</div>
    </div>
    </div>
  );
}

export default CheckoutSteps;
