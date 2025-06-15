import React from 'react';
import Home from '../pages/Home';
import { Outlet } from 'react-router';

const HomeLayouts = () => {
    return (
        <div>
            <Home></Home>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayouts;