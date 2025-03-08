import { FaFacebook, FaGitAlt, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <>
            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 mt-auto">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <FaTwitter className="size-6" />
                        </a>
                        <a>
                            <FaYoutube className="size-6" />
                        </a>
                        <a>
                            <FaFacebook className="size-6" />
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Qrio Shop</p>
                </aside>
            </footer>
            <footer className="footer bg-neutral text-neutral-content items-center justify-center p-4 mt-auto">
                <a href="https://github.com/SAR-dev" target="_blank" className="grid-flow-col items-center">
                    <FaGitAlt className="size-6" />
                    <p>Created By Sar-Dev</p>
                </a>
            </footer>
        </>
    )
}

export default Footer
