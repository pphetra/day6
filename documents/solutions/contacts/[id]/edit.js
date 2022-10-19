import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ContactForm from "../../../components/contactForm";

export default function ContactEdit() {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      axios.get(`/api/contacts/${id}`).then((resp) => {
        reset(resp.data);
      });
    }
  }, [id, reset]);

  const onSave = async (data) => {
    const resp = await axios.put(`/api/contacts/${id}`, data);
    if (resp.status === 200) {
      router.replace("/contacts");
    }
  };

  return (
    <div>
      <h2>edit contact {id}</h2>
      <ContactForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSave={onSave}
      />
    </div>
  );
}
