import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";
// Removed the conflicting import of AppThemeOptions

// Define a shared theme interface for type consistency
export interface AppThemeOptions {
  mode: PaletteMode;
  primary: string;
  secondary: string;
  background: {
    default: string;
    paper: string;
    sidebar: string;
    chat: string;
    header: string;
    input: string;
    selected: string;
    hover: string;
    menu: string;
    dialog: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    caption: string;
  };
  border: {
    light: string;
    main: string;
  };
  button: {
    primary: string;
    text: string;
    hover: string;
    danger: string;
    dangerHover: string;
  };
}

// Define theme presets
export const themePresets: Record<string, AppThemeOptions> = {
  dark: {
    mode: "dark",
    primary: "#7a0046",
    secondary: "#8e79f3",
    background: {
      default: "#121212",
      paper: "#0e0c15",
      sidebar: "#181116",
      chat: "#221D27",
      header: "#181116",
      input: "#1e1721",
      selected: "#2d2433",
      hover: "#251e2a",
      menu: "#1a1418",
      dialog: "#221D27",
    },
    text: {
      primary: "#ffffff",
      secondary: "#9ca3af",
      tertiary: "#d4d4d8",
      caption: "#6b7280",
    },
    border: {
      light: "rgba(255, 255, 255, 0.1)",
      main: "rgba(255, 255, 255, 0.15)",
    },
    button: {
      primary: "#7a0046",
      text: "#ffffff",
      hover: "#900055",
      danger: "#dc2626",
      dangerHover: "#b91c1c",
    },
  },
  light: {
    mode: "light",
    primary: "#b2185d",
    secondary: "#614bb9",
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
      sidebar: "#f0f0f0",
      chat: "#f5f5f7",
      header: "#ffffff",
      input: "#f0f0f0",
      selected: "#e1e7f0",
      hover: "#f5f5f5",
      menu: "#ffffff",
      dialog: "#ffffff",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
      tertiary: "#4b5563",
      caption: "#9ca3af",
    },
    border: {
      light: "rgba(0, 0, 0, 0.08)",
      main: "rgba(0, 0, 0, 0.12)",
    },
    button: {
      primary: "#b2185d",
      text: "#ffffff",
      hover: "#d81b60",
      danger: "#ef4444",
      dangerHover: "#dc2626",
    },
  },
  boring: {
    mode: "dark",
    primary: "#4a5568",
    secondary: "#718096",
    background: {
      default: "#1a202c",
      paper: "#171923",
      sidebar: "#171923",
      chat: "#1a202c",
      header: "#171923",
      input: "#1c1f2a",
      selected: "#232736",
      hover: "#20242f",
      menu: "#171923",
      dialog: "#1a202c",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#a0aec0",
      tertiary: "#cbd5e0",
      caption: "#718096",
    },
    border: {
      light: "rgba(255, 255, 255, 0.06)",
      main: "rgba(255, 255, 255, 0.1)",
    },
    button: {
      primary: "#4a5568",
      text: "#e2e8f0",
      hover: "#2d3748",
      danger: "#e53e3e",
      dangerHover: "#c53030",
    },
  },
};

// Create theme generator function
export function createAppTheme(opts: AppThemeOptions): Theme {
  const theme = createTheme({
    palette: {
      mode: opts.mode as PaletteMode,
      primary: { main: opts.primary },
      secondary: { main: opts.secondary },
      background: { ...opts.background },
      text: { primary: opts.text.primary, secondary: opts.text.secondary },
    },
    typography: {
      // every MUI Typography & most components will inherit this
      fontFamily: 'var(--font-main)',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // ensure <code> & <pre> use the code font
          'code, pre': {
            fontFamily: 'var(--font-code)',
          },
        }
      }
    }
  });

  return theme;
}

export const darkTheme = createAppTheme(themePresets.dark);
export const lightTheme = createAppTheme(themePresets.light);
export const boringTheme = createAppTheme(themePresets.boring);

export default darkTheme;