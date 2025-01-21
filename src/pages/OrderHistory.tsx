import NavLayout from '../layouts/NavLayout'
import SectionHeader from '../components/SectionHeader'
import OrderProducts from '../components/OrderProducts'

const OrderHistory = () => {
    return (
        <NavLayout>
            <div className="max-w-screen-xl mx-auto px-5 py-12">
                <SectionHeader left />
                <div className="md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="w-full flex-none">
                        <div className="card grid grid-cols-1 gap-10">
                            {[...Array(6)].map((_, i) => (
                                <OrderProducts key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default OrderHistory