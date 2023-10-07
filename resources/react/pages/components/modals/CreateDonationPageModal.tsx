import React, { useRef, useContext } from "react";
import ModalBasic from "../../../components/ModalBasic";
import { DonationPageContext } from "../../../contexts/donation-page/DonationPageContext";
import { useFetch } from "../../../hooks/useFetch";
import { message } from "antd";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useMutation, useQueryClient } from "react-query";
import { IDonationPage } from "../../../types/donations.interface";

function CreateDonationPageModal() {
  const {
    setCreateDonationPageModalOpen,
    createDonationPageModalOpen,
  } = useContext(DonationPageContext);

  let name = useRef(null);
  let slug = useRef(null);
  let description = useRef(null);

  const queryClient = useQueryClient();

  const createDonationPage = async (payload: Partial<IDonationPage>) => {
    const response = await useFetch(`/donation_page`, payload, "POST");

    return response;
  };

  const { isLoading, mutateAsync } = useMutation(createDonationPage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["donation_pages"]);
      name.current.value = "";
      slug.current.value = "";
      description.current.value = "";

      setCreateDonationPageModalOpen(false);

      message.success("Donation page created successfully");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Error creating donation page"
      );
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await mutateAsync({
      name: name.current.value,
      slug: slug.current.value,
      description: description.current.value,
      settings: {
        bg_color: "#FFFFFF",
        text_color: "",
        highlight_color: "",
        logo_url: "",
        header_url: "",
      },
    });
  };

  return (
    <ModalBasic
      id="make-donation"
      modalOpen={createDonationPageModalOpen}
      setModalOpen={setCreateDonationPageModalOpen}
      title="Create a donation page"
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
                htmlFor="slug"
              >
                Slug <span className="text-rose-500">*</span>
              </label>
              <input
                id="slug"
                name="slug"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                ref={slug}
              />

              <label
                className="block text-sm font-medium mb-1 mt-3"
                htmlFor="description"
              >
                Description: <span className="text-rose-500">*</span>
              </label>
              <input
                id="description"
                name="description"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                ref={description}
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
                setCreateDonationPageModalOpen(false);
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

export default CreateDonationPageModal;
