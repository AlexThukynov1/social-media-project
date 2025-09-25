// @ts-ignore
import './common.css'
import {Routes, Route} from 'react-router-dom';
import SigninForm from "./_auth/forms/SigninForm.tsx";
import SignupForm from "./_auth/forms/SignupForm.tsx";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import HomePage from './_root/pages/HomePage.tsx';
import ExplorePage from './_root/pages/ExplorePage.tsx';
import AllUsersPage from './_root/pages/AllUsersPage.tsx';
import SavedPage from './_root/pages/SavedPage.tsx';
import CreatePostPage from './_root/pages/CreatePostPage.tsx';
import UpdatePostPage from './_root/pages/UpdatePostPage.tsx';
import ProfilePage from './_root/pages/ProfilePage.tsx';
import UpdateProfilePage from './_root/pages/UpdateProfilePage.tsx';
import PostDetails from './_root/pages/PostDetails.tsx';


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
                   <Route index element={<HomePage/>}/>
                   <Route path="/explore" element={<ExplorePage/>}/>
                   <Route path="/saved" element={<SavedPage/>}/>
                   <Route path="/all-users" element={<AllUsersPage/>}/>
                   <Route path="/create-post" element={<CreatePostPage/>}/>
                   <Route path="/update_post/:id" element={<UpdatePostPage/>}/>
                    <Route path="/post/:id" element={<PostDetails />} />
                   <Route path="/profile/:id/*" element={<ProfilePage/>}/>
                   <Route path="/updade_profile/:id" element={<UpdateProfilePage/>}/>
               </Route>
           </Routes>

            <Toaster/>
        </main>
    );
};

export default App;