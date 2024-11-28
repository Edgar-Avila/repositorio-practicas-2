import MenuMain from '@/pages/app/menu/Main'
import { Navigate, RouteProps } from 'react-router-dom'

import { getAuthUser, ROLESTYPES } from '@/context'

import { lazy } from 'react'

//Dashboards
const AnalyticsDashboard = lazy(() => import('@/pages/dashboards/Analytics'))
const SalesDashboard = lazy(() => import('@/pages/dashboards/Sales'))

//Apps
const Inbox = lazy(() => import('@/pages/apps/email/Inbox'))
const ReadEmail = lazy(() => import('@/pages/apps/email/ReadEmail'))
const Chat = lazy(() => import('@/pages/apps/Chat'))
const ContactList = lazy(() => import('@/pages/apps/ContactList'))
const FileManager = lazy(() => import('@/pages/apps/FileManager'))
const Invoice = lazy(() => import('@/pages/apps/Invoice'))
const Tasks = lazy(() => import('@/pages/apps/Tasks'))
const Overview = lazy(() => import('@/pages/apps/projects/Overview'))
const Project = lazy(() => import('@/pages/apps/projects/Project'))
const KanbanBoard = lazy(() => import('@/pages/apps/projects/KanbanBoard'))
const Teams = lazy(() => import('@/pages/apps/projects/Teams'))
const NewProject = lazy(() => import('@/pages/apps/projects/NewProject'))
const Products = lazy(() => import('@/pages/apps/ecommerce/Products'))
const ProductList = lazy(() => import('@/pages/apps/ecommerce/ProductList'))
const Cart = lazy(() => import('@/pages/apps/ecommerce/Cart'))
const Checkout = lazy(() => import('@/pages/apps/ecommerce/Checkout'))
const ProductDetail = lazy(() => import('@/pages/apps/ecommerce/ProductDetail'))
const Calendar = lazy(() => import('@/pages/apps/Calendar'))
const Login = lazy(() => import('@/pages/authentication/Login'))
const Register = lazy(() => import('@/pages/authentication/Register'))
const RecoverPW = lazy(() => import('@/pages/authentication/RecoverPW'))
const Lockscreen = lazy(() => import('@/pages/authentication/LockScreen'))
const Error404 = lazy(() => import('@/pages/authentication/Error404'))
const Error500 = lazy(() => import('@/pages/authentication/Error500'))
const Blogs = lazy(() => import('@/pages/pages/Blogs'))
const FAQs = lazy(() => import('@/pages/pages/FAQs'))
const Pricing = lazy(() => import('@/pages/pages/Pricing'))
const Starter = lazy(() => import('@/pages/pages/Starter'))
const Timeline = lazy(() => import('@/pages/pages/Timeline'))
const Treeview = lazy(() => import('@/pages/pages/Treeview'))
const Profile = lazy(() => import('@/pages/pages/Profile'))
const AlertEmail = lazy(
    () => import('@/pages/ui-kit/email-templates/AlertEmail')
)
const ActionEmail = lazy(
    () => import('@/pages/ui-kit/email-templates/ActionEmail')
)
const BillingEmail = lazy(
    () => import('@/pages/ui-kit/email-templates/BillingEmail')
)

