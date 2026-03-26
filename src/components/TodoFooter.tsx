import { useLang } from '../LangContext';

interface Props {
  activeCount: number;
  doneCount: number;
  onClearDone: () => void;
}

export default function TodoFooter({ activeCount, doneCount, onClearDone }: Props) {
  const { t } = useLang();
  return (
    <div className="footer">
      <span>{t.itemsLeft(activeCount)}</span>
      {doneCount > 0 && (
        <button onClick={onClearDone}>{t.clearDone(doneCount)}</button>
      )}
    </div>
  );
}
