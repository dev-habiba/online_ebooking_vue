<script setup>
    
</script>

<template>
    <div class="card booking_card">
        <div class="card-header border-bottom dot_border bg-gradient d-flex align-items-center">
            <h5 class="header-title"> COURIER BOOKINGS </h5>
        </div>

        
        <div class="card-body">
            <form id="courier_booking_form" method="POST" action="http://cargoaimonline.test/my_bookings/courier" enctype="multipart/form-data" autocomplete="off">
                <input type="hidden" name="_token" value="FErwVRUrbFl22OS0oq9fbWUk724YMH3aISxG4pyG" autocomplete="off">
                <div class="table-responsive box-border couriar_table">
                    <table class="table table-borderless">
                        <tbody>
                            <tr class="border-bootom-dotted">
                                <td colspan="3" class="">
                                    <div class="card shadow-sm shipment-profile-card mb-3">
                                        <div class="card-header bg-light bg-gradient py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-house"></i> </h5>
                                            <h5 class="hbl_show mb-0"> </h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <input type="hidden" name="row_id" id="row_id">

                                                            <label class="form-label"> Load Shipment Profile : </label>
                                                            <select name="shipment_profile" id="shipment_profile" class="form-select form-select-sm" autocomplete="off"><option value=""></option>
                                                                <option value="FILE">FILE</option> 
                                                                <option value="TEST">TEST</option>
                                                                <option value="TEST 2">TEST 2</option>
                                                                <option value="TEST 3">TEST 3</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <label class="form-label"> Export/Import : </label>
                                                            <select name="imp_exp" id="imp_exp" class="form-select form-select-sm" autocomplete="off">
                                                                <option value="1"> Outbound Shipment </option>
                                                                <option value="2"> Inbound Shipment </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <label for="inputEmail4" class="form-label"> Ship From :</label>
                                                            <div class="position-relative">
                                                                <input type="hidden" name="ship_form_code" id="ship_form_code" class="uppercase-only">

                                                                <div class="input-group online_bkg_search_inp">
                                                                    <input type="text" name="ship_form" id="ship_form" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH IN ADDRESS BOOK" autocomplete="off">

                                                                    <span class="input-group-text search_keyword search_keyword_enty_form">
                                                                        <i class="fa-solid fa-magnifying-glass"></i>
                                                                    </span>
                                                                </div>
                                                                
                                                                <div id="pol_loader" class="pol_loader circle-dot-loader" style="display:none;">
                                                                    <div></div><div></div><div></div><div></div>
                                                                    <div></div><div></div><div></div><div></div>
                                                                </div>

                                                                <div id="pol_suggestions_box" class="global-suggestions-box" style="width: 540px!important;"></div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <label for="inputPassword4" class="form-label"> Deliver / Ship To :</label>

                                                            <div class="position-relative">
                                                                <input type="hidden" name="ship_to_code" id="ship_to_code" class="uppercase-only">
                                                                
                                                                <div class="input-group online_bkg_search_inp">
                                                                    <input type="text" name="ship_to" id="ship_to" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH IN ADDRESS BOOK" autocomplete="off">

                                                                    <span class="input-group-text search_keyword search_keyword_enty_form">
                                                                        <i class="fa-solid fa-magnifying-glass"></i>
                                                                    </span>
                                                                </div>

                                                                <div id="pod_loader" class="pod_loader circle-dot-loader" style="display:none;">
                                                                    <div></div><div></div><div></div><div></div>
                                                                    <div></div><div></div><div></div><div></div>
                                                                </div>

                                                                <div id="pod_suggestions_box" class="global-suggestions-box" style="width: 540px!important; right: 0px; left: auto;"></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr class="border-bootom-dotted">
                                <td style="width: 49.5%">
                                    <div class="card shadow-sm shipper-card mb-3">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <iconify-icon icon="mdi:account-tie" class="align-middle" style="font-size: 16px;"><template shadowrootmode="open"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"></path></svg></template></iconify-icon>
                                                Shipper Contact Details
                                            </h5>
                                            <button type="button" id="save_shipper_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Company Name</span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex gap-1 align-items-center">
                                                            <input type="hidden" name="shipper_code" id="shipper_code" value="NMS20260705131817">

                                                            <input type="text" name="shipper_name" id="shipper_name" class="form-control form-control-sm uppercase-only" placeholder="Company Name">

                                                            <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="shipper_list_id">
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
                                                        <textarea name="shipper_address" id="shipper_address" cols="30" rows="1" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Address" autocomplete="off"></textarea>
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
                                                        <input type="text" name="shipper_postal_code" id="shipper_postal_code" class="form-control form-control-sm uppercase-only" placeholder="Postal Code" autocomplete="off">
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
                                                        <select name="shipper_country" id="shipper_country" class="form-select form-select-sm" autocomplete="off">
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
                                                        <input type="text" name="shipper_state_tax" id="shipper_state_tax" class="form-control form-control-sm uppercase-only" placeholder="State TAX ID/I.E." autocomplete="off">
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
                                                        <select name="shipper_city" id="shipper_city" class="form-select form-select-sm" autocomplete="off">
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
                                                        <input type="text" name="shipper_contract_name" id="shipper_contract_name" class="form-control form-control-sm uppercase-only" placeholder="Contract Name" autocomplete="off">
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
                                                        <input type="text" name="shipper_phone_number" id="shipper_phone_number" class="form-control form-control-sm" placeholder="Phone Number" autocomplete="off">
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
                                                        <input type="email" name="shipper_email" id="shipper_email" class="form-control form-control-sm" placeholder="Email" autocomplete="off">
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
                                                        <input type="text" name="shipper_carrier" id="shipper_carrier" class="form-control form-control-sm uppercase-only" placeholder="Carrier" autocomplete="off">
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>
                                </td>

                                <td style="width: 1%;"></td>

                                <td>
                                    <div class="card shadow-sm consinee-card mb-3">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <iconify-icon icon="mdi:account-tie" class="align-middle" style="font-size: 16px;"><template shadowrootmode="open"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"></path></svg></template></iconify-icon> 
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
                                                        <td style="width: 140px;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Company Name</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="d-flex gap-1 align-items-center">
                                                                <input type="hidden" name="consignee_code" id="consignee_code" value="NMS20260705131817" class="uppercase-only">
                                                            
                                                                <input type="text" name="consignee_name" id="consignee_name" class="form-control form-control-sm uppercase-only" placeholder="Company Name" autocomplete="off">

                                                                <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="consignee_list_id">
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
                                                            <textarea name="consignee_address" id="consignee_address" cols="30" rows="1" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Address" autocomplete="off"></textarea>
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
                                                            <input type="text" name="consignee_postal_code" id="consignee_postal_code" class="form-control form-control-sm uppercase-only" placeholder="Postal Code" autocomplete="off">
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
                                                            <select name="consignee_country" id="consignee_country" class="form-select form-select-sm" autocomplete="off">
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
                                                            <input type="text" name="consignee_state_tax" id="consignee_state_tax" class="form-control form-control-sm uppercase-only" placeholder="State TAX ID/I.E." autocomplete="off">
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
                                                            <select name="consignee_city" id="consignee_city" class="form-select form-select-sm" autocomplete="off">
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
                                                            <input type="text" name="consignee_contract_name" id="consignee_contract_name" class="form-control form-control-sm uppercase-only" placeholder="Contract Name" autocomplete="off">
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
                                                            <input type="text" name="consignee_phone_number" id="consignee_phone_number" class="form-control form-control-sm uppercase-only" placeholder="Phone Number" autocomplete="off">
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
                                                            <input type="email" name="consignee_email" id="consignee_email" class="form-control form-control-sm" placeholder="Email" autocomplete="off">
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
                                                            <input type="text" name="consignee_carrier" id="consignee_carrier" class="form-control form-control-sm uppercase-only" placeholder="Carrier" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="3">
                                    <div class="card shadow-sm mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-box"></i> PACKAGES &amp; ITEMS DETAILS</h5>
                                            <div style="width: 250px; display: flex; align-items: center; gap: 8px;">
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
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="table-responsive package_table">
                                                        <table class="table table-bordered table-striped align-middle m-0">
                                                            <thead>
                                                                <tr class="text-muted small text-center" style="white-space: nowrap; vertical-align: middle;">
                                                                    <th style="width: 20px;">SN</th>
                                                                    <th style="width: 40px;">PKG</th>
                                                                    <th style="width: 50px;">Type</th>
                                                                    <th style="width: 63px;">G.WT</th>
                                                                    <th style="width: 40px;">Type</th>
                                                                    <th style="width: 65px;">Length</th>
                                                                    <th style="width: 65px;">Width</th>
                                                                    <th style="width: 65px;">Height</th>
                                                                    <th style="width: 65px;">C.WT</th>
                                                                    <th style="width: 40px;">Type</th>
                                                                    <th>REMARK</th>
                                                                    <th class="text-center" style="width: 35px;">
                                                                        <button type="button" id="pkg_add_row_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient open-second-modal plus-box-btn ml4" data-bs-target="#customerModal"> 
                                                                            <i class="fa-solid fa-square-plus"></i>
                                                                        </button>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="pkg_details_table_body">
                                                                <tr data-index="0">
                                                                    <td class="text-center row-sl">1</td>
                                                                    <td>
                                                                        <input type="hidden" name="pkg_row_id[0]" id="pkg_row_id0">

                                                                        <input name="doc_page_pkg_pkg_qty[0]" id="doc_page_pkg_pkg_qty0" type="text" class="form-control form-control-sm doc_page_pkg_pkg_qty" placeholder="" value="1">
                                                                    </td>
                                                                    <td>
                                                                        <select name="doc_page_pkg_pkg_type[0]" id="doc_page_pkg_pkg_type0" class="form-select form-select-sm">
                                                                            <option value=""></option>
                                                                            <option value="AM">AM-Ampoule, non-protect</option>
                                                                            <option value="AP">AP-Ampoule, protected</option>
                                                                            <option value="BG">BG-Bag</option>
                                                                            <option value="5L">5L-Bag, textile</option>
                                                                            <option value="BL">BL-Bale</option>
                                                                            <option value="BF">BF-Balloon, non-protect</option>
                                                                            <option value="BX">BX-Box</option>
                                                                            <option value="4A">4A-Box, steel</option>
                                                                            <option value="BE">BE-Bundle</option>
                                                                            <option value="CI">CI-Canister</option>
                                                                            <option value="CO">CO-Carboy, non-protecte</option>
                                                                            <option value="CT">CT-CARTON</option>
                                                                            <option value="CQ">CQ-Cartridge</option>
                                                                            <option value="CS">CS-Case</option>
                                                                            <option value="EF">EF-Case, with pallet ba</option>
                                                                            <option value="ED">ED-Case, with pallet ba</option>
                                                                            <option value="CR">CR-Crate</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_pkg_weight[0]" id="doc_page_pkg_weight0" type="text" class="form-control form-control-sm doc_page_pkg_weight" placeholder="0.000">
                                                                    </td>
                                                                    <td>
                                                                        <select name="doc_page_pkg_weight_type[0]" id="doc_page_pkg_weight_type0" class="form-select form-select-sm">
                                                                            <option value="kg">kg</option>
                                                                            <option value="lb">lb</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_pkg_length[0]" id="doc_page_pkg_length0" type="text" class="form-control form-control-sm length" placeholder="0.000">
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_pkg_width[0]" id="doc_page_pkg_width0" type="text" class="form-control form-control-sm width" placeholder="0.000">
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_pkg_height[0]" id="doc_page_pkg_height0" type="text" class="form-control form-control-sm height" placeholder="0.000">
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_pkg_chargeable_weight[0]" id="doc_page_pkg_chargeable_weight0" type="text" class="form-control form-control-sm doc_page_pkg_chargeable_weight" placeholder="0.000" readonly="">
                                                                    </td>
                                                                    <td>
                                                                        <select name="doc_page_pkg_dimension_type[0]" id="doc_page_pkg_dimension_type0" class="form-select form-select-sm">
                                                                            <option value="cm">cm</option>
                                                                            <option value="in">in</option>
                                                                            <option value="mm">mm</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <textarea name="doc_page_pkg_remarks[0]" id="doc_page_pkg_remarks0" cols="30" rows="1" class="form-control form-control-sm uppercase-only" style="min-height: 28px !important;"></textarea>
                                                                    </td>
                                                                    <td class="text-center">
                                                                        <button type="button" class="btn btn-danger btn-cargoaim btn-sm delete-row">
                                                                            <i class="fa-solid fa-xmark"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>

                                                            <tfoot>
                                                                <tr>
                                                                    <td></td>
                                                                    <td>
                                                                        <span id="total_pkg_qty">0</span>
                                                                    </td>
                                                                    <td class="text-end"></td>
                                                                    <td>
                                                                        <span id="total_pkg_weight">0</span>
                                                                    </td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>
                                                                        <span id="total_pkg_chargeable_weight">0</span>
                                                                    </td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>

                                                <div class="col-6">
                                                    <div class="table-responsive items_table">
                                                        <table class="table table-bordered table-striped align-middle m-0">
                                                            <thead>
                                                                <tr class="text-muted small text-center" style="white-space: nowrap; vertical-align: middle;">
                                                                    <th style="width: 20px;">SN</th>
                                                                    <th style="width: 120px;">Item Name</th>
                                                                    <th style="width: 55px;">QTY</th>
                                                                    <th style="width: 60px;">Value($)</th>
                                                                    <th style="width: 60px;">Currency</th>
                                                                    <th style="width: 60px;">HS CODE</th>
                                                                    <th style="width: 60px;">N.WT</th>
                                                                    <th style="width: 63px;">Type</th>
                                                                    <th style="width: 63px;">C/O</th>
                                                                    <th>REMARK</th>
                                                                    <th class="text-center" style="width: 35px;">
                                                                        <button type="button" id="item_add_row_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient open-second-modal plus-box-btn ml4" data-bs-target="#customerModal"> 
                                                                            <i class="fa-solid fa-square-plus"></i>
                                                                        </button>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="item_details_table_body">
                                                                <tr data-index="0">
                                                                    <td class="text-center item-row-sl">1</td>
                                                                    <td>
                                                                        <input type="hidden" name="item_row_id[0]" id="item_row_id0">

                                                                        <input type="text" name="doc_page_item_full_name[0]" id="doc_page_item_full_name0" class="form-control uppercase-only form-control-sm" placeholder="">
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_item_quantity[0]" id="doc_page_item_quantity0" type="text" class="form-control form-control-sm qty">
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_item_customs_value[0]" id="doc_page_item_customs_value0" type="text" class="form-control form-control-sm doc_page_item_customs_value">
                                                                    </td>

                                                                    <td>
                                                                        <select name="doc_page_item_currency[0]" id="doc_page_item_currency0" class="form-select form-select-sm">
                                                                            <option value=""></option>
                                                                            <option value="BDT">BDT-Bangladeshi Taka</option>
                                                                            <option value="CNY">CNY-Chinese Yuan Renminbi</option>
                                                                            <option value="EUR">EUR-European euro</option>
                                                                            <option value="HKD">HKD-Hong Kong dollar</option>
                                                                            <option value="INR">INR-Indian rupee</option>
                                                                            <option value="SGD">SGD-Singapore dollar</option>
                                                                            <option value="USD">USD-United States Dollar</option>
                                                                            <option value="AED">AED-UAE dirham</option>
                                                                            <option value="CAD">CAD-Canadian dollar</option>
                                                                            <option value="BDT">BDT-Bangladeshi Taka</option>
                                                                            <option value="CNY">CNY-Chinese Yuan Renminbi</option>
                                                                            <option value="EUR">EUR-European euro</option>
                                                                            <option value="HKD">HKD-Hong Kong dollar</option>
                                                                            <option value="INR">INR-Indian rupee</option>
                                                                            <option value="SGD">SGD-Singapore dollar</option>
                                                                            <option value="USD">USD-United States Dollar</option>
                                                                            <option value="AED">AED-UAE dirham</option>
                                                                            <option value="BDT">BDT-Bangladeshi Taka</option>
                                                                            <option value="CNY">CNY-Chinese Yuan Renminbi</option>
                                                                            <option value="EUR">EUR-European euro</option>
                                                                            <option value="HKD">HKD-Hong Kong dollar</option>
                                                                            <option value="INR">INR-Indian rupee</option>
                                                                            <option value="SGD">SGD-Singapore dollar</option>
                                                                            <option value="USD">USD-United States Dollar</option>
                                                                            <option value="AED">AED-UAE dirham</option>
                                                                            <option value="CAD">CAD-Canadian dollar</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_item_hs_code[0]" id="doc_page_item_hs_code0" type="text" class="form-control form-control-sm hs_code">
                                                                    </td>
                                                                    <td>
                                                                        <input name="doc_page_item_weight[0]" id="doc_page_item_weight0" type="text" class="form-control form-control-sm doc_page_item_weight" placeholder="">
                                                                    </td>
                                                                    <td>
                                                                        <select name="doc_page_item_weight_type[0]" id="doc_page_item_weight_type0" class="form-select form-select-sm">
                                                                            <option value="kg">kg</option>
                                                                            <option value="lb">lb</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select name="doc_page_item_made_in[0]" id="doc_page_item_made_in0" class="form-select form-select-sm">
                                                                            <option value=""></option>
                                                                            <option value="AF">AF-Afghanistan</option>
                                                                            <option value="AL">AL-Albania</option>
                                                                            <option value="DZ">DZ-Algeria</option>
                                                                            <option value="AS">AS-American Samoa</option>
                                                                            <option value="AD">AD-Andorra</option>
                                                                            <option value="AO">AO-Angola</option>
                                                                            <option value="AI">AI-Anguilla</option>
                                                                            <option value="AQ">AQ-Antarctica</option>
                                                                            <option value="AG">AG-Antigua and Barbuda</option>
                                                                            <option value="AR">AR-Argentina</option>
                                                                            <option value="AM">AM-Armenia</option>
                                                                            <option value="AW">AW-Aruba</option>
                                                                            <option value="AU">AU-Australia</option>
                                                                            <option value="AT">AT-Austria</option>
                                                                            <option value="AZ">AZ-Azerbaijan</option>
                                                                            <option value="BS">BS-Bahamas</option>
                                                                            <option value="BH">BH-Bahrain</option>
                                                                            <option value="BD">BD-Bangladesh</option>
                                                                            <option value="BB">BB-Barbados</option>
                                                                            <option value="BY">BY-Belarus</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <textarea name="doc_page_item_remarks[0]" id="doc_page_item_remarks0" cols="30" rows="1" class="form-control form-control-sm uppercase-only" style="min-height: 28px !important;"></textarea>
                                                                    </td>
                                                                    <td class="text-center">
                                                                        <button type="button" class="btn btn-danger btn-cargoaim btn-sm items-delete-row">
                                                                            <i class="fa-solid fa-xmark"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>

                                                            <tfoot>
                                                                <tr>
                                                                    <td></td>
                                                                    <td class="text-end"></td>
                                                                    <td>
                                                                        <span id="total_item_qty">0</span>
                                                                    </td>
                                                                    <td>
                                                                        <span id="total_item_value">0</span>
                                                                    </td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>
                                                                        <span id="total_doc_page_item_weight">0</span>
                                                                    </td>
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
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="3">
                                    <div class="card shadow-sm dangerous-good-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center gap-2">
                                                <h5 class="mb-0"><i class="fa-solid fa-triangle-exclamation text-warning"></i> Dangerous Goods</h5>
                                                <input type="checkbox" id="dg" name="dg" value="Bike" title="Dangerous Goods">
                                            </div>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 20%">
                                                            <label class="form-label">IMO Class : </label>
                                                            <input type="text" name="dg_imo_class" id="dg_imo_class" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="" autocomplete="off" readonly="">
                                                        </td>
                                                        <td style="width: 20%">
                                                            <label class="form-label">UN NO : </label>
                                                            <input type="text" name="dg_un_no" id="dg_un_no" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="" autocomplete="off" readonly="">
                                                        </td>
                                                        <td style="width: 20%">
                                                            <label class="form-label">Package Group : </label>
                                                            <input type="text" name="dg_pkg_group" id="dg_pkg_group" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="" autocomplete="off" readonly="">
                                                        </td>
                                                        <td style="width: 20%">
                                                            <label class="form-label">Flash Point : </label>
                                                            <input type="text" name="dg_flash_point" id="dg_flash_point" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="" autocomplete="off" readonly="">
                                                        </td>
                                                        <td style="width: 20%">
                                                            <label class="form-label">Upload File : </label>
                                                            <label class="file-upload-container">
                                                                <input type="file" name="dg_file_upload[]" id="dg_file_upload" class="file-input" multiple="" readonly="" autocomplete="off">
                                                                <span class="file-upload-icon"><i class="fas fa-cloud-upload-alt dg_file_upload_icon"></i></span>
                                                                <span class="file-count-text file-count-dg"></span>
                                                                <div class="drag-overlay">
                                                                    <i class="fas fa-upload"></i>
                                                                    <span>Drop files here</span>
                                                                </div>
                                                            </label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="3">
                                    <div class="card shadow-sm service-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-toolbox"></i> Service Details</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 34%">
                                                            <label class="form-label">Date : </label>
                                                            <input type="text" name="service_date" id="service_date" class="form-control form-control-sm border-0 shadow flatpickr-input" data-provider="flatpickr" data-date-format="d-M-Y" value="2026-07-05 07:18:18" autocomplete="off">
                                                        </td>
                                                        <td style="width: 33%">
                                                            <label class="form-label">Services : </label>
                                                            <select name="service_type" id="service_type" class="form-select form-select-sm" autocomplete="off">
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
                                                            <select name="service_signature" id="service_signature" class="form-select form-select-sm" autocomplete="off">
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

                            <tr>
                                <td colspan="3">
                                    <div class="card shadow-sm additional-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-circle"></i> Additional Options</h5>
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
                                                            <input type="text" name="shipment_ref" id="shipment_ref" class="form-control form-control-sm uppercase-only" placeholder="Shipment References" autocomplete="off">
                                                        </td>
                                                        <td style="width: 12%;">
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>P.O.NO</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td style="width: 31%;">
                                                            <input type="text" name="po_no" id="po_no" class="form-control form-control-sm uppercase-only" placeholder="P.O.NO" autocomplete="off">
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
                                                                            <input type="text" name="invoice_no" id="invoice_no" class="form-control form-control-sm uppercase-only" placeholder="Invoice No" autocomplete="off">
                                                                        </td>
                                                                        <td style="width: 15%;">
                                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                                <span>Upload File</span>
                                                                                <span>:</span>
                                                                            </div>
                                                                        </td>
                                                                        <td style="width: 28%;">
                                                                            <label class="file-upload-container">
                                                                                <input type="file" name="invoice_upload_file[]" id="invoice_upload_file" class="file-input" multiple="" autocomplete="off">
                                                                                <span class="file-upload-icon"><i class="fas fa-cloud-upload-alt invo_file_upload_icon"></i></span>
                                                                                <span class="file-count-text file-count-invo"></span>
                                                                                <div class="drag-overlay">
                                                                                    <i class="fas fa-upload"></i>
                                                                                    <span>Drop files here</span>
                                                                                </div>
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
                                                            <input type="text" name="department_no" id="department_no" class="form-control form-control-sm uppercase-only" placeholder="Department No" autocomplete="off">
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
                                                            <select name="comm_doc_type" id="comm_doc_type" class="form-select form-select-sm" autocomplete="off">
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

                            <tr>
                                <td colspan="3">
                                    <div class="card shadow-sm pickup-drop-off-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-truck"></i> Pickup/Drop-off </h5>
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
                                                            <select name="picup_drop_off_type" id="picup_drop_off_type" class="form-select form-select-sm" autocomplete="off">
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
                                                                <input type="text" name="picup_drop_off_date" id="picup_drop_off_date" class="form-control form-control-sm border-0 shadow flatpickr-input" data-provider="flatpickr" data-date-format="d-M-Y" value="2026-07-05 07:18:18" autocomplete="off">
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
                                                            <input type="text" name="earliest_possible_time" id="earliest_possible_time" class="form-control form-control-sm flatpickr-input" data-provider="timepickr" data-time-basic="true" placeholder="Select Earliest Possible Time" autocomplete="off" readonly="readonly">
                                                        </td>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Latest Possible Time</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="text" name="latest_possible_time" id="latest_possible_time" class="form-control form-control-sm flatpickr-input" data-provider="timepickr" data-time-basic="true" placeholder="Select Latest Possible Time" autocomplete="off" readonly="readonly">
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
                                                            <select name="picup_instructions" id="picup_instructions" class="form-select form-select-sm" autocomplete="off">
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
                                                            <input type="text" name="picup_drop_off_name" id="picup_drop_off_name" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Contract Person Name" autocomplete="off">
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
                                                            <input type="text" name="picup_drop_off_phone" id="picup_drop_off_phone" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="Phone Number" autocomplete="off">
                                                        </td>
                                                        <td>
                                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span>Ship From</span>
                                                                <span>:</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="email" name="picup_drop_off_email" id="picup_drop_off_email" class="form-control form-control-sm mt2_mb1" placeholder="EMAIL" autocomplete="off">
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
                                                            <textarea name="picup_drop_off_address" id="picup_drop_off_address" cols="30" rows="1" class="form-control form-control-sm uppercase-only mt2_mb1" placeholder="PICKUP ADDRESS" autocomplete="off"></textarea>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>

                            <tr>
                                <td colspan="3">
                                    <div class="card shadow-sm billing-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-money-bills"></i> Billing Details</h5>
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
                                                            <select name="billing_type" id="billing_type" class="form-select form-select-sm" autocomplete="off">
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
                                                            <input type="text" name="account_no" id="account_no" class="form-control form-control-sm uppercase-only" placeholder="Account No" autocomplete="off">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>


                            <tr id="saveShipmentRow">
                                <td colspan="3">
                                    <div class="card shadow-sm billing-card mb-3">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-floppy-disk"></i> Save Shipment Profile Name</h5>
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
                                                            <input type="text" name="save_shipment_rofile" id="save_shipment_rofile" class="form-control form-control-sm uppercase-only" placeholder="Save Shipment Profile Name" autocomplete="off">
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
</template>

<style scoped>
    .booking_card {
        margin: 0px 120px;
    }
</style>
