import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../lib/supabase';

interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser]       = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);

    // useEffect(() => {
    //     const loadUser = async () => {
    //     try {
    //         setLoading(true);
    //         const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    //         if (authError) throw authError;

    //         if (authUser?.email) {
    //         const { data, error: fetchError } = await supabase
    //             .from('users')
    //             .select('*')
    //             .eq('email', authUser.email)
    //             .maybeSingle();

    //         if (fetchError) throw fetchError;
    //         setUser(data);
    //         }
    //     } catch (err) {
    //         setError(err instanceof Error ? err.message : 'An error occurred');
    //     } finally {
    //         setLoading(false);
    //     }
    //     };

    //     loadUser();
    // }, []);

    return (
        <AuthContext.Provider value={{}}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
