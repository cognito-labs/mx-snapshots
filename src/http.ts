import axios from 'axios';
import { DateTime } from 'luxon';

export const getTransactions = async (url: string, query: any): Promise<any> => {
    return axios.get(url, { params: query })
    .then((response: any) => {
        // const length = response.data.length;
        // console.log(`We've found ${length} [${query.function}] transactions.`);
        //@todo add tx interface.
        return response.data.map(({ 
            // txHash, gasUsed, gasPrice, 
            sender, fee, timestamp
        }: { sender: string, fee: number, timestamp: number }) => {
            var f = {  };
            return {
                sender, fee, 
                time: DateTime.fromSeconds(timestamp).setLocale('ro-RO').toLocaleString(DateTime.DATETIME_MED)
            }
        })
    })
    .catch((error: any) => {
        console.error(`Error fetching data: ${error.message}`);
    });
}