//const GoogleMaps = lazy(() => import('@/pages/ui-kit/maps/GoogleMaps'))
const VectorMaps = lazy(() => import('@/pages/ui-kit/maps/VectorMap'))
const LeafletMaps = lazy(() => import('@/pages/ui-kit/maps/LeafletMaps'))
const Alerts = lazy(() => import('@/pages/ui-kit/elements/Alerts'))
const Avatars = lazy(() => import('@/pages/ui-kit/elements/Avatars'))
const Buttons = lazy(() => import('@/pages/ui-kit/elements/Buttons'))
const Badges = lazy(() => import('@/pages/ui-kit/elements/Badges'))
const Cards = lazy(() => import('@/pages/ui-kit/elements/Cards'))
const Carousels = lazy(() => import('@/pages/ui-kit/elements/Carousels'))
const CheckRadio = lazy(() => import('@/pages/ui-kit/elements/Check&Radio'))
const Dropdowns = lazy(() => import('@/pages/ui-kit/elements/Dropdowns'))
const Grids = lazy(() => import('@/pages/ui-kit/elements/Grids'))
// const Images = lazy(() => import('@/pages/ui-kit/elements/Images'))
const List = lazy(() => import('@/pages/ui-kit/elements/List'))
const Modals = lazy(() => import('@/pages/ui-kit/elements/Modals'))
const Navs = lazy(() => import('@/pages/ui-kit/elements/Navs'))
const Navbar = lazy(() => import('@/pages/ui-kit/elements/Navbar'))
const Offcanvas = lazy(() => import('@/pages/ui-kit/elements/Offcanvas'))
const Paginations = lazy(() => import('@/pages/ui-kit/elements/Paginations'))
const Progress = lazy(() => import('@/pages/ui-kit/elements/Progress'))
const PopoverTooltip = lazy(
    () => import('@/pages/ui-kit/elements/PopoverTooltip')
)
const Spinners = lazy(() => import('@/pages/ui-kit/elements/Spinners'))
const TabsAndAccordions = lazy(
    () => import('@/pages/ui-kit/elements/TabsAndAccordions')
)
const Toasts = lazy(() => import('@/pages/ui-kit/elements/Toasts'))
const Typography = lazy(() => import('@/pages/ui-kit/elements/Typography'))
// const Videos = lazy(() => import('@/pages/ui-kit/elements/Videos'))
const Animation = lazy(() => import('@/pages/ui-kit/advanced-ui/Animation'))
const ClipBoard = lazy(() => import('@/pages/ui-kit/advanced-ui/ClipBoard'))
const Highlight = lazy(() => import('@/pages/ui-kit/advanced-ui/Highlight'))
const RangeSlider = lazy(() => import('@/pages/ui-kit/advanced-ui/RangeSlider'))
const Ratings = lazy(() => import('@/pages/ui-kit/advanced-ui/Ratings'))
const Ribbons = lazy(() => import('@/pages/ui-kit/advanced-ui/Ribbons'))
const SweetAlerts = lazy(() => import('@/pages/ui-kit/advanced-ui/SweetAlerts'))
const Lightbox = lazy(() => import('@/pages/ui-kit/advanced-ui/Lightbox'))
const Elements = lazy(() => import('@/pages/ui-kit/forms/FormsElements'))

const AdvancedElements = lazy(
    () => import('@/pages/ui-kit/forms/AdvancedElements')
)
const Editors = lazy(() => import('@/pages/ui-kit/forms/Editors'))
const FileUpload = lazy(() => import('@/pages/ui-kit/forms/FileUpload'))
const Validation = lazy(() => import('@/pages/ui-kit/forms/Validation'))
const Repeater = lazy(() => import('@/pages/ui-kit/forms/Repeater'))
const Wizard = lazy(() => import('@/pages/ui-kit/forms/Wizard'))
const XEditable = lazy(() => import('@/pages/ui-kit/forms/XEditable'))
const Apex = lazy(() => import('@/pages/ui-kit/charts/Apex'))
const ChartJs = lazy(() => import('@/pages/ui-kit/charts/ChartJs'))
const BasicTables = lazy(() => import('@/pages/ui-kit/tables/BasicTables'))
const DataTables = lazy(() => import('@/pages/ui-kit/tables/DataTables'))
const FeatherIcons = lazy(() => import('@/pages/ui-kit/icons/FeatherIcons'))
const FontAwesomeIcons = lazy(
    () => import('@/pages/ui-kit/icons/FontAwesomeIcons')
)
const ThemifyIcons = lazy(() => import('@/pages/ui-kit/icons/ThemifyIcons'))
const TypIcons = lazy(() => import('@/pages/ui-kit/icons/TypIcons'))
const DripIcon = lazy(() => import('@/pages/ui-kit/icons/DripIcons'))
const MaterialDesignIcons = lazy(
    () => import('@/pages/ui-kit/icons/MaterialDesignIcons')
)

const Widgets = lazy(() => import('@/pages/widgets'))

