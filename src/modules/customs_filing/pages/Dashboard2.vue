<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
</script>

<template>
    <!-- ============================================================== -->        
    <!-- Start Page Content here -->        
    <!-- ============================================================== --> 
    <div class="page-container" data-module="">
        <div class="filing_content">        
            <div class="card filing-content-wrapper">
                
                <!-- Header (Matches exact text elements from image_fdeb07.png) -->
                <div class="card-header d-flex justify-content-between align-items-center">                
                    <div class="d-flex align-items-center gap-2">
                        <div class="header-icon-box">
                            <i class="fa-solid fa-file-invoice"></i>
                        </div>
                        <div>
                            <h4 class="card-title m-0">ICS2 (HBL ENS)</h4>
                            <!-- <small class="card-subtitle text-muted">House Bill of Lading</small> -->
                        </div>
                    </div>
                    <button type="button" class="btn create_new_btn" id="createNew">
                        <i class="fa-solid fa-square-plus align-middle me-1"></i>
                        NEW HBL FILE              
                    </button>            
                </div>

                <div class="filing-content-body">    
                    <form id="loadform" name="form" class="form-horizontal" method="POST" action="#" enctype="multipart/form-data">    
                        <input type="hidden" name="_token" value="cSBX5Uj4lrE3emrO7loWLSSziypI4veDRBkRQ2Ou" autocomplete="off">        
                        
                        <!-- Main Table Wrapper with Custom Biscuit Theme Border -->
                        <div class="table-responsive filing_search_responsive_table_wrapper filing_search_bg_color">
                            <table class="table table-borderless filing_search_table align-middle">
                                
                                <!-- Labels Row -->
                                <tr class="filing_search_table_row text-center label-row">
                                    <th style="width: 110px;">Type</th>
                                    <th style="width: 100px;">From</th>
                                    <th style="width: 100px;">To</th>
                                    <th style="width: 100px;">Liner</th>
                                    <th style="width: auto;">Keyword</th>
                                    <th style="width: 100px;">Company</th>
                                    <th style="width: 100px;">Status</th>
                                    <th style="width: 135px;">Type</th>
                                    
                                    <!-- Space Allocation for Stacked Report Buttons & Load Button -->
                                    <th style="width: 32px;"></th>
                                    <th style="width: 32px;"></th>
                                    <th style="width: 90px;"></th>
                                </tr>
                                
                                <!-- Input Controls Row -->
                                <tr class="filing_search_table_row control-row">
                                    <!-- Type -->
                                    <td>
                                        <div class="custom-select-wrapper">
                                            <select name="date_type" id="date_type" class="form-select text-start">
                                                <option value="entry_date" selected>Entry Date</option>
                                            </select>
                                            <span class="custom-arrow">></span>
                                        </div>
                                    </td>
                                    
                                    <!-- From -->
                                    <td>
                                        <input type="text" name="date_from" id="date_from" class="form-control text-center flatpickr-input" autocomplete="off" data-provider="flatpickr" data-date-format="d-M-Y" value="">
                                    </td>
                                    
                                    <!-- To -->
                                    <td>
                                        <input type="text" name="date_to" id="date_to" class="form-control text-center flatpickr-input" autocomplete="off" data-provider="flatpickr" data-date-format="d-M-Y" value="">
                                    </td>
                                    
                                    <!-- Liner -->
                                    <td class="text-center">
                                        <div class="custom-select-wrapper">
                                            <select class="form-select" name="stock_filter_carrier_name" id="stock_filter_carrier_name" autocomplete="off">
                                                <option value=""></option>
                                            </select>
                                            <span class="custom-arrow">></span>
                                        </div>
                                    </td>
                                    
                                    <!-- Keyword (Fills the center empty gap naturally) -->
                                    <td>
                                        <div class="search-input-wrapper">
                                            <input type="text" name="hbl_mbl" id="hbl_mbl" class="form-control uppercase-only" placeholder="HBL/MBL/PORT/VSL/VOY" autocomplete="off">
                                        </div>
                                    </td>
                                    
                                    <!-- Company -->
                                    <td>
                                        <div class="custom-select-wrapper">
                                            <select class="form-select" name="stock_filter_b_unit" id="stock_filter_b_unit">
                                                <option value=""></option>
                                            </select>
                                            <span class="custom-arrow">></span>
                                        </div>
                                    </td>
                                    
                                    <!-- Status -->
                                    <td>
                                        <div class="custom-select-wrapper">
                                            <select class="form-select" name="stock_status" id="stock_status">
                                                <option value="A">Active</option>
                                                <option value="D">Deleted</option>
                                                <option value="N">Canceled</option>
                                                <option value="ALL" selected="selected">ALL</option>
                                            </select>
                                            <span class="custom-arrow">></span>
                                        </div>
                                    </td>
                                    
                                    <!-- Type (Filing Option) -->
                                    <td>
                                        <div class="custom-select-wrapper">
                                            <select class="form-select" name="filing_type" id="filing_type">
                                                <option value="EUENS" selected>EU ICS-2/ENS</option>
                                                <option value="USAMS">USA AMS</option>
                                                <option value="JPAFR">JAPAN AFR</option>
                                                <option value="MPCI">MPCI</option>
                                                <option value="ALL">ALL</option>
                                            </select>
                                            <span class="custom-arrow">></span>
                                        </div>
                                    </td>

                                    <!-- Stacked Vertical Icons Cell (Excel & PDF) -->
                                    <td class="text-center p-0 align-middle">
                                        <div class="stacked-action-buttons">
                                            <button type="button" id="cm_vol_report_exl_btn" class="btn report-mini-btn" title="Export Excel">
                                                <i class="fa-solid fa-file-excel"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <!-- Stacked Vertical Icons Cell (Excel & PDF) -->
                                    <td class="text-center p-0 align-middle">
                                        <div class="stacked-action-buttons">
                                            <button type="button" id="cm_vol_report_pdf_btn" class="btn report-mini-btn" title="Export PDF">
                                                <i class="fa-solid fa-file-pdf"></i>
                                            </button>
                                        </div>
                                    </td>
                                    
                                    <!-- Big Vertical LOAD Button Cell -->
                                    <td class="text-center align-middle">
                                        <button type="button" class="btn load-btn w-100" id="loadDataBtn">
                                            <i class="fa-solid fa-arrows-rotate me-1"></i>
                                            LOAD
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </form>

                    <!-- Data Result Placeholder Area -->
                    <div class="cargoaim_custom_form_wrapper" id="filing_dataLoad_customize">
                        <table id="filing_cargoaim_table" class="table table-bordered table-striped display nowrap" style="width: 100%;">
                            <slot></slot> 
                            <tbody id="filing_cargoaim_table_tbody">
                                <!-- entries loaded via ajax dynamically -->
                            </tbody>
                        </table>
                        <div id="filing_cargoaim_table_message" class="text-start text-muted p-2 d-flex align-items-center gap-1 list-placeholder">
                            <i class="fa-regular fa-file-lines opacity-50"></i>
                            <span>List will be loaded here...!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .filing_content {
        padding: 3px;
        background-color: #ffffff;
    }

    /* Core Top Card Shell Style with accurate Blue Border (image_fdeb07.png) */
    .filing-content-wrapper {
        border: 1px solid #0072A7 !important;
        border-radius: 6px !important;
        overflow: hidden;
        box-shadow: none;
    }
   
    .filing-content-wrapper .card-header {
        background-color: #ffffff !important;
        border-bottom: 2px solid #0072A7 !important;
        padding: 4px 4px !important;
    }

    .header-icon-box {
        background-color: #0072A7;
        color: white;
        padding: 6px 8px;
        border-radius: 6px;
        font-size: 14px;
    }

    .filing-content-wrapper .card-title {
        color: #0072A7 !important;
        font-weight: 700 !important;
        font-size: 14.5px !important;
    }
    
    .card-subtitle {
        font-size: 11px;
    }

   .filing-content-wrapper .create_new_btn {
        padding: 6px 13px 7px 10px;
        font-size: 14px;
        background: #0072A7;
        color: #fff;
        border: 1px solid light-dark(rgba(31, 30, 29, 0.3), rgba(222, 220, 209, 0.3));
        border-radius: 8px;
        cursor: pointer;
    }

    .filing-content-body {
        background-color: #fff;
        /* padding: 10px; */
    }

    /* ============================================================== */
    /* Exact Layout Customizer Using Your Table Elements Structure */
    /* ============================================================== */
    .filing_search_bg_color {
        background: linear-gradient(180deg, #fdf0e8 0%, #f8e4d0 100%);
    }

    .filing_search_responsive_table_wrapper {
        /* border: 3px solid #f5dfcc; */
        /* border-radius: 5px; */
        padding: 5px 5px 5px 5px !important;
        width: 100%;
        overflow: visible;
    }

    .filing_search_table {
        margin-bottom: 0rem !important;
        width: 100%;
    }
    .custom-select-wrapper,
    .search-input-wrapper,
    .stacked-action-buttons{
        background: none;
        padding: 0px;
    }

    /* Eliminate all default border properties from inside the filter row cells */
    .filing_search_table th, 
    .filing_search_table td {
        border: none !important;
        padding: 1px 1px !important;
    }

    /* Header text formatting setup (Chocolate Rust Tone) */
    .filing_search_table th {
        color: #924d1a !important;
        font-weight: 700 !important;
        font-size: 12.5px !important;
        padding: 0px 4px 6px 4px !important;
    }

    /* Inputs Inner Components Default Normalization properties */
    .filing_search_table .form-control,
    .filing_search_table .form-select {
        height: 32px !important;
        min-height: 32px !important;
        font-size: 13px !important;
        border: 1px solid #e9d5bf !important;
        border-radius: 6px !important;
        background-color: #ffffff !important;
        padding: 2px 8px !important;
        color: #111111;
        box-shadow: none !important;
    }

    /* Dropdown wrapper engine to place custom gray pointer chevron '>' */
    .custom-select-wrapper {
        position: relative;
    }
    .custom-select-wrapper .form-select {
        appearance: none;
        -webkit-appearance: none;
        padding-right: 18px !important;
    }
    .custom-select-wrapper .custom-arrow {
        position: absolute;
        right: 8px;
        top: 48%;
        transform: translateY(-50%);
        font-size: 11px;
        font-weight: bold;
        color: #556677;
        pointer-events: none;
    }

    /* Magnifying glass handler embedded natively inside table field structure */
    .search-input-wrapper {
        position: relative;
    }
    .search-input-wrapper::before {
        content: "🔍";
        position: absolute;
        left: 8px;
        top: 52%;
        transform: translateY(-50%);
        font-size: 11px;
        z-index: 3;
        opacity: 0.7;
    }
    .search-input-wrapper .form-control {
        padding-left: 24px !important;
    }

    /* Vertical Double Deck layout wrapper for report outputs */
    .stacked-action-buttons {
        display: flex;
        flex-direction: column;
        gap: 4px;
        justify-content: center;
        align-items: center;
        padding-left: 2px;
        padding-right: 2px;
    }

    /* Small Squared report configuration buttons design specs */
    .report-mini-btn {
        height: 30px;
        width: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff !important;
        border: 1px solid #e0cfbe !important;
        border-radius: 4px !important;
        font-size: 11px;
        padding: 0;
    }
    #cm_vol_report_exl_btn { color: #1e7043 !important; }
    #cm_vol_report_pdf_btn { color: #e02424 !important; }

    /* Tall Solid Deep Primary Blue Button matching perfectly to double rows height */
    .load-btn {
        height: 30px;
        font-size: 12px !important;
        font-weight: 700 !important;
        letter-spacing: 0.2px;
        background-color: #0072A7 !important;
        border: 1px solid #005580 !important;
        color: #ffffff !important;
        border-radius: 6px !important;
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
    }
    .load-btn:hover {
        background-color: #004466 !important;
    }

    /* Result list container layout overrides */
    #filing_dataLoad_customize {
        padding-bottom: 20px;
    }
    .list-placeholder {
        font-size: 12.5px;
        color: #9aa7b6 !important;
    }
</style>