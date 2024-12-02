import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MdDashboard } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';

export default function InventorymanagerNav() {
    const [activeItem, setActiveItem] = useState(null);

    const location = useLocation();

    useEffect(() => {
        // Update active item based on current route
        switch (location.pathname) {
            case '/inventorymanagerdash':
                setActiveItem(1);
                break;
            case '/inventory':
                setActiveItem(2);
                break;
            case '/my-profile':
                setActiveItem(3);
                break;
            default:
                setActiveItem(null);
        }
    }, [location.pathname]);

    return (
        <div className='h-screen  border-r-2 lg:w-[320px] sm:w-fit md:w-72 w-fit bg-gray-100'>
            <div className='justify-center'>
                <nav>
                    <ul className='text-left'>
                        <Link to='/inventorymanagerdash'>
                            <li>
                                <div
                                    className={`flex items-center py-3 pl-8 transition-all ${
                                        activeItem === 1
                                            ? 'bg-gray-300 text-black'
                                            : 'text-black hover:bg-gray-200 hover:text-black'
                                    }`}
                                >
                                    <div className='mr-8'>
                                        <MdDashboard
                                            size={20}
                                            className={`${
                                                activeItem === 1 ? 'text-black' : 'text-black'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{ fontSize: '18px' }}
                                            className={`${
                                                activeItem === 1 ? 'text-black' : 'text-black'
                                            }`}
                                        >
                                            Dashboard
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/inventory' className='no-underline'>
                            <li>
                                <div
                                    className={`flex items-center py-3 pl-8 transition-all ${
                                        activeItem === 2
                                            ? 'bg-gray-300 text-black'
                                            : 'text-black hover:bg-gray-200 hover:text-black'
                                    }`}
                                >
                                    <div className='mr-8'>
                                        <MdOutlineInventory
                                            size={20}
                                            className={`${
                                                activeItem === 2 ? 'text-black' : 'text-black'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{ fontSize: '18px' }}
                                            className={`${
                                                activeItem === 2 ? 'text-black' : 'text-black'
                                            }`}
                                        >
                                            Inventory
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/my-profile' className='no-underline'>
                            <li>
                                <div
                                    className={`flex items-center py-3 pl-8 transition-all ${
                                        activeItem === 3
                                            ? 'bg-gray-300 text-black'
                                            : 'text-black hover:bg-gray-200 hover:text-black'
                                    }`}
                                >
                                    <div className='mr-8'>
                                        <FaUserEdit
                                            size={20}
                                            className={`${
                                                activeItem === 3 ? 'text-black' : 'text-black'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{ fontSize: '18px' }}
                                            className={`${
                                                activeItem === 3 ? 'text-black' : 'text-black'
                                            }`}
                                        >
                                            Profile
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
