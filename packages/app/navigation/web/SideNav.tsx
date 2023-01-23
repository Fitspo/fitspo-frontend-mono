import { useRouter } from "next/router";
import { Link } from "solito/link";

export default function SideNav() {
  const router = useRouter();


  return (
    <nav id="sidebarMenu" className="drop-shadow-md collapse z-50 fixed sidebar bg-gray-50 h-full">
        <div className=" shadow-inner" >  
            <ul className="relative">
                <li className="relative flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <Link href="/home">
                        <p className="nav-link block px-2 py-2 text-sm text-gray-700 hover:text-blue-700 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Home</p>
                    </Link>
                </li>
                <li className="relative flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <Link href="/create-post">
                        <p className="nav-link block px-2 py-2 text-sm text-gray-700 hover:text-blue-700 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Create a Post</p>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    

  );
}

