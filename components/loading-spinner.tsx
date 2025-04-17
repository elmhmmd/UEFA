export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[rgba(var(--neon-blue),0.2)] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[rgb(var(--neon-blue))] rounded-full animate-spin"></div>
        <div
          className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-b-[rgb(var(--neon-pink))] rounded-full animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>
    </div>
  )
}
