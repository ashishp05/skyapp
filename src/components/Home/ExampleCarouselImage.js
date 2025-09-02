import Image from "next/image";

export default function ExampleCarouselImage({ text }) {
  return (
    <div
      style={{
        height: "330px",
        width: "100%",
        position: "relative",
        borderRadius: "0.75rem",
        overflow: "hidden", // border radius ke andar image crop ho jaye
      }}
    >
      <Image
        src={text}
        alt="image"
        fill
        style={{
          objectFit: "cover", // image ko container ke andar achhi tarah set karega
        }}
      />
    </div>
  );
}
