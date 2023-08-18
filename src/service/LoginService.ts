import { AuthenticationRequest, AuthenticationResponse } from '../model/AppUser';
import APIclient from './APIclient';

class LoginService {
  login(authRequest: AuthenticationRequest) {
    const controller = new AbortController();
    const httpRequest = APIclient.post<AuthenticationResponse>('/login', authRequest);
    return { request: httpRequest, cancel: () => controller.abort() };
  }

  storeLoginData(appUser: AuthenticationResponse, logoutCallback: (mils: number) => void) {
    localStorage.setItem('userData', JSON.stringify(appUser));
    setLogoutTimer(appUser, logoutCallback);
  }

  checkAutoLogin(logoutCallback: (mils: number) => void): AuthenticationResponse | undefined {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return undefined;
    const appUser: AuthenticationResponse = JSON.parse(userDataString);
    if (checkIfTokenIsValid(appUser)) {
      setLogoutTimer(appUser, logoutCallback);
      return appUser;
    }
    return undefined;
  }
}

export function checkIfTokenIsValid(appUser: AuthenticationResponse): boolean {
    console.log(appUser.jwtExpiresAtTimestamp - new Date().getDate() - 900000)
  return (appUser.jwtExpiresAtTimestamp - new Date().getDate() - 900000) > 0;
}

function setLogoutTimer(appUser: AuthenticationResponse, logoutCallback: (mils: number) => void) {
  console.log(new Date().getTime());
  console.log(appUser.jwtExpiresAtTimestamp);
  console.log(new Date(appUser.jwtExpiresAtTimestamp));

  const milliseconds = appUser.jwtExpiresAtTimestamp - new Date().getTime();
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  console.log(`${hours}h ${minutes}m ${remainingSeconds}s`);
  setTimeout(() => {
    logoutCallback(Math.floor(milliseconds / 1000));
  }, milliseconds - 60000);
}

export default new LoginService();