const Usuario = lazy(() => import('@/pages/app/forms/TasaUsuario'))
const TasaGiv = lazy(() => import('@/pages/app/forms/TasaGiv'))
const TasaEditarGiv = lazy(() => import('@/pages/app/forms/TasaEditarGiv'))
const TasaLiberarGIV = lazy(
    () => import('@/pages/app/tables/TasaLiberarGIV.tsx'))
const TasaReparacion = lazy(() => import('@/pages/app/forms/TasaReparacion'))
const TasaRetornoActivo = lazy(
    () => import('@/pages/app/forms/TasaRetornoActivo'))
const TasaRecibirDespachar = lazy(
    () => import('@/pages/app/forms/TasaRecibirDespachar'))
const TasaRecepcionGIVTable = lazy(() => import('@/pages/app/tables/TasaRecepcionGIVTable.tsx'))
const TasaTable = lazy(() => import('@/pages/app/tables/TasaTable'))
const TasaDespachar = lazy(
    () => import('@/pages/app/forms/TasaDespacharEquipos'))
const TasaSeguimientoGiv = lazy(
    () => import('@/pages/app/forms/TasaSeguimientoGiv'))
const TasaVerificar = lazy(() => import('@/pages/app/forms/TasaVerificar'))
const Tracking = lazy(() => import('@/pages/app/forms/TasaTracking.tsx'))
const TasaUbicacion = lazy(
    () => import('@/pages/app/forms/TasaUbicacionTecnica.tsx'))
const TasaInventarioProveedor = lazy(
    () => import('@/pages/app/tables/TasaInventarioProveedor.tsx'))
//ADMIN
const Roles = lazy(() => import('@/pages/admin/Roles'))
const Usuarios = lazy(() => import('@/pages/admin/Usuarios'))
const ConsultaGiv = lazy(() => import('@/pages/admin/ConsultaGiv'))
const Perfil = lazy(() => import('@/pages/app/tables/Perfil'))

export type RoutesProps = {
    path: RouteProps['path']
    name: string
    element: RouteProps['element']
}

const Redirecter = () => {
    const user = getAuthUser()
    if (!user) {
        return <Navigate to={'/auth/login'}></Navigate>
    }
    if (user.rolId === ROLESTYPES.ADMIN) {
        return <Navigate to="/admin/usuarios"/>
    }
    return <Navigate to="/menumain"/>
}

const dashboardRoutes: RoutesProps[] = [
    {
        path: '/',
        name: 'Home Page',
        element: <Redirecter/>
    },
    {
        path: '/dashboards/analytics',
        name: 'Dashboard',
        element: <AnalyticsDashboard/>
    },
    {
        path: '/dashboards/sales',
        name: 'Sales',
        element: <SalesDashboard/>
    }
]

const appsRoutes: RoutesProps[] = [
    {
        path: '/apps/email/inbox',
        name: 'Inbox',
        element: <Inbox/>
    },
    {
        path: '/apps/email/read',
        name: 'Read Email',
        element: <ReadEmail/>
    },
    {
        path: '/apps/chat',
        name: 'Chat',
        element: <Chat/>
    },
    {
        path: '/apps/calendar',
        name: 'Calendar',
        element: <Calendar/>
    },
    {
        path: '/apps/contact-list',
        name: 'Cantacts List',
        element: <ContactList/>
    },
    {
        path: '/apps/file-manager',
        name: 'File Manager',
        element: <FileManager/>
    },
    {
        path: '/apps/invoice',
        name: 'Invoice',
        element: <Invoice/>
    },
    {
        path: '/apps/tasks',
        name: 'Tasks',
        element: <Tasks/>
    },
    {
        path: '/apps/projects/overview',
        name: 'Overview',
        element: <Overview/>
    },
    {
        path: '/apps/projects/project',
        name: 'Project',
        element: <Project/>
    },
    {
        path: '/apps/projects/board',
        name: 'Project',
        element: <KanbanBoard/>
    },
    {
        path: '/apps/projects/teams',
        name: 'Teams',
        element: <Teams/>
    },
    {
        path: '/apps/projects/files',
        name: 'Teams',
        element: <FileManager/>
    },
    {
        path: '/apps/projects/new-project',
        name: 'New Project',
        element: <NewProject/>
    },
    {
        path: '/apps/ecommerce/products',
        name: 'Products',
        element: <Products/>
    },
    {
        path: '/apps/ecommerce/product-list',
        name: 'Product List',
        element: <ProductList/>
    },
    {
        path: '/apps/ecommerce/cart',
        name: 'Cart',
        element: <Cart/>
    },
    {
        path: '/apps/ecommerce/checkout',
        name: 'Checkout',
        element: <Checkout/>
    },
    {
        path: '/apps/ecommerce/product-detail',
        name: 'Product Detail',
        element: <ProductDetail/>
    }
]

