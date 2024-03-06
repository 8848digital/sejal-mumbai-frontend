import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoadMoreTableDataInMaster from '../LoadMoreTableDataInMaster';
import NoRecord from '@/components/NoRecord/NoRecord';

const MasterKarigarListing = ({
  karigarData,
  defaultData,
  HandleSearchInput,
  placeholder,
}: any) => {
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };
  const router = useRouter();
  const HandleDetails = (name: any) => {
    router.push({
      pathname: '/master/[karigarId]/KarigarDetailsMaster',
      query: {
        name: name,
        placeholder: placeholder,
      },
    });
  };

  return (
    <div>
      {defaultData?.length > 0 ? (
        <>
          <div className="container d-flex justify-content-between p-0 px-3">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                aria-describedby="emailHelp"
                className="form-control input-fields custom-input-field ps-2 p-1"
                placeholder={placeholder}
                onChange={HandleSearchInput}
              />
            </div>
            <div className="d-flex align-items-end">
              {karigarData?.length > 0 && (
                <div className="text-end pe-3 p-0 text-gray small ">
                  {karigarData?.slice(0, tableViewData)?.length} of{' '}
                  {karigarData?.length < 10
                    ? '0' + karigarData?.length
                    : karigarData?.length}
                </div>
              )}
            </div>
          </div>

          <div className="table-responsive  mt-2 px-3">
            <table className="table table-hover table-striped w-100 ">
              <thead>
                <tr className="table_row">
                  <th
                    scope="col"
                    className="thead text-start"
                    style={{ width: '80px' }}
                  >
                    Sr.No
                  </th>
                  <th scope="col" className="thead text-start">
                    {placeholder}
                  </th>
                </tr>
              </thead>
              <tbody>
                {karigarData?.length > 0 &&
                  karigarData !== null &&
                  karigarData
                    .slice(0, tableViewData)
                    .map((item: any, i: any) => (
                      <tr key={i}>
                        <td className="table-body-row cursor">{i + 1}</td>
                        <td
                          className="table-body-row cursor"
                          onClick={() => HandleDetails(item.karigar_name)}
                        >
                          {item.karigar_name}
                        </td>
                      </tr>
                    ))}
                {karigarData?.length > 20 && karigarData !== null && (
                  <LoadMoreTableDataInMaster
                    HandleTableViewRows={HandleTableViewRows}
                  />
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <NoRecord title="" content="No Records Found" />
      )}
    </div>
  );
};

export default MasterKarigarListing;
