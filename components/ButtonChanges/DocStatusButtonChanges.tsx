import { get_specific_receipt_data } from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '../../styles/readyReceipts.module.css';
import UseCustomReceiptHook from '@/hooks/PurchaseReceiptHook/custom-receipt-hook';

const DocStatusButtonChanges = ({
  data,
  stateForDocStatus,
  handleUpdateReceipt,
  setReadOnlyFields,
  readOnlyFields,
  setShowSaveButtonForAmendFlow,
  showSaveButtonForAmendFlow,
  setStateForDocStatus,
  HandleAmendButtonForDuplicateChitti,
  handlePrintApi,
  HandleUpdateDocStatus,
  HandleDeleteReceipt,
  printApiMethod,
  printApiEntity,
  specificDataFromStore,
}: any) => {
  const { query } = useRouter();
  const router = useRouter();

  const pathParts = router?.asPath?.split('/');
  const receiptType = pathParts[2];

  const HandleAmendButtonChanges: any = async () => {
    setShowSaveButtonForAmendFlow(true);
    setStateForDocStatus(true);
    setReadOnlyFields(false);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="">
          <button
            type="button"
            className={`${styles.create_button} px-2 py-0 me-2`}
            onClick={() => {
              router.push(`/readyReceipt/${receiptType}`);
              specificDataFromStore = null;
            }}
          >
            Back
          </button>
          {stateForDocStatus === true && data?.docstatus === 0 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Not saved
              </span>
            </button>
          )}
          {stateForDocStatus === false && data?.docstatus === 0 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>Draft</span>
            </button>
          )}
          {data?.docstatus === 1 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Submitted
              </span>
            </button>
          )}
          {data?.docstatus === 2 && readOnlyFields && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Cancelled
              </span>
            </button>
          )}
          {showSaveButtonForAmendFlow &&
            stateForDocStatus &&
            readOnlyFields === false && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.docstatus_button_text}`}>
                  Not saved
                </span>
              </button>
            )}
        </div>
        <div className={`${styles.button_field}`}>
          {data?.docstatus === 0 && stateForDocStatus && (
            <button
              type="button"
              className={`${styles.create_button} px-2 py-0 me-2`}
              onClick={handleUpdateReceipt}
            >
              Save
            </button>
          )}
          {data?.docstatus === 1 && stateForDocStatus === false && (
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
          {data?.docstatus === 0 && stateForDocStatus === false && (
            <button
              type="button"
              className={`${styles.create_button} px-2 py-0 me-2`}
              onClick={() => HandleUpdateDocStatus('1')}
            >
              Submit
            </button>
          )}
          {data?.posting_date === new Date()?.toISOString()?.split('T')[0] && (
            <>
              {data?.docstatus === 1 && stateForDocStatus === false && (
                <button
                  type="button"
                  className={`${styles.create_button} px-2 py-0 me-2`}
                  onClick={() => HandleUpdateDocStatus('2')}
                >
                  Cancel
                </button>
              )}
            </>
          )}
          {data?.posting_date === new Date()?.toISOString()?.split('T')[0] && (
            <>
              {data?.docstatus === 2 && stateForDocStatus === false && (
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
              {data?.docstatus === 2 && (
                <button
                  type="button"
                  className={`${styles.create_button} px-2 py-0 me-2 `}
                  onClick={() => HandleDeleteReceipt(query?.receiptId)}
                >
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DocStatusButtonChanges;
