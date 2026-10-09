import Image from "next/image";

/* The portrait is used exactly as supplied. Here it is a clean, quiet frame: crop, size and rounding only. */
export function AboutPortrait() {
  return (
    <figure className="ab-portrait">
      <Image src="/images/mypicture.png" alt="Portrait of Tatiana Botero" width={941} height={1672} priority sizes="(max-width: 860px) 72vw, 400px" />
    </figure>
  );
}
