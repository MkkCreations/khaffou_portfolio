import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './components/portfolio/home'
import { Lateral } from './components/portfolio/lateral'
import { Nav } from './components/portfolio/nav'
import { Footer } from './components/portfolio/footer'
import { Skills } from './components/portfolio/skills'
import { Projects } from './components/portfolio/projects'
import { Contact } from './components/portfolio/contact'
import { Login } from './components/admin/login'
import { Admin } from './components/admin/admin'
import { AuthProvider } from './context/authContext'
import { ProtectedRoute } from './context/protectedRoute'
import Presentation from './common/presentation'

function App() {
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setTimeout(()=>{
            setLoad(true);
        },3900)
    }, [])

    return (
        <div>
            {load ?
                <AuthProvider>
                    <Nav />
                    <Lateral />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path='/skills' element={<Skills />} />
                            <Route path='/projects' element={<Projects />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/admin' element={
                                <ProtectedRoute>
                                    <Admin />
                                </ProtectedRoute>
                            } />
                            <Route path="*" element={<h1>Not Found</h1>} />
                        </Routes>
                    <Footer />
                </AuthProvider>
                :
                <div>
                    <Presentation />
                </div>
            }
        </div>
    )
}

export default App
