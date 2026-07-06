<script setup>
    
</script>

<template>
    <div class="card booking_card">
        <div class="card-header border-bottom dot_border bg-gradient d-flex align-items-center">
            <h2 class="header-title"><i class="fa-regular fa-truck"></i> FREIGHT FORWARDING</h2>
        </div>

        
        <div class="card-body px-3">
            <form id="freight_forwarding_form" method="POST" action="http://cargoaimonline.test/my_bookings/freight_forwarding" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="kuH21cVpWbukw6QsAKgnELktNasP9gTsgtgfzotL" autocomplete="off">                        <div class="table-responsive box-border couriar_table">
                    <table class="table table-borderless">
                        <tbody>

                            <tr class="border-bootom-dotted">
                                <td colspan="3" class="">
                                    <div class="card shadow-sm shipment-profile-card mb-2">
                                        <div class="card-header bg-light bg-gradient py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-house"></i></h5>
                                            <h5 class="hbl_show mb-0"> </h5>
                                        </div>
                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr><td style="width: 35%">
                                                    
                                                    <label class="form-label"> Load Form Booking Template : </label>
                                                    <select name="ff_shipment_profile" id="ff_shipment_profile" class="form-select form-select-sm" autocomplete="off"><option value=""></option>
                    <option value="TEST FF">
                        TEST FF
                    </option>
                </select>
                                                </td>
                                                <td></td>
                                            </tr></tbody></table>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr class="border-bootom-dotted">
                                <td style="width: 60%">

                                    
                                    <div class="card shadow-sm shipper-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <i class="fa-solid fa-receipt"></i>
                                                
                                                Booking Type
                                            </h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Sea/ Air/ Land<span style="color: red;">*</span></span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input type="hidden" name="row_id" id="row_id">

                                                        <select name="sea_air_land" id="sea_air_land" class="form-select form-select-sm" autocomplete="off">
                                                            <option value=""></option>
                                                            <option value="1">Sea</option>
                                                            <option value="2">Air</option>
                                                            <option value="3">Land</option>
                                                            <option value="4">Sea-Air</option>
                                                            <option value="5">Air-Sea</option>
                                                            <option value="6">Land-Air</option>
                                                        </select>
                                                    </td>                                                            
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Import/Export<span style="color: red;">*</span></span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select name="imp_exp" id="imp_exp" class="form-select form-select-sm" autocomplete="off">
                                                            <option value=""></option>
                                                            <option value="1"> Import </option>
                                                            <option value="2"> Export </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>FCL/LCL<span style="color: red;">*</span></span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select name="fcl_lcl" id="fcl_lcl" class="form-select form-select-sm" autocomplete="off">
                                                            <option value=""></option>
                                                            <option value="FCL"> FCL </option>
                                                            <option value="LCL"> LCL </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>CHA</span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select name="cha" id="cha" class="form-select form-select-sm" autocomplete="off">
                                                            <option value=""></option>
                                                            <option value="BD035"> Smart Shipping Ltd </option>
                                                            <option value="BD057"> LIZ FASHION INDUSTRY LTD </option>
                                                            <option value="BD059"> sahara logistic ltd </option>
                                                            <option value="BD065"> BD company </option>
                                                            <option value="BD067"> enamul shipping </option>
                                                            <option value="BDV0005"> Ishakha Corporation </option>
                                                            <option value="BDV0006"> Subastu Aparel </option>
                                                            <option value="BDV0007"> BD Export Import Ltd </option>
                                                            <option value="BDV0028"> Custom Identity  </option>
                                                            <option value="BDV0030"> IS Logistic Ltd </option>
                                                            <option value="BDV0036"> Moiful Enterprise </option>
                                                            <option value="BDV0048"> sm sea company </option>
                                                            <option value="BDV0049"> Morium </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Incoterm<span style="color: red;">*</span></span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    
                                                    <td>
                                                        <select name="incoterm" id="incoterm" class="form-select form-select-sm" autocomplete="off">
                                                            <option value=""></option>
                                                            <option value="CFR"> CFR - Cost and Freight </option>
                                                            <option value="CIF"> CIF - Cost Insurance and Freig </option>
                                                            <option value="CIP"> CIP - Carriage And Insurance P </option>
                                                            <option value="CNF"> CNF - Cost and Freight </option>
                                                            <option value="CPT"> CPT - Carriage Paid To </option>
                                                            <option value="DAP"> DAP- Delivery at Place </option>
                                                            <option value="DAT"> DAT - Delivery At Terminal </option>
                                                            <option value="EXW"> EXW - Ex Works </option>
                                                            <option value="FAS"> FAS - Free Alongside Ship </option>
                                                            <option value="FCA"> FCA - Free Carrier </option>
                                                            <option value="FOB"> FOB- Free On Board </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                    
                                    <div class="card shadow-sm shipper-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <i class="fa-solid fa-ship"></i>
                                                
                                                Port Pairs
                                            </h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td style="width: 150px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Place of Receipt</span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="position-relative">
                                                            <input type="hidden" name="por_code" id="por_code" class="uppercase-only">

                                                            <div class="input-group online_bkg_search_inp">
                                                                <input type="text" name="por" id="por" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH IN PLACE OF RECEIPT" autocomplete="off">

                                                                <span class="input-group-text search_keyword search_keyword_enty_form">
                                                                    <i class="fa-solid fa-magnifying-glass"></i>
                                                                </span>
                                                            </div>

                                                            
                                                            <div id="por_loader" class="por_loader circle-dot-loader" style="display:none;">
                                                                <div></div><div></div><div></div><div></div>
                                                                <div></div><div></div><div></div><div></div>
                                                            </div>

                                                                
                                                            <!-- <div id="por_suggestions_box" class="global-suggestions-box" style="width: 540px!important;"></div> -->
                                                        </div>
                                                    </td>                                                            
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Port of Loading<span style="color: red;">*</span></span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="position-relative">
                                                            <input type="hidden" name="pol_code" id="pol_code" class="uppercase-only">

                                                            <div class="input-group online_bkg_search_inp">
                                                                <input type="text" name="pol" id="pol" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH IN  PORT OF LODING" autocomplete="off">

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
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Port of Discharge<span style="color: red;">*</span></span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="position-relative">
                                                            <input type="hidden" name="pod_code" id="pod_code" class="uppercase-only">

                                                            <div class="input-group online_bkg_search_inp">
                                                                <input type="text" name="pod" id="pod" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH IN PORT OF DISCHARGE" autocomplete="off">

                                                                <span class="input-group-text search_keyword search_keyword_enty_form">
                                                                    <i class="fa-solid fa-magnifying-glass"></i>
                                                                </span>
                                                            </div>

                                                            
                                                            <div id="pod_loader" class="pod_loader circle-dot-loader" style="display:none;">
                                                                <div></div><div></div><div></div><div></div>
                                                                <div></div><div></div><div></div><div></div>
                                                            </div>

                                                                
                                                            <!-- <div id="pod_suggestions_box" class="global-suggestions-box" style="width: 540px!important;"></div> -->
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Place of Delivery</span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="position-relative">
                                                            <input type="hidden" name="del_code" id="del_code" class="uppercase-only">

                                                            <div class="input-group online_bkg_search_inp">
                                                                <input type="text" name="del" id="del" class="form-control form-control-sm uppercase-only" placeholder="3+ CHARS TO SEARCH IN PLACE OF DELIVERY" autocomplete="off">

                                                                <span class="input-group-text search_keyword search_keyword_enty_form">
                                                                    <i class="fa-solid fa-magnifying-glass"></i>
                                                                </span>
                                                            </div>

                                                            
                                                            <div id="del_loader" class="del_loader circle-dot-loader" style="display:none;">
                                                                <div></div><div></div><div></div><div></div>
                                                                <div></div><div></div><div></div><div></div>
                                                            </div>

                                                                
                                                            <!-- <div id="del_suggestions_box" class="global-suggestions-box" style="width: 540px!important;"></div> -->
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 140px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Delivery Address</span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    
                                                    <td>
                                                        <input type="text" name="del_address" id="del_address" class="form-control form-control-sm uppercase-only" placeholder="Delivery Address" autocomplete="off">
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                    
                                    <div class="card shadow-sm shipper-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <i class="fa-brands fa-bandcamp"></i>
                                                
                                                Commodity and References
                                            </h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td style="width: 152px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Commodity/Item<span style="color: red;">*</span></span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input type="text" name="commodity_item" id="commodity_item" class="form-control form-control-sm uppercase-only mt2_mb1" autocomplete="off">
                                                    </td>                                                            
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <table class="table table-borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width: 150px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Cargo Handover Date</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="cargo_handover_date" id="cargo_handover_date" class="form-control form-control-sm flatpickr-input" data-provider="flatpickr" data-date-format="d-M-Y" value="2026-07-06 11:08:37" autocomplete="off">
                                                                    </td>
                                                                    <td style="width: 20px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>FOC</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 35px;">
                                                                        <input type="checkbox" name="foc" id="foc" class="form-check-input form-control-sm uppercase-only" placeholder="" autocomplete="off" style="width: 26px; height: 26px;">
                                                                    </td>
                                                                    <td style="width: 20px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>DG</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 35px;">
                                                                        <input type="checkbox" name="dg" id="dg" class="form-check-input uppercase-only" placeholder="" autocomplete="off" style="width: 26px; height: 26px;">
                                                                    </td>
                                                                    <td style="width: 70px;">
                                                                        <input type="text" name="cargo_un_class" id="cargo_un_class" class="form-control form-control-sm uppercase-only" placeholder="Class" autocomplete="off">
                                                                    </td>
                                                                    <td style="width: 70px;">
                                                                        <input type="text" name="un_no" id="un_no" class="form-control form-control-sm uppercase-only" placeholder="UN" autocomplete="off">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <table class="table table-borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width: 150px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Invoice</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="invoice_no" id="invoice_no" class="form-control form-control-sm uppercase-only" placeholder="Invoice" autocomplete="off">
                                                                    </td>
                                                                    <td style="width: 50px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Date</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 110px;">
                                                                        <input type="text" name="invoice_date" id="invoice_date" class="form-control form-control-sm flatpickr-input" data-provider="flatpickr" data-date-format="d-M-Y" value="2026-07-06 11:08:37" autocomplete="off">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <table class="table table-borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width: 150px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>EXP</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="exp_no" id="exp_no" class="form-control form-control-sm uppercase-only" placeholder="EXP" autocomplete="off">
                                                                    </td>
                                                                    <td style="width: 50px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Date</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 110px;">
                                                                        <input type="text" name="exp_date" id="exp_date" class="form-control form-control-sm flatpickr-input" data-provider="flatpickr" data-date-format="d-M-Y" value="2026-07-06 11:08:37" autocomplete="off">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <table class="table table-borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width: 150px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Others</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 100px;">
                                                                        <select name="other_no_type" id="other_no_type" class="form-select form-select-sm" autocomplete="off">
                                                                            <option value=""></option>
                                                                                                                                                                    <option value="CON"> 
                                                                                    CONT. NO 
                                                                                </option>
                                                                                                                                                                    <option value="LC"> 
                                                                                    L/C NO  
                                                                                </option>
                                                                                                                                                                    <option value="PC"> 
                                                                                    P/C NO 
                                                                                </option>
                                                                                                                                                                    <option value="PD"> 
                                                                                    Product 
                                                                                </option>
                                                                                                                                                                    <option value="PI"> 
                                                                                    P/I NO 
                                                                                </option>
                                                                                                                                                                    <option value="PO"> 
                                                                                    P/O NO 
                                                                                </option>
                                                                                                                                                                    <option value="SBILL"> 
                                                                                    S/BILL NO 
                                                                                </option>
                                                                                                                                                                    <option value="SC"> 
                                                                                    S/C NO 
                                                                                </option>
                                                                                                                                                                    <option value="TT"> 
                                                                                    T/T NO 
                                                                                </option>
                                                                                                                                                                    <option value="VPS"> 
                                                                                    Virtual Payment 
                                                                                </option>
                                                                                                                                                            </select>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="other_no" id="other_no" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">
                                                                    </td>
                                                                    <td style="width: 50px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Date</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 110px;">
                                                                        <input type="text" name="other_no_date" id="other_no_date" class="form-control form-control-sm flatpickr-input" data-provider="flatpickr" data-date-format="d-M-Y" value="2026-07-06 11:08:37" autocomplete="off">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <table class="table table-borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width: 150px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Others-2</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 100px;">
                                                                        <select name="other_no_type_two" id="other_no_type_two" class="form-select form-select-sm" autocomplete="off">
                                                                            <option value=""></option>
                                                                                                                                                                    <option value="CON"> 
                                                                                    CONT. NO 
                                                                                </option>
                                                                                                                                                                    <option value="LC"> 
                                                                                    L/C NO  
                                                                                </option>
                                                                                                                                                                    <option value="PC"> 
                                                                                    P/C NO 
                                                                                </option>
                                                                                                                                                                    <option value="PD"> 
                                                                                    Product 
                                                                                </option>
                                                                                                                                                                    <option value="PI"> 
                                                                                    P/I NO 
                                                                                </option>
                                                                                                                                                                    <option value="PO"> 
                                                                                    P/O NO 
                                                                                </option>
                                                                                                                                                                    <option value="SBILL"> 
                                                                                    S/BILL NO 
                                                                                </option>
                                                                                                                                                                    <option value="SC"> 
                                                                                    S/C NO 
                                                                                </option>
                                                                                                                                                                    <option value="TT"> 
                                                                                    T/T NO 
                                                                                </option>
                                                                                                                                                                    <option value="VPS"> 
                                                                                    Virtual Payment 
                                                                                </option>
                                                                                                                                                            </select>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="other_no_two" id="other_no_two" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">
                                                                    </td>
                                                                    <td style="width: 50px;">
                                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                                            <span>Date</span>
                                                                            <span>:</span>
                                                                        </div>
                                                                    </td>
                                                                    <td style="width: 110px;">
                                                                        <input type="text" name="other_no_date_two" id="other_no_date_two" class="form-control form-control-sm flatpickr-input" data-provider="flatpickr" data-date-format="d-M-Y" value="2026-07-06 11:08:37" autocomplete="off">
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                    
                                    <div class="card shadow-sm shipper-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <i class="fa-solid fa-envelope"></i>
                                                
                                                Add CC Email Addresses
                                            </h5>
                                        </div>
                                        

                                        <div class="card-body p-2">
                                            <!-- Email CC -->
                                            <div class="ff_email_textarea_box">
                                                <table class="table table-borderless align-middle m-0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <textarea name="email_cc" id="email_cc" class="form-control ff_email_textarea ff_emailcc_chip_input global_mail_chip_original_textarea"></textarea><div class="global_mail_chip_container"><div class="global_mail_chip_wrapper"><input type="text" class="global_mail_chip_input_field" placeholder="Type email and press Enter"></div></div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td style="width: 1%;"></td>

                                <td style="width: 39%">
                                    
                                    <div class="card shadow-sm consinee-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <iconify-icon icon="mdi:account-tie" class="align-middle" style="font-size: 16px;"><template shadowrootmode="open"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"></path></svg></template></iconify-icon> 
                                                
                                                Shipper's Details<span style="color: red;">*</span>
                                            </h5>

                                            <button type="button" id="save_ff_shipper_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td>
                                                        <div class="d-flex gap-1 align-items-center">
                                                            <input type="hidden" name="shipper_code" id="shipper_code" autocomplete="off" value="NMS20260706170837">

                                                            <input type="text" name="shipper_name" id="shipper_name" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">

                                                            <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="shipper_list_btn_ff">
                                                                <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                            </button>
                                                        </div>
                                                    </td>                                                       
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <textarea name="shipper_address" id="shipper_address" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 86px;"></textarea>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                    
                                    <div class="card shadow-sm consinee-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <iconify-icon icon="mdi:account-tie" class="align-middle" style="font-size: 16px;"><template shadowrootmode="open"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"></path></svg></template></iconify-icon> 
                                                
                                                Shipper's Bank Details
                                            </h5>
                                            
                                            <button type="button" id="save_ff_shipper_bank_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td>
                                                        <div class="d-flex gap-1 align-items-center">
                                                            <input type="text" name="shipper_bank_name" id="shipper_bank_name" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">

                                                            <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="shipper_bank_list_btn_ff">
                                                                <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                            </button>
                                                        </div>
                                                    </td>                                                            
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <textarea name="shipper_bank_address" id="shipper_bank_address" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 86px;"></textarea>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                    
                                    <div class="card shadow-sm consinee-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <iconify-icon icon="mdi:account-tie" class="align-middle" style="font-size: 16px;"><template shadowrootmode="open"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"></path></svg></template></iconify-icon> 
                                                
                                                Buyer's Details<span style="color: red;">*</span>
                                            </h5>

                                            <button type="button" id="save_ff_buyer_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td>
                                                        <div class="d-flex gap-1 align-items-center">
                                                                <input type="hidden" name="buyer_code" id="buyer_code" autocomplete="off" value="NMS20260706170837">

                                                            <input type="text" name="buyer_name" id="buyer_name" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">

                                                            <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="buyer_list_btn_ff">
                                                                <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                            </button>
                                                        </div>
                                                    </td>                                                            
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <textarea name="buyer_address" id="buyer_address" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 86px;"></textarea>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                    
                                    <div class="card shadow-sm consinee-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <iconify-icon icon="mdi:account-tie" class="align-middle" style="font-size: 16px;"><template shadowrootmode="open"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"></path></svg></template></iconify-icon> 
                                                
                                                Buyer's Bank Details
                                            </h5>

                                            <button type="button" id="save_ff_buyer_bank_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td>
                                                        <div class="d-flex gap-1 align-items-center">
                                                            <input type="text" name="buyer_bank_name" id="buyer_bank_name" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">

                                                            <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="buyer_bank_list_btn_ff">
                                                                <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                            </button>
                                                        </div>
                                                    </td>                                                            
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <textarea name="buyer_bank_address" id="buyer_bank_address" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 86px;"></textarea>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                    
                                    <div class="card shadow-sm consinee-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">
                                                <iconify-icon icon="mdi:account-tie" class="align-middle" style="font-size: 16px;"><template shadowrootmode="open"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"></path></svg></template></iconify-icon> 
                                                
                                                Notify Patry's Details
                                            </h5>

                                            <button type="button" id="save_ff_notify_btn" class="btn btn-sm btn-primary btn-cargoaim bg-gradient">
                                                <i class="far fa-save" style="font-size: 16px;"></i>
                                            </button>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td>
                                                        <div class="d-flex gap-1 align-items-center">
                                                            <input type="hidden" name="notify_code" id="notify_code" autocomplete="off" value="NMS20260706170837">

                                                            <input type="text" name="notify_name" id="notify_name" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">

                                                            <button type="button" class="btn btn-success btn-cargoaim btn-sm bg-gradient" id="notify_list_btn_ff">
                                                                <i class="fa-solid fa-list-ul" style="font-size: 16px;"></i>
                                                            </button>
                                                        </div>
                                                    </td>                                                            
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <textarea name="notify_address" id="notify_address" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 86px;"></textarea>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                </td>
                            </tr>

                            
                            <tr class="border-bootom-dotted">
                                <td colspan="3">
                                    <table class="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td style="width: 40%">
                                                    
                                                    <div class="card shadow-sm shipper-card mb-2">
                                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                                            <h5 class="mb-0">
                                                                <i class="fa-solid fa-circle-stop"></i>
                                                                
                                                                Shipping Marks
                                                            </h5>
                                                        </div>

                                                        <div class="card-body p-2">
                                                            <table class="table table-borderless align-middle m-0">
                                                                <tbody><tr>
                                                                    <td>
                                                                        <textarea name="marks" id="marks" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 160px;"></textarea>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td style="width: 1%;"></td>

                                                <td style="width: 59%">
                                                    
                                                    <div class="card shadow-sm consinee-card mb-2">
                                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                                            <h5 class="mb-0">
                                                                <i class="fa-solid fa-circle-stop"></i>
                                                                
                                                                Cargo Description
                                                            </h5>
                                                        </div>

                                                        <div class="card-body p-2">
                                                            <table class="table table-borderless align-middle m-0">
                                                                <tbody><tr>
                                                                    <td>
                                                                        <textarea name="description" id="description" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 160px;"></textarea>
                                                                    </td>         
                                                                </tr>
                                                            </tbody></table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            
                            <tr>
                                <td colspan="3">
                                    <div class="card shadow-sm mb-2">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center" style="padding-right: 5px;">
                                            <h5 class="mb-0"><i class="fa-solid fa-box"></i> Cargo Details</h5>
                                            
                                            <button type="button" id="ff_cargo_details_load_xl" class="btn btn-sm btn-success btn-cargoaim bg-gradient"><i class="fa-solid fa-file-excel"></i>&nbsp;Load XL</button>                                            
                                        </div>

                                        <div class="card-body px-1 py-2">
                                            <div class="table-responsive package_table">
                                                <table class="table table-bordered table-striped align-middle m-0">
                                                    <thead>
                                                        <tr class="text-muted small text-center" style="white-space: nowrap; vertical-align: middle;">
                                                            <th style="width: 20px;">SN</th>
                                                            <th style="width: 120px;">GTN/INT/WH</th>
                                                            <th style="width: 70px;">Buyer PO</th>
                                                            <th style="width: 63px;">Shipper PO</th>
                                                            <th style="width: 55px;">Article/Style</th>
                                                            <th style="width: 55px;">HS CODE</th>
                                                            <th style="width: 63px;">Cargo</th>
                                                            <th style="width: 65px;">Color</th>
                                                            <th style="width: 45px;">Item</th>
                                                            <th style="width: 65px;">Lot</th>
                                                            <th style="width: 65px;">Pieces</th>
                                                            <th style="width: 65px;">UOM</th>
                                                            <th style="width: 47px;">PKG/CTN</th>
                                                            <th style="width: 60px;">G.W(KG)</th>
                                                            <th style="width: 65px;">Length</th>
                                                            <th style="width: 65px;">Width</th>
                                                            <th style="width: 65px;">Height</th>
                                                            <th style="width: 65px;">VOL. (CBM)*</th>
                                                            <th style="width: 40px;">
                                                                <button type="button" id="ff_cargo_add_row_btn" class="btn btn-primary btn-cargoaim bg-gradient open-second-modal plus-box-btn ml4" data-bs-target="#customerModal"> 
                                                                    <i class="fa-solid fa-square-plus"></i> 
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="ff_cargo_details_table_body">
                                                        
                                                    
    <tr data-index="0">
        <td class="text-center row-sl">1</td>
        <td>
            <input type="hidden" name="pkg_row_id[0]" id="pkg_row_id0">

            <input type="text" name="gtn_inttra[0]" id="gtn_inttra0" class="form-control uppercase-only form-control-sm" placeholder="">
        </td>
        <td>
            <input type="text" name="buyer_po[0]" id="buyer_po0" class="form-control form-control-sm uppercase-only" placeholder="">
        </td>
        <td>
            <input type="text" name="shipper_po[0]" id="shipper_po0" class="form-control form-control-sm uppercase-only" placeholder="">
        </td>
        <td>
            <input name="article_style[0]" id="article_style0" type="text" class="form-control form-control-sm uppercase-only">
        </td>
        <td>
            <input type="text" name="hs_code[0]" id="hs_code0" class="form-control form-control-sm hs_code" placeholder="">
        </td>
        <td>
            <input type="text" name="po_commodity[0]" id="po_commodity0" class="form-control form-control-sm uppercase-only" placeholder="">
        </td>
        <td>
            <input name="ff_color[0]" id="ff_color0" type="text" class="form-control form-control-sm uppercase-only" placeholder="">
        </td>
        <td>
            <input type="text" name="item_name[0]" id="item_name0" class="form-control form-control-sm uppercase-only" placeholder="">
        </td>
        <td>
            <input type="text" name="lot[0]" id="lot0" class="form-control form-control-sm uppercase-only" placeholder="">
        </td>
        <td>
            <input type="text" name="pieces[0]" id="pieces0" class="form-control form-control-sm pkg" placeholder="">
        </td>
        <td>
            <select name="pkg_type[0]" id="pkg_type0" class="form-select form-select-sm">
                <option value=""></option><option value="AM">AM-Ampoule, non-protect</option><option value="AP">AP-Ampoule, protected</option><option value="BG">BG-Bag</option><option value="5L">5L-Bag, textile</option><option value="BL">BL-Bale</option><option value="BF">BF-Balloon, non-protect</option><option value="BX">BX-Box</option><option value="4A">4A-Box, steel</option><option value="BE">BE-Bundle</option><option value="CI">CI-Canister</option><option value="CO">CO-Carboy, non-protecte</option><option value="CT">CT-CARTON</option><option value="CQ">CQ-Cartridge</option><option value="CS">CS-Case</option><option value="EF">EF-Case, with pallet ba</option><option value="ED">ED-Case, with pallet ba</option><option value="CR">CR-Crate</option><option value="DR">DR-Drum</option><option value="LV">LV-Liftvan </option><option value="PK">PK-Package</option><option value="IF">IF-Package</option><option value="LS">LS-PACKAGE</option><option value="IE">IE-Package, show</option><option value="PA">PA-Packet</option><option value="PX">PX-Pallet</option><option value="PB">PB-Pallet, box</option><option value="PE">PE-Pallet, modular, col</option><option value="AG">AG-Pallet, shrinkwrappe</option><option value="PS">PS-Pieces</option><option value="PG">PG-Plate</option><option value="RO">RO-Roll</option><option value="SE">SE-SET</option><option value="SI">SI-Skid</option><option value="DW">DW-Tray, two layers no </option><option value="UN">UN-UNIT</option><option value="QH">QH-wooden BOX</option><option value="YF">YF-wooden box</option><option value="YS">YS-wooden box</option>
            </select>
        </td>
        <td>
            <input name="qty[0]" id="qty0" type="text" class="form-control form-control-sm qty">
        </td>
        <td>
            <input name="weight_kg[0]" id="weight_kg0" type="text" class="form-control form-control-sm weight" placeholder="">
        </td>
        <td>
            <input name="length[0]" id="length0" type="text" class="form-control form-control-sm length" placeholder="000.000">
        </td>
        <td>
            <input name="width[0]" id="width0" type="text" class="form-control form-control-sm width" placeholder="000.000">
        </td>
        <td>
            <input name="height[0]" id="height0" type="text" class="form-control form-control-sm height" placeholder="000.000">
        </td>
        <td>
            <input type="text" name="cbm[0]" id="cbm0" class="form-control form-control-sm cbm" placeholder="">
        </td>
        <td class="text-center">
            <button type="button" class="btn btn-danger btn-cargoaim btn-sm delete-row">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
    </tr></tbody>
                                                    <tfoot>
                                                        <tr style="height: 27px; background: #eee; background-image: var(--osen-gradient) !important;">
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td class="text-center total-pieces">0.00</td> <!-- pieces_th -->
                                                            <td></td>
                                                            <td class="text-center total-qty">0.00</td>    <!-- pkg_ctn_th -->
                                                            <td class="text-center total-weight">0.00</td> <!-- g_w_kg_th -->
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td class="text-center total-cbm">0.00</td>    <!-- vol_cbm_th -->
                                                            <td></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            
                            <tr class="border-bootom-dotted">
                                <td colspan="3">
                                    <div class="card shadow-sm shipper-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-folder text-warning"></i> File Upload</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td style="width: 5%;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span>Name</span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td style="width: 30%">
                                                        <input type="text" name="file_name_by_user" id="file_name_by_user" class="form-control form-control-sm uppercase-only" placeholder="" autocomplete="off">

                                                    </td>
                                                    <td>
                                                        <div class="btcd-f-input">
                                                            <div class="btcd-f-wrp">
                                                                <button type="button" class="btcd_inp_btn">
                                                                    <i class="fas fa-paperclip"></i> Attach Files
                                                                </button>

                                                                <span class="btcd-f-title">No File Chosen</span>
                                                                <small class="f-max">(Max 2 MB)</small>

                                                                <!-- visible input -->
                                                                <input type="file" name="files[]" id="filePicker" class="ff_file_upload" multiple="" accept="image/*,application/pdf">
                                                            </div>

                                                            <!-- hidden cloned inputs -->
                                                            <div id="hidden_files"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3">
                                                        <!-- preview -->
                                                        <div class="btcd-files"></div>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                </td>
                            </tr>

                            
                            <tr class="border-bootom-dotted">
                                <td colspan="3">
                                    <div class="card shadow-sm shipper-card mb-2">
                                        <div class="card-header bg-light bg-gradient d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-comment-dots"></i> Comment</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td>
                                                        <textarea name="comment" id="comment" cols="30" rows="1" class="form-control uppercase-only mt2_mb1" placeholder="" autocomplete="off" style="height: 100px;"></textarea>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>

                                </td>
                            </tr>

                            <tr id="saveShipmentRow">
                                <td colspan="3">
                                    <div class="card shadow-sm billing-card mb-2">
                                        <div class="card-header bg-light py-1 d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0"><i class="fa-solid fa-floppy-disk"></i> Save as Booking Template Name</h5>
                                        </div>

                                        <div class="card-body p-2">
                                            <table class="table table-borderless align-middle m-0">
                                                <tbody><tr>
                                                    <td style="width: 210px;">
                                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                                            <span> Save as Booking Template Name</span>
                                                            <span>:</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input type="text" name="save_shipment_rofile" id="save_shipment_rofile" class="form-control form-control-sm uppercase-only" placeholder="Save as Booking Template Name" autocomplete="off">
                                                    </td>
                                                    <td style="width: 20px;">
                                                        <button type="button" class="btn btn-primary btn-cargoaim bg-gradient" id="ff_save_btn" style="height: 28px;">
                                                            <i class="far fa-save" style="font-size: 16px;"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        </div>
                                    </div>                                            
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="text-end mb-2" style="margin-right: 9px;">
                    <button type="submit" class="btn btn-primary btn-cargoaim bg-gradient" id="ff_bkg_btn">
                        <i class="fas fa-check-circle"></i>&nbsp;Submit
                    </button>
                </div>
            </form>
        </div> <!-- end card-body -->
    </div>
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
    
</style>
