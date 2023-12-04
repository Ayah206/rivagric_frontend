import React, {useState, useContext, createContext, useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import SideBar from './components/sidebar';
import Dashboard from './screens/dashboard';
import ManageUsers from './screens/manageUsers';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import ManageBusiness from './screens/manageBusiness';
import ManageOperations from './screens/manageOperations';
import ManageCategories from './screens/manageCategories';
import ManageProducts from './screens/manageProducts';
import Guidelines from './screens/guidelines';
import User from './screens/user';
import Login from './screens/login';
import ProvideContext from './hooks/useContext';
import Business from './screens/business';
import Operation from './screens/operation';
import Category from './screens/category';
import Product from './screens/product';
import OperationProduct from './screens/operationProduct';
import AddOperationProduct from './screens/addOperationProduct';
import AddOperation from './screens/addOperation';
import AddProduct from './screens/addProduct';
import AddCategory from './screens/addCategory';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#ffffff'
    },
    primary:{
      // main: '#EF6C33',
      main: 'rgb(0, 151, 255)'
      // contrastText: 'rgba(57, 205, 204, 1)'
    },
   
  },
  
});
function App() {

  return (
    <ThemeProvider theme={theme}>
    <ProvideContext>
      <Router>
        <Routes>
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/' element = {<Navigate to= "/dashboard" />} />
              <Route path = '/manage-users' element = {<SideBar><ManageUsers/></SideBar> } />
              <Route path = '/dashboard' element = {<SideBar><Dashboard /></SideBar>} />
              <Route path = '/manage-businesses' element = {<SideBar><ManageBusiness/></SideBar> } />
              <Route path = '/manage-operations' element = { <SideBar><ManageOperations/></SideBar> } />
              <Route path = '/manage-categories' element = {<SideBar><ManageCategories/></SideBar> } />
              <Route path = '/manage-products' element = {<SideBar><ManageProducts/></SideBar>} />
              <Route path = '/user-guidelines' element = {<SideBar><Guidelines/></SideBar>} />
              <Route path = '/accounts/:id' element = {<SideBar><User/></SideBar>} />
              <Route path = '/businesses/:id' element = {<SideBar><Business/></SideBar>} />
              <Route path = '/operations/:id' element = {<SideBar><Operation/></SideBar>} />
              <Route path = '/categories/:id' element = {<SideBar><Category/></SideBar>} />
              <Route path = '/products/:id' element = {<SideBar><Product/></SideBar>} />
              <Route path = '/operation-products/:id' element = {<SideBar><OperationProduct/></SideBar>} />
              <Route path = '/operations/add-product/:id' element = {<SideBar><AddOperationProduct/></SideBar>} />
              <Route path = '/manage-operations/add' element = {<SideBar><AddOperation/></SideBar>} />
              <Route path = '/manage-products/add' element = {<SideBar><AddProduct/></SideBar>} />
              <Route path = '/manage-categories/add' element = {<SideBar><AddCategory/></SideBar>} />

        </Routes>
      </Router>
    </ProvideContext>
    </ThemeProvider>
  );
} 

export default App;
