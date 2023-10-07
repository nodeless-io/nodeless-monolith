import React, { useRef, useContext } from "react";
import ModalBasic from "../../../components/ModalBasic";
import { StoreContext } from "../../../contexts/store/StoreContext";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { IStore } from "../../../types/stores.interface";
import ButtonSpinner from "../../../components/ButtonSpinner";

function CreateStoreModal() {
  const { setCreateStoreModalOpen, createStoreModalOpen } = useContext(
    StoreContext
  );
  const queryClient = useQueryClient();
  let storeName = useRef(null);
  let url = useRef(null);
  let email = useRef(null);

  const createStore = async (payload: Partial<IStore>) => {
    const response = await useFetch("/stores", payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createStore, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
      setCreateStoreModalOpen(false);
      message.success("Created " + storeName.current.value);

      storeName.current.value = "";
      url.current.value = "";
      email.current.value = "";
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error creating store");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      name: storeName.current.value,
      url: url.current.value,
      email: email.current.value,
      settings: {
        bg_color: "#ffffff",
        text_color: "#000000",
        highlight_color: "#FF0000",
      },
    };

    await mutateAsync(payload);
  };

  return (
    <ModalBasic
      id="create-store"
      modalOpen={createStoreModalOpen}
      setModalOpen={setCreateStoreModalOpen}
      title="Create a Store"
    >
      {/* Modal content */}
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
                ref={storeName}
              />
              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="name"
              >
                URL: (optional){" "}
              </label>
              <input
                id="url"
                name="url"
                className="form-input w-full px-2 py-1"
                type="url"
                ref={url}
              />
              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="name"
              >
                Email: (optional)
              </label>
              <input
                id="email"
                name="email"
                className="form-input w-full px-2 py-1"
                type="email"
                ref={email}
              />
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.stopPropagation();
                setCreateStoreModalOpen(false);
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn-sm bg-orange-500 hover:bg-orange-600 text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ButtonSpinner /> : "Send"}
            </button>
          </div>
        </div>
      </form>
    </ModalBasic>
  );
}

export default CreateStoreModal;
