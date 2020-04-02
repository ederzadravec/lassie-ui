import React from "react";

export const useRequest = (
  getData = () => {},
  autoFetch = true,
  update = []
) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (autoFetch) fetchData();
  }, update);

  const fetchData = async () => {
    setLoading(true);

    const response = await getData();

    setLoading(false);

    setData(response);
  };

  return [data?.data, { loading, ...data }, fetchData];
};
