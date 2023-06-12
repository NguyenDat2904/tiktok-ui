import HeaderOnly from '~/layouts/HeaderOnly/HeaderOnly';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Explore from '~/pages/Explore';
import { routes } from '~/config/routes';

export const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.following,
        component: Following,
    },
    {
        path: routes.profile,
        component: Profile,
    },
    {
        path: routes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: routes.search,
        component: Search,
        layout: null,
    },
    {
        path: routes.live,
        component: Live,
    },
    {
        path: routes.explore,
        component: Explore,
    },
];
export const privateRoutes = [];
