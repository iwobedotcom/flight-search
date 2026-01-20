import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  HelpOutline,
  LightMode,
  Person,
  Logout,
  Settings,
  DarkMode,
  Contrast,
} from "@mui/icons-material";

import logoBlack from "../assets/logo-black.png";
import logoWhite from "../assets/logo-white.png";
import avatar from "../assets/avatar.png";

interface HeaderProps {
  themeMode: "system" | "light" | "dark";
  onThemeModeChange: (mode: "system" | "light" | "dark") => void;
}

const Header: React.FC<HeaderProps> = ({ themeMode, onThemeModeChange }) => {
  const theme = useTheme();
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = (newMode: "system" | "light" | "dark") => {
    onThemeModeChange(newMode);
    handleThemeMenuClose();
  };

  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarMenuAnchor(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarMenuAnchor(null);
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case "light":
        return <LightMode />;
      case "dark":
        return <DarkMode />;
      case "system":
      default:
        return <Contrast />;
    }
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        mb: 3,
        boxShadow: theme.shadows[1],
        backdropFilter: "blur(5px)",
        "-webkit-backdrop-filter": "blur(5px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={theme.palette.mode === "dark" ? logoWhite : logoBlack}
            alt="Flight Search"
            width="auto"
            height={50}
          />
        </Box>

        {/* Right Section - Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Theme Switcher */}
          <Tooltip title="Change theme">
            <IconButton
              onClick={handleThemeMenuOpen}
              size="medium"
              sx={{ color: theme.palette.text.primary }}
            >
              {getThemeIcon()}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={themeMenuAnchor}
            open={Boolean(themeMenuAnchor)}
            onClose={handleThemeMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ mt: 1 }}
          >
            <MenuItem
              onClick={() => handleThemeChange("system")}
              selected={themeMode === "system"}
            >
              <Contrast sx={{ mr: 1.5 }} />
              System
            </MenuItem>
            <MenuItem
              onClick={() => handleThemeChange("light")}
              selected={themeMode === "light"}
            >
              <LightMode sx={{ mr: 1.5 }} />
              Light
            </MenuItem>
            <MenuItem
              onClick={() => handleThemeChange("dark")}
              selected={themeMode === "dark"}
            >
              <DarkMode sx={{ mr: 1.5 }} />
              Dark
            </MenuItem>
          </Menu>

          {/* Support Navigation */}
          <Tooltip title="Support">
            <Button
              startIcon={<HelpOutline />}
              sx={{
                color: theme.palette.text.primary,
                textTransform: "none",
                display: { xs: "none", md: "flex" },
              }}
            >
              Support
            </Button>
          </Tooltip>

          {/* Hamburger Menu (Dormant) */}
          <IconButton
            size="medium"
            sx={{
              color: theme.palette.text.primary,
              display: { xs: "flex", md: "none" },
            }}
            disabled
          >
            <MenuIcon />
          </IconButton>

          {/* Avatar with Menu */}
          <Tooltip title="Account">
            <IconButton onClick={handleAvatarMenuOpen} sx={{ ml: 1, p: 0 }}>
              <Avatar
                src={avatar}
                sx={{
                  width: 36,
                  height: 36,
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={avatarMenuAnchor}
            open={Boolean(avatarMenuAnchor)}
            onClose={handleAvatarMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ mt: 1 }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Iwobe Aigboje
              </Typography>
              <Typography variant="body2" color="text.secondary">
                write@iwobe.com
              </Typography>
            </Box>
            <MenuItem onClick={handleAvatarMenuClose}>
              <Person sx={{ mr: 1.5 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleAvatarMenuClose}>
              <Settings sx={{ mr: 1.5 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleAvatarMenuClose}>
              <Logout sx={{ mr: 1.5 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
