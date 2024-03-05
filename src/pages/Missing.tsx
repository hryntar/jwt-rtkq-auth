import { FC } from "react";
import { Link } from "react-router-dom";

const Missing: FC = () => {
   return (
      <section className="text-xl sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] text-center">
         <h1 className="font-bold text-primary text-3xl mb-5">Oops!</h1>
         <p className="text-xl mb-10">Page Not Found</p> 
         <Link className=" text-xl" to="/">Visit Our <span className="font-semibold text-primary">Homepage</span></Link> 
      </section>
   );
};

export default Missing;
