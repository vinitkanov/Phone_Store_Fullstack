import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

export default function Register() {


  const onSubmit = (data) => {
    console.log(data);
  }

  const loginRules = z.object({
    fullname: z.string().min(1, "Provide your fullname").min(3, "Full name too short").max(50, "FUll name too long"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Provide your password").min(8, "Password at least 8 characters").regex(/[A-Z]/, "Password must have lowercase").regex(/[a-z]/, "Password must have uppercase"),
    passwordConfirm: z.string().min(1, "Confirm your password"),
    age: z.number().min(13, "You must be at least 13 years old").max(80, "You are not that old")
  })
  
  const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: zodResolver(loginRules)})
    

  return(
    <div className="h-screen w-screen bg-[#101720] text-white">
      <form className="flex flex-col w-fit gap-4 p-16" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-2xl">Registration Page</h1>

      <div className="flex flex-col"><input {...register("fullname")} type="text" placeholder="Enter your full name" id="fullname" className="border-1 border-white rounded-2xl p-2 pl-4 pr-4 placeholder-white" name="fullname"></input>{errors.fullname && <span className="text-red-500">{errors.fullname.message}</span>}</div>

      <div className="flex flex-col"><input {...register("email")} type="email" placeholder="Enter your email" id="email" className="border-1 border-white rounded-2xl p-2 pl-4 pr-4 placeholder-white" name="email"></input>{errors.email && <span className="text-red-500">{errors.email.message}</span>}</div>

      <div className="flex flex-col"><input {...register("password")} type="password" placeholder="Enter your password" id="password" className="border-1 border-white rounded-2xl p-2 pl-4 pr-4 placeholder-white" name="password"></input>{errors.password && <span className="text-red-500">{errors.password.message}</span>}</div>

      <div className="flex flex-col"><input {...register("passwordConfirm")} type="password" placeholder="Confirm your password" id="passwordConfirm" className="border-1 border-white rounded-2xl p-2 pl-4 pr-4 placeholder-white" name="passwordConfirm"></input>{errors.passwordConfirm && <span className="text-red-500">{errors.passwordConfirm.message}</span>}</div>

      <div className="flex flex-col"><input {...register("age", { valueAsNumber: true })} type="number" placeholder="Enter your age" id="age" className="border-1 border-white rounded-2xl p-2 pl-4 pr-4 placeholder-white" name="age"></input>{errors.age && <span className="text-red-500">{errors.age.message}</span>}</div>

      <p>Already have account? <Link className="text-blue-400" to="/">Login</Link></p>
      <button className="bg-blue-600 rounded-2xl text-white p-2 hover:bg-blue-700 active:bg-blue-800" type="submit">Submit</button>
      </form> 
    </div>
  );
}
  