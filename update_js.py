import codecs

with codecs.open('js/customers.js', 'r', 'utf-8') as f:
    content = f.read()

old_render = '''        let tbodyHTML = '';
        let sums = {
            dau: { may: 0, kh: 0 },
            tang: { may: 0, kh: 0 },
            giam: { may: 0, kh: 0 },
            cuoi: { may: 0, kh: 0 }
        };

        // Render Thuê máy, MC - Photo summary row (Thue may + MC)
        let tm_mc_dau_may = cData['thue_may'].dau.may + cData['mc'].dau.may;
        let tm_mc_dau_kh = cData['thue_may'].dau.kh + cData['mc'].dau.kh;
        let tm_mc_tang_may = cData['thue_may'].tang.may + cData['mc'].tang.may;
        let tm_mc_tang_kh = cData['thue_may'].tang.kh + cData['mc'].tang.kh;
        let tm_mc_giam_may = cData['thue_may'].giam.may + cData['mc'].giam.may;
        let tm_mc_giam_kh = cData['thue_may'].giam.kh + cData['mc'].giam.kh;
        let tm_mc_cuoi_may = cData['thue_may'].cuoi.may + cData['mc'].cuoi.may;
        let tm_mc_cuoi_kh = cData['thue_may'].cuoi.kh + cData['mc'].cuoi.kh;

        tbodyHTML += 
            <tr style="font-weight: bold; background: #f8fafc;">
                <td style="text-align: left;">Thuê máy, MC - Photo</td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;

        // Render sub-items and calculate sums
        rows.forEach(r => {
            let rowData = cData[r.id];
            
            // accumulate to sums
            sums.dau.may += rowData.dau.may; sums.dau.kh += rowData.dau.kh;
            sums.tang.may += rowData.tang.may; sums.tang.kh += rowData.tang.kh;
            sums.giam.may += rowData.giam.may; sums.giam.kh += rowData.giam.kh;
            sums.cuoi.may += rowData.cuoi.may; sums.cuoi.kh += rowData.cuoi.kh;

            let prefix = (r.id === 'thue_may' || r.id === 'mc') ? '&nbsp;&nbsp;&nbsp;&nbsp;<i>' : '';
            let suffix = (r.id === 'thue_may' || r.id === 'mc') ? '</i>' : '';

            // Formatting: If Phân phối, don't show MAY count (put -)
            let mayDau = r.id === 'phan_phoi' ? '-' : (rowData.dau.may || 0);
            let mayTang = r.id === 'phan_phoi' ? '-' : (rowData.tang.may || 0);
            let mayGiam = r.id === 'phan_phoi' ? '-' : (rowData.giam.may || 0);
            let mayCuoi = r.id === 'phan_phoi' ? '-' : (rowData.cuoi.may || 0);

            tbodyHTML += 
                <tr>
                    <td style="text-align: left;"></td>
                    <td></td><td></td>
                    <td></td><td></td>
                    <td></td><td></td>
                    <td></td><td></td>
                </tr>
            ;
        });

        tbodyHTML += 
            <tr style="font-weight: bold; font-size: 1.1em; background: #f1f5f9; color: #b91c1c;">
                <td style="text-align: left;">Tổng cộng</td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;'''

new_render = '''        let tbodyHTML = '';
        let sums = {
            ke_hoach: { may: 0, kh: 0 },
            dau: { may: 0, kh: 0 },
            tang: { may: 0, kh: 0 },
            giam: { may: 0, kh: 0 },
            cuoi: { may: 0, kh: 0 }
        };

        // Render Thuê máy, MC - Photo summary row (Thue may + MC)
        let tm_mc_ke_hoach_may = (cData['thue_may'].ke_hoach?.may || 0) + (cData['mc'].ke_hoach?.may || 0);
        let tm_mc_ke_hoach_kh = (cData['thue_may'].ke_hoach?.kh || 0) + (cData['mc'].ke_hoach?.kh || 0);
        let tm_mc_dau_may = cData['thue_may'].dau.may + cData['mc'].dau.may;
        let tm_mc_dau_kh = cData['thue_may'].dau.kh + cData['mc'].dau.kh;
        let tm_mc_tang_may = cData['thue_may'].tang.may + cData['mc'].tang.may;
        let tm_mc_tang_kh = cData['thue_may'].tang.kh + cData['mc'].tang.kh;
        let tm_mc_giam_may = cData['thue_may'].giam.may + cData['mc'].giam.may;
        let tm_mc_giam_kh = cData['thue_may'].giam.kh + cData['mc'].giam.kh;
        let tm_mc_cuoi_may = cData['thue_may'].cuoi.may + cData['mc'].cuoi.may;
        let tm_mc_cuoi_kh = cData['thue_may'].cuoi.kh + cData['mc'].cuoi.kh;

        tbodyHTML += 
            <tr style="font-weight: bold; background: #f8fafc;">
                <td style="text-align: left;">Thuê máy, MC - Photo</td>
                <td style="color: #475569;"></td><td style="color: #475569;"></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;

        // Render sub-items and calculate sums
        rows.forEach(r => {
            let rowData = cData[r.id];
            
            // accumulate to sums
            sums.ke_hoach.may += rowData.ke_hoach?.may || 0; sums.ke_hoach.kh += rowData.ke_hoach?.kh || 0;
            sums.dau.may += rowData.dau.may; sums.dau.kh += rowData.dau.kh;
            sums.tang.may += rowData.tang.may; sums.tang.kh += rowData.tang.kh;
            sums.giam.may += rowData.giam.may; sums.giam.kh += rowData.giam.kh;
            sums.cuoi.may += rowData.cuoi.may; sums.cuoi.kh += rowData.cuoi.kh;

            let prefix = (r.id === 'thue_may' || r.id === 'mc') ? '&nbsp;&nbsp;&nbsp;&nbsp;<i>' : '';
            let suffix = (r.id === 'thue_may' || r.id === 'mc') ? '</i>' : '';

            let mayKeHoach = r.id === 'phan_phoi' ? '-' : (rowData.ke_hoach?.may || 0);
            let mayDau = r.id === 'phan_phoi' ? '-' : (rowData.dau.may || 0);
            let mayTang = r.id === 'phan_phoi' ? '-' : (rowData.tang.may || 0);
            let mayGiam = r.id === 'phan_phoi' ? '-' : (rowData.giam.may || 0);
            let mayCuoi = r.id === 'phan_phoi' ? '-' : (rowData.cuoi.may || 0);

            tbodyHTML += 
                <tr>
                    <td style="text-align: left;"></td>
                    <td style="color: #64748b;"></td><td style="color: #64748b;"></td>
                    <td></td><td></td>
                    <td></td><td></td>
                    <td></td><td></td>
                    <td></td><td></td>
                </tr>
            ;
        });

        tbodyHTML += 
            <tr style="font-weight: bold; font-size: 1.1em; background: #f1f5f9; color: #b91c1c;">
                <td style="text-align: left;">Tổng cộng</td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;'''

content = content.replace(old_render, new_render)

with codecs.open('js/customers.js', 'w', 'utf-8') as f:
    f.write(content)
