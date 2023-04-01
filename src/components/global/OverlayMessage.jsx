import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import logo from '../../imgs/logostroke.svg';

const OverlayMessage = ({ heading, message }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  if (!isOverlayOpen) window.location.reload(false);

  return (
    <>
      <div
        className="fixed h-full w-full bg-black top-0 left-0 z-40 opacity-50"
        onClick={() => setIsOverlayOpen(false)}
      />
      <div className="fixed bg-white z-50 z-50 h-fit w-5/6 sm: top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm shadow-clr-green px-5 pt-12 pb-6 rounded-xl flex flex-col items-center gap-14 border border-clr-green max-w-3xl">
        <div className="flex justify-end sm:justify-between items-center w-full relative px-6">
          <a href="/" className="hidden sm:block">
            <img src={logo} alt="No Worries Moving logo" className="w-16" />
          </a>
          <h3 className="absolute left-1/2 -translate-x-1/2 sm:text-lg lg:text-h3_md font-bold">
            <span className="bg-clr-green w-16 h-16  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 rounded-full"></span>
            <span className="z-20 relative">{heading}</span>
          </h3>
          <div
            className="text-clr-error cursor-pointer duration-300 hover:scale-125"
            onClick={() => setIsOverlayOpen(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>
        <p className="text-center">{message}</p>
        <div className="border border-clr-green w-8"></div>
      </div>
    </>
  );
};

export default OverlayMessage;
