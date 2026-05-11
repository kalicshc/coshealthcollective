import Image from "next/image";

type Props = {
  size?: "lg" | "sm";
};

export function CoBrandedHeader({ size = "lg" }: Props) {
  const cosSize = size === "lg" ? 64 : 36;
  const acHeight = size === "lg" ? 50 : 30;
  const acWidth = size === "lg" ? 208 : 124;

  return (
    <div className="flex items-center justify-center gap-5 sm:gap-8">
      <Image
        src="/logo-main.png"
        alt="Colorado Springs Health Collective"
        width={cosSize}
        height={cosSize}
        className="object-contain"
        priority={size === "lg"}
      />
      <span
        aria-hidden="true"
        className="block h-10 w-px sm:h-12"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, hsla(177,70%,59%,0.5) 35%, hsla(215,50%,55%,0.5) 65%, transparent 100%)",
        }}
      />
      <Image
        src="/images/partners/activcore/logo.svg"
        alt="Activcore Physical Therapy and Performance"
        width={acWidth}
        height={acHeight}
        className="object-contain"
        priority={size === "lg"}
      />
    </div>
  );
}
