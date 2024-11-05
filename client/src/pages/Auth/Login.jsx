import { useMutation } from '@tanstack/react-query'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  let { loginMethod } = useContext(AuthContext)
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  // api calling
  const { mutate, isloading, isError, data,isSuccess, error: apiError } = useMutation({ mutationFn: login })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("please fill all the fields")
      return;
    }
    mutate(formData);
  }

  useEffect(() => {
    if (isSuccess && data) {
      loginMethod(data);
      navigate("/");
    } else if (isError) {
      setError(apiError?.message || "Login failed");
    }
  }, [isSuccess, isError, data, apiError, loginMethod, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    if (error) {
      setError();
    }
  }

  return (
    <div className='flex items-center h-[93vh]'>
      <div className='flex p-3 w-96 lg:max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        <div className='flex-1 '>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={isloading} className='mt-5 sm:w-full'>
              {isloading ?
                (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Sign In'
                )
              }
            </Button>
          </form>
          <div className='flex gap-2 text mt-5'>
            <span>Don't Have an account ?</span>
            <Link to="/register" className='text-blue-500'>Sign Up</Link>
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

export default Login