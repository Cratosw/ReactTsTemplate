import React from 'react';
import {Route,Outlet} from 'react-router-dom';


function Route2() {
  return (
    <div>
      <h1>Route2</h1>
      <Outlet />
    </div>
  );
}
export default Route2;