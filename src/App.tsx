import React from 'react';
import './App.css';
import clsx from 'clsx';
import {lazyImport} from './libs/util';
import {Routes,Route,Link,useParams} from 'react-router-dom';
import { useTheme, makeStyles } from "@material-ui/styles";
const Route1=lazyImport('pages/Route1');
const Route2=lazyImport('pages/Route2');

const useStyles = makeStyles((theme) => {
  return {
    App: {
      width: `100vw`,
      height: `100vh`,
      minWidth:`1200px`,
    },
  };
});
function App() {
  const classes=useStyles();
  return (
    <div className={clsx(classes.App,"APP")}>
    <h1>Welcome</h1>
    <Routes>
      <Route path="/" element={<Route1 />} />
      <Route path="route2" element={<Route2 />} />
        <Route path=":id" element={<Profile />} />
        <Route path="sent" element={<SentInvoices />} />
    </Routes>
  </div>
  );
}
function Profile() {
  let params = useParams();
  console.log(params);
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>
        {/*
       将直接根据上面定义的不同路由参数，渲染<MyProfile />或<OthersProfile />
        */}
    </div>
  )
}
function SentInvoices() {
  return <h1>Sent Invoices</h1>;
}
export default App;
