import React from "react";
import { StoreIndexContext } from "../../../../contexts/store/StoreIndexContext";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../app.routes";
import StoreIndexSkeletons from "./StoreIndexSkeletons";
import EmptyStores from "./EmptyStores";

const Index = () => {
  const { isLoading, stores } = React.useContext(StoreIndexContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && stores && stores.length > 0) {
      navigate(`${APP_ROUTES.STORES_INDEX}/${stores[0]?.uuid}`);
    }
  }, [isLoading, stores]);

  if (!isLoading && stores && stores.length === 0) return <EmptyStores />;

  return <StoreIndexSkeletons />;
};

export default Index;