const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        element: <Login/>
    },
    {
        path: '/auth/register',
        name: 'Register',
        element: <Register/>
    },
    {
        path: '/auth/recover-pw',
        name: 'Recover PW',
        element: <RecoverPW/>
    },
    {
        path: '/auth/lock-screen',
        name: 'Lockscreen',
        element: <Lockscreen/>
    },
    {
        path: '/auth/auth-404',
        name: '404 Error',
        element: <Error404/>
    },
    {
        path: '/auth/auth-500',
        name: '500 Error',
        element: <Error500/>
    },
    {
        path: '*',
        name: '404 Error',
        element: <Error404/>
    }
]

const pagesRoutes: RoutesProps[] = [
    {
        path: '/pages/blogs',
        name: 'Blogs',
        element: <Blogs/>
    },
    {
        path: '/pages/faqs',
        name: 'FAQs',
        element: <FAQs/>
    },
    {
        path: '/pages/pricing',
        name: 'Pricing',
        element: <Pricing/>
    },
    {
        path: '/pages/starter',
        name: 'Starter Pages',
        element: <Starter/>
    },
    {
        path: '/pages/timeline',
        name: 'Timeline',
        element: <Timeline/>
    },
    {
        path: '/pages/treeview',
        name: 'Treeview',
        element: <Treeview/>
    },
    {
        path: '/pages/profile',
        name: 'Profile',
        element: <Profile/>
    }
]
const appRoutes: RoutesProps[] = [
    {
        path: '/pages/forms/usuario',
        name: 'Usuario',
        element: <Usuario/>
    },

    {
        path: '/pages/forms/formgiv',
        name: 'Formulario GIV',
        element: <TasaGiv/>
    },
    {
        path: 'pages/tables/liberargiv',
        name: 'Liberar GIV',
        element: <TasaLiberarGIV/>
    },
    {
        path: 'pages/forms/editargiv/:id',
        name: 'Editar GIV',
        element: <TasaEditarGiv/>
    },
    {
        path: '/pages/forms/formreparacion',
        name: 'Reparacion GIV',
        element: <TasaReparacion/>
    },
    {
        path: '/pages/forms/formretorno',
        name: 'Retorno Activo',
        element: <TasaRetornoActivo/>
    },
    {
        path: '/pages/forms/formrecibir',
        name: 'Recibir y Despachar',
        element: <TasaRecibirDespachar/>
    },
    {
        path: '/pages/forms/formdespachar',
        name: 'Despachar equipos',
        element: <TasaDespachar/>
    },
    {
        path: '/pages/tables/recepcion_activo',
        name: 'Recepcion Activo',
        element: <TasaRecepcionGIVTable/>
    },
    {
        path: '/pages/tables/tasatable',
        name: 'Lista Activos Usuario',
        element: <TasaTable isprob={false}/>
    },
    {
        path: '/pages/tables/tasatable2',
        name: 'Lista Activos Proveedor',
        element: <TasaInventarioProveedor/>
    },
    {
        path: '/pages/forms/seguimiento',
        name: 'Seg Guiv',
        element: <TasaSeguimientoGiv/>
    },
    {
        path: '/pages/perfil',
        name: 'Perfil',
        element: <Perfil />,
    },
    {
        path: '/menumain',
        name: 'Menu',
        element: <MenuMain/>
    },
    {
        path: '/pages/forms/verificar',
        name: 'Verificar',
        element: <TasaVerificar/>
    },
    {
        path: '/pages/forms/tracking',
        name: 'Tracking',
        element: <Tracking/>
    },
    {
        path: '/pages/forms/ubitec',
        name: 'Ubicación Tecnica',
        element: <TasaUbicacion/>
    },
    {
        path: '/admin/roles',
        name: 'Roles',
        element: <Roles/>
    },
    {
        path: '/admin/usuarios',
        name: 'Usuarios',
        element: <Usuarios/>
    },
    {
        path: '/admin/consultagiv',
        name: 'Admin Consulta GIV',
        element: <ConsultaGiv />
    }
]
const mapsRoutes: RoutesProps[] = [
    {
        path: '/ui/email-templates/basic',
        name: 'Email Basic',
        element: <ActionEmail/>
    },
    {
        path: '/ui/email-templates/alert',
        name: 'Email Alert',
        element: <AlertEmail/>
    },
    {
        path: '/ui/email-templates/billing',
        name: 'Email Billing',
        element: <BillingEmail/>
    },
    /* {
      path: '/ui/maps/google',
      name: 'Google Maps',
      element: <GoogleMaps />,
    }, */
    {
        path: '/ui/maps/vector',
        name: 'Vector Maps',
        element: <VectorMaps/>
    },
    {
        path: '/ui/maps/leaflet',
        name: 'Leaflet Maps',
        element: <LeafletMaps/>
    }
]

