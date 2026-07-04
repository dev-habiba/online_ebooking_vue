import axios from "axios";

export default {
    async getDashboardData(payload){
        // console.log(payload);
        const params = new URLSearchParams();

        params.append("soft_cust_id", "FML");
        params.append("partition_id", "1072");
        params.append("user_id", localStorage.getItem("userId"));
        params.append("login_date_time", localStorage.getItem("cargoaim_login_at"));

        params.append("bunisess_unit", payload.bunisess_unit);
        params.append("data_from", payload.data_from);
        params.append("data_to", payload.data_to);

         const response = await axios.post(
            "https://api.cargoaim.com/api/dash_board_generate_gp.php",
            params
        );
        console.log("API Response:", response.data);
        return response;
    }
}