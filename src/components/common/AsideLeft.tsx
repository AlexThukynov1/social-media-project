import {Link, NavLink} from "react-router-dom";
import {useUserContext} from "@/context/AuthContext.tsx";
import {asideLInks} from "@/constants";
import type {INavLink} from "@/types";

const AsideLeft = () => {
    const {user} = useUserContext()

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link
                    to="/"
                    className="flex gap-3 items-center"
                >
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={170}
                        height={36}
                    />
                </Link>

                <Link
                    to={`/profile/${user.id}`}
                    className="flex gap-3 items-center"
                >
                    <img
                        src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                        alt="profile"
                        className="h-14 w-14 rounded-full"
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">
                            {user.name}
                        </p>
                        <p className="small-regular text-light">
                            @{user.username}
                        </p>
                    </div>
                </Link>

                <ul className="flex flex-col gap-6">
                    {
                        asideLInks.map((link: INavLink) => {
                            return (
                                <li key={link.title} className="leftsidebar-link">
                                    <NavLink
                                        to={link.route}
                                        className="flex gap-4 items-center p-4"
                                    >
                                        <img
                                            src={link.imageURL}
                                            alt={link.title}
                                            className="group-hover:invert-white"
                                        />
                                        {link.title}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    );
};

export default AsideLeft;
