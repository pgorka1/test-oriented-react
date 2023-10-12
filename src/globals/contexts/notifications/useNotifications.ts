import { useContext } from 'react';
import { NotificationsContext, NotificationsContextValue } from './NotificationsProvider';

export function useNotifications(): NotificationsContextValue {
    const contextValue = useContext(NotificationsContext);
    if (contextValue === null) {
        throw new Error('useService must be called within <NotificationsContext />.');
    }
    return contextValue;
}
