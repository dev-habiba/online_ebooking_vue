<script setup>
    const props = defineProps({
        table: Object,
        flexRender: Function,
        loading: Boolean,
        hasData: Boolean,
    })
</script>

<template>
    <tbody>
        <!-- LOADING STATE -->
        <tr v-if="loading">
            <td :colspan="table.getVisibleFlatColumns().length" class="text-center py-4">
                <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                Loading...
            </td>
        </tr>

        <!-- NO DATA FOUND STATE (PERFECT FIX) -->
        <template v-else-if="table.getRowModel().rows.length === 0">
            <tr>
                <td :colspan="table.getVisibleFlatColumns().length" class="text-center py-1 fw-medium text-muted">
                    No data found
                </td>
            </tr>
            <tr style="height: 0; border: none;">
                <td 
                    v-for="cell in table.getVisibleFlatColumns()" 
                    :key="cell.id" 
                    :style="{ width: cell.getSize() + 'px', padding: '0', border: 'none', height: '0' }"
                ></td>
            </tr>
        </template>

        <!-- DATA ROWS -->
        <tr v-else v-for="row in table.getRowModel().rows" :key="row.id">
            <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :style="{
                    width: cell.column.getSize() + 'px',
                    minWidth: cell.column.getSize() + 'px',
                    maxWidth: cell.column.getSize() + 'px',

                    position: cell.column.columnDef.meta?.sticky
                        ? 'sticky'
                        : undefined,

                    left: cell.column.columnDef.meta?.sticky === 'left'
                        ? cell.column.getStart('left') + 'px'
                        : undefined,

                    right: cell.column.columnDef.meta?.sticky === 'right'
                        ? cell.column.getAfter('right') + 'px'
                        : undefined,

                    zIndex: cell.column.columnDef.meta?.sticky ? 40 : 1,
                }" class="text-center"
            >

                <component :is="flexRender({ render: cell.column.columnDef.cell, props: cell.getContext() })"/>
            </td>
        </tr>
    </tbody>
</template>

<style scoped>
    tbody td{
        font-size: 12px;
        padding: 2px 4px;
    }
</style>
