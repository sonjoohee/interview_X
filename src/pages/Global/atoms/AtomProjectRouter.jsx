import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PROJECT_SAAS } from '../../../pages/AtomStates';

export const AtomProjectRouter = () => {
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    
    // 지정된 경로에서만 리다이렉션 적용
    if (projectSaas && Object.keys(projectSaas).length === 0 && (
      currentPath === '/ExpertInsight' || 
      currentPath === '/Persona/3/Select' ||
      currentPath === '/Persona/4' ||
      currentPath === '/Persona/4/Single' ||
      currentPath === '/Persona/4/SingleLive' ||
      currentPath === '/TargetDiscovery' ||
      currentPath === '/CustomerValueAnalyzer' ||
      currentPath === '/IdeaGenerator' ||
      currentPath === '/DesignAnalysis' ||
      currentPath === '/DesignSuitability' ||
      currentPath === '/Persona3Single' ||
      currentPath === '/Persona3Multiple' ||
      currentPath === '/DashBoard' ||
      currentPath === '/AiPersona' ||
      currentPath === '/Tool' ||
      currentPath === '/StorageBox'
    )) {
      navigate('/Project');
    }
  }, [projectSaas, navigate, location]);

  return null;
};

export default AtomProjectRouter; 