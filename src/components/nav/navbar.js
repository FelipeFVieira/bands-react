import './navbar.css';

const Navbar = () => {
    return (   
    <div className='header'>
        
        <div className='logo-div'>
            <h1>The Band</h1>
        </div>
        <nav>
            <a href="/home">Home</a>
            <a href="/bands">Bands</a>
        </nav>
    </div>
    )
}

export default Navbar;