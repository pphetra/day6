import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import ContactForm from "../../components/contactForm";

export default function NewContact() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSave = async (data) => {
    const resp = await axios.post("/api/contacts", data);
    if (resp.status === 201) {
      router.replace("/contacts");
    }
  };

  return (
    <div className="p-8">
      <h2>Create new contact</h2>
      <ContactForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSave={onSave}
      />
    </div>
  );
}
