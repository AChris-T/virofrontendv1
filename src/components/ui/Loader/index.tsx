export default function Loader({ size = 20 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-[2px] border-[#FFFFFF66] border-t-[#FFF] rounded-full animate-spin "
    />
  );
}
