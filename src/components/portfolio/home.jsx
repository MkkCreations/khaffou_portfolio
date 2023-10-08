import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { USER_URL } from "../../constants/httpConstants"
import avatar from "../../assets/images/avatar-90.png"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/actions/user.action"
import { userSelector } from "../../store/selectors/user.selector"

export const Home = () => {
    const { http } = useAuth()
    const [userData, setUserData] = React.useState({})
    const dispatch = useDispatch()
    const userRedux = useSelector(userSelector)

    const fetchData = async () => {
        await http.get(USER_URL + '/data')
            .then(res => {
                console.log(res.data)
                const data = res.data
                setUserData(res.data)
                dispatch(setUser(data))
            })
            .catch(err => {console.log(err)})
    }

    React.useEffect(() => {
        if (userRedux.user) {
            setUserData(userRedux.user)
            return
        }
        fetchData()
    }, [])
    return (
        <div className='home-container'>
            <div className='home-container__left-side'>
                <p>Welcome to my website</p>
                <h1>{userData.name}</h1>
                <h2>Web Developer <h3>(Full-Stack)</h3></h2>
                <p>{userData.bio}</p>
                <Link to='/projects' type="button" className="home-container__left-side__btn">Check out my projects!</Link>
            </div>
            <div className='home-container__right-side'>
                <img src={userData.image ? userData.image : avatar} alt="Khaffou" className='home-container__right-side__img' />
            </div>
        </div>
    )
}