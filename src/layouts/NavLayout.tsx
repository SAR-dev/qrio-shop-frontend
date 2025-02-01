import { ReactNode } from 'react';
import Navbar from '../components/Navbar'
import { useImageModalStore } from '../stores/imageModalStore';
import { Lightbox } from "react-modal-image";
import { ScrollRestoration } from 'react-router';
import Footer from '../components/Footer';

const NavLayout = ({ children }: { children: ReactNode }) => {
    const { imageSrc, closeImageModal } = useImageModalStore()

    return (
        <section className='min-h-screen flex flex-col'>
            <Navbar />
            {children}
            <ScrollRestoration />
            <Footer />
            {imageSrc.length > 0 && (
                <Lightbox
                    medium={imageSrc}
                    large={imageSrc}
                    onClose={closeImageModal}
                />
            )}
        </section>
    )
}

export default NavLayout