import React, { useRef, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalBasic from "../../../components/ModalBasic";
import { StoreWebhooksContext } from "../../../contexts/store/StoreWebhooksContext";
import { useFetch } from "../../../hooks/useFetch";
import { ICreateStoreWebhook } from "../../../types/webhooks.interface";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { generateSecret } from "../../../utils/Utils";
import ButtonSpinner from "../../../components/ButtonSpinner";

function CreateStoreWebhookModal() {
  const { createModalOpen, setCreateModalOpen } = useContext(
    StoreWebhooksContext
  );
  const storeId = useParams().storeId;

  let secret = useRef(null);
  let url = useRef(null);

  let invoiceCreated = useRef(null);
  let invoicePendingConfirmation = useRef(null);
  let invoicePaid = useRef(null);
  let invoiceExpired = useRef(null);
  let invoiceOverpaid = useRef(null);
  let invoiceUnderpaid = useRef(null);

  const queryClient = useQueryClient();

  const createStoreWebhooks = async (payload: ICreateStoreWebhook) => {
    const response = await useFetch("/bitcoinable_webhook", payload, "POST");

    return response;
  };

  useEffect(() => {
    secret.current.value = generateSecret();
  }, []);

  const { isLoading, mutateAsync } = useMutation(createStoreWebhooks, {
    onSuccess: () => {
      queryClient.invalidateQueries(["stores-webhooks"]);
      url.current.value = "";
      secret.current.value = generateSecret();
      invoiceCreated.current.checked = false;
      invoicePendingConfirmation.current.checked = false;
      invoicePaid.current.checked = false;
      invoiceExpired.current.checked = false;
      invoiceOverpaid.current.checked = false;
      invoiceUnderpaid.current.checked = false;

      setCreateModalOpen(false);
      message.success("Webhook created successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error creating webhooks"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const events = [
      invoiceCreated,
      invoicePendingConfirmation,
      invoicePaid,
      invoiceExpired,
      invoiceOverpaid,
      invoiceUnderpaid,
    ]
      .filter((ref) => ref.current?.checked)
      .map((ref) => ref.current?.value);

    let payload: ICreateStoreWebhook = {
      type: "store",
      uuid: storeId,
      url: url.current.value,
      secret: secret.current.value,
      events: events,
      status: "active",
    };

    await mutateAsync(payload);
  };

  return (
    <ModalBasic
      id="create-store-webhook"
      modalOpen={createModalOpen}
      setModalOpen={setCreateModalOpen}
      title="Create a Webhook"
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="url">
                URL <span className="text-rose-500">*</span>
              </label>
              <input
                id="url"
                name="url"
                className="form-input w-full px-2 py-1 h-12 text-lg"
                type="url"
                required
                ref={url}
              />
              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="secret"
              >
                Secret <span className="text-rose-500">*</span>
              </label>
              <input
                id="secret"
                name="secret"
                className="form-input w-full px-2 py-1 h-12 text-lg"
                type="text"
                ref={secret}
                disabled
              />
              <label className="block text-sm font-medium mb-1 mt-3">
                Events:
              </label>
              <div className="flex flex-col">
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="new"
                    value="new"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={invoiceCreated}
                  />
                  Invoice Created
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="pending_confirmation"
                    value="pending_confirmation"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={invoicePendingConfirmation}
                  />
                  Invoice Pending Confirmation
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="paid"
                    value="paid"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={invoicePaid}
                  />
                  Invoice Paid
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="overpaid"
                    value="overpaid"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={invoiceOverpaid}
                  />
                  Invoice Overpaid
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="underpaid"
                    value="underpaid"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={invoiceUnderpaid}
                  />
                  Invoice Underpaid
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="expired"
                    value="expired"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={invoiceExpired}
                  />
                  Invoice Expired
                </label>
              </div>
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
                setCreateModalOpen(false);
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

export default CreateStoreWebhookModal;
