'use client'

import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const params = useSearchParams()
  const isReg = params.get('register')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistration, setIsRegistration] = useState(isReg)
  const [error, setError] = useState(null)
  const [authtenticating, setAuthenticating] = useState(false)

  const { signUp, login } = useAuth()

  async function handleAuth() {
    if(!email || !email.includes('@') || !password || password.length < 6 || authtenticating) return
    setError(null)
    setAuthenticating(true)
    try {
      if(isRegistration) {
        //register a user
        await signUp(email, password)
      } else {
        //login a user
        await login(email, password)
      }
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className="login">
      <h2>{isRegistration ? 'Create an account' : 'Log In'}</h2>
      {error && (<div className="card">
        <p>❌ {error}</p>
      </div>)}
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
      <button onClick={handleAuth} disabled={authtenticating}>
        {authtenticating ? 'Submitting' : 'Submit'}
      </button>
      <div className="full-line" />
      <div>
        <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
        <button onClick={() => setIsRegistration(!isRegistration)}>{isRegistration ? 'Log In' : 'Sign up'}</button>
      </div>
    </div>
  )
}