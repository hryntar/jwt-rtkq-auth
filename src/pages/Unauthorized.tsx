import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: FC = () => {
   const navigate = useNavigate();

   const goBack = () => navigate(-1);

   return (
      <section className="text-xl sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] ">
         <h1 className="font-bold text-primary text-3xl text-center mb-7">Unauthorized</h1> 
         <p className="text-xl text-center mb-[100px]">You do not have access to the  <br /> requested page.</p> 
         <button onClick={goBack} className="hover:text-primary transition font-semibold">Go Back</button> 
      </section>
   );
};

export default Unauthorized;
