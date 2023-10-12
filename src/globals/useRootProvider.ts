import { useContext } from 'react';
import { ServicesContext } from './RootServicesProvider';
import type { GlobalStore } from './models/GlobalStore';

export function useRootProvider<DomainName extends keyof GlobalStore>(domainName: DomainName): GlobalStore[DomainName] {
    const contextValue = useContext(ServicesContext);
    if (contextValue === null) {
        throw new Error('useService must be called within <ServicesContext />.');
    }
    return contextValue[domainName];
}
