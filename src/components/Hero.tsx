const BG = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7f4cfb17-bdf5-4e68-b328-314835a6c048.png"

export function Hero() {
  return (
    <section style={{
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} />
  )
}
