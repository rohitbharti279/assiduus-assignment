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
        <div className='bg-white lg:w-[40%] rounded-xl overflow-scroll'>
            <p className='tracking-tight font-semibold text-lg p-3 px-5'>Account watchlist</p>
            <hr></hr>
            <table>
                <thead>
                    <tr className="text-left">
                        <th className="font-normal px-5 p-4">Account</th>
                        <th className="font-normal px-5">This Month</th>
                        <th className="font-normal px-5">YTD</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index} className="odd:bg-white even:bg-slate-200 ">
                            <td className="px-5 p-3">{item.category}</td>
                            <td className="px-5">{item.thisMonth}</td>
                            <td className="px-5">{item.YTD}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountWatchlist;