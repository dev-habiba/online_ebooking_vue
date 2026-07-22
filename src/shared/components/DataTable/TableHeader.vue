<script setup>
    const props = defineProps({
        table: Object,
        flexRender: Function,
    })
</script>

<template>
    <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
                v-for="header in headerGroup.headers"
                :key="header.id"
                :style="{
                    width: header.column.getSize() + 'px',
                    minWidth: header.column.getSize() + 'px',
                    maxWidth: header.column.getSize() + 'px',

                    position: header.column.columnDef.meta?.sticky
                        ? 'sticky'
                        : undefined,

                    left: header.column.columnDef.meta?.sticky === 'left'
                        ? header.column.getStart('left') + 'px'
                        : undefined,

                    right: header.column.columnDef.meta?.sticky === 'right'
                        ? header.column.getAfter('right') + 'px'
                        : undefined,

                    zIndex: header.column.columnDef.meta?.sticky ? 50 : 10,
                }"
                class="text-center"
            >
                <component v-if="!header.isPlaceholder" :is="flexRender({ render: header.column.columnDef.header, props: header.getContext() })"/>
            </th>
        </tr>
    </thead>
</template>

<style scoped>
    thead th{
        background: #026e99 !important;
        color: #ffffff!important;
        font-size: 12px;
        padding: 4px 2px;
    }
</style>