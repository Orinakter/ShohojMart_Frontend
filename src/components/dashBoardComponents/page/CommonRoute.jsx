import React from 'react'
import banner from '../../../assets/images/welcome.jpg'

const CommonRoute = () => {
  return (
    <div>
        <div className="container mx-auto ">
            <img src={banner} alt="" className="max-h-[100vh]" />
        </div>
    </div>
  )
}

export default CommonRoute