import { useState } from 'react';
import { useEffect } from 'react';
import  axios, { Axios } from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Signup from './components/Signup';
import AnimatedBackground from './components/AnimatedBackground';
import UserWidjet from './components/UserWidjet';
import UserProfile from './components/UserProfile';
import Todo from './components/Todo';

function App() {
  const [userDetails,setUserDetails] = useState(
    localStorage.getItem("userDetails") ?
    JSON.parse(localStorage.getItem("userDetails"))
    :
    {
      userName:null,
      userImage:null,
      userLocation:null,
      userPictureBackground:null
    }
  )
  const [newUser,setNewUser] = useState(
    localStorage.getItem("newUser") !== null ?
    JSON.parse(localStorage.getItem("newUser"))
    :
    true
  )
  const [signedUp,setSignedUp] = useState(false)
  const [errorSignup,setErrorSignup] = useState(null)
  const [loaded,setLoaded] = useState(false)
  const [loggedIn,setLoggedIn] = useState(false)
  const URL = `https://api.unsplash.com/search/photos?client_id=xoPXj_WfascuWaqZykvvX23mXJZQaB2rklZHB0Wq6Bw&query=${userDetails.userPictureBackground}`
  const [appBackground,setAppBackground] = useState({
    backgroundImage:""
  })



  const [todos,setTodos]  = useState(
    localStorage.getItem("todoData") !== null 
    ?
    JSON.parse(localStorage.getItem("todoData"))
    :
    []
  )




  // fetching user pref image background
  useEffect(() => {
    axios.get(URL)
    .then(resp => {
      if(resp.data){
        const randomIndex = Math.ceil(Math.random() *  9)
        const bgImage = resp.data.results[randomIndex].urls.full
        setAppBackground({backgroundImage:bgImage});
      }else{
        setDefaultBackground({backgroundImage:`linear-gradient(to top right,#9090d448,#387989af)`})
      }
    })
    .catch(function(err){
      if(err){
        alert('Network error While loading Background Of Choice....You can Refresh')
      }
    })
  },[userDetails.userPictureBackground])



  // Saving Data
  useEffect(() => {
    if(!newUser){
      localStorage.setItem("newUser",JSON.stringify(newUser))
      localStorage.setItem("userDetails",JSON.stringify(userDetails))
    }
  })




  // effect for old users login
  // signup means logged in(window.onload .....in process) for old users
  useEffect(()  => {
    if(newUser === false){
      setSignedUp(true)
      setTimeout(() => {
        setLoaded(true)
      }, 2000);
    }
  },[])

  useEffect(()  => {
    if(todos !== null){
      localStorage.setItem("todoData",JSON.stringify(todos))
    }
  },[todos])


  return (
    <>
     {newUser ?
        <>
          <AnimatedBackground />
          <Signup
            setUserDetails={value => setUserDetails(value)}
            setSignedUp={value => setSignedUp(value)}
            setErrorSignup={value => setErrorSignup(value)}
            errorSignup={errorSignup}
            setNewUser={setNewUser}
            setLoaded={value => setLoaded(value)}
          />
        </>
        :
        ""
      }
      {signedUp && !loaded ? <LazyLoadImage src="/images/loadingg.svg" className='loading' /> :  ""}
      {loaded ?
        <main>

          {appBackground.backgroundImage  && 
            // Lazy loading the user-pref-background-image
            <>
            <LazyLoadImage src={appBackground.backgroundImage} className="user-prefBackground"/>
            </>
          }

        <UserWidjet
          userLocation={userDetails.userLocation}
          loaded={loaded}
          loggedIn={loggedIn}
        />

        <UserProfile
          userImage={userDetails.userImage}
          userName={userDetails.userName}
          setUserDetails={value => setUserDetails(value)}
        />

        <Todo 
          setTodos={value => setTodos(value)}
          todos={todos}
        />
        </main>
        :
        ""
      }
    </>
  )
}

export default App
