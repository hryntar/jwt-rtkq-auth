import Admin from "@/components/Admin";
import Editor from "@/components/Editor";
import Home from "@/components/Home";
import Layout from "@/components/Layout";
import LinkPage from "@/components/LinkPage";
import Login from "@/components/Login";
import Lounge from "@/components/Lounge";
import Missing from "@/components/Missing";
import PersistLogin from "@/components/PersistLogin";
import Registration from "@/components/Registration";
import RequireAuth from "@/components/RequireAuth";
import Unauthorized from "@/components/Unauthorized";
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
