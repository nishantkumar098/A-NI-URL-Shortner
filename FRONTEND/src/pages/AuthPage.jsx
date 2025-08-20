import React, { useEffect, useRef, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { gsap } from 'gsap'

const AuthPage = () => {

    const [login, setLogin] = useState(true)
    const containerRef = useRef(null)
    const cardRef = useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        }
        if (cardRef.current) {
            gsap.fromTo(cardRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        }
    }, [login])

    return (
        <div ref={containerRef} className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center p-4">
            <div ref={cardRef} className="w-full max-w-xl">
                {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
            </div>
        </div>
    )
}

export default AuthPage