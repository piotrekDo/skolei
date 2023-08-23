import { create } from 'zustand';
import { Event } from '../model/Notification';

interface AppNotificationsStore {
  notifications: Event[];
  addNotification: (event: Event) => void;
  removeNotification: (event: Event) => void;
  clearNotifications: () => void;
}

const useAppNotificationsStore = create<AppNotificationsStore>(set => ({
  notifications: [],
  addNotification: event =>
    set(store => ({
      ...store,
      notifications: [...store.notifications, event],
    })),
  removeNotification: event =>
    set(store => ({
      ...store,
      notifications: store.notifications.filter(n => n !== event),
    })),
  clearNotifications: () =>
    set(store => ({
      ...store,
      notifications: [],
    })),
}));

export default useAppNotificationsStore;
