import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { format } from 'date-fns'

interface IProps {
    id: string
}

const PERViewOnlyFORM: NextPage<IProps> = (props) => {
    const { id } = props
    const router = useRouter()
    const { data: report, error, isLoading } = trpc.useQuery(['report.get-id', {
        id: id
    }])

    if (error) router.push('/reports')

    const { mutate } = trpc.useMutation(['report.approve'])

    return (
        <div className='flex w-full flex-col lg:flex-row'>
            <section className="lg:mx-5 w-full my-10 mx-auto">
                {/* SECTION 1: IDENTIFICATION */}
                <section>
                    <div className="px-2 border rounded-none border-t-2 border-black">
                        <p className="font-semibold text-base">SECTION 1: IDENTFICATION</p>
                    </div>
                    <div className="bg-[#DDD] px-2 py-2 border rounded-none border-black grid grid-cols-1 md:grid-cols-3 gap-2">
                        {/* Populate Fields */}
                        <div className="inputDiv">
                            <input id="vendor-firstName" disabled value={report?.vendor ? report.vendor.firstName : undefined} placeholder="First Name" className="inputField black bg-[#EDEDED]" />
                        </div>
                        <div className="inputDiv">
                            <input id="vendor-lastName" disabled value={report?.vendor ? report.vendor.lastName : undefined} placeholder="Last Name" className="inputField black bg-[#EDEDED]" />
                        </div>
                        <div className="inputDiv">
                            <input id="vendor-contact" disabled value={report?.vendor ? report.vendor.email === null ? "No email provided" : report.vendor.email : undefined} placeholder="Email (optional)" className="inputField black bg-[#EDEDED]" />
                        </div>
                        <div className="inputDiv">
                            <input id="vendor-company" disabled value={report?.vendor ? report.vendor.company.name : undefined} placeholder="Company" className="inputField black bg-[#EDEDED]" />
                        </div>
                        <div className="inputDiv">
                            <input id="vendor-job" disabled value={report?.vendor ? report.vendor.job.name : undefined} placeholder="Job" className="inputField black bg-[#EDEDED]" />
                        </div>
                    </div>
                </section>

                {/* SECTION 2: GENERAL */}
                <section >
                    <div className="px-2 border rounded-none border-t-1 border-black">
                        <p className="font-semibold text-base">SECTION 2: GENERAL</p>
                    </div>
                    <div className="bg-[#DDD] px-2 py-2 border rounded-none border-black grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="inputDiv">
                            <input id="reportType" disabled value={report?.reportType ? report.reportType.replace(/_/g, " ") : undefined} placeholder="Company" className="inputField black bg-[#EDEDED]" />
                        </div>
                        <div className="inputDiv">
                            <input id="reportDate" disabled value={report?.reportDate ? format(report.reportDate, "dd MMMM, yyyy") : undefined} placeholder="Company" className="inputField black bg-[#EDEDED]" />
                        </div>
                    </div>
                </section>

                {/* SECTION 3: OBJECTIVES REVIEWED */}
                <section>
                    <div className="px-2 border rounded-none border-t-1 border-black">
                        <p className="font-semibold text-base">SECTION 3: OBJECTIVES REVIEWED</p>
                    </div>
                    <div className='bg-[#DDD] border border-black border-t-1 w-full p-2'>
                        <div className='inputDiv'>
                            <textarea id="tA-3" disabled value={report?.objectivesReviewed ? report.objectivesReviewed : "No objectives reviewed notes."} placeholder='Objectives that were reviewed...' className='w-full py-1 px-2 focus:outline-none'></textarea>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: PERFORMANCE */}
                <section>
                    <div className="px-2 border rounded-none border-t-1 border-black flex items-center">
                        <p className="font-semibold text-base flex-1 mr-5">SECTION 4: PERFORMANCE</p>
                        <div>
                            <div className='flex flex-col md:flex-row'>
                                <div className='flex items-center'>
                                    <p className='font-semibold pr-1'>N</p>
                                    <p className='text-xs flex-wrap max-w-[65px] mr-2'>Not Observed</p>
                                    <p className='font-semibold pr-1'>D</p>
                                    <p className='text-xs flex-wrap max-w-[80px] mr-2'>Detrimental Performance</p>
                                    <p className='font-semibold pr-1'>P</p>
                                    <p className='text-xs flex-wrap max-w-[80px] mr-2'>Poor Performance</p>

                                </div>
                                <div className='flex items-center'>
                                    <p className='font-semibold pr-1'>S</p>
                                    <p className='text-xs flex-wrap max-w-[80px] mr-2'>Standard Performance</p>
                                    <p className='font-semibold pr-1'>G</p>
                                    <p className='text-xs flex-wrap max-w-[80px] mr-2'>Good Performance</p>
                                    <p className='font-semibold pr-1'>E</p>
                                    <p className='text-xs flex-wrap max-w-[80px] mr-2'>Excellent Performance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 bg-[#DDD] h-full  border border-black border-t-1'>
                        {/* Score */}
                        <div>
                            <table className='m-3'>
                                <thead>
                                    <tr>
                                        <th />
                                        <th>N</th>
                                        <th>D</th>
                                        <th>P</th>
                                        <th>S</th>
                                        <th>G</th>
                                        <th>E</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report && report?.score && Object.keys(report.score).map((score, index) => {
                                        if (score !== "id") {
                                            return (
                                                <tr key={score}>
                                                    <td className='w-[99%] text-md md:text-sm'>{score}</td>
                                                    <td><input type='radio' disabled checked={report.score[score] === 0} /></td>
                                                    <td><input type='radio' disabled checked={report.score[score] === 1} /></td>
                                                    <td><input type='radio' disabled checked={report.score[score] === 2} /></td>
                                                    <td><input type='radio' disabled checked={report.score[score] === 3} /></td>
                                                    <td><input type='radio' disabled checked={report.score[score] === 4} /></td>
                                                    <td><input type='radio' disabled checked={report.score[score] === 5} /></td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>

                        </div>
                        {/* Justification */}
                        <div className='bg-[#DDD] w-full h-full p-2 col-span-2 pt-4'>
                            <div className='inputDiv'>
                                <textarea rows={9} id="tA-4" disabled value={report?.justification ? report.justification : "No justification notes."} placeholder='Justification for performance evaluation...' className='w-full py-1 px-2 focus:outline-none'></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: OBJECTIVES FUTURE */}
                <section>
                    <div className="px-2 border rounded-none border-t-1 border-black">
                        <p className="font-semibold text-base">SECTION 5: OBJECTIVES FUTURE</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 bg-[#DDD]  border border-black border-t-1'>
                        <div className='mx-auto'>
                            <p className='font-semibold my-2 text-center'>OVERALL PERFORMANCE</p>
                            <table className='mx-auto text-center mb-2'>
                                <thead>
                                    <tr className=''>
                                        <th className='px-1 font-normal text-sm'>POOR</th>
                                        <th className='px-1 font-normal  text-sm'>STANDARD</th>
                                        <th className='px-1 font-normal  text-sm'>EXCEEDED</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type='radio' disabled checked={report?.overallPerformance === 0} /></td>
                                        <td><input type='radio' disabled checked={report?.overallPerformance === 1} /></td>
                                        <td><input type='radio' disabled checked={report?.overallPerformance === 2} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='bg-[#DDD] w-full h-full p-2 col-span-2'>
                            <div className='inputDiv'>
                                <textarea disabled id="tA-5" value={report?.objectivesFuture ? report.objectivesFuture : "No objectives future notes."} placeholder='Objectives that will be reviewed upon next PER...' className='w-full py-1 px-2 focus:outline-none'></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: ADDITIONAL REVIEW */}
                <section>
                    <div className="px-2 border rounded-none border-t-1 border-black">
                        <p className="font-semibold text-base">SECTION 6: ADDITIONAL REVIEW</p>
                    </div>
                    <div className='bg-[#DDD] w-full h-full p-2 col-span-2 border border-black border-t-1 border-b-2'>
                        <div className='inputDiv'>
                            <textarea id="tA-6" disabled value={report?.additionalNotes ? report.additionalNotes : "No objectives reviewed notes."} placeholder='Additional notes from the review...' className='w-full py-1 px-2 focus:outline-none'></textarea>
                        </div>
                    </div>
                </section>
            </section>

            {/* Additional Details */}
            <div className='my-9 flex flex-col mx-auto pr-5 w-[200px]'>
                {/* Evaluator */}
                <div className='mb-5'>
                    <p>Evaluator</p>
                    <hr className='h-[1px] w-full bg-[#888] mb-2' />
                    <p className='text-sm text-[#888] mb-1'>{report?.evaluator && (report.evaluator.firstName + " " + report.evaluator.lastName)}</p>
                    <p className='text-xs text-[#888]'>{report?.createdAt ? format(report.createdAt, "dd MMMM, yyyy") : ""}</p>
                </div>

                {/* Supervisor */}
                <div className='mb-5'>
                    <p>Supervisor Approval</p>
                    <hr className='h-[1px] w-full bg-[#888] mb-2' />
                    <p className='text-sm text-[#888] mb-1'>{report?.supervisor ? (report.supervisor.firstName + " " + report.supervisor.lastName) : "Not Approved Yet."}</p>
                    <p className='text-xs text-[#888]'>{report?.approvedAt ? format(report.approvedAt, "dd MMMM, yyyy") : ""}</p>
                </div>

                {/* Last Updated */}
                <div className='mb-5'>
                    <p>Last Updated</p>
                    <hr className='h-[1px] w-full bg-[#888] mb-2' />
                    <p className='text-sm text-[#888]'>{report?.updatedAt && format(report.updatedAt, "dd MMMM, yyyy")}</p>
                </div>

                {/* What changed */}
                <div className='my-10 flex-1' />

                {/* Buttons */}
                <button className={`btn mb-1 ${report?.approvedAt ? "hidden" : ""}`} onClick={() => router.push({ pathname: '/edit', query: { id: report?.id ? report.id : "" } })}>Edit</button>
                <button onClick={() => {
                    mutate({ id })
                    router.reload()
                }} className={`btn mb-1 ${report?.approvedAt ? "hidden" : ""}`}>Approve</button>
                {/* <button className='btn mb-1'>History</button> */}
            </div >
        </div >
    )
}

export default PERViewOnlyFORM