import React from "react";
import { NodelessAddressIndexContext } from "../../../../contexts/nodeless-address/NodelessAddressIndexContext";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../app.routes";
import NodelessAddressIndexSkeletons from "./NodelessAddressIndexSkeletons";
import EmptyNodelessAddresses from "./EmptyNodelessAddresses";

const NodelessAddressIndex = () => {
  const { isLoading, nodelessAddress } = React.useContext(
    NodelessAddressIndexContext
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && nodelessAddress && nodelessAddress.length > 0) {
      navigate(
        `${APP_ROUTES.NODELESS_ADDRESS_INDEX}/${nodelessAddress[0]?.uuid}`
      );
    }
  }, [isLoading, nodelessAddress]);

  if (!isLoading && nodelessAddress && nodelessAddress.length === 0)
    return <EmptyNodelessAddresses />;

  return <NodelessAddressIndexSkeletons />;
};

export default NodelessAddressIndex;
