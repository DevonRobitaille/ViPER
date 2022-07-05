import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { PAGE_SIZE } from '../constants'
import { ReportListSchema } from '../schema/report.schema'
import { trpc } from '../utils/trpc'

function Reports() {
    const router = useRouter()
    const { mutate } = trpc.useMutation(['report.pagination'])
    const [skip, setSkip] = useState<number>(0)
    const [maxPage, setMaxPage] = useState<number>(3)
    const [reportList, setReportList] = useState<ReportListSchema>([])

    const updatePage = (change: number) => {
        change *= PAGE_SIZE;
        change = skip + change < 0 // less than zero
            ? -skip
            : skip + change >= maxPage // greater than max
                ? 0
                : change

        if (skip + change === skip) return;
        if (skip + change >= maxPage) return;

        mutate({ skip: skip + change }, {
            onSuccess: (result) => {
                setReportList((prev) => prev = result?.reportList ? result.reportList : [])
                setMaxPage((prev) => prev = result?.maxSize ? result.maxSize : 0)
            }
        })

        setSkip((prev) => prev += change)
    }

    useEffect(() => {
        mutate({ skip }, {
            onSuccess: (result) => {
                setReportList((prev) => prev = result?.reportList ? result.reportList : [])
                setMaxPage((prev) => prev = result?.maxSize ? result.maxSize : 0)
            }
        })
    }, [])

    return (
        <section className='w-full h-screen flex flex-col'>
            {/* Report List */}
            <div className='mb-auto mt-10'>
                <table className='table-auto min-w-full'>
                    <thead className='border-b-2 border-[#CCC]'>
                        <th className='font-normal text-[#888]'>Vendor</th>
                        <th className='font-normal text-[#888]'>Evaluator</th>
                        <th className='font-normal text-[#888]'>Supervisor</th>
                        <th className='font-normal text-[#888]'>Created On</th>
                        <th className='font-normal text-[#888]'>Updated On</th>
                    </thead>
                    <tbody>
                        {reportList && reportList.map((report, index) => {
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

            {/* Page Selector */}
            <div className='flex flex-row mx-auto h-40 z-50 items-center'>
                <button className='btn uppercase h-10 mx-5 w-[125px]' onClick={() => updatePage(-1)}>Previous</button>
                <p className='items-center text-[#FF0066] font-semibold'>{"Page " + ((skip / PAGE_SIZE) + 1)}</p>
                <button className='btn uppercase h-10 mx-5 w-[125px]' onClick={() => updatePage(1)}>Next</button>
            </div>

        </section>
    )
}

export default Reports