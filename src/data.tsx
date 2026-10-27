import type { ReactElement } from 'react';
import { 
  FaBrain, FaUserAltSlash, FaSyncAlt, FaBalanceScale, FaChartPie, 
  FaUsers, FaSchool, FaQuestion, FaTimesCircle, FaSadTear, FaLink, 
  FaHandshake, FaCogs, FaShieldAlt, FaExclamationTriangle, FaFire, 
  FaHistory, FaLightbulb, FaCoins, FaGavel, FaDice, 
  FaLeaf, FaCube, FaChartLine, FaWallet, FaBalanceScaleLeft, 
  FaEyeSlash, FaCheckCircle, FaExchangeAlt, FaProjectDiagram, FaSearch, FaBullseye
} from 'react-icons/fa';

export interface Fallacy { 
    icon: ReactElement; 
    title: string; 
    formality: boolean; 
}

export const fallacies: Fallacy[] = [
  { icon: <FaUserAltSlash />, title: "ad-hominem", formality: false },
  { icon: <FaBrain />, title: "straw-man", formality: true },
  { icon: <FaSchool />, title: "appeal-to-authority", formality: false },
  { icon: <FaBalanceScale />, title: "false-dilemma", formality: true },
  { icon: <FaChartLine />, title: "slippery-slope", formality: false },
  { icon: <FaSyncAlt />, title: "circular-reasoning", formality: true },
  { icon: <FaUsers />, title: "hasty-generalization", formality: false },
  { icon: <FaCogs />, title: "red-herring", formality: true },
  { icon: <FaUsers />, title: "bandwagon-appeal", formality: false },
  { icon: <FaSadTear />, title: "appeal-to-emotion", formality: false },
  { icon: <FaLink />, title: "post-hoc-ergo-propter-hoc", formality: true },
  { icon: <FaQuestion />, title: "appeal-to-ignorance", formality: false },
  { icon: <FaTimesCircle />, title: "tu-quoque", formality: false },
  { icon: <FaHistory />, title: "genetic-fallacy", formality: false },
  { icon: <FaSyncAlt />, title: "begging-the-question", formality: true },
  { icon: <FaExchangeAlt />, title: "equivocation", formality: false },
  { icon: <FaExclamationTriangle />, title: "false-cause", formality: true },
  { icon: <FaHistory />, title: "appeal-to-tradition", formality: false },
  { icon: <FaLightbulb />, title: "appeal-to-novelty", formality: false },
  { icon: <FaCoins />, title: "sunk-cost-fallacy", formality: false },
  { icon: <FaSadTear />, title: "appeal-to-pity", formality: false },
  { icon: <FaFire />, title: "appeal-to-fear", formality: false },
  { icon: <FaShieldAlt />, title: "no-true-scotsman", formality: false },
  { icon: <FaTimesCircle />, title: "fallacy-fallacy", formality: true },
  { icon: <FaGavel />, title: "special-pleading", formality: false },
  { icon: <FaSearch />, title: "burden-of-proof", formality: true },
  { icon: <FaDice />, title: "gamblers-fallacy", formality: false },
  { icon: <FaLeaf />, title: "appeal-to-nature", formality: false },
  { icon: <FaHandshake />, title: "composition-fallacy", formality: true },
  { icon: <FaChartPie />, title: "division-fallacy", formality: true },
  { icon: <FaProjectDiagram />, title: "anecdotal-fallacy", formality: false },
  { icon: <FaWallet />, title: "appeal-to-wealth", formality: false },
  { icon: <FaCoins />, title: "appeal-to-poverty", formality: false },
  { icon: <FaBalanceScaleLeft />, title: "middle-ground", formality: false },
  { icon: <FaEyeSlash />, title: "fallacy-of-omission", formality: false },
  { icon: <FaCheckCircle />, title: "gamblers-reversal", formality: false },
  { icon: <FaCube />, title: "fallacy-of-division-logic", formality: true },
  { icon: <FaBalanceScale />, title: "moral-equivalence", formality: false },
  { icon: <FaExclamationTriangle />, title: "appeal-to-consequences", formality: true },
  { icon: <FaExchangeAlt />, title: "faulty-analogy", formality: false },
  { icon: <FaBrain />, title: "affirming-the-consequent", formality: true },
  { icon: <FaBrain />, title: "denying-the-antecedent", formality: true },
  { icon: <FaBrain />, title: "undistributed-middle", formality: true },
  { icon: <FaSearch />, title: "masked-man-fallacy", formality: true },
  { icon: <FaBullseye />, title: "texas-sharpshooter", formality: false },
  { icon: <FaUsers />, title: "middle-majority", formality: false },
  { icon: <FaLightbulb />, title: "persuasive-definition", formality: false }
];