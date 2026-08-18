/**
 * Admin Settings Module
 * Handles User Management
 */

window.AdminModule = {
    init() {
        this.bindEvents();
        this.renderUsersTable();
    },

    bindEvents() {
        // Toggle Form
        document.getElementById('btn-add-user').addEventListener('click', () => {
            this.resetForm();
            document.getElementById('admin-form-title').textContent = 'Thêm Tài Khoản';
            document.getElementById('admin-form-id').readOnly = false;
            document.getElementById('admin-user-form-container').classList.remove('hidden');
        });

        document.getElementById('btn-cancel-user').addEventListener('click', () => {
            document.getElementById('admin-user-form-container').classList.add('hidden');
        });

        // Submit Form
        document.getElementById('admin-user-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveUser();
        });
    },

    renderUsersTable() {
        const tbody = document.getElementById('admin-users-table-body');
        tbody.innerHTML = '';
        
        const users = window.AuthService.getUsers();
        
        for (const [id, user] of Object.entries(users)) {
            const tr = document.createElement('tr');
            
            // Build action buttons depending on whether it's the ADMIN account
            let actionsHtml = `<button class="btn btn-sm" style="background:#e67e22;color:white;margin-right:5px;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;" onclick="window.AdminModule.editUser('${id}')">Sửa</button>`;
            if (id !== 'ADMIN') {
                actionsHtml += `<button class="btn btn-sm" style="background:#e74c3c;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;" onclick="window.AdminModule.deleteUser('${id}')">Xóa</button>`;
            } else {
                actionsHtml += `<span style="font-size:0.75rem;color:var(--clr-text-muted);">Không thể xóa</span>`;
            }

            tr.innerHTML = `
                <td><strong>${id}</strong></td>
                <td>${user.name}</td>
                <td><span class="badge" style="background:var(--clr-secondary);color:white;padding:2px 6px;border-radius:10px;font-size:0.7rem;">${user.role ? user.role.name : 'Unknown'}</span></td>
                <td>${user.company}</td>
                <td>${actionsHtml}</td>
            `;
            tbody.appendChild(tr);
        }
    },

    editUser(id) {
        const users = window.AuthService.getUsers();
        const user = users[id];
        if (!user) return;

        document.getElementById('admin-form-title').textContent = 'Sửa Tài Khoản';
        document.getElementById('admin-form-id').value = id;
        document.getElementById('admin-form-id').readOnly = true; // prevent changing ID
        document.getElementById('admin-form-password').value = user.password;
        document.getElementById('admin-form-name').value = user.name;
        
        // determine select value
        let roleVal = 'DIRECTOR';
        if (user.role && user.role.level === 1) roleVal = 'CEO';
        document.getElementById('admin-form-role').value = roleVal;
        
        document.getElementById('admin-form-company').value = user.company;

        document.getElementById('admin-user-form-container').classList.remove('hidden');
    },

    saveUser() {
        const id = document.getElementById('admin-form-id').value.trim();
        const password = document.getElementById('admin-form-password').value.trim();
        const name = document.getElementById('admin-form-name').value.trim();
        const roleKey = document.getElementById('admin-form-role').value;
        const company = document.getElementById('admin-form-company').value;

        if (!id || !password || !name) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const rolesMap = window.AuthService.getRolesMap();
        const roleObj = rolesMap[roleKey];

        const userData = {
            password: password,
            name: name,
            role: roleObj,
            company: company
        };

        window.AuthService.saveUser(id, userData);
        alert('Đã lưu tài khoản thành công!');
        
        document.getElementById('admin-user-form-container').classList.add('hidden');
        this.renderUsersTable();
    },

    deleteUser(id) {
        if (id === 'ADMIN') {
            alert('Không thể xóa tài khoản Quản trị tối cao!');
            return;
        }
        
        if (confirm(`Bạn có chắc chắn muốn xóa tài khoản ${id}?`)) {
            window.AuthService.deleteUser(id);
            this.renderUsersTable();
        }
    },

    resetForm() {
        document.getElementById('admin-form-id').value = '';
        document.getElementById('admin-form-password').value = '';
        document.getElementById('admin-form-name').value = '';
        document.getElementById('admin-form-role').value = 'DIRECTOR';
        document.getElementById('admin-form-company').value = 'Tân Hồng Hà';
    }
};
