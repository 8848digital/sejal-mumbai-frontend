import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../../styles/readyReceipts.module.css';
import { useRouter } from 'next/router';
import { get_detail_sales_return_data } from '@/store/slices/Sales/get-detail-sales-return-slice';

const SaleReturnsButtonSection = ({
  stateForDocStatus,
  setStateForDocStatus,
  handleUpdateDeliveryNote,
  readOnlyFields,
  setReadOnlyFields,
  showSaveButtonForAmendFlow,
  setShowSaveButtonForAmendFlow,
  HandleUpdateSalesdocStatus,
  HandleAmendButtonForSalesReturn,
  HandleDeleteDeliveryNote,
  handlePrintApi,
}: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const pathParts = router?.asPath?.split('/');
  const salesId = pathParts[1];

  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_sales_return_data
  );

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
            onClick={() => router.back()}
          >
            Back
          </button>

          {stateForDocStatus === true &&
            DetailOfDeliveryNoteFromStore?.docStatus === 0 && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.dosStatus_button_text}`}>
                  Not saved
                </span>
              </button>
            )}
          {stateForDocStatus === false &&
            DetailOfDeliveryNoteFromStore?.docStatus === 0 && (
              <button
                type="button"
                className={`btn ${styles.docstatus_button}`}
              >
                <span className={`${styles.docstatus_button_text}`}>Draft</span>
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 1 && (
            <button type="button" className={`btn ${styles.docstatus_button}`}>
              <span className={`${styles.docstatus_button_text}`}>
                Submitted
              </span>
            </button>
          )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 2 && readOnlyFields && (
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
          {DetailOfDeliveryNoteFromStore?.docStatus === 0 &&
            stateForDocStatus && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                onClick={handleUpdateDeliveryNote}
              >
                Save
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 1 &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                onClick={() => handlePrintApi(query?.deliveryNoteId)}
              >
                Print
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 0 &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                onClick={() => HandleUpdateSalesdocStatus('1')}
              >
                Submit
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.docStatus === 1 &&
            stateForDocStatus === false && (
              <button
                type="button"
                className={`${styles.create_button} px-2 py-0 me-2`}
                onClick={() => HandleUpdateSalesdocStatus('2')}
              >
                Cancel
              </button>
            )}
          {DetailOfDeliveryNoteFromStore?.data?.posting_date ===
            new Date()?.toISOString()?.split('T')[0] && (
              <>
                {DetailOfDeliveryNoteFromStore?.docStatus === 2 &&
                  stateForDocStatus === false && (
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
                onClick={HandleAmendButtonForSalesReturn}
                className={`${styles.create_button} px-2 py-0 me-2 `}
              >
                Save
              </button>
            )}

          {DetailOfDeliveryNoteFromStore?.docStatus === 2 && (
            <button
              type="button"
              className={`${styles.create_button} px-2 py-0 me-2 `}
              onClick={() => HandleDeleteDeliveryNote(query?.deliveryNoteId)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SaleReturnsButtonSection;
