import "./loading.scss";

type LoadingProps = {
  isLoading?: boolean;
};

export const Loading = ({ isLoading = true }: LoadingProps) => {
  return (
    <>
      {isLoading && (
        <div className="Loading">
          <div className="loader">
            <div className="corner-left"></div>
            <div className="corner-right"></div>
          </div>
        </div>
      )}
    </>
  );
};
