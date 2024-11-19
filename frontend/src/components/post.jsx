import axios from "axios";
import Toast from "./toast";
import { useState } from "react";
import Nav from "./nav";
export default function Post() {
    const [toast, setToast] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        const data = {
            Learn: e.target.Learn.value.trim(),
            Teach: e.target.Teach.value.trim(),
            Message: e.target.Message.value.trim(),
            College: "",
            Username: "",
        };

        if (!data.Learn || !data.Teach) {
            setToast("Please fill out 'Learn' and 'Teach' fields.");
            return;
        }

        const Token = localStorage.getItem("TOKEN");
        if (!Token) {
            alert("You need to be logged in to submit the form.");
            return;
        }

        try {
            const resp = await axios.post("http://localhost:5000/api/fetchUserInfo", { token: Token });
            if (resp.status === 200) {
                data.Username = resp.data.User.username;
                data.College = resp.data.User.college;
                data.Pfp=resp.data.User.ImgPath;
            }
        } catch (error) {
            handleError(error);
            return;
        }

        try {
            const resp = await axios.post("http://localhost:5000/api/userPost", { Data: data });
            if (resp.status === 201) {
                setToast("Posted successfully 😄");
            }
        } catch (error) {
            handleError(error);
        }

    setTimeout(() => setToast(''), 4000);

    };

    const handleError = (error) => {
        if (error.response) {
            const { status } = error.response;
            const errorMessage = status === 401
                ? "You are not authorized 🥲"
                : `ERROR: ${status} 😟`;
            setToast(errorMessage);
        } else {
            setToast("An unexpected error occurred.");
        }

        setTimeout(() => setToast(''), 4000);

    };

    return (
        <>
            <Nav message="post"></Nav>
            {toast && <Toast message={toast} />}
            <main className="fixed left-1/4 w-4/5 p-5 ">
            <center>
                <form onSubmit={submitForm} className="mt-40">
                    <h1 className="text-3xl font-semibold mb-10">Post your request!</h1>

                    <div>
                        <label htmlFor="OrderNotes" className="sr-only">Order notes</label>
                        <div className="overflow-hidden w-1/2">
                            <textarea
                            id="OrderNotes"
                            name="Learn"
                            className="w-full resize-none border-x-0 border-t-0 border-gray-200 px-0 align-top sm:text-sm"
                            rows="3"
                            placeholder="What do you wanna learn?"
                            ></textarea>
                        </div>
                    </div>
                    <br />


                    <div>
                        <label htmlFor="OrderNotes" className="sr-only">Order notes</label>
                        <div className="overflow-hidden w-1/2">
                            <textarea
                            id="OrderNotes"
                            name="Teach"
                            className="w-full resize-none border-x-0 border-t-0 border-gray-200 px-0 align-top sm:text-sm"
                            rows="3"
                            placeholder="What do you wanna teach?"
                            ></textarea>
                        </div>
                    </div>
                    <br />

                    <div>
                        <label htmlFor="OrderNotes" className="sr-only">Order notes</label>
                        <div className="overflow-hidden w-1/2">
                            <textarea
                            id="OrderNotes"
                            name="Message"
                            className="w-full resize-none border-x-0 border-t-0 border-gray-200 px-0 align-top sm:text-sm"
                            rows="3"
                            placeholder="Message to your peer?"
                            ></textarea>
                        </div>
                    </div>
                    <br />
                    <button type="submit" class="px-2 py-2 w-40 text-white font-semi-bold rounded-md bg-black">Submit</button>
                </form>
                </center>
            </main>
            
        </>
    );
}
