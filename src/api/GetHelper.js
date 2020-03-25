import Store from "@/api/Store"

export async function getContacts() {
    let url = Store.hostname + "Handlers/Contacts.ashx";
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        alert("Ошибка HTTP:" + response.status + "\n" + response.headers.get('Error-Message'));
    }
}

export async function getPhones(contactId) {
    let url = Store.hostname + `Handlers/Phones.ashx?contactId=${contactId}`;
    let response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        alert("Ошибка HTTP:" + response.status + "\n" + response.headers.get('Error-Message'));
    }
}