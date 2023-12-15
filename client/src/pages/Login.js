import React,{useState,useEffect} from 'react'
import { Form, Input,message } from 'antd'

import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Layout/Spinner'
const Login = () => {
    const [loading,setLoading] = useState(false)   //spinner
    const navigate = useNavigate()
    //form submit
    const submitHandler = async(values)=>{
        try{
            setLoading(true)    //spinner
           const {data}= await axios.post('/users/login',values)
           setLoading(false)    //spinner
           message.success('login success')
           localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
           navigate('/')
        } catch (error){
            setLoading(false)  //spinner
            message.error('something went wrong')
        }
    }
    // prevent  for login user
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    },[navigate]);
  return (
    <>
    <div className='register-page'>
        {loading &&<Spinner></Spinner>}
        <Form layout='vertical' onFinish={submitHandler}>
            <h1>Login Form</h1>
            {/* Name should same as entered  in schema model there there should bhe problem in database*/}
            <Form.Item label="Email" name="email">  
                <Input type='email'></Input>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input></Input>
            </Form.Item>
            <div className="d-flex justify-content-between">
                <Link to="/register">Not a user ? Click Here to Register </Link>
                <button className='btn btn-primary'> Login </button>
            </div>
        </Form>
    </div>
    </>
  )
}

export default Login