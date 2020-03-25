<template>
    <div class="add-modal">
        <div class="add-modal-overlay"></div>
        <div id="add-modal-window" class="add-modal-window">
            <div class="add-modal-header">
                <span class="add-modal-title">Добавить контакт</span>
                <span class="add-modal-close" @click.stop="close">&times;</span>
            </div>
            <div class="add-modal-body">
                <p class="add-modal-validation-errors" v-if="errors.length != 0">
                    <b>Исправьте указанные ошибки: </b>
                    <ul>
                        <li v-for="(error, index) in errors" :key="index">{{error}}</li>
                    </ul>
                </p>

                <label for="name">Имя</label>
                <input type="text" id="name" name="name" placeholder="Имя.." 
                v-model="newContact.name"
                @keyup.enter="addContact"/>

                <label for="surname">Фамилия</label>
                <input type="text" id="surname" name="surname" placeholder="Фамилия.." 
                v-model="newContact.surname"
                @keyup.enter="addContact"/>
                
                <span>Телефоны:</span>
                <input type="text" placeholder="Телефон.."
                v-for="(phone, index) in newContact.phoneNumbers" 
                :key="index" 
                v-model="newContact.phoneNumbers[index]"
                @keyup.enter="addContact">

                <button class="btn btn-outline-secondary btn-sm" @click.stop="incNumOfPhones">Добавить еще</button>
                <button class="btn btn-outline-secondary btn-sm" @click.stop="decNumOfPhones">Убрать</button>

            </div>
            <div class="add-modal-footer">
                <button class="add-modal-save btn btn-outline-primary" @click.stop="addContact">Сохранить</button>
                <button class="add-modal-cancel btn btn-outline-secondary" @click.stop="close">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
import {postContact, postPhone, postPhones} from '@/api/PostHelper'

export default {
    data() {
        return {
            newContact: {
                name: '',
                surname: '',
                phoneNumbers: [''],
            },
            errors: [],

        }
    },
    methods: {
        async addContact() {
            if (this.checkAddModal()) {
                await postContact(this.newContact.name, this.newContact.surname)
                .then(async res => {
                    let notEmptyNumbers = this.newContact.phoneNumbers.filter(value => value.length > 0);
                    if (notEmptyNumbers.length > 0) {
                        await postPhones(notEmptyNumbers, res.Id)
                    }
                });
                this.$emit('contactAded');
            }     
        },
        checkAddModal() {
            this.errors = [];
            if (!this.newContact.name) {
                this.errors.push("Требуется указать имя");
            }
            for (let i in this.newContact.phoneNumbers) {
                if (this.newContact.phoneNumbers[i]) {
                    let re = /^[0-9]+$/
                    if (!re.test(this.newContact.phoneNumbers[i])) {
                        this.errors.push(`Неправильно указан номер в ${parseInt(i)+1} окне`)
                    }
                }
            }
            if (this.errors.length == 0) {
                return true
            }
            return false
        },
        close() {
            this.$emit('clickclose');
        },
        incNumOfPhones() {
            this.newContact.phoneNumbers.push('');
        },
        decNumOfPhones() {
            if (this.newContact.phoneNumbers.length > 1) {
                this.newContact.phoneNumbers.pop();
            }
        },
        modalCloseClickListener(event) {
            let modal = document.getElementById("add-modal-window")
            if (!modal.contains(event.target)) {
                this.close();
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.modalCloseClickListener)
    },
    destroyed() {
        document.removeEventListener('click', this.modalCloseClickListener)
    }
}
</script>

<style>
    .add-modal-overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,.5);
    }
    .add-modal-window {
        position: fixed;
        width: 600px;
        border-radius: 5px;
        background: #fff;

        left: 0;
        right: 0;
        top: 0;

        margin-top: 80px;
        margin-left: auto;
        margin-right: auto;

        
    }
    .add-modal-header {
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
    }
    .add-modal-title, .add-modal-close {
        font-size: 1.5rem;
    }
    .add-modal-body {
        padding: 15px;
        max-height: 500px;
        overflow: auto;
    }
    .add-modal-footer {
        display: flex;
        justify-content: space-between;
        padding: 7px 10px;
        border-top: 1px solid #eee;
    }
    .add-modal-save, .add-modal-cancel {
        border-radius: 3px;
    }
    input[type=text] {
        width: 100%;
        display: inline-block;
        border-radius: 3px;
        padding: 2px 15px;
        margin-bottom: 5px;
    }
    .add-modal-body label {
        margin: 0;
    }
    .add-modal-close {
        cursor: pointer;
    }
    .add-modal-validation-errors li {
        color: red;
    }
</style>