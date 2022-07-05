import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../utils/trpc'

function Reports() {
    const router = useRouter()
    const { data, error } = trpc.useQuery(['report.all'])

    return (
        <section className='w-full h-screen flex flex-col md:flex-row'>
            {/* Search Bar */}
            <div className='mx-5 my-2'>
                filter
            </div>
            {/* Report List */}
            <div className='flex-1 ml-5 md:ml-0 mr-5 my-2'>
                <table className='table-auto min-w-full'>
                    <thead className='border-b-2 border-[#CCC]'>
                        <th className='font-normal text-[#888]'>Vendor</th>
                        <th className='font-normal text-[#888]'>Evaluator</th>
                        <th className='font-normal text-[#888]'>Supervisor</th>
                        <th className='font-normal text-[#888]'>Created On</th>
                        <th className='font-normal text-[#888]'>Updated On</th>
                    </thead>
                    <tbody>
                        {data && data.map((report, index) => {
                            return (
                                <tr key={report.id} className="hover:cursor-pointer border-b-[1px] border-[#CCC]" onClick={() => router.push({ pathname: '/report', query: { id: report.id } })}>
                                    <td className='text-sm text-center'>
                                        <div className='flex flex-col'>
                                            <span>{report.vendor.firstName + " " + report.vendor.lastName}</span>
                                            <span className='text-xs'>{report.vendor.company.name + " - " + report.vendor.job.name}</span>
                                        </div>
                                    </td>
                                    <td className='text-sm text-center'>{report.evaluator.firstName + " " + report.evaluator.lastName}</td>
                                    <td className='text-sm text-center'>{report.supervisor ? report.supervisor.firstName + " " + report.supervisor.lastName : "Report has not been reviewed by supervisor"}</td>
                                    <td className='text-sm text-center'>{format(report.createdAt, 'dd MMMM, yyyy')}</td>
                                    <td className='text-sm text-center'>{format(report.updatedAt, 'dd MMMM, yyyy')}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Reports