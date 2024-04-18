import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import HomePage from 'pages/HomePage/HomePage';
import ProductPage from 'pages/ProductPage/ProductPage';
import CustomersPage from 'pages/CustomersPage/CustomersPage.jsx';
import IncomePage from 'pages/IncomePage/IncomePage';
import PromotePage from 'pages/PromotePage/PromotePage';
import HelpPage from 'pages/HelpPage/HelpPage';

import css from './App.module.css';

import * as ROUTES from '../constants/routes';

const appRoutes = [
  {
    path: ROUTES.HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: ROUTES.PRODUCT_ROUTE,
    element: <ProductPage />,
  },
  {
    path: ROUTES.CUSTOMERS_ROUTE,
    element: <CustomersPage />,
  },
  {
    path: ROUTES.INCOME_ROUTE,
    element: <IncomePage />,
  },
  {
    path: ROUTES.PROMOTE_ROUTE,
    element: <PromotePage />,
  },
  {
    path: ROUTES.HELP_ROUTE,
    element: <HelpPage />,
  },
];
export const App = () => {
  return (
    <Layout className={css.layout}>
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Layout>
  );
};
