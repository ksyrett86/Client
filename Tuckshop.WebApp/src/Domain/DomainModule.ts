import { AppServices } from '@singularsystems/neo-core';
import { DomainTypes } from './DomainTypes';
import { DomainDataCache } from './Services/DomainDataCache';

export const DomainAppModule = new AppServices.Module("Domain", container => {

    // Api Clients
    // container.bind(DomainTypes.ApiClients.ApiClient).to(ApiClient).inSingletonScope();
    
    // Services
    container.bind(DomainTypes.Services.DataCache).to(DomainDataCache).inSingletonScope();
});

export const DomainTestModule = new AppServices.Module("Domain", container => {
    // bind test types
});