const uiRoutes: RoutesProps[] = [
    {
        path: '/ui/elements/alerts',
        name: 'Alerts',
        element: <Alerts/>
    },
    {
        path: '/ui/elements/avatars',
        name: 'Avatars',
        element: <Avatars/>
    },
    {
        path: '/ui/elements/buttons',
        name: 'Buttons',
        element: <Buttons/>
    },
    {
        path: '/ui/elements/badges',
        name: 'Badges',
        element: <Badges/>
    },
    {
        path: '/ui/elements/cards',
        name: 'Cards',
        element: <Cards/>
    },
    {
        path: '/ui/elements/carousels',
        name: 'Carousels',
        element: <Carousels/>
    },
    {
        path: '/ui/elements/check-radio',
        name: 'Check & Radio',
        element: <CheckRadio/>
    },
    {
        path: '/ui/elements/dropdowns',
        name: 'Dropdowns',
        element: <Dropdowns/>
    },
    {
        path: '/ui/elements/grids',
        name: 'Grids',
        element: <Grids/>
    },
    // {
    //     path: '/ui/elements/images',
    //     name: 'Images',
    //     element: <Images/>
    // },
    {
        path: '/ui/elements/list',
        name: 'List',
        element: <List/>
    },
    {
        path: '/ui/elements/modals',
        name: 'Modals',
        element: <Modals/>
    },
    {
        path: '/ui/elements/navs',
        name: 'Navs',
        element: <Navs/>
    },
    {
        path: '/ui/elements/navbar',
        name: 'Navbar',
        element: <Navbar/>
    },
    {
        path: '/ui/elements/offcanvas',
        name: 'Offcanvas',
        element: <Offcanvas/>
    },
    {
        path: '/ui/elements/paginations',
        name: 'Paginations',
        element: <Paginations/>
    },
    {
        path: '/ui/elements/popover-tooltip',
        name: 'Popover & Tooltip',
        element: <PopoverTooltip/>
    },
    {
        path: '/ui/elements/progress',
        name: 'Progress',
        element: <Progress/>
    },

    {
        path: '/ui/elements/spinners',
        name: 'Spinners',
        element: <Spinners/>
    },
    {
        path: '/ui/elements/tabs-accordions',
        name: 'Tabs And Accordion',
        element: <TabsAndAccordions/>
    },
    {
        path: '/ui/elements/toasts',
        name: 'Toasts',
        element: <Toasts/>
    },
    {
        path: '/ui/elements/typography',
        name: 'Typography',
        element: <Typography/>
    },
    // {
    //     path: '/ui/elements/videos',
    //     name: 'Videos',
    //     element: <Videos/>
    // }
]

