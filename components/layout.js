import { MenuIcon } from '@heroicons/react/outline'
import Sidebar from "./navigation/sidebar";
import Footer from "./footer";
import Main from "./main";

export default function Layout({ children }) {
    return (
        <div>
            <Sidebar />
            <div className="md:pl-64 flex flex-col flex-1">
                <Main children={children} />
                <Footer />
            </div>
        </div>
    )
}
