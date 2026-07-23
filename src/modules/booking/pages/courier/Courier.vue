<script setup>
    import { ref, watch, computed, onMounted } from 'vue';
    import apiClient from "@/core/apiClient";
    import {userData} from "@/shared/utils/userInfo.js";
    import { useAuthStore } from '@/modules/auth/store/authStore'
    import { useToast } from "vue-toastification"; // Toast call

    import { vUppercase, vNumberDecimal, vNumberOnly } from '@/modules/booking/composables/bookingMain.js';

    import BaseModal from '@/shared/components/modal/BaseModal.vue';
    import CustListModal from '@/modules/booking/components/modal/CustomerListModal.vue';
    import BaseSuggestion from '@/shared/components/suggestion/BaseSuggestion.vue';

    const toast = useToast();

    const authStore = useAuthStore()
    const user = authStore.getUser

    console.log(user);


    const showCustModal = ref(false)

    const pol_pod_list = ref([]);
    const countries = ref([]);
    const shipperCities = ref([]);
    const consigneeCities = ref([]);
    const thirdPartyCities = ref([]);
    const packageList = ref([]);
    const currencyList = ref([]);
    const selectedPolCode = ref(null);
    const selectedPodCode = ref(null);

    const form = ref({
        soft_cust_id: "DEMO",
        partition_id: "1004",
        language_id: "EN",
        user_id: user?.userId ?? '',
        ebkg_bkg_row_id: "",
        ebkg_creator_customer_code: user?.company_id ?? '',

        ebkg_bkg_no: "",
        ebkg_hbl_no: "",
        ebkg_mbl_no: "",
        ebkg_b_unit: "BD0001",

        // Shipment Profile
        shipment_profile_to_save: "",
        ebkg_imp_exp: "1",
        ebkg_sea_air_land: "8",
        ebkg_pol_country: "", //pol
        ebkg_pol_code: "", //pol
        ebkg_pod_country: "",//pod
        ebkg_pod_code: "",//pod

        // Shipper
        ebkg_shipper_code: "BD0001",
        ebkg_shipper_name: "",
        ebkg_pay_party_party_type: "Customer",
        ebkg_shipper_address: "",
        ebkg_shipper_zip: "", //postal code
        ebkg_shipper_bin: "",
        ebkg_shipper_country: "",
        ebkg_shipper_state: "",
        ebkg_shipper_city: "",
        ebkg_shipper_pic: "",// contract name
        ebkg_shipper_mobile: "",
        ebkg_shipper_email: "",
        ebkg_shipper_carrier: "",

        // Consignee
        ebkg_consignee_code: "BD0001",
        ebkg_consignee_name: "",
        ebkg_consignee_party_type: "Customer",
        ebkg_consignee_address: "",
        ebkg_consignee_zip: "",
        ebkg_consignee_bin: "",
        ebkg_consignee_country: "",
        ebkg_consignee_state: "",
        ebkg_consignee_city: "",
        ebkg_consignee_pic: "",
        ebkg_consignee_mobile: "",
        ebkg_consignee_email: "",
        ebkg_consignee_carrier: "",

        // Third Party
        ebkg_pay_party_code: "BD0001",
        ebkg_pay_party_name: "",
        ebkg_pay_party_party_type: "Customer",
        ebkg_pay_party_address: "",
        ebkg_pay_party_zip: "",
        ebkg_pay_party_bin: "",
        ebkg_pay_party_country: "",
        ebkg_pay_party_state: "",
        ebkg_pay_party_city: "",
        ebkg_pay_party_pic: "",
        ebkg_pay_party_mobile: "",
        ebkg_pay_party_email: "",
        ebkg_pay_party_carrier: "",

        // Dangerous Goods
        ebkg_dg_yes_no: "",
        ebkg_dg_class: "",
        ebkg_dg_un_no: "",
        ebkg_dg_pkg_group: "",
        ebkg_dg_flash_poin: "",
        ebkg_dg_files: [],

        // Service Details
        ebkg_ervice_date: "",
        ebkg_service_type: "",
        ebkg_service_signature: "",

        // Additional Options
        web_cms_shipment_ref: "",
        ebkg_po_no: "",
        web_cms_invoice_no: "",
        web_cms_invoice_upload_file: [],
        ebkg_department_no: "",
        ebkg_doc_type: "",

        // Pickup / Drop-off
        ebkg_picup_drop_off_type: "",
        ebkg_picup_drop_off_date: "",
        ebkg_earliest_possible_time: "",
        ebkg_latest_possible_time: "",
        ebkg_picup_instructions: "",
        ebkg_picup_drop_off_name: "",
        ebkg_picup_drop_off_phone: "",
        ebkg_picup_drop_off_email: "",
        ebkg_picup_drop_off_address: "",

        ebkg_email_cc: "",
        ebkg_main_remarks: "",

        // Billing
        ebkg_billing_type: "1",
        ebkg_account_no: "",
        
        ebkg_incoterm: "",
        // Save Shipment btn 
        action: "ebkg_save_update",


        // Packages field...
        package_data: [
            {
                ebkg_pkg_row_id: "",
                ebkg_pkg_pkg_qty: "",
                ebkg_pkg_pkg_type: "",
                ebkg_pkg_weight: "",
                ebkg_pkg_weight_type: "", //kg
                ebkg_pkg_length: "",
                ebkg_pkg_width: "",
                ebkg_pkg_height: "",
                ebkg_pkg_chargeable_weight: "",
                ebkg_pkg_dimension_type: "", //cm
                ebkg_pkg_remarks: "",
            }
        ],

        // Items field...
        item_data: [
            {
                ebkg_item_row_id: "",
                ebkg_item_name: "",
                ebkg_item_qty: "",
                ebkg_item_customs_value: "", //kg
                ebkg_item_currency: "",
                ebkg_item_hs_code: "",
                ebkg_item_weight: "",
                ebkg_item_weight_type: "",
                ebkg_item_made_in: "", //cm
                ebkg_item_remarks: "",
            }
        ]
    });



    const saveBooking = async () => {
        try {
            const payload = {
                main_data: {
                    ...form.value,
                    package_data: undefined,
                    item_data: undefined,
                },

                package_data: rows.value.map(row => ({
                    ebkg_pkg_row_id: row.ebkg_pkg_row_id || "",
                    ebkg_pkg_pkg_qty: row.ebkg_pkg_pkg_qty,
                    ebkg_pkg_pkg_type: row.ebkg_pkg_pkg_type,
                    ebkg_pkg_weight: row.ebkg_pkg_weight,
                    ebkg_pkg_weight_type: row.ebkg_pkg_weight_type,
                    ebkg_pkg_length: row.ebkg_pkg_length,
                    ebkg_pkg_width: row.ebkg_pkg_width,
                    ebkg_pkg_height: row.ebkg_pkg_height,
                    ebkg_pkg_dimension_type: row.ebkg_pkg_dimension_type,
                    ebkg_pkg_chargeable_weight: row.ebkg_pkg_chargeable_weight,
                    ebkg_pkg_remarks: row.ebkg_pkg_remarks,
                })),

                item_data: itemRows.value.map(row => ({
                    ebkg_item_row_id: row.ebkg_item_row_id || "",
                    ebkg_item_name: row.ebkg_item_name,
                    ebkg_item_qty: row.ebkg_item_qty,
                    ebkg_item_customs_value: row.ebkg_item_customs_value,
                    ebkg_item_currency: row.ebkg_item_currency,
                    ebkg_item_hs_code: row.ebkg_item_hs_code,
                    ebkg_item_weight: row.ebkg_item_weight,
                    ebkg_item_weight_type: row.ebkg_item_weight_type,
                    ebkg_item_made_in: row.ebkg_item_made_in,
                    ebkg_item_remarks: row.ebkg_item_remarks,
                })),
            };

            console.log(payload);

            const { data } = await apiClient.post(
                "/online/ebooking/new_ebkg_create_save_update_json.php",
                payload
            );

            
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    };
    

    /**************** Location list api json (POL/POD) - Start ****************/
    const get_pol_pod_list = async (locationCode, target) => {
        if (!target) {
            console.warn("Target reference is missing!");
            return;
        }

        try {
            console.log("Location:", locationCode);
            if (!locationCode) {
                target.value = [];
                return;
            }
            
            const payload = {
                soft_cust_id: userData.soft_cust_id,
                partition_id: userData.partition_id,
                language_id: userData.language_id,
                user_id: userData.user_id,
                country_code: "",
                city_name: locationCode
            };

            const { data } = await apiClient.post(
                "/common/city_location_list_json.php",
                payload
            );

            console.log("API Response:", data);

            // সেফটি চেক (Optional Chaining '?.' ব্যবহার করে): যাতে রেসপন্স ফরম্যাট ভুল হলে ক্র্যাশ না করে
            if (data && data.header_data?.success) {
                target.value = data.details_data || [];
            } else {
                target.value = [];
            }         

        } catch (error) {
            console.error("Location List Error:", error);
            // target চেক করে ভ্যালু অ্যাসাইন করা
            if (target) {
                target.value = [];
            }
        }
    };

    watch(
        () => form.value.ebkg_pol_country,
        (newlocation) => {
            console.log("POL and POD:", newlocation);
            get_pol_pod_list(newlocation, pol_pod_list);
        }
    );
    watch(
        () => form.value.ebkg_pod_country,
        (newlocation) => {
            console.log("POL and POD:", newlocation);
            get_pol_pod_list(newlocation, pol_pod_list);
        }
    );

    // Suggestion Table Header 
    const tableHeaders = ["SN", "Code", "Country", "Location Name", "ZIP", "State"];

    // Suggestion Table Body 
    const dataColumns = ["location_code", "country_code", "location_name", "zip_code", "state_code"];

    // Hidden code select data valu pol
    const handlePolCodeSelect = (item) => {
        selectedPolCode.value = item;
        form.value.ebkg_pol_code = item.location_code; 
        console.log("Selected POL code:", item);
    };

    // Hidden code select data valu pol
    const handlePodCodeSelect = (item) => {
        selectedPodCode.value = item;
        form.value.ebkg_pod_code = item.location_code; 
        console.log("Selected POD code:", item);
    };
    /**************** Location list api json (POL/POD) - End ********************/



    /**************** Countries list api json - Start ********************/
    const getCountries = async () => {
        try {
            const payload = {
                soft_cust_id: userData.soft_cust_id,
                partition_id: userData.partition_id,
                language_id: userData.language_id,
                user_id: userData.user_id,
                country_name_or_code: ""
            };

            const { data } = await apiClient.post(
                "/common/country_list_json.php",
                payload
            );

            if (data.header_data.success) {
                countries.value = data.details_data;
            }

            // console.log(data);

        } catch (error) {
            console.error("Country List Error:", error);
        }
    };
    /**************** Countries list api json - End ********************/



    /**************** Container Package list api json - Start ********************/
    const getPackageList = async () => {
        try {
            const payload = {
                soft_cust_id: userData.soft_cust_id,
                partition_id: userData.partition_id,
                language_id: userData.language_id,
                user_id: userData.user_id,
                package_name_code: ""
            };

            const { data } = await apiClient.post(
                "/common/package_list_json.php",
                payload
            );

            if (data.header_data.success) {
                packageList.value = data.details_data;
            }

            // console.log(data);

        } catch (error) {
            console.error("Package List Error:", error);
        }
    };
    /**************** Container Package list api json - End ********************/



    /**************** Currency list api json - Start ********************/
    const getcurrencyList = async () => {
        try {
            const payload = {
                soft_cust_id: userData.soft_cust_id,
                partition_id: userData.partition_id,
                language_id: userData.language_id,
                user_id: userData.user_id,
            };

            const { data } = await apiClient.post(
                "/common/currency_list_json.php",
                payload
            );

            if (data.header_data.success) {
                currencyList.value = data.details_data;
            }

            // console.log(data);

        } catch (error) {
            console.error("Package List Error:", error);
        }
    };
    /**************** Currency list api json - End ********************/
    
    /**************** Component Mounted Hook - Start ****************/
    onMounted(() => {
        getCountries();
        getPackageList();
        getcurrencyList();
    });
    /**************** Component Mounted Hook - End ****************/



    /**************** Load city list based on selected country - Start ****************/
    const getCities = async (countryCode, target) => {
        try {
            console.log("Country:", countryCode);
            if (!countryCode) {
                target.value = [];
                return;
            }

            const payload = {
                soft_cust_id: userData.soft_cust_id,
                partition_id: userData.partition_id,
                language_id: userData.language_id,
                user_id: userData.user_id,
                country_code: countryCode,
                city_name: ""
            };

            const { data } = await apiClient.post(
                "/common/city_location_list_json.php",
                payload
            );

            target.value = data.header_data.success ? data.details_data : [];
        } catch (error) {
            console.error("City List Error:", error);
            target.value = [];
        }
    };

    //Shipper Cities
    watch(
        () => form.value.ebkg_shipper_country,
        (newCountry) => {
            console.log("Shipper:", newCountry);
            getCities(newCountry, shipperCities);
        }
    );

    //Consignee Cities
    watch(
        () => form.value.ebkg_consignee_country,
        (newCountry) => {
            console.log("Consignee:", newCountry);
            getCities(newCountry, consigneeCities);
        }
    );

    //Third Party Cities
    watch(
        () => form.value.ebkg_pay_party_country,
        (newCountry) => {
            console.log("Third Party:", newCountry);
            getCities(newCountry, thirdPartyCities);
        }
    );
    /**************** Load city list based on selected country - End ****************/






    //---- Handle DG Toggle Change Start -----//

    const handleDGToggle = (event) => {
        if (!form.value.ebkg_dg_yes_no) {
            form.value.ebkg_dg_class = "";
            form.value.ebkg_dg_un_no = "";
            form.value.ebkg_dg_pkg_group = "";
            form.value.ebkg_dg_flash_poin = "";
            form.value.ebkg_dg_files = [];

            // File input clear
            event.target
                .closest(".dangerous-good-card")
                .querySelector(".file-input").value = "";
        }
    };

    // Handle DG Upload File
    const handleDGFileChange = (event) => {
        form.value.ebkg_dg_files = Array.from(event.target.files);
    };
    //---- Handle DG Toggle Change Start -----//


    //---- Handle Invoice Upload File Start -----//
    const handleInvoiceFileChange = (event) => {
        form.value.web_cms_invoice_upload_file = Array.from(event.target.files);
    };
    //---- Handle Invoice Upload File End -----//






    /************** Package row add delete (footer total count) Start **********/
    const rows = ref([
    {
        ebkg_pkg_pkg_qty: 1,
        ebkg_pkg_pkg_type: 'CT',
        ebkg_pkg_weight: '',
        ebkg_pkg_weight_type: 'KG',
        ebkg_pkg_length: '',
        ebkg_pkg_width: '',
        ebkg_pkg_height: '',
        ebkg_pkg_chargeable_weight: '',
        ebkg_pkg_dimension_type: 'CM',
        ebkg_pkg_remarks: ''
    }
    ]);

    const addRowPKGbtn = () => {
        rows.value.push({
            ebkg_pkg_pkg_qty: 1,
            ebkg_pkg_pkg_type: 'CT',
            ebkg_pkg_weight: '',
            ebkg_pkg_weight_type: 'KG',
            ebkg_pkg_length: '',
            ebkg_pkg_width: '',
            ebkg_pkg_height: '',
            ebkg_pkg_chargeable_weight: '',
            ebkg_pkg_dimension_type: 'CM',
            ebkg_pkg_remarks: ''
        });
    };

    const deleteRow = (index) => {
    if (rows.value.length > 1) {
        rows.value.splice(index, 1);
    } else {
        toast.error("There must be at least one row!", {position: "top-right", timeout: 3000,});
    }
    };

    const calculateChargeableWeight = (row) => {
        if (row.ebkg_pkg_length && row.ebkg_pkg_width && row.ebkg_pkg_height && row.ebkg_pkg_pkg_qty) {
            // Air Freight Standard Volumetric formula: (L * W * H) / 6000 * Qty
            const volWeight = ((parseFloat(row.ebkg_pkg_length) * parseFloat(row.ebkg_pkg_width) * parseFloat(row.ebkg_pkg_height)) / 6000) * parseInt(row.ebkg_pkg_pkg_qty);
            const grossWeight = parseFloat(row.ebkg_pkg_weight) || 0;
            row.ebkg_pkg_chargeable_weight = Math.max(grossWeight, volWeight).toFixed(3);
        } else {
            row.ebkg_pkg_chargeable_weight = (parseFloat(row.ebkg_pkg_weight) || 0).toFixed(3);
        }
    };

    const totalQty = computed(() => {
    return rows.value.reduce((sum, row) => sum + (parseInt(row.ebkg_pkg_pkg_qty) || 0), 0);
    });

    const totalWeight = computed(() => {
        return rows.value.reduce((sum, row) => sum + (parseFloat(row.ebkg_pkg_weight) || 0), 0).toFixed(3);
    });

    const totalChargeableWeight = computed(() => {
        return rows.value.reduce((sum, row) => sum + (parseFloat(row.ebkg_pkg_chargeable_weight) || 0), 0).toFixed(3);
    });
    /************** Package row add delete (footer total count) End **********/

    
   



    /************** Items row add delete (footer total count) Start **********/
    const itemRows = ref([
        {
            ebkg_item_qty: 1,
            ebkg_item_name: '',
            ebkg_item_customs_value: '',
            ebkg_item_currency: '',
            ebkg_item_hs_code: '',
            ebkg_item_weight: '',
            ebkg_item_weight_type: 'KG',
            ebkg_item_made_in: 'CM',
            ebkg_item_remarks: ''
        }
    ]);

    const addItemRow = () => {
        itemRows.value.push({
            ebkg_item_qty: 1,
            ebkg_item_name: '',
            ebkg_item_customs_value: '',
            ebkg_item_currency: '',
            ebkg_item_hs_code: '',
            ebkg_item_weight: '',
            ebkg_item_weight_type: 'KG',
            ebkg_item_made_in: 'CM',
            ebkg_item_remarks: ''
        });
    };

    const deleteItemRow = (index) => {
        if (itemRows.value.length > 1) {
            itemRows.value.splice(index, 1);
        } else {
            toast.error("There must be at least one row!", {position: "top-right", timeout: 3000,});
        }
    };

    const totalItemQty = computed(() => {
        return itemRows.value.reduce((sum, row) => sum + (parseInt(row.ebkg_item_qty) || 0), 0);
    });

    const totalItemValue = computed(() => {
        return itemRows.value.reduce((sum, row) => sum + (parseInt(row.ebkg_item_customs_value) || 0), 0);
    });

    const totalItemWeight = computed(() => {
        return itemRows.value.reduce((sum, row) => sum + (parseFloat(row.ebkg_item_weight) || 0), 0).toFixed(3);
    });

    /************** Items row add delete (footer total count) End **********/






    /******************* CC Email Start***************/
    const cc_emails = ref([]);
    const cc_inputEmail = ref("");
    const cc_emailInput = ref(null);

    const ebkg_email_cc = computed(() => cc_emails.value.join(","));

    const ccEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const ccAddEmail = () => {
        const email = cc_inputEmail.value.trim();

        if (!email) return;

        if (!ccEmailRegex.test(email)) {
            alert("Invalid email address");
            return;
        }

        if (!cc_emails.value.includes(email)) {
            cc_emails.value.push(email);
        }

        cc_inputEmail.value = "";
    };

    const ccRemoveEmail = (index) => {
        cc_emails.value.splice(index, 1);
    };

    const ccFocusInput = () => {
        cc_emailInput.value?.focus();
    };
    /******************* CC Email End***************/







</script>

<template>
    <div class="card booking_card">
        <div class="card-header border-bottom dot_border bg-gradient d-flex align-items-center">
            <h5 class="header-title"> <i class="fa-solid fa-truck-fast"></i> COURIER BOOKINGS </h5>
        </div>
        
        <div class="card-body">
            <form id="courier_booking_form" method="POST" action="http://cargoaimonline.test/my_bookings/courier" enctype="multipart/form-data" autocomplete="off">
                <input type="hidden" name="_token" value="FErwVRUrbFl22OS0oq9fbWUk724YMH3aISxG4pyG" autocomplete="off">
                <div class="table-responsive box-border couriar_table">
                    <table class="table table-borderless">
                        <tbody>
                            <!--- Others Table --->
                            <tr class="border-bootom-dotted">
                                <td colspan="5" class="">
                                    <div class="card card_children shadow-sm shipment-profile-card mb-3">
                                        <div class="card-header bg-light bg-gradient py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-house"></i> </h5>
                                            <h5 class="hbl_show mb-0"> </h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 20%;">
                                                            <input type="hidden" v-model="form.ebkg_bkg_row_id">

                                                            <label class="form-label"> Load Shipment Profile : </label>
                                                            <select v-model="form.shipment_profile_to_save_list" class="form-select form-select-sm" autocomplete="off">
                                                                <option value=""></option>
                                                                <option value="FILE">FILE</option> 
                                                                <option value="TEST">TEST</option>
                                                                <option value="TEST 2">TEST 2</option>
                                                                <option value="TEST 3">TEST 3</option>
                                                            </select>
                                                        </td>
                                                        <td style="width: 20%;">
                                                            <label class="form-label"> Export/Import : </label>
                                                            <select v-model="form.ebkg_imp_exp" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="1"> Outbound Shipment </option>
                                                                <option value="2"> Inbound Shipment </option>
                                                            </select>
                                                        </td>
                                                        <td style="width: 22%;">
                                                            <label for="inputEmail4" class="form-label"> Ship From :</label>
                                                            <div class="position-relative">
                                                                <input type="hidden" v-model="form.ebkg_pol_code" class="uppercase-only">

                                                                <div class="">
                                                                    <i class="fa fa-search suggestion-search-icon"></i>
                                                                    <input type="search" v-model="form.ebkg_pol_country" v-uppercase class="suggestion-search-input form-control form-control-sm" placeholder="Search category…">
                                                                </div>
                                                                
                                                                <BaseSuggestion 
                                                                    v-model="form.ebkg_pol_country"
                                                                    :dataList="pol_pod_list"
                                                                    :headers="tableHeaders"
                                                                    :columns="dataColumns"
                                                                    :minChars="3"
                                                                    displayKey="location_name"
                                                                    width="550px"
                                                                    left="0"
                                                                    right="auto"
                                                                    @select="handlePolCodeSelect"
                                                                />
                                                               
                                                            </div>
                                                        </td>
                                                        <td style="width: 22%;">
                                                            <label for="inputPassword4" class="form-label"> Deliver / Ship To :</label>

                                                            <div class="position-relative">
                                                                <input type="hidden" v-model="form.ebkg_pod_code" class="uppercase-only">

                                                                <div class="">
                                                                    <i class="fa fa-search suggestion-search-icon"></i>
                                                                    <input type="search" v-model="form.ebkg_pod_country" v-uppercase class="suggestion-search-input form-control form-control-sm" placeholder="Search category…">
                                                                </div>
                                                                
                                                                <BaseSuggestion 
                                                                    v-model="form.ebkg_pod_country"
                                                                    :dataList="pol_pod_list"
                                                                    :headers="tableHeaders"
                                                                    :columns="dataColumns"
                                                                    :minChars="3"
                                                                    displayKey="location_name"
                                                                    width="550px"
                                                                    left="auto"
                                                                    right="0"
                                                                    @select="handlePodCodeSelect"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td style="width: 16%;">
                                                            <label for="" class="form-label"> PP/CC :</label>

                                                            <select  v-model="form.ebkg_incoterm" class="form-select form-select-sm" autocomplete="off">
                                                                <option value=""></option>
                                                                <option value="CFR">CFR - Cost and Freight (Prepaid)</option>
                                                                <option value="CIF">CIF - Cost Insurance and Freight (Prepaid)</option>
                                                                <option value="CIP">CIP - Carriage and Insurance Paid To (Prepaid)</option>
                                                                <option value="CNF">CNF - Cost and Freight (Prepaid)</option>
                                                                <option value="CPT">CPT - Carriage Paid To (Prepaid)</option>
                                                                <option value="DAP">DAP - Delivered at Place (Prepaid)</option>
                                                                <option value="DAT">DAT - Delivered at Terminal (Prepaid)</option>
                                                                <option value="DDP">DDP - Delivered Duty Paid (Prepaid)</option>
                                                                <option value="DPU">DPU - Delivered at Place Unloaded (Prepaid)</option>
                                                                <option value="EXW">EXW - Ex Works (Collect)</option>
                                                                <option value="FAS">FAS - Free Alongside Ship (Collect)</option>
                                                                <option value="FCA">FCA - Free Carrier (Collect)</option><option value="FOB">FOB - Free On Board (Collect)</option>          
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <!--- Shipper, Consignee anf 3rd Party Contact Details Table--->
                            <tr class="border-bootom-dotted">
                                <!--- Shipper Contact Details Table--->
                                <td style="width: 38%">
                                    <div class="card card_children shadow-sm shipper-card mb-3">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0">
                                                <i class="fa-solid fa-user"></i>
                                                Shipper Contact Details
                                            </h5>
                                            <button type="button" id="save_shipper_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div> 

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 35%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Company Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="d-flex gap-1 align-items-center">
                                                                <input type="hidden" v-model="form.ebkg_shipper_code">

                                                                <input type="text" v-model="form.ebkg_shipper_name" v-uppercase class="form-control form-control-sm" placeholder="Company Name">

                                                                <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="shipper_list_id" @click="showCustModal = true">
                                                                    <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                                </button>

                                                                <input type="hidden" v-model="form.ebkg_pay_party_party_type" v-uppercase>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Address</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <textarea v-model="form.ebkg_shipper_address" v-uppercase cols="30" rows="1" class="form-control form-control-sm" placeholder="Address" autocomplete="off"></textarea>
                                                        </td>                                                            
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Postal Code</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_shipper_zip" v-uppercase class="form-control form-control-sm" placeholder="Postal Code" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Country/Territory</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <select class="form-select form-select-sm" v-model="form.ebkg_shipper_country">
                                                                <option value="">Select Country</option>

                                                                <option v-for="country in countries" :key="country.country_code" :value="country.country_code">
                                                                    {{ country.country_code }} - {{ country.country_name }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>State.</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_shipper_state" v-uppercase class="form-control form-control-sm" placeholder="State" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>City</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <select v-model="form.ebkg_shipper_city" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected=""></option>

                                                                <option v-for="city in shipperCities" :key="city.location_code" :value="city.location_code">
                                                                    {{ city.location_name }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>BIN/TAX</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_shipper_bin" v-uppercase class="form-control form-control-sm" placeholder="BIN/TAX" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Contract Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_shipper_pic" v-uppercase class="form-control form-control-sm" placeholder="Contract Name" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Phone Number</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_shipper_mobile" v-uppercase class="form-control form-control-sm" placeholder="Phone Number" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Email</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                            <td>
                                                            <input type="email" v-model="form.ebkg_shipper_email" class="form-control form-control-sm" placeholder="Email" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Carrier</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                            <td>
                                                            <input type="text" v-model="form.ebkg_shipper_carrier" v-uppercase class="form-control form-control-sm" placeholder="Carrier" autocomplete="off">
                                                        </td>
                                                    </tr>
                                            </tbody></table>
                                        </div>
                                    </div>
                                </td>

                                <td style="width: 1%;"></td>

                                <!--- Consignee Contact Details Table--->
                                <td style="width: 30.5%">
                                    <div class="card card_children shadow-sm consinee-card mb-3">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0">
                                                <i class="fa-solid fa-user"></i>
                                                Consignee Contact Details
                                            </h5>
                                            <button type="button" id="save_consignee_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex gap-1 align-items-center">
                                                                <input type="hidden" v-model="form.ebkg_consignee_code" v-uppercase>
                                                            
                                                                <input type="text" v-model="form.ebkg_consignee_name" v-uppercase class="form-control form-control-sm" placeholder="Company Name" autocomplete="off">

                                                                <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="consignee_list_id" @click="showCustModal = true">
                                                                    <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                                </button>

                                                                <input type="hidden" v-model="form.ebkg_consignee_party_type" v-uppercase>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <textarea v-model="form.ebkg_consignee_address" v-uppercase cols="30" rows="1" class="form-control form-control-sm" placeholder="Address" autocomplete="off"></textarea>
                                                        </td>                                                            
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_consignee_zip" v-uppercase class="form-control form-control-sm" placeholder="Postal Code" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <select class="form-select form-select-sm" v-model="form.ebkg_consignee_country">
                                                                <option value="">Select Country</option>
                                                                <option v-for="country in countries" :key="country.country_code" :value="country.country_code">
                                                                    {{ country.country_code }} - {{ country.country_name }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_consignee_state" v-uppercase class="form-control form-control-sm" placeholder="State TAX ID/I.E." autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <select v-model="form.ebkg_consignee_city" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected=""></option>

                                                                <option v-for="city in consigneeCities" :key="city.location_code" :value="city.location_code">
                                                                    {{ city.location_name }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_consignee_bin" v-uppercase class="form-control form-control-sm" placeholder="BIN/TAX" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_consignee_pic" v-uppercase class="form-control form-control-sm" placeholder="Contract Name" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_consignee_mobile" v-uppercase class="form-control form-control-sm" placeholder="Phone Number" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="email" v-model="form.ebkg_consignee_email" class="form-control form-control-sm" placeholder="Email" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_consignee_carrier" v-uppercase class="form-control form-control-sm" placeholder="Carrier" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>

                                <td style="width: 1%;"></td>

                                <!--- 3rd Party Contact Details Table--->
                                <td style="width: 30.5%">
                                    <div class="card card_children shadow-sm consinee-card mb-3">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0">
                                                <i class="fa-solid fa-user"></i>
                                                Third Party Contact Details
                                            </h5>
                                            <button type="button" id="save_consignee_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex gap-1 align-items-center">
                                                                <input type="hidden" v-model="form.ebkg_pay_party_code" v-uppercase>
                                                            
                                                                <input type="text" v-model="form.ebkg_pay_party_name" v-uppercase class="form-control form-control-sm" placeholder="Company Name" autocomplete="off">

                                                                <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="third_party_list_id" @click="showCustModal = true">
                                                                    <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                                </button>

                                                                <input type="hidden" v-model="form.ebkg_pay_party_party_type" v-uppercase>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <textarea v-model="form.ebkg_pay_party_address" v-uppercase cols="30" rows="1" class="form-control form-control-sm" placeholder="Address" autocomplete="off"></textarea>
                                                        </td>                                                            
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_pay_party_zip" v-uppercase class="form-control form-control-sm" placeholder="Postal Code" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <select class="form-select form-select-sm" v-model="form.ebkg_pay_party_country">
                                                                <option value="">Select Country</option>
                                                                <option v-for="country in countries" :key="country.country_code" :value="country.country_code">
                                                                    {{ country.country_code }} - {{ country.country_name }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_pay_party_state" v-uppercase class="form-control form-control-sm" placeholder="State TAX ID/I.E." autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <select v-model="form.ebkg_pay_party_city" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected=""></option>

                                                                <option v-for="city in thirdPartyCities" :key="city.location_code" :value="city.location_code">
                                                                    {{ city.location_name }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_pay_party_bin" v-uppercase class="form-control form-control-sm" placeholder="BIN/TAX" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_pay_party_pic" v-uppercase class="form-control form-control-sm" placeholder="Contract Name" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_pay_party_mobile" v-uppercase class="form-control form-control-sm" placeholder="Phone Number" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="email" v-model="form.ebkg_pay_party_email" class="form-control form-control-sm" placeholder="Email" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_pay_party_carrier" v-uppercase class="form-control form-control-sm" placeholder="Carrier" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <!--- Container Packages Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-box"></i> PACKAGES DETAILS</h5>
                                            <div style="width: 300px; display: flex; align-items: center; gap: 8px;">
                                                <label for="all_package_type" style="white-space: nowrap;">Package Type:</label>

                                                <select name="all_package_type" id="all_package_type" class="form-select form-select-sm" autocomplete="off">
                                                    <option value="" selected="">Select Package Type</option>
                                                    <option value="box">Box</option>
                                                    <option value="envelope">Envelope</option>
                                                    <option value="pak">Pak</option>
                                                    <option value="tube">Tube</option>
                                                    <option value="small_box">Small Box</option>
                                                    <option value="medium_box">Medium Box</option>
                                                    <option value="large_box">Large Box</option>
                                                    <option value="extra_large_box">Extra Large Box</option>
                                                    <option value="10kg_box">10kg Box</option>
                                                    <option value="25kg_box">25kg Box</option>
                                                    <option value="uk_pak">UK Pak</option>
                                                    <option value="your_packaging">Your Packaging</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="card-body px-1 py-2">
                                            <div class="table-responsive package_table">
                                                <table class="table table-bordered table-striped align-middle m-0">
                                                    <thead>
                                                    <tr class="text-muted small text-center" style="white-space: nowrap; vertical-align: middle;">
                                                        <th style="width: 20px;">SN</th>
                                                        <th style="width: 45px;">PKG</th>
                                                        <th style="width: 120px;">Type</th>
                                                        <th style="width: 100px;">G.WT</th>
                                                        <th style="width: 40px;">Type</th>
                                                        <th style="width: 90px;">Length</th>
                                                        <th style="width: 90px;">Width</th>
                                                        <th style="width: 90px;">Height</th>
                                                        <th style="width: 100px;">C.WT</th>
                                                        <th style="width: 50px;">Type</th>
                                                        <th>REMARK</th>
                                                        <th class="text-center" style="width: 35px;">
                                                        <button @click="addRowPKGbtn" type="button" class="btn btn-sm btn-primary btn-cargoaim bg-gradient open-second-modal plus-box-btn"> 
                                                            <i class="fa-solid fa-plus"></i>
                                                        </button>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                        <tr v-for="(row, index) in rows" :key="index" :data-index="index">
                                                            <td class="text-center row-sl">{{ index + 1 }}</td>
                                                            <td>
                                                                <input v-model="row.ebkg_pkg_row_id" type="hidden">

                                                                <input v-model="row.ebkg_pkg_pkg_qty" v-number-only type="text" class="form-control form-control-sm text-end">
                                                            </td>
                                                            <td>
                                                                <select v-model="row.ebkg_pkg_pkg_type" class="form-select form-select-sm">
                                                                    <option value=""></option>

                                                                    <option v-for="pkg in packageList" :key="pkg.pkg_code" :value="pkg.pkg_code">
                                                                        {{ pkg.pkg_code }}-{{ pkg.pkg_description }}
                                                                    </option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input v-model="row.ebkg_pkg_weight" v-number-decimal type="text" class="form-control form-control-sm text-end" placeholder="0.000">
                                                            </td>
                                                            <td>
                                                                <select v-model="row.ebkg_pkg_weight_type" class="form-select form-select-sm">
                                                                    <option value="KG">KG</option>
                                                                    <option value="LB">LB</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input v-model="row.ebkg_pkg_length" v-number-decimal type="text" class="form-control form-control-sm text-end" placeholder="0.000">
                                                            </td>
                                                            <td>
                                                                <input v-model="row.ebkg_pkg_width" v-number-decimal type="text" class="form-control form-control-sm text-end" placeholder="0.000">
                                                            </td>
                                                            <td>
                                                                <input v-model="row.ebkg_pkg_height" v-number-decimal type="text" class="form-control form-control-sm text-end" placeholder="0.000">
                                                            </td>
                                                            <td>
                                                                <input :value="row.ebkg_pkg_chargeable_weight" v-number-decimal type="text" class="form-control form-control-sm text-end" placeholder="0.000" readonly>
                                                            </td>
                                                            <td>
                                                                <select v-model="row.ebkg_pkg_dimension_type" class="form-select form-select-sm">
                                                                    <option value="CM">CM</option>
                                                                    <option value="IN">IN</option>
                                                                    <option value="MM">MM</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <textarea v-model="row.ebkg_pkg_remarks" v-uppercase cols="30" rows="1" class="form-control form-control-sm" style="min-height: 28px !important;"></textarea>
                                                            </td>
                                                            <td class="text-center">
                                                                <button @click="deleteRow(index)" type="button" class="btn btn-danger btn-cargoaim btn-sm">
                                                                    <i class="fa-solid fa-xmark"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                    <tfoot>
                                                        <tr>
                                                            <td></td>
                                                            <td class="text-end"><strong>{{ totalQty }}</strong></td>
                                                            <td></td>
                                                            <td class="text-end"><strong>{{ totalWeight }}</strong></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td class="text-end"><strong>{{ totalChargeableWeight }}</strong></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <!--- Container Items Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-box"></i> ITEMS DETAILS</h5>
                                        </div>

                                        <div class="card-body px-1 py-2">
                                            <div class="table-responsive items_table">
                                                <table class="table table-bordered table-striped align-middle m-0">
                                                    <thead>
                                                        <tr class="text-muted small text-center" style="white-space: nowrap; vertical-align: middle;">
                                                            <th style="width: 20px;">SN</th>
                                                            <th style="width: 170px;">Item Name</th>
                                                            <th style="width: 50px;">QTY</th>
                                                            <th style="width: 90px;">Value($)</th>
                                                            <th style="width: 90px;">Currency</th>
                                                            <th style="width: 90px;">HS CODE</th>
                                                            <th style="width: 90px;">N.WT</th>
                                                            <th style="width: 50px;">Type</th>
                                                            <th style="width: 100px;">C/O</th>
                                                            <th>REMARK</th>
                                                            <th class="text-center" style="width: 35px;">
                                                                <button @click="addItemRow" type="button" class="btn btn-sm btn-primary btn-cargoaim bg-gradient open-second-modal plus-box-btn item_row_add_btn"> 
                                                                    <i class="fa-solid fa-plus"></i>
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    
                                                    <tbody>
                                                        <tr v-for="(row, index) in itemRows" :key="index" :data-index="index">
                                                            <!-- Serial Number -->
                                                            <td class="text-center row-sl">{{ index + 1 }}</td>
                                                            
                                                            <!-- Item Name -->
                                                            <td>
                                                                <input v-model="row.ebkg_item_row_id" type="hidden">

                                                                <input v-model="row.ebkg_item_name" v-uppercase type="text" class="form-control form-control-sm">
                                                            </td>
                                                            
                                                            <!-- Quantity -->
                                                            <td>
                                                                <input v-model.number="row.ebkg_item_qty" v-number-only type="text" class="form-control form-control-sm text-end">
                                                            </td>
                                                            
                                                            <!-- Customs Value -->
                                                            <td>
                                                                <input v-model="row.ebkg_item_customs_value" v-number-decimal type="text" class="form-control form-control-sm text-end" placeholder="0.00">
                                                            </td>
                                                            
                                                            <!-- Currency -->
                                                            <td>
                                                                <select v-model="row.ebkg_item_currency" class="form-select form-select-sm">
                                                                    <option value=""></option>
                                                                    <option v-for="currency in currencyList" :key="currency.currency_code" :value="currency.currency_code">
                                                                        {{ currency.currency_code }} - {{ currency.currency_full }}
                                                                    </option>
                                                                </select>
                                                            </td>
                                                            
                                                            <!-- HS Code -->
                                                            <td>
                                                                <input v-model="row.ebkg_item_hs_code" v-number-only type="text" class="form-control form-control-sm">
                                                            </td>
                                                            
                                                            <!-- Weight -->
                                                            <td>
                                                                <input v-model="row.ebkg_item_weight" v-number-decimal type="text" class="form-control form-control-sm text-end" placeholder="0.000">
                                                            </td>
                                                            
                                                            <!-- Weight Type -->
                                                            <td>
                                                                <select v-model="row.ebkg_item_weight_type" class="form-select form-select-sm">
                                                                    <option value="KG">KG</option>
                                                                    <option value="LB">LB</option>
                                                                </select>
                                                            </td>
                                                            
                                                            <!--  C/O / Made In (Country Dropdown) -->
                                                            <td>
                                                                <select v-model="row.ebkg_item_made_in" class="form-select form-select-sm">
                                                                    <option value=""></option>
                                                                    <option v-for="country in countries" :key="country.country_code" :value="country.country_code">
                                                                        {{ country.country_code }} - {{ country.country_name }}
                                                                    </option>
                                                                </select>
                                                            </td>
                                                            
                                                            <!-- Remarks -->
                                                            <td>
                                                                <textarea v-model="row.ebkg_item_remarks" v-uppercase cols="30" rows="1" class="form-control form-control-sm" style="min-height: 28px !important;"></textarea>
                                                            </td>
                                                            
                                                            <!-- Delete Button -->
                                                            <td class="text-center">
                                                                <button @click="deleteItemRow(index)" type="button" class="btn btn-danger btn-cargoaim btn-sm delete-row">
                                                                    <i class="fa-solid fa-xmark"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                    <tfoot>
                                                        <tr>
                                                            <td colspan="2"><strong>Total:</strong></td>
                                                            <td class="text-end"><strong>{{ totalItemQty }}</strong></td>
                                                            <td class="text-end"><strong>{{ totalItemValue }}</strong></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td class="text-end"><strong>{{ totalItemWeight }}</strong></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <!--- Dangerous Goods Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm dangerous-good-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center gap-2">
                                                <h5 class="header_title_children mb-0">
                                                    <i class="fa-solid fa-triangle-exclamation text-warning"></i>
                                                    Dangerous Goods
                                                </h5>

                                                <input type="checkbox" v-model="form.ebkg_dg_yes_no" @change="handleDGToggle" title="Dangerous Goods" >
                                            </div>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width:20%">
                                                            <label class="form-label">IMO Class :</label>

                                                            <input type="text" v-model="form.ebkg_dg_class" v-uppercase class="form-control form-control-sm" autocomplete="off" :disabled="!form.ebkg_dg_yes_no" :required="form.ebkg_dg_yes_no" >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">UN NO :</label>

                                                            <input type="text" v-model="form.ebkg_dg_un_no" v-uppercase class="form-control form-control-sm" autocomplete="off" :disabled="!form.ebkg_dg_yes_no" :required="form.ebkg_dg_yes_no" >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">Package Group :</label>

                                                            <input type="text" v-model="form.ebkg_dg_pkg_group" v-uppercase class="form-control form-control-sm" autocomplete="off" :disabled="!form.ebkg_dg_yes_no" :required="form.ebkg_dg_yes_no" >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">Flash Point :</label>

                                                            <input type="text" v-model="form.ebkg_dg_flash_poin" v-uppercase class="form-control form-control-sm" autocomplete="off" :disabled="!form.ebkg_dg_yes_no" :required="form.ebkg_dg_yes_no" >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">Upload File :</label>

                                                            <label class="file-upload-container" :style="!form.ebkg_dg_yes_no ? 'pointer-events:none;opacity:.5;' : ''" >

                                                                <input type="file" class="file-input" multiple :disabled="!form.ebkg_dg_yes_no" @change="handleDGFileChange" >

                                                                <i v-if="form.ebkg_dg_files.length === 0" class="fas fa-cloud-upload-alt file-upload-icon" ></i>

                                                                <span v-else class="file-count-text" >
                                                                    {{ form.ebkg_dg_files.length }} file(s) selected
                                                                </span>
                                                            </label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <!--- Service Details Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm service-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-toolbox"></i> Service Details</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 34%">
                                                            <label class="form-label">Date : </label>
                                                            <input type="date" v-model="form.ebkg_ervice_date" v-uppercase class="form-control form-control-sm" autocomplete="off">
                                                        </td>
                                                        <td style="width: 33%">
                                                            <label class="form-label">Services : </label>
                                                            <select v-model="form.ebkg_service_type" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="">Select Service</option>
                                                                <option value="First_Overnight®"> First Overnight® </option>
                                                                <option value="International_First®"> International First® </option>
                                                                <option value="International_Priority®"> International Priority® </option>
                                                                <option value="International_Priority®_Express"> International Priority® Express </option>
                                                                <option value="International_Economy®_Freight"> International Economy® Freight </option>
                                                                <option value="Priority_Overnight®"> Priority Overnight® </option>
                                                                <option value="International_Priority®_Freight"> International Priority® Freight </option>
                                                                <option value="1Day®_Freight"> 1Day® Freight </option>
                                                                <option value="International_Priority®"> International Priority® </option>
                                                                <option value="International_Economy®"> International Economy® </option>
                                                            </select>
                                                        </td>
                                                        <td style="width: 33%">
                                                            <label class="form-label">Signature Type : </label>
                                                            <select v-model="form.ebkg_service_signature" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected="">Select Signature Type</option>
                                                                <option value="None_specified"> None specified </option>
                                                                <option value="No_signature_required"> No signature required </option>
                                                                <option value="Indirect_signature_required"> Indirect signature required </option>
                                                                <option value="Direct_signature_required"> Direct signature required </option>
                                                                <option value="Adult_signature_required"> Adult signature required </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                             <!--- Additional Options Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm additional-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-circle"></i> Additional Options</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 17%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Shipment References</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 40%;">
                                                            <input type="text" v-model="form.web_cms_shipment_ref" v-uppercase class="form-control form-control-sm" placeholder="Shipment References" autocomplete="off">
                                                        </td>
                                                        <td style="width: 12%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>P.O.NO</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 31%;">
                                                            <input type="text" v-model="form.ebkg_po_no" v-uppercase class="form-control form-control-sm" placeholder="P.O.NO" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            <table class="table table-borderless align-middle m-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="width: 29.5%;">
                                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                                <span>Invoice No</span>
                                                                                <span>:</span>
                                                                            </div>
                                                                        </td>
                                                                        <td style="width: 30%;">
                                                                            <input type="text" v-model="form.web_cms_invoice_no" v-uppercase class="form-control form-control-sm" placeholder="Invoice No" autocomplete="off">
                                                                        </td>
                                                                        <td style="width: 15%;">
                                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                                <span>Upload File</span>
                                                                                <span>:</span>
                                                                            </div>
                                                                        </td>
                                                                        <td style="width: 28%;">
                                                                            <label class="file-upload-container">
                                                                                <input type="file" name="invoice_upload_file[]" class="file-input" multiple @change="handleInvoiceFileChange" />

                                                                                <i v-if="form.web_cms_invoice_upload_file.length === 0" class="fas fa-cloud-upload-alt file-upload-icon"></i>

                                                                                <span v-else class="file-count-text" >
                                                                                    {{ form.web_cms_invoice_upload_file.length }} file(s) selected
                                                                                </span>
                                                                            </label>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Department No</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_department_no" v-uppercase class="form-control form-control-sm" placeholder="Department No" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                        <tr>
                                                        <td style="width: 160px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Commercial Doc. Types</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <select v-model="form.ebkg_doc_type" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected="">Select Commercial Document  Type</option>
                                                                <option value="1"> Document </option>
                                                                <option value="2">Sample </option>
                                                            </select>
                                                        </td>
                                                        <td colspan="2"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>

                            <!--- Pickup/Drop-off Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm pickup-drop-off-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-truck"></i> Pickup/Drop-off </h5>
                                        </div>
                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 15%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Pickup/Drop-off Type</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 35%;">
                                                            <select v-model="form.ebkg_picup_drop_off_type" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected="">Select Pickup/Drop-off Type</option>
                                                                <option value="I have already scheduled a pickup at my location"> I have already scheduled a pickup at my location </option>
                                                                <option value="Schedule a new pickup"> Schedule a new pickup </option>
                                                                <option value="I'll drop off my shipment at a FedEx location"> I'll drop off my shipment at a FedEx location </option>
                                                            </select>
                                                        </td>
                                                        <td style="width: 15%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Date</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 35%;">
                                                            <div class="input-group">
                                                                <input type="date" v-model="form.ebkg_picup_drop_off_date" class="form-control form-control-sm" data-date-format="d-M-Y" autocomplete="off">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Earliest Possible Time</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_earliest_possible_time" class="form-control form-control-sm flatpickr-input" data-provider="timepickr" data-time-basic="true" placeholder="Select Earliest Possible Time" autocomplete="off" readonly="readonly">
                                                        </td>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Latest Possible Time</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_latest_possible_time" class="form-control form-control-sm flatpickr-input" data-provider="timepickr" data-time-basic="true" placeholder="Select Latest Possible Time" autocomplete="off" readonly="readonly">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Pickup Instructions</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <select v-model="form.ebkg_picup_instructions" class="form-select form-select-sm" autocomplete="off">
                                                                <optgroup label="Standard">
                                                                    <option value="" selected=""> Select Pickup Instructions </option>
                                                                    <option value="No_instructions"> No instructions </option>
                                                                    <option value="Shipping_Receiving"> Shipping Receiving </option>
                                                                    <option value="Mailroom"> Mailroom </option>
                                                                    <option value="Front_Door_Reception"> Front Door Reception </option>
                                                                    <option value="Back_Door"> Back Door </option>
                                                                    <option value="Side_Door"> Side Door </option>
                                                                    <option value="With_Guard"> With Guard </option>
                                                                    <option value="Garage"> Garage </option>
                                                                </optgroup>

                                                                <optgroup label="Personalized">
                                                                    <option value="Personalized_instructions"> Personalized instructions </option>
                                                                </optgroup>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Contract Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_picup_drop_off_name" v-uppercase class="form-control form-control-sm" placeholder="Contract Person Name" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Phone Number</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.ebkg_picup_drop_off_phone" class="form-control form-control-sm" placeholder="Phone Number" autocomplete="off">
                                                        </td>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Ship From</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="email" v-model="form.ebkg_picup_drop_off_email" class="form-control form-control-sm mt2_mb1" placeholder="EMAIL" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>PICKUP ADDRESS</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td colspan="1">
                                                            <textarea v-model="form.ebkg_picup_drop_off_address" v-uppercase cols="30" rows="1" class="form-control form-control-sm" placeholder="PICKUP ADDRESS" autocomplete="off"></textarea>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>

                            <!--- Billing Details Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm billing-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-money-bills"></i> Billing Details</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 10%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Billing Type</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 40%;">
                                                            <select v-model="form.ebkg_billing_type" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected="">Select Billing Type</option>
                                                                <option value="Recipient"> Recipient </option>
                                                                <option value="My account"> My account </option>
                                                                <option value="Third-party"> Third-party </option>
                                                            </select>
                                                        </td>
                                                        <td style="width: 10%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Account No</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 40%;">
                                                            <input type="text" v-model="form.ebkg_account_no" v-uppercase class="form-control form-control-sm" placeholder="Account No" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>

                            <!--- CC Email & Remarks Table--->
                            <tr>
                                <td colspan="5">
                                    <div class="card card_children shadow-sm billing-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-envelope"></i> CC Email & Remarks </h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 60%;">
                                                            <span>Add CC Email Addresses:</span>
                                                        </td>
                                                        <td style="width: 40%;">
                                                            <span>Remark:</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width:60%;">
                                                            <!-- Hidden textarea -->
                                                            <textarea class="form-control d-none" v-model="form.ebkg_email_cc" autocomplete="off" readonly></textarea>

                                                            <!-- Chip Container -->
                                                            <div class="mail-chip-container" @click="ccFocusInput">
                                                                <div v-for="(email, index) in cc_emails" :key="index" class="mail-chip">
                                                                    <span>{{ email }}</span>

                                                                    <button type="button" class="mail-chip-remove" @click.stop="ccRemoveEmail(index)">
                                                                        ×
                                                                    </button>
                                                                </div>

                                                                <input ref="cc_emailInput" v-model="cc_inputEmail" type="text" class="mail-chip-input" placeholder="Type email and press Enter" @keydown.enter.prevent="ccAddEmail" autocomplete="off"
                                                                />
                                                            </div>
                                                        </td>
                                                        
                                                        <td style="width: 40%;">
                                                            <textarea  v-model="form.ebkg_main_remarks" v-uppercase cols="30" rows="1" class="form-control" placeholder="" autocomplete="off" style="height: 160px;"></textarea>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>


                            <!--- Save Shipment Profile Name Table--->
                            <tr id="saveShipmentRow">
                                <td colspan="5">
                                    <div class="card card_children shadow-sm billing-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-floppy-disk"></i> Save Shipment Profile Name</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 180px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Shipment Profile Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.shipment_profile_to_save" v-uppercase class="form-control form-control-sm" placeholder="Save Shipment Profile Name" autocomplete="off">
                                                        </td>
                                                        <td style="width: 20px;">
                                                            <button type="button" class="btn btn-primary btn-cargoaim bg-gradient" id="courier_save_btn" style="height: 28px;">
                                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="text-end mb-2" style="margin-right: 9px;">
                    <button type="button" class="btn btn-primary btn-cargoaim bg-gradient" id="ebkg_save_update" @click="saveBooking">
                        <i class="fas fa-check-circle"></i>&nbsp;Submit
                    </button>
                    
                </div>
            </form>
        </div> <!-- end card-body -->
    </div> 
    <!-- end card-->


    <!-- Create modal start -->
    <BaseModal v-model:modalValue="showCustModal" :closeOnBackdrop="false" position="top" width="1380px" height="auto" padding="0px">
        <template #body>
            <CustListModal />
        </template>
    </BaseModal>

</template>

<style scoped>

    .suggestion-search-icon
    {
        color: #7f7f7f;
        pointer-events: none;
        font-size: 13px;
        position: absolute;
        top: 55%;
        left: 14px;
        transform: translateY(-50%);
        vertical-align: middle;
    }

    .suggestion-search-input {
        border: 1px solid var(--border);
        box-sizing: border-box;
        border-radius: 6px;
        outline: none;
        width: 100%;
        padding: 2px 5px 4px 40px;
        font-size: 13px;
        transition: border-color .2s, box-shadow .2s;
        vertical-align: middle;
    }

    :deep(.child-circle-loader) {  
        right: 25px; 
    } 

    .booking_card {
        margin: 0px 155px;
    }
    .booking_card .card-header{
        background-image: linear-gradient(to bottom, #f1f4f8, #e6ebf2) !important;
    }
    .booking_card .header-title
    {
        font-weight: 400;
        font-size: 18px;
        color: #0072a7;
        margin: 5px 0px;
    }
    .card_children {
        border: none;
        margin: 0px;
    }
    .card_children .card-header{
        border-bottom: none;
        height: 40px;
        padding: 0px 10px;
        background-image: linear-gradient(to bottom, #f1f4f8, #e6ebf2) !important;        
    }
    .card_children .card-header .header_title_children{
        font-size: 14px !important;
    }
    #shipper_list_id,
    #consignee_list_id,
    #third_party_list_id {
        width: 30px;
    }
    input::placeholder, 
    textarea::placeholder {
        font-size: 12px!important;
    }
    
    textarea {
        resize: none;
    }
    .table tbody tr td {
        padding: 2px;
    }
    .package_table,
    .items_table { 
        border-radius: 4px;
        border: 2px solid #ddd;
        margin: 0px 4px;
    }
    .package_table thead tr th,
    .items_table thead tr th { 
        background: #4483B4!important;
        color: #FFFFFF;
        font-weight: 400;
        /* letter-spacing: 0.5px; */
        padding: 1px 4px;
    }
    .package_table tbody tr td,
    .items_table tbody tr td { 
        padding: 1px;
    }
    .package_table tfoot tr td,
    .items_table tfoot tr td { 
        background: #eee;
        background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
        font-size: 12px;
        font-weight: 500 !important;
    }





    .file-upload-container{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 30px;
        border: 1px dashed #6c757d;
        border-radius: 8px;
        cursor: pointer;
        background: #f8f9fa;
    }
    .file-upload-container:hover {
        border-color: #0d6efd;
        background-color: #e9ecef;
    }

    .file-input{
        position:absolute;
        inset:0;
        opacity:0;
        cursor:pointer;
    }

    .file-upload-icon{
        font-size:24px;
        color:#6c757d;
    }
    .file-upload-container:hover .file-upload-icon{
        color: #0d6efd;
    }

    .file-count-text{
        font-size:14px;
        color:#555;
        font-weight:500;
    }










    .mail-chip-container {
        min-height: 160px;
        max-height: 160px;
        overflow-y: auto;
        overflow-x: hidden;

        border: 1px solid #ced4da;
        border-radius: 6px;
        padding: 4px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 5px;
        cursor: text;
        background: #fff;
        
    }
    .mail-chip-container:focus-within {
        border-color: var(--input-focus-border);
        background-color: var(--input-focus-bg);
        box-shadow: 0 0 0 var(--input-focus-shadow-spread) var(--input-focus-shadow);
    }

    /* Scrollbar width */
    .mail-chip-container::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    .mail-chip-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    /* Thumb */
    .mail-chip-container::-webkit-scrollbar-thumb {
        background: #9a9a9a;
        border-radius: 10px;
        border: 2px solid #f1f1f1;
    }

    .mail-chip-container::-webkit-scrollbar-thumb:hover {
        background: #7b7b7b;
    }

    /* Arrow buttons */
    .mail-chip-container::-webkit-scrollbar-button:single-button {
        display: block;
        height: 14px;
        background: #e5e5e5;
        border-radius: 6px;
    }

    /* Up arrow */
    .mail-chip-container::-webkit-scrollbar-button:single-button:vertical:decrement {
        background: #e5e5e5
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><polygon points='5,2 9,7 1,7' fill='%23666'/></svg>")
            no-repeat center;
    }

    /* Down arrow */
    .mail-chip-container::-webkit-scrollbar-button:single-button:vertical:increment {
        background: #e5e5e5
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><polygon points='1,3 9,3 5,8' fill='%23666'/></svg>")
            no-repeat center;
    }




    .mail-chip {
        display: inline-flex;
        align-items: center;
        background: #e9f2ff;
        color: #0d6efd;
        border-radius: 20px;
        padding: 2px 10px;
        font-size: 12px;
        font-weight: 500;
        height: 22px;
    }

    .mail-chip-remove {
        border: none;
        background: transparent;
        color: #0d6efd;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        margin-left: 6px;
        line-height: 1;
    }

    .mail-chip-input {
        flex: 1;
        min-width: 180px;
        border: none;
        outline: none;
        font-size: 12px;
        padding: 5px;
        background: transparent;
        height: 22px;
    }

    .mail-chip-input::placeholder {
        color: #6c757d;
    }




    @media (max-width: 1366px) {
        .booking_card {
            margin: 0px 100px;
        }
        .table tbody td
        {
            font-size: 12px;
        }
    }
    @media (max-width: 1200px) {
        .booking_card {
            margin: 0px;
        }
        .table tbody td
        {
            font-size: 12px;
        }
    }
    
</style>
