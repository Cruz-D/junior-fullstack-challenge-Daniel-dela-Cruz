import React from 'react';
import './footerStyle.css'; // Asegúrate de crear este archivo para estilos personalizados

const Footer = () => {
    return (
        <footer className="footer bg-light text-center py-3">
            <div className="container">
                <p className="mb-1">Developed by Daniel de la Cruz</p>
                <div>
                    <a 
                        href="https://www.linkedin.com/in/dcruz-5263aa12a/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-link"
                    >
                        <i className="bi bi-linkedin"></i> LinkedIn
                    </a>
                    <a 
                        href="https://github.com/Cruz-D" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-link"
                    >
                        <i className="bi bi-github"></i> GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;