type NewGameButtonProps = {
  onClick: () => void;
};

export default function NewGameButton({ onClick }: NewGameButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-4 p-2 bg-yellow-500 text-gray-900 rounded-lg"
    >
      New Game
    </button>
  );
}
