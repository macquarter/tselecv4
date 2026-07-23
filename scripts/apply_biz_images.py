#!/usr/bin/env python3
"""
사업영역(Business) 기본 썸네일 이미지 자동 교정 스크립트.

문제: repo의 기본 이미지(public/images/products/*.jpg) 중 일부가 실제 제품이
아니라 PCB 기판 사진이거나 손상된 0바이트 텍스트 파일이었다. 이 파일들은
useImage(key, fallback) 훅의 fallback 으로 쓰이므로, 페이지 새로고침 시
Firestore(CMS) 로딩 전 짧은 순간 PCB/깨진 이미지가 노출되는 flash 가 발생한다.

해결: Firestore siteContent/media 문서에 이미 저장된 '정상 제품 사진'(CMS 오버라이드,
관리자가 업로드한 실제 제품 이미지)을 그대로 내려받아 repo 기본 파일을 덮어쓴다.
그러면 fallback == 실제 렌더 이미지가 되어 flash 시에도 올바른 제품 사진만 보인다.
동시에 손상된 0바이트 파일도 정상 JPEG 로 복구된다.
"""
import base64, json, os, ssl, sys, urllib.request

PROJECT = "gen-lang-client-0276589179"
DB      = "ai-studio-e97c649f-c50c-4cd5-8952-6640d34f2444"
API_KEY = "AIzaSyDmgOBu3kPUGzff_CyR647kIbN4F91seJE"  # 클라이언트 공개 키(이미 웹앱에 노출됨)

# Firestore 이미지 오버라이드 key -> repo 기본 파일명
MAP = {
    "biz.home.f0.img": "refrigerator-main.jpg",
    "biz.home.f1.img": "water-purifier-main.jpg",
    "biz.home.f2.img": "range-hood.jpg",
    "biz.home.f3.img": "air-purifier-main.jpg",
    "biz.med.f0.img":  "centrifuge.jpg",
    "biz.med.f1.img":  "medical-device.jpg",
    "biz.med.f2.img":  "dental-scaler.jpg",
    "biz.ren.f0.img":  "fuel-cell-pbu.jpg",
    "biz.ren.f1.img":  "hydrogen.jpg",
    "biz.ren.f2.img":  "lithium-charger.jpg",
    "biz.ren.f3.img":  "solar-panel.jpg",
    "biz.ind.f0.img":  "dishwasher.jpg",
    "biz.ind.f1.img":  "chungho-ice-550.jpg",
    "biz.ind.f2.img":  "pump.jpg",
    "biz.ind.f3.img":  "smart-booth.jpg",
    "biz.ind.f4.img":  "temp-controller.jpg",
}

OUTDIR = "public/images/products"
CTX = ssl.create_default_context()

def fetch(url, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": "tselec-ci"})
    return urllib.request.urlopen(req, timeout=timeout, context=CTX).read()

def maybe_downscale(raw):
    """PIL 있으면 800px 이내로 축소 + 재압축, 없으면 원본 그대로."""
    try:
        from PIL import Image
        import io
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        w, h = im.size
        m = max(w, h)
        if m > 800:
            r = 800.0 / m
            im = im.resize((int(w*r), int(h*r)), Image.LANCZOS)
        out = io.BytesIO()
        im.save(out, "JPEG", quality=84, optimize=True)
        return out.getvalue()
    except Exception as e:
        sys.stderr.write(f"[warn] downscale skipped: {e}\n")
        return raw

def main():
    url = (f"https://firestore.googleapis.com/v1/projects/{PROJECT}"
           f"/databases/{DB}/documents/siteContent/media?key={API_KEY}")
    doc = json.loads(fetch(url))
    if "error" in doc:
        raise SystemExit(f"Firestore error: {doc['error']}")
    imgs = doc["fields"]["images"]["mapValue"]["fields"]
    os.makedirs(OUTDIR, exist_ok=True)
    changed = 0
    for key, fname in MAP.items():
        node = imgs.get(key)
        if not node:
            print(f"[skip] no CMS value for {key}")
            continue
        v = node.get("stringValue", "")
        try:
            if v.startswith("data:"):
                raw = base64.b64decode(v.split(",", 1)[1])
            elif v.startswith("http"):
                raw = fetch(v)
            else:
                print(f"[skip] {key}: unsupported value")
                continue
        except Exception as e:
            print(f"[fail] {key}: {e}")
            continue
        if not raw or raw[:2] != b"\xff\xd8":
            print(f"[fail] {key}: not a JPEG ({len(raw)} bytes)")
            continue
        raw = maybe_downscale(raw)
        path = os.path.join(OUTDIR, fname)
        with open(path, "wb") as f:
            f.write(raw)
        print(f"[ok]   {key:16s} -> {path}  ({len(raw)} bytes)")
        changed += 1
    print(f"\nDone. {changed}/{len(MAP)} images refreshed.")
    if changed == 0:
        raise SystemExit("No images written")

if __name__ == "__main__":
    main()
