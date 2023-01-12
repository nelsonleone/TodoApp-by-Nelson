import { useEffect } from "react";
import { useState } from "react";
import styles from './signup.module.css';

export default function Signup({setUserDetails,setSignedUp,setErrorSignup,errorSignup,setLoaded,setNewUser}){
   const [output,setOutput] = useState(null)
   const [formData,setFormData] = useState({
      userName:"",
      location:"",
      pictureTheme:"",
   })

   function handleChange(e){
      const {name,value} = e.target;

      setFormData(prevData => {
         return {...prevData,[name]:value}
      })
      setErrorSignup(false)
      getUserImageInput()
   }

   function handleSubmit(e){
      e.preventDefault()
      
      if(formData.userName !== "" && formData.location !== ""){
         const {userName,location,pictureTheme} = formData;
         setUserDetails(prev =>  {
            return {...prev,userName:userName,userLocation:location,userPictureBackground:pictureTheme}
         })
         setSignedUp(true)
         setTimeout(() => {
            setLoaded(true)
            setNewUser(false)
            localStorage.setItem("newUser",newUser)
         }, 2000);
      }else{
         setErrorSignup(true)
      }
   }

   function getUserImageInput(imageData){
     if (imageData){
         const fileReader = new FileReader();
         fileReader.readAsDataURL(imageData);
         fileReader.addEventListener('load', () => {
            const result = fileReader.result;
            setOutput(result)
            setUserDetails(prev => {
               return {...prev,userImage:result}
            })
         })
      }
   }
  

   return(
      <section className={styles["signup-section"]}>
         <div className={styles["signup-contents"]}>
            <img src="/images/favicon.png" className={styles.companyLogo}/>
            <div className={styles.introText}>
               <h1>Welcome</h1>
               <p>SignUp to get started</p>
            </div>
            <form className={styles["signup-form"]} onSubmit={handleSubmit}>
               <div className={styles.usernameArea}>
                  <label htmlFor="username">Enter Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    placeholder="what's up .........?"
                    value={formData.userName}
                    name="userName"
                    onChange={handleChange}
                  />
               </div>

               <div className={styles.locationArea}>
                  <label htmlFor="location">Enter Your Location <span>(City Name)</span></label>
                  <input 
                    type="text" 
                    id="location" 
                    placeholder="e.g New York"
                    value={formData.location}
                    name="location"
                    onChange={handleChange}
                  />
               </div>

               <div className={styles.profilePicArea}>
                  <label htmlFor="profilepic">Choose Your Profile Picture</label>
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/jpg" 
                    id="profilepic"
                    onChange={(e) => getUserImageInput(e.target.files[0])}
                    value={formData.userImage}
                  />
                  <output id="image-output">
                     <img src={output} alt={output && "image"}/>
                  </output>
               </div>

               <div className={styles.themeArea}>
                  <label>Select Picture Background Type</label>
                  <select 
                    value={formData.pictureTheme} 
                    onChange={handleChange}
                    name="pictureTheme"
                    >
                     <option value="any">Any</option>
                     <option value="flowers">Flowers</option>
                     <option value="anime">anime</option>
                     <option value="ocean">Ocean</option>
                     <option value="vehicles">Vehicles</option>
                     <option value="dark-theme">Dark Theme</option>
                     <option value="travel">Travel</option>
                     <option value="architecture">Architecture</option>
                  </select>
               </div>
               {errorSignup && <p className={styles.errormessage}>Please Enter Valid Details</p>}
               <button type="submit">Sign up</button>
            </form>
         </div>
      </section>
   )
}