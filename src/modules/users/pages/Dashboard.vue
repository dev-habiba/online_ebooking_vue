<script setup>
    import { ref, computed } from "vue";
    import { useRouter } from "vue-router";
    import { useAuth } from '@modules/auth/composable/useAuth';

    import BaseModal from '@/shared/components/modal/BaseModal.vue';
    import UsersModal from '@/modules/users/components/modal/UsersMoadal.vue';

    import { useLoader } from '@/shared/composables/useLoader.js'
    import CircleDivisionLoader from '@/shared/components/loaders/CircleDivisionLoader.vue';
    import SquareDivisionLoader from '@/shared/components/loaders/SquareDivisionLoader.vue';

    const { is_loading } = useAuth();

    const {
      showModernLoader,
      hideModernLoader,
      showCircleLoader,
      hideCircleLoader,
      showSquareLoader,
      hideSquareLoader
    } = useLoader();
    
    const showTestModal = ref(false)
    const isTableVisible = ref(false)
    const tableData = ref([])
    const selectedIds = ref([])

    const selectAll = computed({
      get: () => {
        return tableData.value.length > 0 && selectedIds.value.length === tableData.value.length;
      },
      set: (value) => {
        if (value) {
          selectedIds.value = tableData.value.map(item => item.id);
        } else {
          selectedIds.value = [];
        }
      }
    });

    const filingLoadData = () => {
      isTableVisible.value = false;
      is_loading.value = true;

      showCircleLoader('cargoaim_custom_form_wrapper');
      setTimeout(() => {
        hideCircleLoader('cargoaim_custom_form_wrapper');
        isTableVisible.value = true
        is_loading.value = false;
      
        tableData.value = [
          {
            id: 1,
            company_name: "Administrator",
            company_id: "Cargoaim",
            user_name: "admin",
            user_id: "online.admin",
            contact_no: "01564552157",
            email: "info@cargoaim.com",
            address: "Dhaka",
            admin: "Yes",
            status: "Active"
          },
          {
            id: 2,
            company_name: "Erica Daniel",
            company_id: "Cargoaim",
            user_name: "Mercedes Warner",
            user_id: "zuvuhli",
            contact_no: "65312435",
            email: "zyzew@mailinator.com",
            address: "Ut qui quo facilis s",
            admin: "No",
            status: "Inactive"
          },
          {
            id: 3,
            company_name: "Chastity Sosa",
            company_id: "Cargoaim",
            user_name: "Illana Brock",
            user_id: "kaqago",
            contact_no: "01264327535",
            email: "jelyhig@mailinator.com",
            address: "Earum dolorem quia t",
            admin: "No",
            status: "Inactive"
          },
          {
            id: 4,
            company_name: "Stacey Floyd",
            company_id: "Cargoaim",
            user_name: "Keegan Christensen",
            user_id: "cywocyd",
            contact_no: "Reprehenderit veniam",
            email: "zeseg@mailinator.com",
            address: "Vitae molestiae erro",
            admin: "No",
            status: "Inactive"
          },
          {
            id: 5,
            company_name: "Macon Sanford",
            company_id: "Cargoaim",
            user_name: "Denton Levine",
            user_id: "guwyzag",
            contact_no: "025184523",
            email: "telunin@mailinator.com",
            address: "Ut tenetur animi de",
            admin: "No",
            status: "Pending"
          }
        ];
      }, 2000);
    }

</script>

<template>
  <!-- ============================================================== -->
  <!-- Start Page Content here -->
  <!-- ============================================================== -->
  <div class="filing_content">
    <div class="card filing-content-wrapper">
      <div class="card-header bg-gradient d-flex justify-content-between align-items-center">
        <h4 class="card-title m-0"><i class="fa-solid fa-users"></i>&nbsp;User Admin</h4>

        <button type="button" class="btn btn-cargoaim btn-primary bg-gradient create_new_btn" id="createNew" @click="showTestModal = true">
          <i class="fa-solid fa-plus"></i>
          Add New
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
        <form id="loadform" name="form" class="form-horizontal" method="POST" action="#" enctype="multipart/form-data" >
          <input type="hidden" name="_token" value="cSBX5Uj4lrE3emrO7loWLSSziypI4veDRBkRQ2Ou" autocomplete="off" />
          <div class="table-responsive filing_search_responsive_table_wrapper filing_search_bg_color bg-gradient" >
            <table class="table table-borderless filing_search_table">
              <tr class="filing_search_table_row text-center">
                <th class="" style="width: 100px">Type</th>
                <th class="" style="width: 115px">From</th>
                <th class="" style="width: 115px">To</th>
                <th class="" style="width: 250px">Keyword</th>
                <th class="" style="width: 100px">Status</th>
                <th class="" style="width: auto"></th>
                <th class="" style="width: 40px"></th>
                <th class="" style="width: 40px"></th>
                <th class="" style="width: 100px"></th>
              </tr>
              <tr class="filing_search_table_row">
                <td>
                  <select name="date_type" id="date_type" class="form-select">
                    <option value="entry_date" selected>Entry Date</option>
                  </select>
                </td>
                <td>
                  <input type="date" name="date_from" id="date_from" class="form-control" autocomplete="off" data-date-format="d-M-Y"/>
                </td>
                <td>
                  <input type="date" name="date_to" id="date_to" class="form-control" autocomplete="off" data-date-format="d-M-Y"/>
                </td>
                <td>
                  <input type="text" name="hbl_mbl" id="hbl_mbl" class="form-control uppercase-only" placeholder="🔍 HBL/MBL/PORT/VSL/VOY" autocomplete="off" />
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
                  <button type="" class="btn btn-primary bg-gradient btn-cargoaim w-100 px-1 flex-fill" id="filing_load_data_btn" @click.prevent="filingLoadData" :disabled="is_loading">
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
        </form>

        


        <div class="cargoaim_custom_form_wrapper mt-2 position-relative" id="filing_dataLoad_customize">
          <CircleDivisionLoader loader-key="cargoaim_custom_form_wrapper" />

          <table v-show="isTableVisible" id="filing_cargoaim_table" class="table table-bordered table-striped nowrap table-hover mb-0">
            <thead :style="{ display: isTableVisible ? 'table-header-group' : 'none' }" id="filing_cargoaim_table_thead">
              <tr class="text-center">
                <th>SN</th>
                <th>Company Nane</th>
                <th>Company ID</th>
                <th>User Name</th>
                <th>User ID</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Address</th>
                <th>Admin</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="filing_cargoaim_table_tbody">
               <!-- initially empty -->
              <tr v-for="(item, index) in tableData" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.company_name }}</td>
                <td>{{ item.company_id }}</td>
                <td>{{ item.user_name }}</td>
                <td>{{ item.user_id }}</td>
                <td>{{ item.contact_no }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.admin }}</td>
                <td>{{ item.status }}</td>
                <td class="text-center">
                  <button type="button" class="btn btn-sm btn-outline-info me-1" :data-id="item.id">
                    <i class="fas fa-edit"></i>
                  </button>

                  <button type="button" class="btn btn-sm btn-outline-danger" :data-id="item.id">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

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



.filing_content {
  height: 90vh !important;
}

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
  /* margin: 0px !important; */
}





</style>
