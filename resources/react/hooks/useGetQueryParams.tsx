import { useLocation } from "react-router-dom";

function useGetQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default useGetQueryParams;
