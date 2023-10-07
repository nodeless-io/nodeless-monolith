import React, { useRef, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalBasic from "../../../components/ModalBasic";
import { DonationPageContext } from "../../../contexts/donation-page/DonationPageContext";
import { useFetch } from "../../../hooks/useFetch";
import { ICreateDonationPageWebhook } from "../../../types/webhooks.interface";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { generateSecret } from "../../../utils/Utils";
import ButtonSpinner from "../../../components/ButtonSpinner";

function CreateDonationPageWebhookModal() {
  const {
    createDonationPageWebhooksModalOpen,
    setCreateDonationPageWebhooksModalOpen,
  } = useContext(DonationPageContext);
  const { donationPageId } = useParams();

  let secret = useRef(null);
  let url = useRef(null);

  let donationCreated = useRef(null);
  let donationPendingConfirmation = useRef(null);
  let donationPaid = useRef(null);
  let donationExpired = useRef(null);
  let donationOverpaid = useRef(null);
  let donationUnderpaid = useRef(null);

  const queryClient = useQueryClient();

  const createDonationPageWebhooks = async (
    payload: ICreateDonationPageWebhook
  ) => {
    const response = await useFetch("/bitcoinable_webhook", payload, "POST");

    return response;
  };

  useEffect(() => {
    secret.current.value = generateSecret();
  }, []);

  const { isLoading, mutateAsync } = useMutation(createDonationPageWebhooks, {
    onSuccess: () => {
      queryClient.invalidateQueries(["donation_page-webhooks"]);
      url.current.value = "";
      secret.current.value = generateSecret();
      donationCreated.current.checked = false;
      donationPendingConfirmation.current.checked = false;
      donationPaid.current.checked = false;
      donationExpired.current.checked = false;
      donationOverpaid.current.checked = false;
      donationUnderpaid.current.checked = false;

      setCreateDonationPageWebhooksModalOpen(false);
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
      donationCreated,
      donationPendingConfirmation,
      donationPaid,
      donationExpired,
      donationOverpaid,
      donationUnderpaid,
    ]
      .filter((ref) => ref.current?.checked)
      .map((ref) => ref.current?.value);

    let payload: ICreateDonationPageWebhook = {
      type: "donation_page",
      uuid: donationPageId,
      url: url.current.value,
      secret: secret.current.value,
      events: events,
      status: "active",
    };

    await mutateAsync(payload);
  };

  return (
    <ModalBasic
      id="create-donation-page-webhook"
      modalOpen={createDonationPageWebhooksModalOpen}
      setModalOpen={setCreateDonationPageWebhooksModalOpen}
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
                    ref={donationCreated}
                  />
                  Donation Created
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="pending_confirmation"
                    value="pending_confirmation"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={donationPendingConfirmation}
                  />
                  Donation Pending Confirmation
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="paid"
                    value="paid"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={donationPaid}
                  />
                  Donation Paid
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="overpaid"
                    value="overpaid"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={donationOverpaid}
                  />
                  Donation Overpaid
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="underpaid"
                    value="underpaid"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={donationUnderpaid}
                  />
                  Donation Underpaid
                </label>
                <label className="block text-md font-medium mb-1">
                  <input
                    type="checkbox"
                    name="expired"
                    value="expired"
                    className="form-checkbox mr-2 w-8 h-8"
                    ref={donationExpired}
                  />
                  Donation Expired
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
                setCreateDonationPageWebhooksModalOpen(false);
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

export default CreateDonationPageWebhookModal;
