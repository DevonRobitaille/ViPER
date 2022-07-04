import { Fragment, useState } from 'react'
import { Combobox, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { CreateVendorInput, VendorListBoxSchema } from '../schema/vendor.schema'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'

const TYPE_OF_REPORTS = [
    'PERIODIC',
    'INCREASED SUPERVISION'
]

const PERFORMANCE_METRICS = {
    '1. On Time Delivery': 0,
    '2. Cost': 0,
    '3. Quality': 0,
    '4. Responsiveness': 0,
    '5. Reliability': 0,
    '6. Accountability': 0,
    '7. Lead Time': 0,
    '8. Change Order': 0,
    '9. Professionalism': 0
}

interface PERFORMANCE_METRICS_INTERFACE {
    '1. On Time Delivery': number;
    '2. Cost': number;
    '3. Quality': number;
    '4. Responsiveness': number;
    '5. Reliability': number;
    '6. Accountability': number;
    '7. Lead Time': number;
    '8. Change Order': number;
    '9. Professionalism': number;
}

function PERFORM() {
    const router = useRouter()

    // Vendor ComboBox (Section 1)
    const [vendorSelected, setVendorSelected] = useState<VendorListBoxSchema | null>(null)
    const [query, setQuery] = useState<string>('')
    const { data: vendors, error } = trpc.useQuery(['vendor.all'], {
        onSuccess: (result) => {
            setVendorSelected(result[0])
        }
    })
    const filteredVendors =
        query === ''
            ? vendors
            : Array.isArray(vendors)
                ? vendors.filter((vendor) => {
                    const name = vendor.firstName + " " + vendor.lastName;
                    return name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
                })
                : ''

    // Report Types (Section 2)
    const [reportTypeSelected, setReportTypeSelected] = useState<string>(TYPE_OF_REPORTS[0])

    // Section 4
    const [performanceMetric, setPerformanceMetric] = useState<PERFORMANCE_METRICS_INTERFACE>(PERFORMANCE_METRICS)
    const changeMetric = (update: { metric: string, value: number }) => {
        setPerformanceMetric((prev) => prev = { ...prev, [update.metric]: update.value })
    }

    // Section 5
    const [overallPerformance, setOverallPerformance] = useState<number>(1)

    const handleSubmit = () => {
        const report = {
            vendorId: vendorSelected?.id,
            reportType: reportTypeSelected,
            reportDate: undefined,
            objectivesReviewed: document?.getElementById('tA-3')?.value,
            performanceScores: performanceMetric,
            justification: document?.getElementById('tA-4')?.value,
            overallPerformance: overallPerformance,
            objectivesFuture: document?.getElementById('tA-5')?.value,
            additionalNotes: document?.getElementById('tA-6')?.value,
        }

        router.push('/reports')
    }

    return (
        <section className="mx-5 mt-10">
            {/* SECTION 1: IDENTIFICATION */}
            <section>
                <div className="px-2 border rounded-none border-t-2 border-black">
                    <p className="font-semibold text-base">SECTION 1: IDENTFICATION</p>
                </div>
                <div className="bg-[#DDD] px-2 py-2 border rounded-none border-black grid grid-cols-1 md:grid-cols-3 gap-2">
                    {/* Select Vendor */}
                    <Combobox value={vendorSelected} onChange={setVendorSelected}>
                        <div className='relative'>
                            {/* Input Field */}
                            <div className="inputField inputDiv focus:outline-none flex flex-row">
                                <Combobox.Input
                                    className='w-full border-none py-2 text-sm leading-5 text-gray-900 focus:outline-none'
                                    displayValue={(vendor: CreateVendorInput) => vendor ? vendor.firstName + " " + vendor.lastName : ""}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                                <Combobox.Button className="absoluate inset-y-0 right-0 flex items-center pr-2">
                                    <SelectorIcon
                                        className='icon h-5'
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>
                            </div>
                            {/* Dropdown selection */}
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery('')}
                            >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-none bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredVendors && filteredVendors.length === 0 && query !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredVendors && filteredVendors.map((vendor) => (
                                            <Combobox.Option
                                                key={vendor.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 font-semibold' : 'text-gray-900'
                                                    }`
                                                }
                                                value={vendor}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {vendor.firstName + " " + vendor.lastName}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-[#FF0066]'
                                                                    }`}
                                                            >
                                                                <CheckIcon className="h-5 w-5 text-[#FF0066]" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                    <div className='col-span-2' />
                    {/* Populate Fields */}
                    <div className="inputDiv">
                        <input id="vendor-firstName" disabled value={vendorSelected ? vendorSelected.firstName : undefined} placeholder="First Name" className="inputField" />
                    </div>
                    <div className="inputDiv">
                        <input id="vendor-lastName" disabled value={vendorSelected ? vendorSelected.lastName : undefined} placeholder="Last Name" className="inputField" />
                    </div>
                    <div className="inputDiv">
                        <input id="vendor-contact" disabled value={vendorSelected ? vendorSelected.email === null ? "No email provided" : vendorSelected.email : undefined} placeholder="Email (optional)" className="inputField" />
                    </div>
                    <div className="inputDiv">
                        <input id="vendor-job" disabled value={vendorSelected ? vendorSelected.job.name : undefined} placeholder="Job" className="inputField" />
                    </div>
                    <div className="inputDiv">
                        <input id="vendor-company" disabled value={vendorSelected ? vendorSelected.company.name : undefined} placeholder="Company" className="inputField" />
                    </div>
                </div>
            </section>

            {/* SECTION 2: GENERAL */}
            <section>
                <div className="px-2 border rounded-none border-t-1 border-black">
                    <p className="font-semibold text-base">SECTION 2: GENERAL</p>
                </div>
                <div className="bg-[#DDD] px-2 py-2 border rounded-none border-black grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Listbox value={reportTypeSelected} onChange={setReportTypeSelected}>
                        <div className='relative'>
                            <Listbox.Button className="relative w-full cursor-default rounded-none bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                                <span className="block truncate">{reportTypeSelected}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <SelectorIcon
                                        className="icon h-5"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {TYPE_OF_REPORTS.map((reportType, reportTypeIdx) => (
                                        <Listbox.Option
                                            key={reportTypeIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#DDD] text-black' : 'text-gray-900'
                                                }`
                                            }
                                            value={reportType}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {reportType}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FF0066]">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                    <div>
                        date
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
                        <textarea id="tA-3" placeholder='Objectives that were reviewed...' className='w-full py-1 px-2 focus:outline-none'></textarea>
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
                                {Object.keys(PERFORMANCE_METRICS).map((metric, index) => {
                                    return (
                                        <tr key={metric}>
                                            <td className='w-[99%] text-md md:text-sm'>{metric}</td>
                                            <td><input type='radio' checked={performanceMetric[metric] === 0} onClick={() => changeMetric({ metric, value: 0 })} /></td>
                                            <td><input type='radio' checked={performanceMetric[metric] === 1} onClick={() => changeMetric({ metric, value: 1 })} /></td>
                                            <td><input type='radio' checked={performanceMetric[metric] === 2} onClick={() => changeMetric({ metric, value: 2 })} /></td>
                                            <td><input type='radio' checked={performanceMetric[metric] === 3} onClick={() => changeMetric({ metric, value: 3 })} /></td>
                                            <td><input type='radio' checked={performanceMetric[metric] === 4} onClick={() => changeMetric({ metric, value: 4 })} /></td>
                                            <td><input type='radio' checked={performanceMetric[metric] === 5} onClick={() => changeMetric({ metric, value: 5 })} /></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                    {/* Justification */}
                    <div className='bg-[#DDD] w-full h-full p-2 col-span-2'>
                        <div className='inputDiv'>
                            <textarea id="tA-4" placeholder='Justification for performance evaluation...' className='w-full py-1 px-2 focus:outline-none'></textarea>
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
                                    <td><input type='radio' checked={overallPerformance === 0} onClick={() => setOverallPerformance((prev) => prev = 0)} /></td>
                                    <td><input type='radio' checked={overallPerformance === 1} onClick={() => setOverallPerformance((prev) => prev = 1)} /></td>
                                    <td><input type='radio' checked={overallPerformance === 2} onClick={() => setOverallPerformance((prev) => prev = 2)} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='bg-[#DDD] w-full h-full p-2 col-span-2'>
                        <div className='inputDiv'>
                            <textarea id="tA-5" placeholder='Objectives that will be reviewed upon next PER...' className='w-full py-1 px-2 focus:outline-none'></textarea>
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
                        <textarea id="tA-6" placeholder='Additional notes from the review...' className='w-full py-1 px-2 focus:outline-none'></textarea>
                    </div>
                </div>
            </section>

            {/* Button to submit report */}
            <div className='flex mx-auto py-5'>
                <button onClick={() => handleSubmit()} className='btn max-w-xs'>Submit Report</button>
            </div>
        </section>
    )
}

export default PERFORM