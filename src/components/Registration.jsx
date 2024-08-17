
import { useState } from 'react';
import '../App.css'
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';








const Registration = () => {
    const navigation = useNavigate()
    const [fullName, setFullName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [tarif, settarif] = useState()
    const [username, setUsername] = useState("")
    const moveCaretToEnd = (el) => {
        setTimeout(() => {
            if (typeof el.selectionStart === "number") {
                el.selectionStart = el.selectionEnd = el.value.length;
            } else if (typeof el.createTextRange !== "undefined") {
                el.focus();
                var range = el.createTextRange();
                range.collapse(false);
                range.select();
            }
        }, 10);
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        // document.getElementById('submitBtn').disabled = true
        console.log({ fullName, phoneNumber, tarif });
        if (!fullName || !phoneNumber || !tarif) {
            console.log(!fullName || !phoneNumber || !tarif);

            toast.error("Barcha malumotlarni to'ldiring", {
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
            navigation(`/payment/notiqlik/${fullName}/${phoneNumber}/${tarif}`)
        }

    }

    return (
        <div
            style={{
                backgroundImage: "radial-gradient(circle, #e50909, #ce1414, #b81616, #a21616, #8c1212, #7f0f0f, #720b0b, #660707, #5e0707, #560808, #4f0909, #470a0a)"
            }}
        >
            <div className="container max-w-lg mx-auto mb-[30px] px-[1.4rem]">
                <div className="flex flex-col pt-3 lg:pt-7">
                    <h1
                        className="mb-3 text-2xl text-center text-white font-bebas lg:text-4xl"
                        style={{
                            background: "linear-gradient(#FFD87B, #F6B703)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "30px",
                            lineHeight: "30px"
                        }}
                    >
                        MARAFON ISHTIROKCHILARI <br /> UCHUN MAXSUS TAKLIF
                    </h1>

                    <div
                        className="p-5 bg-[#001c1c] text-center text-white shadow-xl rounded-xl shadow-black/5"
                        style={{ borderRadius: "40px 40px 0 0", border: "4px solid" }}
                    >
                        <div>
                            <img
                                alt="Xarizma"
                                className="mx-auto"
                                src="https://pays.supermiya.uz/storage/line.png"
                                width="250"
                                height="28"
                                loading="lazy"
                                style={{ color: "transparent", width: "80%", filter: "invert(1)" }}
                            />
                            <div className="flex justify-around">
                                <p className="w-[100px]">Ma'lumot kiritish</p>
                                <p className="w-[100px]">Sovg'ani olish</p>
                                <p className="w-[100px]">Yakunlash</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center bg-white h-full pt-[20px]" style={{ borderRadius: "0px 0px 40px 40px" }}>
                    <p className="w-[90%] font-sans rounded-lg text-xl font-bold bg-black text-white pt-[15px] px-[20px] pb-[10px] mx-auto">
                        Xarizma 1.0
                    </p>

                    <p className="text-[20px]">
                        <span className="font-bold">Start:</span> 2-sentabr
                    </p>
                    <p className="my-[10px] font-bold text-xl px-[20px]">
                        8 hafta davomida notiq kishi uchun eng muhim ko'nikmalarni o'rganasiz!
                    </p>
                    <p className="px-[20px]" style={{ fontSize: "12px" }}>
                        Hoziroq formani to'ldiring va bonuslarni qo'lga kiriting!
                    </p>

                    <form
                        className="px-[20px] pb-[10px] lg:mb-[20px] text-left"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name" className="font-bold">
                            Ism-familiyangiz
                        </label>
                        <input
                            name="name"
                            minLength="2"
                            maxLength="64"
                            className="block w-full px-3 py-2 text-base transition border border-black shadow outline-none appearance-none hover:border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder=""
                            required
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                            style={{ marginBottom: "10px" }}
                        />

                        <label htmlFor="phone" className="font-bold">
                            Telefon raqamingiz
                        </label>
                        <input
                            name="phone"
                            minLength="7"
                            value={phoneNumber}
                            pattern="\d{7,}"
                            onFocus={(e) => moveCaretToEnd(e.target)}
                            onChange={(e) => (setPhoneNumber(e.target.value.replace(/[^0-9]/g, '')))}
                            maxLength="12"
                            inputMode="tel"
                            className="block w-full px-3 py-2 text-base transition border border-black shadow outline-none appearance-none hover:border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            required
                            style={{ marginBottom: "10px" }}
                        />

                        <label className="font-bold" htmlFor="course">
                            Tarif tanlash
                        </label>
                        <select
                            id="course"
                            name="course"
                            className="block w-full px-3 py-2 text-base text-gray-900 border border-black rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            style={{ marginBottom: "10px" }}
                            onChange={(e) => settarif(e.target.value)}
                        >
                            <option value="">Iltimos tarfini tanlang</option>
                            <option value="standart">Standart - 897,000 so'm</option>
                            <option value="premium">
                                Premium - 997,000 so'm
                            </option>
                            <option value="vip">VIP - 4,997,000 so'm</option>
                        </select>

                        <label htmlFor="username" className="font-bold">
                            (Agar chet elda bo’lsangiz telegram username qoldiring)
                        </label>
                        <input
                            name="username"
                            minLength="2"
                            maxLength="64"
                            className="block w-full px-3 py-2 text-base transition border border-black shadow outline-none appearance-none hover:border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="@username"
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ marginBottom: "10px" }}
                        />

                        <button
                            id="submitBtn"
                            type="submit"
                            className="block my-[20px] w-full px-3 py-3 text-base font-bold text-white transition bg-[#12a3a3] border shadow rounded-xl hover:bg-stone-800"
                        >
                            DAVOM ETISH
                        </button>
                        <button
                            id="loadingBtn"
                            disabled
                            type="button"
                            className="hidden my-[20px] w-full px-3 py-2 text-base font-medium text-white transition bg-black border border-black shadow rounded-xl hover:bg-stone-800"
                        >
                            <svg
                                role="status"
                                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                            </svg>
                            Iltimos, bir necha soniya kuting...
                        </button>

                    </form>
                </div>
            </div>
            <footer class="py-10 bg-black">
                <div class="flex flex-col items-center max-w-sm gap-5 mx-auto text-center text-white" style={{ padding: "30px", borderRadius: "15px" }}>
                    <img src="/src/assets/react.svg" alt="" />
                    <p>Assos.uz Barcha huquqlar himoyalangan, 2024.</p>
                    {/* <a href="tel:+998937767700" class="px-2 border rounded-full">+998 93 776 77 00</a> */}
                    <p>Web sayt orqali bog'lanish: <a href="https://assos.uz" style={{ textDecoration: "underline", background: "white", color: "black", borderRadius: "15px" }} class="px-4 border">Assos.uz</a></p>
                    {/* <a href="https://pays.supermiya.uz/Ommaviy.pdf" style={{ textDecoration: "underline" }} target="_blank" class="px-2 rounded-full">Ommaviy oferta</a>
                    <p class="text-xs">OOO “SUPER-MIYA” Toshkent shahri, Yunusobod tumani, Buyuk Turon MFY, Ц-2, 24A uy. H/R 2020 8000 5055 5783 4001 “KDB BANK UZBEKISTAN” MFO: 01065 INN: 309769049</p> */}
                </div>
            </footer>
        </div>
    )
}



export default Registration

