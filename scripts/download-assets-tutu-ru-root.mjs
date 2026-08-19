import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "sites", "tutu-ru", "root", "images");
await mkdir(outDir, { recursive: true });

const assets = [
  ["hero-plane.webp", "https://cdn1.tu-tu.ru/main-page/_next/static/media/avia-search-extension.aaa892e7.webp"],
  ["turbo-badge.webp", "https://cdn1.tu-tu.ru/main-page/_next/static/media/turbo-logo.d6582a7f.webp"],
  ["promo-happy-weeks.webp", "https://cdn4.tu-tu.ru/static/bdui/tutuHotel_oteli_schastlivye_nedeli_17-2108_Desktop%201749x474%20%283%29.fc0badfcbf35bbf6d8b578becb2e995e137b6574.webp"],
  ["deal-baku.webp", "https://cdn4.tu-tu.ru/static/bdui_juicy_offers/Baku.7c75d34cb0b3d48a2f2506dd22e4beaceec14c20.webp"],
  ["deal-sochi.jpg", "https://cdn4.tu-tu.ru/static/bdui_juicy_offers/Sochi.3c3e1a513309ffa55ffd4d5d1af4bc72a93a2e4a.jpg"],
  ["hotel-food-city.jpg", "https://cdn2.tu-tu.ru/imghub/view/fe9614b2-ed3e-4512-ba20-0f864d872ae1/resize_500_500/4271b6c12b3a41b87b17f2bfcd92ed9a/5f6a8829d33b4f900d38561e148306bb.jpg"],
  ["hotel-apartstel.jpg", "https://cdn2.tu-tu.ru/imghub/view/4ba1cf38-b3ad-40bb-9c35-c07d6fde2298/resize_500_500/4271b6c12b3a41b87b17f2bfcd92ed9a/8c917f07d5f6e4599694976e2093ebf2.jpg"],
  ["hotel-gavan.jpg", "https://cdn2.tu-tu.ru/imghub/view/8585ca05-29f4-4959-9eaf-e14769b085c0/resize_500_500/4271b6c12b3a41b87b17f2bfcd92ed9a/f7535b36c11929c22d3e7d79dfc6063b.jpg"],
  ["hotel-ayti.jpg", "https://cdn2.tu-tu.ru/imghub/view/ed687d68-08fb-4cde-b9cd-b9dac45e24d8/resize_500_500/4271b6c12b3a41b87b17f2bfcd92ed9a/f686cad4f1f0f34f24c5e31c3d2aa152.jpg"],
  ["hotel-cronwell.jpg", "https://cdn2.tu-tu.ru/imghub/view/de5a6563-0c07-4353-bf27-6a8c2d089d58/resize_500_500/4271b6c12b3a41b87b17f2bfcd92ed9a/60190d631f7b75ce2c08e580026b0308.jpg"],
  ["hotel-hostel.jpg", "https://cdn2.tu-tu.ru/imghub/view/e5769f42-88b6-4761-85d0-2d9e75ccc212/resize_500_500/4271b6c12b3a41b87b17f2bfcd92ed9a/7eb08ab82944c91ba84dc95b70776873.jpg"],
  ["city-spb.webp", "https://cdn2.tu-tu.ru/imghub/view/462ef3d1-7d20-4ce3-805f-e1ff07f3d2a9/default/90aac2f131cd71ff00bd1bd948c3c352/931ce045ffcd7c5839485044fbaaf162.webp"],
  ["city-nnov.webp", "https://cdn2.tu-tu.ru/imghub/view/3ea2ae11-9315-41e9-b843-fa878bbcc317/default/90aac2f131cd71ff00bd1bd948c3c352/c45bcae44b24b1574d07fcda9bdfc7d5.webp"],
  ["city-yaroslavl.webp", "https://cdn2.tu-tu.ru/imghub/view/6e59be80-2f03-40c6-81c0-ed162f8cb1f5/default/90aac2f131cd71ff00bd1bd948c3c352/11682e5d2deb91d86d000efa6067e917.webp"],
  ["city-ryazan.webp", "https://cdn2.tu-tu.ru/imghub/view/56350796-69bd-4f5a-846f-6808cd5665ac/default/90aac2f131cd71ff00bd1bd948c3c352/95714e6e6faf49e69bcb1f2099ce38be.webp"],
  ["banner-sea-discount.webp", "https://cdn4.tu-tu.ru/static/bdui/plyazhnyy_otdykh_za_rubezhom_web_Desktop%201749x474-1%20%281%29.f3fe4299a3ed79bcc6580c4410efa59ecaaeeeea.webp"],
];

async function downloadOne([filename, url]) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(outDir, filename), buf);
    console.log("OK", filename, buf.length);
  } catch (e) {
    console.error("FAIL", filename, e.message);
  }
}

async function run() {
  const batchSize = 4;
  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    await Promise.all(batch.map(downloadOne));
  }
}

run();
