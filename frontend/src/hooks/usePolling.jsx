import { useEffect, useRef } from 'react';

const usePolling = (fetchData, interval = 5000) => {
  const savedCallback = useRef();
  const pollingInterval = useRef();

  // حفظ أحدث نسخة من callback
  useEffect(() => {
    savedCallback.current = fetchData;
  }, [fetchData]);

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };

    // البدء فوراً ثم كل فترة زمنية
    executeCallback();
    pollingInterval.current = setInterval(executeCallback, interval);

    // التنظيف عند unmount
    return () => clearInterval(pollingInterval.current);
  }, [interval]);

  // إمكانية إيقاف/تشغيل البولينج من الخارج
  const stopPolling = () => clearInterval(pollingInterval.current);
  const startPolling = () => {
    stopPolling();
    pollingInterval.current = setInterval(savedCallback.current, interval);
  };

  return { stopPolling, startPolling };
};

export default usePolling;