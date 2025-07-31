// @ts-ignore
import './common.css'
import {Routes, Route} from 'react-router-dom';
import SigninForm from "./_auth/forms/SigninForm.tsx";
import {Home} from "lucide-react";
import SignupForm from "./_auth/forms/SignupForm.tsx";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";


const App = () => {
    return (
        <main className="flex h-screen">
           <Routes>
               {/* PUBLIC */}
               <Route element={<AuthLayout/>}>
                   <Route path="/sign-in" element={<SigninForm/>}/>
                   <Route path="/sign-up" element={<SignupForm/>}/>
               </Route>


               {/* Privete */}
               <Route element={<RootLayout/>}>
                   <Route index element={<Home/>}/>
               </Route>
           </Routes>

            <Toaster/>
        </main>
    );
};

export default App;