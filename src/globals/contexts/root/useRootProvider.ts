import { useContext } from 'react';
import { ProvidersContext } from './RootSourcesProvider';
import type { GlobalStore } from '../../models';

export function useRootProvider<DomainName extends keyof GlobalStore>(domainName: DomainName): GlobalStore[DomainName] {
    const contextValue = useContext(ProvidersContext);
    if (contextValue === null) {
        throw new Error('useRootProvider must be called within <RootSourcesProvider />.');
    }
    return contextValue[domainName];
}
