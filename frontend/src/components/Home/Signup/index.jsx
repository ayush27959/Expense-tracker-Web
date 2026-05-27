import Homelayout from "../../../layout/Homelayout";
import {LockOutlined, UserOutlined,PhoneOutlined} from "@ant-design/icons"
import { Form, Input ,Card } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import http from "../../../utils/http";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL


const {Item} =Form;

const Signup =() =>{
const [signupForm]=Form.useForm();
    const [fromData,setFormData]=useState(null);
    const [otp,setOtp]=useState(null);
    const [loading,setLoading]=useState(false);

const onFinish=async(values)=>{
   try{
        setLoading(true);
const {data}=await http.post("/api/user/send-mail",values);
setOtp(data.otp);
setFormData(values);
   }
   catch(err){
    toast.error(err.response ? err.response.data.message : err.message)
    setOtp(null);
    setFormData(null);
   } finally{
    setLoading(false);
   }
}
const onSignup=async(values)=>{
   try{
       if(Number(values.otp) !== Number(otp))
        return  toast.error("OTP Not match");
    setLoading(true);
await http.post("/api/user/signup", fromData);

    // await axios.post("/api/user/signup",formData);
    
    toast.success("Signup success ");
setOtp(null);
setFormData(null); 
signupForm.resetFields();
   }
   catch(err){
    setOtp(null);
    setFormData(null);
    toast.error(err.response ? err.response.data.message : err.message);
   } finally{
    setLoading(false);
   }
}
    return(
<Homelayout>
    <div className="flex">
<div className="w-1/2 hidden md:flex items-center justify-content-center ">
<img 
src="/exp-img.jpg"
alt="Bank"
className="w-4/5 object-contain"
/>
</div>
<div className="w-full md:w-1/2 flex items-center justify-content-center p-2 md:p-6 bg-white">
     <Card className='w-full max-w-sm shadow-xl '>
    <h1 className="font-bold text-[#FF7335C] text-2xl text-center mb-6">
        Track your Expense 
    </h1>
    <h6 className="font-bold !text-[#FF735c]  text-center mb-6">
    VERIFY YOUr EMAIL
    </h6>
{
    otp?
    <Form name="Login-form" layout="vertical"  
    onFinish={onSignup}
    >
    <Item name='otp'
    label="OTP"
    rules={[{required:true}]}>
        <Input.OTP prefix={<UserOutlined />}
        
        placeholder="Enter your OTP"
        />
        
    </Item> 
<Item>
        <Button type="text"
      loading={loading}
        htmlType="submit"
        block
        className='!bg-[#FF735C] !text-white !font-bold ' >
            Verify Now 
        </Button>
    </Item>
</Form>
:
<Form name="Login-form" layout="vertical"  onFinish={onFinish} form={signupForm}>
    <Item name='fullname'
    label="fullname"
    rules={[{required:true}]}>
        <Input prefix={<UserOutlined />}
        
        placeholder="Enter your fullname"
        />
        
    </Item> 
    <Item name='mobile'
    label="mobile"
    rules={[{required:true}]}>
        <Input prefix={<PhoneOutlined />}
        
        placeholder="Enter your mobile number"
        />
        
    </Item> 
    <Item name='email'
    label="Email"
    rules={[{required:true}]}>
        <Input prefix={<UserOutlined />}
        
        placeholder="Enter the Email"
        />
        
    </Item> 
    <Item name='password'
    label="password"
    rules={[{required:true}]}>
        <Input.Password prefix={<LockOutlined />}
        
        placeholder="Enter the password"
        />
        
    </Item> 

    <Item>
        <Button type="text"
        loading={loading}
        htmlType="submit"
        block
        className='!bg-[#FF735C] !text-white !font-bold ' >
            Signup
        </Button>
    </Item>
</Form>


}
<div className="flex justify-end">
  <Link
    to="/home"
    className="text-[#FF735C] font-bold underline"
  >
    Already have an account
  </Link>
</div>



   </Card>
</div>

  </div>
</Homelayout>
  
    )
}
export default Signup;