const LoadMoreTableDataInMaster = ({ HandleTableViewRows }: any) => {
  return (
    <div
      className="btn-group mr-2 my-2 mb-4 "
      role="group"
      aria-label="Second group"
    >
      <button
        type="button"
        className="btn btn-primary py-0 load-more-table-data-btn border-1"
        onClick={() => HandleTableViewRows(5)}
      >
        5
      </button>
      <button
        type="button"
        className="btn btn-primary py-0 load-more-table-data-btn border-1"
        onClick={() => HandleTableViewRows(20)}
      >
        20
      </button>
      <button
        type="button"
        className="btn btn-primary  py-0 load-more-table-data-btn border-1"
        onClick={() => HandleTableViewRows(100)}
      >
        100
      </button>
      <button
        type="button"
        className="btn btn-primary  py-0 load-more-table-data-btn border-1"
        onClick={() => HandleTableViewRows(500)}
      >
        500
      </button>
    </div>
  );
};

export default LoadMoreTableDataInMaster;
