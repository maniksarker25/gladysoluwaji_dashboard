// Central design tokens shared by Ant Design and custom components.
export const colors = {
  primary: '#006C93',
  primaryHover: '#005877',
  primarySoft: '#E6F3F7',
  ink: '#0B1B2B',
  muted: '#64748B',
  border: '#E6EBF1',
  bg: '#F5F7FA',
};

export const fontFamily =
  "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export const antdTheme = {
  token: {
    colorPrimary: colors.primary,
    colorLink: colors.primary,
    colorInfo: colors.primary,
    colorSuccess: '#16A34A',
    colorWarning: '#F59E0B',
    colorError: '#E11D48',
    colorText: colors.ink,
    colorTextSecondary: colors.muted,
    colorBorder: '#DCE3EA',
    colorBorderSecondary: colors.border,
    colorBgLayout: colors.bg,
    fontFamily,
    fontSize: 14,
    borderRadius: 10,
    borderRadiusLG: 14,
    controlHeight: 38,
    boxShadow: '0 10px 30px -12px rgba(15, 40, 70, 0.18)',
    boxShadowSecondary: '0 12px 32px -12px rgba(15, 40, 70, 0.22)',
  },
  components: {
    Button: {
      fontWeight: 600,
      primaryShadow: '0 6px 16px -6px rgba(0, 108, 147, 0.55)',
      defaultShadow: 'none',
    },
    Input: { activeShadow: '0 0 0 3px rgba(0, 108, 147, 0.12)' },
    Select: { optionSelectedBg: colors.primarySoft },
    Table: {
      headerBg: '#F8FAFC',
      headerColor: colors.muted,
      headerSplitColor: 'transparent',
      rowHoverBg: '#F5FAFC',
      borderColor: colors.border,
    },
    Modal: { borderRadiusLG: 18, titleFontSize: 18 },
    Pagination: { itemActiveBg: colors.primary },
    Tabs: { inkBarColor: colors.primary, itemSelectedColor: colors.primary },
    Dropdown: { paddingBlock: 8 },
  },
};