const advanceuiRoutes: RoutesProps[] = [
    {
        path: '/ui/advanced/animation',
        name: 'Animation',
        element: <Animation/>
    },
    {
        path: '/ui/advanced/clip-board',
        name: 'Clip-Board',
        element: <ClipBoard/>
    },
    {
        path: '/ui/advanced/highlight',
        name: 'Highlight',
        element: <Highlight/>
    },
    {
        path: '/ui/advanced/kanban',
        name: 'Kanban',
        element: <KanbanBoard/>
    },
    {
        path: '/ui/advanced/lightbox',
        name: 'Lightbox',
        element: <Lightbox/>
    },
    {
        path: '/ui/advanced/range-slider',
        name: 'Range Slider',
        element: <RangeSlider/>
    },
    {
        path: '/ui/advanced/ratings',
        name: 'Ratings',
        element: <Ratings/>
    },
    {
        path: '/ui/advanced/ribbons',
        name: 'Ribbons',
        element: <Ribbons/>
    },
    {
        path: '/ui/advanced/sweet-alerts',
        name: 'Sweet Alerts',
        element: <SweetAlerts/>
    }
]

const formsRoutes: RoutesProps[] = [
    {
        path: '/ui/forms/advance',
        name: 'Advance Elements',
        element: <AdvancedElements/>
    },
    {
        path: '/ui/forms/elements',
        name: 'Form Elements',
        element: <Elements/>
    },
    {
        path: '/ui/forms/editors',
        name: 'Editors',
        element: <Editors/>
    },
    {
        path: '/ui/forms/file-upload',
        name: 'File Upload',
        element: <FileUpload/>
    },
    {
        path: '/ui/forms/validation',
        name: 'Validation',
        element: <Validation/>
    },
    {
        path: '/ui/forms/repeater',
        name: 'Repeater',
        element: <Repeater/>
    },
    {
        path: '/ui/forms/wizard',
        name: 'Wizard',
        element: <Wizard/>
    },
    {
        path: '/ui/forms/xeditable',
        name: 'X Editable',
        element: <XEditable/>
    }
]

const chartsRoutes: RoutesProps[] = [
    {
        path: '/ui/charts/apex',
        name: 'Apex Charts',
        element: <Apex/>
    },
    {
        path: '/ui/charts/chartjs',
        name: 'Chartjs',
        element: <ChartJs/>
    }
]

const tablesRoutes: RoutesProps[] = [
    {
        path: '/ui/tables/basic',
        name: 'Basic Tables',
        element: <BasicTables/>
    },
    {
        path: '/ui/tables/datatables',
        name: 'Data Tables',
        element: <DataTables/>
    }
]

const iconsRoutes: RoutesProps[] = [
    {
        path: '/ui/icons/dripicon',
        name: 'DripIcon',
        element: <DripIcon/>
    },
    {
        path: '/ui/icons/feather',
        name: 'Feather',
        element: <FeatherIcons/>
    },
    {
        path: '/ui/icons/fa',
        name: 'Font Awesome',
        element: <FontAwesomeIcons/>
    },
    {
        path: '/ui/icons/md',
        name: 'Material Design',
        element: <MaterialDesignIcons/>
    },
    {
        path: '/ui/icons/themify',
        name: 'Themify',
        element: <ThemifyIcons/>
    },
    {
        path: '/ui/icons/typicons',
        name: 'TypIcons',
        element: <TypIcons/>
    }
]

const widgetsRoutes: RoutesProps[] = [
    {
        path: '/widgets',
        name: 'Widgets',
        element: <Widgets/>
    }
]

const allUiRoutes = [
    ...uiRoutes,
    ...mapsRoutes,
    ...advanceuiRoutes,
    ...formsRoutes,
    ...chartsRoutes,
    ...tablesRoutes,
    ...iconsRoutes,
    ...widgetsRoutes
]
const allAdminRoutes = [
    ...dashboardRoutes,
    ...appsRoutes,
    ...pagesRoutes,
    ...appRoutes,
    ...allUiRoutes
]

const allBlankRoutes = [...authRoutes]

export { allAdminRoutes, allBlankRoutes }
