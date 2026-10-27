
import { useEffect ,useState, type Dispatch, type SetStateAction } from "react";
import { type Fallacy } from "./data";

import { useTranslation } from "react-i18next";
import { FaStar,FaBrain } from "react-icons/fa";

import { IoIosArrowForward  , IoIosArrowBack} from "react-icons/io";
 
import clsx from "clsx";
import { Link } from "react-router-dom";



export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<"en" | "ar">(i18n.language === "ar" ? "ar" : "en");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleLanguageChange = (newLang: "en" | "ar") => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b text-fg/10 px-8 py-8  bg-bg">
      <Link to={'/'} className={`flex items-center gap-4 text-fg ${lang === "ar" ? "flex-row-reverse" : ""}`}>
        <div className="text-primary">
          <FaBrain size={32} />
        </div>
        <h2 className="text-2xl font-bold leading-tight tracking-tight">
          {t("util.header.title")}
        </h2>
      </Link>
      <div>
        {lang === "en" ? (
          <button
            onClick={() => handleLanguageChange("ar")}
            className="px-3 py-1 border rounded bg-primary text-white"
          >
            العربية
          </button>
        ) : (
          <button
            onClick={() => handleLanguageChange("en")}
            className="px-3 py-1 border rounded bg-primary text-white"
          >
            English
          </button>
        )}
        </div>    
    </header>
  );
};



export const Filter = ({
  allFallacies,
  SetFallacies
}: {
  allFallacies: Fallacy[];
  SetFallacies: Dispatch<SetStateAction<Fallacy[]>>;
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | "formal" | "informal">("all");

  const handleFilter = (cat: "all" | "formal" | "informal", term: string) => {
   const filtered = allFallacies.filter(f => {
  const translatedTitle = t(`fallacy.${f.title}.title`);
  
  if (cat === "formal" && !f.formality) return false;
  if (cat === "informal" && f.formality) return false;
  if (term && !translatedTitle.toLowerCase().includes(term.toLowerCase())) return false;
  return true;
});
    SetFallacies(filtered);
  };

  const handleCategoryClick = (cat: "all" | "formal" | "informal") => {
    setCategory(cat);
    handleFilter(cat, search);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    handleFilter(category, term);
  };

  return (
    <>
      <div className="px-4 pb-6">
        <div className="relative mx-auto w-full max-w-2xl">
          <input
            className="w-full rounded-full border text-fg bg-bg py-3 pl-4 pr-12 leading-relaxed placeholder-fg/50 focus:border-fg focus:outline-none focus:ring-2 focus:ring-fg"
            placeholder={t("util.search.placeholder")}
            type="search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <span className="font-bold">{t("util.filter.category")}</span>
          <div className="flex items-center gap-2">
            <button
              className={`rounded-full px-3 py-1 text-sm font-semibold text-fg/70 transition-colors  ${category ==="all" ? 'bg-primary text-white':'bg-transparent hover:bg-primary/30' }`}

              onClick={() => handleCategoryClick("all")}
            >
              {t("util.filter.all")}
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm font-semibold text-fg/70 transition-colors ${category ==="informal" ? 'bg-accent-purple text-white':'bg-transparent hover:bg-accent-purple/50' }`}
              onClick={() => handleCategoryClick("informal")}
            >
              {t("util.filter.informal")}
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm font-semibold text-fg/70 transition-colors ${category ==="formal" ? 'bg-accent-green text-white':'bg-transparent hover:bg-accent-green/30' }`}

              onClick={() => handleCategoryClick("formal")}
            >
              {t("util.filter.formal")}
            </button>
            <button
              className="flex items-center gap-1 rounded-full bg-transparent px-3 py-1 text-sm font-semibold text-fg/70 transition-colors hover:bg-black/5"
              onClick={() => handleCategoryClick("all")}
            >
              <span className="text-favorite">★</span>
              <span>{t("util.filter.favorites")}</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label className="font-bold" htmlFor="sort">{t("util.filter.sortBy")}</label>
          <select
            className="w-auto rounded-md border text-fg/80 bg-bg py-1.5 px-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-fg/50"
            id="sort"
            name="sort"
          >
            <option>{t("util.filter.sort.mostCommon")}</option>
            <option>{t("util.filter.sort.alphabetical")}</option>
            <option>{t("util.filter.sort.leastCommon")}</option>
          </select>
        </div>
      </div>
    </>
  );
};


export function FallaciesGrid({ fallacies }: { fallacies: Fallacy[] }) {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(i18n.dir());
  const perPage = 9;

  useEffect(() => {
    setDir(i18n.dir());
    setPage(0);
  }, [i18n.language]);

  const totalPages = Math.ceil(fallacies.length / perPage);
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const paginatedFallacies = fallacies.slice(page * perPage, page * perPage + perPage);
  const fallaciesTitles =  Object.fromEntries(
  (t("fallacy", { returnObjects: true }) as any[])
    .map(f => [f.id, f.title])
);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 p-4 min-h-screen">
        {
          
          paginatedFallacies.length ===0 ? 
            <p className="text-4xl font-bold tracking-widest rotate-45 scale-x-200  self-center text-fg/60">nothing to show</p>
          :
          paginatedFallacies.map((fallacy, idx) => (
            <Link to={`/${fallacy.title}`} key={idx}
              className={
                clsx(
                  "w-42 h-42 group relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 bg-light p-4 text-center transition-all duration-300",
                  fallacy.formality ? 'border-accent-green' :'border-accent-purple'
                
                )}>
            <button className="absolute top-2 left-2 text-bg transition-colors hover:text-favorite">
              <FaStar size={22} />
            </button>
            <div className=
                {clsx(
                  "text-4xl text-fg/60 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent-green",
                  fallacy.formality ? 'group-hover:text-accent-green' :'group-hover:text-accent-purple'
              
              )
              
                
                
                }>
              {fallacy.icon}
            </div>
              <p className=
                {clsx(
                  " font-bold leading-tight transition-colors  text-fg text-lg",
                    fallacy.formality ? 'group-hover:text-accent-green' :'group-hover:text-accent-purple'
                )}>
              {fallaciesTitles[fallacy.title]}
            </p>
          </Link>
        ))}
      </div>

      <div className={`flex justify-center gap-4 mt-4 ${dir === "rtl" ? "flex-row-reverse" : "flex-row"}`}>
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          <IoIosArrowBack />
        </button>

        <span className="px-2 py-2">
          {page + 1} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages - 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
