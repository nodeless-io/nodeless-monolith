import React, { useRef, useContext } from "react";
import ModalBasic from "../../../components/ModalBasic";
import { StoreContext } from "../../../contexts/store/StoreContext";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import { useParams } from "react-router-dom";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useMutation, useQueryClient } from "react-query";
import { IStoreNewInvoice } from "../../../types/stores.interface";

function CreateInvoiceModal() {
  const { setCreateInvoiceModalOpen, createInvoiceModalOpen } = useContext(
    StoreContext
  );

  let url = useRef(null);
  let email = useRef(null);
  let amount = useRef(null);

  const { storeId } = useParams();

  const queryClient = useQueryClient();

  const addInvoice = async (payload: IStoreNewInvoice) => {
    const response = await useFetch(
      `/stores/${storeId}/invoices`,
      payload,
      "POST"
    );

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(addInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices" + storeId]);
      url.current.value = "";
      email.current.value = "";
      amount.current.value = "";

      setCreateInvoiceModalOpen(false);
      message.success("Invoice created successfully");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error creating invoice");
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await mutateAsync({
      amount: `${amount.current.value}`,
      redirect_url: url.current.value,
      buyer_email: email.current.value,
      currency: "SATS",
    });
  };

  return (
    <ModalBasic
      id="create-invoice"
      modalOpen={createInvoiceModalOpen}
      setModalOpen={setCreateInvoiceModalOpen}
      title="Create an Invoice"
    >
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Amount <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                className="form-input w-full px-2 py-1"
                type="number"
                required
                ref={amount}
              />

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="name"
              >
                Buyer Email (optional)
              </label>
              <input
                id="email"
                name="email"
                className="form-input w-full px-2 py-1"
                type="email"
                ref={email}
              />

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="name"
              >
                Redirect URL: (optional)
              </label>
              <input
                id="url"
                name="url"
                className="form-input w-full px-2 py-1"
                type="url"
                ref={url}
              />
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                setCreateInvoiceModalOpen(false);
              }}
              type="button"
            >
              Cancel
            </button>

            <button
              className="btn-sm bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <ButtonSpinner /> : "Send"}
            </button>
          </div>
        </div>
      </form>
    </ModalBasic>
  );
}

export default CreateInvoiceModal;
