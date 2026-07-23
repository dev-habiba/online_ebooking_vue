<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  dataList: { type: Array, required: true },
  headers: { type: Array, required: true },
  displayKey: { type: String, required: true },
  columns: { type: Array, required: true },
  width: { type: String, default: "100%" },
  left: { type: String, default: "0" },
  right: { type: String, default: "auto" },
  minChars: { type: Number, default: 3 },
});

const emit = defineEmits(["update:modelValue", "select"]);

const selectedIndex = ref(-1);
const isDropdownOpen = ref(false);
const lastSelectedText = ref("");

// লোডারের স্টেট এবং টাইমার এখন চাইল্ডের নিজস্ব ভেরিয়েবল
const isLoading = ref(false);
let isLoadingTimeOut = null;

// প্রপ্স থেকে আসা modelValue টাইপ করার সাথে সাথে লোডার হ্যান্ডেল করার ওয়াচার
watch(
  () => props.modelValue,
  (newVal) => {
    // যদি সিলেক্ট করা ভ্যালু আর টাইপ করা ভ্যালু সেম হয়, তবে লোডার ঘুরবে না
    if (newVal === lastSelectedText.value) {
      isLoading.value = false;
      return;
    }

    if (newVal) {
      isDropdownOpen.value = true;
    }

    // আগের কোনো পেন্ডিং টাইমিং থাকলে তা ক্লিয়ার করবে
    if (isLoadingTimeOut) clearTimeout(isLoadingTimeOut);

    // ডাইনামিক minChars অনুযায়ী চেক
    if (newVal.trim().length >= props.minChars) {
      isLoading.value = true;

      // ১.৫ সেকেন্ডের ফেক ডিলে (বাস্তব প্রজেক্টে এপিআই রেসপন্স আসলে এটি false হবে)
      isLoadingTimeOut = setTimeout(() => {
        isLoading.value = false;
      }, 1500);
    } else {
      isLoading.value = false;
    }
  },
);

// ফিল্টারিং লজিক (শুধুমাত্র লোডিং শেষ হলে ডেটা দেখাবে)
const filteredItems = computed(() => {
  const keyword = props.modelValue.trim().toLowerCase();
  if (
    keyword.length < props.minChars ||
    !isDropdownOpen.value ||
    isLoading.value
  )
    return [];

  return props.dataList.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(keyword),
  );
});

// সাজেশন বক্স দেখানোর কন্ডিশন
const showSuggestions = computed(() => {
  return (
    props.modelValue.trim().length >= props.minChars &&
    isDropdownOpen.value &&
    !isLoading.value
  );
});

const selectRow = (item) => {
  const selectedText = item[props.displayKey];
  lastSelectedText.value = selectedText;
  emit("update:modelValue", selectedText);
  emit("select", item);
  isDropdownOpen.value = false;
  selectedIndex.value = -1;
  isLoading.value = false; // সিলেক্ট করার পর লোডার বন্ধ থাকবে
};

const handleKeydown = (e) => {
  if (!showSuggestions.value) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex.value = Math.min(
      selectedIndex.value + 1,
      filteredItems.value.length - 1,
    );
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (selectedIndex.value >= 0 && filteredItems.value[selectedIndex.value]) {
      selectRow(filteredItems.value[selectedIndex.value]);
    }
  } else if (e.key === "Escape") {
    isDropdownOpen.value = false;
    selectedIndex.value = -1;
  }
};

const wrapper = ref(null);

const outsideClick = (e) => {
  if (wrapper.value?.contains(e.target)) {
    isDropdownOpen.value = true;
  } else {
    isDropdownOpen.value = false;
    selectedIndex.value = -1;
  }
};

onMounted(() => {
  document.addEventListener("click", outsideClick);
  document.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  document.removeEventListener("click", outsideClick);
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div ref="wrapper" class="suggestion-wrapper">
    <!-- চাইল্ডের নিজস্ব ওয়াচার দ্বারা চালিত লোডার -->
    <div
      id="pod_loader"
      class="pod_loader child-circle-loader"
      v-if="isLoading"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- সাজেশন টেবিল বক্স -->
    <div
      class="search_suggestions_box"
      v-if="showSuggestions"
      :style="{ width: width, left: left, right: right }"
    >
      <table class="table table-striped table-bordered table-hover m-0">
        <thead>
          <tr>
            <th v-for="(header, hIdx) in headers" :key="hIdx">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredItems.length == 0">
            <td :colspan="headers.length" class="text-center">
              No Result Found
            </td>
          </tr>
          <tr
            v-for="(item, index) in filteredItems"
            :key="index"
            :class="{ 'table-primary active-row': selectedIndex === index }"
            @mouseenter="selectedIndex = index"
            @mousedown.prevent="selectRow(item)"
            style="cursor: pointer"
          >
            <td>{{ index + 1 }}</td>
            <td v-for="(col, cIdx) in columns" :key="cIdx">{{ item[col] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.search_suggestions_box {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  max-height: 250px;
  overflow: auto;
  outline-offset: 0px;
  outline: 1px solid #c4c4c4;
  z-index: 98;
  pointer-events: auto;
}
.active-row td {
  background-color: var(--light-green) !important;
  box-shadow: var(--shadow-xs) !important;
  cursor: pointer !important;
}

.suggestion-wrapper table thead tr th {
  font-size: 12px;
  font-weight: 500;
}
.suggestion-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.child-circle-loader { 
  pointer-events: auto; 
  position: absolute; 
  right: 15px; 
  top: 7px; 
  width: 15.5px; 
  height: 15.5px; 
  z-index: 10; 
} 
.child-circle-loader div { 
  position: absolute; 
  width: 2.5px; 
  height: 2.5px; 
  background: #727272; 
  border-radius: 50%; 
  animation: child-circle-loader-anim 1.2s linear infinite; 
} 
/* Medium circular layout */ 
.child-circle-loader div:nth-child(1) { 
  top: 0; left: 6.5px; 
  animation-delay: 0s; 
} 
.child-circle-loader div:nth-child(2) { 
  top: 2px; 
  left: 11.5px; 
  animation-delay: -0.15s; 
} 
.child-circle-loader div:nth-child(3) { 
  top: 6.5px; 
  left: 13.5px; 
  animation-delay: -0.3s; 
} 
.child-circle-loader div:nth-child(4) { 
  top: 11.5px; 
  left: 11.5px; 
  animation-delay: -0.45s; 
} 
.child-circle-loader div:nth-child(5) { 
  top: 13.5px; 
  left: 6.5px; 
  animation-delay: -0.6s; 
} 
.child-circle-loader div:nth-child(6) { 
  top: 11.5px; 
  left: 1.5px; 
  animation-delay: -0.75s; 
} 
.child-circle-loader div:nth-child(7) { 
  top: 6.5px; 
  left: 0; 
  animation-delay: -0.9s; 
} 
.child-circle-loader div:nth-child(8) { 
  top: 2px; 
  left: 1.5px; 
  animation-delay: -1.05s; 
} 
@keyframes child-circle-loader-anim { 
  0%, 100% { 
    opacity: 1; 
    transform: scale(1); 
  } 
  50% { 
    opacity: 0.3; 
    transform: scale(0.5); 
  } 
}
</style>
