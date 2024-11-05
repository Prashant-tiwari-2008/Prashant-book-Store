import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/authService';
import { IoEye } from "react-icons/io5"; //<IoEye />
import { IoEyeOff } from "react-icons/io5"; //<IoEyeOff />

const Register = () => {
  const [formData, setFormData] = useState({});
  const [isPasswordVisibile, setIsPasswordVisibile] = useState(false)
  const [error, setError] = useState();
  // const [loading, setLoading] = useState();
  const navigation = useNavigate();
  const { mutate, isLoading, isError, error: apiError, isSuccess, data } = useMutation({ mutationFn: registerUser });

  const chanegPasswordView = () => {
    setIsPasswordVisibile(prev => !prev)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    if (error) {
      setError()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.password || !formData.role) {
      return setError("Please fill out all the fields")
    }
    mutate(formData);
    if (isSuccess) {
      console.log(data, "api response")
      navigation("/login")
      return
    }
    if (isError) {
      setError(apiError.message);
    }
  }

  return (
    <div className='flex items-center h-[93vh]'>
      <div className='flex p-3 w-96 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        <div className='flex-1'>
          <form action="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Name" />
              <TextInput
                type="text"
                id="firstName"
                placeholder="username"
                autoComplete='true'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                autoComplete='true'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type={isPasswordVisibile ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                autoComplete='true'
                rightIcon={isPasswordVisibile ? IoEye : IoEyeOff}
                onClick={chanegPasswordView}
                onChange={handleChange}
                style={{cursor : 'pointer'}}
              />
            </div>
            <div>
              <Label value="Role" />
              <Select defaultValue="center" id="role" onChange={handleChange}>
                <option value="">Select a role</option>
                <option value="buyer">BUYER</option>
                <option value="seller">SELLER</option>
              </Select>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={isLoading} className='mt-5 w-96 sm:w-full'>
              {isLoading ?
                (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Sign Up'
                )
              }
            </Button>
          </form>
          <div className='flex gap-2 text mt-5'>
            <span>Have an account ?</span>
            <Link to="/login" className='text-blue-500'>Sign In</Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register