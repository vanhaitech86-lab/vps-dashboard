# -*- coding: utf-8 -*-
"""
continuous_scanner.py
Dịch vụ chạy nền quét dữ liệu liên tục (Continuous Realtime Scanner)
Tự động quét định kỳ 6 Google Sheets của Tập đoàn VPS,
chuẩn hóa và cập nhật trực tiếp vào bộ dữ liệu Live Dashboard.
"""
import time
import subprocess
import sys
import os

INTERVAL_SECONDS = 60  # Quét liên tục mỗi 60 giây (có thể điều chỉnh)

def run_step(cmd_args, desc):
    print(f"\n[{time.strftime('%H:%M:%S')}] >>> {desc}...")
    try:
        res = subprocess.run(cmd_args, capture_output=True, text=True, encoding='utf-8', errors='ignore')
        if res.returncode == 0:
            print(f"[{time.strftime('%H:%M:%S')}] ✓ {desc} hoàn thành.")
            return True
        else:
            print(f"[{time.strftime('%H:%M:%S')}] ⚠ Lỗi {desc}: {res.stderr[:200]}")
            return False
    except Exception as e:
        print(f"[{time.strftime('%H:%M:%S')}] ❌ Ngoại lệ khi {desc}: {e}")
        return False

def main():
    print("=" * 70)
    print("🚀 BẬT DỊCH VỤ QUÉT DỮ LIỆU LIÊN TỤC TẬP ĐOÀN VPS (24/7)")
    print(f"⏰ Chu kỳ lặp: {INTERVAL_SECONDS} giây / lần")
    print("👉 Nhấn Ctrl + C để tạm dừng bất kỳ lúc nào.")
    print("=" * 70)

    loop_count = 1
    while True:
        print(f"\n==================== VÒNG QUÉT THỨ #{loop_count} ({time.strftime('%Y-%m-%d %H:%M:%S')}) ====================")
        
        # Bước 1: Quét nhanh đa luồng toàn bộ 6 Google Sheets
        s1 = run_step([sys.executable, 'fast_scan_and_sync_all.py'], "Quét 6 Google Sheets đa luồng")
        
        # Bước 2: Chuẩn hóa và cập nhật Live Data
        if s1:
            run_step([sys.executable, 'generate_complete_live_data.py'], "Chuẩn hóa & ghi vào js/google_sheets_live_data.js")

        # Bước 3: Quét tiến độ tuần và lưu báo cáo kiểm toán
        run_step(['node', 'scan_missing_units_reports.js'], "Rà soát tiến độ nộp báo cáo 6 đơn vị")

        print(f"\n[✓] Hoàn tất vòng #{loop_count}. Chờ {INTERVAL_SECONDS} giây cho lượt tiếp theo...")
        loop_count += 1
        try:
            time.sleep(INTERVAL_SECONDS)
        except KeyboardInterrupt:
            print("\n🛑 Đã nhận tín hiệu dừng dịch vụ quét liên tục.")
            break

if __name__ == '__main__':
    main()
