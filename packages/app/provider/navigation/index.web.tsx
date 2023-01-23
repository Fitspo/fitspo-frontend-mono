// on Web, we don't use React Navigation, so we avoid the provider altogether
// instead, we just have a no-op here
// for more, see: https://solito.dev/recipes/tree-shaking

import { LoginScreen } from "app/features/login/login-screen";
import { SignupScreen } from "app/features/signup/signup-screen";
import 'react-tabs/style/react-tabs.css';
import NavBar from "app/navigation/web/NavBar";
import React, { useEffect } from "react";
import Footer from "app/navigation/web/Footer";
import SideNav from "app/navigation/web/SideNav";


export function NavigationProvider ({
  children,
}: {
  children: React.ReactElement
}) {
  const [showHeader, setHeader] = React.useState(false);
  const [showFooter, setFooter] = React.useState(false);
  const [showSideNav, setSideNav] = React.useState(false);

  useEffect(() => {
    shouldHideHeaderAndFooterAndSideNav()
  })

  function shouldHideHeaderAndFooterAndSideNav() {
    React.Children.map(children, (child) => {
      if(child.type === LoginScreen || child.type === SignupScreen){
        setHeader(false)
        setFooter(false)
        setSideNav(false)
      }else {
        setHeader(true)
        setFooter(true)
        setSideNav(true)
      }
    })
  }
 
  return(
    <>
    <div className="parent flex flex-col h-full w-full">
            <div className="header sticky top-0 z-50" >
              { showHeader && <NavBar/> }
            </div>
            <div className="below-header flex flex-row h-full">
                <div className="sideNav sticky z-50 hidden sm:flex flex-col" >
                  { showSideNav && <SideNav/> }
                  { showFooter && <Footer/> }
                </div>
                <div className="main-content flex flex-grow" >{children}</div>
            </div>
        </div>
  </>
  )

  
}
