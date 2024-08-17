import { useState, useEffect, useRef } from 'react';

// Timer hook
const useTimer = (initialTime = 0) => {
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(true);
    const timerRef = useRef(null);

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setTime(initialTime);
        setIsActive(false);
    };

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, time]);
    useEffect(() => {
        startTimer()
        return () => { stopTimer() }
    }, [])
    useEffect(() => {
        if (time <= 0) {
            stopTimer();
        }
    }, [time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
    };

    return { time: formatTime(time), startTimer, stopTimer, resetTimer, isActive };
};

export default useTimer;
