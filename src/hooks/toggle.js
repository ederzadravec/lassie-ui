import React from 'react';

export const useToggle = (initialToogle = false) => {
  const [toogle, setToogle] = React.useState(initialToogle);

  const handleToogle = () => setToogle(prev => !prev)

  return [toogle, handleToogle]
}
