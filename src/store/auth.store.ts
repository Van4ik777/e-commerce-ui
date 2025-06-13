import { create } from 'zustand';
import { Cookies } from 'react-cookie';
import { authService } from '@/services/auth/auth.service';

const cookies = new Cookies();

interface AuthStore {
    isAuth: boolean;
    setAuth: (isAuth: boolean) => void;
    register: (data:{email: string, username: string, password: string}) => void;
    login: (data: { email: string; password: string }) => void;
    logout: () => void;
    getToken: (username: string, password: string) => void;
    checkEmail: (uuid: string, hash: string) => void;
}

export const useAuth= create<AuthStore>((set)=>({
    isAuth: Boolean(cookies.get('auth-token')),
    setAuth: (isAuth: boolean)=>set({isAuth}),

    
    register: async (data) => {
        try {
            console.log('Registering user with data:', data); 
            const response = await authService.register({
                email: data.email,
                username: data.username,
                password: data.password, 
            });          
            set({ isAuth: true });
            return response.data
        } catch (error) {
            console.error('Registration failed', error);
        }
    },

    login: async ({ email, password }) => {
        try {
            const response = await authService.login({ username: email, password });
            set({ isAuth: true });
        } catch (error) {
            console.error('Login failed', error);
        }
    },


    logout: () => {
        cookies.remove('auth_token');
        set({ isAuth: false });
    },

    getToken: async (username: string, password: string) => {
        try {
            const response = await authService.getToken({username, password});
            cookies.set('auth-token',response.token.access)
            cookies.set('refresh-token',response.token.refresh)
            return response.data
        } catch (error) {
            console.error('Error fetching tokens', error);
        }
    },
    checkEmail: async (uuid: string, token: string) => {
        try{
            const response = await authService.checkEmail({uuid, token})
            cookies.set('auth-token',response.token.access)
            cookies.set('refresh-token',response.token.refresh)
            return response.data
        }catch(error){
            console.error('Error checking email', error);
            throw new Error('wrong Data')

        }
    }
}))