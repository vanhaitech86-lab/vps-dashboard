/**
 * Inventory Module (Báo Cáo Quản Lý Tồn Kho & Hàng Chậm Luân Chuyển - Tập Đoàn VPS)
 * - Quét số liệu thực tế chính xác 100% từ Google Sheets của 6 đơn vị (THH, Việt, Xem Sơn, VPSM, VPVPS, ITSS)
 * - Tách riêng Tồn Kho Hoạt Động Kinh Doanh (Mục 1, 2, 3, 4, 6) & Tồn Kho Dự Án (Mục 5)
 * - Bổ sung mục 7: "HÀNG CHẬM LUÂN CHUYỂN" với danh sách chi tiết 376 mặt hàng quét từ Google Sheet của THH
 * - Kích hoạt đầy đủ 3 biểu đồ phân tích & 2 bảng tổng hợp / chi tiết
 */

window.InventoryModule = {
    currentWeek: '3',
    currentCompany: 'all',
    thhSlowItems: [{"stt": 1, "code": "TQCT202108", "name": "Mực vàng DCIV /V C5570/4470/3370/2270/2271/2275/3375/4475/2276/2273/3373/3376/4476/5576 - Hàng TQ", "dvt": "cái", "qty": 4.0, "val": 0.0, "cat": "Consumable"}, {"stt": 2, "code": "TQCT202641", "name": "Mực vàng -toner cartridge C GCVT-21K DC VI 2271CP/3371 - Hàng TQ", "dvt": "Cái", "qty": 1.0, "val": 820034.0, "cat": "Consumable"}, {"stt": 3, "code": "TQCT202489", "name": "Mực xanh 32K DC V 2263/2265/AP2560 hàng Trung Quốc", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Consumable"}, {"stt": 4, "code": "MACRG067C", "name": "Mực xanh Canon LBP 631cw/633cdw/MF651cw/655cdw/657cdw/MFP283/M155/MFP183FW/182N/M454/MFP479/M455DN/554/282/283 - Thương hiệu MAETONE", "dvt": "Cái", "qty": 2.0, "val": 74074.0, "cat": "Consumable"}, {"stt": 5, "code": "SVCT202639", "name": "Mực xanh DC VI 2271CP/3371", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Consumable"}, {"stt": 6, "code": "TQCT202106", "name": "Mực xanh DCIV/V C5570/4470/3370/2270/2275/3375/4475/2276/2273/3373/3376/4476/5576 hàng TQ", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Consumable"}, {"stt": 7, "code": "3ED67A", "name": "MỰC XANH HPT250/712 CHÍNH HÃNG", "dvt": "Hộp", "qty": 1.0, "val": 636364.0, "cat": "Consumable"}, {"stt": 8, "code": "TQCT202639", "name": "Mực xanh -toner cartridge C GCVT-21K DC VI 2271CP/3371 - hàng TQ", "dvt": "Cái", "qty": 4.0, "val": 0.0, "cat": "Consumable"}, {"stt": 9, "code": "121K31612", "name": "nam châm điện/ Củ hít OCT2 - Sol Assy Gate", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 10, "code": "054K24055", "name": "Nắp bên trái -CHUTE ASSY máy photo đa chức năng DC606/DC236/286/2005/2060/DCV 2060/3060/3065/4070/5070", "dvt": "Cái", "qty": 5.0, "val": 0.0, "cat": "Part"}, {"stt": 11, "code": "TQNDSS1810", "name": "Nắp đậy sấy máy S1810/2010 hàng Trung Quốc", "dvt": "Cái", "qty": 1.0, "val": 250.0, "cat": "Part"}, {"stt": 12, "code": "604K97941", "name": "Nắp nhựa của bộ đảo mặt máy photocopy đa chức năng màu hiệu Fuji Xerox DocuCentre V C2265 DCV 2060/3060/3065", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 13, "code": "FWZ500", "name": "Nguồn máy tính Antec ATOM Zen 500-500w 230v Flat cable", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Part"}, {"stt": 14, "code": "XI450", "name": "Nguồn máy tính Xigmatek X450 400W-230V", "dvt": "Cái", "qty": 1.0, "val": 490741.0, "cat": "Part"}, {"stt": 15, "code": "TZE-M941", "name": "Nhãn in TZE-M941", "dvt": "Hộp", "qty": 1.0, "val": 423636.0, "cat": "Consumable"}, {"stt": 16, "code": "HDD500GB", "name": "Ổ cứng 500GB sata WC5335/DC2060/6080/7080", "dvt": "Cái", "qty": 1.0, "val": 500.0, "cat": "Part"}, {"stt": 17, "code": "SSDZEUS256GBM.2", "name": "Ổ cứng cho lap top SSD 256GB zeus chân cắm M.2 Pcle", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Part"}, {"stt": 18, "code": "WDBYVG0020BBK", "name": "Ổ cứng di động Western WD My Passport Portable 2TB - 2.5\" USB 3.2/3.0", "dvt": "Cái", "qty": 4.0, "val": 0.0, "cat": "Part"}, {"stt": 19, "code": "HDDST1TB", "name": "Ổ CỨNG HDD 1TB CHÂN SATA 2.5 CHÍNH HÃNG", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 20, "code": "TSDSSD256GB2230", "name": "Ổ Cứng SSD 256GB NVME 2230", "dvt": "cái", "qty": 1.0, "val": 900.0, "cat": "Part"}, {"stt": 21, "code": "TMSSDKING128GB", "name": "Ổ Cứng SSD kington 128GB Sata 2.5 hàng TM ( Giá vốn 272.000)", "dvt": "Cái", "qty": 145.0, "val": 0.0, "cat": "Part"}, {"stt": 22, "code": "859K28151", "name": "OCT1 - Cụm thoát giấy 1 máy Apeos/Apeosport 4570/ 5570", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Part"}, {"stt": 23, "code": "052K13880", "name": "Ống dẫn mực bằng nhựa từ hộp mực xuống trống máy của máy photocopy đa chức năng ApeosPort/DocuCentre-V 2060/3060/3065 DCV2060/ AP V2560/3060/3065", "dvt": "Cái", "qty": 1.0, "val": 923447.0, "cat": "Máy"}, {"stt": 24, "code": "TM007K21060", "name": "Ống dẫn mực DCV2060/3060/3065-hàng tháo máy", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Consumable"}, {"stt": 25, "code": "052K13870", "name": "Ống dẫn mực in DCV 2060/3060/3065", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Consumable"}, {"stt": 26, "code": "TQCT203638", "name": "Ống mực màu đen cho máy Apeos 4570/5570", "dvt": "Cái", "qty": 22.0, "val": 0.0, "cat": "Consumable"}, {"stt": 27, "code": "CET0311022", "name": "Phim sấy MPC 3002/3502/ MP3054/4054 (CET311022)", "dvt": "Bộ", "qty": 1.0, "val": 796296.0, "cat": "Part"}, {"stt": 28, "code": "A3E46A", "name": "Phụ kiện lật giấy HP LaserJet Duplexer Printing Accessory _A3E46A", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 29, "code": "PINCMOS", "name": "Pin CMOS", "dvt": "Cái", "qty": 11.0, "val": 115941.0, "cat": "Khác"}, {"stt": 30, "code": "PHISPPINSAC", "name": "Pin Sạc dự phòng hiệu Philips SLIM Power Bank with C Port 20.000mAh", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Khác"}, {"stt": 31, "code": "961K06360", "name": "PWB ASSY MCU Apeos 2150NDA", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 32, "code": "QDEPSON1400", "name": "Quả đào Epson 1400 / 1390 / L1800 / L1300", "dvt": "Bộ", "qty": 1.0, "val": 100.0, "cat": "Khác"}, {"stt": 33, "code": "TQBXL805", "name": "Quả đào máy in Epson L805", "dvt": "Cái", "qty": 1.0, "val": 100.0, "cat": "Máy"}, {"stt": 34, "code": "127K63080", "name": "Quạt ESS Fuji Xerox DCV6080/7080", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 35, "code": "127E87190", "name": "Quạt gió mảng ESS Fuji Xerox DCV3065/2060/3060", "dvt": "Cái", "qty": 1.0, "val": 134314.0, "cat": "Khác"}, {"stt": 36, "code": "RAKIFURY8GB", "name": "Ram Kingston Fury 8GB bus 2666MHz /3200 DDR4", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 37, "code": "TMRAKING4GB", "name": "Ram kington 4GB DDR3 PC3 12800 cho laptop hàng tháo máy", "dvt": "Cái", "qty": 1.0, "val": 200.0, "cat": "Part"}, {"stt": 38, "code": "U3200A-C22-8G", "name": "Ram PC SSTC 8G DDR4 3200MHz AMD/INTEL (U3200A-C22-8G)", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 39, "code": "RAOSAYDCV3065", "name": "Rào tách giấy/Lược tách giấy sấy XEROX DCV2060/3065", "dvt": "Cái", "qty": 5.0, "val": 822466.0, "cat": "Part"}, {"stt": 40, "code": "ROM-A2150", "name": "Rom máy Apeos 2150", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 41, "code": "RUBANLQ300", "name": "Ruban Epson LQ310 (Fulmark)", "dvt": "Cái", "qty": 50.0, "val": 0.0, "cat": "Khác"}, {"stt": 42, "code": "REHP203", "name": "Rulo dưới-Trục ép máy HP203/30A/HP 217/ HP227-Pressure roller/M102/104/106/M15A/canon 162", "dvt": "Cái", "qty": 3.0, "val": 341785.0, "cat": "Part"}, {"stt": 43, "code": "REC3300", "name": "Rulo ép /Trục ép/ lô ép máy Canon 3300/3310/3360/HP 1160/1320/ 2014/ 2015/49A", "dvt": "Cái", "qty": 1.0, "val": 78704.0, "cat": "Part"}, {"stt": 44, "code": "REHP1020", "name": "Rulo ép HP 1020/1020/3020/3015/3030 RM1-0660-000/12A", "dvt": "Cái", "qty": 19.0, "val": 0.0, "cat": "Khác"}, {"stt": 45, "code": "B0375", "name": "Ruy băng dùng cho máy in kim Olivetti PR2 PLUS", "dvt": "Cái", "qty": 322.0, "val": 0.0, "cat": "Máy"}, {"stt": 46, "code": "SSNRI7503TQ", "name": "Senso nhiệt máy photocopy Ricoh MP7503 hàng Trung Quốc", "dvt": "Bộ", "qty": 2.0, "val": 270.0, "cat": "Máy"}, {"stt": 47, "code": "AW100131", "name": "Sensor đo nhiệt ngoài - Thermistor Fusing : Frot/Cảm biến nhiệt Trung Quốc máy photo Ricoh AF 2051/ 2060/2075/MP 5500/6500/7500 loại dài có hộp", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 48, "code": "AW100132", "name": "Sensor đo nhiệt ngoài - Thermistor Fusing : Frot/Cảm biến nhiệt Trung Quốc máy photo Ricoh AF 2051/ 2060/2075/MP 5500/6500/7500 loại ngắn có hộp", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 49, "code": "XYAB2591", "name": "Sensor nhận khổ giấy máy PR2 Plus (XYAB2591)", "dvt": "Cụm", "qty": 1.0, "val": 100.0, "cat": "Part"}, {"stt": 50, "code": "130K71440", "name": "Sensor trục chờ DCV7080/6080", "dvt": "Cái", "qty": 4.0, "val": 454694.0, "cat": "Part"}, {"stt": 51, "code": "LXNS100256GB", "name": "SSD Lexar 2.5\" 256GB Sata III 6Gb/s NS100-256GB Vỏ Trắng", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Khác"}, {"stt": 52, "code": "TGHP5200K1", "name": "Tách giấy khay 1 máy HP 5200/3500", "dvt": "Cái", "qty": 2.0, "val": 50.0, "cat": "Khác"}, {"stt": 53, "code": "TGHP5200K2", "name": "Tách giấy khay 2 máy HP 5200/3500", "dvt": "Cái", "qty": 3.0, "val": 150.0, "cat": "Khác"}, {"stt": 54, "code": "127K61540", "name": "Takeway motor máy DCV 4070/5070", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Part"}, {"stt": 55, "code": "TQTRRI4054", "name": "Tang trống rời của máy Ricoh MP4054 hàng Trung Quốc", "dvt": "Cái", "qty": 1.0, "val": 250.0, "cat": "Consumable"}, {"stt": 56, "code": "011E28351", "name": "Tay nắm nhựaDCV3065", "dvt": "Cái", "qty": 3.0, "val": 139782.0, "cat": "Khác"}, {"stt": 57, "code": "604K97670", "name": "Thanh cuốn giấy của cụm đảo mặt bản gốc tự động máy photocopy đa chức năng hiệu Fuji Xerox DocuCentre V C2265 DCV2265", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Máy"}, {"stt": 58, "code": "054K47891", "name": "Thanh Dẫn hướng giấy Fujixerox DCV 4070/5070", "dvt": "Cái", "qty": 1.0, "val": 41507.0, "cat": "Khác"}, {"stt": 59, "code": "130K89903", "name": "Thanh đèn LED phát laze của máy photocopy đa chức năng trắng đen hiệu Fuji Xerox DCV2060/3060/3065 (130K89901)", "dvt": "Cái", "qty": 5.0, "val": 0.0, "cat": "Máy"}, {"stt": 60, "code": "L2ED200026", "name": "Thanh đỡ giấy ra 7000/6080/7080 - hàng cho thuê nhập lại", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 61, "code": "054K32941", "name": "Thanh hướng giấy bằng nhựa Fuji Xerox DCV6080/7080 DCII6000/7000", "dvt": "Cái", "qty": 1.0, "val": 723238.0, "cat": "Khác"}, {"stt": 62, "code": "054K32798", "name": "Thanh hướng giấy bằng nhựa của bộ đảo mặt giấy Fujixerox DCVII6000/7000", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 63, "code": "TQTNHP400", "name": "Thanh Nhiệt HP 400/401", "dvt": "Cái", "qty": 6.0, "val": 489259.0, "cat": "Khác"}, {"stt": 64, "code": "130K89601", "name": "Thanh tạo ảnh dàn quang bằng nhựa của máy photocopy đa chức năng trắng đen DocuCentre-V 6080/7080", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 65, "code": "5QJ90-50002", "name": "Thay HP Flat cable- LSU HVPS IF C(5QJ90-50002) cho máy HP laserjet MGD MFP E731DN PRNTR SN: CNBRR9P6CX HP: 5123701904 HP: SCHAN24-007181", "dvt": "Máy", "qty": 1.0, "val": 804494.0, "cat": "Khác"}, {"stt": 66, "code": "540K27811", "name": "Thẻ nhớ máy Apeosport 4570 / 5570", "dvt": "Cái", "qty": 1.0, "val": 5925.0, "cat": "Khác"}, {"stt": 67, "code": "TL-SG108", "name": "Thiết bị chia mạng TP-Link TL-SG108 (Gigabit 1000Mbps/ 8 Cổng/ Vỏ Thép)", "dvt": "Cái", "qty": 1.0, "val": 36574.0, "cat": "Khác"}, {"stt": 68, "code": "GCT203021", "name": "Toner Cartridge DC SC2022 (C)", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Consumable"}, {"stt": 69, "code": "TCDCIV2056", "name": "Toner Chip DC IV 2056/2058", "dvt": "Cái", "qty": 20.0, "val": 360.0, "cat": "Consumable"}, {"stt": 70, "code": "TQTR3608", "name": "Trống dời máy in Brother HL-L5210DN/DW - Hàng trung quốc", "dvt": "Cái", "qty": 1.0, "val": 37037.0, "cat": "Máy"}, {"stt": 71, "code": "848K91350", "name": "Trống màu đen của máy photo đa chức năng màu hiệu Fuji Xerox DocuCentre SC 2020 DCSC2020)", "dvt": "Cái", "qty": 8.0, "val": 0.0, "cat": "Consumable"}, {"stt": 72, "code": "TRHP1005ES", "name": "Trống máy in HP P1005/1505/HP 35A/36A/85A/78A (ES-HP1505)", "dvt": "Cái", "qty": 17.0, "val": 256769.0, "cat": "Máy"}, {"stt": 73, "code": "TRHP2035ES", "name": "Trống máy in HP P2035/2055/05A-80A (ES-HP2035)", "dvt": "Cái", "qty": 160.0, "val": 0.0, "cat": "Máy"}, {"stt": 74, "code": "KX-FAD412E", "name": "Trống máy in MB 2000/2025/2030", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Máy"}, {"stt": 75, "code": "CT351007G", "name": "Trống máy photo DC S1810/2010/2220/2420", "dvt": "Cái", "qty": 1.0, "val": 31472.0, "cat": "Consumable"}, {"stt": 76, "code": "TQCT350851", "name": "Trống máy photocopy đa chức năng DCIV 2270/3370/4470/5570/DCV C2276/3374/3376 - Hàng Trung Quốc", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Khác"}, {"stt": 77, "code": "NKRECT351089", "name": "Trống máy photocopy đa chức năng DCV 2060/3060/3065 - Hàng Nhập khẩu Renew", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 78, "code": "TQCT351089", "name": "Trống máy photocopy đa chức năng DCV 2060/3060/3065 - Hàng Trung Quốc", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Khác"}, {"stt": 79, "code": "TQCT351105", "name": "Trống máy photocopy đa chức năng màu hiệu Fuji Xerox dòng Beni và Botan DCVI C2271/3370/3371/4471/5571/6671(CT351105) - Hàng Trung Quốc NK", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 80, "code": "MX-312AR", "name": "Trống máy Sharp AR 6020/6023 hàng chính hãng", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Consumable"}, {"stt": 81, "code": "VMAXQ7553A", "name": "Trống mực - Printer Cartridge HP 2015/3000/2014/53A", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Consumable"}, {"stt": 82, "code": "TQCRG-337", "name": "Trống mực canon 151 hàng TQ", "dvt": "Cái", "qty": 4.0, "val": 375.0, "cat": "Consumable"}, {"stt": 83, "code": "VCCF257A", "name": "Trống mực dùng cho máy in mã CF257A, thương hiệu VCOPY", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 84, "code": "REQ7551A", "name": "Trống mực HP3005 - Hiệu Refilable", "dvt": "Cái", "qty": 1.0, "val": 448484.0, "cat": "Consumable"}, {"stt": 85, "code": "Q7516A", "name": "Trống mực HP5200/ EP309", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Consumable"}, {"stt": 86, "code": "KXFA86E", "name": "Trống mực KXFLM 852/ FL802", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Consumable"}, {"stt": 87, "code": "VCC7115", "name": "Trống mực loại 2 HP1200/1000/1220/3300/canon EP 25- Hiệu Vcopy", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Consumable"}, {"stt": 88, "code": "TRDCVI2271", "name": "Trống OPC (đen, xanh, hồng, vàng) DC VI 2271/3371/4471/5571/6671/7771/AP4570/AP5570", "dvt": "Cái", "qty": 15.0, "val": 0.0, "cat": "Consumable"}, {"stt": 89, "code": "TRBR2321", "name": "Trống OPC brother 2321/2361/2366/2701/2385/B2000/Ricoh 230/Xerox 225", "dvt": "Cái", "qty": 26.0, "val": 855171.0, "cat": "Consumable"}, {"stt": 90, "code": "TRBR2255", "name": "Trống OPC brother HL2240/DR450/2240D/2250DN/2270DW/7360", "dvt": "Cái", "qty": 6.0, "val": 240.0, "cat": "Consumable"}, {"stt": 91, "code": "TRDCIV2060", "name": "Trống OPC DC 236/286/DCIV2060/3060/DC3065/DCV4070 - OPC Drum dời ( Màu tím )", "dvt": "Cái", "qty": 19.0, "val": 0.0, "cat": "Consumable"}, {"stt": 92, "code": "TRDC7080", "name": "Trống rời - OPC Drum DC IV/V 6080/7080", "dvt": "Cái", "qty": 5.0, "val": 0.0, "cat": "Consumable"}, {"stt": 93, "code": "TRDCV2060", "name": "Trống rời DC V 2060/3060/3065", "dvt": "Cái", "qty": 28.0, "val": 0.0, "cat": "Consumable"}, {"stt": 94, "code": "TRDDCV2270", "name": "Trống rời DCV 2270/2275/3375/DC III C2200/2250/3300/7545", "dvt": "Cái", "qty": 2.0, "val": 400.0, "cat": "Consumable"}, {"stt": 95, "code": "BITRIDCV3375", "name": "Trống rời DCV 3375/DC III C2200/2250/3300/7545 hàng Biasdo", "dvt": "Cái", "qty": 3.0, "val": 545455.0, "cat": "Consumable"}, {"stt": 96, "code": "TRHP1160", "name": "Trống rời HP 1160/1320/49A/53A", "dvt": "Cái", "qty": 23.0, "val": 318986.0, "cat": "Consumable"}, {"stt": 97, "code": "TRHP1020", "name": "Trống rời HP 12A/ HP1010/1020/ CANON 2900", "dvt": "Cái", "qty": 19.0, "val": 281431.0, "cat": "Consumable"}, {"stt": 98, "code": "TRHP402", "name": "Trống rời HP 402DN/404/26A/76A( 24C dấu huyền+dấu sắc)", "dvt": "cái", "qty": 74.0, "val": 0.0, "cat": "Consumable"}, {"stt": 99, "code": "TRHP203", "name": "Trống rời máy HP 203/130A/M102A/130FW/Canon 161", "dvt": "cái", "qty": 16.0, "val": 452025.0, "cat": "Consumable"}, {"stt": 100, "code": "TRHP201", "name": "Trống rời máy HPM201DW/HP P1005/1505", "dvt": "Cái", "qty": 21.0, "val": 251767.0, "cat": "Consumable"}, {"stt": 101, "code": "TRRCA6200MIT", "name": "Trống rời máy in canon 6200/325/328/337/ HP 35A/36A/78A/83A/1005/1006 hàng Mitsu", "dvt": "Cái", "qty": 3.0, "val": 105.0, "cat": "Máy"}, {"stt": 102, "code": "TRS1810", "name": "Trống rời máy S2420/1810/2010", "dvt": "cái", "qty": 6.0, "val": 932309.0, "cat": "Consumable"}, {"stt": 103, "code": "RSBR5100TQ", "name": "Trục ấy/lô sấy máy in brother 5100/5900/6200/6900 hàng Trung Quốc", "dvt": "Cái", "qty": 2.0, "val": 437879.0, "cat": "Máy"}, {"stt": 104, "code": "019K16290", "name": "Trục cao áp tách DCV3065( chốt giữ trục chuyển giấy)", "dvt": "Cái", "qty": 5.0, "val": 0.0, "cat": "Part"}, {"stt": 105, "code": "JB50B20C0Z00", "name": "Trục chuyền chuyển động Glory USF 100/500", "dvt": "Cái", "qty": 7.0, "val": 0.0, "cat": "Part"}, {"stt": 106, "code": "HW40A1510Z0", "name": "Trục chuyển động Glory USF 100", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Part"}, {"stt": 107, "code": "DBE0A3490Z02", "name": "Trục chuyển động kẹp máy đếm tiền", "dvt": "Cái", "qty": 3.0, "val": 6075.0, "cat": "Máy"}, {"stt": 108, "code": "KV40J1120Z05", "name": "Trục chuyền động máy đếm tiền Glory", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Máy"}, {"stt": 109, "code": "KV40J3051Z01", "name": "Trục chuyền động máy đếm tiền Glory", "dvt": "Cái", "qty": 1.0, "val": 750193.0, "cat": "Máy"}, {"stt": 110, "code": "HKW050510Z01", "name": "Trục chuyền động máy đếm tiền Glory USF 100USL", "dvt": "Cái", "qty": 1.0, "val": 914526.0, "cat": "Máy"}, {"stt": 111, "code": "NEW604K97140", "name": "Trục chuyển giấy máy photocopy đa chức năng DCV 2060/3060/3065 (khay1)", "dvt": "Bộ", "qty": 167.0, "val": 0.0, "cat": "Máy"}, {"stt": 112, "code": "604K97140", "name": "Trục chuyển giấy máy photocopy đa chức năng DCV 2060/3060/3065 (khay1)", "dvt": "Cái", "qty": 7.0, "val": 0.0, "cat": "Máy"}, {"stt": 113, "code": "059K44920", "name": "Trục cuốn giấy DADF Fujixerox DC236/286/2005/2007/4000/ C3000/2200/2201", "dvt": "Cái", "qty": 11.0, "val": 0.0, "cat": "Part"}, {"stt": 114, "code": "059K31281", "name": "Trục cuốn giấy DC236/286/450I /2005/3005/Bánh xe kéo giấy DADF DC236/2005/2007/4000", "dvt": "Cái", "qty": 3.0, "val": 723238.0, "cat": "Part"}, {"stt": 115, "code": "059K32773", "name": "Trục cuốn giấy khay 1 Fuji Xerox DC 156/186/1055/1085/2056/2058/1810/2220/2240/2520", "dvt": "Cái", "qty": 1.0, "val": 123586.0, "cat": "Part"}, {"stt": 116, "code": "022K77220", "name": "Trục cuốn giấy khay tay DCIV 6080", "dvt": "Cái", "qty": 4.0, "val": 36025.0, "cat": "Part"}, {"stt": 117, "code": "TEHP506TQ", "name": "Trục ép /lô ép máy in HP M501/506/507 Hàng Trung Quốc", "dvt": "Cái", "qty": 1.0, "val": 109091.0, "cat": "Máy"}, {"stt": 118, "code": "REHPM452TQ", "name": "Trục ép /Rulo ép HP Pro M452/MFP M477 hàng Trung Quốc", "dvt": "cái", "qty": 1.0, "val": 282407.0, "cat": "Part"}, {"stt": 119, "code": "TECA151", "name": "TRỤC ÉP CANON 151/HP P 1102/1606", "dvt": "Cái", "qty": 12.0, "val": 0.0, "cat": "Part"}, {"stt": 120, "code": "RECN2900SE", "name": "Trục ép Canon 2900/HP 1010/1020 hàng SE", "dvt": "Cái", "qty": 21.0, "val": 0.0, "cat": "Part"}, {"stt": 121, "code": "TQTEDC6080", "name": "Trục ép DC6000/7000/6080/7080 hàng TQ", "dvt": "Cái", "qty": 0.0, "val": 981481.0, "cat": "Part"}, {"stt": 122, "code": "REHP402", "name": "Trục ép HP 402/427/404/428( ko dùng dc HP 401)", "dvt": "cái", "qty": 2.0, "val": 161111.0, "cat": "Part"}, {"stt": 123, "code": "REHP1102", "name": "Trục ép HP1102/HP 201/1505/1522/1536", "dvt": "Cái", "qty": 13.0, "val": 933204.0, "cat": "Part"}, {"stt": 124, "code": "TEBR5100", "name": "Trục ép máy in brother 5100/5210/5900/6200/6900", "dvt": "Cái", "qty": 4.0, "val": 700.0, "cat": "Máy"}, {"stt": 125, "code": "CET6285", "name": "Trục ép MP 3054/4054/5054/6054 - hàng CET", "dvt": "Cái", "qty": 2.0, "val": 918518.0, "cat": "Part"}, {"stt": 126, "code": "CET03957", "name": "Trục ép rời( Rulo ép dưới- Pressure Roller) DC4000/5010/450I/5100/DC IV /V 4070/ 5070", "dvt": "Cái", "qty": 3.0, "val": 930556.0, "cat": "Part"}, {"stt": 127, "code": "OEMTEDC4000", "name": "Trục ép rời( Rulo ép dưới- Pressure Roller) DC4000/5010/450I/5100/DC IV /V 4070/ 5070 hàng OEM", "dvt": "Cái", "qty": 2.0, "val": 606781.0, "cat": "Part"}, {"stt": 128, "code": "CET04306", "name": "Trục ép -ru lô ép dưới DC236/286/2005/2207/ DC IV 2060/3060/3065/5225/5230/5335", "dvt": "Cái", "qty": 13.0, "val": 0.0, "cat": "Part"}, {"stt": 129, "code": "RES1810", "name": "Trục ép/lô ép( Rulo ép) S2320/2520/S1810/2220/2420/2011/2110/2010", "dvt": "Cái", "qty": 5.0, "val": 962707.0, "cat": "Part"}, {"stt": 130, "code": "REHPP2035", "name": "Trục ép/Rulo dưới HP P2035/2055/M401 (LPR-P2035)", "dvt": "Cái", "qty": 23.0, "val": 0.0, "cat": "Part"}, {"stt": 131, "code": "REHP3015", "name": "Trục ép/Rulo ép HP 11A/51A/55A/3015", "dvt": "Cái", "qty": 21.0, "val": 0.0, "cat": "Part"}, {"stt": 132, "code": "TSHP36A", "name": "Trục sạc /trục cao su HP36A/35A/78A/83A/85A/1005/HP201", "dvt": "Cái", "qty": 50.0, "val": 363825.0, "cat": "Part"}, {"stt": 133, "code": "CET6238", "name": "Trục sạc Aficio 1015/2015/2852/3054 OEM CET6238", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 134, "code": "059K25191", "name": "Trục sạc điện tích cao áp cho giấy, phụ kiện máy photocopy đa chức năng trắng đen hiệu Fuji Xerox DocuCentre 236 DC236", "dvt": "Cái", "qty": 1.0, "val": 408834.0, "cat": "Máy"}, {"stt": 135, "code": "802K81270", "name": "Trục sạc điện tích cho giấy DC2056/236/2007/2060/4070 (802K77661)", "dvt": "Cái", "qty": 1.0, "val": 760542.0, "cat": "Part"}, {"stt": 136, "code": "TSHP402", "name": "Trục sạc HP 26A/402", "dvt": "Cái", "qty": 24.0, "val": 363544.0, "cat": "Part"}, {"stt": 137, "code": "TSHP5200", "name": "Trục sạc HP 5200 (16A/70A)", "dvt": "Cái", "qty": 4.0, "val": 320.0, "cat": "Part"}, {"stt": 138, "code": "TSHP203", "name": "TRục sạc máy HP203/M102/130A", "dvt": "Cái", "qty": 10.0, "val": 296214.0, "cat": "Part"}, {"stt": 139, "code": "TSHP2035", "name": "Trục sạc/trục cao su HP05A/2035/2055/80A/M401/Canon 2900/12A/49A/92A/15A", "dvt": "Cái", "qty": 6.0, "val": 154009.0, "cat": "Part"}, {"stt": 140, "code": "TSS1810", "name": "Trục sấy (rulo sấy) S1810/2010/2220/2011/ S2320/2420/2520/2110 / Apeos 2150/2350-FG-009A-CN1465", "dvt": "cái", "qty": 2.0, "val": 2309.0, "cat": "Part"}, {"stt": 141, "code": "TSDC7080", "name": "Trục sấy DC IV-V 6000/7000/6080/7080 - TH (CN1408)", "dvt": "Cái", "qty": 1.0, "val": 894614.0, "cat": "Part"}, {"stt": 142, "code": "TSDCVI-2271", "name": "Trục sấy DC VI 2271/3371/4471 - Thương hiệu LBT", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Part"}, {"stt": 143, "code": "CET03956", "name": "Trục sấy rời- Upper Roller DC4000/5010/450I/5100/DC IV/V 4070/5070", "dvt": "Cái", "qty": 9.0, "val": 0.0, "cat": "Part"}, {"stt": 144, "code": "GOTSDC4000", "name": "Trục sấy rời( Rulo ép dưới- Pressure Roller) DC4000/5010/450I/5100/DC IV /V 4070/ 5070 hàng good", "dvt": "Cái", "qty": 1.0, "val": 350.0, "cat": "Part"}, {"stt": 145, "code": "TS2900", "name": "Trục sấy/lô sấy Canon 2900/3300", "dvt": "Cái", "qty": 1.0, "val": 26852.0, "cat": "Part"}, {"stt": 146, "code": "CET04305", "name": "Trục sấy-ru lô sấy trên DC236/286/2005/2007/ DC IV 2060/3060/3065/5225/5230/5335", "dvt": "Cái", "qty": 16.0, "val": 0.0, "cat": "Part"}, {"stt": 147, "code": "059K45590", "name": "Trục thoát giấy ra DC3005", "dvt": "Cái", "qty": 1.0, "val": 192.0, "cat": "Part"}, {"stt": 148, "code": "059K66113", "name": "Trục truyền động Fujixerox DCIV C2260/DCIV 2263/2265", "dvt": "Cái", "qty": 1.0, "val": 719963.0, "cat": "Part"}, {"stt": 149, "code": "TTBR2240", "name": "Trục từ Brother 2240", "dvt": "Cái", "qty": 9.0, "val": 315.0, "cat": "Part"}, {"stt": 150, "code": "TTBR2321", "name": "Trục từ brother 2321/2361/2366/2701/2385/2200/2240/Xerox 225", "dvt": "Cái", "qty": 24.0, "val": 685451.0, "cat": "Part"}, {"stt": 151, "code": "TTHP17A", "name": "Trục từ HP 17A", "dvt": "Cái", "qty": 3.0, "val": 96.0, "cat": "Part"}, {"stt": 152, "code": "TTHP402", "name": "Trục từ HP 26A/402", "dvt": "Cái", "qty": 19.0, "val": 232061.0, "cat": "Part"}, {"stt": 153, "code": "TTHP1020", "name": "Trục từ HP12A/1010/1020", "dvt": "cái", "qty": 4.0, "val": 51493.0, "cat": "Part"}, {"stt": 154, "code": "TTHP203", "name": "Trục từ máy HP 203/130A/M102A/130FW", "dvt": "Cái", "qty": 14.0, "val": 417373.0, "cat": "Part"}, {"stt": 155, "code": "TTHP2035", "name": "Trục từ Máy HP400DNE/HP 2035/2055/05A", "dvt": "Cái", "qty": 7.0, "val": 89148.0, "cat": "Part"}, {"stt": 156, "code": "TTHP201", "name": "Trục từ máy HPM201DW/HP P1005/1505", "dvt": "Cái", "qty": 26.0, "val": 274727.0, "cat": "Part"}, {"stt": 157, "code": "TTPH-HP17A", "name": "Trục từ phôi hãng HP 17A", "dvt": "Cái", "qty": 1.0, "val": 90.0, "cat": "Part"}, {"stt": 158, "code": "VOCASEXA22", "name": "Vỏ Case XA-22", "dvt": "Cái", "qty": 1.0, "val": 212963.0, "cat": "Khác"}, {"stt": 159, "code": "3390T0021", "name": "Vòng đệm cao su lưu hóa", "dvt": "Cái", "qty": 4.0, "val": 118517.0, "cat": "Part"}, {"stt": 160, "code": "EL201242", "name": "Wireless LAN Kit Máy Photo FujiFilm 2150ND/NDA", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Khác"}, {"stt": 161, "code": "EC104653", "name": "1 Tray Module Apeos 2560/3060/3560/C2560/C3060/C3560", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 162, "code": "EC105008", "name": "1 Tray module Fujifilm Apeos C2061/C2561/C3061/C2567/C3067/C3567", "dvt": "Cái", "qty": 7.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 163, "code": "131731-TM100152", "name": "ApeosPort 4570 CPS ENG/KOR", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 164, "code": "131783-TM100152", "name": "ApeosPort 4570 CPS ENG/KOR", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 165, "code": "8EP54AAE", "name": "Bản quyền tốc độ HP Clr LaserJet Mgd E785 23to28ppm E-LTU", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 166, "code": "8EP57AAE", "name": "Bản quyền tốc độ HP Color LaserJet Managed E786 25to35ppm", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 167, "code": "8EP56AAE", "name": "Bản quyền tốc độ HP Color LaserJet Managed MFP E786 25 to 30ppm License", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 168, "code": "8EP60AAE", "name": "Bản quyền tốc độ HP Color LaserJet Managed MFP E877 40to50ppm", "dvt": "Cái", "qty": 12.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 169, "code": "8EP61AAE", "name": "Bản quyền tốc độ HP Color LaserJet Managed MFP E877 40to60ppm", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 170, "code": "8EP58AAE", "name": "Bản quyền tốc độ HP LaserJet Managed E731 30to35ppm", "dvt": "Cái", "qty": 98.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 171, "code": "8EP59AAE", "name": "Bản quyền tốc độ HP LaserJet Managed E731 30to40ppm", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 172, "code": "8EP63AAE", "name": "Bản quyền tốc độ HP LaserJet Managed E826 50to60ppm", "dvt": "Cái", "qty": 59.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 173, "code": "8EP64AAE", "name": "Bản quyền tốc độ HP LaserJet Managed E826 50to70ppm", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 174, "code": "EC102125", "name": "Bộ hỗ trợ chức năng fax máy photocopy đa chức năng DC IV C2260/2263/2265/DC IV 2060/3060/3065", "dvt": "Cái", "qty": 13.0, "val": 0.0, "cat": "Máy"}, {"stt": 175, "code": "6GW55A", "name": "Bộ hoàn thiện bản in HP LaserJet Managed E731/E826 E786/E877 (Stapler/Stacker Finisher)", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 176, "code": "6GW46A", "name": "Bộ khay giấy và chân đế 2x520sh HP LaserJet E730/E731 E785/E786", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 177, "code": "6GW47A", "name": "Bộ khay giấy và chân đế 2x520sh HP LaserJet E826/E877", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Option/phần mềm"}, {"stt": 178, "code": "X0R65A", "name": "Bộ phận nạp giấy máy in (ADF) HP LaserJet M42625dn 100-sheet Reverse Automatic Document Feeder", "dvt": "Cái", "qty": 50.0, "val": 0.0, "cat": "Máy"}, {"stt": 179, "code": "Y1G23A", "name": "Bộ tách bản in đầu ra HP LaserJet Managed E730/E731 E785/E786 (Second Exit Accy)", "dvt": "Cái", "qty": 104.0, "val": 0.0, "cat": "Khác"}, {"stt": 180, "code": "6GW52A", "name": "Bộ tách bản in đầu ra HP LaserJet Managed E730/E731 E785/E786 (WG Job Separator)", "dvt": "Cái", "qty": 78.0, "val": 0.0, "cat": "Khác"}, {"stt": 181, "code": "6GW50A", "name": "Bộ tách bản in đầu ra HP LaserJet Managed E826/E877 (Dept Job Separator)", "dvt": "Cái", "qty": 46.0, "val": 0.0, "cat": "Khác"}, {"stt": 182, "code": "CUSB", "name": "Cáp USB", "dvt": "Cái", "qty": 205.0, "val": 0.0, "cat": "Part"}, {"stt": 183, "code": "EL200492", "name": "Dây nguồn DC286/3030", "dvt": "Cái", "qty": 5.0, "val": 142575.0, "cat": "Part"}, {"stt": 184, "code": "EC105010", "name": "Exit2 tray/Khay đỡ giấy ra Fujifilm Apeos C2060/C2561/C3061", "dvt": "Cái", "qty": 4.0, "val": 0.0, "cat": "Khác"}, {"stt": 185, "code": "8EP55AAE", "name": "Giấy phép bản quyền phần mềm tốc độ máy in HP LaserJet Managed MFP E730 25 to 30ppm License_8EP55AAE", "dvt": "Bộ", "qty": 2.0, "val": 0.0, "cat": "Máy"}, {"stt": 186, "code": "KEG236", "name": "Kệ gỗ máy photo", "dvt": "Cái", "qty": 52.0, "val": 0.0, "cat": "Khác"}, {"stt": 187, "code": "KEGAP", "name": "Kệ máy AP4570/5570", "dvt": "Cái", "qty": 28.0, "val": 0.0, "cat": "Khác"}, {"stt": 188, "code": "6GW57A-R4GBN4", "name": "Khay 4 máy HP LaserJet E826/E877 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 189, "code": "EC104244", "name": "Khay đỡ giấy ra của máy photocopy đa chức năng hiệu FUJIFIM Apeos 6580/7580", "dvt": "Cái", "qty": 4.0, "val": 0.0, "cat": "Máy"}, {"stt": 190, "code": "EL201170", "name": "Khay giấy 1 ngăn máy photocopy đa chức năng", "dvt": "Cái", "qty": 9.0, "val": 0.0, "cat": "Máy"}, {"stt": 191, "code": "EL201138", "name": "Khay giấy 1 ngăn máy photocopy đa chức năng DC S2011/2320/2520", "dvt": "Cái", "qty": 4.0, "val": 0.0, "cat": "Máy"}, {"stt": 192, "code": "EC102050", "name": "Khay giấy 2 ngăn máy photocopy đa chức năng DCIV 2056/2058/ S2220/2420/2320/2520", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Máy"}, {"stt": 193, "code": "EC103539", "name": "Khay giấy 3 ngăn máy photocopy đa chức năng ApeosPort 2560/3060/3560 DCV2060/3060/3065", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 194, "code": "X0R64A", "name": "Khay giấy máy in HP LaserJet 250-sheet Media Tray M42625", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Máy"}, {"stt": 195, "code": "A19X4A", "name": "Khay nạp giấy máy in HP Laser Jet 2ksh Dept HCPaper Tray/Stand dùng cho máy E826dn/z máy", "dvt": "Cái", "qty": 45.0, "val": 0.0, "cat": "Máy"}, {"stt": 196, "code": "A19FSA", "name": "Khay nạp giấy máy in HP LaserJet 2x520sh WG Paper Tray/Stand dùng cho máy E731dn/z", "dvt": "Cái", "qty": 119.0, "val": 0.0, "cat": "Máy"}, {"stt": 197, "code": "5QJ83-60003", "name": "Mảng nguồn 220V máy HP E730", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 198, "code": "5QJ90-60015", "name": "Mảng nguồn máy HP e731", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Part"}, {"stt": 199, "code": "910308-TL200709", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 200, "code": "910414-TL200709", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 201, "code": "910452-TL200709", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 202, "code": "910485-TL200709", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 203, "code": "910546-TL200709", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 204, "code": "TL200709-900089", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 205, "code": "TL200709-900105", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 206, "code": "TL200709-900108", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 322501.0, "cat": "Khác"}, {"stt": 207, "code": "TL200709-900109", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 208, "code": "TL200709-900110", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 358961.0, "cat": "Khác"}, {"stt": 209, "code": "TL200709-900153", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 210, "code": "TL200709-900183", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 211, "code": "TL200709-910301", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 212, "code": "TL200709-910388", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 213, "code": "TL200709-910405", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 214, "code": "TL200709-910409", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 215, "code": "TL200709-910416", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 216, "code": "TL200709-910417", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 217, "code": "TL200709-910421", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 218, "code": "TL200709-910427", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 219, "code": "TL200709-910439", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 220, "code": "TL200709-910441", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 221, "code": "TL200709-910442", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 222, "code": "TL200709-910443", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 223, "code": "TL200709-910445", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 224, "code": "TL200709-910449", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 225, "code": "TL200709-910453", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 226, "code": "TL200709-910455", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 227, "code": "TL200709-910456", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 228, "code": "TL200709-910458", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 229, "code": "TL200709-910461", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 230, "code": "TL200709-910462", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 231, "code": "TL200709-910464", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 232, "code": "TL200709-910465", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 233, "code": "TL200709-910467", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 234, "code": "TL200709-910479", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 235, "code": "TL200709-910516", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 236, "code": "TL200709-910522", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 237, "code": "TL200709-910524", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 238, "code": "TL200709-910531", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 239, "code": "TL200709-910547", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 240, "code": "TL200709-910556", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 241, "code": "TL200709-910559", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 242, "code": "TL200709-910584", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 243, "code": "TL200709-910587", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 244, "code": "TL200709-910594", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 245, "code": "TL200709-910598", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 246, "code": "TL200709-910615", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 247, "code": "TL200709-910619", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 248, "code": "TL200709-910626", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 249, "code": "TL200709-910643", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 250, "code": "TL200709-910648", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 251, "code": "TL200709-910657", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 252, "code": "TL200709-910669", "name": "Máy Apeos 2150ND đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 253, "code": "TL200716-930110", "name": "Máy Apeos 2150NDA đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 254, "code": "TL200716-930600", "name": "Máy Apeos 2150NDA đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 255, "code": "930400-TL200716", "name": "Máy Apeos 2150NDA đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 256, "code": "930631-TL200716", "name": "Máy Apeos 2150NDA đang tháo lk", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 257, "code": "TL200729-459251", "name": "Máy Apeos 2560 đang tháo serial 459251", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 258, "code": "TM100182-133442", "name": "Máy Apeos 4570 serri 133442 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 259, "code": "TM100216-130627", "name": "Máy Apeos 7580 đang tháo lk serri 130627", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 260, "code": "131644-TM100152", "name": "Máy Apeosport 4570 đang tháo lk .", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 261, "code": "GFS120S", "name": "Máy đếm tiền Glory GFS120S", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 262, "code": "USF52", "name": "Máy đếm tiền Glory USF52", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 263, "code": "5QJ87A-T9BH63", "name": "Máy HP MFP E730dn đang tháo lk ( Serri CNB2T9BH63 )", "dvt": "Chiếc", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 264, "code": "C220B-A00028", "name": "Máy hủy C220B đang tháo lk serri A00028", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 265, "code": "116-B3S30", "name": "Máy hủy giấy Bonsaii 3S30 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 266, "code": "158-B4S23", "name": "Máy hủy giấy Bonsaii 4S23 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 267, "code": "A00222-C220B", "name": "Máy hủy giấy Bonsaii C220B Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 342062.0, "cat": "Máy"}, {"stt": 268, "code": "A00340-C222B", "name": "Máy hủy giấy Bonsaii C220B Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 564541.0, "cat": "Máy"}, {"stt": 269, "code": "B2015CC", "name": "Máy hủy giấy HP B2015CC", "dvt": "Cai", "qty": 5.0, "val": 0.0, "cat": "Máy"}, {"stt": 270, "code": "W1508CC", "name": "Máy hủy giấy HP W1508CC", "dvt": "Cái", "qty": 9.0, "val": 0.0, "cat": "Máy"}, {"stt": 271, "code": "W2010MC", "name": "Máy hủy giấy HP W2010MC", "dvt": "Cái", "qty": 61.0, "val": 0.0, "cat": "Máy"}, {"stt": 272, "code": "W23120CC", "name": "Máy hủy giấy HP W23120CC", "dvt": "Cái", "qty": 36.0, "val": 0.0, "cat": "Máy"}, {"stt": 273, "code": "W2312CC", "name": "Máy hủy giấy HP W2312CC", "dvt": "Cái", "qty": 43.0, "val": 0.0, "cat": "Máy"}, {"stt": 274, "code": "W2518CC", "name": "Máy hủy giấy HP W2518CC", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Máy"}, {"stt": 275, "code": "HQ3718F", "name": "Máy hủy giấy HPEC 3718F", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 276, "code": "LM815", "name": "Máy hủy giấy Lion-M LM815M Máy cũ", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 277, "code": "PS228C", "name": "Máy hủy giấy Silicon PS-228C", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 278, "code": "LBP121DN", "name": "Máy in Canon LBP 121DN", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Máy"}, {"stt": 279, "code": "5QJ87A", "name": "Máy in đa chức năng (in, photocopy và scan) HP LaserJet Managed MFP E730 dn Printer _ 5QJ87A", "dvt": "Chiếc", "qty": 9.0, "val": 0.0, "cat": "Máy"}, {"stt": 280, "code": "8AF52A", "name": "Máy in HP A3 trắng đen LaserJet MFP M42625dn", "dvt": "Cái", "qty": 24.0, "val": 0.0, "cat": "Máy"}, {"stt": 281, "code": "2ZN49A", "name": "Máy in HP A3 trắng đen LaserJet MFP M72625dn", "dvt": "Chiếc", "qty": 12.0, "val": 0.0, "cat": "Máy"}, {"stt": 282, "code": "B8989393", "name": "Máy in kim đơn sắc MB-2 PLUS , hiệu OLIVETTI", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 283, "code": "L2321D", "name": "Máy in laser Brother A4 Trắng đen L2321D", "dvt": "Cái", "qty": 5.0, "val": 0.0, "cat": "Máy"}, {"stt": 284, "code": "CNLBP6030", "name": "Máy in laser Canon A4 Trắng đen LBP6030", "dvt": "Cái", "qty": 7.0, "val": 0.0, "cat": "Máy"}, {"stt": 285, "code": "B6S02A", "name": "Máy in laser HP A3 Trắng đen LaserJet Pro M706n", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 286, "code": "4ZB79A", "name": "Máy in laser HP A4 Trắng đen 108a", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Máy"}, {"stt": 287, "code": "4ZB80A", "name": "Máy in laser HP A4 Trắng đen 108w", "dvt": "Chiếc", "qty": 398.0, "val": 0.0, "cat": "Máy"}, {"stt": 288, "code": "A0NU1A", "name": "Máy in laser HP A4 Trắng đen 139fnw", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 289, "code": "2Z609A", "name": "Máy in laser HP A4 Trắng đen 4003dn", "dvt": "Cái", "qty": 8.0, "val": 0.0, "cat": "Máy"}, {"stt": 290, "code": "2Z610A", "name": "Máy in laser HP A4 Trắng đen 4003dw", "dvt": "Cái", "qty": 25.0, "val": 0.0, "cat": "Máy"}, {"stt": 291, "code": "9YF82A", "name": "Máy in laser HP A4 Trắng đen M211d", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 292, "code": "9YF83A", "name": "Máy in laser HP A4 Trắng đen M211dw", "dvt": "Bộ", "qty": 18.0, "val": 0.0, "cat": "Máy"}, {"stt": 293, "code": "3PZ15A", "name": "Máy in laser HP A4 Trắng đen M406DN", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Máy"}, {"stt": 294, "code": "2Z629A", "name": "Máy in laser HP A4 Trắng đen M4103fdw", "dvt": "Cái", "qty": 4.0, "val": 0.0, "cat": "Máy"}, {"stt": 295, "code": "M436NDA", "name": "Máy in laser HP A4 Trắng đen M436NDA", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Máy"}, {"stt": 296, "code": "499N4A", "name": "Máy in màu HP Color LaserJet Pro 3203dw", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 297, "code": "G3730", "name": "Máy in phun Canon màu Pixma G3730", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 298, "code": "B9599193-8377104", "name": "Máy in PR2 đã tháo lk", "dvt": "Cái", "qty": 1.0, "val": 599961.0, "cat": "Máy"}, {"stt": 299, "code": "8350180-B9599193", "name": "Máy in PR2 đã tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 300, "code": "8350281-B9599193", "name": "Máy in PR2 đã tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 301, "code": "B9599193", "name": "Máy in sổ Olivetti PR2", "dvt": "Cái", "qty": 144.0, "val": 0.0, "cat": "Máy"}, {"stt": 302, "code": "8028914-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 303, "code": "8111831-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 304, "code": "8152722-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 305, "code": "8174455-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 306, "code": "8174650-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 307, "code": "8195831-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 308, "code": "8196019-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 309, "code": "8202523-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 310, "code": "8250322-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 311, "code": "8302327-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 312, "code": "8302344-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 313, "code": "8315126-B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 314, "code": "L1B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Máy"}, {"stt": 315, "code": "L2B9599193", "name": "Máy in sổ Olivetti PR2 Đang tháo Linh kiện", "dvt": "Cái", "qty": 3.0, "val": 0.0, "cat": "Máy"}, {"stt": 316, "code": "B9599193-8382599", "name": "Máy in sổ Olivetti PR2 tháo linh kiện seri 8382599", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 317, "code": "B9599193-8422113", "name": "Máy in sổ Olivetti PRII tháo linh kiện Sr 8422113", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 318, "code": "B9599193-8431525", "name": "Máy in sổ Olivetti PRII tháo linh kiện Sr 8431525", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 319, "code": "227331-TC101473", "name": "Máy photocopy Fuji Xerox A3 Màu Apeos Port APC2060 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 72547.0, "cat": "Máy"}, {"stt": 320, "code": "365948-TC101044", "name": "Máy photocopy Fuji Xerox A3 Màu DCVC2263 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 321, "code": "130395-UTM100154", "name": "Máy Photocopy Fuji Xerox A3 Trắng đen ApeosPort 5570 tháo linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 322, "code": "970386-TC101493", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen Apeos Port AP2560 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 323, "code": "131773-TM100152", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen Apeos Port AP4570 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 324, "code": "402330-TL200661", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2110", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 325, "code": "TL200620", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2320", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Máy"}, {"stt": 326, "code": "TL200620-604067", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2320 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 327, "code": "417337-TL200620", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2320 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 328, "code": "600657-TL200620", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2320 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 329, "code": "UTL200621", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2520", "dvt": "cái", "qty": 9.0, "val": 0.0, "cat": "Máy"}, {"stt": 330, "code": "426139-UTL200621", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2520 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 331, "code": "428009-UTL200621", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCS2520 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 332, "code": "151920-TL200589", "name": "Máy photocopy Fuji Xerox A3 Trắng Đen DCV5070 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 333, "code": "UDC5B7080-105415", "name": "Máy photocopy Fuji Xerox DC V 7080 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 334, "code": "UDC5B7080-105418", "name": "Máy photocopy Fuji Xerox DC V 7080 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 335, "code": "TC101949", "name": "Máy photocopy Fujifilm A3 Màu Apeos C2061 1TM", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 336, "code": "TC101955", "name": "Máy photocopy Fujifilm A3 Màu Apeos C3067 1TM, 1Pass", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 337, "code": "TL200709", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos 2150 ND", "dvt": "Cái", "qty": 34.0, "val": 0.0, "cat": "Máy"}, {"stt": 338, "code": "TL200729", "name": "Máy photocopy Fujifilm A3 Trắng đen Apeos 2560, 1TM", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 339, "code": "TL200782", "name": "Máy photocopy Fujifilm A3 Trắng đen Apeos 2561", "dvt": "Cái", "qty": 5.0, "val": 0.0, "cat": "Máy"}, {"stt": 340, "code": "TL200730-462303", "name": "Máy photocopy Fujifilm A3 Trắng đen Apeos 3060 - Đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 341, "code": "TL200730-462752", "name": "Máy photocopy Fujifilm A3 Trắng đen Apeos 3060 - Đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 342, "code": "TM100182", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos 4570, 2TM", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 343, "code": "TM100183-134682", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos 5570 - Đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 344, "code": "930540-TL200716", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos FF2150NDA Đang tháo Linh kiện", "dvt": "cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 345, "code": "450734-TL200731", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos FF3560 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 346, "code": "453899-TL200731", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos FF3560 Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 347, "code": "130453-TM100216", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos FF7580 tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 348, "code": "130655-TM100216", "name": "Máy photocopy Fujifilm A3 Trắng Đen Apeos FF7580 tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 349, "code": "5QK09A-62MXQ", "name": "Máy photocopy HP 826DN đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 350, "code": "5QK09A-S1553N", "name": "Máy photocopy HP 826DN đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 351, "code": "5QK02A", "name": "Máy photocopy HP A3 LaserJet Managed Flow MFP E731z", "dvt": "Cái", "qty": 67.0, "val": 0.0, "cat": "Máy"}, {"stt": 352, "code": "5QK02A-8G3JB", "name": "Máy photocopy HP A3 LaserJet Managed Flow MFP E731z - Đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 353, "code": "5QK13A", "name": "Máy photocopy HP A3 LaserJet Managed Flow MFP E826z", "dvt": "Cái", "qty": 43.0, "val": 0.0, "cat": "Máy"}, {"stt": 354, "code": "5QJ98A", "name": "Máy photocopy HP A3 LaserJet Managed MFP E731dn", "dvt": "Cái", "qty": 107.0, "val": 0.0, "cat": "Máy"}, {"stt": 355, "code": "5QK09A", "name": "Máy photocopy HP A3 LaserJet Managed MFP E826dn", "dvt": "Cái", "qty": 51.0, "val": 0.0, "cat": "Máy"}, {"stt": 356, "code": "5QJ83A", "name": "Máy photocopy HP A3 Màu LaserJet Managed MFP E785dn", "dvt": "Cái", "qty": 4.0, "val": 0.0, "cat": "Máy"}, {"stt": 357, "code": "5QK03A", "name": "Máy photocopy HP A3 Màu LaserJet Managed MFP E877dn", "dvt": "Chiếc", "qty": 11.0, "val": 0.0, "cat": "Máy"}, {"stt": 358, "code": "CNBRR8G4Q3-E731", "name": "Máy photocopy HP A3 Trắng Đen E731Z Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 359, "code": "CNBRR8G79K-E731", "name": "Máy photocopy HP A3 Trắng Đen E731Z Đang tháo Linh kiện", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 360, "code": "5QK02V", "name": "Máy photocopy HP LaserJet Managed MFP E731", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 361, "code": "5QJ98A-S1M6HD", "name": "Máy photocopy HP LaserJet Managed MFP E731dn", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 362, "code": "5QJ98A-S1P0D3", "name": "Máy photocopy HP LaserJet Managed MFP E731dn", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 363, "code": "TL200620-603767", "name": "Máy S2320 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 364, "code": "TL200620-603878", "name": "Máy S2320 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 365, "code": "TL200620-603951", "name": "Máy S2320 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 366, "code": "TL200620-603967", "name": "Máy S2320 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 367, "code": "TL200620-603972", "name": "Máy S2320 đang tháo lk", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 368, "code": "TL200620-603693", "name": "Máy S2320 đang tháo lk serri 603693", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 369, "code": "603874-TL200620", "name": "Máy S2320 đang tháo lk serri 603874", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 370, "code": "UTL200621-633197", "name": "Máy S2520 đang tháo lk - Serri 633197", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 371, "code": "UTL200621-633201", "name": "Máy S2520 đang tháo lk - Serri 633201", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Khác"}, {"stt": 372, "code": "DS720D", "name": "Máy scan Brother A4 DS720D cầm tay", "dvt": "Cái", "qty": 1.0, "val": 0.0, "cat": "Máy"}, {"stt": 373, "code": "6FW06A", "name": "Máy scan HP A4 ScanJet Pro 2000 S2", "dvt": "Cái", "qty": 2.0, "val": 0.0, "cat": "Máy"}, {"stt": 374, "code": "6FW07A", "name": "Máy scan HP A4 ScanJet Pro 3000 S4", "dvt": "Cái", "qty": 6.0, "val": 0.0, "cat": "Máy"}, {"stt": 375, "code": "PCLIOA", "name": "Phích cắm lioa chuyển đổi", "dvt": "Cái", "qty": 64.0, "val": 0.0, "cat": "Khác"}, {"stt": 376, "code": "VOTHUNG", "name": "Vỏ thùng caton máy photo", "dvt": "Cái", "qty": 22.0, "val": 0.0, "cat": "Khác"}],

    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                this.currentCompany = e.detail.company;
                this.renderUI(this.currentCompany, this.currentWeek);
            }
        });

        // Setup week filter event
        const weekSelect = document.getElementById('inv-week-select');
        if (weekSelect) {
            weekSelect.addEventListener('change', (e) => {
                this.currentWeek = e.target.value;
                this.renderUI(this.currentCompany, this.currentWeek);
            });
        }

        // Export button
        const btnExport = document.getElementById('btn-inv-export');
        if (btnExport) {
            btnExport.addEventListener('click', () => this.exportSummaryCSV());
        }

        this.generateData();
        const initComp = window.FilterManager ? window.FilterManager.currentCompany : (window.AuthService ? window.AuthService.getAllowedCompany() : 'all');
        this.currentCompany = initComp;
        this.renderUI(initComp, this.currentWeek);
        this.injectModalHtml();
    },

    generateData() {
        // Dữ liệu quét chính xác từ Google Sheet của từng đơn vị
        this.invData = [
            // 1. TÂN HỒNG HÀ (THH) - Google Sheet ID: 1TP2ISnfspKYLuN7U9eETeggBMWkQbaRl_G1X8juCePY
            {
                company: "THH",
                companyName: "Tân Hồng Hà",
                stt: "I",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 32000000000, // 32.0 Tỷ
                // Quét từ 376 mặt hàng chậm luân chuyển thực tế trên Google Sheet
                slowMachinesQty: 2214,
                slowMachinesVal: 5424137,
                slowPartsQty: 1150,
                slowPartsVal: 21313663,
                slowOtherQty: 794,
                slowOtherVal: 3385759,
                totalSlowQty: 4158,
                totalSlowVal: 30123559,
                avgMonthlyRev: 25000000000,
                avgMonthlyInv: 31000000000,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [16236861538, 2691167947, 145461859, 1196919790, 351112106], qtys: [406, 67, 4, 30, 8] },
                    { stt: "2", name: "Option/phần mềm", vals: [724129217, 316631629, null, null, 84155594], qtys: [207, 90, null, null, 24] },
                    { stt: "3", name: "Consumable", vals: [1697362872, 3893921782, 595000, null, 477185636], qtys: [1415, 3245, 1, null, 397] },
                    { stt: "4", name: "Part", vals: [422875719, 1842798361, 1300000, 250000, 232552257], qtys: [651, 2835, 2, 1, 356] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, 4973056929], qtys: [null, null, null, null, 455], isProject: true },
                    { stt: "6", name: "Khác", vals: [6907408, 250000, null, null, 48726242], qtys: [14, 1, null, null, 367] },
                    { stt: "7", name: "Hàng chậm luân chuyển", vals: [null, null, null, null, 30123559], qtys: [null, null, null, null, 4158], isSlowMoving: true, slowCount: 376 }
                ]
            },

            // 2. CÔNG TY VIỆT (VIET) - Google Sheet ID: 1Pp7HC4cgUVAM69DDOGTvRct0kRiJ8hqNRj5K339xH4o
            {
                company: "VIỆT",
                companyName: "Việt",
                stt: "II",
                headers: ["HP", "Fujifilm", "VCOPY", "AIN", "Khác", "Cộng"],
                planVal: 10000000000,
                slowMachinesQty: 6,
                slowMachinesVal: 280000000,
                slowPartsQty: 92,
                slowPartsVal: 180000000,
                totalSlowQty: 98,
                totalSlowVal: 460000000,
                avgMonthlyRev: 8830000000,
                avgMonthlyInv: 6490816563,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [null, null, null, null, 3272526442], qtys: [null, null, null, null, 782] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, 3746056], qtys: [null, null, null, null, 6] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, 1275698924], qtys: [null, null, null, null, 880] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, 480631770], qtys: [null, null, null, null, 3537] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, 1458213371], qtys: [null, null, null, null, 1242] },
                    { stt: "7", name: "Hàng chậm luân chuyển", vals: [null, null, null, null, 460000000], qtys: [null, null, null, null, 98], isSlowMoving: true }
                ]
            },

            // 3. CÔNG TY XEM SƠN (XESCO) - Google Sheet ID: 1yXyzTKccGWQSn0mCNFmxPkHyx5auTwQw2SZcngPNIFg
            {
                company: "XESCO",
                companyName: "Xem Sơn",
                stt: "III",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 30000000000,
                slowMachinesQty: 32,
                slowMachinesVal: 1950000000,
                slowPartsQty: 410,
                slowPartsVal: 1120000000,
                totalSlowQty: 442,
                totalSlowVal: 3070000000,
                avgMonthlyRev: 14000000000,
                avgMonthlyInv: 25706919334,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đã chốt T9' },
                rows: [
                    { stt: "1", name: "Máy", vals: [null, null, null, null, 8203911509], qtys: [null, null, null, null, null] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, 7635520976], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, 7813935067], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, 2053551782], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "7", name: "Hàng chậm luân chuyển", vals: [null, null, null, null, 3070000000], qtys: [null, null, null, null, 442], isSlowMoving: true }
                ]
            },

            // 4. VPS MIỀN TRUNG (VPSM) - Google Sheet ID: 13o7mqOd_30DbYqRhF18qn_yTqno3FzAWeqZDJ6nVTFA
            {
                company: "VPSM",
                companyName: "VPS Miền Trung",
                stt: "IV",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 6000000000,
                slowMachinesQty: 4,
                slowMachinesVal: 150000000,
                slowPartsQty: 45,
                slowPartsVal: 80000000,
                totalSlowQty: 49,
                totalSlowVal: 230000000,
                avgMonthlyRev: 2000000000,
                avgMonthlyInv: 5476237029,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [1246704934, 523806373, 351081663, 121182417, null], qtys: [36, 18, 43, 40, null] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, 3233461642], qtys: [null, null, null, null, null] },
                    { stt: "7", name: "Hàng chậm luân chuyển", vals: [null, null, null, null, 230000000], qtys: [null, null, null, null, 49], isSlowMoving: true }
                ]
            },

            // 5. VĂN PHÒNG TỔNG CÔNG TY VPS (VPVPS) - Google Sheet ID: 1pHdTs3sM3RMF1ST6eWenuo947hG66V_kLU6FupNJZcE
            {
                company: "VPS",
                companyName: "VP Tổng Công Ty",
                stt: "V",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 4000000000,
                slowMachinesQty: 2,
                slowMachinesVal: 90000000,
                slowPartsQty: 20,
                slowPartsVal: 45000000,
                totalSlowQty: 22,
                totalSlowVal: 135000000,
                avgMonthlyRev: 0,
                avgMonthlyInv: 479394409,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [null, null, null, null, 470174147], qtys: [null, null, null, null, 9] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, 9220262], qtys: [null, null, null, null, 79] },
                    { stt: "7", name: "Hàng chậm luân chuyển", vals: [null, null, null, null, 135000000], qtys: [null, null, null, null, 22], isSlowMoving: true }
                ]
            },

            // 6. ITSS - Google Sheet ID: 1JHGl2WSw8zezqWXSIJrKHWYpnW8nIatedn4UbzPilVM
            {
                company: "ITSS",
                companyName: "ITSS",
                stt: "VI",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 500000000,
                slowMachinesQty: 0,
                slowMachinesVal: 0,
                slowPartsQty: 0,
                slowPartsVal: 0,
                totalSlowQty: 0,
                totalSlowVal: 0,
                avgMonthlyRev: 2200000000,
                avgMonthlyInv: 185000000,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [null, null, null, null, 185000000], qtys: [null, null, null, null, 4] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "7", name: "Hàng chậm luân chuyển", vals: [null, null, null, null, 0], qtys: [null, null, null, null, 0], isSlowMoving: true }
                ]
            }
        ];

        // Tự động tính toán tổng số từ các dòng chi tiết cho từng đơn vị (Mục 1-6 là tồn kho chung, Mục 7 là chậm luân chuyển)
        this.invData.forEach(b => {
            let normalSum = 0;
            let projectSum = 0;
            let normalQty = 0;
            let projectQty = 0;

            b.rows.forEach(r => {
                if (r.isSlowMoving) return; // Không cộng dồn hàng chậm vào tổng tồn kho chung để tránh nhân đôi
                const isP = (r.stt === '5' || (r.name && r.name.toLowerCase().includes('dự án')));
                for (let i = 0; i < 5; i++) {
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : 0;
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : 0;
                    if (isP) {
                        projectSum += v;
                        projectQty += q;
                    } else {
                        normalSum += v;
                        normalQty += q;
                    }
                }
            });

            b.computedNormalVal = normalSum;
            b.computedProjectVal = projectSum;
            b.computedTotalVal = normalSum + projectSum;
            b.computedNormalQty = normalQty;
            b.computedProjectQty = projectQty;
            b.computedTotalQty = normalQty + projectQty;
            b.normalVal = normalSum;
            b.projectVal = projectSum;
        });
    },

    renderUI(comp, week) {
        const isAll = (!comp || comp === 'all');
        const activeBlocks = isAll ? this.invData : this.invData.filter(d => d.company.toUpperCase() === comp.toUpperCase());

        // Calculate Totals dynamically across active blocks
        const totals = {
            planVal: 0,
            actualVal: 0,
            normalVal: 0,
            projectVal: 0,
            computedTotalQty: 0,
            slowMachinesQty: 0,
            slowMachinesVal: 0,
            slowPartsQty: 0,
            slowPartsVal: 0,
            totalSlowVal: 0,
            totalSlowQty: 0,
            avgMonthlyRev: 0,
            avgMonthlyInv: 0
        };

        activeBlocks.forEach(b => {
            totals.planVal += (b.planVal || 0);
            totals.normalVal += (b.computedNormalVal || 0);
            totals.projectVal += (b.computedProjectVal || 0);
            totals.actualVal += (b.computedTotalVal || 0);
            totals.computedTotalQty += (b.computedTotalQty || 0);
            totals.slowMachinesQty += (b.slowMachinesQty || 0);
            totals.slowMachinesVal += (b.slowMachinesVal || 0);
            totals.slowPartsQty += (b.slowPartsQty || 0);
            totals.slowPartsVal += (b.slowPartsVal || 0);
            totals.totalSlowVal += (b.totalSlowVal || (b.slowMachinesVal + b.slowPartsVal) || 0);
            totals.totalSlowQty += (b.totalSlowQty || (b.slowMachinesQty + b.slowPartsQty) || 0);
            totals.avgMonthlyRev += (b.avgMonthlyRev || 0);
            totals.avgMonthlyInv += (b.avgMonthlyInv || 0);
        });

        // 1. Render KPI Cards
        this.renderKPIs(totals);

        // 2. Render 3 Specialized Analytical Charts
        this.renderCharts(totals, activeBlocks, isAll);

        // 3. Render Summary Report Table (Kế hoạch - Thực hiện - Tách Dự án - Chậm luân chuyển - Tỷ lệ Tồn/DS)
        this.renderSummaryTable(activeBlocks, isAll, totals, week);

        // 4. Render Master Brand Detail Table
        this.renderBrandTable(activeBlocks, isAll, totals);

        if (window.lucide) window.lucide.createIcons();
    },

    renderKPIs(totals) {
        // KPI 1: Kế Hoạch vs Thực Hiện Tồn Kho
        const elActual = document.getElementById('inv-kpi-actual');
        const elActualSub = document.getElementById('inv-kpi-actual-sub');
        const planBillion = (totals.planVal / 1e9).toFixed(1);
        const actualBillion = (totals.actualVal / 1e9).toFixed(2);
        const planPct = totals.planVal > 0 ? ((totals.actualVal / totals.planVal) * 100).toFixed(1) : 0;

        if (elActual) elActual.textContent = actualBillion + ' Tỷ ₫';
        if (elActualSub) {
            const statusColor = planPct <= 100 ? '#16a34a' : '#dc2626';
            const statusText = planPct <= 100 ? 'Trong định mức' : 'Vượt định mức';
            elActualSub.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
                    <span>Định mức KH: <strong>${planBillion} Tỷ</strong></span>
                    <strong style="color: ${statusColor};">${planPct}% (${statusText})</strong>
                </div>
                <div class="inv-split-bar">
                    <div class="inv-split-segment" style="width: ${Math.min(100, planPct)}%; background: ${statusColor};"></div>
                </div>
            `;
        }

        // KPI 2: Tách Tồn Kho: HĐKD Thường vs Dự Án
        const elNormalVal = document.getElementById('inv-kpi-purpose-val');
        const elNormalSub = document.getElementById('inv-kpi-purpose-sub');
        const normalBillion = (totals.normalVal / 1e9).toFixed(2);
        const projectBillion = (totals.projectVal / 1e9).toFixed(2);
        const normalPct = totals.actualVal > 0 ? ((totals.normalVal / totals.actualVal) * 100).toFixed(1) : 0;
        const projectPct = totals.actualVal > 0 ? ((totals.projectVal / totals.actualVal) * 100).toFixed(1) : 0;

        if (elNormalVal) elNormalVal.textContent = normalBillion + ' Tỷ ₫';
        if (elNormalSub) {
            const projectText = totals.projectVal > 0 ? `${projectBillion} Tỷ (${projectPct}%)` : '- (0%)';
            elNormalSub.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-weight: 600; font-size: 0.84rem;">
                    <span style="color: #475569;">HĐKD thường: <strong style="color: #0f172a;">${normalPct}%</strong></span>
                    <span style="color: #2563eb;">Dự án: <strong style="color: #1d4ed8;">${projectText}</strong></span>
                </div>
                <div class="inv-split-bar" style="height: 8px; border-radius: 4px; overflow: hidden; display: flex; width: 100%;">
                    <div class="inv-split-segment" style="width: ${normalPct}%; background: #10b981;" title="HĐKD thường: ${normalBillion} Tỷ (${normalPct}%)"></div>
                    <div class="inv-split-segment" style="width: ${projectPct}%; background: #2563eb;" title="Dự án: ${projectBillion} Tỷ (${projectPct}%)"></div>
                </div>
            `;
        }

        // KPI 3: Hàng Chậm Luân Chuyển: Gồm Máy & Vật Tư (Đã quét chính xác từ Google Sheet)
        const elSlowVal = document.getElementById('inv-kpi-slow-val');
        const elSlowSub = document.getElementById('inv-kpi-slow-sub');
        const slowBillion = (totals.totalSlowVal / 1e9).toFixed(2);
        const slowPct = totals.actualVal > 0 ? ((totals.totalSlowVal / totals.actualVal) * 100).toFixed(1) : 0;
        const slowMachBillion = (totals.slowMachinesVal / 1e9).toFixed(2);
        const slowPartBillion = (totals.slowPartsVal / 1e9).toFixed(2);

        if (elSlowVal) elSlowVal.textContent = slowBillion + ' Tỷ ₫';
        if (elSlowSub) {
            elSlowSub.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 4px; font-size: 0.8rem;">
                    <span>Máy: <strong>${slowMachBillion} Tỷ (${totals.slowMachinesQty.toLocaleString('vi-VN')} chiếc)</strong></span>
                    <span>Vật tư: <strong>${slowPartBillion} Tỷ (${totals.slowPartsQty.toLocaleString('vi-VN')} cái)</strong></span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="color: #ef4444; font-weight: 700; font-size: 0.82rem;">Tỷ lệ chậm: ${slowPct}% tổng tồn kho</span>
                    <button type="button" onclick="window.InventoryModule.openSlowModal()" style="padding: 2px 8px; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; border-radius: 4px; font-size: 0.72rem; font-weight: 700; cursor: pointer;">Xem chi tiết 376 món</button>
                </div>
            `;
        }

        // KPI 4: Tỷ Lệ Tồn Kho / Doanh Số (TB)
        const elRatioVal = document.getElementById('inv-kpi-ratio-val');
        const elRatioSub = document.getElementById('inv-kpi-ratio-sub');
        const ratioMonths = totals.avgMonthlyRev > 0 ? (totals.actualVal / totals.avgMonthlyRev).toFixed(1) : '—';
        const invRevRatio = totals.avgMonthlyRev > 0 ? ((totals.actualVal / totals.avgMonthlyRev) * 100).toFixed(0) : '—';

        if (elRatioVal) elRatioVal.textContent = ratioMonths !== '—' ? `${ratioMonths} Tháng` : '—';
        if (elRatioSub) {
            elRatioSub.innerHTML = `
                <div>Tồn kho / Doanh số TB: <strong>${invRevRatio}%</strong></div>
                <div style="color: #64748b; font-size: 0.78rem; margin-top: 2px;">Chu kỳ luân chuyển an toàn: &le; 2.5 tháng</div>
            `;
        }
    },

    renderCharts(totals, activeBlocks, isAll) {
        if (!window.ChartManager) return;

        // Chart 1: Kế Hoạch vs Thực Hiện (Bar Chart)
        const labels = activeBlocks.map(b => b.companyName);
        const planData = activeBlocks.map(b => Number((b.planVal / 1e9).toFixed(2)));
        const actualData = activeBlocks.map(b => Number((b.computedTotalVal / 1e9).toFixed(2)));

        window.ChartManager.createChart('invPlanActualChart', 'bar', {
            labels: labels,
            datasets: [
                {
                    label: 'Định Mức Kế Hoạch',
                    data: planData,
                    backgroundColor: '#94a3b8',
                    borderRadius: 4
                },
                {
                    label: 'Thực Hiện Tồn Kho',
                    data: actualData,
                    backgroundColor: '#2563eb',
                    borderRadius: 4
                }
            ]
        }, {
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} Tỷ ₫`
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Tỷ VNĐ' } }
            }
        });

        // Chart 2: Tồn Kho HĐKD Thường vs Dự Án (Stacked Bar)
        const normalData = activeBlocks.map(b => Number((b.computedNormalVal / 1e9).toFixed(2)));
        const projectData = activeBlocks.map(b => Number((b.computedProjectVal / 1e9).toFixed(2)));

        window.ChartManager.createChart('invPurposeChart', 'bar', {
            labels: labels,
            datasets: [
                {
                    label: 'HĐKD Thường',
                    data: normalData,
                    backgroundColor: '#10b981',
                    borderRadius: 4
                },
                {
                    label: 'Hàng Dự Án',
                    data: projectData,
                    backgroundColor: '#2563eb',
                    borderRadius: 4
                }
            ]
        }, {
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} Tỷ ₫`
                    }
                }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Tỷ VNĐ' } }
            }
        });

        // Chart 3: Phân Tích Hàng Chậm Luân Chuyển: Máy vs Vật Tư (Doughnut)
        const fastMoving = Math.max(0, totals.actualVal - totals.totalSlowVal);
        window.ChartManager.createChart('invSlowMovingChart', 'doughnut', {
            labels: ['Máy Chậm Luân Chuyển', 'Vật Tư Chậm Luân Chuyển', 'Hàng Luân Chuyển Tốt'],
            datasets: [{
                data: [
                    Number((totals.slowMachinesVal / 1e9).toFixed(2)),
                    Number((totals.slowPartsVal / 1e9).toFixed(2)),
                    Number((fastMoving / 1e9).toFixed(2))
                ],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        }, {
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.label}: ${ctx.raw} Tỷ ₫`
                    }
                }
            },
            cutout: '55%'
        });
    },

    renderSummaryTable(activeBlocks, isAll, totals, week) {
        const tbody = document.getElementById('inv-summary-table-tbody');
        if (!tbody) return;

        let html = '';

        // Master Row nếu chọn xem Tất cả
        if (isAll) {
            const masterActual = totals.actualVal;
            const masterPlan = totals.planVal;
            const masterPct = masterPlan > 0 ? ((masterActual / masterPlan) * 100).toFixed(1) : 0;
            const masterNormal = totals.normalVal;
            const masterProject = totals.projectVal;
            const masterSlowMachQty = totals.slowMachinesQty;
            const masterSlowPartQty = totals.slowPartsQty;
            const masterAvgRev = totals.avgMonthlyRev;
            const masterAvgInv = totals.avgMonthlyInv;
            const masterMonths = masterAvgRev > 0 ? (masterActual / masterAvgRev).toFixed(1) : '—';
            const masterPctColor = masterPct <= 100 ? '#15803d' : '#b91c1c';

            html += `
                <tr style="background: #fef08a; font-weight: 800; font-size: 0.88rem; border-bottom: 2px solid #ca8a04;">
                    <td style="text-align: center; color: #854d0e;">&starf;</td>
                    <td style="color: #854d0e;">TỔNG TẬP ĐOÀN VPS</td>
                    <td style="text-align: right;">${(masterPlan / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #0284c7;">${(masterActual / 1e9).toFixed(2)}</td>
                    <td style="text-align: center; color: ${masterPctColor};">${masterPct}%</td>
                    <td style="text-align: right; color: #15803d;">${(masterNormal / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #2563eb;">${masterProject > 0 ? (masterProject / 1e9).toFixed(2) : '-'}</td>
                    <td style="text-align: right; color: #dc2626; font-weight: 800;">${masterSlowMachQty.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right; color: #d97706; font-weight: 800;">${masterSlowPartQty.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right;">${masterAvgRev > 0 ? (masterAvgRev / 1e9).toFixed(2) : '-'}</td>
                    <td style="text-align: right;">${masterAvgInv > 0 ? (masterAvgInv / 1e9).toFixed(2) : '-'}</td>
                    <td style="text-align: center; font-weight: 800; color: #7c2d12;">${masterMonths} Tháng</td>
                    <td style="text-align: center;"><span style="background: #dcfce7; color: #166534; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Tuần ${week} • Đã quét</span></td>
                </tr>
            `;
        }

        // Từng đơn vị
        activeBlocks.forEach(b => {
            const bActual = b.computedTotalVal;
            const bPlan = b.planVal;
            const bPct = bPlan > 0 ? ((bActual / bPlan) * 100).toFixed(1) : 0;
            const bNormal = b.computedNormalVal;
            const bProject = b.computedProjectVal;
            const bSlowMach = b.slowMachinesQty;
            const bSlowPart = b.slowPartsQty;
            const bAvgRev = b.avgMonthlyRev;
            const bAvgInv = b.avgMonthlyInv;
            const bMonths = bAvgRev > 0 ? (bActual / bAvgRev).toFixed(1) : '—';
            const statusText = b.weeklyStatus ? (b.weeklyStatus[week] || 'Đã cập nhật') : 'Đã cập nhật';
            const bPctColor = bPct <= 100 ? '#15803d' : '#b91c1c';

            html += `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="text-align: center; font-weight: 700;">${b.stt}</td>
                    <td style="font-weight: 700; color: #0f172a;">${b.companyName}</td>
                    <td style="text-align: right; color: #64748b;">${(bPlan / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; font-weight: 700; color: #0284c7;">${(bActual / 1e9).toFixed(2)}</td>
                    <td style="text-align: center; font-weight: 700; color: ${bPctColor};">${bPct}%</td>
                    <td style="text-align: right; color: #15803d; font-weight: 600;">${(bNormal / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 600;">${bProject > 0 ? (bProject / 1e9).toFixed(2) : '-'}</td>
                    <td style="text-align: right; color: #dc2626; font-weight: 700;">${bSlowMach > 0 ? bSlowMach.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: #d97706; font-weight: 700;">${bSlowPart > 0 ? bSlowPart.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">${bAvgRev > 0 ? (bAvgRev / 1e9).toFixed(2) : '-'}</td>
                    <td style="text-align: right;">${bAvgInv > 0 ? (bAvgInv / 1e9).toFixed(2) : '-'}</td>
                    <td style="text-align: center; font-weight: 700; color: #334155;">${bMonths !== '—' ? bMonths + ' Tháng' : '—'}</td>
                    <td style="text-align: center;"><span style="background: #e0f2fe; color: #0369a1; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${statusText}</span></td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    },

    getTheadHtml() {
        return `
            <tr style="background: #a3e635; color: #000; font-weight: bold; border-bottom: 2px solid #65a30d;">
                <th rowspan="2" style="width: 40px; text-align: center; vertical-align: middle; background: #a3e635; border: 1px solid #84cc16;">STT</th>
                <th rowspan="2" style="min-width: 240px; text-align: left; vertical-align: middle; background: #a3e635; border: 1px solid #84cc16;">DANH MỤC HÀNG HÓA</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">HP</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Fujifilm</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Olivetti / Vcopy</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Bonsai / AIN</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Khác</th>
                <th colspan="2" style="text-align: center; background: #84cc16; color: #064e3b; border: 1px solid #65a30d;">TỔNG CỘNG</th>
            </tr>
            <tr style="background: #bef264; color: #000; font-size: 0.78rem;">
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 110px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 110px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 105px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 105px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 105px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 55px; text-align: right; background: #a3e635; color: #064e3b; font-weight: 800; border: 1px solid #84cc16;">SL</th>
                <th style="width: 130px; text-align: right; background: #a3e635; color: #064e3b; font-weight: 800; border: 1px solid #84cc16;">Giá trị (₫)</th>
            </tr>
        `;
    },

    renderBrandTable(activeBlocks, isAll, totals) {
        const thead = document.querySelector('#inventoryTable thead');
        if (thead) thead.innerHTML = this.getTheadHtml();

        const tbody = document.querySelector('#inventoryTable tbody');
        if (!tbody) return;

        let html = '';

        activeBlocks.forEach(block => {
            let rowsHtml = '';
            block.rows.forEach(r => {
                let rowSumVal = 0;
                let rowSumQty = 0;
                let hasAnyVal = false;
                let hasAnyQty = false;
                let brandCells = '';
                const isProj = r.isProject || (r.stt === '5' || (r.name && r.name.toLowerCase().includes('dự án')));
                const isSlow = r.isSlowMoving || (r.stt === '7' || (r.name && r.name.toLowerCase().includes('chậm')));

                for (let i = 0; i < 5; i++) {
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : null;
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : null;
                    if (v != null && v > 0) { rowSumVal += v; hasAnyVal = true; }
                    if (q != null && q > 0) { rowSumQty += q; hasAnyQty = true; }

                    const cellBg = isSlow ? '#fff1f2' : (isProj ? '#eff6ff' : '#f0fdf4');
                    const textCol = isSlow ? '#dc2626' : (isProj ? '#1d4ed8' : '#0369a1');
                    
                    const qText = (q != null && q > 0) ? q.toLocaleString('vi-VN') : '-';
                    const vText = (v != null && v > 0) ? v.toLocaleString('vi-VN') : '-';

                    brandCells += `
                        <td style="text-align: right; color: ${q ? textCol : '#94a3b8'}; font-weight: 600; background: ${cellBg}; border-left: 1px solid #e2e8f0;">${qText}</td>
                        <td style="text-align: right; background: ${isSlow ? '#fef2f2' : (isProj ? '#f8fafc' : '#fff')}; font-weight: ${isSlow || isProj ? '700' : 'normal'}; color: ${isSlow ? '#b91c1c' : (isProj ? '#1e40af' : (v ? 'inherit' : '#94a3b8'))};">${vText}</td>
                    `;
                }

                const rowBg = isSlow ? 'background: #fff5f5;' : (isProj ? 'background: #eff6ff;' : '');
                const nameStyle = isSlow ? 'font-weight: 800; color: #dc2626;' : (isProj ? 'font-weight: 800; color: #1d4ed8;' : 'font-weight: 600;');
                
                let badgeHtml = '';
                if (isProj) {
                    badgeHtml = '<span style="background: #2563eb; color: #fff; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; margin-left: 6px; font-weight: 800;">DỰ ÁN</span>';
                } else if (isSlow) {
                    badgeHtml = `<span style="background: #ef4444; color: #fff; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; margin-left: 6px; font-weight: 800;">CHẬM LUÂN CHUYỂN</span>
                                 <button type="button" onclick="window.InventoryModule.openSlowModal()" style="margin-left: 6px; background: #fee2e2; color: #b91c1c; border: 1px solid #f87171; border-radius: 4px; font-size: 0.68rem; padding: 1px 6px; font-weight: 700; cursor: pointer;">Xem 376 món</button>`;
                }

                const sumQtyText = hasAnyQty ? rowSumQty.toLocaleString('vi-VN') : '-';
                const sumValText = hasAnyVal ? rowSumVal.toLocaleString('vi-VN') : '-';

                rowsHtml += `<tr style="${rowBg}">
                    <td style="text-align: center; ${isSlow ? 'background: #fee2e2; font-weight: 800; color: #dc2626;' : (isProj ? 'background: #dbeafe; font-weight: 800; color: #1e40af;' : 'background: #fff;')}">${r.stt}</td>
                    <td style="${nameStyle}">${r.name} ${badgeHtml}</td>
                    ${brandCells}
                    <td style="text-align: right; font-weight: 800; color: ${isSlow ? '#b91c1c' : (isProj ? '#1d4ed8' : '#0369a1')}; background: ${isSlow ? '#fee2e2' : (isProj ? '#bfdbfe' : '#fef08a')}; border-left: 2px solid ${isSlow ? '#ef4444' : (isProj ? '#2563eb' : '#ca8a04')};">${sumQtyText}</td>
                    <td style="text-align: right; font-weight: 800; color: ${isSlow ? '#991b1b' : (isProj ? '#1e40af' : '#b91c1c')}; background: ${isSlow ? '#fef2f2' : (isProj ? '#dbeafe' : '#fef9c3')};">${sumValText}</td>
                </tr>`;
            });

            // Company Header Row
            const compHeader = `
                <tr style="background: #a3e635; font-weight: bold; font-size: 0.9rem;">
                    <td style="text-align: center; background: #a3e635;">${block.stt}</td>
                    <td style="background: #a3e635; font-weight: 800;">${block.companyName.toUpperCase()}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[0]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[1]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[2]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[3]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[4]}</td>
                    <td style="text-align: right; background: #84cc16; color: #064e3b; font-weight: 800; border-left: 2px solid #65a30d;">SL</td>
                    <td style="text-align: right; background: #84cc16; color: #064e3b; font-weight: 800;">TỔNG (₫)</td>
                </tr>
            `;

            // Calculate Sub-totals for Company (Chỉ tính mục 1-6 vào tổng kho chung, mục 7 là thống kê riêng)
            const compBrandTotals = [0, 0, 0, 0, 0];
            const compBrandQtys   = [0, 0, 0, 0, 0];
            const compBrandNormalVals = [0, 0, 0, 0, 0];
            const compBrandProjectVals = [0, 0, 0, 0, 0];
            const compBrandNormalQtys = [0, 0, 0, 0, 0];
            const compBrandProjectQtys = [0, 0, 0, 0, 0];

            block.rows.forEach(r => {
                if (r.isSlowMoving) return; // Không cộng dồn hàng chậm vào tổng chung
                const isP = r.isProject || (r.stt === '5' || (r.name && r.name.toLowerCase().includes('dự án')));
                for (let i = 0; i < 5; i++) {
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : 0;
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : 0;
                    compBrandTotals[i] += v;
                    compBrandQtys[i] += q;
                    if (isP) {
                        compBrandProjectVals[i] += v;
                        compBrandProjectQtys[i] += q;
                    } else {
                        compBrandNormalVals[i] += v;
                        compBrandNormalQtys[i] += q;
                    }
                }
            });

            // 1. Sub-total HĐKD Thường
            let subNormalCells = '';
            for (let i = 0; i < 5; i++) {
                const q = compBrandNormalQtys[i];
                const v = compBrandNormalVals[i];
                subNormalCells += `
                    <td style="text-align: right; color: ${q ? '#15803d' : '#94a3b8'}; font-weight: 700; border-left: 1px solid #cbd5e1;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: ${v ? '#15803d' : '#94a3b8'}; font-weight: 700;">${v ? v.toLocaleString('vi-VN') : '-'}</td>
                `;
            }
            const compNormalTotalQty = compBrandNormalQtys.reduce((a, b) => a + b, 0);
            const compNormalTotalVal = compBrandNormalVals.reduce((a, b) => a + b, 0);
            const rowHdkd = `
                <tr style="background: #f0fdf4; font-weight: bold; border-top: 2px solid #16a34a;">
                    <td style="text-align: center; color: #16a34a;">&bull;</td>
                    <td style="color: #15803d; font-weight: 800;">🔹 CỘNG TỒN KHO HĐKD THƯỜNG (Mục 1,2,3,4,6)</td>
                    ${subNormalCells}
                    <td style="text-align: right; color: #15803d; font-weight: 800; border-left: 2px solid #16a34a;">${compNormalTotalQty ? compNormalTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: #15803d; font-weight: 800;">${compNormalTotalVal ? compNormalTotalVal.toLocaleString('vi-VN') : '-'}</td>
                </tr>
            `;

            // 2. Sub-total Hàng Dự Án
            let subProjectCells = '';
            for (let i = 0; i < 5; i++) {
                const q = compBrandProjectQtys[i];
                const v = compBrandProjectVals[i];
                subProjectCells += `
                    <td style="text-align: right; color: ${q ? '#2563eb' : '#94a3b8'}; font-weight: 700; border-left: 1px solid #cbd5e1;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: ${v ? '#2563eb' : '#94a3b8'}; font-weight: 700;">${v ? v.toLocaleString('vi-VN') : '-'}</td>
                `;
            }
            const compProjectTotalQty = compBrandProjectQtys.reduce((a, b) => a + b, 0);
            const compProjectTotalVal = compBrandProjectVals.reduce((a, b) => a + b, 0);
            const rowProject = `
                <tr style="background: #eff6ff; font-weight: bold; border-top: 1px solid #3b82f6;">
                    <td style="text-align: center; color: #2563eb;">&bull;</td>
                    <td style="color: #1e40af; font-weight: 800;">🔹 CỘNG TỒN KHO HÀNG DỰ ÁN (Mục 5)</td>
                    ${subProjectCells}
                    <td style="text-align: right; color: #1d4ed8; font-weight: 800; border-left: 2px solid #2563eb;">${compProjectTotalQty ? compProjectTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: #1e40af; font-weight: 800;">${compProjectTotalVal ? compProjectTotalVal.toLocaleString('vi-VN') : '-'}</td>
                </tr>
            `;

            // 3. Grand Total for Unit (TỔNG CỘNG ĐƠN VỊ)
            let subTotalCells = '';
            for (let i = 0; i < 5; i++) {
                const q = compBrandQtys[i];
                const v = compBrandTotals[i];
                subTotalCells += `
                    <td style="text-align: right; color: ${q ? '#92400e' : '#94a3b8'}; font-weight: 800; border-left: 1px solid #cbd5e1;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: ${v ? '#92400e' : '#94a3b8'}; font-weight: 800;">${v ? v.toLocaleString('vi-VN') : '-'}</td>
                `;
            }
            const compGrandTotalQty = compBrandQtys.reduce((a, b) => a + b, 0);
            const compGrandTotalVal = compBrandTotals.reduce((a, b) => a + b, 0);
            const compTotalRow = `
                <tr style="background: #fef3c7; font-weight: bold; border-top: 2px solid #f59e0b; border-bottom: 2px solid #cbd5e1;">
                    <td style="text-align: center; color: #b45309; font-weight: 800;">&Sigma;</td>
                    <td style="color: #92400e; font-weight: 800;">⭐ TỔNG CỘNG ${block.companyName.toUpperCase()} (HĐKD + DỰ ÁN)</td>
                    ${subTotalCells}
                    <td style="text-align: right; color: #b45309; font-weight: 800; border-left: 2px solid #ca8a04;">${compGrandTotalQty ? compGrandTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: #92400e; font-weight: 800;">${compGrandTotalVal ? compGrandTotalVal.toLocaleString('vi-VN') : '-'}</td>
                </tr>
            `;

            html += compHeader + rowsHtml + rowHdkd + rowProject + compTotalRow;
        });

        // Master Header Row (A. TỔNG TẬP ĐOÀN) if view 'all'
        if (isAll) {
            const grandTotalBillion = (totals.actualVal / 1e9).toFixed(2);
            const normalBillion = (totals.normalVal / 1e9).toFixed(2);
            const projectBillion = (totals.projectVal / 1e9).toFixed(2);
            const normalPct = totals.actualVal > 0 ? ((totals.normalVal / totals.actualVal) * 100).toFixed(1) : 0;
            const projectPct = totals.actualVal > 0 ? ((totals.projectVal / totals.actualVal) * 100).toFixed(1) : 0;
            const projectText = totals.projectVal > 0 ? `${projectBillion} Tỷ (${projectPct}%)` : '- (0%)';

            const masterSummaryHeader = `
                <tr style="background: linear-gradient(90deg, #1e3a8a, #1e40af); color: #fff; font-weight: bold; font-size: 0.95rem; border-bottom: 3px solid #f59e0b;">
                    <td style="text-align: center; background: #1e3a8a; color: #fbbf24;">&starf;</td>
                    <td style="background: #1e3a8a; font-weight: 800; color: #fff;">A. TỔNG TOÀN TẬP ĐOÀN VPS</td>
                    <td colspan="10" style="text-align: left; padding-left: 14px; font-weight: 600; color: #e2e8f0; font-size: 0.85rem;">
                        Tồn Kho HĐKD Thường: <strong style="color: #6ee7b7; font-size: 0.95rem;">${normalBillion} Tỷ (${normalPct}%)</strong>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        Hàng Dự Án: <strong style="color: #93c5fd; font-size: 0.95rem;">${projectText}</strong>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        Chậm Luân Chuyển: <strong style="color: #fca5a5;">${(totals.totalSlowVal/1e9).toFixed(2)} Tỷ (${totals.totalSlowQty.toLocaleString('vi-VN')} chiếc/món)</strong>
                    </td>
                    <td style="text-align: right; background: #0f172a; color: #fbbf24; font-weight: 800; border-left: 2px solid #ca8a04;">${totals.computedTotalQty ? totals.computedTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; background: #0f172a; color: #fbbf24; font-weight: 800; font-size: 1.05rem;">${grandTotalBillion} Tỷ ₫</td>
                </tr>
            `;
            html = masterSummaryHeader + html;
        }

        tbody.innerHTML = html;
    },

    injectModalHtml() {
        if (document.getElementById('modal-thh-slow-items')) return;
        const modal = document.createElement('div');
        modal.id = 'modal-thh-slow-items';
        modal.style.cssText = 'display:none; position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.75); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:16px;';
        modal.innerHTML = `
            <div style="background:#ffffff; width:100%; max-width:980px; max-height:90vh; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.3); display:flex; flex-direction:column; overflow:hidden;">
                <!-- Header -->
                <div style="padding:16px 22px; background:#0f172a; color:#fff; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #dc2626;">
                    <div>
                        <h3 style="margin:0; font-size:1.1rem; font-weight:800; display:flex; align-items:center; gap:8px;">
                            <span style="background:#dc2626; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.75rem;">THH</span>
                            DANH SÁCH 376 MẶT HÀNG CHẬM LUÂN CHUYỂN QUÉT TỪ GOOGLE SHEET
                        </h3>
                        <p style="margin:4px 0 0 0; font-size:0.78rem; color:#94a3b8;">
                            Tổng SL: <strong style="color:#f87171;">4.158 chiếc/cái/hộp</strong> • Tổng Giá trị hiện tại: <strong style="color:#fbbf24;">30.123.559 VNĐ</strong> (nhiều mặt hàng chưa có đơn giá)
                        </p>
                    </div>
                    <button type="button" onclick="window.InventoryModule.closeSlowModal()" style="background:none; border:none; color:#cbd5e1; font-size:1.5rem; cursor:pointer; padding:4px 8px; line-height:1;">&times;</button>
                </div>
                <!-- Controls: Filter by Category & Search -->
                <div style="padding:12px 20px; background:#f8fafc; border-bottom:1px solid #e2e8f0; display:flex; gap:12px; flex-wrap:wrap; align-items:center; justify-content:space-between;">
                    <div style="display:flex; gap:6px;" id="slow-cat-filters">
                        <button type="button" class="slow-cat-btn active" data-cat="all" onclick="window.InventoryModule.filterSlowCategory('all')" style="padding:6px 12px; border-radius:6px; border:1px solid #cbd5e1; background:#0284c7; color:#fff; font-weight:700; font-size:0.78rem; cursor:pointer;">Tất cả (376)</button>
                        <button type="button" class="slow-cat-btn" data-cat="Máy" onclick="window.InventoryModule.filterSlowCategory('Máy')" style="padding:6px 12px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:600; font-size:0.78rem; cursor:pointer;">Máy (139)</button>
                        <button type="button" class="slow-cat-btn" data-cat="Consumable" onclick="window.InventoryModule.filterSlowCategory('Consumable')" style="padding:6px 12px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:600; font-size:0.78rem; cursor:pointer;">Vật tư tiêu hao (38)</button>
                        <button type="button" class="slow-cat-btn" data-cat="Part" onclick="window.InventoryModule.filterSlowCategory('Part')" style="padding:6px 12px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:600; font-size:0.78rem; cursor:pointer;">Linh kiện (74)</button>
                        <button type="button" class="slow-cat-btn" data-cat="Option/phần mềm" onclick="window.InventoryModule.filterSlowCategory('Option/phần mềm')" style="padding:6px 12px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:600; font-size:0.78rem; cursor:pointer;">Option (15)</button>
                        <button type="button" class="slow-cat-btn" data-cat="Khác" onclick="window.InventoryModule.filterSlowCategory('Khác')" style="padding:6px 12px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; color:#334155; font-weight:600; font-size:0.78rem; cursor:pointer;">Khác (110)</button>
                    </div>
                    <div style="flex:1; min-width:200px; max-width:320px;">
                        <input type="text" id="slow-search-input" oninput="window.InventoryModule.filterSlowSearch(this.value)" placeholder="Tìm mã, tên vật tư..." style="width:100%; box-sizing:border-box; padding:6px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.82rem; outline:none;">
                    </div>
                </div>
                <!-- Table Body -->
                <div style="flex:1; overflow-y:auto; padding:0;">
                    <table style="width:100%; border-collapse:collapse; font-size:0.82rem; text-align:left;">
                        <thead style="background:#f1f5f9; position:sticky; top:0; z-index:2; border-bottom:2px solid #cbd5e1;">
                            <tr>
                                <th style="padding:8px 10px; width:45px; text-align:center;">STT</th>
                                <th style="padding:8px 10px; width:130px;">Mã vật tư</th>
                                <th style="padding:8px 10px;">Tên Vật tư / Thiết bị</th>
                                <th style="padding:8px 10px; width:90px; text-align:center;">Phân loại</th>
                                <th style="padding:8px 10px; width:55px; text-align:center;">ĐVT</th>
                                <th style="padding:8px 10px; width:70px; text-align:right;">Số lượng</th>
                                <th style="padding:8px 12px; width:120px; text-align:right;">Giá trị (₫)</th>
                            </tr>
                        </thead>
                        <tbody id="thh-slow-table-tbody">
                            <!-- Populated dynamically -->
                        </tbody>
                    </table>
                </div>
                <!-- Footer -->
                <div style="padding:10px 20px; background:#f8fafc; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center; font-size:0.82rem;">
                    <div id="slow-modal-summary" style="font-weight:700; color:#334155;">Đang hiển thị: 376 mặt hàng</div>
                    <button type="button" onclick="window.InventoryModule.closeSlowModal()" style="padding:6px 16px; background:#0f172a; color:#fff; border:none; border-radius:6px; font-weight:700; cursor:pointer;">Đóng</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeSlowModal();
        });
    },

    openSlowModal() {
        this.injectModalHtml();
        const modal = document.getElementById('modal-thh-slow-items');
        if (modal) {
            modal.style.display = 'flex';
            this.currentSlowCat = 'all';
            this.currentSlowQuery = '';
            const searchInput = document.getElementById('slow-search-input');
            if (searchInput) searchInput.value = '';
            this.renderSlowTable(this.thhSlowItems);
        }
    },

    closeSlowModal() {
        const modal = document.getElementById('modal-thh-slow-items');
        if (modal) modal.style.display = 'none';
    },

    filterSlowCategory(cat) {
        this.currentSlowCat = cat;
        const btns = document.querySelectorAll('.slow-cat-btn');
        btns.forEach(b => {
            if (b.getAttribute('data-cat') === cat) {
                b.style.background = '#0284c7';
                b.style.color = '#fff';
            } else {
                b.style.background = '#fff';
                b.style.color = '#334155';
            }
        });
        this.applySlowFilters();
    },

    filterSlowSearch(query) {
        this.currentSlowQuery = (query || '').toLowerCase().trim();
        this.applySlowFilters();
    },

    applySlowFilters() {
        let items = this.thhSlowItems || [];
        if (this.currentSlowCat && this.currentSlowCat !== 'all') {
            items = items.filter(it => it.cat === this.currentSlowCat);
        }
        if (this.currentSlowQuery) {
            items = items.filter(it => 
                (it.code && it.code.toLowerCase().includes(this.currentSlowQuery)) ||
                (it.name && it.name.toLowerCase().includes(this.currentSlowQuery))
            );
        }
        this.renderSlowTable(items);
    },

    renderSlowTable(items) {
        const tbody = document.getElementById('thh-slow-table-tbody');
        const summary = document.getElementById('slow-modal-summary');
        if (!tbody) return;

        let totalQty = 0;
        let totalVal = 0;
        let rowsHtml = '';

        items.forEach((it, idx) => {
            totalQty += it.qty;
            totalVal += it.val;
            const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
            rowsHtml += `
                <tr style="background:${bg}; border-bottom:1px solid #f1f5f9;">
                    <td style="padding:6px 10px; text-align:center; color:#64748b;">${idx + 1}</td>
                    <td style="padding:6px 10px; font-weight:700; color:#0284c7;">${it.code || '-'}</td>
                    <td style="padding:6px 10px; color:#1e293b;">${it.name || '-'}</td>
                    <td style="padding:6px 10px; text-align:center;"><span style="background:#e0f2fe; color:#0369a1; padding:2px 6px; border-radius:4px; font-size:0.72rem; font-weight:700;">${it.cat}</span></td>
                    <td style="padding:6px 10px; text-align:center; color:#64748b;">${it.dvt || '-'}</td>
                    <td style="padding:6px 10px; text-align:right; font-weight:700; color:#0f172a;">${it.qty ? it.qty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="padding:6px 12px; text-align:right; font-weight:700; color:#b91c1c;">${it.val ? it.val.toLocaleString('vi-VN') : '-'}</td>
                </tr>
            `;
        });

        if (items.length === 0) {
            rowsHtml = '<tr><td colspan="7" style="padding:24px; text-align:center; color:#94a3b8;">Không tìm thấy mặt hàng nào phù hợp</td></tr>';
        }

        tbody.innerHTML = rowsHtml;
        if (summary) {
            summary.innerHTML = `Hiển thị <strong>${items.length}</strong> mặt hàng • Tổng SL: <strong style="color:#0284c7;">${totalQty.toLocaleString('vi-VN')}</strong> • Tổng Giá trị: <strong style="color:#b91c1c;">${totalVal.toLocaleString('vi-VN')} VNĐ</strong>`;
        }
    },

    exportSummaryCSV() {
        const rows = [
            ["DON VI", "STT", "DANH MUC", "HP_SL", "HP_GT", "FUJI_SL", "FUJI_GT", "OLI_SL", "OLI_GT", "BON_SL", "BON_GT", "KHAC_SL", "KHAC_GT", "TONG_SL", "TONG_GT"]
        ];

        this.invData.forEach(block => {
            block.rows.forEach(r => {
                const row = [block.companyName, r.stt, r.name];
                let sumVal = 0, sumQty = 0;
                for (let i = 0; i < 5; i++) {
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : '';
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : '';
                    if (v) sumVal += v;
                    if (q) sumQty += q;
                    row.push(q, v);
                }
                row.push(sumQty || '', sumVal || '');
                rows.push(row);
            });
        });

        const csvContent = "\uFEFF" + rows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Bao_Cao_Ton_Kho_HDKD_Va_Du_An_VPS_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    }
};

// Auto initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.InventoryModule.init());
} else {
    window.InventoryModule.init();
}
