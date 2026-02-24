import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Part 6: AuthStateManagement - check if user logged in
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('access');

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user from localStorage');
                localStorage.clear();
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, tokens) => {
        // Part 1: Save tokens and user to state and localStorage
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('access', tokens.access);
        if (tokens.refresh) {
            localStorage.setItem('refresh', tokens.refresh);
        }
    };

    const logout = () => {
        // Part 6: logout must clear localStorage and set state
        setUser(null);
        localStorage.clear();
    };

    const updateUser = (updatedData) => {
        const newData = { ...user, ...updatedData };
        setUser(newData);
        localStorage.setItem('user', JSON.stringify(newData));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
