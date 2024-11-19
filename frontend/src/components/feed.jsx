import { useEffect,useState } from "react";
import NotAuth from "./notAuth";
import Toast from "./toast";
import axios from "axios"
import Nav from "./nav";
export default function Feed(){
    /*
      GOALS:
      - check for user auth, if so then fetch those posts which are from users college.
      - display posts in a feed format.
      - Implement a search function.
    */

    
    const auth = localStorage.getItem("TOKEN");

    if(!auth){
        return(
            <>
            <NotAuth></NotAuth>

            </>
        )
    }

    const [feedData,setFeedData] = useState(null)
    const [toastMessage,setToastMessage] = useState("")
    
    useEffect(()=>{
        // Fetch posts from users college
        const fetchInfo = async()=>{
            try {
                const response = await axios.post("http://localhost:5000/api/fetchFeedInfo",{Token:auth});
                if(response.status === 200){
                    setFeedData(response.data.posts);
                    
                }else{
                    setToastMessage("Error fetching data:",response.data);
                }
            } catch (error) {
                setToastMessage(error.message)
                console.log(error)
            }

            setTimeout(() => setToastMessage(""), 4000);

        }
        fetchInfo()
    },[auth])

    useEffect(()=>{
        if(feedData){
            console.log(feedData);
        }
    },[feedData])
    return (
        <>
        <Nav message='home'></Nav>
        <main className="sticky left-1/4 w-4/5 p-5 mt-10">
         {toastMessage && <Toast message={toastMessage}/>}
         <div className="flex flex-col items-center justify-center">
         {feedData && feedData.length > 0 && feedData.map(ele=>(
             <div key={ele._id} className="w-2/3 border border-gray-200 p-5 rounded-xl">
                <div className="profile-pic-section flex items-center gap-10">
                     <img src={`http://localhost:5000/${ele.Pfp}.jpg`} className="h-20 w-20 rounded-full" alt="" />
                     <h2 className="text-md font-bold">{ele.Username}</h2>
                </div>
                <div className=" flex felx items-center justify-evenly">
                    <div className="learn flex items-center gap-5  p-3 rounded-xl bg-gray-900 shadow-lg">
                        <div className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 -960 960 960" width="1.5rem" fill="#fff"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg> 
                            <h1 className="text-10 text-white">Learn</h1>
                        </div>
                        <h1 className="text-10 text-white font-semibold">{ele.Learn}</h1>

                    </div>
                    <div className="learn flex items-center gap-5 bg-gray-900 p-3 rounded-xl shadow-lg ">
                        <div className="flex flex-col items-center justify-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 -960 960 960" width="1.5rem" fill="#fff"><path d="m280-620 80-80-80-80-80 80 80 80Zm200-40ZM160-400q-33 0-56.5-23.5T80-480v-360q0-33 23.5-56.5T160-920h640q33 0 56.5 23.5T880-840v360q0 33-23.5 56.5T800-400H671q6-20 8-40t0-40h121v-360H160v360h121q-2 20 0 40t8 40H160Zm500-280q25 0 42.5-17.5T720-740q0-25-17.5-42.5T660-800q-25 0-42.5 17.5T600-740q0 25 17.5 42.5T660-680ZM200-40v-84q0-35 19.5-65t51.5-45q49-23 102-34.5T480-280q54 0 107 11.5T689-234q32 15 51.5 45t19.5 65v84H200Zm80-80h400v-4q0-12-7-22t-18-15q-42-19-86-29t-89-10q-45 0-89 10t-86 29q-11 5-18 15t-7 22v4Zm200-200q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T540-460q0-25-17.5-42.5T480-520q-25 0-42.5 17.5T420-460q0 25 17.5 42.5T480-400Zm0-60Zm0 340Z"/></svg>
                            <h1 className="text-10 text-white -400 font">Teach</h1>
                        </div>
                        <h1 className="text-10 text-white font-semibold">{ele.Teach}</h1>
                    </div>
                </div>

                <div className="description flex flex-col items-center justify-center mt-5">
                    <p>{ele.Message}</p>
                    <button className="bg-black px-10 py-3 rounded-xl text-white mt-10 w-15">Send Request!</button>
                </div>
               


             </div>
         ))}
         </div>
         </main>
        </>
    )
}