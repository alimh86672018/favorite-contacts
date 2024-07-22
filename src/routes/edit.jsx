import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contact";

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Youtube</span>
        <input
          type="text"
          name="youtube"
          placeholder="@jack"
          defaultValue={contact.youtube}
        />
      </label>
      <label>
        <span>Instagram</span>
        <input
          type="text"
          name="instagram"
          placeholder="@jack"
          defaultValue={contact.instagram}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Favorite Interest</span>
        <input
          type="text"
          name="favoriteInterest"
          required
          placeholder="Favorite Interest"
          defaultValue={contact.favoriteInterest}
        />
      </label>

      <label>
        <span>Other Interests</span>
        <input
          type="text"
          name="InterestOne"
          placeholder="Interest One"
          // defaultValue={contact.primaryInterest}
        />
      </label>
      <label>
        <span></span>
        <input
          type="text"
          name="InterestTwo"
          placeholder="Interest Two"
          // defaultValue={contact.primaryInterest}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
