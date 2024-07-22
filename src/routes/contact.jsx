import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contact";

export default function Contact() {
  const { contact } = useLoaderData();

  //   const contact = {
  //     first: "Your",
  //     last: "Name",
  //     avatar: "https://placekitten.com/g/200/200",
  //     twitter: "your_handle",
  //     notes: "Some notes",
  //     favorite: true,
  //   };

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        <div style={{ gap: "1rem" }}>
          {contact.twitter && (
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <a
                target="_blank"
                href={`https://twitter.com/${contact.twitter}`}
              >
                <img
                  src="../../public/img/twitter.svg"
                  alt="twitter"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    marginRight: ".3rem",
                  }}
                />
                <p style={{ margin: ".2rem 0" }}>twitter</p>
              </a>
            </div>
          )}
          {contact.youtube && (
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <a
                target="_blank"
                href={`https://youtube.com/${contact.youtube}`}
              >
                <img
                  src="../../public/img/youtube.svg"
                  alt="youtube"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    marginRight: ".3rem",
                  }}
                />
                <p style={{ margin: ".2rem 0" }}>youtube</p>
              </a>
            </div>
          )}
          {contact.instagram && (
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <a
                target="_blank"
                href={`https://instagram.com/${contact.instagram}`}
              >
                <img
                  src="../../public/img/instagram2.svg"
                  alt="instagram"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    marginRight: ".3rem",
                  }}
                />
                <p style={{ margin: ".2rem 0" }}>instagram</p>
              </a>
            </div>
          )}
        </div>

        {contact.favoriteInterest && (
          <p>favorite interest: {contact.favoriteInterest}</p>
        )}
        <div style={{ gap: "0.2rem" }}>
          {contact.InterestOne && (
            <p>Other interests: {`${contact.InterestOne},`}</p>
          )}
          {contact.InterestTwo && <p>{contact.InterestTwo}</p>}
        </div>

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  const fetcher = useFetcher();
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    return new Response("", { status: 404, statusText: "Not Found" });
  }
  return { contact };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}
