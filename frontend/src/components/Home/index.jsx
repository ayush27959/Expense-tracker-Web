import React from 'react'
import Homelayout from '../../layout/Homelayout'    
import Login from './login'

const Homepage =() => {
  return (
<Homelayout>
    {/* <h1 className='text-bold text-5xl text-green-500'>Helllo coder how are you what are doing here </h1> */}
    <Login />
</Homelayout>
  )
}

export default Homepage
