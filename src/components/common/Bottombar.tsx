import { bottomLInks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
    const { pathname } = useLocation();

    return (
        <section className="bottom-bar">
            {
                bottomLInks.map((link) => {
                    const isActive = pathname === link.route;

                    return (

                        <Link
                            key={link.title} className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}
                            to={link.route}
                        >
                            <img
                                src={link.imageURL}
                                alt={link.title}
                                className={`${isActive && 'invert-white'}`}
                            />
                            <p className="tiny-medium text-light-2">{link.title}</p>
                        </Link>
                    )
                })
            }
        </section>
    );
};

export default Bottombar;
