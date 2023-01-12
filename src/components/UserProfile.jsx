import { useEffect } from "react"
import { useState } from "react"

export default function UserProfile({userImage,userName,setUserDetails}){
 
   const [themeChangeValue,setThemeChangeVaue] = useState("")
   const [wantsChange,setWantsChange] = useState(false)
   const [openedProfile,setOpenedProfile] = useState(false)
   const [changedImage,setChangedImage] = useState(null)
   const [haveChangedImage,setHaveChangedImage] = useState(false)
   const [openPrompt,setOpenPrompt] = useState(false)
   const [wantsImageReplace,setWantsImageReplace] = useState(false)
   const [themeAlert,setThemeAlert] = useState(false)



  
   // when  themeChange Form is submitted
   function handleSubmit(e){
      e.preventDefault()
      if(themeChangeValue){
         setUserDetails(prev => {
            return {...prev,userPictureBackground:themeChangeValue}
         })
      }
      setWantsChange(!wantsChange)
   }

   function handleChangeAlertText(text){
      if(text === "Change"){
         setThemeAlert(true)
         setTimeout(() => {
            setThemeAlert(false)
         }, 3000);
      }
   }
   

   function handleUserChange(value){
      if(value !== ""){
         setThemeChangeVaue(value)
      }
   }

   function changeProfileImage(image){
      if(image){
         const fileReader = new FileReader;
         fileReader.readAsDataURL(image)
         fileReader.addEventListener('load',() => {
            setChangedImage(fileReader.result)
         })
      }
   }

   function handleChangedProfile(e){
      changeProfileImage(e.target.files[0])
      setWantsImageReplace(!wantsImageReplace)
      setOpenPrompt(!openPrompt)
   }

   useEffect(()  => {
      if(changedImage){
         setUserDetails(prev => {
            return {...prev,userImage:changedImage}
         })
         setChangedImage(null)
      }
   })

   useEffect(() => {
      if(themeChangeValue){
         setUserDetails(prev => {
            return {...prev,userPictureBackground:themeChangeValue}
         })
      }
   },[wantsChange])

   return(
      <>
         {!openedProfile && 
            // profile section icon indicator / toggle
            <button 
              onClick={() => setOpenedProfile(!openedProfile)} 
              aria-controls="user-profile" 
              aria-expanded={openedProfile}
              className="profile-icon"
              >
               <img 
                  src="/images/profile.png" 
                  alt="Open your profile"  
               />
            </button>
         }
         
         {openedProfile &&
            <div className="user-profile" id="user-profile">
               <img 
                  src="/images/icon-close.svg" 
                  alt="Close Profile" 
                  aria-controls="user-profile" 
                  aria-expanded={openedProfile} 
                  className="close-profile"
                  onClick={() => setOpenedProfile(!openedProfile)}
               />
               {userImage !== null ?
                 <div>
                    <div className="replaceImage-area">
                        {openPrompt && !wantsImageReplace ?
                           // when the prompt is opened requesting image change
                           <p className="wants-replace" id="wants-replace">Replace Profile Picture ?
                              <button onClick={() => setWantsImageReplace(true)} className="wants-replaceBtn">Yes</button>
                              <button onClick={() => setOpenPrompt(false)} aria-expanded={openPrompt} aria-controls="wants-replace">
                                 <img src="/images/icon-close.svg" alt="Close prompt" />
                              </button>
                           </p>
                           :
                           ""
                           }


                           {wantsImageReplace &&
                              // when user accepts to change profile image
                              <div id="input-newImage">
                              <label htmlFor="select-image">Choose Profile Image</label>
                              <input 
                                 type="file"
                                 id="select-image"
                                 className="replace-imageBtn"
                                 accept="image/jpeg, image/png, image/jpg"  
                                 onChange={(e) => handleChangedProfile(e)}
                              />
                              <button 
                                aria-expanded={wantsImageReplace} 
                                aria-controls="input-newImage" 
                                onClick={() => setWantsImageReplace(false)}
                                className="cancel-imageInput"
                                >
                                 <img src="/images/icon-close.svg" alt="Close prompt" />
                              </button>
                              </div>
                           }
                    </div>
                    <img 
                     src={userImage} 
                     alt=" profile image" 
                     onClick={() => setOpenPrompt(true)}
                  />
                 </div>
                 : 
                  <div>
                     <label htmlFor="select-image">Choose Profile Image</label>
                     <input 
                        type="file"
                        id="select-image"
                        className="add-imageBtn"
                        accept="image/jpeg, image/png, image/jpg"  
                        onChange={(e) => changeProfileImage(e.target.files[0])}
                     />
                  </div>
                  }
               <h3>Hi {userName}</h3>
               <div>
                  <form onSubmit={handleSubmit}>
                     <p>{themeAlert ? "Changing....Will Show up when ready" : "Want To Change Background?"}</p>
                     {wantsChange &&  
                     <div>
                        <label htmlFor="changeTheme">Input New Picture Background Type</label>
                        <input type="text" id="changeTheme" onChange={(e) => handleUserChange(e.target.value)}/> 
                     </div>
                     }
                     {wantsChange ? 
                     <button className="accept-change" onClick={() => handleChangeAlertText("Change")}>Change</button>
                     :
                     <button className="accept-change">Yes</button>
                     }
                  </form>
               </div>
            </div>
         }
      </>
   )
}