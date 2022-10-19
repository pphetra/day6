import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import { useRouter } from "next/router";

const fetchContacts = async ({ queryKey }) => {
  const [_, url] = queryKey;
  const res = await fetch(url);
  return res.json();
};

export default function Contacts() {
  const router = useRouter();
  const [filter, setFilter] = useState({
    name: "",
    surname: "",
  });
  const [state, setState] = useState({
    current_page: 1,
    last_page: 1,
    links: [],
    url: "/api/contacts?page=1",
    data: [],
  });

  const { data, isLoading, error } = useQuery(
    ["contacts", state.url],
    fetchContacts,
    {
      onSuccess: (data) => {
        setState({
          ...state,
          current_page: data.current_page,
          last_page: data.last_page,
          links: data.links,
          data: data.data,
        });
      },
      keyPreviousData: true,
    }
  );

  const addNewContact = () => {
    router.push("/contacts/new");
  };

  const onEdit = (id) => {
    router.push(`/contacts/${id}/edit`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-4xl p-2">
      <h2>users</h2>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <div className="flex gap-2 my-2">
            <input
              className="border rounded p-1"
              type="text"
              value={filter.name}
              placeholder="name"
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
            <input
              className="border rounded p-1"
              type="text"
              value={filter.surname}
              placeholder="surname"
              onChange={(e) =>
                setFilter({ ...filter, surname: e.target.value })
              }
            />
            <button
              className="px-4 py-1  rounded bg-blue-500 text-white"
              onClick={() => {
                setState({
                  ...state,
                  url: `/api/contacts?page=1&name=${filter.name}&surname=${filter.surname}`,
                });
              }}
            >
              filter
            </button>
          </div>
          <table className="bg-white w-full border rounded shadow-sm">
            <thead>
              <tr className="border-b bg-gray-100 text-sm font-medium text-left h-12">
                <th className="p-4">id</th>
                <th className="p-4">name</th>
                <th className="p-4">surname</th>
                <th className="p-4">email</th>
                <th className="p-4">phone</th>
                <th className="p-4">gender</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((user) => (
                <tr key={user.id} className="border-b h-10">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.surname}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.gender}</td>
                  <td className="p-4">
                    <button
                      className="border px-4"
                      type="button"
                      onClick={() => onEdit(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center"></div>
              <div className="flex items-center">
                <span className="flex flex-row gap-1">
                  {state.links.map(
                    (link) =>
                      link.url && (
                        <a
                          className="px-1 bg-blue-50"
                          key={link.label}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setState({ ...state, url: link.url });
                          }}
                        >
                          {decode(link.label)}
                        </a>
                      )
                  )}
                </span>
                <span className="text-sm text-gray-500">
                  Page {state.current_page} of {state.last_page}
                </span>
              </div>
            </div>
            <button
              className="px-4 py-1  rounded bg-green-500 text-white"
              type="button"
              onClick={addNewContact}
            >
              Add
            </button>

            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
