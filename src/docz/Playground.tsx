import React from "react";

import Phone from "./Phone/Phone";
import Provider from "../components/Provider/Provider";

const Component: React.FC = ({ children }) => {
  return (
    <Provider>
      <Phone>{children}</Phone>
    </Provider>
  );
};

export default Component;
