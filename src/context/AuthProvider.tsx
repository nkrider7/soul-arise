import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '~/src/config/firebase';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '~/src/store/hook/hook';
import { login, logout } from '~/src/store/slices/authSlice';

const AuthContext = createContext<{ user: any | null }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const dispatch = useAppDispatch(); // ✅ Add Dispatch

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // ✅ Dispatch Redux login
        dispatch(login({ uid: firebaseUser.uid, email: firebaseUser.email ?? '' }));

        console.log('User already logged in');
        router.replace('/(tabs)');
      } else {
        setUser(null);

        // ✅ Dispatch Redux logout
        dispatch(logout());

        console.log('No user logged in');
        router.replace('/(onboard)/login'); // Go back to login screen
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
