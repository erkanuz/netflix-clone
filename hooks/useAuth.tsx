import { auth } from '@/firebase';
import { useRouter } from 'next/router';
import { Children, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, } from "firebase/auth";
import toast from 'react-hot-toast';

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    const toastStyle = {
      color: 'black',
      fontSize: '16px',
      borderRadius: '9999px',
      maxWidth: '1000px'
    }

    useEffect(() => onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/welcome')
      }

      setInitialLoading(false)
    }),
    [auth]
    )

    const signUp = async ( email:string, password:string ) => {
      setLoading(true)

      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      }).catch((error) => alert(error.message)).finally(() => setLoading(false))
    }

    const signIn = async ( email:string, password:string ) => {
      setLoading(true)

      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        toast.success(`Login Successful`, {style: toastStyle})
        setLoading(false)
      }).catch((error) => toast.error(`Wrong email or password, please try again !`, {style: toastStyle})).finally(() => setLoading(false))
    }

    const logout = async () => {
      setLoading(true)

      signOut(auth).then(() => {
        setUser(null)
      }).catch((error) => alert(error.message)).finally(() => setLoading(false))
    }

    const memoedValue = useMemo(() => ({
      user, signUp, signIn, loading, logout, error
    }), [user, loading])

  return (
    <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}