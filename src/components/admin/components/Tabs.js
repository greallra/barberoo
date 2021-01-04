import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function Tabz(handleActiveTab, activeTab) {
  

  return (
    <Paper square>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleActiveTab}
        aria-label="disabled tabs example"
      >
        <Tab label="See all users" />
        <Tab label="Disabled" disabled />
        <Tab label="other" />
      </Tabs>
    </Paper>
  );
}