<script setup>
    const props = defineProps({
        table: Object,
        flexRender: Function,
    })
</script>

<template>
    <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th v-for="header in headerGroup.headers" :key="header.id"
                :style="{
                    width: header.column.getSize() + 'px',
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
            >
                <component v-if="!header.isPlaceholder" :is="flexRender({ render: header.column.columnDef.header, props: header.getContext() })"/>
            </th>
        </tr>
    </thead>
</template>