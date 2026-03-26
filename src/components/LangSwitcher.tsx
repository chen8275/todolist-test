import { useLang } from '../LangContext';

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <button
      className="lang-switcher"
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
    >
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
