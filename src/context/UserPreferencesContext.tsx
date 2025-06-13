import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useQuery, useMutation, useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface UserPreferences {
  username: string;
  occupation: string;
  traits: string[];
  aboutText: string;
  hidePersonalInfo: boolean;
  disableThematicBreaks: boolean;
  statsForNerds: boolean;
  mainFont: string;
  codeFont: string;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  loading: boolean;
  savePreferences: (newPrefs: Partial<UserPreferences>) => Promise<void>;
  loadLegacyData: () => Promise<void>;
}

const defaultPreferences: UserPreferences = {
  username: '',
  occupation: '',
  traits: ['friendly', 'concise', 'empathetic'],
  aboutText: '',
  hidePersonalInfo: false,
  disableThematicBreaks: false,
  statsForNerds: false,
  mainFont: 'Proxima Vara',
  codeFont: 'Berkeley Mono',
};

const UserPreferencesContext = createContext<UserPreferencesContextType>({
  preferences: defaultPreferences,
  loading: true,
  savePreferences: async () => {},
  loadLegacyData: async () => {},
});

export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const userId = user?.id || '';
  
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);
  
  const userPreferencesData = useQuery(api.userPreferences.getUserPreferences, { userId });
  const savePreferencesMutation = useMutation(api.userPreferences.saveUserPreferences);
  const loadLegacyDataMutation = useMutation(api.userPreferences.loadLegacyData);
  const convex = useConvex();
  
  useEffect(() => {
    // 1) still loading from Convex? do nothing.
    if (userPreferencesData === undefined) return;

    // 2) we got back a real object => hydrate state & stop loading
    if (userPreferencesData) {
      setPreferences({
        ...defaultPreferences,
        ...userPreferencesData,
      });
      setLoading(false);

    // 3) we loaded but got `null` => first‐time visitor, insert defaults
    } else if (userId) {
      (async () => {
        try {
          await savePreferencesMutation({
            userId,
            ...defaultPreferences,
          });
          // now that the record exists, you could refetch, but the
          // next render of useQuery will return it automatically
        } catch (err) {
          console.error("Failed to create default prefs", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [userPreferencesData, userId]);
  
  const savePreferences = async (newPrefs: Partial<UserPreferences>) => {
    if (!userId) return;
    
    try {
      await savePreferencesMutation({
        userId,
        ...newPrefs,
      });
      
      setPreferences(prev => ({
        ...prev,
        ...newPrefs,
      }));
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw error;
    }
  };
  
  const loadLegacyData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      await loadLegacyDataMutation({ userId });
      const refreshedPrefs = await convex.query(
        api.userPreferences.getUserPreferences,
        { userId }
      );
      if (refreshedPrefs) {
        setPreferences({
          ...defaultPreferences,
          ...refreshedPrefs,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <UserPreferencesContext.Provider 
      value={{ 
        preferences, 
        loading, 
        savePreferences, 
        loadLegacyData 
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => useContext(UserPreferencesContext);

export default UserPreferencesContext;