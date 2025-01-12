import { ReactNode } from 'react';
import Navbar from '../components/Navbar'

const NavLayout = ({children}:{children: ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default NavLayout