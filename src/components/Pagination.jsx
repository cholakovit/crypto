import { useDispatch } from "react-redux"
import { paginate } from '../main/cryptoSlice'

export default function Pagination({cryptosPerPage, totalCryptos}) {
    const dispatch = useDispatch()
    const pageNumbers = []
  
    for(let i = 1; i <= Math.ceil(totalCryptos / cryptosPerPage); i++) {
        pageNumbers.push(i)
    }
  
    return (
      <div className="pagination">
        {pageNumbers.map(number => (
            <span key={number} onClick={() => dispatch(paginate(number))}>
                {number}
            </span>
        ))}
      </div>
    )
  }
  