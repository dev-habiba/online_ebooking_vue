<script setup>
    import { ref, computed, h } from 'vue'
    import {
        useVueTable,
        getCoreRowModel,
        getFilteredRowModel,
        getSortedRowModel,
        getPaginationRowModel,
        FlexRender as TFlexRender,
    } from '@tanstack/vue-table'

    import TableHeader from '@/shared/Components/DataTable/TableHeader.vue'
    import TableBody from '@/shared/Components/DataTable/TableBody.vue'

    const props = defineProps({
        columns: {
            type: Array,
            default: () => [],
        },
        rows: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
    })

    const globalFilter = ref('')
    const sorting = ref([])
    const pagination = ref({
        pageIndex: 0,
        pageSize: 16,
    })

    const columnPinning = computed(() => {

        return {
            left: props.columns
                .filter(col => col.meta?.sticky === 'left')
                .map(col => col.id ?? col.accessorKey),

            right: props.columns
                .filter(col => col.meta?.sticky === 'right')
                .map(col => col.id ?? col.accessorKey),
        }

    })

    const flexRender = (props) => h(TFlexRender, props)

    const table = useVueTable({
        get data() {
            return props.rows ?? []
        },

        get columns() {
            return props.columns ?? []
        },

        state: {

            get sorting() {
                return sorting.value
            },

            get globalFilter() {
                return globalFilter.value
            },

            get pagination() {
                return pagination.value
            },

            get columnPinning() {
                return columnPinning.value
            },

        },

        onSortingChange: (updater) => {
            sorting.value =
                typeof updater === 'function'
                    ? updater(sorting.value)
                    : updater
        },

        onGlobalFilterChange: (updater) => {
            globalFilter.value =
                typeof updater === 'function'
                    ? updater(globalFilter.value)
                    : updater
        },

        onPaginationChange: (updater) => {
            pagination.value =
                typeof updater === 'function'
                    ? updater(pagination.value)
                    : updater
        },

        globalFilterFn: 'includesString',

        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const hasData = computed(() => table.getRowModel().rows.length > 0)
</script>

<template>

    <!-- TABLE -->
    <div class="table-container">
        <table class="table table-striped table-bordered table-hover align-middle mb-0" style="min-width:2200px;">
            <!-- HEADER -->
            <TableHeader :table="table" :flex-render="flexRender"/>

            <!-- BODY -->
            <TableBody :table="table" :flex-render="flexRender" :loading="loading" :has-data="hasData"/>
        </table>
    </div>


    <!-- Showing, Page Size, pagination -->
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <!-- Left Side -->
        <div class="d-flex align-items-center gap-3">
            <!-- Showing -->
            <div>
                <template v-if="table.getFilteredRowModel().rows.length">
                    Showing
                    {{ table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 }}
                    to
                    {{
                        Math.min(
                            (table.getState().pagination.pageIndex + 1) *
                            table.getState().pagination.pageSize,
                            table.getFilteredRowModel().rows.length
                        )
                    }}
                    of
                    {{ table.getFilteredRowModel().rows.length }}
                    entries
                </template>

                <template v-else>
                    Showing 0 to 0 of 0 entries
                </template>
            </div>

            <!-- Page Size -->
            <div class="d-flex align-items-center gap-2">
                <select class="form-select form-select-sm" style="width:80px" v-model="pagination.pageSize" @change="table.setPageSize(Number(pagination.pageSize))">
                    <option :value="16">16</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>

        </div>

        <!-- Right Side Pagination -->
        <div class="d-flex align-items-center gap-1">
            <button class="btn btn-sm btn-outline-secondary page_angle_btn" @click="table.setPageIndex(0)" :disabled="!table.getCanPreviousPage()" >
                <i class="fa-solid fa-angles-left"></i>
            </button>

            <button class="btn btn-sm btn-outline-secondary page_angle_btn" @click="table.previousPage()" :disabled="!table.getCanPreviousPage()">
                <i class="fa-solid fa-angle-left"></i>
            </button>

            <button v-for="page in table.getPageCount()" :key="page" class="btn btn-sm page_no_btn" :class="table.getState().pagination.pageIndex === page - 1 ? 'btn-primary text-white' : 'btn-outline-secondary'" @click="table.setPageIndex(page - 1)">
                {{ page }}
            </button>

            <button class="btn btn-sm btn-outline-secondary page_angle_btn" @click="table.nextPage()" :disabled="!table.getCanNextPage()">
                <i class="fa-solid fa-angle-right"></i>
            </button>

            <button class="btn btn-sm btn-outline-secondary page_angle_btn" @click="table.setPageIndex(table.getPageCount() - 1)" :disabled="!table.getCanNextPage()">
                <i class="fa-solid fa-angles-right"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>

    .table-container {
        max-height: 500px;
        overflow: auto;
        position: relative;
    }


    .table-container table {
        border-collapse: separate;
        border-spacing: 0;
    }


    .table-container thead {
        position: sticky;
        top: 0;
        z-index: 100;
    }


    .table-container thead th {
        position: sticky;
        top: 0;
        background: #fff !important;
        z-index: 101;
        box-shadow: inset 0 -1px 0 #dee2e6;
    }


    tbody td{
        background:#fff;
    }

    :deep(.table tbody td) {
        padding: 1px 2px !important;
        font-size: 12px !important;
    }


    thead th:first-child,
    tbody td:first-child{
        border-left:1px solid #dee2e6;
    }


    /* sticky shadow */
    th[style*="sticky"],
    td[style*="sticky"]{
        box-shadow:2px 0 5px rgba(0,0,0,.08);
    }


    .table_footer_pagination{
        border-top: 1px solid #ddd;
        background-image: linear-gradient(to bottom, #f1f4f8, #e6ebf2) !important;
    }
    .page_no_btn{
        padding: 1px 8px;
    }
    .page_angle_btn{
        padding: 3.67px 2px;
    }
</style>
