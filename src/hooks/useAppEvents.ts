import { fetchEventSource } from '@microsoft/fetch-event-source';
import { BASE_URL } from '../config';
import useUserStore from '../service/useUserStore';
import useErrorStore from '../service/useErrorState';
import { checkIfTokenIsValid } from '../service/LoginService';
import { NewPtoRequestEvent, PtoRequestResolvedEvent, SseEvent } from '../model/Notification';
import useAppNotificationsStore from '../service/useAppNotificationsStore';

const useAppEvents = () => {
  const { appUser } = useUserStore();
  const addNotification = useAppNotificationsStore(s => s.addNotification);
  const setError = useErrorStore(s => s.setError);
  let reconnectTimeout: number;
  let reconnectAttempts: number = 0;
  let eventSource: EventSource | void;
  const reconnectTimeoutInterval = 5000;

  const subscribe = async () => {
    if (!appUser) return;
    if (!checkIfTokenIsValid(appUser)) return;
    if (reconnectAttempts > 5) return;
    eventSource = await fetchEventSource(`${BASE_URL}/sse/subscribe?userEmail=${appUser?.userEmail}`, {
      headers: {
        Authorization: `Bearer ${appUser?.jwtToken}`,
      },
      onmessage(event) {
        clearTimeout(reconnectTimeout);
        // console.log(event);
        switch (event.id) {
          case 'NEW_PTO_REQUEST':
            const recivedData = JSON.parse(event.data);
            const newRequestEvent: NewPtoRequestEvent = {
              id: event.id,
              dateTime: recivedData.dateTime,
              ptoRequestId: recivedData.ptoRequestId,
              applierId: recivedData.applierId,
              applierFirstName: recivedData.applierFirstName,
              applierLastName: recivedData.applierLastName,
              applierEmail: recivedData.applierEmail,
            };
            console.log(newRequestEvent)
            addNotification(newRequestEvent);
            break;

          case 'PTO_REQUEST_RESOLVED':
            const resolvedData = JSON.parse(event.data);
            const requestResolvedEvent: PtoRequestResolvedEvent = {
              id: event.id,
              dateTime: recivedData.dateTime,
              ptoId: resolvedData.ptoId,
              ptoStart: resolvedData.ptoStart,
              ptoEnd: resolvedData.ptoEnd,
              accepted: resolvedData.accepted,
            };
            console.log(requestResolvedEvent)
            addNotification(requestResolvedEvent);
            break;

          default:
            // console.log(event.data);
        }
      },
      onclose() {
        console.log('Connection closed by the server');
        // setError({
        //   code: 0,
        //   message: '',
        //   details: 'Lost connection with notification server.',
        // });
      },
      onerror(err) {
        console.log('There was an error from the server');
        console.log(err);
        setError({
          code: 0,
          message: '',
          details: 'There is a problem with the server',
        });
      },
      openWhenHidden: true,
    });
    reconnectAttempts++;
    console.log(reconnectAttempts);
    console.log(eventSource);
  };

  const unsubscribe = () => {
    // console.log(eventSource);
    if (eventSource) {
      eventSource.close();
      eventSource = undefined;
      reconnectAttempts = 0;
    }
  };

  return { subscribe, unsubscribe };
};

export default useAppEvents;
