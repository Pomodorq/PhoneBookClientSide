<template>
  <tr>
    <td>{{contact.Name}}</td>
    <td>{{contact.Surname}}</td>
    <td>
        <template v-if="contactPhones.length > 0">
            <div v-for="phone in contactPhones" :key="phone.contactId">+{{phone.PhoneNumber}}</div>
        </template>
    </td>
    <td>
      <button type="button" class="btn btn-outline-secondary" @click.stop="del">Delete</button>
    </td>
  </tr>
</template>

<script>
import {getPhones} from "@/api/GetHelper"
import {deleteContact} from "@/api/DeleteHelper"

export default {
    props: {
        contact: {
            type: Object,
        }
    },
    data() {
        return {
            contactPhones: [],
        }
    },
    methods: {
        async del(event) {
            await deleteContact(this.contact.Id);
            this.$emit('contactDeleted');
        }
    },
    async created() {
        await getPhones(this.contact.Id).then(phones => this.contactPhones = phones)
    } 
};
</script>