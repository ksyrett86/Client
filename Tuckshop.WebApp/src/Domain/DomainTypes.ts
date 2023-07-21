import { AppServices } from '@singularsystems/neo-core';
import { AppService, Types as AppTypes } from '../App/Services/AppService';
import { DomainExportedTypes } from './DomainExportedTypes';
import { DomainDataCache } from './Services/DomainDataCache';

// Symbols specific to this module.
const DomainTypes = {
    ApiClients: {

    },
    Services: {
        ...DomainExportedTypes.Services,
        DataCache: new AppServices.ServiceIdentifier<DomainDataCache>("Domain.Services.DataCache"),
    }
}

// Merged symbols from app for convenience.
const Types = {
    ...AppTypes,
    Domain: DomainTypes
}

export { AppService, Types, DomainTypes }