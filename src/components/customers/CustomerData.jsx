import moveDetails from '../../imgs/quote/movedetails.png';
import personIcon from '../../imgs/quote/icons/person.png';
import emailIcon from '../../imgs/quote/icons/email.png';
import phoneIcon from '../../imgs/quote/icons/phone.png';
import firstAddressIcon from '../../imgs/quote/icons/address1.png';
import secondAddressIcon from '../../imgs/quote/icons/address2.png';
import calendarIcon from '../../imgs/quote/icons/calendar.png';
import inventoryList from '../../imgs/quote/inventorylist.png';
import estimate from '../../imgs/quote/estimate.png';

export const CustomerData = (data) => {
  const customerKey = Object.keys(data.data);
  const customerData = data.data[customerKey];

  console.log(customerData);

  return (
    <div className="max-w-screen-md mx-auto mt-4 pb-4">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 bg-white p-4 border-r md:border-r md:border-[#EAFFDB] text-center md:text-left">
          <div className="inline-flex justify-center md:justify-start items-center mx-auto md:mx-0">
            <img src={moveDetails} alt="Icon 1" className="h-6 w-auto" />
            <h2 className="text-lg font-bold ml-2">move details</h2>
          </div>
          <p className="hidden md:block text-xs font-bold mt-4 pl-[20px]">
            full name
          </p>

          <div className="flex items-center mt-4 md:mt-0">
            <img src={personIcon} alt="Icon" className="h-6 w-auto" />
            <input
              type="text"
              placeholder="Your input"
              defaultValue={customerData['Last Name']}
              readOnly
              className="ml-2 focus:outline-none focus:border-transparent focus:ring-0 border-0"
            />
          </div>

          <p className="hidden md:block text-xs font-bold mt-4 pl-[20px]">
            email
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <img src={emailIcon} alt="Icon" className="h-6 w-auto" />
            <input
              type="text"
              placeholder="Your input"
              defaultValue={customerData['Email']}
              readOnly
              className="ml-2 focus:outline-none focus:border-transparent focus:ring-0 border-0"
            />
          </div>

          <p className="hidden md:block text-xs font-bold mt-4 pl-[20px]">
            phone
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <img src={phoneIcon} alt="Icon" className="h-6 w-auto" />
            <input
              type="text"
              placeholder="Your input"
              defaultValue={customerData['Phone']}
              readOnly
              className="ml-2 focus:outline-none focus:border-transparent focus:ring-0 border-0"
            />
          </div>

          <p className="hidden md:block text-xs font-bold mt-4 pl-[20px]">
            pickup address
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <img src={firstAddressIcon} alt="Icon" className="h-6 w-auto" />
            <input
              type="text"
              placeholder="Your input"
              defaultValue={`${customerData['PU City']} ${customerData['PU State']} ${customerData['PU Zip']}`}
              readOnly
              className="ml-2 focus:outline-none focus:border-transparent focus:ring-0 border-0"
            />
          </div>

          <p className="hidden md:block text-xs font-bold mt-4 pl-[20px]">
            delivery address
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <img src={secondAddressIcon} alt="Icon" className="h-6 w-auto" />
            <input
              type="text"
              placeholder="Your input"
              defaultValue={`${customerData['DEL City']} ${customerData['DEL State']} ${customerData['DEL Zip']}`}
              readOnly
              className="ml-2 focus:outline-none focus:border-transparent focus:ring-0 border-0"
            />
          </div>

          <p className="hidden md:block text-xs font-bold mt-4 pl-[20px]">
            requested date
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <img src={calendarIcon} alt="Icon" className="h-6 w-auto" />
            <input
              type="text"
              placeholder="Your input"
              defaultValue={customerData['Requested Date String']}
              readOnly
              className="ml-2 focus:outline-none focus:border-transparent focus:ring-0 border-0"
            />
          </div>
        </div>

        <div className="flex-1 bg-white p-4 border-r md:border-r md:border-[#EAFFDB] text-center md:text-left">
          <div className="inline-flex justify-center md:justify-start items-center mx-auto md:mx-0">
            <img src={inventoryList} alt="Icon 1" className="h-6 w-auto" />
            <h2 className="text-lg font-bold ml-2">inventory list</h2>
          </div>
          <div className="mt-4">
            <textarea
              className="w-full h-[300px] focus:outline-none focus:border-transparent focus:ring-0 border-0 bg-transparent"
              readOnly
              defaultValue="Call Emily at (217) 558 8965 to update inventory list"
            />
          </div>
        </div>

        <div className="flex-1 bg-white p-4 border-r md:border-r md:border-[#EAFFDB] text-center md:text-left">
          <div className="inline-flex justify-center md:justify-start items-center mx-auto md:mx-0">
            <img src={estimate} alt="Icon 1" className="h-6 w-auto" />
            <h2 className="text-lg font-bold ml-2">estimate</h2>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold">Rate:</span>
              <input
                type="text"
                className="border-0 focus:ring-0 w-[40%]"
                placeholder="Input 1"
                defaultValue={`$${customerData['Rate']}/hr`}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold">Labor:</span>
              <input
                type="text"
                className="border-0 focus:ring-0 w-[40%]"
                placeholder="Input 2"
                defaultValue={`${customerData['Estimated Hrs']}hrs`}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold">Truck fee:</span>
              <input
                type="text"
                className="border-0 focus:ring-0 w-[40%]"
                placeholder="Input 3"
                defaultValue={`$${customerData['Deposit']}`}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold">Due now:</span>
              <input
                type="text"
                className="border-0 focus:ring-0 w-[40%]"
                placeholder="Input 4"
                defaultValue={`$${customerData['Deposit']}`}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold">Due later:</span>
              <input
                type="text"
                className="border-0 focus:ring-0 w-[40%]"
                placeholder="Input 5"
                defaultValue={`$${customerData['Day of the Move']}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
