import { create } from 'zustand';
import { AuthenticationResponse } from '../model/AppUser';

interface UserStore {
  appUser: AuthenticationResponse | undefined;
  login: (appUser: AuthenticationResponse) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>(set => ({
  appUser: undefined,
  login: appUser => set(store => ({ appUser: appUser })),
  logout: () => set(store => {
    localStorage.removeItem('userData')
    return { appUser: undefined }
  }),
}));

export default useUserStore;
