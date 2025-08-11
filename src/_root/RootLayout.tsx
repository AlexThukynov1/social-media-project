import Topbar from "@/components/common/Topbar.tsx";
import AsideLeft from "@/components/common/AsideLeft.tsx";
import Bottombar from "@/components/common/Bottombar.tsx";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="w-full md:flex-col">
            <Topbar/>
            <AsideLeft/>

            <section className="flex flex-1 h-full">
                <Outlet/>
            </section>

            <Bottombar/>
        </div>
    );
};

export default RootLayout;
