import Chart from '@/components/global/chart'
import GradientCard from '@/components/global/gradient-card'
import MetricsCard from '@/components/global/metrics-card'
import { VERONICA_CONSTANTS } from '@/lib/constants'
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

const page = ({params:{slug}}: Props) => {
  return (
    <div className='flex flex-col gap-y-10 '>
      <div className="flex gap-5 lg:flex-row flex-col">
        {
          VERONICA_CONSTANTS.dashboardCard.map((item) => (
            <GradientCard key={item.id} {...item} slug={slug}/>
          )) 
        }
        </div> 
        <div className="w-full flex lg:flex-row flex-col gap-5">
          <Chart/>
        <div className="lg:w-6/12">
         <MetricsCard/>
        </div>
        </div>
    </div>
  )
}

export default page