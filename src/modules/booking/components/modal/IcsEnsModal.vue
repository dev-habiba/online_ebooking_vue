

<template>
    <div class="row">
      <input type="hidden" name="row_id" id="row_id" value="">

      <div class="table-responsive table-spacing ics_ens_tb">
          <table class="table table-borderless">
              <tbody>
                  <tr class="text-center border_bottom_dot">
                      <td></td>
                      <td style="width: 130px;"></td>
                      <td style="width: 20px;"></td>
                      <td></td>
                      <td style="width: 78px;"></td>
                      <td style="width: 20px;"></td>
                      <td style="width: 100px;"></td>
                      <th><span>ACTUAL SHIPPER/SELLER</span></th>
                      <td style="width: 20px;"></td>
                      <th><span>ACTUAL CONSIGNEE/BUYER</span></th>
                      <td style="width: 20px;"></td>
                      <th><span>ULTIMATE NOTIFY PARTY</span></th>

                  </tr>
                  <tr class="text-center border_bottom_dot">
                      <th>
                          <div class="df_sb_ai_h">
                              <span>BILL</span>
                              <span class="sp_cln_mg">:</span>
                          </div>
                      </th>
                      <td>
                          <select class="form-select mt2_mb1" name="billing_id" id="billing_id" autocomplete="off">
                            <option value=""></option>
                            <option value="1004">1004</option>
                            <option value="ACCORD">ACCORD</option>
                            <option value="ACEM">ACEM</option>
                            <option value="AEFREIGHT">AEFREIGHT</option>
                            <option value="AFFREIGHTER">AFFREIGHTER</option>
                            <option value="AIRMARINE">AIRMARINE</option>
                            <option value="ALL">ALL</option>
                            <option value="AOLV2">AOLV2</option>
                            <option value="APEX">APEX</option>
                            <option value="BAEI">BAEI</option>
                            <option value="BAL">BAL</option>
                            <option value="BALV2">BALV2</option>
                            <option value="BLUEOCEANBD">BLUEOCEANBD</option>
                            <option value="BOF">BOF</option>
                            <option value="CARGOINT">CARGOINT</option>
                            <option value="CARGOONE">CARGOONE</option>
                            <option value="CFGLOBAL">CFGLOBAL</option>
                            <option value="CFL">CFL</option>
                            <option value="CLL">CLL</option>
                            <option value="CMS">CMS</option>
                            <option value="COMPLETESHIP">COMPLETESHIP</option>
                            <option value="CONF">CONF</option>
                            <option value="CONV">CONV</option>
                            <option value="CROWNCONT">CROWNCONT</option>
                            <option value="DEMO">DEMO</option>
                            <option value="ELITE">ELITE</option>
                            <option value="ELL">ELL</option>
                            <option value="EQUUS">EQUUS</option>
                            <option value="EXPOFREIGHT">EXPOFREIGHT</option>
                            <option value="EXPOLIGENTIA">EXPOLIGENTIA</option>
                            <option value="FAGE">FAGE</option>
                            <option value="FCBD">FCBD</option>
                            <option value="FML">FML</option>
                            <option value="FOPTIONS">FOPTIONS</option>
                            <option value="GFFL">GFFL</option>
                            <option value="HTC">HTC</option>
                            <option value="HUB">HUB</option>
                            <option value="ISLBD">ISLBD</option>
                            <option value="JMT">JMT</option>
                            <option value="KTS">KTS</option>
                            <option value="LINKMARK">LINKMARK</option>
                            <option value="MARVEL">MARVEL</option>
                            <option value="MCCINDIA">MCCINDIA</option>
                            <option value="NEXGEN">NEXGEN</option>
                            <option value="NEXUS">NEXUS</option>
                            <option value="NLL">NLL</option>
                            <option value="PAN">PAN</option>
                            <option value="PIONEERMM">PIONEERMM</option>
                            <option value="PREGLOLINK">PREGLOLINK</option>
                            <option value="RADIANT">RADIANT</option>
                            <option value="RELIABLE">RELIABLE</option>
                            <option value="RMK">RMK</option>
                            <option value="RSLOG">RSLOG</option>
                            <option value="SAILORS">SAILORS</option>
                            <option value="SHINE">SHINE</option>
                            <option value="SKYL">SKYL</option>
                            <option value="SSBD">SSBD</option>
                            <option value="SWIFT">SWIFT</option>
                            <option value="TCSL">TCSL</option>
                            <option value="TGTRANS">TGTRANS</option>
                            <option value="TIMELOG">TIMELOG</option>
                            <option value="TLIBD">TLIBD</option>
                            <option value="TPL">TPL</option>
                            <option value="TRANSPLACE">TRANSPLACE</option>
                            <option value="TRUST">TRUST</option>
                            <option value="UCL">UCL</option>
                            <option value="VISA">VISA</option>
                            <option value="WACBD">WACBD</option>
                            <option value="WGLBD">WGLBD</option>
                            <option value="WINGS">WINGS</option>
                            <option value="YELLOW">YELLOW</option>
                          </select>
                      </td>
                      <td></td>
                      <th>
                          <div class="df_sb_ai_h">
                              <span>POL</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      <!-- POL -->
                      <td class="pos_rel">
                          <div class="pol_code_box position-relative">

                              <input type="text" name="from_location" id="from_location" class="form-control uppercase-only mt2_mb1" placeholder="🔍3+ chars" autocomplete="off">
                              
                              <div id="pol_loader" class="pol_loader circle-dot-loader" style="display:none;">
                                  <div></div><div></div><div></div><div></div>
                                  <div></div><div></div><div></div><div></div>
                              </div>

                              <div id="pol_suggestions_box" class="global-suggestions-box" style="width: 540px !important; display: none;"></div>

                          </div>
                      </td>

                      <td></td>
                      <th class="text-end">
                          <span class="me-2">Name :</span> 
                      </th>
                      <!-- SHIPPER -->
                      <td>
                          <div class="df_sb_ai">
                              <div class="flx_pos_rel position-relative">
                                  <input type="text" name="shipper_name" id="shipper_name" class="form-control uppercase-only" placeholder="Party Name Only" autocomplete="off">
                                  
                                  
                                  <div id="shipper_loader" class="shipper_loader circle-dot-loader" style="display:none;">
                                      <div></div><div></div><div></div><div></div>
                                      <div></div><div></div><div></div><div></div>
                                  </div>

                                  
                                  <div id="shipper_suggestions_box" class="global-suggestions-box" style="max-height: 450px; left: -200px; width: 850px !important; display: none;"></div>
                              </div>

                              <!-- <button type="button" class="btn btn-primary bg-gradient open-second-modal plus-box-btn ml4" data-bs-target="#customerModal">
                                  <iconify-icon icon="mdi:plus-box" class="align-middle"><template shadowrootmode="open">
                                  
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"></path></svg></template></iconify-icon>
                              </button> -->
                          </div>

                          <small id="shipper_message" class="color_red"></small>
                      </td>

                      <td></td>
                      <!-- CONSIGNEE -->
                      <td>
                          <div class="df_sb_ai">
                              <div class="flx_pos_rel position-relative">
                                  
                                  <input type="text" name="consignee_name" id="consignee_name" class="form-control uppercase-only" placeholder="Party Name Only" autocomplete="off">
                                  
                                  
                                  
                                  <div id="consignee_loader" class="consignee_loader circle-dot-loader" style="display:none;">
                                      <div></div><div></div><div></div><div></div>
                                      <div></div><div></div><div></div><div></div>
                                  </div>

                                  
                                  <div id="consignee_suggestions_box" class="global-suggestions-box" style="max-height: 450px; right: 0px; left: auto; width: 850px !important; display: none;"></div>
                              </div>

                              <!-- <button type="button" class="btn btn-primary bg-gradient open-second-modal plus-box-btn ml4" data-bs-target="#customerModal">
                                  <iconify-icon icon="mdi:plus-box" class="align-middle"><template shadowrootmode="open">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"></path></svg></template></iconify-icon>
                              </button> -->
                          </div>

                          <small id="consignee_message" class="color_red"></small>
                      </td>
                      <td></td>
                      <!-- NOTIFY -->
                      <td>
                          <div class="df_sb_ai">

                              <!-- <input type="checkbox" id="copy_notify" name="copy_notify" value="Bike" title="Same of Consignee">  -->

                              <div class="flx_pos_rel position-relative">
                                  <input type="text" name="notify_name" id="notify_name" class="form-control uppercase-only" placeholder="Party Name Only" autocomplete="off">
                                  
                                  
                                  <div id="notify_loader" class="notify_loader circle-dot-loader" style="display:none;">
                                      <div></div><div></div><div></div><div></div>
                                      <div></div><div></div><div></div><div></div>
                                  </div>

                                  
                                  <div id="notify_suggestions_box" class="global-suggestions-box" style="max-height: 450px; right: 0px; left: auto; width: 850px !important; display: none;"></div>

                                  <div id="notify_loader" class="circle-dot-loader display_none">
                                      <div></div><div></div><div></div><div></div>
                                      <div></div><div></div><div></div><div></div>
                                  </div>
                              </div>

                              <!-- <button type="button" class="btn btn-primary bg-gradient open-second-modal plus-box-btn ml4" data-bs-target="#customerModal">
                                  <iconify-icon icon="mdi:plus-box" class="align-middle"><template shadowrootmode="open">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"></path></svg></template></iconify-icon>
                              </button> -->
                          </div>

                          <small id="notify_message" class="color_red"></small>
                      </td>
                  </tr>
                  <tr class="text-center border_bottom_dot">
                      <th>
                          <div class="df_sb_ai_h">
                              <span>HBL</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      <td>
                          <input type="text" name="hbl_no" id="hbl_no" class="form-control mt1_mb1" autocomplete="off">
                      </td>
                      <td></td>
                      <th>
                          <div class="df_sb_ai_h">
                              <span>POD</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                 
                      </th>

                      <!-- POD -->
                      <td class="pos_rel">
                          <div class="pod_code_box position-relative">
                              <input type="text" name="to_location" id="to_location" class="form-control uppercase-only mt2_mb1" placeholder="🔍3+ chars" autocomplete="off">

                              <div id="pod_loader" class="pod_loader circle-dot-loader" style="display:none;">
                                  <div></div><div></div><div></div><div></div>
                                  <div></div><div></div><div></div><div></div>
                              </div>

                              <div id="pod_suggestions_box" class="global-suggestions-box" style="width: 540px !important; display: none;"></div>
                          </div>

                      </td>

                      <td></td>
                      <th class="text-end">
                          <span class="me-2">Address :</span> 
                      </th>
                      <td>
                          <input type="text" name="shipper_address" id="shipper_address" class="form-control" autocomplete="off">
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <input type="text" name="consignee_address" id="consignee_address" class="form-control" autocomplete="off">
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <input type="text" name="notify_address" id="notify_address" class="form-control" autocomplete="off">
                      </td>
                  </tr>
                  <tr class="text-center border_bottom_dot">
                      <th>
                          <div class="df_sb_ai_h">
                              <span>EORI</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      <td>
                          <select class="form-select mt1_mb1" name="nvocc_scac" id="nvocc_scac" autocomplete="off"><option value=""></option><option value="BEBD000002">BEBD000002</option><option value="NL827829097">NL827829097 - AFFREIGHTER </option><option value="FRBD1216059860001">FRBD1216059860001 - Bengal Airlift</option><option value="DE971084973218981">DE971084973218981 - CARGOAIM</option><option value="BEBD000002">BEBD000002 - CARGOAIM (CARGOPLANT)</option><option value="BEBD000002">BEBD000002 - CARGOPLANT</option><option value="FRBD1216056350001">FRBD1216056350001 - Edison Logistics</option><option value="FRBD1216018150001">FRBD1216018150001 - FREIGHT MANAGEMENT LIMITED</option><option value="FRBD1216134260001">FRBD1216134260001 - KTS Logistics Limited</option><option value="FRMM1216231470001">FRMM1216231470001 - LINKMARK</option><option value="BEBD000001">BEBD000001 - Multimodal</option><option value="FRBD1216209500001">FRBD1216209500001 - NAVANA LOGISTICS LIMITED</option><option value="FRBD1216209030001">FRBD1216209030001 - NEXGEN FREIGHT LTD.</option><option value="FRBD1216057390001">FRBD1216057390001 - Reliable Express</option><option value="FRBD1216112510001">FRBD1216112510001 - UNION CONSORTIUM LIMITED</option></select>
                      </td>
                      <td class="width_20"></td>
                      <th>
                          <div class="df_sb_ai_h">
                              <span>TS1</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      <td>
                          <select class="form-select ts_one mt1_mb1" name="ts_one" id="ts_one" autocomplete="off"><option value=""></option><option value="BE">BE - Belgium</option><option value="CN">CN - China</option><option value="CO">CO - Colombia</option><option value="EG">EG - Egypt</option><option value="FR">FR - France</option><option value="DE">DE - Germany</option><option value="GR">GR - Greece</option><option value="IN">IN - India</option><option value="IT">IT - Italy</option><option value="MY">MY - Malaysia</option><option value="MT">MT - Malta</option><option value="MA">MA - Morocco</option><option value="NL">NL - Netherlands</option><option value="OM">OM - Oman</option><option value="PT">PT - Portugal</option><option value="SG">SG - Singapore</option><option value="SI">SI - Slovenia</option><option value="KR">KR - South Korea</option><option value="ES">ES - Spain</option><option value="LK">LK - Sri Lanka</option><option value="TR">TR - Turkey</option><option value="GB">GB - United Kingdom</option></select>
                      </td>
                      <td class="width_20"></td>
                      <th class="text-end">
                          <span class="mr2">Country/City :</span> 
                      </th>
                      <td>
                          <div class="d-flex gap-1">
                              <input type="text" name="shipper_country" id="shipper_country" class="form-control" placeholder="Country" autocomplete="off">
                              <input type="text" name="shipper_location" id="shipper_location" class="form-control" placeholder="City" autocomplete="off">
                          </div>
                      </td>
                      <td class="width_20"></td>  
                      <td>
                          <div class="d-flex gap-1">
                              <input type="text" name="consignee_country" id="consignee_country" class="form-control" placeholder="Country" autocomplete="off">
                              <input type="text" name="consignee_location" id="consignee_location" class="form-control" placeholder="City" autocomplete="off">
                          </div>
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <div class="d-flex gap-1">
                              <input type="text" name="notify_country" id="notify_country" class="form-control" placeholder="Country" autocomplete="off">
                              <input type="text" name="notify_location" id="notify_location" class="form-control" placeholder="City" autocomplete="off">
                          </div>
                      </td>
                  </tr>
                  <tr class="text-center border_bottom_dot">
                      <th>
                          <div class="df_sb_ai_h">
                              <span>MBL</span>
                              <span class="sp_cln_mg">:</span>
                          </div>
                      </th>
                      <td>
                          <input type="text" name="mbl_no" id="mbl_no" class="form-control mt1_mb1" autocomplete="off">
                      </td>
                      <td class="width_20"></td>
                      <th>
                          <div class="df_sb_ai_h">
                              <span>TS2</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      
                      <td>
                          <select class="form-select ts_two" name="ts_two" id="ts_two" autocomplete="off"><option value=""></option><option value="BE">BE - Belgium</option><option value="CN">CN - China</option><option value="CO">CO - Colombia</option><option value="EG">EG - Egypt</option><option value="FR">FR - France</option><option value="DE">DE - Germany</option><option value="GR">GR - Greece</option><option value="IN">IN - India</option><option value="IT">IT - Italy</option><option value="MY">MY - Malaysia</option><option value="MT">MT - Malta</option><option value="MA">MA - Morocco</option><option value="NL">NL - Netherlands</option><option value="OM">OM - Oman</option><option value="PT">PT - Portugal</option><option value="SG">SG - Singapore</option><option value="SI">SI - Slovenia</option><option value="KR">KR - South Korea</option><option value="ES">ES - Spain</option><option value="LK">LK - Sri Lanka</option><option value="TR">TR - Turkey</option><option value="GB">GB - United Kingdom</option></select>
                      </td>
                      <td class="width_20"></td>
                      <th class="text-end">
                          <span class="mr2">Phone/Postal :</span> 
                      </th>
                      <td>
                          <div class="d-flex gap-1">
                              <input type="text" name="shipper_phone" id="shipper_phone" class="form-control" placeholder="Phone" autocomplete="off">
                              <input type="text" name="shipper_zip_code" id="shipper_zip_code" class="form-control" placeholder="Postal/Zip" autocomplete="off">
                          </div>
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <div class="d-flex gap-1">
                              <input type="text" name="consignee_phone" id="consignee_phone" class="form-control" placeholder="Phone" autocomplete="off">
                              <input type="text" name="consignee_zip_code" id="consignee_zip_code" class="form-control" placeholder="Postal/Zip" autocomplete="off">
                          </div>
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <div class="d-flex gap-1">
                              <input type="text" name="notify_phone" id="notify_phone" class="form-control" placeholder="Phone" autocomplete="off">
                              <input type="text" name="notify_zip_code" id="notify_zip_code" class="form-control" placeholder="Postal/Zip" autocomplete="off">
                          </div>
                      </td>
                  </tr>

                  <tr class="text-center border_bottom_dot">
                      <th>
                          <div class="df_sb_ai_h">
                              <span>EORI</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      <td>
                          <select class="form-select mt1_mb1" name="carrier_scac" id="carrier_scac" autocomplete="off"><option value=""></option><option value="FR56202442200486">CMA - FR56202442200486</option><option value="DE7759959">COSCO - DE7759959</option><option value="DE6982379">Evergreen - DE6982379</option><option value="DE2742004">Hapag - DE2742004</option><option value="DE5390214">HMM - Hyundai - DE5390214</option><option value="DK32345794">Maersk Line - DK32345794</option><option value="FR39054982200083">MSC - FR39054982200083</option><option value="BEGB000109">ONE - BEGB000109</option><option value="NL825860003">OOCL (Only for : Turkiye / Poland / Russia) - NL825860003</option><option value="NL821606931">OOCL (Other Countries) - NL821606931</option><option value="DE376183265590167">Tailwind - DE376183265590167</option><option value="NL805314696">YML - NL805314696</option></select>
                      </td>
                      <td class="width_20"></td>
                      <th>
                          <div class="df_sb_ai_h">
                              <span>TS3</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      <td>
                          <select class="form-select ts_three" name="ts_three" id="ts_three" autocomplete="off"><option value=""></option><option value="BE">BE - Belgium</option><option value="CN">CN - China</option><option value="CO">CO - Colombia</option><option value="EG">EG - Egypt</option><option value="FR">FR - France</option><option value="DE">DE - Germany</option><option value="GR">GR - Greece</option><option value="IN">IN - India</option><option value="IT">IT - Italy</option><option value="MY">MY - Malaysia</option><option value="MT">MT - Malta</option><option value="MA">MA - Morocco</option><option value="NL">NL - Netherlands</option><option value="OM">OM - Oman</option><option value="PT">PT - Portugal</option><option value="SG">SG - Singapore</option><option value="SI">SI - Slovenia</option><option value="KR">KR - South Korea</option><option value="ES">ES - Spain</option><option value="LK">LK - Sri Lanka</option><option value="TR">TR - Turkey</option><option value="GB">GB - United Kingdom</option></select>
                      </td>
                      <td class="width_20"></td>
                      <th class="text-end">
                          <span class="mr2">Email :</span> 
                      </th>
                      <td>
                          <input type="text" name="shipper_email" id="shipper_email" class="form-control" placeholder="Email" autocomplete="off">
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <input type="text" name="consignee_email" id="consignee_email" class="form-control" placeholder="Email" autocomplete="off">
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <input type="text" name="notify_email" id="notify_email" class="form-control" placeholder="Email" autocomplete="off">
                      </td>
                  </tr>
                  <tr class="text-center border_bottom_dot">
                      <th>
                          <div class="df_sb_ai_h">
                              <span>I/EX</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>
                      <td>
                          <select class="form-select mt1_mb2" name="import_export" id="import_export" autocomplete="off">
                              <option value=""></option>
                              <option value="IMPORT">IMP to EU/N.IRELAND/NORWAY/SWITZERLAND</option>
                              <option value="EXPORT">EXP from EU/N.IRELAND/NORWAY/SWITZERLAND</option>
                              <option value="FROB">FROB To EU/N.IRELAND/NORWAY/SWITZERLAND</option>
                          </select>
                      </td>
                      <td class="width_20"></td>
                      <th>
                          <div class="df_sb_ai_h_ws">
                              <span>PP/C</span>
                              <span class="sp_cln_mg">:</span>
                          </div>                                                
                      </th>

                      <td>
                          <select class="form-select mt1_mb2" name="incoterm" id="incoterm" autocomplete="off">
                              <option value=""></option>
                              <option value="A">Prepaid</option>
                              <option value="Z">Collect</option>
                          </select>
                      </td>
                      <td class="width_20"></td>
                      <th class="text-end">
                          <span class="mr2">LIC/BIN/EORI :</span> 
                      </th>
                      <td>
                          <input type="text" name="shipper_registration" id="shipper_registration" class="form-control mt1_mb2" placeholder="License/ BIN/ VAT/ TAX/ EORI" autocomplete="off">
                                  
                          <input type="hidden" name="shipper_code" id="shipper_code" autocomplete="off">
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <input type="text" name="consignee_registration" id="consignee_registration" class="form-control mt1_mb2" placeholder="License/ BIN/ VAT/ TAX/ EORI" autocomplete="off">
                                  
                          <input type="hidden" name="consignee_code" id="consignee_code" autocomplete="off">
                      </td>
                      <td class="width_20"></td>
                      <td>
                          <input type="text" name="notify_registration" id="notify_registration" class="form-control mt1_mb2" placeholder="License/ BIN/ VAT/ TAX/ EORI" autocomplete="off">
                          
                          <input type="hidden" name="notify_code" id="notify_code" autocomplete="off">
                      </td>
                  </tr>

              </tbody>
          </table>
      </div>
  </div>

  <div class="row">
    <div class="container_table">
        <table class="table table-bordered" id="container_table">
          <thead class="table-header">
              <tr>
                <th style="width: 20px;">SN</th>
                <th style="width: 120px;">CONTAINER</th>
                <th style="width: 55px;">SIZE</th>
                <th style="width: 108px;">SEAL</th>
                <th style="width: 60px;">QTY</th>
                <th style="width: 85px;">TYPE</th>
                <th style="width: 60px;">KG</th>
                <th style="width: 60px;">CBM</th>
                <th style="width: 65px;">HS CODE</th>
                <th style="width: 50px;">UN/DG</th>
                <th style="width: 130px;">MARKS</th>
                <th style="width: auto;">CLEAR CARGO DESCRIPTION</th>
                <th style="width: 35px;" title="Save">-</th>
                <th style="width: 35px;" title="Copy">-</th>
                <th style="width: 35px;">
                    <button type="button" id="container_row_add_btn" class="btn btn-primary">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </th>
              </tr>
          </thead>

          <tbody id="container_table_tbody">
            <tr class="text-center">
              <td>1</td>
              <td>
                <input type="hidden" name="row_id_eqd[1]" id="row_id_eqd[1]" autocomplete="off">
                <input type="text" name="container_no[1]" id="container_no[1]" class="form-control container-no" maxlength="11" autocomplete="off">
              </td>
              <td>
                <select class="form-select" name="size_iso[1]" id="size_iso[1]" autocomplete="off">
                  <option value=""></option>
                  <option value="20DV">20DV</option>
                  <option value="20FF">20FF</option>
                  <option value="20FR">20FR</option>
                  <option value="20GP">20FT</option>
                  <option value="20HC">20HC</option>
                  <option value="20HR">20HR</option>
                  <option value="20RN">20NOR</option>
                  <option value="20OT">20OT</option>
                  <option value="20RF">20RF</option>
                  <option value="20RE">20RF</option>
                  <option value="40DV">40DV</option>
                  <option value="40FF">40FF</option>
                  <option value="40FR">40FR</option>
                  <option value="40GP">40GP</option>
                  <option value="40HC">40HC</option>
                  <option value="45HC">40HC</option>
                  <option value="40HQ">40HQ</option>
                  <option value="40HR">40HR</option>
                  <option value="40RH">40HR</option>
                  <option value="40HN">40NOR</option>
                  <option value="40OT">40OT</option>
                  <option value="40RE">40RF</option>
                  <option value="40RF">40RF</option>
                  <option value="45HQ">45HQ</option>
                  <option value="Bulk">BBULK</option>
                  <option value="BBUL">BBULK</option>
                  <option value="TBA">TBA</option>
                </select>
              </td>
              <td>
                <input type="text" name="seal_no[1]" id="seal_no[1]" class="form-control seal_no" autocomplete="off">
              </td>
              <td>
                <input type="text" name="pkg_qty[1]" id="pkg_qty[1]" class="form-control pkg_qty" autocomplete="off">
              </td>
              <td>
                <select class="form-select" name="pkg_type[1]" id="pkg_type[1]" autocomplete="off">
                  <option value=""></option>
                  <option value="AM">Ampoule, non-protect</option>
                  <option value="AP">Ampoule, protected</option>
                  <option value="BG">BAG</option>
                  <option value="5L">Bag, textile</option>
                  <option value="BN">Bale </option>
                  <option value="BL">Bale</option>
                  <option value="BF">Balloon, non-protect</option>
                  <option value="BA">Barrel </option>
                  <option value="2C">Barrel, wooden</option>
                  <option value="BX">Box </option>
                  <option value="4G">Box, fibreboard</option>
                  <option value="4D">Box, plywood</option>
                  <option value="4A">Box, steel</option>
                  <option value="QP">Box, wooden, natural</option>
                  <option value="QQ">Box, wooden, natural</option>
                  <option value="VL">Bulk, liquid</option>
                  <option value="BE">Bundle </option>
                  <option value="CW">Cage, roll</option>
                  <option value="CA">Can, rectangular</option>
                  <option value="CI">Canister</option>
                  <option value="CO">Carboy, non-protecte</option>
                  <option value="CP">Carboy, protected</option>
                  <option value="CT">Carton</option>
                  <option value="C2">CARTONS</option>
                  <option value="C8">CARTONS</option>
                  <option value="CQ">Cartridge</option>
                  <option value="CS">Case</option>
                  <option value="EF">Case, with pallet ba</option>
                  <option value="EE">Case, with pallet ba</option>
                  <option value="ED">Case, with pallet ba</option>
                  <option value="6P">Comp. pkg, glass rec</option>
                  <option value="YY">Comp. pkg, glass rec</option>
                  <option value="6H">Comp. pkg, plastic r</option>
                  <option value="YA">Comp. pkg, plastic r</option>
                  <option value="YH">Comp. pkg, plastic r</option>
                  <option value="CR">Crate</option>
                  <option value="CY">Cylinder</option>
                  <option value="DR">Drum </option>
                  <option value="1B">Drum, aluminium</option>
                  <option value="IH">Drum, plastic</option>
                  <option value="1W">Drum, wooden</option>
                  <option value="WA">Int. bulk cont.</option>
                  <option value="JR">Jar </option>
                  <option value="JU">JUMBO BAGS</option>
                  <option value="LD3">LD3</option>
                  <option value="LD6">LD6</option>
                  <option value="LD9">LD9</option>
                  <option value="LV">Liftvan</option>
                  <option value="LO">LOOSE</option>
                  <option value="MA">Master Carton</option>
                  <option value="PK">Package</option>
                  <option value="IF">Package</option>
                  <option value="LS">PACKAGE</option>
                  <option value="IB">Package, display, ca</option>
                  <option value="IC">Package, display, pl</option>
                  <option value="IA">Package, display, wo</option>
                  <option value="IG">Package, paper wrapp</option>
                  <option value="IE">Package, show</option>
                  <option value="PA">Packet </option>
                  <option value="PX">Pallet</option>
                  <option value="PB">Pallet, box</option>
                  <option value="AF">Pallet, modular, col</option>
                  <option value="PE">Pallet, modular, col</option>
                  <option value="AG">Pallet, shrinkwrappe</option>
                  <option value="PC">Parcel</option>
                  <option value="PS">PIECE</option>
                  <option value="PP">Pieces</option>
                  <option value="PZ">Planks, in bundle/bu</option>
                  <option value="PG">Plate</option>
                  <option value="RL">Reel</option>
                  <option value="RO">Roll </option>
                  <option value="SA">Sack</option>
                  <option value="SE">SET</option>
                  <option value="ST">Sheet </option>
                  <option value="SI">Skid</option>
                  <option value="TY">Tank, cylindrical </option>
                  <option value="TK">Tank, rectangular</option>
                  <option value="DW">Tray, two layers no </option>
                  <option value="TS">Truss </option>
                  <option value="TD">Tube, collapsible</option>
                  <option value="UN">UNIT</option>
                  <option value="NG">Unpacked or unpackag</option>
                  <option value="YF">wooden box</option>
                  <option value="QH">wooden BOX</option>
                  <option value="YS">wooden box</option>
                  <option value="W3">WOODEN BOX</option>
                  <option value="W4">Wooden Crate</option>
              </select>
              </td>
              <td>
                <input type="text" name="weight_kg[1]" id="weight_kg[1]" class="form-control weight_kg" autocomplete="off">
              </td>
              <td>
                <input type="text" name="cbm[1]" id="cbm[1]" class="form-control cbm" autocomplete="off">
              </td>
              <td>
                <input type="text" name="hs_code[1]" id="hs_code[1]" class="form-control hs_code" autocomplete="off">
              </td>
              <td>
                <input type="text" name="un_code_dg[1]" id="un_code_dg[1]" class="form-control uppercase-only" autocomplete="off">
              </td>
              <td>
                <input type="text" name="cargo_marks[1]" id="cargo_marks[1]" class="form-control uppercase-only" autocomplete="off">
              </td>
              <td>
                <input type="text" name="cargo_description[1]" id="cargo_description[1]" class="form-control uppercase-only" autocomplete="off">
              </td>

              <td>
                <button type="button" class="filing_container_btn container_row_save_btn" title="Save">
                    <i class="fas fa-save"></i>
                </button>
              </td>
              <td>
                <button type="button" class="filing_container_btn container_row_copy_btn" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
              </td>
              <td>
                <button type="button" class="filing_container_btn container_row_delete_btn" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr class="text-center">
              <td>1</td>
              <td>
                <input type="hidden" name="row_id_eqd[1]" id="row_id_eqd[1]" autocomplete="off">
                <input type="text" name="container_no[1]" id="container_no[1]" class="form-control container-no" maxlength="11" autocomplete="off">
              </td>
              <td>
                <select class="form-select" name="size_iso[1]" id="size_iso[1]" autocomplete="off">
                  <option value=""></option>
                  <option value="20DV">20DV</option>
                  <option value="20FF">20FF</option>
                  <option value="20FR">20FR</option>
                  <option value="20GP">20FT</option>
                  <option value="20HC">20HC</option>
                  <option value="20HR">20HR</option>
                  <option value="20RN">20NOR</option>
                  <option value="20OT">20OT</option>
                  <option value="20RF">20RF</option>
                  <option value="20RE">20RF</option>
                  <option value="40DV">40DV</option>
                  <option value="40FF">40FF</option>
                  <option value="40FR">40FR</option>
                  <option value="40GP">40GP</option>
                  <option value="40HC">40HC</option>
                  <option value="45HC">40HC</option>
                  <option value="40HQ">40HQ</option>
                  <option value="40HR">40HR</option>
                  <option value="40RH">40HR</option>
                  <option value="40HN">40NOR</option>
                  <option value="40OT">40OT</option>
                  <option value="40RE">40RF</option>
                  <option value="40RF">40RF</option>
                  <option value="45HQ">45HQ</option>
                  <option value="Bulk">BBULK</option>
                  <option value="BBUL">BBULK</option>
                  <option value="TBA">TBA</option>
                </select>
              </td>
              <td>
                <input type="text" name="seal_no[1]" id="seal_no[1]" class="form-control seal_no" autocomplete="off">
              </td>
              <td>
                <input type="text" name="pkg_qty[1]" id="pkg_qty[1]" class="form-control pkg_qty" autocomplete="off">
              </td>
              <td>
                <select class="form-select" name="pkg_type[1]" id="pkg_type[1]" autocomplete="off">
                  <option value=""></option>
                  <option value="AM">Ampoule, non-protect</option>
                  <option value="AP">Ampoule, protected</option>
                  <option value="BG">BAG</option>
                  <option value="5L">Bag, textile</option>
                  <option value="BN">Bale </option>
                  <option value="BL">Bale</option>
                  <option value="BF">Balloon, non-protect</option>
                  <option value="BA">Barrel </option>
                  <option value="2C">Barrel, wooden</option>
                  <option value="BX">Box </option>
                  <option value="4G">Box, fibreboard</option>
                  <option value="4D">Box, plywood</option>
                  <option value="4A">Box, steel</option>
                  <option value="QP">Box, wooden, natural</option>
                  <option value="QQ">Box, wooden, natural</option>
                  <option value="VL">Bulk, liquid</option>
                  <option value="BE">Bundle </option>
                  <option value="CW">Cage, roll</option>
                  <option value="CA">Can, rectangular</option>
                  <option value="CI">Canister</option>
                  <option value="CO">Carboy, non-protecte</option>
                  <option value="CP">Carboy, protected</option>
                  <option value="CT">Carton</option>
                  <option value="C2">CARTONS</option>
                  <option value="C8">CARTONS</option>
                  <option value="CQ">Cartridge</option>
                  <option value="CS">Case</option>
                  <option value="EF">Case, with pallet ba</option>
                  <option value="EE">Case, with pallet ba</option>
                  <option value="ED">Case, with pallet ba</option>
                  <option value="6P">Comp. pkg, glass rec</option>
                  <option value="YY">Comp. pkg, glass rec</option>
                  <option value="6H">Comp. pkg, plastic r</option>
                  <option value="YA">Comp. pkg, plastic r</option>
                  <option value="YH">Comp. pkg, plastic r</option>
                  <option value="CR">Crate</option>
                  <option value="CY">Cylinder</option>
                  <option value="DR">Drum </option>
                  <option value="1B">Drum, aluminium</option>
                  <option value="IH">Drum, plastic</option>
                  <option value="1W">Drum, wooden</option>
                  <option value="WA">Int. bulk cont.</option>
                  <option value="JR">Jar </option>
                  <option value="JU">JUMBO BAGS</option>
                  <option value="LD3">LD3</option>
                  <option value="LD6">LD6</option>
                  <option value="LD9">LD9</option>
                  <option value="LV">Liftvan</option>
                  <option value="LO">LOOSE</option>
                  <option value="MA">Master Carton</option>
                  <option value="PK">Package</option>
                  <option value="IF">Package</option>
                  <option value="LS">PACKAGE</option>
                  <option value="IB">Package, display, ca</option>
                  <option value="IC">Package, display, pl</option>
                  <option value="IA">Package, display, wo</option>
                  <option value="IG">Package, paper wrapp</option>
                  <option value="IE">Package, show</option>
                  <option value="PA">Packet </option>
                  <option value="PX">Pallet</option>
                  <option value="PB">Pallet, box</option>
                  <option value="AF">Pallet, modular, col</option>
                  <option value="PE">Pallet, modular, col</option>
                  <option value="AG">Pallet, shrinkwrappe</option>
                  <option value="PC">Parcel</option>
                  <option value="PS">PIECE</option>
                  <option value="PP">Pieces</option>
                  <option value="PZ">Planks, in bundle/bu</option>
                  <option value="PG">Plate</option>
                  <option value="RL">Reel</option>
                  <option value="RO">Roll </option>
                  <option value="SA">Sack</option>
                  <option value="SE">SET</option>
                  <option value="ST">Sheet </option>
                  <option value="SI">Skid</option>
                  <option value="TY">Tank, cylindrical </option>
                  <option value="TK">Tank, rectangular</option>
                  <option value="DW">Tray, two layers no </option>
                  <option value="TS">Truss </option>
                  <option value="TD">Tube, collapsible</option>
                  <option value="UN">UNIT</option>
                  <option value="NG">Unpacked or unpackag</option>
                  <option value="YF">wooden box</option>
                  <option value="QH">wooden BOX</option>
                  <option value="YS">wooden box</option>
                  <option value="W3">WOODEN BOX</option>
                  <option value="W4">Wooden Crate</option>
              </select>
              </td>
              <td>
                <input type="text" name="weight_kg[1]" id="weight_kg[1]" class="form-control weight_kg" autocomplete="off">
              </td>
              <td>
                <input type="text" name="cbm[1]" id="cbm[1]" class="form-control cbm" autocomplete="off">
              </td>
              <td>
                <input type="text" name="hs_code[1]" id="hs_code[1]" class="form-control hs_code" autocomplete="off">
              </td>
              <td>
                <input type="text" name="un_code_dg[1]" id="un_code_dg[1]" class="form-control uppercase-only" autocomplete="off">
              </td>
              <td>
                <input type="text" name="cargo_marks[1]" id="cargo_marks[1]" class="form-control uppercase-only" autocomplete="off">
              </td>
              <td>
                <input type="text" name="cargo_description[1]" id="cargo_description[1]" class="form-control uppercase-only" autocomplete="off">
              </td>

              <td>
                <button type="button" class="filing_container_btn container_row_save_btn" title="Save">
                    <i class="fas fa-save"></i>
                </button>
              </td>
              <td>
                <button type="button" class="filing_container_btn container_row_copy_btn" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
              </td>
              <td>
                <button type="button" class="filing_container_btn container_row_delete_btn" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<style scoped>
