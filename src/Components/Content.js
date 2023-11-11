import React from "react";
import CheckingAccount from "./CheckingAccount";
import Invoices from "./Invoices";
import AccountWatchlist from "./AccountWatchlist";
import TotalCashFlow from "./TotalCashFlow";

const Content = () => {
    return(
        <div className="lg:w-[70%] xl:w-[82%] flex flex-col gap-4 lg:p-7 lg:h-[90vh] overflow-scroll">
            <div className='flex flex-col lg:flex-row justify-between gap-4 xl:h-[55%]'>
                <CheckingAccount />
                <Invoices />
            </div>

            <div className='flex flex-col lg:flex-row justify-between gap-4 xl:h-[55%]'>
                <TotalCashFlow />
                <AccountWatchlist />
            </div>
        </div>
    );
};

export default Content;
