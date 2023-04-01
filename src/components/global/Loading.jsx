import ScaleLoader from 'react-spinners/ScaleLoader';

const Loading = ({ isLoading, hasOverlay = true }) => {
  const loaderWrapperCls = hasOverlay
    ? 'fixed z-50 bg-white flex items-center justify-center p-6 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    : '';

  return (
    <>
      {hasOverlay && (
        <div className="fixed h-full w-full bg-black top-0 left-0 z-40 opacity-50"></div>
      )}
      <div className={loaderWrapperCls}>
        <ScaleLoader color="hsl(100, 97%, 37%)" loading={isLoading} />
      </div>
    </>
  );
};

export default Loading;
