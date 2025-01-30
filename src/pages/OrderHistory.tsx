import NavLayout from '../layouts/NavLayout'
import { useEffect, useState } from 'react'
import { pb, usePocket } from '../contexts/PocketContext'
import { Collections, InvoicesResponse } from '../types/pocketbase'
import InvoiceCard from '../components/InvoiceCard'
import SectionLeftHeader from '../components/SectionLeftHeader'

const OrderHistory = () => {
    const { user } = usePocket()
    const [invoices, setInvoices] = useState<InvoicesResponse[]>([])

    useEffect(() => {
        if (!user) return;
        pb.collection(Collections.Invoices).getList(1, 20, {
            filter: `users = "${user.id}"`,
            sort: '-created'
        }).then(res => setInvoices(res.items))
    }, [user])

    return (
        <NavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-12">
            <div className="mb-5">
                    <SectionLeftHeader title='🫡 Order History' subtitle='Your delivery information and contact details' />
                </div>
                <div className="card grid grid-cols-1 gap-10">
                    {invoices.map((invoice, i) => (
                        <InvoiceCard invoice={invoice} key={i} />
                    ))}
                </div>
            </div>
        </NavLayout>
    )
}

export default OrderHistory