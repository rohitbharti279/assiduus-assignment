import React from "react";
import CheckingAccount from "./CheckingAccount";
import Invoices from "./Invoices";
import AccountWatchlist from "./AccountWatchlist";
import TotalCashFlow from "./TotalCashFlow";

const Content = () => {
    return(
        <div className="lg:w-[78%] xl:w-[82%] flex flex-col gap-4 mt-5 md:mt-0 md:p-5 lg:p-7 lg:h-[90vh] mb-5 md:mb-0 overflow-scroll">
            <div className='flex flex-col md:flex-row justify-between gap-4 md:h-[21rem] xl:h-[50%] md:pr-5 lg:pr-0'>
                <CheckingAccount />
                <Invoices />
            </div>

            <div className='flex flex-col xl:flex-row justify-between gap-4 xl:h-[50%]'>
                <TotalCashFlow />
                <AccountWatchlist />
            </div>
        </div>
    );
};

export default Content;
