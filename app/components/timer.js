import { useState, useEffect } from 'react';

export function useCountdownTimer(targetDate) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function getTimeLeft(date) {
      if (!date) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const now = Date.now();
      const countdownTime = new Date(date).getTime();
      const difference = countdownTime - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    if (!targetDate) return;

    setTimeLeft(getTimeLeft(targetDate)); // Set initial value on mount

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}