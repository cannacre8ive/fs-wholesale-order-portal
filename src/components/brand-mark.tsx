import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="brand-mark" aria-label="Flower Spectrum home">
      <span className="brand-glyph" aria-hidden="true"><i /><i /><i /></span>
      <span>Flower Spectrum<small>Wholesale intelligence</small></span>
    </Link>
  );
}
