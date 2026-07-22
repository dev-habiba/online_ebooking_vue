<script setup>
    import { ref, computed, onMounted, h } from "vue";
    import { useRouter } from "vue-router";
    import { useAuth } from '@modules/auth/composable/useAuth';
    import apiClient from "@/core/apiClient";
    import {userData} from "@/shared/utils/userInfo.js";
    import { useAuthStore } from '@/modules/auth/store/authStore'

    import BaseModal from '@/shared/components/modal/BaseModal.vue';

    import { useLoader } from '@/shared/composables/useLoader.js'
    import CircleDivisionLoader from '@/shared/components/loaders/CircleDivisionLoader.vue';
    import SquareDivisionLoader from '@/shared/components/loaders/SquareDivisionLoader.vue';


    import DataTable from '@/shared/Components/DataTable/DataTable.vue';

    const authStore = useAuthStore()
    const user = authStore.getUser


    const { is_loading } = useAuth();
    const isTableVisible = ref(false)
    const all_bookings = ref([]);

    const {
      showModernLoader,
      hideModernLoader,
      showCircleLoader,
      hideCircleLoader,
      showSquareLoader,
      hideSquareLoader
    } = useLoader();
    
    const showTestModal = ref(false)
    const selectedIds = ref([])

    const selectAll = computed({
      get: () => {
        return all_bookings.value.length > 0 && selectedIds.value.length === all_bookings.value.length;
      },
      set: (value) => {
        if (value) {
          selectedIds.value = all_bookings.value.map(item => item.id);
        } else {
          selectedIds.value = [];
        }
      }
    });




  /**************** All Booking list api json - Start ********************/
  const date_type = ref("bkg_create_date");

  const getDateString = (date) => {
      return date.toISOString().split('T')[0];
  };

  const today = new Date();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const date_from = ref(getDateString(oneWeekAgo));
  const date_to = ref(getDateString(today));

  const userId = user?.userId ?? '';
  const ebkg_creator_customer_code = user?.company_id ?? '';

  // const get_all_bookings = async () => {
  //   try {
  //     const payload = {
  //       ebkg_creator_customer_code: ebkg_creator_customer_code,
  //       user_id: userId,
  //       language_id: userData.language_id,
  //       date_type: date_type.value,
  //       date_from: date_from.value,
  //       date_to: date_to.value,
  //     };

  //     const { data } = await apiClient.post(
  //       "/online/ebooking/ebkg_full_list_load_json.php",
  //       payload
  //     );

  //     // console.log("API Response:", data);

  //     if (data?.header_data?.success) {
  //       all_bookings.value = data.details_data ?? [];
  //     } else {
  //       all_bookings.value = [];
  //     }
  //   } catch (error) {
  //     console.error("All Booking List Error:", error);

  //     all_bookings.value = [];

  //     throw error;
  //   }
  // };


