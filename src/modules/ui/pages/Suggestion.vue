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

// টেবিলের হেডারলিস্ট
const tableHeaders = [
  "SL",
  "Code",
  "Sub Ledger",
  "General Ledger",
  "Child Ledger",
];

// অবজেক্টের প্রোপার্টি বা কি (Keys) যেগুলোর ডেটা টেবিলে দেখাবে
const dataColumns = [
  "data_code",
  "subsidiary_ledger_full",
  "general_ledger_full",
  "coa_child_full",
];



// আইটেম সিলেক্ট হলে এই ফাংশনটি কল হবে
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

    <!-- টেস্ট করার জন্য নিচে কোড দুটি প্রিন্ট করে দেখতে পারেন (প্রয়োজন না হলে বাদ দিতে পারেন) -->
    <!-- <p class="mt-3">Selected Text: {{ mySearchValue }}</p>
        <p class="text-muted">Hidden Input Value (Code): {{ selectedCode }}</p> -->
  </div>
</template>

