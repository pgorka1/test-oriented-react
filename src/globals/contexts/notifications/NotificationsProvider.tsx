import React, { createContext, useState } from 'react';

export const NotificationsContext = createContext<NotificationsContextValue | null>(null);

type NotificationType = 'info' | 'error';

interface Notification {
    type: 'info' | 'error';
    message: string;
}

type ActiveNotification = Notification | null;

export type NotificationsContextValue = {
    activeNotification: ActiveNotification;
    setNotification(type: NotificationType, message: string): void;
    forceClose(): void;
};

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export function NotificationsProvider(props: Props): JSX.Element {
    const [notification, setActiveNotification] = useState<ActiveNotification>(null);
    return (
        <NotificationsContext.Provider
            value={{
                activeNotification: notification,
                setNotification: (type: NotificationType, message: string) => setActiveNotification({ type, message }),
                forceClose: () => setActiveNotification(null),
            }}
        >
            <>
                <div style={{ position: 'absolute', width: '200px', padding: '4px', top: '20px', right: '20px' }}>
                    {notification?.message}
                </div>
                {props.children}
            </>
        </NotificationsContext.Provider>
    );
}
