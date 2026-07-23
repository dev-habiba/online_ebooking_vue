<script setup>
import { ref, watch } from "vue";
import BaseSuggestion from "@/shared/components/suggestion/BaseSuggestion.vue";

const mySearchValue = ref("");
const selectedItemData = ref(null);
const selectedCode = ref("");

// তোমার চার্ট অব অ্যাকাউন্টস ডেটা
const dataList = ref([
  {
    data_code: "101001",
    subsidiary_ledger_full: "Cash In Hand",
    general_ledger_full: "Current Assets",
    coa_child_full: "Cash Account",
  },
  {
    data_code: "101002",
    subsidiary_ledger_full: "Sonali Bank A/C",
    general_ledger_full: "Bank Accounts",
    coa_child_full: "Cash At Bank",
  },
  {
    data_code: "101003",
    subsidiary_ledger_full: "Dutch Bangla Bank",
    general_ledger_full: "Bank Accounts",
    coa_child_full: "Cash At Bank",
  },
]);

// Suggestion Table Header 
const tableHeaders = [ "SL", "Code", "Sub Ledger", "General Ledger", "Child Ledger",];

// Suggestion Table Body 
const dataColumns = [ "data_code", "subsidiary_ledger_full", "general_ledger_full", "coa_child_full", ];



// Hidden code select data valu pol
const handleSelect = (item) => {
  selectedItemData.value = item;
  selectedCode.value = item.data_code; // সিলেক্টেড অবজেক্ট থেকে data_code নিয়ে হিডেন ইনপুটে বসালাম
  console.log("Selected Item Object:", item);
};
</script>

<template>
  <div class="row" style="width: 700px">
    <h2>Type to search</h2>

    <div class="position-relative">
        <!-- type="hidden" করা হলো এবং :value দিয়ে selectedCode বাইন্ড করা হলো -->
        <input type="hidden" name="code" id="code" :value="selectedCode" />

        <!-- মেইন সার্চ ইনপুট বক্স -->
        <input
            v-model="mySearchValue"
            class="form-control"
            placeholder="Search Data..."
            autocomplete="off"
        />

        <!-- রিইউজেবল চাইল্ড কম্পোনেন্ট -->
        <BaseSuggestion
            v-model="mySearchValue"
            :dataList="dataList"
            :headers="tableHeaders"
            :columns="dataColumns"
            :minChars="3"
            :isLoading="isSearching"
            displayKey="subsidiary_ledger_full"
            width="700px"
            left="12px"
            right="auto"
            @select="handleSelect"
        />
    </div>
  </div>
</template>

