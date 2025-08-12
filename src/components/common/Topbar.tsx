import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useSignOutAccountMutation} from "@/lib/react-query/queriesAndMutations.ts";
import {useEffect} from "react";
import {useUserContext} from "@/context/AuthContext.tsx";

const Topbar = () => {
    const {mutate: singOut, isSuccess} = useSignOutAccountMutation()
    const navigate = useNavigate()
    const {user} = useUserContext()

    useEffect(() => {
        if(isSuccess) {
            navigate('/sign-in')
        }
    }, [isSuccess])

    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link
                    to="/"
                    className="flex gap-3 items-center"
                >
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={130}
                        height={325}
                    />
                </Link>

                <div className="flex gap-2">
                    <Button
                        className="shad-button_ghost"
                        variant="ghost"
                        onClick={() => singOut()}
                    >
                        <img
                            src="/assets/icons/logout.svg"
                            alt="Logout"
                        />
                    </Button>
                    <Link
                        to={`/profile/${user.id}`}
                        className="flex-center gap-3"
                    ></Link>
                    <img
                        src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
                        alt="profile"
                        className="h-8 w-8 rounded-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default Topbar;
