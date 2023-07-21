import { IAppMenuItem, IAppRoute } from '../App/Services/RouteService';

const MenuRoutes: IAppMenuItem[] = 
    [
       { name: "Domain", path: "/Domain", component: null as any /* TODO: Make this an actual route. */ }
    ];

const PureRoutes: IAppRoute[] = [];

export { 
    MenuRoutes, 
    PureRoutes 
}