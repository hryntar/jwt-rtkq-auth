import { FC } from "react";
import { Link } from "react-router-dom";

const Editor: FC = () => {
   return (
      <section>
         <h1>Editors Page</h1>
         <br />
         <p>Editor page. You have access</p>
         <div className="flexGrow">
            <Link to="/">Home</Link>
         </div>
      </section>
   );
};

export default Editor;