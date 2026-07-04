import { ref } from "vue";
import dashService from "../services/dashService";

export function useDashboard() {
    const dashboardData = ref({});
    const isLoading = ref(false);

    const loadDashboard = async (payload) => {
        isLoading.value = true

        try {
            const result = await dashService.getDashboardData(payload);
            dashboardData.value = result.data;
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            isLoading.value = false
        }
    }

    return {
        dashboardData,
        isLoading,
        loadDashboard
    }
}