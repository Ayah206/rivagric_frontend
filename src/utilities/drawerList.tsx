import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BusinessIcon from '@mui/icons-material/Business';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const list = ['admins management','Manage company', 'manage drivers','manage riders', 'manage documents', 'send messages', 'manage emails', 'manage manual bookings', 'vehicles managing', 'additionalreasons', 'cancellation reasons', 
'manage locations', 'fair management', 'trips management', 'manage payouts', 'manage owe amount', 'manage statements', 'manage wallet & promo',
'referalls', 'manage map', 'manage mobile app version', 'api credentials', 'payment gateway', 'fees management', 'manage referal settings',
'metas management', 'manage country', 'manage currency', 'manage language', 'manage static pages', 'manage help', 'social apps and links',
'manage support', 'system configuration']
export function DrawerList(){
    return ([
        {
            name: 'dashboard',
            icon: <DashboardIcon/>,
            href: 'dashboard'
        },
        {
            name: 'manage users',
            icon: <AdminPanelSettingsIcon/>,
            href: 'manage-users'
        },
        {
            name: 'manage businesses',
            icon: <BusinessIcon/>,
            href: 'manage-businesses'
        },
        {
            name: 'manage operations',
            icon: <AgricultureIcon/>,
            href: 'manage-operations'
        },
        {
            name: 'manage categories',
            icon: <CategoryIcon/>,
            href: 'manage-categories'
        },
        {
            name: 'manage products',
            icon: <ShoppingCartIcon/>,
            href: 'manage-products'
        },
        {
            name: 'user guidelines',
            icon: <ArticleIcon/>,
            href: 'user-guidelines'
        }
    ])
}