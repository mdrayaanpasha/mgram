import { useState } from "react";
import axios from "axios";
import Toast from "./toast";

export default function Login() {
    const [data, setData] = useState({});
    const [toastMessage, setToastMessage] = useState("");  // State for Toast message

    const submitForm = async (e) => {
        e.preventDefault();
        
        // Get form data
        const username = e.target.UserName.value;
        const password = e.target.UserPassword.value;
        // Set state with form data
        setData({ username, password });

        try {
            // Directly use the form data in the axios request
            const resp = await axios.post("http://localhost:5000/api/log", { username, password });

            // Set success toast message
            setToastMessage("Logedin Successfully 😄");

            // Store the token in localStorage
            localStorage.setItem("TOKEN", resp.data.token);            

            // Hide toast after 3 seconds
            setTimeout(() => setToastMessage(""), 3000);

        } catch (error) {
            
            if(error.response.status === 401){
                setToastMessage("🤔 Invalid Credentials");
            }
            if (error.response && error.response.status === 404) {
                setToastMessage("😟 Username Not Found");
            }

            // Hide toast after 3 seconds
            setTimeout(() => setToastMessage(""), 3000);
        }
    };

    return (
        <>
            {/* Toast message */}
            {toastMessage && <Toast message={toastMessage} />}

            <main className="min-h-screen flex items-center justify-center w-full">
                <form
                    onSubmit={submitForm}
                    className="border border-gray-200 px-10 py-4 form-div flex flex-col items-center w-[80%] sm:w-full md:w-1/2 lg:w-1/3 rounded-lg"
                >
                    <h2 className="text-3xl mb-5 text-indigo-500 font-bold w-full text-center">Login</h2>

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
                        Login
                    </button>
                    <p className="mt-4">
                        Don't have an account? <a href="/register" className="text-indigo-500 underline">Register</a>
                    </p>
                </form>
            </main>
        </>
    );
}
