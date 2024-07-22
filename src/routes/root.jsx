import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";
import { getContacts, createContact } from "../contact";

export default function Root() {
  const { contacts, q } = useLoaderData();
  console.log(contacts);
  const groupedContacts = {}; // Object to store contacts grouped by favorite interests
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  // Group contacts by favorite interests
  contacts.forEach((contact) => {
    if (groupedContacts.hasOwnProperty(contact.favoriteInterest)) {
      groupedContacts[contact.favoriteInterest].push(contact);
    } else {
      groupedContacts[contact.favoriteInterest] = [contact];
    }
  });
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(e) => {
                const isFirstSearch = q == null;
                submit(e.currentTarget.form, { replace: !isFirstSearch });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        {/* <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => {
                if (!favoriteInterests.includes(contact.favoriteInterest)) {
                  favoriteInterests.push(contact.favoriteInterest);
                }
                // console.log(favoriteInterests);
                return (
                  <li key={contact.id}>
                    {`#${favoriteInterests[0]}`}
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav> */}
        <nav>
          {Object.keys(groupedContacts).length ? (
            <ul>
              {Object.entries(groupedContacts).map(
                ([favoriteInterest, contacts]) => (
                  <li key={favoriteInterest}>
                    <div
                      id="favorite-interest"
                      style={{
                        background: "#d4d4d4",
                        borderRadius: "5px",
                        width: "105%",
                      }}
                    >{`#${favoriteInterest}`}</div>
                    <ul>
                      {contacts.map((contact) => (
                        <li key={contact.id}>
                          <NavLink
                            to={`contacts/${contact.id}`}
                            className={({ isActive, isPending }) =>
                              isActive ? "active" : isPending ? "pending" : ""
                            }
                          >
                            {contact.first || contact.last ? (
                              <>
                                {contact.first} {contact.last}
                              </>
                            ) : (
                              <i>No Name</i>
                            )}{" "}
                            {contact.favorite && <span>★</span>}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
