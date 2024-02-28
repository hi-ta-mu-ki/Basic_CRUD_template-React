import React, { createContext, useContext, ReactNode, useState } from 'react';

export type UserRole = 5 | 10; // Define your role types

interface UserContextProps {
    role: UserRole | 0;
    setRole: (role: UserRole | 0) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<UserRole | 0>(0);

    const logout = () => {
        setRole(0);
    };
    
    return (
    <UserContext.Provider value={{ role, setRole, logout }}>
        {children}
    </UserContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useRole must be used within a UserProvider');
    }
    return context;
};