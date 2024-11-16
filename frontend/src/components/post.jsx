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
                <form onSubmit={submitForm}>
                    <textarea name="Learn" placeholder="Write what you want to learn here..." />
                    <br />
                    <textarea name="Teach" placeholder="Write what you want to teach here..." />
                    <br />
                    <textarea name="Message" placeholder="Write any additional message here..." />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </main>
            
        </>
    );
}
