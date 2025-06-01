import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { Logout, Settings, Login } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    navigate("/settings");
    handleClose();
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small" title={user ? `${user.firstName} ${user.lastName}` : "Zaloguj się"}>
        <Avatar src={user?.avatar}>{user?.firstName?.[0] || "?"}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user ? (
          <>
            <MenuItem>
              <Avatar src={user.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
              {/* Jeśli chcesz pełne imię i nazwisko lub nazwę */}
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.name || "Użytkownik"}
            </MenuItem>
            <MenuItem component={Link} to="/settings#orders">Moje zamówienia</MenuItem>
            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Ustawienia
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                handleClose();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Wyloguj
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLoginRedirect}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Zaloguj
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
