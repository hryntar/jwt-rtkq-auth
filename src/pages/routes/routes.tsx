import Admin from "@/pages/Admin";
import Editor from "@/pages/Editor";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import LinkPage from "@/pages/LinkPage";
import Login from "@/pages/Login";
import Lounge from "@/pages/Lounge";
import Missing from "@/pages/Missing";
import PersistLogin from "@/components/PersistLogin";
import Registration from "@/pages/Registration";
import RequireAuth from "@/components/RequireAuth";
import Unauthorized from "@/pages/Unauthorized";
import { Role } from "@/types/roles.enum";
import { Route } from "react-router-dom";

const routes = (
   <Route path="/" element={<Layout />}>
      {/* Public routes */}
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      <Route element={<PersistLogin />}>
         {/* Protected routes */}
         <Route element={<RequireAuth allowedRoles={[Role.User]} />}>
            <Route path="/" element={<Home />} />
         </Route>
         <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
            <Route path="admin" element={<Admin />} />
         </Route>
         <Route element={<RequireAuth allowedRoles={[Role.Editor]} />}>
            <Route path="editor" element={<Editor />} />
         </Route>
         <Route element={<RequireAuth allowedRoles={[Role.Admin, Role.Editor]} />}>
            <Route path="lounge" element={<Lounge />} />
         </Route>
      </Route>

      {/* Missing page */}
      <Route path="*" element={<Missing />} />
   </Route>
);

export default routes;
