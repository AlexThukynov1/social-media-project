import {Button} from "@/components/ui/button.tsx";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {SigninValidation as SigninValidation} from "@/lib/validation";
import Loader from "@/components/common/Loader.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useSignInAccountMutation} from "@/lib/react-query/queriesAndMutations.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {useUserContext} from "@/context/AuthContext.tsx";


const SigninForm = () => {
    const {toast} = useToast();
    const navigate = useNavigate();
    const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

    const { mutateAsync: signInAccount } = useSignInAccountMutation()

    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values:z.infer<typeof SigninValidation>) {
        const session = await signInAccount({
            email: values.email,
            password: values.password
        })

        if(!session) {
            return toast({title: 'Sign in failed. Please try again'})
        }

        const isLoggedIn = await checkAuthUser()

        if(isLoggedIn) {
            form.reset()

            navigate("/")
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img
                    src="/assets/images/logo.svg"
                    alt="Logo"
                />

                <h2 className="h3-bold md:h2-bold sm:pt-12">Log in to your account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your details</p>


                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full mt-4"
                >

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="shad-button_primary">
                        {isUserLoading ? (
                                <div className="flex-center gap-2">
                                    <Loader/>
                                </div>
                            )
                            : "Sign in"}
                    </Button>

                    <p className="text-small-regular text-light-2 text-center">
                        Don`t have an account?&nbsp;
                        <Link
                            to="/sign-up"
                            className="text-primary-500 text-small-semibold ml-1"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </Form>

    );
};

export default SigninForm;
