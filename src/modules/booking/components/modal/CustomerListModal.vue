

<template>
    <div class="p-3">
        <div id="find_Search_Wrapper" style="width: 250px; padding-bottom: 5px;">
            <input type="text" id="custom_search" class="form-control" placeholder="Search...">
        </div>
    
    
        <table class="table table-bordered table-striped display nowrap cust_list_table" style="width: 100%; margin-left: 0px;">
            <thead style="" id="courier_cust_details_cargoaim_table_thead">
                <tr class="text-center" role="row">
                    <th data-dt-column="0" class="dt-orderable-none dt-type-numeric" rowspan="1" colspan="1">
                        <span class="dt-column-title">SN</span>
                        <span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="1" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">Name</span><span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="2" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">Address</span>
                        <span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="3" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">City</span><span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="4" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">State</span>
                        <span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="5" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">Postal Code</span>
                        <span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="6" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">Contract Name</span>
                        <span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="7" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">Phone</span>
                        <span class="dt-column-order"></span>
                    </th>
                    <th data-dt-column="8" class="dt-orderable-none" rowspan="1" colspan="1">
                        <span class="dt-column-title">Email</span>
                        <span class="dt-column-order"></span>
                    </th>
                </tr>
            </thead>
            <tbody id="courier_cust_details_tbody">
                <tr class="cust-row-shipper" data-row-id="16" style="cursor:pointer;">
                    <td class="text-center dt-type-numeric">1</td>
                    <td>AAG WERA  VEWRE WQERRWEQ Q</td>
                    <td>ADAD</td>
                    <td>ARAYO</td>
                    <td>DGF</td>
                    <td>GA</td>
                    <td>ADGA</td>
                    <td>AG</td>
                    <td>fdsfd@fhsh.dgf</td>
                </tr>
                <tr class="cust-row-shipper" data-row-id="3" style="cursor:pointer;">
                    <td class="text-center dt-type-numeric">2</td>
                    <td>DFS EAF WQER Q W</td>
                    <td>GD QW  EW Q DG</td>
                    <td>NLLKN</td>
                    <td>DFAG</td>
                    <td>W WETEQ</td>
                    <td>ad</td>
                    <td>AG</td>
                    <td>fdsfd@fhsh.dgf</td>
                </tr>
                <tr class="cust-row-shipper" data-row-id="4" style="cursor:pointer;">
                    <td class="text-center dt-type-numeric">3</td>
                    <td>DFS EAF WQER Q WD</td>
                    <td>GD QW  EW Q DG DS</td>
                    <td>NLLKN</td>
                    <td>DFAG</td>
                    <td>W WETEQ</td>
                    <td>ad</td>
                    <td>AG</td>
                    <td>fdsfd@fhsh.dgf</td>
                </tr>
                <tr class="cust-row-shipper" data-row-id="5" style="cursor:pointer;">
                    <td class="text-center dt-type-numeric">4</td>
                    <td>DFS EAF WQER Q WD G</td>
                    <td>GD QW  EW Q DG DS SDF</td>
                    <td>NLLKN</td>
                    <td>DFAG</td>
                    <td>W WETEQ</td>
                    <td>ad</td>
                    <td>AG</td>
                    <td>fdsfd@fhsh.dgf</td>
                </tr>
                <tr class="cust-row-shipper" data-row-id="2" style="cursor:pointer;">
                    <td class="text-center dt-type-numeric">5</td>
                    <td>DFS EAF WQER Q WEQW</td>
                    <td>GD QW  EW Q</td>
                    <td>NLLKN</td>
                    <td>DFAG</td>
                    <td>W WETEQ</td>
                    <td>ad</td>
                    <td>AG</td>
                    <td>fdsfd@fhsh.dgf</td>
                </tr>
                <tr class="cust-row-shipper" data-row-id="1" style="cursor:pointer;">
                    <td class="text-center dt-type-numeric">6</td>
                    <td>DFS EAF WQER Q WEQWTE  QRW</td>
                    <td>GD QW  EW Q WE</td>
                    <td>NFNLK</td>
                    <td>DFAG</td>
                    <td>W WETEQ</td>
                    <td>ad</td>
                    <td>AG</td>
                    <td>fdsfd@fhsh.dgf</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .cust_list_table tr th,
    .cust_list_table tr td{
        font-size: 12px;
    }
    input::placeholder, 
    textarea::placeholder {
        font-size: 12px!important;
    }
</style>
