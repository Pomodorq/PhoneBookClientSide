import Store from "@/api/Store"

export async function deleteContact(id) {
    let url = Store.hostname + "Handlers/ContactDelete.ashx";
    let deleteContactForm = new FormData();
    deleteContactForm.append("id", `${id}`);

    let response = await fetch(url, {
        method: "POST",
        body: deleteContactForm,
    });
    if (!response.ok) {
        alert("Ошибка HTTP:" + response.status + "\n" + response.headers.get('Error-Message'));
    }
}