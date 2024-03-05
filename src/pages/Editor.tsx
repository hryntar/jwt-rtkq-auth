import { FC } from "react";
import { Link } from "react-router-dom";

const Editor: FC = () => {
   return (
      <section className="text-xl sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] ">
         <h1 className="font-bold text-primary text-3xl text-center mb-7">Editors Page</h1>
         <p className="text-xl text-center mb-[100px]">You have access to Editors page</p>
         <Link className="hover:text-primary transition font-semibold" to="/">Home</Link>
      </section>
   );
};

export default Editor;
