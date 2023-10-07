import React, { useRef, useContext } from "react";
import ModalBasic from "../../../components/ModalBasic";
import { InboxContext } from "../../../contexts/inbox/InboxContext";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useMutation, useQueryClient } from "react-query";
import { ICreateInbox } from "../../../types/inboxes.interface";

function CreateInboxModal() {
  const { setCreateInboxModal, createInboxModal } = useContext(InboxContext);

  let username = useRef(null);
  let email = useRef(null);
  let price = useRef(null);
  let body = useRef(null);
  let subject = useRef(null);

  const queryClient = useQueryClient();

  const createInbox = async (payload: ICreateInbox) => {
    const response = await useFetch(`/inbox`, payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(["inbox"]);
      username.current.value = "";
      email.current.value = "";
      price.current.value = "";
      body.current.value = "";
      subject.current.value = "";

      setCreateInboxModal(false);
      message.success("Inbox created successfully");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Error creating Inbox");
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await mutateAsync({
      username: username.current.value,
      email: email.current.value,
      price: Number(price.current.value),
      settings: {
        body: body.current.value,
        subject: subject.current.value,
      },
    });
  };

  return (
    <ModalBasic
      id="create-inbox"
      modalOpen={createInboxModal}
      setModalOpen={setCreateInboxModal}
      title="Create an Inbox"
    >
      <form onSubmit={handleSubmit}>
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="username"
              >
                Username <span className="text-rose-500">*</span>
              </label>
              <input
                id="username"
                name="username"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                ref={username}
                autoFocus
              />

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="email"
              >
                Email <span className="text-rose-500">*</span>
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
                htmlFor="price"
              >
                Price: <span className="text-rose-500">*</span>
              </label>
              <input
                id="price"
                name="price"
                className="form-input w-full px-2 py-1"
                type="number"
                ref={price}
              />

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="subject"
              >
                Subject: <span className="text-rose-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                className="form-input w-full px-2 py-1"
                type="text"
                ref={subject}
              />

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="body"
              >
                Body: <span className="text-rose-500">*</span>
              </label>

              <textarea
                id="body"
                name="body"
                className="form-input w-full px-2 py-1"
                ref={body}
                rows={4}
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
                setCreateInboxModal(false);
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

export default CreateInboxModal;
