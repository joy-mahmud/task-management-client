import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    //create an user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //user login with email and password
    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //signin with google 
    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }
    //user logout
    const userLogOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)

        })
        return () => {
            return unsubscribe()
        }
    }, [])
    const authInfo = { user, loading,userLogin,userLogOut,googleSignIn,createUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;