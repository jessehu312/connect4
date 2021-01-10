import { useState, useEffect, useContext, createContext } from "react";
import Radar from 'radar-sdk-js';

const ConfigContext = createContext({
  config: null,
});

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    return fetch('/api/client-config')
    .then(resp => resp.json())
    .then(({radar}) => {
      const radarClient = Radar;
      radarClient.initialize(radar);
      setConfig({radarClient});
    })
  }, []);

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => {
  return useContext(ConfigContext);
};