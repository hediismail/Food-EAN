export default function NavBar({titre}) {
   return (
      <nav className="navbar navbar-light bg-light">
         <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">{titre}</span>
         </div>
      </nav>
   );
}