const get_all_bookings = async () => {
  try {
    const payload = {
      ebkg_creator_customer_code: ebkg_creator_customer_code,
      user_id: userId,
      language_id: userData.language_id,
      date_type: date_type.value,
      date_from: date_from.value,
      date_to: date_to.value,
    };

    const { data } = await apiClient.post(
      "/online/ebooking/ebkg_full_list_load_json.php",
      payload
    );

    if (data?.header_data?.success) {
      const bookings = data.details_data ?? [];

      // আপাতত ১টা data কে 10 বার দেখাবে
      if (bookings.length === 1) {
        all_bookings.value = Array(20).fill(bookings[0]);
      } else {
        all_bookings.value = bookings;
      }
    } else {
      all_bookings.value = [];
    }

  } catch (error) {
    console.error("All Booking List Error:", error);
    all_bookings.value = [];
    throw error;
  }
};


  /**************** All Booking list api json - End ********************/


  const columns = [
      // Checkbox
      // {
      //   id: 'select',
      //   header: () =>
      //     h('input', {
      //         type: 'checkbox',
      //         class: 'all_check_box',
      //         checked: selectAll.value,
      //         onChange: (e) => {
      //           selectAll.value = e.target.checked
      //         }
      //     }),

      //     enableSorting: false,
      //     enableGlobalFilter: false,
      //     size: 43,
      //     meta: { sticky: 'left' },
      //     cell: ({ row }) =>
      //       h('input', {
      //         type: 'checkbox',
      //         class: 'ens_dt_check_box',
      //         value: row.original.id,
      //         checked: selectedIds.value.includes(row.original.id),
      //         onChange: (e) => {
      //           if (e.target.checked) {
      //             selectedIds.value.push(row.original.id)
      //           } else {
      //             selectedIds.value = selectedIds.value.filter(
      //               id => id !== row.original.id
      //             )
      //           }
      //         }
      //       }
      //     ),
      // },

      // SN
      {
        id: 'sn',
        header: 'SN',
        enableSorting: false,
        size: 30,
        meta: { sticky: 'left' },
        cell: ({ row, table }) => {
          const pageIndex = table.getState().pagination.pageIndex
          const pageSize = table.getState().pagination.pageSize
          const index = table.getRowModel().rows.findIndex(r => r.id === row.id)

          return h(
            'div',
            {
              class: 'text-center'
            },
            pageIndex * pageSize + index + 1
          )
        }
      },

      // SEA/AIR
      {
        id:'sea_air',
        accessorKey: 'sea_air',
        header: 'S/A',
        size: 50,
        meta: { sticky: 'left' },
        enableSorting: false,
        cell: ({ getValue }) =>
          h('img', { src: getValue(), class: '' }),
      },
      // Imp/Exp
      {
        id:'imp_exp',
        accessorKey: 'imp_exp',
        header: 'I/E',
        size: 50,
        meta: { sticky: 'left' },
        enableSorting: false,
        cell: ({ getValue }) =>
          h('img', { src: getValue(), class: '' }),
      },

      // MBL
      {
        id:'bkg_no',
        size: 115,
        meta: { sticky: 'left' },
        accessorKey: 'bkg_no',
        header: 'BKG NO',
      },

      // HBL
      {
        id:'hbl',
        size: 115,
        meta: { sticky: 'left' },
        accessorKey: 'hbl',
        header: 'HBL NO',
      },
      // LIVE BKG NO
      {
        id:'live_bkg_no',
        size: 115,
        // meta: { sticky: 'left' },
        accessorKey: 'live_bkg_no',
        header: 'LIVE BKG NO',
      },
      // PO NO.s
      {
        id:'po_no',
        size: 120,
        accessorKey: 'po_no',
        header: 'PO NO.s',
      },
      // -
      {
        id:'po_no',
        size: 120,
        accessorKey: 'po_no',
        header: '-',
      },
      // INC
      {
        id:'inc',
        size: 120,
        accessorKey: 'inc',
        header: 'INC',
      },
      // POL
      {
        id:'pol',
        size: 120,
        accessorKey: 'pol',
        header: 'POL',
      },
      // POD
      {
        id:'pod',
        size: 120,
        accessorKey: 'pod',
        header: 'POD',
      },
      // SHIPPER
      {
        id:'shipper_name',
        size: 120,
        accessorKey: 'shipper_name',
        header: 'SHIPPER',
      },
      // CONSIGNEE
      {
        id:'consignee_name',
        size: 120,
        accessorKey: 'consignee_name',
        header: 'CONSIGNEE',
      },
      // STATUS
      {
        id:'status',
        size: 120,
        accessorKey: 'status',
        header: 'STATUS',
      },
      // BKG BY
      {
        id:'entry_by',
        size: 120,
        accessorKey: 'entry_by',
        header: 'BKG BY',
      },
      // BKG DATE
      {
        id:'entry_date',
        size: 120,
        accessorKey: 'entry_date',
        header: 'BKG DATE',
      },
      // Invoice
      {
        id:'entry_date',
        size: 120,
        accessorKey: 'entry_date',
        header: 'Invoice',
      },
      // paperclip
      {
        id: 'paperclip',
        size: 50,
        enableSorting: false,
        accessorKey: '',
        header: () =>
          h('i', {
            class: 'fa-solid fa-paperclip'
          }),
      },

      // SO
      {
        id:'so',
        size: 120,
        accessorKey: '',
        header: 'SO',
      },

      // PSA
      {
        id:'pas',
        size: 120,
        accessorKey: '',
        header: 'PSA',
      },
      // -
      {
        id:'date',
        size: 120,
        meta: { sticky: 'right' },
        accessorKey: 'entry_date',
        header: 'BKG DATE',
      },

      // Delete
      {
        id: 'delete',
        header: '-',
        enableSorting: false,
        size: 43,
        meta: { sticky: 'right' },
        cell: ({ row }) =>
          h(
            'button',
            {
              class: 'btn btn-sm btn-outline-danger bg-gradient data_table_btn deleteBtn',
              'data-id': row.original.id,
            },
            [h('i', { class: 'fas fa-trash' })]
          ),
      },
  ]


  const all_booking_load_data = async () => {
    try {
      isTableVisible.value = false;
      is_loading.value = true;

      showCircleLoader('cargoaim_custom_form_wrapper');

      await get_all_bookings();

      isTableVisible.value = true;

    } catch (error) {
      console.error("Load Booking Error:", error);
    } finally {
      hideCircleLoader('cargoaim_custom_form_wrapper');
      is_loading.value = false;
    }
  };

</script>

