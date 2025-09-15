import {Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import {useUserContext} from "@/context/AuthContext.tsx";
import {asideLInks} from "@/constants";
import type {INavLink} from "@/types";
import { useEffect } from "react";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { Button } from "../ui/button";

const AsideLeft = () => {
    const {user} = useUserContext()
    const {mutate: singOut, isSuccess} = useSignOutAccountMutation()
    const navigate = useNavigate()
    const { pathname } = useLocation();
    
    useEffect(() => {
        if(isSuccess) {
            navigate('/sign-in')
        }
    }, [isSuccess])

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
                            const isActive = pathname === link.route;

                            return (
                                <li key={link.title} className={`leftsidebar-link ${isActive && 'bg-primary-500'}`}>
                                    <NavLink
                                        to={link.route}
                                        className="flex gap-4 items-center p-4"
                                    >
                                        <img
                                            src={link.imageURL}
                                            alt={link.title}
                                            className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                        />
                                        {link.title}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <Button
                className="shad-button_ghost"
                variant="ghost"
                onClick={() => singOut()}
            >
                <img
                    src="/assets/icons/logout.svg"
                    alt="Logout"
                />
                <p className="small-medium lg:base-medium">
                    Logout
                </p>
            </Button>
        </nav>
    );
};

export default AsideLeft;
