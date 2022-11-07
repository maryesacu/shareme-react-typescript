import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client'
import { DecodedCredentials, GoogleResponse } from '../types/googleAuthInterfaces'

const Login = () =>
{
    const navigate = useNavigate();
    useEffect(() =>
    {
        /*global google*/
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
    }, [])

    const handleCallbackResponse = (response: GoogleResponse) =>
    {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)));
        const obj: DecodedCredentials = jwt_decode(response.credential)
        const { name, picture, sub } = obj;

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }

        client.createIfNotExists(doc)
            .then(() =>
            {
                navigate('/', { replace: true })
            })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    typeof='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                ></video>

                <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px" alt="logo" />
                    </div>
                    <div id='signInDiv'></div>
                </div>
            </div>
        </div>
    )
}

export default Login