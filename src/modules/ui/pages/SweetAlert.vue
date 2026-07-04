<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useSweetAlert } from '@/shared/composables/useSweetAlert'

const sweetAlert = useSweetAlert()

const items = ref([
  { id: 1, name: 'Shipment CRG-001' },
  { id: 2, name: 'Shipment CRG-002' }
])

//** 01: confirmDelete */
async function deleteItem(id) {
  const result = await sweetAlert.confirmDelete(
    'Delete this item?',
    'This record will be permanently removed!'
  )

  if (result.isConfirmed) {
    try {
      await axios.delete(`/api/items/${id}`)
      items.value = items.value.filter(item => item.id !== id)
      sweetAlert.success('Item deleted successfully')   // delete -> success popup
    } catch (err) {
      sweetAlert.error('Failed to delete item')           // delete fail -> error popup
    }
  } else {
    console.log('Delete cancelled')
  }
}

//** 02: success */
function saveItem() {
  sweetAlert.success('Item saved successfully!')
}

//** 03: error */
function showValidationError() {
  sweetAlert.error('Please fill all required fields!')
}

//** 04: confirm (generic yes/no) */
async function submitOrder() {
    const result = await sweetAlert.confirm(
        'Submit this order?',
        'Once submitted, you cannot edit the items.'
    )

    if (result.isConfirmed) {
        console.log('Order submitted')
        sweetAlert.success('Order submitted successfully!')
    } else {
        console.log('Order submission cancelled')
    }
}
</script>

<template>
  <div>
    <h3>Items</h3>

    <table class="table">
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>
          <button @click="deleteItem(item.id)" class="btn btn-danger btn-sm mb-2">
            Delete
          </button>
        </td>
      </tr>
    </table>

    <hr>

    <button @click="saveItem" class="btn btn-success me-2">Save Item</button>
    <button @click="showValidationError" class="btn btn-warning me-2">Trigger Error</button>
    <button @click="submitOrder" class="btn btn-primary">Submit Order</button>
  </div>
</template>