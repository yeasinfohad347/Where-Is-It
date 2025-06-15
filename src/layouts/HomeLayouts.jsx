import React from 'react';
import Home from '../pages/Home';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const HomeLayouts = () => {
    return (
        <div>
            <Navbar/>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayouts;