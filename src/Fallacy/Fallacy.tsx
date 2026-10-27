import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
const exampleColors = [
  "border-primary bg-primary/10",
  "border-accent-green bg-accent-green/10",
  "border-accent-purple bg-accent-purple/10",
];
const Arrow =()=>{
  const {i18n} = useTranslation();
  if(i18n.language ==="ar"){
    return <FaLongArrowAltRight className="inline"/>
  }
  return <FaLongArrowAltLeft className="inline"/>
}

const FallacyDetails: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const { t, i18n } = useTranslation();

  const fallacy: {
    id: string;
    title: string;
    description: string;
    definition: string;
    number: number;
    examples: {
      text: string;
      explanation: string;
    }[];
  } = (t("fallacy", { returnObjects: true }) as any[]).filter(
    (f) => f.id === title
  )[0];
  console.log(JSON.stringify(t("fallacy",{returnObjects:true})) )
  if (
    !fallacy ||
    typeof fallacy !== "object" ||
    !Array.isArray(fallacy.examples)
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-fg">
        <div className="w-full text-xl max-w-md   p-8">
          <h1 className="text-4xl text-center font-semibold">
            {t("util.PageNotFound")}
          </h1>
          <Link
            to="/"
            className="text-xl font-semibold mt-5 inline-block  text-primary hover:underline"
          >
            {/* 0 */}

            <Arrow /> 
            {t("util.fallacy.back")}

          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      key={i18n.language}
      className="min-h-screen bg-bg font-display text-fg"
    >
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav className="mb-12">
          <Link
            to="/"
            className="text-sm text-fg/60 transition-colors hover:text-primary"
          >
            <Arrow /> 
             
            
             {t("util.fallacy.back")}
          </Link>
        </nav>

        <header className="mb-12">
          {/* <p className="mb-4 text-sm font-medium text-primary">
            {t("fallacyDetails.label")}
          </p> */}

          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {fallacy.title}
          </h1>

          <p className="mt-5 text-base leading-8 text-fg/70 sm:text-lg">
            {fallacy.description}
          </p>
        </header>

        <section className="mb-14">
          <h2 className="mb-4 text-lg font-bold">
            {t("util.fallacy.explanation")}
          </h2>

          <div className="border-l-2 border-primary bg-primary/5 p-5">
            <p className=" text-lg leading-8 text-fg/80 font-bold">
              {fallacy.definition}
            </p>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-xl font-semibold">
              {t("util.fallacy.examples")}
            </h2>

            <span className="text-sm text-fg/45">
              {fallacy.examples.length}
            </span>
          </div>

          <div className="space-y-4">
            {fallacy.examples.map((example, index) => (
              <article
                key={index}
                className={`border-l-4 p-5 sm:p-6 ${
                  exampleColors[index % exampleColors.length]
                }`}
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg/60">
                  {t("util.fallacy.example")} {index + 1}
                </p>

                <blockquote className="text-lg font-bold leading-8 text-fg sm:text-lg">
                  “{example.text}”
                </blockquote>

                <div className="mt-5 border-t border-fg/10 pt-4">
                  <h3 className="mb-2 text-sm font-semibold text-fg/70">
                    {t("util.fallacy.example_explanation")} :
                  </h3>

                  <p className="text-sm font-bold leading-7 text-fg/75 sm:text-base sm:leading-8">
                    {example.explanation}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-12">
          <Link
            to="/"
            className="text-sm text-fg/60 transition-colors hover:text-primary"
          >
            <Arrow /> 
            
             {t("util.fallacy.back")} 
          </Link>
        </footer>
      </article>

    </main>
  );
};

export default FallacyDetails;