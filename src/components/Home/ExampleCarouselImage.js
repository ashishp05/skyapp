import Image from "next/image";
import ima from "../../../public/logo.png"
export default function ExampleCarouselImage({ text }) {
  return (
    <div src={ima}
      style={{
        height: "470px",
        backgroundColor: "#aaa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "1.5rem"
      }}
    >

        <Image src={text} alt="image" width={1100} height={470} />
    </div>
  );
}
