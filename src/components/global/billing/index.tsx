import React from 'react'
import PaymentCard from './payment-card'

type Props = {}

const Billing = (props: Props) => {
  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
        <PaymentCard label='FREE' plan='FREE'/>
        <PaymentCard label='PRO' plan='FREE'/>
    </div>
  )
}

export default Billing