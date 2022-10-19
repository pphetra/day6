# Contact List

ทำตาม https://github.com/pphetra/day4/blob/main/documents/user-list.md
เปลี่ยน model จาก user เป็น contact

เพิ่มปุ่ม "Add"

```js
<button
  className="px-4 py-1  rounded bg-green-500 text-white"
  type="button"
  onClick={addNewContact}
>
  Add
</button>
```

implement function addNewContact โดยการทำงานก็คือเปลี่ยนไปหน้า /contacts/new
ผ่านการเรียกใช้ next router

```
const router = useRouter();

...

const addNewContact = () => {
  router.push("/contacts/new");
};
```

สร้าง file /pages/contacts/new

```js
export default function NewContact() {
  return (
    <div className="p-8">
      <h2>Create new contact</h2>
    </div>
  );
}
```

เรียกใช้ useForm

```
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
```

สร้าง field name, surname, email, phone, และ gender

```jsx
<form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-8">
  <div className="flex flex-col">
    <label htmlFor="name">Name</label>
    <input
      className="border bg-gray-50 w-1/2 px-4 py-2"
      type="text"
      {...register("name", { required: "กรุณากรอกชื่อ" })}
    />
    <div className="text-red-500 text-sm italic">{errors.name?.message}</div>
  </div>

  <div className="flex flex-col">
    <label>Gender</label>
    <div className="flex flex-row gap-4 items-baseline">
      <input
        className="border bg-gray-50 px-4 py-2"
        id="male"
        value="M"
        type="radio"
        {...register("gender", { required: "กรุณาระบุเพศ" })}
      />
      <label htmlFor="male">Male</label>

      <input
        className="border bg-gray-50 px-4 py-2"
        id="female"
        value="F"
        type="radio"
        {...register("gender", { required: "กรุณาระบุเพศ" })}
      />
      <label htmlFor="female"> Female</label>
    </div>

    <div className="text-red-500 text-sm italic">{errors.gender?.message}</div>
  </div>

  <button
    type="submit"
    className="border rounded text-white bg-green-600 w-1/2 p-2"
  >
    Save
  </button>
</form>
```

implement function onSave

```js
const router = useRouter();

....


const onSave = async (data) => {
  const resp = await axios.post("/api/contacts", data);
  if (resp.status === 201) {
    router.replace("/contacts");
  }
};
```

กลับไปที่หน้า /pages/contacts/index.js
สร้างปุ่ม edit ในแต่ละแถว

```jsx
<td className="p-4">
  <button className="border px-4" type="button" onClick={() => onEdit(user.id)}>
    Edit
  </button>
</td>
```

implement function onEdit

```js
const onEdit = (id) => {
  router.push(`/contacts/${id}/edit`);
};
```

สร้าง file /pages/contacts/[id]/edit.js

```jsx
export default function ContactEdit() {
  return (
    <div>
      <h2>edit contact</h2>
    </div>
  );
}
```

ค่า id ที่อยู่ใน URL สามารถดึงออกมาใช้ผ่านทาง useRouter

```js
import { useRouter } from "next/router";

export default function ContactEdit() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h2>edit contact {id}</h2>
    </div>
  );
}
```

เรียกใช้ useForm เหมือนหน้าจอ create แต่เพิ่ม reset เข้าไปในตัวแปรฝั่งรับด้วย

```js
const {
  register,
  handleSubmit,
  watch,
  reset,
  formState: { errors },
} = useForm();
```

ดึงข้อมูลมาจาก /api/contacts/{id} ด้วย useEffect

```js
useEffect(() => {
  if (id) {
    axios.get(`/api/contacts/${id}`).then((resp) => {
      reset(resp.data);
    });
  }
}, [id, reset]);
```

copy form และ field มาจากหน้าจอ create
และ ปรับ function onSave เป็น

```js
const onSave = async (data) => {
  const resp = await axios.put(`/api/contacts/${id}`, data);
  if (resp.status === 200) {
    router.replace("/contacts");
  }
};
```

จะเห็นว่ามี code ที่ซ้ำกันระหว่างหน้าจอ create กับ [ID]/edit
กรณีที่ form เหมือนกันแบบนี้ เราสามารถ refactor ดึงส่วนที่ซ้ำกันออกมาเป็น component ได้

สร้าง file /components/contactForm.jsx copy ส่วน form ทั้งหมดลงไป

```jsx
export default function ContactForm() {
  return (
    ...
  )
}
```

ค่าที่ต้อง pass มาจาก parent component ให้ทำเป็น props ให้หมด

```jsx
export default function ContactForm(props) {
  const { register, errors, onSave, handleSubmit } = props;
  ...
}
```

กลับไปแก้หน้า edit และ create ให้เรียกใช้ ContactForm

```jsx
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
```
