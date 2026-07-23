<script setup>
    import { ref, computed, onMounted, h } from "vue";
    import { useRouter } from "vue-router";
    import { useAuth } from '@modules/auth/composable/useAuth';
    import apiClient from "@/core/apiClient";
    import { useAuthStore } from '@/modules/auth/store/authStore'
    import { userData } from "@/shared/utils/userInfo.js";
    import { getSeaAirLandIcon } from "@/shared/utils/allUiIcon.js";

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
    const hasSearched = ref(false)

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
        all_bookings.value = Array(1000).fill(bookings[0]);
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
      {
        id: 'select',
        header: () =>
          h('input', {
              type: 'checkbox',
              class: 'all_check_box',
              checked: selectAll.value,
              onChange: (e) => {
                selectAll.value = e.target.checked
              }
          }),

          enableSorting: false,
          enableGlobalFilter: false,
          size: 35,
          meta: { sticky: 'left' },
          cell: ({ row }) =>
            h('input', {
              type: 'checkbox',
              class: 'ens_dt_check_box',
              value: row.original.id,
              checked: selectedIds.value.includes(row.original.id),
              onChange: (e) => {
                if (e.target.checked) {
                  selectedIds.value.push(row.original.id)
                } else {
                  selectedIds.value = selectedIds.value.filter(
                    id => id !== row.original.id
                  )
                }
              }
            }
          ),
      },

      // SN
      {
        id: 'sn',
        header: 'SN',
        enableSorting: false,
        size: 40,
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

      // SEA / AIR / LAND
      {
        id: 'sea_air_land',
        accessorKey: 'sea_air_land',
        header: 'S/A',
        size: 40,
        meta: { sticky: 'left' },
        enableSorting: false,

        cell: ({ row }) => {
          const code = Number(row.original.sea_air_land);

          return h('span', {
            class: 'cargoaim_custom_cft_page_sea_air_icon',
            innerHTML: getSeaAirLandIcon(code),
          });
        },
      },

      // Imp / Exp
      {
          id: 'imp_exp',
          accessorKey: 'imp_exp',
          header: 'I/E',
          size: 50,
          meta: { sticky: 'left' },
          enableSorting: false,

          cell: ({ getValue }) => {
            const value = Number(getValue());

            const label = value === 1 ? 'IMP' : value === 2 ? 'EXP' : '';

            return h(
              'span',
              {
                class: [
                  'cargoaim_custom_cft_page_ie_badge',
                  value === 1
                      ? 'cargoaim_custom_cft_page_ie_badge_imp'
                      : value === 2
                          ? 'cargoaim_custom_cft_page_ie_badge_exp'
                          : '',
                ],
              },
              label
            );
          },
      },

      // BKG NO
      {
        id:'bkg_no',
        size: 110,
        meta: { sticky: 'left' },
        accessorKey: 'bkg_no',
        header: 'BKG NO',
      },

      // HBL
      {
        id:'hbl_no',
        size: 100,
        meta: { sticky: 'left' },
        accessorKey: 'hbl_no',
        header: 'HBL NO',
      },
      // LIVE BKG NO
      {
        id:'live_bkg_no',
        size: 100,
        // meta: { sticky: 'left' },
        accessorKey: 'live_bkg_no',
        header: 'LIVE BKG NO',
      },
      // PP/C
      {
          id: 'incoterm',
          accessorKey: 'incoterm',
          header: 'PP/CC',
          size: 50,
          enableSorting: false,

          cell: ({ getValue }) => {
              const value = getValue();

              const label =
                  value === 1 || value === '1'
                      ? 'PP'
                      : value === 'CFR'
                          ? 'CFR'
                          : '';

              return h('span', label);
          },
      },
      // PKG
      {
          id: 'web_pkg',
          accessorKey: 'web_pkg',
          header: 'PKG',
          size: 45,
          enableSorting: false,
      },
      // GW
      {
          id: 'gw',
          accessorKey: 'gw',
          header: 'GW',
          size: 60,
          enableSorting: false,
      },
      // CW
      {
          id: 'cw',
          accessorKey: 'cw',
          header: 'CW',
          size: 50,
          enableSorting: false,
      },
      // PO NO.s
      {
        id:'po_no',
        size: 60,
        accessorKey: 'po_no',
        header: 'PO NO.s',
      },
      // dash_column
      {
        id:'dash_column',
        size: 40,
        header: '-',
      },

      // INC
      // {
      //   id:'inc',
      //   size: 120,
      //   accessorKey: 'inc',
      //   header: 'INC',
      // },

      // POL
      {
        id:'ship_form_pol',
        size: 90,
        accessorKey: 'ship_form_pol',
        header: 'POL',
      },
      // POD
      {
        id:'ship_to_pod',
        size: 90,
        accessorKey: 'ship_to_pod',
        header: 'POD',
      },
      // SHIPPER
      {
        id:'shipper_name',
        size: 100,
        accessorKey: 'shipper_name',
        header: 'SHIPPER',
      },
      // CONSIGNEE
      {
        id:'consignee_name',
        size: 100,
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
        size: 90,
        accessorKey: 'entry_by',
        header: 'BKG BY',
      },
      // BKG DATE
      {
        id:'entry_date',
        size: 75,
        accessorKey: 'entry_date',
        header: 'BKG DATE',
      },
      
      // Remarks
      {
        id: 'remarks',
        header: 'Remarks',
        accessorKey: 'remarks',
      },
      // Invoice
      {
        id:'invoice',
        size: 40,
        meta: { sticky: 'right' },
        accessorKey: 'invoice',
        header: 'INV.',
      },
      // paperclip
      {
        id: 'paperclip',
        size: 40,
        meta: { sticky: 'right' },
        enableSorting: false,
        header: () =>
          h('i', {
            class: 'fa-solid fa-paperclip'
          }),
      },

      // SO
      {
        id:'so',
        size: 40,
        meta: { sticky: 'right' },
        header: 'SO',
      },

      // PSA
      {
        id:'pas',
        size: 40,
        meta: { sticky: 'right' },
        meta: { sticky: 'right' },
        header: 'PSA',
      },

      // Delete
      {
        id: 'delete',
        header: '-',
        enableSorting: false,
        size: 40,
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
    // Double click prevent
    if (is_loading.value) return;

    try {
        // Load/Search button click হয়েছে
        hasSearched.value = false;

        // নতুন load শুরু হলে table hide
        isTableVisible.value = false;

        // Loading শুরু
        is_loading.value = true;

        showCircleLoader('cargoaim_custom_form_wrapper');

        // API call
        await get_all_bookings();

        // Data থাকলে table show
        if (all_bookings.value && all_bookings.value.length > 0) {
            isTableVisible.value = true;
        } else {
            isTableVisible.value = false;
        }

    } catch (error) {
        console.error('Load Booking Error:', error);

        isTableVisible.value = false;

    } finally {
        hideCircleLoader('cargoaim_custom_form_wrapper');

        is_loading.value = false;
    }
  };

  // const all_booking_load_data = async () => {
  //   try {
  //     isTableVisible.value = false;
  //     is_loading.value = true;

  //     showCircleLoader('cargoaim_custom_form_wrapper');

  //     await get_all_bookings();

  //     isTableVisible.value = true;

  //   } catch (error) {
  //     console.error("Load Booking Error:", error);
  //   } finally {
  //     hideCircleLoader('cargoaim_custom_form_wrapper');
  //     is_loading.value = false;
  //   }
  // };

</script>

<template>
  <!-- ============================================================== -->
  <!-- Start Page Content here -->
  <!-- ============================================================== -->
  <div class="card filter-content-wrapper">
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
    <div class="filter-content-body">
      <div class="table-responsive filter_search_responsive_table_wrapper filter_search_bg_color bg-gradient" >
        <table class="table table-borderless filter_search_table">
          <tr class="filter_search_table_row text-center">
            <th class="" style="width: 100px">Filter By</th>
            <th class="" style="width: 115px">From</th>
            <th class="" style="width: 115px">To</th>
            <th class="" style="width: 100px">Booked by</th>
            <th class="" style="width: 250px">Keyword</th>
            <th class="" style="width: 100px">Company</th>
            <th class="" style="width: 100px">Status</th>
            <th class="" style="width: auto"></th>
            <th class="" style="width: 40px"></th>
            <th class="" style="width: 40px"></th>
            <th class="" style="width: 90px"></th>
          </tr>
          <tr class="filter_search_table_row">
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
                <i class="fa-solid fa-file-excel"></i>
              </button>
            </td>
            <td class="text-center">
              <button type="button" id="cm_vol_report_pdf_btn" class="btn btn-sm border p-0">
                <i class="fa-solid fa-file-pdf"></i>
              </button>
            </td>
            <!-- Load Button -->
            <td class="text-center">
              <button type="" class="btn btn-primary bg-gradient btn-cargoaim w-100 px-1 flex-fill" id="filter_load_data_btn" @click.prevent="all_booking_load_data" :disabled="is_loading">
                <span v-if="!is_loading">
                  <i class="fa-solid fa-arrows-rotate"></i>
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
      <div class="cargoaim_custom_form_wrapper filter_data_table position-relative" id="filter_dataLoad_customize">
        <CircleDivisionLoader loader-key="cargoaim_custom_form_wrapper" />


        <div v-if="isTableVisible">
            <DataTable
                :columns="columns"
                :rows="all_bookings"
                :loading="false"
                :user-page-size="userPageSize"
            />
        </div>
        <!-- <DataTable v-if="all_bookings.length > 0" :columns="columns" :rows="all_bookings" :loading="is_loading" :user-page-size="userData.page_size"/> -->

        <!-- Initial message outside tbody -->
         <div
            v-if="!isTableVisible"
            id="filter_cargoaim_table_message"
            class="text-start text-muted p-4"
        >
            <p v-if="!hasSearched">
                📄 List will be loaded here...!
            </p>

            <p v-else>
                🔍 No records found for the selected filter.
            </p>
        </div>
        <!-- <div v-if="!isTableVisible" id="filter_cargoaim_table_message" class="text-start text-muted p-4">
          <p>📄 List will be loaded here...!</p>
        </div> -->
        
      </div>
    </div>
  </div>
  <!-- .page-container এর ক্লোজিং ট্যাগ -->
  
  
  <!-- Create modal start -->

</template>


<style lang="css" scoped>
  :global(.modal-header:has(.filter-modal-header-title)) {
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

  .bg-gradient {
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    ) !important;
  }

  /* ===================== Card shell (matches reference design) ===================== */

  .filter-content-wrapper .card-header {
    background: linear-gradient(90deg, #f3f0fc 0%, #e6defa 100%) !important;
    border-bottom: 1px solid #c7bdee !important;
    padding: 4px 5px !important;
  }

  .filter-content-wrapper .card-title {
    color: #0072a7 !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    letter-spacing: 0.2px;
  }

  .filter-content-wrapper .new_booking_file_btn {
    font-size: 12px;
    padding: 0px 8px 2px 8px;
    font-weight: 200 !important;
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    ) !important;
  }

  /* ===================== Search filter row (Type/From/To/...) ===================== */

  .filter-content-body {
    flex-grow: 1;
    background-color: #fff;
    padding: 6px;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 10px;
  }
  .filter_search_bg_color {
    background-color: #a3c8e8;
  }
  .filter_search_responsive_table_wrapper {
    border: 2px solid #dddddd;
    border-radius: 5px;
    width: 100%;
    overflow-x: auto;
    padding: 0;
  }

  .filter_search_table {
    margin-bottom: 0rem !important;
  }

  .filter_search_table th,
  .filter_search_table td {
    border-right: 1px dotted #f2f2f2 !important;
  }

  .filter_search_table th {
    font-weight: 100 !important;
    font-size: 11.5px !important;
    padding: 1px !important;
  }

  .filter_search_table td {
    padding: 0px 1px 1px 1px;
  }

  .filter_search_table_row th {
    border: none;
  }

  .filter_search_table .form-control,
  .filter_search_table .form-select {
    height: 25px !important;
    min-height: 25px !important;
    font-size: 11px !important;
    padding: 4px 4px !important;
    line-height: 1.2 !important;
    border: 1px solid #c2c2c2 !important;
    border-radius: 4px !important;
    background-color: #fff !important;
    box-shadow: none !important;
  }

  .filter_search_table button i {
    font-size: 12px;
  }
  .filter_search_table button .spinner-border {
    font-size: 12px;
  }





  /************************ Excel / PDF icon buttons ******************/
  #cm_vol_report_exl_btn,
  #cm_vol_report_pdf_btn {
    width: 25px;
    height: 25px;
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
    margin-bottom: 1px ;
  }
  #cm_vol_report_exl_btn i,
  #cm_vol_report_pdf_btn i{
    font-size: 16px;
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
  .filter_data_table{
    margin-top: 4px;
  }

  #filter_dataLoad_customize {
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }

  #filter_load_data_btn {
    width: auto !important;
    min-width: 70px !important;
    height: 25px !important;
    font-size: 12px !important;
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

  #filter_cargoaim_table_tbody .btn-sm {
    width: 26px;
    height: 26px;
    padding: 0px !important;
    margin: 0px !important;
  }


  :deep(button.data_table_btn) {
    padding: 1px 3px;
    font-size: 12px;
  }



  :deep(.cargoaim_custom_cft_page_sea_air_icon) {
    box-sizing: content-box;
    color: #505050db;
    background: #ffe8a2a6;
    border: 1px solid #ddd;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    padding: 3px;
    display: inline-flex;
  }
  :deep(.cargoaim_custom_cft_page_ie_badge) {
    text-align: center;
    letter-spacing: .3px;
    border-radius: 4px;
    min-width: 34px;
    padding: 1px 3px;
    font-size: 11px;
    font-weight: 500;
    display: inline-block;
  }

  :deep(.cargoaim_custom_cft_page_ie_badge_exp)
  {
    color: #fff;
    background-color: #59bb8b;
  }
  :deep(.cargoaim_custom_cft_page_ie_badge_imp)
  {
    color: #fff;
    background-color: #4a8bc2d9;
  }


  @media screen and (max-width: 1366px) {
    .filter_data_table{
      margin-top: 2.5px;
    }
    .filter-content-body {
      padding: 4px;
    }
    :deep(.cargoaim_custom_cft_page_sea_air_icon) {
      width: 15px;
      height: 15px;
    }
  }
</style>
