import { Filter , FallaciesGrid  } from "./Sections";
import { fallacies  , type Fallacy} from './data';

import { FaBrain, FaTools, FaComments } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const LogicalFallacies: React.FC = () => {
  const { t } = useTranslation();
  const [fallaciesState, SetFallacies] = useState<Fallacy[]>(fallacies); 
  const cards = [
    { 
      icon: <FaBrain size={48} />, 
      title: t("util.cards.understanding.title"),
      text: t("util.cards.understanding.text"),
      color: "text-primary" 
    },
    { 
      icon: <FaTools size={48} />, 
      title: t("util.cards.criticalThinking.title"),
      text: t("util.cards.criticalThinking.text"),
      color: "text-accent-green" 
    },
    { 
      icon: <FaComments size={48} />, 
      title: t("util.cards.strengthenArguments.title"),
      text: t("util.cards.strengthenArguments.text"),
      color: "text-accent-purple" 
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-bg font-display text-fg px-12">
      <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 lg:px-8">

        
       

        
        <div className="text-center py-10 pb-6 px-4 ">
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-wide font-extrabold md:text-5xl pb-12">
              {t("util.hero.title")}
            </h1>
            <p className="text-lg font-normal leading-relaxed text-fg/80 ">
              {t("util.hero.subtitle")}
            </p>
          </div>
        </div>

        
        <div className="flex flex-col gap-10 px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <div 
                key={idx} 
                className="flex flex-col flex-1 gap-3 gap-y-6 rounded-lg border border-fg/20 text-fg/30 bg-light p-6 text-center items-center leading-relax"
              >
                <div className={`${card.color} text-4xl`}>
                  {card.icon}
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg text-fg font-extrabold">{card.title}</h2>
                  <p className="text-sm font-normal leading-relaxed text-fg/70">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <h2 className="text-3xl font-bold leading-tight tracking-tight px-4 pb-3 pt-10 text-center">
          {t("util.search.title")}
        </h2>



        <Filter allFallacies={fallacies} SetFallacies={SetFallacies}/>
        <FallaciesGrid fallacies={fallaciesState} />
      </div>
    </div>
  );
};

export default LogicalFallacies;
