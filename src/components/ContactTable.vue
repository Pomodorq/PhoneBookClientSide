<template>
<div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Телефоны</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template 
      v-for="contact in contacts">
        <ContactTableElem :contact="contact" :key="contact.Id" @contactDeleted='loadContacts' />
      </template>
      <tr>
        <td colspan="4">
          <button type="button" class="btn btn-outline-primary" @click.stop="openAddModal();">Add</button>
          <AddContactModal v-if="isAddModalOpen" @contactAded="closeAddModal(); loadContacts();" @clickclose="closeAddModal"/>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import AddContactModal from "@/components/AddContactModal"
import ContactTableElem from "@/components/ContactTableElem"
import {getContacts} from "@/api/GetHelper"

export default {
  components: {
    ContactTableElem, AddContactModal
  },
  data: function() {
    return {
      contacts: [],
      isAddModalOpen: false,
    };
  },
  async created() {
    await this.loadContacts();
  },
  methods: {
    async loadContacts() {
      await getContacts().then(res => this.contacts = res);
    },
    closeAddModal() {
      this.isAddModalOpen = false;
    },
    openAddModal() {
      this.isAddModalOpen = true;
    }
  },
};
</script>