<template>
  <!-- ============================================================== -->
  <!-- Start Page Content here -->
  <!-- ============================================================== -->
  <div class="filing_content">
    <div class="card filing-content-wrapper">
      <div class="card-header bg-gradient d-flex justify-content-between align-items-center">
        <h4 class="card-title m-0"><i class="fa-solid fa-bars"></i>&nbsp;All Bookings</h4>

        <button type="button" class="btn btn-primary bg-gradient new_booking_file_btn dropdown-toggle" id="newBookingDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          New Booking
        </button>

        <ul class="dropdown-menu new_booking_dropdown_menu" aria-labelledby="newBookingDropdown">
          <li>
            <router-link class="dropdown-item new_booking_dropdown_item" :to="{ name: 'courier.booking' }">
              <i class="fa-solid fa-plus me-2"></i>
              Courier Booking
            </router-link>
          </li>

          <li>
            <router-link class="dropdown-item new_booking_dropdown_item" :to="{ name: 'freight.forwarding' }">
              <i class="fa-solid fa-plus me-2"></i>
              Freight Forwarding
            </router-link>
          </li>
        </ul>
        
      </div>
      <div class="filing-content-body">
        <div class="table-responsive filing_search_responsive_table_wrapper filing_search_bg_color bg-gradient" >
          <table class="table table-borderless filing_search_table">
            <tr class="filing_search_table_row text-center">
              <th class="" style="width: 100px">Type</th>
              <th class="" style="width: 115px">From</th>
              <th class="" style="width: 115px">To</th>
              <th class="" style="width: 100px">Booked by</th>
              <th class="" style="width: 250px">Keyword</th>
              <th class="" style="width: 100px">Company</th>
              <th class="" style="width: 100px">Status</th>
              <th class="" style="width: auto"></th>
              <th class="" style="width: 40px"></th>
              <th class="" style="width: 40px"></th>
              <th class="" style="width: 100px"></th>
            </tr>
            <tr class="filing_search_table_row">
              <td>
                <select v-model="date_type" class="form-select">
                  <option value="bkg_create_date" selected>Entry Date</option>
                </select>
              </td>
              <td>
                <input type="date" v-model="date_from" class="form-control" autocomplete="off" data-date-format="d-M-Y"/>
              </td>
              <td>
                <input type="date" v-model="date_to" class="form-control" autocomplete="off" data-date-format="d-M-Y"/>
              </td>
              <td class="text-center">
                <select class="form-select" name="stock_filter_carrier_name" id="stock_filter_carrier_name" autocomplete="off" >
                  <option value=""></option>
                </select>
              </td>
              <td>
                <input type="text" name="hbl_mbl" id="hbl_mbl" class="form-control uppercase-only" placeholder="🔍 HBL/MBL/PORT/VSL/VOY" autocomplete="off" />
              </td>
              <td>
                <select class="form-select" name="stock_filter_b_unit" id="stock_filter_b_unit" >
                  <option value=""></option>
                </select>
              </td>
              <td>
                <select class="form-select" name="stock_status" id="stock_status" >
                  <option value="A">Active</option>
                  <option value="D">Deleted</option>
                  <option value="N">Canceled</option>
                  <option value="ALL" selected="selected">ALL</option>
                </select>
              </td>
              
              <td></td>
              <td class="text-center">
                <button type="button" id="cm_vol_report_exl_btn" class="btn btn-sm border p-0" >
                  <i class="fa-solid fa-file-excel" style="font-size: 20px; color: #1d6f42"></i>
                </button>
              </td>
              <td class="text-center">
                <button type="button" id="cm_vol_report_pdf_btn" class="btn btn-sm border p-0">
                  <i class="fa-solid fa-file-pdf" style="font-size: 20px; color: red"></i>
                </button>
              </td>
              <!-- Load Button -->
              <td class="text-center">
                <button type="" class="btn btn-primary bg-gradient btn-cargoaim w-100 px-1 flex-fill" id="filing_load_data_btn" @click.prevent="all_booking_load_data" :disabled="is_loading">
                  <span v-if="!is_loading">
                    <i class="fa-solid fa-arrows-rotate" style="font-size: 14px;"></i>
                    LOAD
                  </span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm" role="status"></span> LOAD
                  </span>
                </button>
              </td>
            </tr>
          </table>
        </div>

        <!-- Initial Data Table -->
        <div class="cargoaim_custom_form_wrapper mt-2 position-relative" id="filing_dataLoad_customize">
          <CircleDivisionLoader loader-key="cargoaim_custom_form_wrapper" />

          <DataTable v-if="all_bookings.length > 0" :columns="columns" :rows="all_bookings" :loading="is_loading" :user-page-size="userData.page_size"/>

          <!-- Initial message outside tbody -->
          <div v-if="!isTableVisible" id="filing_cargoaim_table_message" class="text-start text-muted p-4">
            <p>📄 List will be loaded here...!</p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  <!-- .page-container এর ক্লোজিং ট্যাগ -->
  
  
  <!-- Create modal start -->

