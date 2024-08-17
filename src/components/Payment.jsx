import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTimer from '../customHooks/timer';
import { Bounce, toast } from 'react-toastify';
import sendPhotoToBot from '../../utils/senMessage';
import { sendDataToGoogleScript } from '../utils';

const PaymentPage = () => {
  const navigate = useNavigate()
  const { time, isActive, startTimer, stopTimer } = useTimer(900)
  const { course, fullName, phoneNumber, tarif } = useParams()





  const [files, setFiles] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showHumo, setShowHumo] = useState('');
  const [showMaster, setShowMaster] = useState('');
  const [status, seStatus] = useState('');

  const copyHumoRef = useRef(null);
  const copyMasterRef = useRef(null);



  const copyToClipboard = (value, setShow) => {
    navigator.clipboard.writeText(value);
    setShow(`${value} Nusxalandi`);
    setTimeout(() => setShow(''), 2000);
  };

  const handleCopyHumo = () => {
    if (copyHumoRef.current) {
      copyToClipboard(copyHumoRef.current.value, setShowHumo);
    }
  };

  const handleCopyMaster = () => {
    if (copyMasterRef.current) {
      copyToClipboard(copyMasterRef.current.value, setShowMaster);
    }
  };

  const [terms, setTerms] = useState(true);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(files.length === 0);

    if (files.length == 0) {
      toast.error("Iltimos skrinshotni yuklang", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setButtonDisabled(true);

      const formdata = new FormData();
      formdata.append("photo", files[0]);
      formdata.append("fullName", fullName);
      formdata.append("phoneNumber", phoneNumber);
      formdata.append("course", course);
      formdata.append("tarif", tarif);
      formdata.append("status", status);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };



      const message = `
*New Submission!*
*Name:* ${fullName}
*Phone:* ${phoneNumber}
*Course:* ${course}
*Tarif:* ${tarif}
*Status:* ${status}
            `;
      sendPhotoToBot(files[0], message)
      formdata.delete("photo")
      sendDataToGoogleScript({ course, fullName, phoneNumber, tarif, date: new Date() })

      navigate(`/payment/${course}/${fullName}/${phoneNumber}/${tarif}/thankyou`)
    }

  };




  return (
    <div className="container max-w-lg mx-auto px-[0.6rem] bg-white">
      <title>To'lov sahifasi</title>
      <div className="flex flex-col gap-2 pt-5 lg:py-5">
        <header>
          <div className="flex justify-end">
            <div className="flex">
              <div className="flex-col mr-2">
                <p className="font-medium text-[16px] text-right">{fullName}</p>
                <p className="text-right font-medium text-[#797a88] text-[14px]">+{phoneNumber}</p>
              </div>
              <div className="my-auto">
                <img className="rounded-full" onDragStart={() => false} src={"/src/assets/avatar.png"} alt="avatar" />
              </div>
            </div>
          </div>
        </header>

        <div
          className="relative p-[12px] overflow-hidden text-left bg-white rounded-xl"
          style={{ background: 'linear-gradient(128.56deg,#EFF7FF 0%,#D7EAFF 100%)' }}
        >
          <svg
            width="612"
            height="219"
            viewBox="0 0 612 219"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
            style={{
              position: 'absolute',
              right: 0,
              bottom: '-40px',
              pointerEvents: 'none',
            }}
          >
            <path
              d="M727.941 292.092C752.231 384.13 627.096 548.806 521.374 613.18C415.652 677.555 180.316 720.182 93.6076 678.339C6.89947 636.497 5.71034 471.457 1.12523 362.125C-3.45988 252.792 3.67926 72.5416 66.0969 22.3462C128.515 -27.8491 265.324 15.9949 375.631 60.9525C485.939 105.91 703.651 200.054 727.941 292.092C752.231 384.13 627.096 548.806 521.374 613.18L727.941 292.092Z"
              fill="url(#paint0_linear_375_263)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_375_263"
                x1="32.5"
                y1="75.5"
                x2="602.5"
                y2="393"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D7EAFF"></stop>
                <stop offset="1" stopColor="#EAF5FF"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            width="538"
            height="135"
            style={{
              position: 'absolute',
              right: '30px',
              bottom: '-40px',
              pointerEvents: 'none',
            }}
            viewBox="0 0 538 135"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M585.539 234.934C605.078 308.962 504.422 441.414 419.381 493.191C334.341 544.969 145.042 579.254 75.2958 545.599C5.54978 511.945 4.59327 379.2 0.905112 291.263C-2.78305 203.325 2.95951 58.3464 53.1669 17.9735C103.374 -22.3995 213.421 12.865 302.149 49.0251C390.878 85.1853 566.001 160.907 585.539 234.934C605.078 308.962 504.422 441.414 419.381 493.191L585.539 234.934Z"
              fill="url(#paint0_linear_375_264)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_375_264"
                x1="26.1423"
                y1="60.7259"
                x2="484.621"
                y2="316.126"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#E2EEFC"></stop>
                <stop offset="0.963542" stopColor="#D8EBFF" stopOpacity="0.315885"></stop>
                <stop offset="1" stopColor="#D8EBFF" stopOpacity="0.29"></stop>
              </linearGradient>
            </defs>
          </svg>

          <div className="flex flex-col justify-between gap-2">
            <div className="z-10 flex flex-col gap-1">
              <h2 className="text-[22px] font-bold text-[#2f3462] capitalize">{course}</h2>
              <div className="text-[16px] font-medium text-[#535888]">Tarif: {tarif}</div>
              <div className="text-[38px] font-bold text-[#2f3462]">997,000 so'm</div>
            </div>
            <div className="z-10 flex items-center justify-between">
              <p className="text-[12px] font-medium">
                To'lov qilish havolasi <br /> muddati tugashiga qoldi:
              </p>
              <div className="px-[30px] py-[12px] font-medium text-white bg-white rounded-xl">
                <div className="text-[#d1444e] text-[18px]" id="timer">
                  {time}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex hidden bg-white rounded-xl shadow-black/5 border-stone-200" id="timeout">
          <div className="min-w-[100px]">
            <img width="100px" src="https://pays.supermiya.uz/storage/time-over.png" alt="timeover" />
          </div>
          <div className="ml-2">
            <h1 className="mb-1 text-[16px] font-bold text-[#2f3462]">VAQT TUGAGANGA<br /> O'XSHAYDI.</h1>
            <p className="text-[14px] font-medium text-[#535888]">
              Lekin biz allaqachon siz uchun yangi to’lov havolasini yaratdik:
            </p>
            <div className="relative w-4/5 mt-3">
              <button
                id="restartBtn"
                className="block w-full px-3 py-2 text-base font-medium text-white transition bg-[#2993F5] shadow outline-none rounded-xl hover:bg-blue-600 hover:brightness-95"
              >
                Takrorlash
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-2 bg-white shadow rounded-xl">
          <ol className="flex flex-col gap-2 pl-6 list-decimal">
            <li>
              <p>Quyidagi karta raqamlardan biriga to`lovni amalga oshiring:</p>
              <div className="flex flex-col gap-3 -ml-6">
                <div className="p-3 border bg-stone-50 rounded-xl">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <span className="uppercase">Plastik karta</span>
                    </div>
                    <span className="text-lg font-medium">997,000 so'm</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xl">8600 5704 7399 4134</div>
                      <input type="text" className="hidden" ref={copyHumoRef} value="8600570473994134" />
                      <div className="text-sm">TURDIEV DOVRANBEK</div>
                      <p className={`z-20 ${showHumo ? '' : 'hidden'} px-2 py-4 font-bold text-green-700`}>
                        {showHumo}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="px-4 py-4 font-bold text-white bg-[#ebf2ff] border rounded-full"
                        onClick={handleCopyHumo}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1807_3116)">
                            <path d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z" fill="#2F80EC"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1807_3116">
                              <rect width="14" height="14" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3 border bg-stone-50 rounded-xl">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        alt="Mastercard"
                        src="https://pays.supermiya.uz/storage/mastercard.webp"
                        width="30"
                        height="18"
                        decoding="async"
                        className="border rounded"
                        loading="lazy"
                        style={{ color: 'transparent' }}
                      />
                      <span className="uppercase">Mastercard</span>
                    </div>
                    <span className="text-lg font-medium">80$</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xl">4278 3100 2841 6543</div>
                      <input type="text" className="hidden" ref={copyMasterRef} value="4278310028416543" />
                      <div className="text-sm">ANVARXON MANSUROV</div>
                      <p className={`z-20 ${showMaster ? '' : 'hidden'} px-2 py-4 font-bold text-green-700`}>
                        {showMaster}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="px-4 py-4 font-bold text-white bg-[#ebf2ff] border rounded-full"
                        onClick={handleCopyMaster}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1807_3116)">
                            <path d="M8.50391 14H3.28125C2.07503 14 1.09375 13.0187 1.09375 11.8125V4.40234C1.09375 3.19612 2.07503 2.21484 3.28125 2.21484H8.50391C9.71013 2.21484 10.6914 3.19612 10.6914 4.40234V11.8125C10.6914 13.0187 9.71013 14 8.50391 14ZM3.28125 3.30859C2.67819 3.30859 2.1875 3.79929 2.1875 4.40234V11.8125C2.1875 12.4156 2.67819 12.9062 3.28125 12.9062H8.50391C9.10696 12.9062 9.59766 12.4156 9.59766 11.8125V4.40234C9.59766 3.79929 9.10696 3.30859 8.50391 3.30859H3.28125ZM12.8789 10.4453V2.1875C12.8789 0.981277 11.8976 0 10.6914 0H4.62109C4.31903 0 4.07422 0.244812 4.07422 0.546875C4.07422 0.848938 4.31903 1.09375 4.62109 1.09375H10.6914C11.2945 1.09375 11.7852 1.58444 11.7852 2.1875V10.4453C11.7852 10.7474 12.03 10.9922 12.332 10.9922C12.6341 10.9922 12.8789 10.7474 12.8789 10.4453Z" fill="#2F80EC"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_1807_3116">
                              <rect width="14" height="14" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="p-3 border bg-stone-50 rounded-xl">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        alt="Humo"
                        src="https://pays.supermiya.uz/storage/humo.webp"
                        width="30"
                        height="18"
                        decoding="async"
                        className="border rounded"
                        loading="lazy"
                        style={{ color: 'transparent' }}
                      />
                      <span className="uppercase">Humo</span>
                    </div>
                    <span className="text-lg font-medium">80$</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xl">8600 5704 7399 4134</div>
                      <input type="text" className="hidden" value="8600570473994134" />
                      <div className="text-sm">MIRZAKHMEDOV SHERZOD</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className={`px-4 py-4 font-bold ${buttonDisabled ? 'text-gray-300 bg-gray-200' : 'text-white bg-[#ebf2ff]'} border rounded-full`}
                        disabled={buttonDisabled}
                        onClick={() => setButtonDisabled(!buttonDisabled)}
                      >
                        {buttonDisabled ? 'Yoq' : 'Aktivlashtirish'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3 border bg-stone-50 rounded-xl">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        alt="Payme"
                        src="https://pays.supermiya.uz/storage/payme.webp"
                        width="30"
                        height="18"
                        decoding="async"
                        className="border rounded"
                        loading="lazy"
                        style={{ color: 'transparent' }}
                      />
                      <span className="uppercase">Payme</span>
                    </div>
                    <span className="text-lg font-medium">80$</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xl">8600 5704 7399 4134</div>
                      <div className="text-sm">MIRZAKHMEDOV SHERZOD</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className={`px-4 py-4 font-bold ${buttonDisabled ? 'text-gray-300 bg-gray-200' : 'text-white bg-[#ebf2ff]'} border rounded-full`}
                        disabled={buttonDisabled}
                        onClick={() => setButtonDisabled(!buttonDisabled)}
                      >
                        {buttonDisabled ? 'Yoq' : 'Aktivlashtirish'}
                      </button>
                    </div>
                  </div>
                </div> */}
                <form
                  id="form1"
                  className="flex flex-col gap-6"
                  encType="multipart/form-data"

                  onSubmit={handleSubmit}
                >
                  <div className="flex justify-between w-full gap-2">
                    <div className="flex items-center w-full pl-2 text-base transition border shadow outline-none appearance-none border-slate-200 hover:border-slate-300 rounded-xl focus:border-border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                      <input
                        id="bordered-radio-1"
                        type="radio"
                        value="full"
                        name="payment"
                        required
                        onChange={() => seStatus("full")}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-5"
                        style={{ margin: '0px 5px' }}
                      />
                      <label htmlFor="bordered-radio-1" className="w-full py-4 ml-2">
                        To'liq to'ladim
                      </label>
                    </div>
                    <div className="flex items-center w-full pl-2 text-base transition border shadow outline-none appearance-none border-slate-200 hover:border-slate-300 rounded-xl focus:border-border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                      <input
                        id="bordered-radio-2"
                        type="radio"
                        value="chala"
                        name="payment"
                        onChange={() => seStatus("defective")}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-5"
                        style={{ margin: '0px 5px' }}
                        required
                      />
                      <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2">
                        Joy band qildim
                      </label>
                    </div>
                  </div>
                  <div>
                    <input type="hidden" />
                    <label>
                      <div className="px-4 py-5 text-sm text-center transition border-2 border-dashed shadow cursor-pointer select-none rounded-xl sm:text-base text-stone-700 hover:bg-stone-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="inline transform -translate-y-[2px]"
                        >
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                          <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                        <span>
                          {files.length > 0
                            ? files.map((file) => file.name).join(', ')
                            : 'Chek rasmini yuklash uchun bu yerga bosing'}
                        </span>
                      </div>
                      <input
                        type="file"
                        name="photo"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <input type="hidden" name="name" value={fullName} />
                      <input type="hidden" name="phone" value={phoneNumber} />
                      <input type="hidden" name="course" value={tarif} />
                      <input type="hidden" name="username" value="" />
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      id="submitBtn"
                      type="submit"
                      disabled={buttonDisabled}
                      className={`block w-full px-3 py-2 text-base font-medium text-white transition bg-[#2993F5] shadow rounded-xl hover:bg-blue-700 mb-3 ${buttonDisabled ? 'hidden' : 'block'}`}
                    >
                      Davom etish
                    </button>
                    <button
                      id="loadingBtn"
                      type="button"
                      disabled
                      className={`w-full px-3 py-2 text-base font-medium text-white transition bg-black border border-black shadow rounded-xl hover:bg-stone-800 ${buttonDisabled ? 'block' : 'hidden'}`}
                    >
                      <svg
                        role="tarif"
                        className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        ></path>
                      </svg>
                      Iltimos, bir necha soniya kuting...
                    </button>
                  </div>
                </form>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
