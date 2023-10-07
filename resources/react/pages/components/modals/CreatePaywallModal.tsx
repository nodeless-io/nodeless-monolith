import React, { useRef, useContext } from "react";
import ModalBasic from "../../../components/ModalBasic";
import { PaywallContext } from "../../../contexts/paywall/PaywallContext";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useMutation, useQueryClient } from "react-query";
import { ICreatePaywall } from "../../../types/paywalls.interface";
import { PaywallTypes } from "../constants";

function CreatePaywallModal() {
  const { setCreatePaywallModal, createPaywallModal } = useContext(
    PaywallContext
  );

  let name = useRef(null);
  let type = useRef(null);
  let price = useRef(null);

  const queryClient = useQueryClient();

  const createPaywall = async (payload: ICreatePaywall) => {
    const response = await useFetch(`/paywall`, payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createPaywall, {
    onSuccess: () => {
      queryClient.invalidateQueries(["paywall"]);
      name.current.value = "";
      type.current.value = "";
      price.current.value = "";

      setCreatePaywallModal();
      message.success("Paywall created successfully");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error creating paywall");
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await mutateAsync({
      name: name.current.value,
      type: type.current.value,
      price: Number(price.current.value),
      settings: {
        test: "",
      },
    });
  };

  return (
    <ModalBasic
      id="create-paywall"
      modalOpen={createPaywallModal}
      setModalOpen={setCreatePaywallModal}
      title="Create a Paywall"
    >
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                ref={name}
              />

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="name"
              >
                Type <span className="text-rose-500">*</span>
              </label>

              <select
                name="type"
                id="type"
                className="form-input w-full"
                ref={type}
                required
              >
                {PaywallTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="name"
              >
                Price: <span className="text-rose-500">*</span>
              </label>
              <input
                id="price"
                name="price"
                className="form-input w-full px-2 py-1"
                type="number"
                required
                ref={price}
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
                setCreatePaywallModal(false);
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

export default CreatePaywallModal;
