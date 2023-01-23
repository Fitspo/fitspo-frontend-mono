import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Link } from "solito/link";
import * as Auth from '../../helpers/auth'

export default function NavBar(props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  return (
    <header >
        <nav className="navbar z-50 navbar-expand-lg shadow-md bg-gray-50 flex items-center w-full justify-between">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
                <div className="navbar-collapse collapse  items-center" id="navbarSupportedContentY">
                    <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                        <button onClick={() => router.replace('/home')} type="button" className="flex mr-3 text-sm" >
                            <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Fitspo Logo"/>
                        </button>
                    </ul>
                </div>
            </div>
            <div>
            <button type="button" className="rounded-full bg-gray-50 p-1 text-gray-600">
                <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
            </button>
            </div>
            <div className="user-layout z-50 px-6"  id="user-layout">
                <button onClick={() => setOpen(!isOpen)} type="button" className=" my-3" >
                    <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-full ring-4 ring-green-500 ring-offset-2 "
                    style={{height:40, width:45}} alt="" loading="lazy" />
                </button>
                <nav>
                    <div hidden={!isOpen} id="dropdown" className="dropdown absolute right-0 mx-4 my-4 text-base bg-gray-100 divide-y divide-gray-300 rounded shadow">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900">John Doe</span>
                            <span className="block text-sm font-medium text-gray-500 truncate">name@sofit.com</span>
                        </div>
                        <ul className="py-1 " >
                            <li className="nav-item">
                                <Link href="/user/profile">
                                    <p className="nav-link block px-4 py-2 text-sm text-gray-700 hover:text-blue-700 transition duration-150 ease-in-out">Profile</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/settings">
                                    <p className="nav-link block px-4 py-2 text-sm text-gray-700 hover:text-blue-700 transition duration-150 ease-in-out">Settings</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/login">
                                    <p className="nav-link block px-4 py-2 text-sm text-gray-700 hover:text-blue-700 transition duration-150 ease-in-out">Sign Out</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </nav>
    </header>
    
  );


}

