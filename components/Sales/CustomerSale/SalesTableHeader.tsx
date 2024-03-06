import React from 'react'

const SalesTableHeader = () => {
    return (
        <tr>
            <th className="thead" scope="col">
                No.
            </th>
            <th className="thead" scope="col">
                Item Code
                {/* <span className="text-danger">*</span> */}
            </th>
            <th className="thead" scope="col">
                Gross wt
            </th>
            <th className="thead" scope="col">
                Kun Wt
            </th>
            <th className="thead" scope="col">
                Cs Wt
            </th>
            <th className="thead" scope="col">
                BB Wt
            </th>
            <th className="thead" scope="col">
                Other Wt
            </th>
            <th className="thead" scope="col">
                Net wt
            </th>
            <th className="thead" scope="col">
                Cs@
            </th>
            <th className="thead" scope="col">
                Cs Amt
            </th>
            <th className="thead" scope="col">
                Kun Pc
            </th>
            <th className="thead" scope="col">
                Kun@
            </th>
            <th className="thead" scope="col">
                Kun Amt
            </th>
            <th className="thead" scope="col">
                Ot @
            </th>
            <th className="thead" scope="col">
                Ot Amt
            </th>
            <th className="thead" scope="col">
                Other
            </th>
            <th className="thead" scope="col">
                Amount
            </th>
            <th className="thead" scope="col"></th>
        </tr>
    )
}

export default SalesTableHeader