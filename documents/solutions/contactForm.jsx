export default function ContactForm(props) {
  const { register, errors, onSave, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-8">
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="border bg-gray-50 w-1/2 px-4 py-2"
          type="text"
          {...register("name", { required: "กรุณากรอกชื่อ" })}
        />
        <div className="text-red-500 text-sm italic">
          {errors.name?.message}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="name">Surname</label>
        <input
          className="border bg-gray-50 w-1/2 px-4 py-2"
          type="text"
          {...register("surname", { required: "กรุณากรอกนามสกุล" })}
        />
        <div className="text-red-500 text-sm italic">
          {errors.surname?.message}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="name">Email</label>
        <input
          className="border bg-gray-50 w-1/2 px-4 py-2"
          type="text"
          {...register("email", { required: "กรุณากรอก email" })}
        />
        <div className="text-red-500 text-sm italic">
          {errors.email?.message}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="name">Phone</label>
        <input
          className="border bg-gray-50 w-1/2 px-4 py-2"
          type="text"
          {...register("phone", { required: "กรุณากรอกเบอร์โทรศัพท์" })}
        />
        <div className="text-red-500 text-sm italic">
          {errors.phone?.message}
        </div>
      </div>

      <div className="flex flex-col">
        <label>Gender</label>
        <div className="flex flex-row gap-4 items-baseline">
          <input
            className="border bg-gray-50 px-4 py-2"
            id="m"
            value="M"
            type="radio"
            {...register("gender", { required: "กรุณาระบุเพศ" })}
          />
          <label htmlFor="m">Male</label>

          <input
            className="border bg-gray-50 px-4 py-2"
            id="f"
            value="F"
            type="radio"
            {...register("gender", { required: "กรุณาระบุเพศ" })}
          />
          <label htmlFor="f"> Female</label>
        </div>

        <div className="text-red-500 text-sm italic">
          {errors.gender?.message}
        </div>
      </div>

      <button
        type="submit"
        className="border rounded text-white bg-green-600 w-1/2 p-2"
      >
        Save
      </button>
    </form>
  );
}
