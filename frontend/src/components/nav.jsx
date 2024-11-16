import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

export default function Nav({ message }) {
    const token = localStorage.getItem("TOKEN");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (token) {
                    const resp = await axios.post("http://localhost:5000/api/getUserInfo", { token });
                    if (resp.status === 200) {
                        console.log(resp.data.userData);
                        setUserData(resp.data.userData);
                    } else {
                        setUserData(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error.message);
                localStorage.removeItem("TOKEN");
                setUserData(null);
            }
        };

        fetchUserData();
    }, [token]);

    if (!token) {
        return (
            <div>
                <p>Hello World</p>
            </div>
        );
    }

    const messageStyle = "container-items bg-black w-full flex items-center gap-2 p-3 text-xs font-bold rounded-2xl text-white";
    const nonmessageStyle = "container-items bg-white w-full flex items-center gap-2 p-3 text-xs font-bold rounded-md text-black";

    return (
        <>
            <nav>
                {userData ? (
                    <>
                        <nav className="flex flex-col justify-around p-2 h-screen w-1/5 fixed top-0 left-0">
                            <div className="user-details flex flex-col items-center">
                                <img
                                    src={`http://localhost:5000/${userData.ImgPath}.jpg`}
                                    className="rounded-full h-40"
                                    alt="User Avatar"
                                />
                                <p className="m-4 font-semibold">@{userData.username}</p>
                                <p className="">🧑‍🎓 {userData.college}</p>
                            </div>
                            <div className="container-2 flex flex-col gap-4">
                                <div className={message === "home" ? messageStyle : nonmessageStyle}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill={message !== "home" ? "#000" : "#fff"}
                                    >
                                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                    </svg>
                                    <p>Home</p>
                                </div>
                                <div className={message === "post" ? messageStyle : nonmessageStyle}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill={message !== "post" ? "#000" : "#fff"}
                                    >
                                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                    </svg>
                                    <p>Post</p>
                                </div>
                                <div className={message === "search" ? messageStyle : nonmessageStyle}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill={message !== "search" ? "#000" : "#fff"}
                                    >
                                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                                    </svg>
                                    <p>Search</p>
                                </div>

                                <div className={message === "profile" ? messageStyle : nonmessageStyle}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill={message !== "search" ? "#000" : "#fff"}
                                    >
<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
                                    </svg>
                                    <p>Profile</p>
                                </div>



                            </div>

                            <button className="border border-black w-full p-4 text-xs font-bold rounded-xl text-black  text-center">Logout</button>
                        </nav>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </nav>
        </>
    );
}
