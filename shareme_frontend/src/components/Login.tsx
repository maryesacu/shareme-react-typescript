import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
const shareVideo = require('../assets/share.mp4')
const logo = require('../assets/logowhite.png')

const Login = () => {
  return (
    <div className="flex justify-start item-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
      </div>
    </div>
  )
}

export default Login