</template>


<style lang="css" scoped>
  :global(.modal-header:has(.filing-modal-header-title)) {
      background-color: #eee9fd !important;
      color: #0072a7 !important;
      padding: 8px 5px 8px 15px;
      font-size: 15px;
      font-weight: 600;
      border-bottom: 1px dotted #baa3f1;
      background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));;
  }

  
  .new_booking_dropdown_menu{
    background: #000;
    padding: 0px;
    border-radius: 0px;
    border: 1px solid #baa3f1;
  }
  .new_booking_dropdown_item{
      padding: 3px 10px;
      gap: 5px;
      border-bottom: 1px solid #959595;
      font-size: 13px;
  }




  .table.nowrap th input[type="checkbox"],
  .table.nowrap td input[type="checkbox"] {
    display: inline-block;
    vertical-align: middle;
  }



  /* .filing_content {
    height: 70vh !important;
  } */

  .bg-gradient {
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    ) !important;
  }

  /* ===================== Card shell (matches reference design) ===================== */

  .filing-content-wrapper .card-header {
    background: linear-gradient(90deg, #f3f0fc 0%, #e6defa 100%) !important;
    border-bottom: 1px solid #c7bdee !important;
    padding: 4px 5px !important;
  }

  .filing-content-wrapper .card-title {
    color: #0072a7 !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    letter-spacing: 0.2px;
  }

  .filing-content-wrapper .new_booking_file_btn {
    font-size: 13.5px;
    padding: 3px 9px;
    font-weight: 200 !important;
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    ) !important;
  }

  /* ===================== Search filter row (Type/From/To/...) ===================== */

  .filing-content-body {
    flex-grow: 1;
    background-color: #fff;
    padding: 6px;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 10px;
  }
  .filing_search_bg_color {
    background-color: #a3c8e8;
  }
  .filing_search_responsive_table_wrapper {
    border: 2px solid #dddddd;
    border-radius: 5px;
    width: 100%;
    overflow-x: auto;
    padding: 0;
  }

  .filing_search_table {
    margin-bottom: 0rem !important;
  }

  .filing_search_table th,
  .filing_search_table td {
    border-right: 1px dotted #f2f2f2 !important;
  }
  .filing_search_table td {
    padding: 2px 1px;
  }

  .filing_search_table th {
    font-weight: 100 !important;
    font-size: 13px !important;
    padding: 5px 5px !important;
  }
  .filing_search_table_row th {
    border: none;
  }

  .filing_search_table .form-control,
  .filing_search_table .form-select {
    height: 30px !important;
    min-height: 30px !important;
    font-size: 12px !important;
    line-height: 1.2 !important;
    padding: 4px 8px !important;
    border: 1px solid #c2c2c2 !important;
    border-radius: 4px !important;
    background-color: #fff !important;
    box-shadow: none !important;
  }





  /************************ Excel / PDF icon buttons ******************/
  #cm_vol_report_exl_btn,
  #cm_vol_report_pdf_btn {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid #b4aee8 !important; 
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    font-size: 11px;
    background: rgba(255, 255, 255, 0.4); 
    box-shadow: none; 
    transition: all 0.2s ease-in-out;
  }

  #cm_vol_report_exl_btn {
    color: #107c41; 
  }

  #cm_vol_report_exl_btn:hover {
    background: rgba(16, 124, 65, 0.12) !important;
    border-color: #107c41 !important;
  }

  #cm_vol_report_pdf_btn {
    color: #f40f02; 
  }

  #cm_vol_report_pdf_btn:hover {
    background: rgba(244, 15, 2, 0.12) !important;
    border-color: #f40f02 !important;
  }

  #cm_vol_report_exl_btn:active,
  #cm_vol_report_pdf_btn:active {
    transform: scale(0.95);
  }






  /* ===================== Result list panel ===================== */
  #filing_dataLoad_customize {
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }

  #filing_load_data_btn {
    width: auto !important;
    min-width: 70px !important;
    height: 32px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    padding: 5px 12px !important;
    border-radius: 4px !important;
    background-color: #1fa363 !important;
    border: 1px solid #1fa363 !important;
    color: #fff !important;
    text-decoration: none !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  #loadDataBtn:hover {
    background-color: #2558c4 !important;
    border-color: #2558c4 !important;
  }

  #filing_cargoaim_table_tbody .btn-sm {
    width: 26px;
    height: 26px;
    padding: 0px !important;
    margin: 0px !important;
  }










  :deep(button.data_table_btn) {
    padding: 1px 3px !important;
  }

</style>
