import { lazy } from 'react'
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"))

export const sellerRoutes = [
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        role: 'seller',
        status: 'active'
    },]