import { ReportingView } from '@singularsystems/neo-reporting';
import { IAppMenuItem, IAppRoute } from '../App/Services/RouteService';

import * as Roles from './Models/Security/Roles';

const MenuRoutes: IAppMenuItem[] = 
    [
        { name: "Reporting", path: "/reporting", component: ReportingView, role: Roles.General.View }
    ];
    
const PureRoutes: IAppRoute[] = [];

export { 
    MenuRoutes,
    PureRoutes
} 