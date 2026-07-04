<script setup>
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
  import authService from '@/modules/account/services/authService';
  import { useToast } from "vue-toastification";

  // ****************************** START COA Search ******************************
  const coa_full = ref('');
  const coa_list = ref([]);
  const coa_selected_index = ref(-1);
  const coa_show_suggestions = ref(false);
  const coa_loading = ref(false);
  const is_selecting_coa = ref(false);

  const coa_code = ref('');
  const coa_master_code = ref('');
  const coa_child_code = ref('');
  const coa_gen_led_code = ref('');
  const coa_sub_led_code = ref('');

  // api call
  const fetch_coa_suggestions = async (search_key) => {
      coa_loading.value = true;
        try {
          // রিয়াল API কলটি কমেন্ট করে স্ট্যাটিক ডেটা দেওয়া হলো
          /*
          const payload = {
              coa_search_key: search_key,
              type: 'search_coa_list'
          };
          const response = await authService.get_coa_full(payload);
          console.log(response)
          coa_list.value = response.data?.data?.length ? response.data.data : [];
          */

          // === Static Data Start ===
          coa_list.value = [
            {
              coa_code: '101001',
              subsidiary_ledger_full: 'Cash In Hand',
              general_ledger_full: 'Current Assets',
              coa_child_full: 'Cash Account',
              coa_master_code: '1000',
              coa_child_code: '1010',
              general_ledger_code: '101',
              subsidiary_ledger_code: '001'
            },
            {
              coa_code: '101002',
              subsidiary_ledger_full: 'Sonali Bank A/C',
              general_ledger_full: 'Bank Accounts',
              coa_child_full: 'Cash at Bank',
              coa_master_code: '1000',
              coa_child_code: '1010',
              general_ledger_code: '102',
              subsidiary_ledger_code: '002'
            },
            {
              coa_code: '201001',
              subsidiary_ledger_full: 'Office Rent Expense',
              general_ledger_full: 'Operating Expenses',
              coa_child_full: 'Administrative Exp.',
              coa_master_code: '2000',
              coa_child_code: '2010',
              general_ledger_code: '201',
              subsidiary_ledger_code: '001'
            }
          ];
          // === Static Data End ===
        } catch {
          coa_list.value = [];
      } finally {
          coa_loading.value = false;
          coa_show_suggestions.value = true;
          coa_selected_index.value = -1;
      }
  };

  watch(coa_full, (search_key) => {

      if (is_selecting_coa.value) {
          is_selecting_coa.value = false;
          return;
      }

      const key = (search_key ?? '').trim();
      if (key.length === 0) {
          coa_code.value = coa_master_code.value = coa_child_code.value = coa_gen_led_code.value = coa_sub_led_code.value = '';
          coa_show_suggestions.value = false;
          coa_list.value = [];
          return;
      }

      if (key.length < 3) {
          coa_show_suggestions.value = false;
          return;
      }

      fetch_coa_suggestions(key);
  });

  // ===== Keyboard Navigation =====
  const handle_coa_keydown = (e) => {
      if (!coa_show_suggestions.value) return;

      if (e.key === 'ArrowDown') {
          e.preventDefault();
          coa_selected_index.value = Math.min(coa_selected_index.value + 1, coa_list.value.length - 1);
      } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          coa_selected_index.value = Math.max(coa_selected_index.value - 1, 0);
      } else if ((e.key === 'Enter' || e.key === 'Tab') && coa_selected_index.value >= 0) {
          e.preventDefault();
          select_coa_row(coa_selected_index.value);
      } else if (e.key === 'Escape') {
          coa_show_suggestions.value = false;
      }
  };

  // ===== Row Select =====
  const select_coa_row = (index) => {
      const c = coa_list.value[index];
      if (!c) return;

      is_selecting_coa.value = true;

      coa_full.value = c.subsidiary_ledger_full ?? '';
      coa_code.value = c.coa_code ?? '';
      coa_master_code.value = c.coa_master_code ?? '';
      coa_child_code.value = c.coa_child_code ?? '';
      coa_gen_led_code.value = c.general_ledger_code ?? '';
      coa_sub_led_code.value = c.subsidiary_ledger_code ?? '';

      coa_show_suggestions.value = false;
      
  };

  // ===== Outside Click =====
  const handle_coa_outside_click = (e) => {
      if (!document.querySelector('.acc_yearly_budget_create_coa_wrap')?.contains(e.target)) {
          coa_show_suggestions.value = false;
      }
  };

  onMounted(() => document.addEventListener('click', handle_coa_outside_click));
  onUnmounted(() => document.removeEventListener('click', handle_coa_outside_click));

  // ****************************** END COA Search ******************************

</script>

<template>
  <div class="p-3">
    <h4>Suggestions Test Page</h4>
    <br>
    <input type="text" v-model="coa_full" @keydown="handle_coa_keydown" class="form-control uppercase-only" style="width: 500px;" 
      placeholder="🔎 3+ Chars to Search" autocomplete="off">

    <!-- Loader -->
    <div class="acc_yearly_budget_create_coa_loader" v-show="coa_loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <!-- Suggestions -->
    <div class="acc_yearly_budget_create_coa_suggestions"
        v-show="coa_show_suggestions">
        <table>
            <thead>
                <tr>
                    <th style="width:25px;">SL</th>
                    <th style="width:110px;">Code</th>
                    <th style="width:180px;">Sub. Ledger</th>
                    <th style="width:150px;">Gen. Ledger</th>
                    <th style="width:110px;">Child. Ledger</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="coa_list.length === 0">
                    <td colspan="5" style="text-align:center; color:#999;">No result found</td>
                </tr>
                <tr v-for="(item, index) in coa_list" :key="index"
                    :class="{ active: coa_selected_index === index }"
                    style="cursor:pointer;" @click="select_coa_row(index)"
                    @mouseenter="coa_selected_index = index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.coa_code ?? '' }}</td>
                    <td>{{ item.subsidiary_ledger_full ?? '' }}</td>
                    <td>{{ item.general_ledger_full ?? '' }}</td>
                    <td>{{ item.coa_child_full ?? '' }}</td>
                </tr>
            </tbody>
        </table>
    </div>

  </div>
</template>

