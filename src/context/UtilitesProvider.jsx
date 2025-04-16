import { createContext, useState } from "react"

export const UtilitesContext = createContext(null);

const UtilitesProvider = ({children}) => {
   const [sign, setSignIn] = useState(false);
   const [rating, setRating] = useState(0);

   
   const utilitesInfo = {
    sign,
    setSignIn,
    rating, 
    setRating
   }

  return (
    <UtilitesContext.Provider value={utilitesInfo}>
        {children}
    </UtilitesContext.Provider>
  )
}

export default UtilitesProvider