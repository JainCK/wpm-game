type InfoDisplayProps = {
  wpm: number | null;
};

export default function InfoDisplay({ wpm }: InfoDisplayProps) {
  return (
    <div id="info" className="text-2xl font-bold mt-4">
      {wpm !== null ? `WPM: ${wpm}` : "Get Ready!"}
    </div>
  );
}
