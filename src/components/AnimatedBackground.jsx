import { useEffect } from "react";
import styles from "./animatedbg.module.css";

export default function AnimatedBackground(){
   let viewport = window.innerWidth;
   
   useEffect(() => {
      viewport = window.innerWidth;
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