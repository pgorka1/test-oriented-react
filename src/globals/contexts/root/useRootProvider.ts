import { useContext } from 'react';
import { ServicesContext } from './RootSourcesProvider';
import type { GlobalStore } from '../../models/GlobalStore';

export function useRootProvider<DomainName extends keyof GlobalStore>(domainName: DomainName): GlobalStore[DomainName] {
    const contextValue = useContext(ServicesContext);
    if (contextValue === null) {
        throw new Error('useRootProvider must be called within <RootSourcesProvider />.');
    }
    return contextValue[domainName];
}
