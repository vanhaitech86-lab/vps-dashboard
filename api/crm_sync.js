// Vercel Serverless Function: /api/crm_sync
// File này sẽ chạy ở phía Backend (Server) của Vercel, hoàn toàn bảo mật.

export default async function handler(req, res) {
    // 1. Nhận các tham số truy vấn từ giao diện Frontend gửi lên
    const { month, company, action } = req.query;

    try {
        // =========================================================================
        // BOILERPLATE CODE: GỌI API CLOUDPRO CRM (vps.cloudpro.vn)
        // Khi có tài khoản thật, bạn sẽ bỏ comment đoạn code dưới đây để kích hoạt
        // =========================================================================

        /*
        const CRM_API_URL = "https://vps.cloudpro.vn/api/v8/modules"; // Ví dụ chuẩn SuiteCRM/CloudPro v8
        const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN; // Cấu hình biến môi trường trên Vercel

        // Xây dựng điều kiện lọc (Filter) dựa trên công ty (branch)
        let filterParams = '';
        if (company && company !== 'all') {
            filterParams = `&filter[branch_name][eq]=${encodeURIComponent(company)}`;
        }

        // Gọi API lên CloudPro để kéo danh sách khách hàng mới
        const crmResponse = await fetch(`${CRM_API_URL}/Accounts?filter[date_entered][gte]=2026-${month}-01${filterParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!crmResponse.ok) {
            throw new Error(`CRM API Error: ${crmResponse.status}`);
        }

        const crmData = await crmResponse.json();
        
        // Tính toán / Mapping dữ liệu từ crmData ở đây...
        */

        // =========================================================================
        // MOCK DATA RESPONSE: Trả về số liệu ảo trong thời gian chờ đấu nối thật
        // =========================================================================
        
        // Đoạn này dùng để kiểm tra xem Frontend gọi API thành công hay chưa
        const mockResponse = {
            status: "success",
            source: "API-Boilerplate",
            message: "Hệ thống Backend Vercel đã sẵn sàng kết nối CloudPro",
            requested_params: { month, company, action },
            data: {
                total_customers: 2450,
                new_customers: 85,
                lost_customers: 12,
                revenue: 12500000000,
                debt: 1500000000
            }
        };

        return res.status(200).json(mockResponse);

    } catch (error) {
        console.error("API Route Error:", error);
        return res.status(500).json({ status: "error", message: error.message });
    }
}
