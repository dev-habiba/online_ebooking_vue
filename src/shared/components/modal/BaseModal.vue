<script setup>
import { computed } from 'vue'

const props = defineProps({
    modalValue: { 
        type: Boolean, 
        default: false 
    },
    position: { 
        type: String, 
        default: 'center' 
    },
    closeOnBackdrop: { type: Boolean, default: true }, // Backdrop click close
    width: { type: String, default: '420px' },      // e.g. '420px', '50%'
    height: { type: String, default: '200px' },    // e.g. '500px', '17%'
    padding: { type: String, default: "30px"}    // e.g. '30px'
})

const emit = defineEmits([
    'update:modalValue', 
    'close'
])

const closeModal = () => {
    emit('update:modalValue', false)
    emit('close')
}

// Handle Backdrop Click
const backdropClick = () => {
    if(props.closeOnBackdrop){
        closeModal()
    }
}

const backdropAlignClass = computed(() => ({
    center: 'justify-content-center align-items-center',
    right: 'justify-content-end align-items-stretch',
    left: 'justify-content-start align-items-stretch',
    top: 'justify-content-center align-items-start',
    bottom: 'justify-content-center align-items-end',
}[props.position]))

const dialogPositionClass = computed(() => 
    props.position === 'center' ? '' : `modal-${props.position}`
)

const dialogStyle = computed(() => ({
    width: props.width || undefined,
    height: props.height || undefined,
    padding: props.padding || undefined
}))
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div 
                class="base-modal-backdrop d-flex position-fixed top-0 start-0 w-100 h-100"
                :class="backdropAlignClass"
                v-if="props.modalValue" 
                @click.self="backdropClick"
            >
                <div 
                    class="base-modal-dialog bg-white rounded position-relative" 
                    :class="dialogPositionClass"
                    :style="dialogStyle"
                >

                    <button type="button" class="base-modal-close" @click="closeModal">
                        <i class="fas fa-times"></i>
                    </button>

                    <div class="modal-header" v-if="$slots.header">
                        <slot name="header"></slot>
                    </div>

                    <div class="base-modal-body" v-if="$slots.body">
                        <slot name="body"></slot>
                    </div>

                    <div class="text-end mt-2" v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style>
/***************************************
* Base Modal - Global Start
* Reusable Modal System (Vue 3 + Bootstrap)
****************************************/

/* =====================================
   BACKDROP
===================================== */
.base-modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* =====================================
   DIALOG (DEFAULT / CENTER)
===================================== */
.base-modal-dialog {
  outline: 4px solid #C4C4C4;
  outline-offset: 0px;
}

/* =====================================
   CLOSE BUTTON
===================================== */
.base-modal-close {
  position: absolute;
  top: 3px;
  right: 3px;

  width: 28px;
  height: 28px;
  line-height: 28px;

  border: none;
  border-radius: 50%;
  background: #dc3545;
  color: white;
  font-size: 15px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  /* hidden by default */
  opacity: 0;
  visibility: hidden;
  transform: scale(0.8);

  transition: opacity .2s ease, transform .2s ease;
}

/* show close button on hover */
.base-modal-dialog:hover .base-modal-close {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}
/* =====================================
   POSITION SYSTEM
===================================== */
/* shared sizing — left & right drawer */
.modal-left {
  width: 420px;
  max-width: 95.2%;
  margin-top: 61px;
  margin-left: 63px;
}

.modal-right{
  width: 420px;
  max-width: 95.2%;
  margin-top: 61px;
  margin-right: 10px;
}

/* shared sizing — top & bottom drawer */
.modal-top{
    width: 420px;
    max-width: 95.2%;
    margin-top: 61px;
    margin-left: 0px;
}

.modal-bottom {
  width: 420px;
  max-width: 95.2%;
  margin-bottom: 8px;
  margin-left: 54px;
}

/* =====================================
   TRANSITION (FADE)
===================================== */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>