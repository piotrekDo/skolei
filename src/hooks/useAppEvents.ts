import { fetchEventSource } from '@microsoft/fetch-event-source';
import { BASE_URL } from '../config';
import useUserStore from '../service/useUserStore';
import useErrorStore from '../service/useErrorState';

const useAppEvents = () => {
  const { appUser } = useUserStore();
  const setError = useErrorStore((s) => s.setError);
  let reconnectTimeout : number;

  const subscribe = () => {
    fetchEventSource(`${BASE_URL}/sse/subscribe?userEmail=${appUser?.userEmail}`, {
      headers: {
        Authorization: `Bearer ${appUser?.jwtToken}`,
      },
      onmessage(event) {
        clearTimeout(reconnectTimeout);
        console.log(event);
      },
      onclose() {
        console.log('Connection closed by the server');
        setError({
          code: 0,
          message: '',
          details: 'Lost connection with notification server.'
        })
      },
      onerror(err) {
        console.log('There was an error from server');
        console.log(err)
        setError({
          code: 0,
          message: '',
          details: 'There is a problem with server'
        })
      },
      openWhenHidden: true,
    });
  };

  return { subscribe };
};

export default useAppEvents;
