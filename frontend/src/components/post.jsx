import axios from  "axios"

export default function Post(){

    
    const submitForm = async(e)=>{
        e.preventDefault();
        const data = {
            Learn: e.target.Learn.value,
            Teach: e.target.Teach.value,
            Message: e.target.Message.value,
            College:"",
            Username:"",
        }

        //here we just have users request without their info so lets fetch some of their info, i.e. username and college.
        const Token = localStorage.getItem("TOKEN");
        if(!Token){
            alert("You need to be logged in to submit the form.")
            return;  
        }else{
            try {
                const resp = await axios.post("http://localhost:5000/api/fetchUserInfo",({token:Token}));
                if(resp.status === 200){
                    data.Username = resp.data.User.username
                    data.College = resp.data.User.college
                }
            } catch (error) {
                if(error.response.status===401){
                    alert("You are not authorized! or you havent loged in")
                }else{
                    console.log(error)
                    alert("An error occurred while fetching your information.")
                }
            }
        }
        console.log(data)
        //now that i have all this stuff now i should post users info inside the post model.
        try {
            const resp = await axios.post("http://localhost:5000/api/userPost",{Data:data});
            if(resp.status === 200){
                alert("posted")
            }
        } catch (error) {
            alert(error.message);
        }
    }
    return(
        <>
        <form onSubmit={e=>submitForm(e)}>
            {/* we need 3 things... firstly what they wanna learn, what they wanna teach in return and a message which is optional */}

            <textarea name="Learn" id="" placeholder="Write what you want to learn here..."></textarea>
            <br />
            <textarea name="Teach" id="" placeholder="Write what you want to teach here..."></textarea>
            <br />
            <textarea name="Message" id="" placeholder="Write any additional message here..."></textarea>
             <br/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}