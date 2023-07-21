import { Routing as NeoRouting } from '@singularsystems/neo-core';
import { Routing } from '@singularsystems/neo-react';
import { injectable } from 'inversify';
import { AppService, Types } from './AppService';
import Home from '../Views/Home';
import NotFound from '../Components/404NotFound';
import OidcLoginRedirect from '../Views/Security/OidcLoginRedirect';
import { AppConfig } from '../Models/AppConfig';
import { SecurityRoute } from '@singularsystems/neo-authorisation';
import { TemplateLayoutsView, TemplatesView, NotificationSettingsView, NotificationsView, NotificationsRoles } from '@singularsystems/neo-notifications';

import * as DomainRoutes from '../../Domain/DomainRoutes';
import * as IdentityRoutes from '../../Identity/IdentityRoutes';
import * as ReportingRoutes from '../../Reporting/ReportingRoutes';

interface ICommonAppRouteProps {
    /** TODO: Add any custom route props here, like userType. */
}

export interface IAppRoute extends NeoRouting.IRoute, ICommonAppRouteProps {

}

export interface IAppMenuItem extends NeoRouting.IMenuRoute, ICommonAppRouteProps {

}

@injectable()
export class RouteService {

    private routeProvider: Routing.RouteProvider;

    constructor(private config = AppService.get(Types.App.Config)) {
        
        this.routeProvider = new Routing.RouteProvider(
            this.getMenuRoutes(),
            this.getPureRoutes(),
            NotFound,
        )
    }

    /**
     * Gets the routes provider
     */
    public get routes(): Routing.RouteProvider {
        return this.routeProvider;
    }

    private getMenuRoutes(): IAppMenuItem[] {
        return [
            {
                name: "Home", path: '/', component: Home, icon: "home", exact: true, allowAnonymous: true
            },
			...DomainRoutes.MenuRoutes,
            ...ReportingRoutes.MenuRoutes,
            { name: "Notifications", children: [
                { name: "Template layouts", path: "/templateLayouts", component: TemplateLayoutsView, role: NotificationsRoles.SetupLayouts },
                { name: "Templates", path: "/templates", component: TemplatesView, role: NotificationsRoles.SetupTemplates },
                { name: "Notification settings", path: "/notification-settings", component: NotificationSettingsView, role: NotificationsRoles.ConfigureSettings },
                { name: "View notifications", path: "/notifications", component: NotificationsView, role: NotificationsRoles.ViewSentNotifications },
            ]},
            this.getAdministrationRoute(),
        ]
    }

    private getAdministrationRoute() {
        var adminRoute = { name: "Administration", children: [
                SecurityRoute,
            ...IdentityRoutes.IdentityMenuRoutes,
        ]};

        if (this.config.isDevelopment) {
            adminRoute.children.push(IdentityRoutes.SecurityConfigRoute);
        }
        return adminRoute;
    }


    private getPureRoutes(): IAppRoute[] {
        const pureRoutes = [
            {
                path: AppConfig.loginRedirectRoute, component: OidcLoginRedirect, allowAnonymous: true
            },
			...DomainRoutes.PureRoutes,
            ...ReportingRoutes.PureRoutes,
        ];

        if (!this.config.isDevelopment) {
            pureRoutes.push(IdentityRoutes.SecurityConfigRoute);
        }

        return pureRoutes;
    }
}