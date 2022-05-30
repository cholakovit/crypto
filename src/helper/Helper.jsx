

export const headers = [
    { key: "baseSymbol", label: "NAME" },
    { key: "exchangeId", label: "EXCHANGE" },
    { key: "priceUsd", label: "PRICE USD" },
    { key: "volumeUsd24Hr", label: "24H VOLUME" },
    { key: "tradesCount24Hr", label: "24H TRADES COUNT" },
    { key: "rank", label: "RANK" },
  ]
  
  export function SortButton({sortOrder, columnKey, sortKey, onClick}) {
    return (
      <button onClick={onClick} className={`${sortKey === columnKey && sortOrder === "desc" ? "sort-button sort-reverse" : "sort-button"}`}>
        ▲
      </button>
    );
  }