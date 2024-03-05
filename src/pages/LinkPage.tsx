import { FC } from "react"
import { Link } from "react-router-dom"

const LinkPage: FC = () => {
    return (
        <section className="text-xl sm:min-w-[450px] max-sm:w-full p-10 border-1 drop-shadow-2xl shadow-3xl border-primary rounded-3xl backdrop-opacity-20 backdrop-blur-[100px] ">
            <h1 className="font-bold text-primary text-3xl text-center mb-7">Links</h1> 
            <h2 className="font-semibold text-primary text-2xl mb-3">Public</h2>
            <nav className="grid gap-y-1">
               <Link className="hover:text-primary transition " to="/login">Login</Link>
               <Link className="hover:text-primary transition " to="/register">Register</Link>
            </nav>
            <br />
            <h2 className="font-semibold text-primary text-2xl mb-3">Private</h2>
            <nav className="grid gap-y-1">
               <Link className="hover:text-primary transition " to="/">Home</Link>
               <Link className="hover:text-primary transition " to="/editor">Editors Page</Link>
               <Link className="hover:text-primary transition " to="/admin">Admin Page</Link>
            </nav>
            <br />   
        </section>
    )
}

export default LinkPage;