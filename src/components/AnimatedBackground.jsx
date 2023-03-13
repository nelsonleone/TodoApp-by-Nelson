import { useEffect, useState } from "react";
import styles from "./animatedbg.module.css";

export default function AnimatedBackground(){
  const [viewport,setViewport] = useState(window.innerWidth)
   
   useEffect(() => {
      function resize(){
         window.addEventListener('resize',() => {
            setViewport(window.innerWidth)
         })
      }
      resize()
      return() => removeEventListener('resize',resize)
   },[viewport])

   return(
      <>
         {viewport > 480 ? 
         <ul className={styles.shapes}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
         </ul>
         :
         ""
      }
      </>
   )
}