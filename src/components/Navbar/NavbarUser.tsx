import * as React from "react";
import { useState } from "react";
import { updatePassword } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function ResponsiveAppBar() {
  const currentUser = auth.currentUser;
  const storage = getStorage();
  const storageRef = ref(storage, `avatars/${currentUser.uid}`);
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const [avatarSrc, setAvatarSrc] = useState<string>(
    ""
  );
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

 

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveProfile = () => {
   
      
      

    if (newPassword) {
      const user = auth.currentUser;
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Password updated successfully.");
        })
        .catch((error) => {
          console.log("Error updating password:", error);
        });
    }

    handleCloseModal();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/workspace"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KvizzHub
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/workspace"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KvizzHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={avatarSrc} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleOpenModal}>
                <IconButton>
                  <Person2Icon />
                </IconButton>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
                <Typography textAlign="center" onClick={handleLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Profile Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            p: 4,
            outline: "none",
          }}
        >
          <Typography
            id="profile-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 4 }}
          >
            Edit Profile
          </Typography>
       
         
          <TextField
            id="new-email"
            label="Email"
            value={currentUser?.email}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            id="new-password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <ButtonGroup sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleSaveProfile}
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
            <Button onClick={handleCloseModal} variant="outlined" color="error">
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </AppBar>
  );
}

export default ResponsiveAppBar;
