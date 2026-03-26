interface Props {
  activeCount: number;
  doneCount: number;
  onClearDone: () => void;
}

export default function TodoFooter({ activeCount, doneCount, onClearDone }: Props) {
  return (
    <div className="footer">
      <span>剩余 <strong>{activeCount}</strong> 项未完成</span>
      {doneCount > 0 && (
        <button onClick={onClearDone}>清除已完成 ({doneCount})</button>
      )}
    </div>
  );
}
