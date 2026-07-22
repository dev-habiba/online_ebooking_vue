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
            userPageSize: {
            type: [Number, String],
            default: 100,
        },
    })

    const globalFilter = ref('')
    const sorting = ref([])
    const pagination = ref({
        pageIndex: 0,
        pageSize: Number(props.userPageSize) || 100,
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
        <table class="" style="min-width:2200px;">
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
                Show:
                <select
                    v-model.number="pagination.pageSize"
                    class="form-select form-select-sm"
                    style="width: 50px"
                    @change="table.setPageIndex(0)"
                >
                    <option :value="10">10</option>
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
        max-height: 435px;
        overflow: auto;
        position: relative;
        border: 1px solid #ddd !important;
        border-radius: 4px;
    }


    .table-container table {
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
    }


    .table-container thead {
        position: sticky;
        top: 0;
        z-index: 100;
    }


    .table-container thead th {
        position: sticky;
        top: 0;
        z-index: 101;
        box-shadow: inset 0 -1px 0 #acafb3;
    }

    /* .table-container :deep(table) {
        border-collapse: collapse !important;
    } */

    .table-container :deep(table th),
    .table-container :deep(table td) {
        border: 1px dotted #cfd8e3 !important;
    }

    :deep(.table tbody td) {
        padding: 1px 2px !important;
        font-size: 12px !important;
    }


    thead th:first-child,
    tbody td:first-child{
        border-left:1px solid #dee2e6;
    }

    /***************************************
    * Hover Effect
    ****************************************/
    .table-container :deep(tbody tr:hover td) {
        background-color: #dcfecb !important;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04) !important;
        cursor: pointer;
    }

    
    /* Sticky columns */
    :deep(th[style*="position: sticky"]) {
        background: #224c5d !important;
        color: #fff !important;
        box-sizing: border-box;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.15);
        z-index: 102 !important;
    }

    :deep(td[style*="position: sticky"]) {
        box-sizing: border-box;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.08);
        z-index: 10 !important;
    }

    /***************************************
    * Striped Rows
    ****************************************/
    .table-container :deep(table tbody tr:nth-of-type(odd) > td) {
        background-color: #f6fafa;
    }

    .table-container :deep(table tbody tr:nth-of-type(even) > td) {
        background-color: #ffffff;
    }


    /* Odd row - Sticky TD */ 
    :deep(tbody tr:nth-of-type(odd) td[style*="position: sticky"]) { 
        background-color: #f4f4f4 !important; 
        color: #2c3e50 !important;
    } 
    /* Even row - Sticky TD */ 
    :deep(tbody tr:nth-of-type(even) td[style*="position: sticky"]) { 
        background-color: #efefef !important; 
        color: #2c3e50 !important;
    }

    /*************************************** * Sticky Column Hover Effect ****************************************/ .table-container :deep( tbody tr:hover td[style*="position: sticky"] ) { 
        background-color: #dcfecb !important; 
        color: #2c3e50 !important; 
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04) !important; 
        cursor: pointer; 
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

    @media screen and (max-width: 1366px) {
        .table-container {
            max-height: 340px !important;
        }
    }
</style>
