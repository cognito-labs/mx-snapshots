import axios from 'axios';
import { getTransactions } from './http';

const EXECUTION_START = new Date();
const address = "erd1qqqqqqqqqqqqqpgq9a0dc9dmzyuteca85xlk0z7hufq064epkz6qq045h5";
const hostname = "https://api.multiversx.com";
const action = `accounts/${address}/transactions`;
const url = `${hostname}/${action}`;
const query = {
  "from": 0,
  "size": 50,
  "function": "mint",
  "status": "success"
};

console.log(`Running script at: ${EXECUTION_START.toISOString()}`);

const run = async () => {
  try {
    const txs = [];
    let ellapesed = new Date();
    let transactions = await getTransactions(url, query);
    txs.push(transactions);

    console.log(`⌛️ Request execution took: ${(new Date().getTime() - ellapesed.getTime())/1000} seconds.`);
    console.log(`💬 Found ${transactions.length} starting from ${query.from} up to ${query.from + query.size}`);
    
    while(transactions.length == query.size) {
      query.from = query.from + query.size;
      ellapesed = new Date();
      transactions = await getTransactions(url, {
        ...query,
        from: query.from
      });
      console.log(`⌛️ Request execution took: ${(new Date().getTime() - ellapesed.getTime())/1000} seconds.`);
      txs.push(transactions);
      console.log(`💬 Found ${transactions.length} starting from ${query.from} up to ${query.from + query.size}`);
    }

    console.log(`💬 Found a total of ${txs.flat().length} in under ${((new Date().getTime() - EXECUTION_START.getTime())/1000).toFixed(2)}seconds`)
    const addressList = txs.flat().map((tx: any) => { return tx.sender});
    console.debug(addressList);
    console.log("✅ Executed run routine successfully.");
  } catch (error: any) {
    console.error('Error in run function:', error.message);
  }
};

run();

// const transactions = await getTransactions(url, query);

// axios.get(url, { params: query })
//   .then((response: any) => {
//     const length = response.data.length;
//     console.log(`We've found ${length} [${query.function}] transactions.`);
//     //@todo add tx interface.
//     const tsx = response.data.map(({ 
//         txHash, gasUsed, gasPrice, 
//         sender, fee, timestamp
//     }: any) => {
//       return {
//         txHash, gasUsed, gasPrice, 
//         sender, fee, timestamp
//       }
//     })
    
//     console.log(tsx);
//   })
//   .catch((error: any) => {
//     console.error(`Error fetching data: ${error.message}`);
//   });
