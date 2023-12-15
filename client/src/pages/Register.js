import React,{useEffect, useState} from 'react'
import { Form, Input,message } from 'antd'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Layout/Spinner'
const Register = () => {
    const navigate = useNavigate()
    const [loading,setloading] = useState(false); //spinner

    //form submit
    const submitHandler = async(values)=>{
        try{
            setloading(true);    //spinner
            await axios.post('/users/register',values)
            message.success('Registration Succesfull')
            setloading(false);     //spinner
            navigate('/login')
        } catch(error){
            setloading(false);     //spinner
            message.error ('invalid username or password')

        }
    };


    // prevent  for login user
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    },[navigate]);
  return (
    <>
    <div className='register-page'>
        {loading && <Spinner></Spinner>}
        <Form layout='vertical' onFinish={submitHandler}>
            <h1>Register Form</h1>
            <Form.Item label="Name" name="name"> 
                <Input></Input>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email'></Input>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input></Input>
            </Form.Item>
            <div className="d-flex justify-content-between">
                <Link to="/login">Already Register ? Click Here to login </Link>
                <button className='btn btn-primary'> Register </button>
            </div>
        </Form>
    </div>
    </>
  )
}

export default Register