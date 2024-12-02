import React from 'react';
import Header from '../../componnets/inventorycompo/Header';
import NavBar from '../../componnets/inventorycompo/NavBar';
import InventoryList from '../../componnets/inventorycompo/InventoryList';
import BrandList from '../../componnets/inventorycompo/BrandList';

export default function Inventory() {
  return (
    <div className="flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="flex ">
        {/* Fixed NavBar for Web View */}
        <div className="hidden md:block fixed top-[6rem] left-0 h-[calc(100vh-4rem)] w-64 bg-white z-40 text-left ">
          <NavBar />
        </div>

        {/* Main Content */}
        <div className="flex-grow ml-0 md:ml-64 p-4 pt-16">
         <InventoryList/>
          <BrandList/>
        </div>
      </div>
    </div>
  );
}
