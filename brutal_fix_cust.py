import codecs

with codecs.open('js/customers.js', 'r', 'utf-8') as f:
    lines = f.readlines()

out = []
for line in lines:
    if "sums = {" in line:
        out.append(line)
        out.append("            ke_hoach: { may: 0, kh: 0 },\n")
    elif "let tm_mc_dau_may = cData['thue_may'].dau.may + cData['mc'].dau.may;" in line:
        out.append("        let tm_mc_ke_hoach_may = (cData['thue_may'].ke_hoach?.may || 0) + (cData['mc'].ke_hoach?.may || 0);\n")
        out.append("        let tm_mc_ke_hoach_kh = (cData['thue_may'].ke_hoach?.kh || 0) + (cData['mc'].ke_hoach?.kh || 0);\n")
        out.append(line)
    elif "<td></td><td></td>" in line:
        out.append(line)
        out.append("                <td style=\"color: #0369a1; font-weight: bold;\"></td><td style=\"color: #0369a1; font-weight: bold;\"></td>\n")
    elif "sums.tang.may += rowData.tang.may; sums.tang.kh += rowData.tang.kh;" in line:
        out.append("            sums.ke_hoach.may += rowData.ke_hoach?.may || 0; sums.ke_hoach.kh += rowData.ke_hoach?.kh || 0;\n")
        out.append(line)
    elif "let mayDau = r.id === 'phan_phoi' ? '-' : (rowData.dau.may || 0);" in line:
        out.append("            let mayKeHoach = r.id === 'phan_phoi' ? '-' : (rowData.ke_hoach?.may || 0);\n")
        out.append(line)
    elif "<td></td><td></td>" in line:
        out.append(line)
        out.append("                    <td style=\"color: #0369a1; font-weight: bold;\"></td><td style=\"color: #0369a1; font-weight: bold;\"></td>\n")
    elif "<td></td><td></td>" in line:
        out.append(line)
        out.append("                <td></td><td></td>\n")
    else:
        out.append(line)

with codecs.open('js/customers.js', 'w', 'utf-8') as f:
    f.writelines(out)
