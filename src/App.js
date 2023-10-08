import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { useSelector } from 'react-redux'
import { Home } from './components/portfolio/home'
import { Lateral } from './components/portfolio/lateral'
import { Nav } from './components/portfolio/nav'
import { Footer } from './components/portfolio/footer'
import { Skills } from './components/portfolio/skills'
import { Projects } from './components/portfolio/projects'
import { Contact } from './components/portfolio/contact'
import { userSelector } from './store/selectors/user.selector'
import { Login } from './components/admin/login'
import { Admin } from './components/admin/admin'
import { AuthProvider } from './context/authContext'
import { ProtectedRoute } from './context/protectedRoute'

function App() {
    const navigate = useNavigate()
    const user = useSelector(userSelector)

    useEffect(() => {
        if (user) {
            console.log('logedIn')
        }
    }, [])

    return (
        <div>
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
        </div>
    )
}

export default App
