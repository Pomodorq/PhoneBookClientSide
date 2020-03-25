import Store from "@/api/Store"

export async function postContact(name, surname) {
    let url = Store.hostname + "Handlers/ContactPost.ashx";
    
    let contactForm = new FormData();
    contactForm.append("Name", `${name}`);
    contactForm.append("Surname", `${surname}`);

    let response = await fetch(url, {
        method: 'POST',
        body: contactForm,
    });
    
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        alert("Ошибка HTTP:" + response.status + "\n" + response.headers.get('Error-Message'));
    }
}

export async function postPhone(phoneNumber, contactId) {
    let url = Store.hostname + "Handlers/PhonePost.ashx";

    let phoneForm = new FormData();
    phoneForm.append("PhoneNumber", `${phoneNumber}`);
    phoneForm.append("ContactId", `${contactId}`);

    let response = await fetch(url, {
        method: 'POST',
        body: phoneForm,
    });

    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        alert("Ошибка HTTP:" + response.status + "\n" + response.headers.get('Error-Message'));
    } 
}

export async function postPhones(phoneNumbers, contactId) {
    let url = Store.hostname + "Handlers/PhonesPost.ashx";

    let phoneNumbersPrepared = [];
    for (let number of phoneNumbers) {
        phoneNumbersPrepared.push({PhoneNumber: number, ContactId: contactId, Phones: null})
    }
    let s = JSON.stringify(phoneNumbersPrepared);

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            //'application/json;charset=utf-8'
            'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: s,
    });

    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        alert("Ошибка HTTP:" + response.status + "\n" + response.headers.get('Error-Message'));
    }
}