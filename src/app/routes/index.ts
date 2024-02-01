import express from 'express';
import { UsersRoutes } from '../modules/users/users.route';
import { CowRoutes } from '../modules/cow/cow.routes';
import { OrderRoutes } from '../modules/order/order.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { SellerRoute } from '../modules/seller/seller.route';
import { BuyerRoute } from '../modules/buyer/buyer.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/seller',
    route: SellerRoute,
  },
  {
    path: '/buyer',
    route: BuyerRoute,
  },
  {
    path: '/cow',
    route: CowRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