.ics_ens_tb table>:not(caption)>*>*
 {
    padding: 0px !important;
 }
.ics_ens_tb{
  padding-left: 20px;
  padding-right: 20px;
 }

.ics_ens_tb table tr th,
.ics_ens_tb table tr td {
    padding-top: 2px!important;
    padding-bottom: 2px!important;
    border-bottom: 1px dotted #eee;
}

 .ics_ens_tb table tr th span,
 .ics_ens_tb table tr th div span {
    font-size: 12px;
    font-weight: 400;
 }


 /*------------ Container Table ---------------*/
 .container_table table>:not(caption)>*>*
 {
    padding: 0px !important;
 }
 .container_table{
    height: 280px;
    padding-left: 20px;
    padding-right: 20px;
 }
 .container_table table tr th,
 .container_table table tr td {
    padding: 1px!important;
 }

 #container_table thead tr th {
    font-size: 12px;
    font-weight: 400;
 }
 
 #container_table #container_row_add_btn {
    width: 23px;
    height: 23px;
    font-size: 12px;
    padding: 1px;
    margin: 2px;
    border-radius: 2px;
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
 }

 .filing_container_btn{
    width: 23px;
    height: 23px;
    border-radius: 5px;
    border: 1px solid transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    font-size: 11px;
    transition: opacity 0.15s, transform 0.1s, background 0.15s;
 }

 .container_row_save_btn {
    background: #e0f2fe;
    color: #0369a1;
    border-color: #bae6fd;
 }

 .container_row_copy_btn {
    background: #fef3c7;
    color: #b45309;
    border-color: #fde68a;
 }
 .container_row_delete_btn {
    background: #fee2e2;
    color: #b91c1c;
    border-color: #fecaca;
 }



</style>
