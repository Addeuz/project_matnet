import React from 'react';

function getWidth() {
  if (typeof window !== 'undefined') {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }
}

// Custom hook to get client window size
export default function useCurrentWidth() {
  const [width, setWidth] = React.useState(getWidth());

  React.useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth());
    };

    // set a rezise listener
    window.addEventListener('resize', resizeListener);

    // Remove the event listener on unmount
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return width;
}
