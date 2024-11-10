import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [data, setData] = useState({});

    const submitForm = async (e) => {
        e.preventDefault();
        
        // Get form data
        const email = e.target.UserEmail.value;
        const username = e.target.UserName.value;
        const password = e.target.UserPassword.value;
        
        // Set state with form data
        setData({ username, email, password });

        try {
            // Directly use the form data in the axios request
            const resp = await axios.post("http://localhost:5000/api/reg", { username, email, password });

            
                alert("Registered successfully");
           
        } catch (error) {
            console.log(error);
            // Handle errors from the server, like 500 or other status codes
            
            if(error.status === 409){
                alert("Email or Username already exists");
            }else if(error.status === 500){
                alert("Internal Server Error");
            }else{
                alert("err status code: " + error.status)
            }
                

            
        }
    };

    return (
        <>
            <main className="min-h-screen flex items-center justify-center w-full">
                <form
                    onSubmit={submitForm}
                    className="border border-gray-200 px-10 py-4 form-div flex flex-col items-center w-[80%] sm:w-full md:w-1/2 lg:w-1/3 rounded-lg"
                >
                    <h2 className="text-3xl mb-5 text-indigo-500 font-bold w-full text-center">Register</h2>

                    <label
                        htmlFor="UserEmail"
                        className="relative mb-5 block overflow-hidden rounded-md border w-full border-gray-200 px-3 pt-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-600"
                    >
                        <input
                            type="email"
                            required
                            id="UserEmail"
                            name="UserEmail"
                            placeholder="Email"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Email
                        </span>
                    </label>

                    <label
                        htmlFor="UserName"
                        className="relative mb-5 block overflow-hidden rounded-md border w-full border-gray-200 px-3 pt-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-600"
                    >
                        <input
                            type="text"
                            required
                            id="UserName"
                            name="UserName"
                            placeholder="Username"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Username
                        </span>
                    </label>

                    <label
                        htmlFor="UserPassword"
                        className="relative mb-5 block overflow-hidden rounded-md border w-full border-gray-200 px-3 pt-3 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-600"
                    >
                        <input
                            type="password"
                            id="UserPassword"
                            required
                            name="UserPassword"
                            placeholder="Password"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Password
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 px-3 py-2 rounded-md text-white font-bold"
                    >
                        Register
                    </button>
                    <p className="mt-4">
                        Already have an account? <a href="/login" className="text-indigo-500 underline">Login</a>
                    </p>
                </form>
            </main>
        </>
    );
}
