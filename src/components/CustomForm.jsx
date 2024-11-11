
import { Button, Input } from "@chakra-ui/react";
import { useForm, submitHandler } from "react-hook-form";
import React from "react";


export default function CustomForm(props){
    const {inputFields,formSubmit,buttonText,title} = props;
    const {
        register,
        handleSubmit
      } = useForm();

    
    return(
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[30%] h-screen shadow-xl  rounded-2xl flex flex-col items-center gap-y-8 bg-gradient-to-b from-gray-400 to-gray-200  ">
        <h1 className="text-4xl font-customFont font-bold mt-6">{title}</h1>
        <form
          className="w-80 flex flex-col gap-y-6 h-content"
          onSubmit={handleSubmit(formSubmit)}
        >
            {
                Object.entries(inputFields).map(([key,val])=>(
                    <Input
                    variant="filled"
                    placeholder={key}
                    {...register(val, { required: true })}
                  ></Input>
                ))
            }
          {/* <Input
            variant="filled"
            placeholder="Email"
            {...register("email", { required: true })}
          ></Input>
          <Input
            variant="filled"
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          ></Input> */}
          <Button type="submit" style={{ background: "black", color: "white" }}>
            {buttonText}
          </Button>
        </form>
      </div>
    </div>)
}