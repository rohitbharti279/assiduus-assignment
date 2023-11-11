import React from "react";

const AccountWatchlist = () => {
    const tableData = [
        { category: 'Sales', thisMonth: '1,194.58', YTD: '11,418.29' },
        { category: 'Advertising', thisMonth: '6,879.02', YTD: '9,271.36' },
        { category: 'Inventory', thisMonth: '4,692.26', YTD: '9,768.09' },
        { category: 'Entertainment', thisMonth: '0.00', YTD: '0.00' },
        { category: 'Product', thisMonth: '4,652.10', YTD: '2,529.90' },
    ];

    return (
        <div className='bg-white xl:w-[60%] rounded-xl'>
            <p className='tracking-tight font-semibold text-lg p-3 px-5'>Account watchlist</p>
            <hr></hr>
            <table className="w-full">
                <thead>
                    <tr className="text-left  text-sm tracking-tight text-slate-400">
                        <th className="font-normal px-5 p-2">Account</th>
                        <th className="font-normal px-5 md:pr-0 ">This Month</th>
                        <th className="font-normal px-5 md:pr-0 ">YTD</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index} className="odd:bg-white even:bg-slate-200 tracking-tight text-sm">
                            <td className="px-5 p-1 font-medium ">{item.category}</td>
                            <td className="px-5 font-medium md:pr-0 ">{item.thisMonth}</td>
                            <td className="px-5 font-medium md:pr-0 ">{item.YTD}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountWatchlist;
