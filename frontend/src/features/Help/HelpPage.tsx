import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const HelpPage = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box sx={{ margin: "1em", padding: "1em" }}>
      <Box
        sx={{
          marginBottom: "1em",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold", color: "inherit" }}
        >
          Help
        </Typography>
      </Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Account Registration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To register an account, fill out the textboxes with the required
            information, the entered email will be the username.
          </Typography>
          <Typography variant="body1" component="p">
            NOTE: Create password will be send to the user by email notification
            if the account created successfully
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Product Registration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Fill out the information needed here such as Brand name,
            Description, Model, Quantity and Price.
          </Typography>
          <Typography variant="body1" component="p">
            NOTE: This is where all the registered products information will
            have a record on the database. The products will go to the inventory
            system.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Product Monitoring</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This allows the user to monitor the replenishment of products, as
            well as incoming and outgoing products.
          </Typography>
          <Typography variant="body1" component="p">
            NOTE:
            <ul>
              <li>
                Incoming product is encoding section that inputs a product
                information and quantities.
              </li>
              <li>
                Outgoing product is a encoding section that inputs a product
                information and quantities to deliver in different registered
                store.
              </li>
              <li>
                Product Replenishment is encoding section that inputs a product
                information and quantities to restock a products that needed.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default HelpPage;
