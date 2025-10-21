import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Login() {


  const onSubmit = (data) => {
    console.log(data);
  }

  const loginRules = z.object({
    username: z.string().min(1, "Username is required").min(5, "Enter at least 5 characters"),
    password: z.string().min(6, "Password at least 6 characters").min(1, "Password is required")
  })
  
  const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: zodResolver(loginRules)})
    

  return(
    <div className="h-screen w-screen bg-[#101720] text-white">
      <form className="flex flex-col w-fit gap-4 p-16" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-2xl">Admin Panel</h1>
      <div className="flex flex-col"><input {...register("username")} type="text" placeholder="Enter your username" id="username" className="border-1 border-white rounded-2xl p-2 pl-4 pr-4 placeholder-white" name="username"></input>{errors.username && <span className="text-red-500">{errors.username.message}</span>}</div>
      <div className="flex flex-col"><input {...register("password")} type="password" placeholder="Enter your password" id="password" className="border-1 border-white rounded-2xl p-2 pl-4 pr-4 placeholder-white" name="password"></input>{errors.password && <span className="text-red-500">{errors.password.message}</span>}</div>
      <p>Don't have account? <Link className="text-blue-400" to="/Register">Register</Link></p>
      <button className="bg-blue-600 rounded-2xl text-white p-2 hover:bg-blue-700 active:bg-blue-800" type="submit">Submit</button>
      </form> 
    </div>
  );
}
