import { useLayoutEffect, useState } from "react";
import axios from "../Axios";

export default function useRate() {
    const [rate, setRate] = useState('');
    useLayoutEffect(() => {
        (async function() {
            const { data: { data } } = await axios.get('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
            setRate(Math.trunc(data.rates['USD']));
        }());
    }, []);

    return { rate }
}