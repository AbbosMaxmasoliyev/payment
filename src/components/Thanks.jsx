import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Custom hook for handling loading state
const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return { loading, startLoading, stopLoading };
};

const Thanks = () => {
    const { course, fullName, phoneNumber, tarif } = useParams()
    const { loading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        startLoading();
        const timer = setTimeout(() => {
            stopLoading();
        }, 3000); // Simulating a 3-second loading time

        return () => clearTimeout(timer);
    }, [startLoading, stopLoading]);

    return (
        <div className="min-h-[100vh] h-full px-2 py-8 mx-auto lg:bg-[contain] bg-[contain]" style={{ minHeight: '100vh', background: 'black' }}>
            <div className="max-w-xl p-6 mx-auto sm:p-8 rounded-xl bg-opacity-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h1 className="my-5 text-3xl font-semibold text-center text-green-900" style={{ background: '-webkit-linear-gradient(#FFD87B, #F6B703)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Xaridingiz Muvaffaqiyatli Yakunlandi!
                </h1>
                <div className="flex flex-col gap-5 text-lg text-white font-semibold">
                    <p>Kuniga {course} kursi <br /> 2-sentabr kuni boshlanadi.</p>
                    <p>Siz bilan operatorlarimiz 48 soat ichida bo'glanishadi. </p>
                    <p>Kursda ko’rishguncha.</p>
                    <p>Hurmat ila,<br /><strong>Amirbek Bozorov</strong></p>
                    <div className="p-3 font-bold text-white bg-black border border-white-500 rounded-xl">
                        <p className="text-3xl text-center text-black" style={{ background: '-webkit-linear-gradient(#FFD87B, #F6B703)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Tasdiqlandi
                        </p>
                        <hr className="py-[5px]" />
                        <p>Kurs: {course}</p>
                        <p>Ism: {fullName}</p>
                        <p>Telefon: {phoneNumber}</p>
                        <p>Ta'rif: {tarif}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thanks;
