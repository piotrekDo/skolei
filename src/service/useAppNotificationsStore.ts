import { create } from 'zustand';
import { Event } from '../model/Notification';

interface AppNotificationsStore {
  notifications: Event[];
  unreadNotifications: number;
  addNotification: (event: Event) => void;
  removeNotification: (event: Event) => void;
  clearNotifications: () => void;
  clearUnreadNotifications: () => void;
}

const useAppNotificationsStore = create<AppNotificationsStore>(set => ({
  notifications: [],
  unreadNotifications: 0,
  addNotification: event =>
    set(store => ({
      ...store,
      notifications: [event, ...store.notifications],
      unreadNotifications: store.unreadNotifications + 1,
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
  clearUnreadNotifications: () =>
    set(store => ({
      ...store,
      unreadNotifications: 0,
    })),
}));

export default useAppNotificationsStore;
