import React from 'react'
import AdminMap from './components/AdminMap'
import Tabs from './components/Tabs'

export default function Admin() {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleActiveTab = (event, newValue) => {
        console.log("newValue", newValue);
        setActiveTab(newValue);
    };
    return (
        <div>
            <Tabs activeTab={activeTab} handleActiveTab={handleActiveTab}/>
            <AdminMap />
        </div>
    )
}
