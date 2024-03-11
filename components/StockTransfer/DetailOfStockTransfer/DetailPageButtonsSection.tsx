import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../../styles/readyReceipts.module.css';

const DetailPageButtonsSection: any = ({
  data,
  stateForDocStatus,
  handleUpdateStockTransfer,
  setReadOnlyFields,
  readOnlyFields,
  setShowSaveButtonForAmendFlow,
  showSaveButtonForAmendFlow,
  setStateForDocStatus,
  HandleAmendButtonForDuplicateChitti,
  handlePrintApi,
  handleUpdateDocStatus,
  HandleDeleteRecord,
  printApiMethod,
  printApiEntity, //   specificDataFromStore,
}: any) => {
  const { query } = useRouter();
  const router = useRouter();

  const pathParts = router?.asPath?.split('/');
  const receiptType = pathParts[1];

  const HandleAmendButtonChanges: any = async () => {
    setShowSaveButtonForAmendFlow(true);
    setStateForDocStatus(true);
    setReadOnlyFields(false);
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="">
        <button
          type="button"
          className={`${styles.create_button} px-2 py-0 me-2`}
          onClick={() => {
            router.push(`/${receiptType}`);
            // specificDataFromStore = null;
          }}
        >
          Back
        </button>
        {stateForDocStatus === true && data?.docStatus === 0 && (
          <button type="button" className={`btn ${styles.docstatus_button}`}>
            <span className={`${styles.docstatus_button_text}`}>Not saved</span>
          </button>
        )}
        {stateForDocStatus === false && data?.docStatus === 0 && (
          <button type="button" className={`btn ${styles.docstatus_button}`}>
            <span className={`${styles.docstatus_button_text}`}>Draft</span>
          </button>
        )}
        {data?.docStatus === 1 && (
          <button type="button" className={`btn ${styles.docstatus_button}`}>
            <span className={`${styles.docstatus_button_text}`}>Submitted</span>
          </button>
        )}
        {data?.docStatus === 2 && readOnlyFields && (
          <button type="button" className={`btn ${styles.docstatus_button}`}>
            <span className={`${styles.docstatus_button_text}`}>Cancelled</span>
          </button>
        )}
        {showSaveButtonForAmendFlow &&
          stateForDocStatus &&
          readOnlyFields === false && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Not saved
              </span>
            </button>
          )}
      </div>
      <div className={`${styles.button_field}`}>
        {data?.docStatus === 0 && stateForDocStatus && (
          <button
            type="button"
            className={`${styles.create_button} px-2 py-0 me-2`}
            onClick={handleUpdateStockTransfer}
          >
            Save
          </button>
        )}
        {data?.docStatus === 1 && stateForDocStatus === false && (
          <button
            type="button"
            className={`${styles.create_button} px-2 py-0 me-2`}
            onClick={() =>
              handlePrintApi(query?.receiptId, printApiMethod, printApiEntity)
            }
          >
            Print
          </button>
        )}
        {data?.docStatus === 0 && stateForDocStatus === false && (
          <button
            type="button"
            className={`${styles.create_button} px-2 py-0 me-2`}
            onClick={() => handleUpdateDocStatus('1')}
          >
            Submit
          </button>
        )}
        {data?.posting_date === new Date()?.toISOString()?.split('T')[0] && (
          <>
            {data?.docStatus === 1 && stateForDocStatus === false && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                onClick={() => handleUpdateDocStatus('2')}
              >
                Cancel
              </button>
            )}
          </>
        )}
        {data?.posting_date === new Date()?.toISOString()?.split('T')[0] && (
          <>
            {data?.docStatus === 2 && stateForDocStatus === false && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                onClick={HandleAmendButtonChanges}
              >
                Amend
              </button>
            )}
          </>
        )}

        {showSaveButtonForAmendFlow &&
          stateForDocStatus &&
          readOnlyFields === false && (
            <button
              type="submit"
              onClick={HandleAmendButtonForDuplicateChitti}
              className={`${styles.create_button} px-2 py-0 me-2 `}
            >
              Save
            </button>
          )}

        {data?.posting_date === new Date()?.toISOString()?.split('T')[0] && (
          <>
            {data?.docStatus === 2 && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2 `}
                onClick={() => HandleDeleteRecord(query?.stockId)}
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPageButtonsSection;
