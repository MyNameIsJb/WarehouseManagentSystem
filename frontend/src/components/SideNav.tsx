import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CollectionsIcon from "@mui/icons-material/Collections";
import InventoryIcon from "@mui/icons-material/Inventory";
import SellIcon from "@mui/icons-material/Sell";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RestoreIcon from "@mui/icons-material/Restore";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../store/store";

type Anchor = "left";

export const adminMenu = [
  { route: "employeeList", link: "Employee List" },
  { route: "productList", link: "Product List" },
  { route: "gallery", link: "Gallery" },
  { route: "inventory", link: "Inventory" },
  { route: "sale", link: "Sale" },
  { route: "purchase", link: "Purchase" },
  { route: "incomingProduct", link: "Incoming Product" },
  { route: "outgoingProduct", link: "Outgoing Product" },
  { route: "stockReplenishment", link: "Stock Replenishment" },
  { route: "dailyAttendance", link: "Daily Attendance" },
  { route: "returnedItems", link: "Returned Items" },
];

export const empMenu = [
  { route: "viewGallery", link: "Gallery" },
  { route: "barcodeGenerator", link: "Barcode Generator" },
  { route: "viewInventory", link: "Inventory" },
  { route: "viewIncomingProduct", link: "Incoming Product" },
  { route: "viewOutgoingProduct", link: "Outgoing Product" },
  { route: "viewStockReplenishment", link: "Stock Replenishment" },
  { route: "viewReturnedItems", link: "Returned Items" },
];

export const clientMenu = [
  { route: "viewGallery", link: "Gallery" },
  { route: "storeInventory", link: "Inventory" },
  { route: "storeIncomingProduct", link: "Incoming Product" },
  { route: "storeSales", link: "Sales" },
  { route: "storeOrderProduct", link: "Order Product" },
  { route: "storeReturnedItem", link: "Returned Item" },
];

const SideNav = () => {
  const [state, setState] = useState({
    left: false,
  });
  const { profileData } = useAppSelector((state) => state.profile);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {profileData?.levelOfAccess === "Administrator"
          ? adminMenu.map((text, index) => (
              <Link className="MenuLink" key={index} to={`/${text.route}`}>
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {text.link === "Employee List" ? (
                        <PersonAddIcon />
                      ) : text.link === "Product List" ? (
                        <AddShoppingCartIcon />
                      ) : text.link === "Gallery" ? (
                        <CollectionsIcon />
                      ) : text.link === "Inventory" ? (
                        <InventoryIcon />
                      ) : text.link === "Sale" ? (
                        <SellIcon />
                      ) : text.link === "Purchase" ? (
                        <ShoppingCartIcon />
                      ) : text.link === "Incoming Product" ? (
                        <AddBusinessIcon />
                      ) : text.link === "Outgoing Product" ? (
                        <LocalShippingIcon />
                      ) : text.link === "Stock Replenishment" ? (
                        <RestoreIcon />
                      ) : text.link === "Daily Attendance" ? (
                        <FactCheckIcon />
                      ) : text.link === "Returned Items" ? (
                        <ProductionQuantityLimitsIcon />
                      ) : (
                        ""
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text.link} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          : profileData?.levelOfAccess === "Employee"
          ? empMenu.map((text, index) => (
              <Link className="MenuLink" key={index} to={`/${text.route}`}>
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {text.link === "Gallery" ? (
                        <CollectionsIcon />
                      ) : text.link === "Barcode Generator" ? (
                        <HorizontalSplitIcon />
                      ) : text.link === "Inventory" ? (
                        <InventoryIcon />
                      ) : text.link === "Incoming Product" ? (
                        <AddBusinessIcon />
                      ) : text.link === "Outgoing Product" ? (
                        <LocalShippingIcon />
                      ) : text.link === "Stock Replenishment" ? (
                        <RestoreIcon />
                      ) : text.link === "Returned Items" ? (
                        <ProductionQuantityLimitsIcon />
                      ) : (
                        ""
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text.link} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          : profileData?.levelOfAccess === "Client"
          ? clientMenu.map((text, index) => (
              <Link className="MenuLink" key={index} to={`/${text.route}`}>
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {text.link === "Gallery" ? (
                        <CollectionsIcon />
                      ) : text.link === "Inventory" ? (
                        <InventoryIcon />
                      ) : text.link === "Incoming Product" ? (
                        <AddBusinessIcon />
                      ) : text.link === "Sales" ? (
                        <SellIcon />
                      ) : text.link === "Purchase" ? (
                        <ShoppingCartIcon />
                      ) : text.link === "Order Product" ? (
                        <AddShoppingCartIcon />
                      ) : text.link === "Returned Item" ? (
                        <ProductionQuantityLimitsIcon />
                      ) : (
                        ""
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text.link} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          : ""}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ color: "inherit" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideNav;
