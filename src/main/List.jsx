import { useSelector, useDispatch } from "react-redux"
import { 
    getCryptoStatus, 
    getCryptoErrors, 
    fetchCrypto, 
    selectCryptosPerPage, 
    selectCryptosLength, 
    paginate, 
    selectCryptosData,
    //selectAllCryptos,
    selectCurrentCryptos
} from "./cryptoSlice"

import { useEffect, useState } from "react"
import Pagination from '../components/Pagination'

import { Grid } from "../main/Grid.styles"
import { cryptoSort } from './cryptoSlice'

import { SortButton, headers} from '../helper/Helper'

const List = () => {
    const dispatch = useDispatch()

    const [sortKey, setSortKey] = useState('')
    const [sortOrder, setSortOrder] = useState("desc")
    
    const cryptoStatus = useSelector(getCryptoStatus)
    const error = useSelector(getCryptoErrors)

    //const cryptos = useSelector(selectAllCryptos)
    const cryptosPerPage = useSelector(selectCryptosPerPage)
    const cryptosLength = useSelector(selectCryptosLength)

    //const selectCryptos = useSelector(selectCryptosData)

    const currentCryptos = useSelector(selectCurrentCryptos)

    //console.log('selectCryptos List', currentCryptos)

    

    useEffect(() => {
        if (cryptoStatus === 'idle') {
            dispatch(fetchCrypto())
        }
        dispatch(paginate(1))
    }, [cryptoStatus, dispatch])

    function changeSort(key) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    
        setSortKey(key)

        console.log('list key', key)

        dispatch(cryptoSort({ sortKey: key, sortOrder: sortOrder }))
    }

    let content
    if(cryptoStatus === 'loading') {
        content = <p>Loading ...</p>;
    } else if(cryptoStatus === 'succeeded') {
        let i = 0
        content =         
            <>
                <Grid>
                    <thead>
                        <tr>
                            {headers.map((row) => {
                                return (
                                    <td key={row.key}>
                                        {row.label}{" "}
                                        <SortButton columnKey={row.key} onClick={() => changeSort(row.key)} {...{sortOrder, sortKey}} />
                                    </td>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                    {
                        currentCryptos.map(crypto => {
                            return (
                                <tr key={i++}>
                                    <td><strong>{crypto.baseSymbol}</strong> {crypto.baseId}</td>
                                    <td>{crypto.exchangeId}</td>
                                    <td>{crypto.priceUsd}</td>
                                    <td>{crypto.volumeUsd24Hr}</td>
                                    <td>{crypto.tradesCount24Hr}</td>
                                    <td>{crypto.rank}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Grid>
                <Pagination cryptosPerPage={cryptosPerPage} totalCryptos={cryptosLength} />
            </>
    } else if(cryptoStatus === 'failed') {
        content = <p>{error}</p>
    }

    return (content)
}

export default List