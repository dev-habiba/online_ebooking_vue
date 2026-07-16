<script setup>
    import { ref, computed, onMounted } from 'vue';
    import axios from "axios";

    import BaseModal from '@/shared/components/modal/BaseModal.vue';
    import CustListModal from '@/modules/booking/components/modal/CustomerListModal.vue';

    import { useToast } from "vue-toastification"; // Toast call

    const toast = useToast();

    const showCustModal = ref(false)

    const countries = ref([]);

    const form = ref({
        // Shipment Profile
        web_cms_shipment_profile: "",
        web_cms_imp_exp: "1",
        web_cms_ship_form: "", //pol
        web_cms_ship_form_code: "", //pol
        web_cms_ship_to: "",//pod
        web_cms_ship_to_code: "",//pod

        // Shipper
        web_cms_shipper_code: "",
        web_cms_shipper_name: "",
        web_cms_shipper_address: "",
        web_cms_shipper_postal_code: "",
        web_cms_shipper_country: "",
        web_cms_shipper_state_tax: "",
        web_cms_shipper_city: "",
        web_cms_shipper_contract_name: "",
        web_cms_shipper_phone_number: "",
        web_cms_shipper_email: "",
        web_cms_shipper_carrier: "",

        // Consignee
        web_cms_consignee_code: "",
        web_cms_consignee_name: "",
        web_cms_consignee_address: "",
        web_cms_consignee_postal_code: "",
        web_cms_consignee_country: "",
        web_cms_consignee_state_tax: "",
        web_cms_consignee_city: "",
        web_cms_consignee_contract_name: "",
        web_cms_consignee_phone_number: "",
        web_cms_consignee_email: "",
        web_cms_consignee_carrier: "",

        // Third Party
        web_cms_third_party_code: "",
        web_cms_third_party_name: "",
        web_cms_third_party_address: "",
        web_cms_third_party_postal_code: "",
        web_cms_third_party_country: "",
        web_cms_third_party_state_tax: "",
        web_cms_third_party_city: "",
        web_cms_third_party_contract_name: "",
        web_cms_third_party_phone_number: "",
        web_cms_third_party_email: "",
        web_cms_third_party_carrier: "",

        // Dangerous Goods
        web_cms_dg: false,
        web_cms_dg_imo_class: "",
        web_cms_dg_un_no: "",
        web_cms_dg_pkg_group: "",
        web_cms_dg_flash_point: "",
        web_cms_dg_files: [],

        // Service Details
        web_cms_service_date: "",
        web_cms_service_type: "",
        web_cms_service_signature: "",

        // Additional Options
        web_cms_shipment_ref: "",
        web_cms_po_no: "",
        web_cms_invoice_no: "",
        web_cms_invoice_upload_file: [],
        web_cms_department_no: "",
        web_cms_comm_doc_type: "",

        // Pickup / Drop-off
        web_cms_picup_drop_off_type: "",
        web_cms_picup_drop_off_date: "",
        web_cms_earliest_possible_time: "",
        web_cms_latest_possible_time: "",
        web_cms_picup_instructions: "",
        web_cms_picup_drop_off_name: "",
        web_cms_picup_drop_off_phone: "",
        web_cms_picup_drop_off_email: "",
        web_cms_picup_drop_off_address: "",

        // Billing
        web_cms_billing_type: "",
        web_cms_account_no: "",

        // Save Shipment Profile
        web_cms_save_shipment_rofile: "",


        
        // Packages field...
        packages: [
            {
                web_cms_qty: "",
                web_cms_type: "",
                web_cms_weight: "",
                web_cms_weightType: "", //kg
                web_cms_length: "",
                web_cms_width: "",
                web_cms_height: "",
                web_cms_chargeableWeight: "",
                web_cms_dimensionType: "", //cm
                web_cms_remarks: "",
            }
        ],

        // Items field...
        items: [
            {
                web_cms_qty: "",
                web_cms_type: "",
                web_cms_weight: "",
                web_cms_weightType: "", //kg
                web_cms_length: "",
                web_cms_width: "",
                web_cms_height: "",
                web_cms_chargeableWeight: "",
                web_cms_dimensionType: "", //cm
                web_cms_remarks: "",
            }
        ]
    });

    const getCountries = async () => {
        try {
            const payload = {
                soft_cust_id: "DEMO",
                partition_id: "1004",
                language_id: "EN",
                user_id: "admin.demo",
                country_name_or_code: ""
            };

            const res = await axios.post(
                "https://connect.cargoaim.com/common/country_list_json.php",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.data.header_data.success) {
                countries.value = res.data.details_data;
            }

            console.log(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {
        getCountries();
    });





    //---- Dangerous Goods Check Box -----//

    const handleDGFileChange = (event) => {
        form.value.web_cms_dg_files = Array.from(event.target.files);
    };

    const handleInvoiceFileChange = (event) => {
        form.value.web_cms_invoice_upload_file = Array.from(event.target.files);
    };






    const validateNumber = (row, field, event) => {
        let value = event.target.value;

        value = value.replace(/[^0-9.]/g, '');

        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        row[field] = value;

        calculateItemChargeableWeight(row);
    };




    // ১. প্যাকেজ টাইপ অপশনগুলোর লিস্ট
    const pkgTypes = [
    { value: 'AM', label: 'AM-Ampoule, non-protect' },
    { value: 'AP', label: 'AP-Ampoule, protected' },
    { value: 'BG', label: 'BG-Bag' },
    { value: '5L', label: '5L-Bag, textile' },
    { value: 'BL', label: 'BL-Bale' },
    { value: 'BF', label: 'BF-Balloon, non-protect' },
    { value: 'BX', label: 'BX-Box' },
    { value: '4A', label: '4A-Box, steel' },
    { value: 'BE', label: 'BE-Bundle' },
    { value: 'CI', label: 'CI-Canister' },
    { value: 'CO', label: 'CO-Carboy, non-protecte' },
    { value: 'CT', label: 'CT-CARTON' },
    { value: 'CQ', label: 'CQ-Cartridge' },
    { value: 'CS', label: 'CS-Case' },
    { value: 'EF', label: 'EF-Case, with pallet ba' },
    { value: 'ED', label: 'ED-Case, with pallet ba' },
    { value: 'CR', label: 'CR-Crate' }
    ];

    // ২. Rows Reactive Data (ডিফল্ট ১টি রো থাকবে)
    const rows = ref([
    {
        qty: 1,
        type: '',
        weight: 0,
        weightType: 'kg',
        length: 0,
        width: 0,
        height: 0,
        chargeableWeight: 0,
        dimensionType: 'cm',
        remarks: ''
    }
    ]);

    // ৩. নতুন রো অ্যাড করার ফাংশন
    const addRowPKGbtn = () => {
    rows.value.push({
        qty: 1,
        type: '',
        weight: 0,
        weightType: 'kg',
        length: 0,
        width: 0,
        height: 0,
        chargeableWeight: 0,
        dimensionType: 'cm',
        remarks: ''
    });
    };

    // ৪. রো ডিলিট করার ফাংশন
    const deleteRow = (index) => {
    if (rows.value.length > 1) {
        rows.value.splice(index, 1);
    } else {
        toast.error("There must be at least one row!", {position: "top-right", timeout: 3000,});
    }
    };

    // ৫. চার্জেবল ওয়েট ক্যালকুলেশন (উদাহরণস্বরূপ Volume Weight এর লজিক দেওয়া হলো)
    // আপনি আপনার লজিক অনুযায়ী এটি পরিবর্তন করতে পারেন
    const calculateChargeableWeight = (row) => {
    if (row.length && row.width && row.height && row.qty) {
        // Air Freight Standard Volumetric formula: (L * W * H) / 6000 * Qty
        const volWeight = ((parseFloat(row.length) * parseFloat(row.width) * parseFloat(row.height)) / 6000) * parseInt(row.qty);
        const grossWeight = parseFloat(row.weight) || 0;
        row.chargeableWeight = Math.max(grossWeight, volWeight).toFixed(3);
    } else {
        row.chargeableWeight = (parseFloat(row.weight) || 0).toFixed(3);
    }
    };

    // ৬. ফুটারের জন্য টোটাল হিসাব (Computed Properties)
    const totalQty = computed(() => {
    return rows.value.reduce((sum, row) => sum + (parseInt(row.qty) || 0), 0);
    });

    const totalWeight = computed(() => {
    return rows.value.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0).toFixed(3);
    });

    const totalChargeableWeight = computed(() => {
    return rows.value.reduce((sum, row) => sum + (parseFloat(row.chargeableWeight) || 0), 0).toFixed(3);
    });












    // ১. আইটেম টাইপ অপশনগুলোর লিস্ট 
    const itemPkgTypes = [
    { value: 'AM', label: 'AM-Ampoule, non-protect' },
    { value: 'AP', label: 'AP-Ampoule, protected' },
    { value: 'BG', label: 'BG-Bag' },
    { value: '5L', label: '5L-Bag, textile' },
    { value: 'BL', label: 'BL-Bale' },
    { value: 'BF', label: 'BF-Balloon, non-protect' },
    { value: 'BX', label: 'BX-Box' },
    { value: '4A', label: '4A-Box, steel' },
    { value: 'BE', label: 'BE-Bundle' },
    { value: 'CI', label: 'CI-Canister' },
    { value: 'CO', label: 'CO-Carboy, non-protecte' },
    { value: 'CT', label: 'CT-CARTON' },
    { value: 'CQ', label: 'CQ-Cartridge' },
    { value: 'CS', label: 'CS-Case' },
    { value: 'EF', label: 'EF-Case, with pallet ba' },
    { value: 'ED', label: 'ED-Case, with pallet ba' },
    { value: 'CR', label: 'CR-Crate' }
    ];

    // ২. Items Reactive Data (ডিফল্ট ১টি রো থাকবে)
    const itemRows = ref([
    {
        qty: 1,
        type: '',
        weight: 0,
        weightType: 'kg',
        length: 0,
        width: 0,
        height: 0,
        chargeableWeight: 0,
        dimensionType: 'cm',
        remarks: ''
    }
    ]);

    // ৩. নতুন আইটেম রো অ্যাড করার ফাংশন
    const addItemRow = () => {
    itemRows.value.push({
        qty: 1,
        type: '',
        weight: 0,
        weightType: 'kg',
        length: 0,
        width: 0,
        height: 0,
        chargeableWeight: 0,
        dimensionType: 'cm',
        remarks: ''
    });
    };

    // ৪. আইটেম রো ডিলিট করার ফাংশন
    const deleteItemRow = (index) => {
    if (itemRows.value.length > 1) {
        itemRows.value.splice(index, 1);
    } else {
        toast.error("There must be at least one row!", {position: "top-right", timeout: 3000,});
    }
    };

    // ৫. চার্জেবল ওয়েট ক্যালকুলেশন লজিক
    const calculateItemChargeableWeight = (row) => {
    if (row.length && row.width && row.height && row.qty) {
        // Volumetric formula: (L * W * H) / 6000 * Qty
        const volWeight = ((parseFloat(row.length) * parseFloat(row.width) * parseFloat(row.height)) / 6000) * parseInt(row.qty);
        const grossWeight = parseFloat(row.weight) || 0;
        row.chargeableWeight = Math.max(grossWeight, volWeight).toFixed(3);
    } else {
        row.chargeableWeight = (parseFloat(row.weight) || 0).toFixed(3);
    }
    };

    // ৬. ফুটারের জন্য টোটাল হিসাব (Computed Properties)
    const totalItemQty = computed(() => {
    return itemRows.value.reduce((sum, row) => sum + (parseInt(row.qty) || 0), 0);
    });

    const totalItemWeight = computed(() => {
    return itemRows.value.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0).toFixed(3);
    });

    const totalItemChargeableWeight = computed(() => {
    return itemRows.value.reduce((sum, row) => sum + (parseFloat(row.chargeableWeight) || 0), 0).toFixed(3);
    });


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
                                <td colspan="3" class="">
                                    <div class="card card_children shadow-sm shipment-profile-card mb-3">
                                        <div class="card-header bg-light bg-gradient py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-house"></i> </h5>
                                            <h5 class="hbl_show mb-0"> </h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 25%;">
                                                            <input type="hidden" name="row_id" id="row_id">

                                                            <label class="form-label"> Load Shipment Profile : </label>
                                                            <select v-model="form.web_cms_shipment_profile" class="form-select form-select-sm" autocomplete="off"><option value=""></option>
                                                                <option value="FILE">FILE</option> 
                                                                <option value="TEST">TEST</option>
                                                                <option value="TEST 2">TEST 2</option>
                                                                <option value="TEST 3">TEST 3</option>
                                                            </select>
                                                        </td>
                                                        <td style="width: 25%;">
                                                            <label class="form-label"> Export/Import : </label>
                                                            <select v-model="form.web_cms_imp_exp" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="1"> Outbound Shipment </option>
                                                                <option value="2"> Inbound Shipment </option>
                                                            </select>
                                                        </td>
                                                        <td style="width: 25%;">
                                                            <label for="inputEmail4" class="form-label"> Ship From :</label>
                                                            <div class="position-relative">
                                                                <input type="hidden" v-model="form.web_cms_ship_form_code" class="uppercase-only">

                                                                <div class="input-group online_bkg_search_inp">
                                                                    <input type="text" v-model="form.web_cms_ship_form" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH" autocomplete="off">

                                                                    <span class="input-group-text search_keyword search_keyword_enty_form">
                                                                        <i class="fa-solid fa-magnifying-glass"></i>
                                                                    </span>
                                                                </div>
                                                                
                                                                <div id="pol_loader" class="pol_loader circle-dot-loader" style="display:none;">
                                                                    <div></div><div></div><div></div><div></div>
                                                                    <div></div><div></div><div></div><div></div>
                                                                </div>

                                                                <!-- <div id="pol_suggestions_box" class="global-suggestions-box" style="width: 540px!important;"></div> -->
                                                            </div>
                                                        </td>
                                                        <td style="width: 25%;">
                                                            <label for="inputPassword4" class="form-label"> Deliver / Ship To :</label>

                                                            <div class="position-relative">
                                                                <input type="hidden" v-model="form.web_cms_ship_to_code" class="uppercase-only">
                                                                
                                                                <div class="input-group online_bkg_search_inp">
                                                                    <input type="text" v-model="form.web_cms_ship_to" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH" autocomplete="off">

                                                                    <span class="input-group-text search_keyword search_keyword_enty_form">
                                                                        <i class="fa-solid fa-magnifying-glass"></i>
                                                                    </span>
                                                                </div>

                                                                <div id="pod_loader" class="pod_loader circle-dot-loader" style="display:none;">
                                                                    <div></div><div></div><div></div><div></div>
                                                                    <div></div><div></div><div></div><div></div>
                                                                </div>

                                                                <!-- <div id="pod_suggestions_box" class="global-suggestions-box" style="width: 540px!important; right: 0px; left: auto;"></div> -->
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <!--- Shipper and Consignee Contact Details Table--->
                            <tr class="border-bootom-dotted">
                                <!--- Shipper Contact Details Table--->
                                <td style="width: 49.5%">
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
                                                        <td style="width: 30%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Company Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="d-flex gap-1 align-items-center">
                                                                <input type="hidden" v-model="form.web_cms_shipper_code" value="NMS20260705131817">

                                                                <input type="text" v-model="form.web_cms_shipper_name" class="form-control form-control-sm uppercase-only" placeholder="Company Name">

                                                                <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="shipper_list_id" @click="showCustModal = true">
                                                                    <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                                </button>
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
                                                            <textarea v-model="form.web_cms_shipper_address" cols="30" rows="1" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Address" autocomplete="off"></textarea>
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
                                                            <input type="text" v-model="form.web_cms_shipper_postal_code" class="form-control form-control-sm uppercase-only" placeholder="Postal Code" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Country / Territory</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <select
                                                                class="form-select form-select-sm"
                                                                v-model="form.web_cms_shipper_country"
                                                            >
                                                                <option value="">Select Country</option>

                                                                <option
                                                                    v-for="country in countries"
                                                                    :key="country.country_code"
                                                                    :value="country.country_code"
                                                                >
                                                                    {{ country.country_code }} - {{ country.country_name }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>State TAX ID/I.E.</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        
                                                        <td>
                                                            <input type="text" v-model="form.web_cms_shipper_state_tax" class="form-control form-control-sm uppercase-only" placeholder="State TAX ID/I.E." autocomplete="off">
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
                                                            <select v-model="form.web_cms_shipper_city" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected=""></option>
                                                                
                                                            </select>
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
                                                            <input type="text" v-model="form.web_cms_shipper_contract_name" class="form-control form-control-sm uppercase-only" placeholder="Contract Name" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_shipper_phone_number" class="form-control form-control-sm" placeholder="Phone Number" autocomplete="off">
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
                                                            <input type="email" v-model="form.web_cms_shipper_email" class="form-control form-control-sm" placeholder="Email" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_shipper_carrier" class="form-control form-control-sm uppercase-only" placeholder="Carrier" autocomplete="off">
                                                        </td>
                                                    </tr>
                                            </tbody></table>
                                        </div>
                                    </div>
                                </td>

                                <td style="width: 1%;"></td>

                                <!--- Consignee Contact Details Table--->
                                <td style="width: 49.5%">
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
                                                        <td style="width: 30%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Company Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="d-flex gap-1 align-items-center">
                                                                <input type="hidden" v-model="form.web_cms_consignee_code" class="uppercase-only">
                                                            
                                                                <input type="text" v-model="form.web_cms_consignee_name" class="form-control form-control-sm uppercase-only" placeholder="Company Name" autocomplete="off">

                                                                <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="consignee_list_id" @click="showCustModal = true">
                                                                    <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                                </button>
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
                                                            <textarea v-model="form.web_cms_consignee_address" cols="30" rows="1" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Address" autocomplete="off"></textarea>
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
                                                            <input type="text" v-model="form.web_cms_consignee_postal_code" class="form-control form-control-sm uppercase-only" placeholder="Postal Code" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                            <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Country / Territory</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <select v-model="form.web_cms_consignee_country" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected=""></option>
                                                                <option value="AF">AF - Afghanistan</option>
                                                                <option value="AL"> AL - Albania</option>
                                                                <option value="DZ">DZ - Algeria</option>
                                                                <option value="AS">AS - American Samoa</option>
                                                                <option value="AD">AD - Andorra</option>
                                                                <option value="AO">AO - Angola</option>
                                                                <option value="AI">AI - Anguilla</option>
                                                                <option value="AQ">AQ - Antarctica</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                            <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>State TAX ID/I.E.</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.web_cms_consignee_state_tax" class="form-control form-control-sm uppercase-only" placeholder="State TAX ID/I.E." autocomplete="off">
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
                                                            <select v-model="form.web_cms_consignee_city" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected=""></option>
                                                                
                                                            </select>
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
                                                            <input type="text" v-model="form.web_cms_consignee_contract_name" class="form-control form-control-sm uppercase-only" placeholder="Contract Name" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_consignee_phone_number" class="form-control form-control-sm uppercase-only" placeholder="Phone Number" autocomplete="off">
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
                                                            <input type="email" v-model="form.web_cms_consignee_email" class="form-control form-control-sm" placeholder="Email" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_consignee_carrier" class="form-control form-control-sm uppercase-only" placeholder="Carrier" autocomplete="off">
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
                                <td colspan="3">
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
                                                        <th style="width: 40px;">PKG</th>
                                                        <th style="width: 120px;">Type</th>
                                                        <th style="width: 90px;">G.WT</th>
                                                        <th style="width: 40px;">Type</th>
                                                        <th style="width: 90px;">Length</th>
                                                        <th style="width: 90px;">Width</th>
                                                        <th style="width: 90px;">Height</th>
                                                        <th style="width: 110px;">C.WT</th>
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
                                                        <input v-model="row.qty" @input="validateNumber(row, 'qty', $event)" type="text" class="form-control form-control-sm text-center">
                                                        </td>
                                                        <td>
                                                        <slot>
                                                            <select v-model="row.type" class="form-select form-select-sm">
                                                            <option value=""></option>
                                                            <option v-for="type in pkgTypes" :key="type.value" :value="type.value">
                                                                {{ type.label }}
                                                            </option>
                                                            </select>
                                                        </slot>
                                                        </td>
                                                        <td>
                                                        <input v-model="row.weight" @input="validateNumber(row, 'weight', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                        <select v-model="row.weightType" class="form-select form-select-sm">
                                                            <option value="kg">kg</option>
                                                            <option value="lb">lb</option>
                                                        </select>
                                                        </td>
                                                        <td>
                                                        <input v-model="row.length" @input="validateNumber(row, 'length', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                        <input v-model="row.width" @input="validateNumber(row, 'width', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                        <input v-model="row.height" @input="validateNumber(row, 'height', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                        <input :value="row.chargeableWeight" type="text" class="form-control form-control-sm" placeholder="0.000" readonly>
                                                        </td>
                                                        <td>
                                                        <select v-model="row.dimensionType" class="form-select form-select-sm">
                                                            <option value="cm">cm</option>
                                                            <option value="in">in</option>
                                                            <option value="mm">mm</option>
                                                        </select>
                                                        </td>
                                                        <td>
                                                        <textarea v-model="row.remarks" cols="30" rows="1" class="form-control form-control-sm text-uppercase" style="min-height: 28px !important;"></textarea>
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
                                                        <td class="text-center"><strong>{{ totalQty }}</strong></td>
                                                        <td></td>
                                                        <td><strong>{{ totalWeight }}</strong></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><strong>{{ totalChargeableWeight }}</strong></td>
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
                                <td colspan="3">
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
                                                        <th style="width: 40px;">PKG</th>
                                                        <th style="width: 120px;">Type</th>
                                                        <th style="width: 90px;">G.WT</th>
                                                        <th style="width: 40px;">Type</th>
                                                        <th style="width: 90px;">Length</th>
                                                        <th style="width: 90px;">Width</th>
                                                        <th style="width: 90px;">Height</th>
                                                        <th style="width: 110px;">C.WT</th>
                                                        <th style="width: 50px;">Type</th>
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
                                                        <td class="text-center row-sl">{{ index + 1 }}</td>
                                                        <td>
                                                        <input v-model.number="row.qty" @input="calculateItemChargeableWeight(row)" type="text" class="form-control form-control-sm text-center">
                                                        </td>
                                                        <td>
                                                        <select v-model="row.type" class="form-select form-select-sm">
                                                            <option value=""></option>
                                                            <option v-for="type in itemPkgTypes" :key="type.value" :value="type.value">
                                                            {{ type.label }}
                                                            </option>
                                                        </select>
                                                        </td>
                                                        <td>
                                                        <input v-model="row.weight" @input="validateNumber(row, 'weight', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                        <select v-model="row.weightType" class="form-select form-select-sm">
                                                            <option value="kg">kg</option>
                                                            <option value="lb">lb</option>
                                                        </select>
                                                        </td>
                                                        <td>
                                                        <input v-model="row.length" @input="validateNumber(row, 'length', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                        <input v-model="row.width" @input="validateNumber(row, 'width', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                            <input v-model="row.height" @input="validateNumber(row, 'height', $event)" type="text" class="form-control form-control-sm" placeholder="0.000">
                                                        </td>
                                                        <td>
                                                        <input :value="row.chargeableWeight" type="text" class="form-control form-control-sm" placeholder="0.000" readonly>
                                                        </td>
                                                        <td>
                                                        <select v-model="row.dimensionType" class="form-select form-select-sm">
                                                            <option value="cm">cm</option>
                                                            <option value="in">in</option>
                                                            <option value="mm">mm</option>
                                                        </select>
                                                        </td>
                                                        <td>
                                                        <textarea v-model="row.remarks" cols="30" rows="1" class="form-control form-control-sm text-uppercase" style="min-height: 28px !important;"></textarea>
                                                        </td>
                                                        <td class="text-center">
                                                        <button @click="deleteItemRow(index)" type="button" class="btn btn-danger btn-cargoaim btn-sm delete-row">
                                                            <i class="fa-solid fa-xmark"></i>
                                                        </button>
                                                        </td>
                                                    </tr>
                                                    </tbody>

                                                    <tfoot>
                                                    <tr>
                                                        <td></td>
                                                        <td class="text-center"><strong>{{ totalItemQty }}</strong></td>
                                                        <td></td>
                                                        <td><strong>{{ totalItemWeight }}</strong></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><strong>{{ totalItemChargeableWeight }}</strong></td>
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
                                <td colspan="3">
                                    <div class="card card_children shadow-sm dangerous-good-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center gap-2">
                                                <h5 class="header_title_children mb-0">
                                                    <i class="fa-solid fa-triangle-exclamation text-warning"></i>
                                                    Dangerous Goods
                                                </h5>

                                                <input
                                                    type="checkbox"
                                                    v-model="form.web_cms_dg"
                                                    title="Dangerous Goods"
                                                >
                                            </div>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>

                                                        <td style="width:20%">
                                                            <label class="form-label">IMO Class :</label>

                                                            <input
                                                                type="text"
                                                                v-model="form.web_cms_dg_imo_class"
                                                                class="form-control form-control-sm uppercase-only mt2_mb1"
                                                                autocomplete="off"
                                                                :disabled="!form.web_cms_dg"
                                                                :required="form.web_cms_dg"
                                                            >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">UN NO :</label>

                                                            <input
                                                                type="text"
                                                                v-model="form.web_cms_dg_un_no"
                                                                class="form-control form-control-sm uppercase-only mt2_mb1"
                                                                autocomplete="off"
                                                                :disabled="!form.web_cms_dg"
                                                                :required="form.web_cms_dg"
                                                            >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">Package Group :</label>

                                                            <input
                                                                type="text"
                                                                v-model="form.web_cms_dg_pkg_group"
                                                                class="form-control form-control-sm uppercase-only mt2_mb1"
                                                                autocomplete="off"
                                                                :disabled="!form.web_cms_dg"
                                                                :required="form.web_cms_dg"
                                                            >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">Flash Point :</label>

                                                            <input
                                                                type="text"
                                                                v-model="form.web_cms_dg_flash_point"
                                                                class="form-control form-control-sm uppercase-only mt2_mb1"
                                                                autocomplete="off"
                                                                :disabled="!form.web_cms_dg"
                                                                :required="form.web_cms_dg"
                                                            >
                                                        </td>

                                                        <td style="width:20%">
                                                            <label class="form-label">Upload File :</label>

                                                            <label
                                                                class="file-upload-container"
                                                                :style="!form.web_cms_dg ? 'pointer-events:none;opacity:.5;' : ''"
                                                            >

                                                                <input
                                                                    type="file"
                                                                    class="file-input"
                                                                    multiple
                                                                    :disabled="!form.web_cms_dg"
                                                                    @change="handleDGFileChange"
                                                                >

                                                                <i
                                                                    v-if="form.web_cms_dg_files.length === 0"
                                                                    class="fas fa-cloud-upload-alt file-upload-icon"
                                                                ></i>

                                                                <span
                                                                    v-else
                                                                    class="file-count-text"
                                                                >
                                                                    {{ form.web_cms_dg_files.length }} file(s) selected
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
                                <td colspan="3">
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
                                                            <input type="date" v-model="form.web_cms_service_date" class="form-control form-control-sm" autocomplete="off">
                                                        </td>
                                                        <td style="width: 33%">
                                                            <label class="form-label">Services : </label>
                                                            <select v-model="form.web_cms_service_type" class="form-select form-select-sm" autocomplete="off">
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
                                                            <select v-model="form.web_cms_service_signature" class="form-select form-select-sm" autocomplete="off">
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
                                <td colspan="3">
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
                                                            <input type="text" v-model="form.web_cms_shipment_ref" class="form-control form-control-sm uppercase-only" placeholder="Shipment References" autocomplete="off">
                                                        </td>
                                                        <td style="width: 12%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>P.O.NO</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 31%;">
                                                            <input type="text" v-model="form.web_cms_po_no" class="form-control form-control-sm uppercase-only" placeholder="P.O.NO" autocomplete="off">
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
                                                                            <input type="text" v-model="form.web_cms_invoice_no" class="form-control form-control-sm uppercase-only" placeholder="Invoice No" autocomplete="off">
                                                                        </td>
                                                                        <td style="width: 15%;">
                                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                                <span>Upload File</span>
                                                                                <span>:</span>
                                                                            </div>
                                                                        </td>
                                                                        <td style="width: 28%;">
                                                                            <label class="file-upload-container">
                                                                                <input
                                                                                    type="file"
                                                                                    name="invoice_upload_file[]"
                                                                                    class="file-input"
                                                                                    multiple
                                                                                    @change="handleInvoiceFileChange"
                                                                                />

                                                                                <i
                                                                                    v-if="form.web_cms_invoice_upload_file.length === 0"
                                                                                    class="fas fa-cloud-upload-alt file-upload-icon"
                                                                                ></i>

                                                                                <span
                                                                                    v-else
                                                                                    class="file-count-text"
                                                                                >
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
                                                            <input type="text" v-model="form.web_cms_department_no" class="form-control form-control-sm uppercase-only" placeholder="Department No" autocomplete="off">
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
                                                            <select v-model="form.web_cms_comm_doc_type" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="" selected="">Select Commercial Document  Type</option>
                                                                <option value="User"> User Uploaded </option>
                                                                <option value="System"> System Generated </option>
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
                                <td colspan="3">
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
                                                            <select v-model="form.web_cms_picup_drop_off_type" class="form-select form-select-sm" autocomplete="off">
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
                                                                <input type="date" v-model="form.web_cms_picup_drop_off_date" class="form-control form-control-sm" data-date-format="d-M-Y" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_earliest_possible_time" class="form-control form-control-sm flatpickr-input" data-provider="timepickr" data-time-basic="true" placeholder="Select Earliest Possible Time" autocomplete="off" readonly="readonly">
                                                        </td>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Latest Possible Time</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.web_cms_latest_possible_time" class="form-control form-control-sm flatpickr-input" data-provider="timepickr" data-time-basic="true" placeholder="Select Latest Possible Time" autocomplete="off" readonly="readonly">
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
                                                            <select v-model="form.web_cms_picup_instructions" class="form-select form-select-sm" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_picup_drop_off_name" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Contract Person Name" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_picup_drop_off_phone" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Phone Number" autocomplete="off">
                                                        </td>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Ship From</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="email" v-model="form.web_cms_picup_drop_off_email" class="form-control form-control-sm mt2_mb1" placeholder="EMAIL" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>PICKUP ADDRESS</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td colspan="3">
                                                            <textarea v-model="form.web_cms_picup_drop_off_address" cols="30" rows="1" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="PICKUP ADDRESS" autocomplete="off"></textarea>
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
                                <td colspan="3">
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
                                                            <select v-model="form.web_cms_billing_type" class="form-select form-select-sm" autocomplete="off">
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
                                                            <input type="text" v-model="form.web_cms_account_no" class="form-control form-control-sm uppercase-only" placeholder="Account No" autocomplete="off">
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
                                <td colspan="3">
                                    <div class="card card_children shadow-sm billing-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="header_title_children mb-0"><i class="fa-solid fa-floppy-disk"></i> Save Shipment Profile Name</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 160px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Shipment Profile Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" v-model="form.web_cms_save_shipment_rofile" class="form-control form-control-sm uppercase-only" placeholder="Save Shipment Profile Name" autocomplete="off">
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
                    <button type="submit" class="btn btn-primary btn-cargoaim bg-gradient" id="courier_btn">
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
    #consignee_list_id {
        width: 30px;
    }
    input::placeholder, 
    textarea::placeholder {
        font-size: 12px!important;
    }
    .input-group-text{
        padding: .375rem .40rem;
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



    
</style>
