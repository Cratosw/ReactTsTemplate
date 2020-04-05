import React from 'react';
import {
  Route,Link
} from 'react-router-dom';


function Route1() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="about">About</Link>
      </nav>
    </div>
  );
}
export default Route1;