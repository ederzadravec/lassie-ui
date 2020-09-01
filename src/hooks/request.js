import React from 'react';

export const useRequest = (getData = () => {}, autoFetch = true, update = []) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (autoFetch) fetchData();
  }, update);

  const fetchData = async (...props) => {
    setLoading(true);

    const response = await getData(...props).catch((err) => {
      console.log('request error', err);
      return err.response;
    });

    setLoading(false);

    setData(response);

    return response?.data;
  };

  return [data?.data, { loading, ...data }, fetchData];
};
