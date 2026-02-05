import React from 'react';

function Navbar() {
  // Get user from local storage to show name if logged in
  const user = JSON.parse(localStorage.getItem('currentuser'));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg py-3">
      <div className="container">
        {/* Website Name - Extra Bold */}
        <a className="navbar-brand" href="/home" style={{ fontWeight: '900', fontSize: '1.6rem', letterSpacing: '1px' }}>
          SHEY <span style={{ color: '#f39c12' }}>HOTELS</span>
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-user me-2"></i>{user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="#" onClick={() => {
                    localStorage.removeItem('currentuser');
                    window.location.href='/login';
                  }}>Logout</a></li>
                </ul>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link fw-bold text-uppercase" href="/register" style={{ fontSize: '0.9rem' }}>
                    Registration
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-bold text-uppercase" href="/login" style={{ fontSize: '0.9rem' }}>
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;