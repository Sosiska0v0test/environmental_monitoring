import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import ProductsPage from './Screens/Products';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Aos from 'aos';
import Password from './Screens/Dashboard/Password';
import ProductList from './Screens/Dashboard/Admin/ProductList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Categories from './Screens/Dashboard/Admin/Categories';
import Users from './Screens/Dashboard/Admin/Users';
import AddProducts from './Screens/Dashboard/Admin/AddProducts';
import ScrollOnTop from './ScrollOnTop';
import ToastContainer from './Components/Notification/ToastContainer';
import { AdminProtectionRouter, ProtectedRouter } from './ProtectedRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from './Redux/Actions/CategoriesActions';
import { getAllProductsAction } from './Redux/Actions/ProductsActions';
import EditProduct from './Screens/Dashboard/Admin/EditProduct';
import DrawerContext from './Context/DrawerContext';

function App() {
	Aos.init();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { isError: catError } = useSelector((state) => state.categoryGetAll);

	useEffect(() => {
		dispatch(getAllCategoriesAction());
		dispatch(getAllProductsAction({}));
	}, [dispatch, userInfo, catError]);

	return (
		<>
			<BrowserRouter>
				<ToastContainer />
				<DrawerContext>
					<ScrollOnTop>
						<Routes>
							{ /************* * PUBLIC ROUTERS **************/ }
							{/*<Route path='/' element={ <HomeScreen /> } />*/ }
							<Route path='/contact-us' element={ <ContactUs /> } />
							<Route path='/products' element={ <ProductsPage /> } />
							<Route path="/products/:search" element={ <ProductsPage /> } />
							<Route path='/login' element={ <Login /> } />
							<Route path='/register' element={ <Register /> } />
							<Route path='*' element={ <NotFound /> } />
							{ /************* * PRIVATE PUBLIC ROUTERS **************/ }
							<Route element={ <ProtectedRouter /> }>
								<Route path='/profile' element={ <Profile /> } />
								<Route path='/password' element={ <Password /> } />
								{ /************* * ADMIN ROUTERS **************/ }
								<Route element={ <AdminProtectionRouter /> }>
									<Route path='/productslist' element={ <ProductList /> } />
									<Route path='/dashboard' element={ <Dashboard /> } />
									<Route path='/categories' element={ <Categories /> } />
									<Route path='/users' element={ <Users /> } />
									<Route path='/addproduct' element={ <AddProducts /> } />
									<Route path='/edit/:id' element={ <EditProduct /> } />
								</Route>
							</Route>
						</Routes>
					</ScrollOnTop >
				</DrawerContext>
			</BrowserRouter>
		</>
	);
}

export default App;
