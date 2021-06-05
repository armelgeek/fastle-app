import React, { Component , useState } from 'react';
import { Menu , Avatar } from 'antd';
import { Link } from "react-router-dom";
type userData = {
  currentUser: any
}
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function RightMenu() {
    const [userData, setUserData] = useState<userData>({
      currentUser: localStorage.getItem('name') || null 
   });
    return (

      <Menu mode="horizontal">
         { userData.currentUser ? (
           <>
           <Menu.Item>
            <Link to={"/projects"}>
                Projects
            </Link>
           </Menu.Item>
           <Menu.Item key="mail">
              <Link to={"/profile"}>
                  {userData.currentUser}
               </Link>
           </Menu.Item>
           <Menu.Item key="app">
               <Link to={"/login"} >
                   Se deconnecter
               </Link>
           </Menu.Item>
          </>
          )
          : 
         (
         <>
            <Menu.Item key="mail">
                <Link to={"/login"}>
                    Se connecter
                </Link>
            </Menu.Item>
            <Menu.Item key="app">
                <Link to={"/register"} >
                    Créer un compte
                </Link>
            </Menu.Item>
        </>
        )
        }
      </Menu>
    );
}
export default RightMenu