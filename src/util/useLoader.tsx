import { Router } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const useLoader = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const handlePageScroll = useCallback(() => {
    setTimeout(() => {
      if (typeof window !== undefined && window.location.hash) {
        const pageSection = document.getElementById(
          window.location.hash.substring(1)
        );
        if (pageSection && pageSection.offsetTop) {
          window.scrollTo({
            top: pageSection.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    setLoading(false);
    handlePageScroll();
  }, [handlePageScroll]);

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
    handlePageScroll();
  });

  return { loading };
};

export default useLoader;
