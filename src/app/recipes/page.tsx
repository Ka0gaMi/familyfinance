"use client"

import React from "react";
import styles from "./page.module.css";
import { Tabs, Tab, Box } from "@mui/material";
import RecipeItem from "./components/RecipeItem/RecipeItem";
import { set } from "lodash";
import { RecipeDto, fetchRecipes } from "../../../service/recipe";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div 
      role="tabpanel" 
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 , width: '100%', height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function allyProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Recipes() {
  const [value, setValue] = React.useState(0);
  const [recipes, setRecipes] = React.useState([] as RecipeDto[]);

  React.useEffect(() => {
    async function fetchRecipesAsync() {
      const recipes = await fetchRecipes();
      setRecipes(recipes);
    }

    fetchRecipesAsync();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={styles.RecipesContainer}>
        <Box
          sx={{ bgcolor: 'background.paper', display: 'flex', width: '100%', height: '100%' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {recipes.map((recipe: any, index: number) => (
              <Tab 
                key={index} 
                label={recipe.name} 
                {...allyProps(index)} 
              />
            ))}
          </Tabs>
          <Box sx={{ flexGrow: 1 }}>
            {recipes.map((recipe: any, index: number) => (
              <TabPanel key={index} value={value} index={index}>
                <RecipeItem recipe={recipe} />
              </TabPanel>
            ))}
          </Box>
        </Box>
      </div>
    </>
  )
}